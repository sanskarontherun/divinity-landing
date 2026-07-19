"use client";

import Image from "next/image";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function Founder() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="chapter">
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

        <div style={{ maxWidth: 480 }}>
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
            PLACEHOLDER — replace with Sanskar's real words on why Divinity
            exists. Two to four sentences, first person, plain and specific
            beats polished and vague.
          */}
          <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.75 }}>
            [Add a few sentences here, in your own words — what you couldn&apos;t
            finish reading, and why you built a way to listen to it instead.]
          </p>
        </div>
      </div>
    </section>
  );
}
