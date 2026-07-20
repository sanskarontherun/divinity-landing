import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Divinity — Given voice from above.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#1c1611",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(ellipse 60% 60% at 50% 42%, rgba(201,150,60,0.22) 0%, rgba(28,22,17,0) 70%)",
          }}
        />
        <svg width="96" height="96" viewBox="0 0 512 512" style={{ marginBottom: 36 }}>
          <defs>
            <linearGradient id="g" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f0c374" />
              <stop offset="55%" stopColor="#c9963c" />
              <stop offset="100%" stopColor="#8a6526" />
            </linearGradient>
          </defs>
          <path
            d="M256 90 C 292 138, 328 170, 328 220 C 328 262, 296 292, 256 292 C 216 292, 184 262, 184 220 C 184 170, 220 138, 256 90 Z"
            fill="url(#g)"
          />
          <path
            d="M256 152 C 274 174, 292 190, 292 216 C 292 238, 276 252, 256 252 C 236 252, 220 238, 220 216 C 220 190, 238 174, 256 152 Z"
            fill="#1c1611"
            opacity={0.55}
          />
        </svg>
        <div
          style={{
            display: "flex",
            fontSize: 84,
            color: "#ece4d3",
            fontWeight: 500,
            letterSpacing: "-0.02em",
          }}
        >
          Given voice
          <span style={{ color: "#c9963c", marginLeft: 22, fontStyle: "italic" }}>
            from above.
          </span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 26,
            fontSize: 26,
            color: "#a08f74",
            letterSpacing: "0.02em",
          }}
        >
          Divinity — a quiet sanctuary for the things you never had time to finish.
        </div>
      </div>
    ),
    { ...size }
  );
}
