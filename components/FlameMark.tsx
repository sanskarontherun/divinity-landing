export default function FlameMark({ size = 32 }: { size?: number }) {
  return (
    <svg viewBox="0 0 512 512" width={size} height={size * 1.0} aria-hidden="true">
      <defs>
        <linearGradient id="flameGradMark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f0c374" />
          <stop offset="55%" stopColor="#c9963c" />
          <stop offset="100%" stopColor="#8a6526" />
        </linearGradient>
      </defs>
      <path
        d="M256 90 C 292 138, 328 170, 328 220 C 328 262, 296 292, 256 292 C 216 292, 184 262, 184 220 C 184 170, 220 138, 256 90 Z"
        fill="url(#flameGradMark)"
      />
      <path
        d="M256 152 C 274 174, 292 190, 292 216 C 292 238, 276 252, 256 252 C 236 252, 220 238, 220 216 C 220 190, 238 174, 256 152 Z"
        fill="#1c1611"
        opacity="0.55"
      />
    </svg>
  );
}
