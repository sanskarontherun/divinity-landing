"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Entrance reveal: fades a section up into place as it crosses into view,
 * with an optional soft blur to sell "coming into focus" — used for the
 * Problem chapter, where the ache should feel like it's clearing.
 */
export function useScrollReveal<T extends HTMLElement>(
  options: { blur?: boolean; y?: number } = {}
) {
  const ref = useRef<T | null>(null);
  const { blur = false, y = 40 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y, filter: blur ? "blur(10px)" : "blur(0px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [blur, y]);

  return ref;
}

/**
 * Splits an element's text content into word-level spans and staggers
 * their reveal — the editorial "words arriving one at a time" beat used
 * for headlines that need to carry more weight than a simple fade.
 */
export function useSplitTextReveal<T extends HTMLElement>(
  options: { stagger?: number; start?: string } = {}
) {
  const ref = useRef<T | null>(null);
  const { stagger = 0.045, start = "top 80%" } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const original = el.innerHTML;
    const words = original
      .trim()
      .split(/\s+/)
      .map(
        (word: string) =>
          `<span class="split-word"><span class="split-word-inner">${word}</span></span>`
      )
      .join(" ");
    el.innerHTML = words;

    const spans = el.querySelectorAll<HTMLElement>(".split-word-inner");

    if (prefersReducedMotion()) {
      gsap.set(spans, { opacity: 1, y: 0, filter: "blur(0px)" });
      return () => {
        el.innerHTML = original;
      };
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        spans,
        { opacity: 0, y: "0.6em", filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          stagger,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        }
      );
    }, el);

    return () => {
      ctx.revert();
      el.innerHTML = original;
    };
  }, [stagger, start]);

  return ref;
}

/**
 * Staggers the direct children of a container as it enters view — used
 * for the Features grid, where every card should arrive as part of one
 * gesture rather than four separate ones.
 */
export function useStaggerReveal<T extends HTMLElement>(
  options: { stagger?: number } = {}
) {
  const ref = useRef<T | null>(null);
  const { stagger = 0.12 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    if (!children.length) return;

    if (prefersReducedMotion()) {
      gsap.set(children, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        children,
        { opacity: 0, y: 28, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power2.out",
          stagger,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [stagger]);

  return ref;
}

/**
 * A gentle magnetic pull toward the cursor for primary CTAs. Fine-pointer
 * devices only, and a no-op under reduced motion.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      gsap.to(el, {
        x: relX * strength,
        y: relY * strength,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const handleLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [strength]);

  return ref;
}
