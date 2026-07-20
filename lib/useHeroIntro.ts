"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * The page's opening gesture. Fires once on mount, not on scroll: the
 * flame mark ignites (blur + glow + a small overshoot settle), then the
 * headline arrives word by word, then the subline, then the CTA. One
 * orchestrated moment rather than several separate fades.
 *
 * Deliberately built from core GSAP only — no paid plugins (no DrawSVG),
 * since the project only ships the free `gsap` package.
 */
export function useHeroIntro() {
  const markRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const sublineRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const mark = markRef.current;
    const glow = glowRef.current;
    const headline = headlineRef.current;
    const subline = sublineRef.current;
    const cta = ctaRef.current;
    if (!mark || !headline || !subline || !cta) return;

    if (reduced) {
      gsap.set([mark, headline, subline, cta], {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      });
      if (glow) gsap.set(glow, { opacity: 0.55 });
      return;
    }

    const words = headline.querySelectorAll(".split-word-inner");

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      mark,
      { opacity: 0, scale: 0.72, filter: "blur(14px)" },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.1,
        ease: "back.out(1.6)",
      }
    );

    if (glow) {
      tl.fromTo(
        glow,
        { opacity: 0, scale: 0.4 },
        { opacity: 0.55, scale: 1, duration: 1.3, ease: "power2.out" },
        "<"
      );
    }

    tl.fromTo(
      words,
      { opacity: 0, y: "0.6em", filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        stagger: 0.06,
      },
      "-=0.55"
    )
      .fromTo(
        subline,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      )
      .fromTo(
        cta,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.4"
      );

    return () => {
      tl.kill();
    };
  }, []);

  return { markRef, glowRef, headlineRef, sublineRef, ctaRef };
}
