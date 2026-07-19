"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

export default function Problem() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="chapter" style={{ textAlign: "center" }}>
      <div ref={ref}>
        <span className="eyebrow">I. The Problem</span>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(24px, 4vw, 40px)",
            lineHeight: 1.5,
            maxWidth: 760,
            margin: "24px auto 0",
            color: "var(--text)",
          }}
        >
          Your reading list grows faster than your eyes can hold it. The books,
          the reports, the things you saved for later — later never quite
          arrives.
        </p>
      </div>
    </section>
  );
}
