"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getGlowTexture } from "@/lib/glowTexture";
import {
  generateAmbientScatter,
  generateFlameTargets,
  generateSeeds,
} from "@/lib/flamePoints";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function clamp01(v: number) {
  return Math.min(Math.max(v, 0), 1);
}

const FLAME_SCALE = 1.9;

/**
 * The one persistent atmosphere for the whole page — dust suspended in
 * candlelit air, fixed to the viewport so it's present at every scroll
 * position, not just the Hero. Two things layer on top of that constant:
 *
 *  - Over the Hero ([data-ember-hero]), the same dust gets a little more
 *    energy and brightness — the room is more alive at the opening.
 *  - Over "The Turn" ([data-ember-turn]), the dust resolves into the
 *    flame-mark silhouette as that section scrolls through, then loosens
 *    back to ambient dust again on the way out — a moment, not a
 *    permanent state.
 *
 * One WebGL context for the entire site, not one per section.
 */
export default function AmbientEmberField() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isSmall = window.innerWidth < 700;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const count = isSmall ? 150 : 280;
    const ambient = generateAmbientScatter(count, 21);
    const flame = generateFlameTargets(count, 13);
    const seeds = generateSeeds(count, 17);

    const positions = new Float32Array(ambient); // working buffer
    const colors = new Float32Array(count * 3);
    const amber = new THREE.Color("#c9963c");
    const bright = new THREE.Color("#f0c374");
    const ember = new THREE.Color("#b5563a");

    for (let i = 0; i < count; i++) {
      const base = seeds[i] < 0.15 ? ember : amber;
      const c = base.clone().lerp(bright, seeds[i] * 0.55);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: isSmall ? 0.16 : 0.19,
      map: getGlowTexture(),
      transparent: true,
      alphaTest: 0.01,
      vertexColors: true,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.28,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // ---------- "The Turn" convergence, scroll-scrubbed both ways ----------
    const convergeState = { value: 0 };
    const scrollTriggers: ScrollTrigger[] = [];

    if (!reducedMotion) {
      const turnEl = document.querySelector("[data-ember-turn]");
      if (turnEl) {
        scrollTriggers.push(
          ScrollTrigger.create({
            trigger: turnEl,
            start: "top 85%",
            end: "center 45%",
            scrub: 0.6,
            onUpdate: (self: ScrollTrigger) => {
              convergeState.value = self.progress;
            },
          }),
          ScrollTrigger.create({
            trigger: turnEl,
            start: "center 45%",
            end: "bottom 15%",
            scrub: 0.6,
            onUpdate: (self: ScrollTrigger) => {
              convergeState.value = 1 - self.progress;
            },
          })
        );
      }
    }

    // ---------- Spotlight intensity (Hero + The Turn) ----------
    const visibleSpotlights = new Set<Element>();
    const visibleHero = new Set<Element>();
    const opacityState = { current: 0.28, target: 0.28 };
    const heroState = { current: 0, target: 0 };

    let spotlightObserver: IntersectionObserver | null = null;
    let heroObserver: IntersectionObserver | null = null;

    const spotlightEls = Array.from(document.querySelectorAll("[data-ember-spotlight]"));
    const heroEls = Array.from(document.querySelectorAll("[data-ember-hero]"));

    if (spotlightEls.length) {
      spotlightObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) visibleSpotlights.add(entry.target);
            else visibleSpotlights.delete(entry.target);
          });
          opacityState.target = visibleSpotlights.size > 0 ? 0.8 : 0.28;
        },
        { threshold: 0.2 }
      );
      spotlightEls.forEach((el) => spotlightObserver!.observe(el));
    }

    if (heroEls.length) {
      heroObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) visibleHero.add(entry.target);
            else visibleHero.delete(entry.target);
          });
          heroState.target = visibleHero.size > 0 ? 1 : 0;
        },
        { threshold: 0.2 }
      );
      heroEls.forEach((el) => heroObserver!.observe(el));
    }

    if (reducedMotion) {
      opacityState.current = opacityState.target = 0.4;
    }

    // ---------- Render loop ----------
    let frameId: number;
    let elapsed = 0;

    const applyPositions = () => {
      const pos = geometry.attributes.position as THREE.BufferAttribute;
      const energy = 1 + heroState.current * 0.8;

      for (let i = 0; i < count; i++) {
        const desync = seeds[i] * 0.42;
        const localT = clamp01((convergeState.value - desync) / (1 - desync));
        const eased = easeOutCubic(localT);

        const wanderAmp = THREE.MathUtils.lerp(0.4, 0.09, eased) * energy;
        const jitter = reducedMotion ? 0 : 1;

        const wx =
          Math.sin(elapsed * (0.16 + seeds[i] * 0.3) * energy + i) *
          wanderAmp *
          jitter;
        const wy =
          Math.sin(elapsed * (0.13 + seeds[i] * 0.26) * energy + i * 1.7) *
          wanderAmp *
          jitter;
        const wz =
          Math.cos(elapsed * (0.1 + seeds[i] * 0.2) * energy + i * 0.6) *
          wanderAmp *
          0.6 *
          jitter;

        const bx = THREE.MathUtils.lerp(ambient[i * 3], flame[i * 3] * FLAME_SCALE, eased);
        const by = THREE.MathUtils.lerp(
          ambient[i * 3 + 1],
          flame[i * 3 + 1] * FLAME_SCALE,
          eased
        );
        const bz = THREE.MathUtils.lerp(
          ambient[i * 3 + 2],
          flame[i * 3 + 2] * FLAME_SCALE,
          eased
        );

        pos.setX(i, bx + wx);
        pos.setY(i, by + wy);
        pos.setZ(i, bz + wz);
      }
      pos.needsUpdate = true;
    };

    if (reducedMotion) {
      applyPositions();
      renderer.render(scene, camera);
    } else {
      const animate = () => {
        elapsed += 0.016;

        opacityState.current += (opacityState.target - opacityState.current) * 0.04;
        heroState.current += (heroState.target - heroState.current) * 0.04;

        applyPositions();
        material.opacity = Math.max(
          0,
          opacityState.current + Math.sin(elapsed * 0.6) * 0.06
        );

        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      };
      animate();
    }

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      scrollTriggers.forEach((t) => t.kill());
      spotlightObserver?.disconnect();
      heroObserver?.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
