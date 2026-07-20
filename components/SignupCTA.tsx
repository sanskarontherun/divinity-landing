"use client";

import { useState } from "react";
import { useScrollReveal, useMagnetic } from "@/lib/useScrollReveal";
import FlameMark from "./FlameMark";

type Status = "idle" | "pending" | "submitted";

export default function SignupCTA() {
  const ref = useScrollReveal<HTMLDivElement>();
  const buttonRef = useMagnetic<HTMLButtonElement>(0.3);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "pending") return;
    setStatus("pending");
    // TODO: wire this to a real endpoint — a waitlist tool (e.g. ConvertKit,
    // Mailchimp) if pre-launch, or your actual signup/auth API if the app is
    // live. The brief pending state below is just perceived-affordance UI
    // sugar; swap the timeout for the real request.
    window.setTimeout(() => setStatus("submitted"), 700);
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

        <div aria-live="polite">
          {status !== "submitted" ? (
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}
            >
              <input
                type="email"
                required
                disabled={status === "pending"}
                placeholder="you@example.com"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                style={{
                  flex: "1 1 260px",
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: 6,
                  color: "var(--text)",
                  padding: "13px 16px",
                  fontSize: 15,
                  fontFamily: "var(--font-body)",
                  opacity: status === "pending" ? 0.6 : 1,
                }}
              />
              <button
                ref={buttonRef}
                type="submit"
                disabled={status === "pending"}
                className="eyebrow"
                style={{
                  background: "var(--amber)",
                  color: "#1a1a1a",
                  border: "none",
                  borderRadius: 6,
                  padding: "13px 26px",
                  cursor: status === "pending" ? "default" : "pointer",
                  opacity: status === "pending" ? 0.7 : 1,
                  willChange: "transform",
                }}
              >
                {status === "pending" ? "Adding you…" : "Sign up"}
              </button>
            </form>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div className="ember-breathe">
                <FlameMark size={28} />
              </div>
              <p style={{ color: "var(--amber)", fontFamily: "var(--font-mono)", fontSize: 13 }}>
                You&apos;re on the list. More soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
