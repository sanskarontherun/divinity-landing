"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

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
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="chapter">
      <div ref={ref}>
        <span className="eyebrow" style={{ display: "block", textAlign: "center" }}>
          III. What It Does
        </span>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1px",
            background: "var(--line)",
            marginTop: 40,
            border: "1px solid var(--line)",
          }}
        >
          {FEATURES.map((f) => (
            <div key={f.title} style={{ background: "var(--bg)", padding: "32px 28px" }}>
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
      </div>
    </section>
  );
}
