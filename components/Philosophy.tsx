"use client";

import { useScrollReveal, useSplitTextReveal } from "@/lib/useScrollReveal";

export default function Philosophy() {
  const eyebrowRef = useScrollReveal<HTMLSpanElement>({ y: 12 });
  const headingRef = useSplitTextReveal<HTMLHeadingElement>({ stagger: 0.05 });
  const bodyRef = useScrollReveal<HTMLParagraphElement>({ y: 20 });

  return (
    <section
      id="turn"
      className="chapter"
      data-ember-turn
      data-ember-spotlight
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "clamp(560px, 78vh, 780px)",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* The persistent AmbientEmberField (mounted once in the root layout)
          reads this section's position to converge into the flame-mark
          silhouette as it scrolls through, then loosen back to ambient
          dust on the way out. */}

      {/* Scrim so the text stays legible over the ember field — darkens
          only the center where the copy sits; fades to fully transparent
          at the edges so this section reads as part of the same
          continuous field as the rest of the page, not a boxed-off effect. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 55% 48% at 50% 50%, rgba(28,22,17,0.7) 0%, rgba(28,22,17,0.28) 52%, transparent 78%)",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 760,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <span ref={eyebrowRef} className="eyebrow" style={{ display: "inline-block" }}>
          II. The Turn
        </span>
        <h2
          ref={headingRef}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: "clamp(28px, 5vw, 52px)",
            lineHeight: 1.15,
            margin: "24px 0 20px",
          }}
        >
          Listening is not a shortcut. It&apos;s a return.
        </h2>
        <p
          ref={bodyRef}
          style={{ color: "var(--muted)", fontSize: 17, lineHeight: 1.7 }}
        >
          Before there was reading, there was listening — to elders, to
          scripture, to stories told by firelight. Divinity brings that back:
          your own words, given a voice, so the page can meet you wherever you
          actually are — walking, driving, lying still in the dark.
        </p>
      </div>
    </section>
  );
}
