import FlameMark from "./FlameMark";

export default function Footer() {
  return (
    <footer style={{ textAlign: "center", padding: "80px 24px 48px" }}>
      <FlameMark size={26} />
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          color: "var(--muted)",
          fontSize: 14,
          margin: "20px 0",
        }}
      >
        &ldquo;Listening is a magnetic and strange thing, a creative force.&rdquo;
        &nbsp;— Brenda Ueland
      </p>
      <a
        href="mailto:namasteamdivinity@gmail.com"
        className="eyebrow"
        style={{ color: "var(--amber)", textDecoration: "none" }}
      >
        namasteamdivinity@gmail.com
      </a>
    </footer>
  );
}
