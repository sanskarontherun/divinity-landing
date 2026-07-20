"use client";

import { useScrollReveal, useStaggerReveal } from "@/lib/useScrollReveal";

const FEATURES = [
  {
    title: "Any voice, any document",
    body: "Drop in a PDF. Choose a voice that feels like yours. Divinity reads it back at a pace you set.",
  },
  {
    title: "Ambient sound",
    body: "Soft rain, wind through leaves, morning birdsong — generated quietly underneath the reading, never distracting from it.",
  },
  {
    title: "Dim the Flame",
    body: "Set a sleep timer and the voice eases down with it, fading to nothing right as you do.",
  },
  {
    title: "Carry your place",
    body: "Bookmarks, focus mode, and tap-to-define — so you can leave mid-sentence and come back exactly where you were.",
  },
];

export default function Features() {
  const eyebrowRef = useScrollReveal<HTMLSpanElement>({ y: 12 });
  const gridRef = useStaggerReveal<HTMLDivElement>({ stagger: 0.1 });

  return (
    <section id="features" className="chapter">
      <span
        ref={eyebrowRef}
        className="eyebrow"
        style={{ display: "block", textAlign: "center" }}
      >
        III. What It Does
      </span>

      <div
        ref={gridRef}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 18,
          marginTop: 44,
        }}
      >
        {FEATURES.map((f) => (
          <div key={f.title} className="glass-panel" style={{ padding: "32px 28px" }}>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: 20,
                margin: "0 0 12px",
                color: "var(--amber)",
              }}
            >
              {f.title}
            </h3>
            <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.65, margin: 0 }}>
              {f.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
