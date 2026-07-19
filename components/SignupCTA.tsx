"use client";

import { useState } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function SignupCTA() {
  const ref = useScrollReveal<HTMLDivElement>();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire this to a real endpoint — a waitlist tool (e.g. ConvertKit,
    // Mailchimp) if pre-launch, or your actual signup/auth API if the app is
    // live. For now this just confirms the form works end-to-end.
    setStatus("submitted");
  }

  return (
    <section id="begin" className="chapter" style={{ textAlign: "center" }}>
      <div ref={ref} style={{ maxWidth: 480, margin: "0 auto" }}>
        <span className="eyebrow">V. Begin</span>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: "clamp(28px, 5vw, 44px)",
            margin: "20px 0 28px",
          }}
        >
          Let something be read to you.
        </h2>

        {status === "idle" ? (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}
          >
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: "1 1 260px",
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: 6,
                color: "var(--text)",
                padding: "13px 16px",
                fontSize: 15,
                fontFamily: "var(--font-body)",
              }}
            />
            <button
              type="submit"
              className="eyebrow"
              style={{
                background: "var(--amber)",
                color: "#1a1a1a",
                border: "none",
                borderRadius: 6,
                padding: "13px 26px",
                cursor: "pointer",
              }}
            >
              Sign up
            </button>
          </form>
        ) : (
          <p style={{ color: "var(--amber)", fontFamily: "var(--font-mono)", fontSize: 13 }}>
            You&apos;re on the list. More soon.
          </p>
        )}
      </div>
    </section>
  );
}
