# Divinity — landing page (basic layout)

Next.js (App Router) + React + GSAP + Three.js, as specified. This is a
deliberately **basic first pass** — real structure and brand tokens, light
motion, not the full cinematic depth from the brief yet.

## Run it

```
npm install
npm run dev
```

Then open http://localhost:3000

## What's real vs. placeholder

- **Brand tokens (colors, fonts, flame mark)** — pulled directly from your
  existing app draft, so it's visually consistent. Real.
- **Feature copy** — written from what the app already does. Real, but
  worth your pass for tone.
- **Founder section** — your name and photo are in. The bio line is a
  bracketed placeholder (`components/Founder.tsx`) — swap in your own
  words.
- **Sign-up form** — fully functional UI, but the submit handler
  (`components/SignupCTA.tsx`) doesn't hit a real backend yet. Wire it to
  a waitlist tool or your own API once you tell me which.

## Structure

```
app/
  layout.tsx       fonts + metadata
  page.tsx          assembles the chapter sequence
  globals.css       brand tokens, resets
components/
  Hero.tsx          I. invocation + the one Three.js moment
  Problem.tsx        II. the ache
  Philosophy.tsx      III. the turn
  Features.tsx      IV. what it does
  Founder.tsx        V. who built it
  SignupCTA.tsx      VI. conversion
  Footer.tsx
  FlameField.tsx     Three.js ember particles (Hero only, by design)
  FlameMark.tsx      logo glyph
lib/
  useScrollReveal.ts  small GSAP ScrollTrigger fade-up hook
```

## Next passes (once you're ready to go deeper)

- Pinned, chaptered scroll transitions between sections (GSAP timelines)
  instead of the current simple fade-up
- Ambient audio callbacks on scroll (rain/wind/birdsong from the app)
  woven into the Features chapter
- Real sign-up backend
- Founder bio in your voice
