import FlameField from "./FlameField";
import FlameMark from "./FlameMark";

export default function Hero() {
  return (
    <section
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
      <FlameField />

      <div style={{ position: "relative", zIndex: 1 }}>
        <FlameMark size={40} />
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: "clamp(40px, 8vw, 96px)",
            lineHeight: 1.05,
            margin: "28px 0 20px",
          }}
        >
          Given voice
          <br />
          <em style={{ color: "var(--amber)", fontStyle: "italic" }}>from above.</em>
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(15px, 2vw, 19px)",
            color: "var(--muted)",
            maxWidth: 480,
            margin: "0 auto",
          }}
        >
          Divinity reads what you never had time to finish — in a voice worth
          listening to, at the pace of a life still being lived.
        </p>

        <a
          href="#begin"
          className="eyebrow"
          style={{
            display: "inline-block",
            marginTop: 40,
            textDecoration: "none",
            border: "1px solid var(--amber-dim)",
            borderRadius: 999,
            padding: "12px 24px",
          }}
        >
          Begin
        </a>
      </div>
    </section>
  );
}
