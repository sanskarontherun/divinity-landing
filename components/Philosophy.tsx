"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

export default function Philosophy() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="chapter">
      <div ref={ref} style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
        <span className="eyebrow">II. The Turn</span>
        <h2
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
        <p style={{ color: "var(--muted)", fontSize: 17, lineHeight: 1.7 }}>
          Before there was reading, there was listening — to elders, to
          scripture, to stories told by firelight. Divinity brings that back:
          your own words, given a voice, so the page can meet you wherever you
          actually are — walking, driving, lying still in the dark.
        </p>
      </div>
    </section>
  );
}
