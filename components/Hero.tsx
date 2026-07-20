"use client";

import FlameMark from "./FlameMark";
import { useHeroIntro } from "@/lib/useHeroIntro";
import { useMagnetic } from "@/lib/useScrollReveal";

export default function Hero() {
  const { markRef, glowRef, headlineRef, sublineRef, ctaRef } = useHeroIntro();
  const magneticRef = useMagnetic<HTMLAnchorElement>(0.4);

  // Combine the intro-timeline ref and the magnetic-hover ref on the CTA.
  function setCtaRefs(node: HTMLAnchorElement | null) {
    ctaRef.current = node;
    magneticRef.current = node;
  }

  return (
    <section
      id="top"
      data-ember-hero
      data-ember-spotlight
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "0 24px",
        overflow: "hidden",
      }}
    >
      {/* Ember dust is now a single persistent field mounted in the root
          layout (AmbientEmberField) — this section just tells it to run
          brighter and more energetic while in view. */}

      {/* Radial vignette for depth behind the mark + headline */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 42%, rgba(28,22,17,0) 0%, rgba(28,22,17,0.55) 75%, rgba(28,22,17,0.85) 100%)",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <div
            ref={glowRef}
            style={{
              position: "absolute",
              inset: "-40px",
              opacity: 0,
              background:
                "radial-gradient(circle, rgba(240,195,116,0.55) 0%, rgba(201,150,60,0.18) 45%, transparent 72%)",
              filter: "blur(4px)",
              pointerEvents: "none",
            }}
            aria-hidden="true"
          />
          <div ref={markRef} style={{ opacity: 0, position: "relative" }}>
            <FlameMark size={40} />
          </div>
        </div>

        <h1
          ref={headlineRef}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: "clamp(40px, 8vw, 96px)",
            lineHeight: 1.05,
            margin: "28px 0 20px",
          }}
        >
          <span className="split-word">
            <span className="split-word-inner">Given</span>
          </span>{" "}
          <span className="split-word">
            <span className="split-word-inner">voice</span>
          </span>
          <br />
          <em style={{ color: "var(--amber)", fontStyle: "italic" }}>
            <span className="split-word">
              <span className="split-word-inner">from</span>
            </span>{" "}
            <span className="split-word">
              <span className="split-word-inner">above.</span>
            </span>
          </em>
        </h1>

        <p
          ref={sublineRef}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(15px, 2vw, 19px)",
            color: "var(--muted)",
            maxWidth: 480,
            margin: "0 auto",
            opacity: 0,
          }}
        >
          Divinity reads what you never had time to finish — in a voice worth
          listening to, at the pace of a life still being lived.
        </p>

        <a
          ref={setCtaRefs}
          href="#begin"
          className="eyebrow magnetic-cta"
          style={{
            display: "inline-block",
            marginTop: 40,
            textDecoration: "none",
            border: "1px solid var(--amber-dim)",
            borderRadius: 999,
            padding: "12px 24px",
            opacity: 0,
            transition: "border-color 0.3s ease, background 0.3s ease",
          }}
        >
          Begin
        </a>
      </div>
    </section>
  );
}
