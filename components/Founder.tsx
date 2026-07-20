"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function Founder() {
  const textRef = useScrollReveal<HTMLDivElement>({ y: 24 });
  const photoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = photoRef.current;
    if (!el) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) {
      el.classList.add("is-revealed");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-revealed");
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="founder" className="chapter">
      <div
        ref={ref}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 48,
          alignItems: "center",
          justifyContent: "center",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <div
          className="founder-photo-mask"
          style={{
            width: 160,
            height: 160,
            borderRadius: "50%",
            overflow: "hidden",
            border: "1px solid var(--line)",
            flexShrink: 0,
            filter: "grayscale(0.3) sepia(0.15)",
          }}
        >
          <Image
            src="/images/founder.jpg"
            alt="Sanskar Singh, founder of Divinity"
            width={320}
            height={320}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div ref={textRef} style={{ maxWidth: 480 }}>
          <span className="eyebrow">IV. The Founder</span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "clamp(24px, 3.5vw, 34px)",
              margin: "16px 0 12px",
            }}
          >
            Sanskar Singh
          </h2>
          {/*
            DRAFT — written to match the product and brand voice, but it's
            a draft. Swap in whatever's actually true for you; specifics
            beat polish here.
          */}
          <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.75 }}>
            I am gonna be one of the greates , mark my words.  
          </p>
        </div>
      </div>
    </section>
  );
}
