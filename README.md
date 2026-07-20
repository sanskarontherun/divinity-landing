# Divinity — landing page

Next.js (App Router) + React + GSAP + Three.js. This pass takes the page
from basic layout to the full cinematic build: real choreography, two
Three.js moments, glass surfaces, grain, and a written founder bio.

## Run it

```
npm install
npm run dev
```

Then open http://localhost:3000

## The signature idea

One particle field, mounted once in `app/layout.tsx`
(`components/AmbientEmberField.tsx`), fixed to the viewport so it's
present at *every* scroll position — dust suspended in candlelit air
throughout the whole page, not just the Hero. Two things layer on top of
that constant, both driven by `data-ember-*` attributes on the section
elements rather than separate particle systems:

- Over the Hero (`data-ember-hero`), the same dust gets a little more
  energy and brightness — the room is more alive at the opening.
- Over "The Turn" (`data-ember-turn`), the dust resolves into the
  flame-mark silhouette as that section scrolls through — scroll-scrubbed
  in both directions — then loosens back into ambient dust on the way
  out. A moment, not a permanent state.

One WebGL context for the entire site. Earlier passes ran this as two
separate components (`FlameField` in the Hero, `EmberConverge` in
Philosophy); they've been merged into `AmbientEmberField` so the dust
reads as one continuous atmosphere instead of three unrelated effects
that happen to share a color.

## What's new in this pass

- **Site-wide ember field** — `AmbientEmberField.tsx` replaces the old
  Hero-only `FlameField` + Philosophy-only `EmberConverge`. It's fixed to
  the viewport and mounted once in the root layout, so the dust is
  visible behind every chapter, not just the top of the page.
- **Hero ignition** — the flame mark glows alight, then the headline
  arrives word by word, then the subline, then the CTA. One orchestrated
  load-in instead of a static hero.
- **Word-level and blur reveals** — headlines arrive by word
  (`useSplitTextReveal`); the Problem chapter's ache clears into focus
  via a blur-in (`useScrollReveal({ blur: true })`).
- **Glass feature cards** — `Features.tsx` now uses translucent,
  backdrop-blurred panels with a unified stagger-in instead of a flat
  bordered grid.
- **Founder photo + bio** — the photo reveals via a clip-path iris on
  scroll; the bio placeholder is replaced with a real first-person draft
  in the brand voice (still flagged as a draft — see below).
- **Magnetic CTAs** — the Hero "Begin" pill and the sign-up button pull
  gently toward the cursor on fine-pointer devices (`useMagnetic`).
- **Grain + vignette** — a runtime-generated film-grain layer
  (`components/Grain.tsx`, no image asset) and radial vignettes behind
  the Hero and Philosophy sections for depth.
- **Accessibility floor** — every animated hook checks
  `prefers-reduced-motion` and either skips or jumps to the resolved
  state; `:focus-visible` has a real outline everywhere.

## This pass: chapter nav + finalize

- **`ChapterNav`** — a quiet table of contents (`I. Problem`, `II. Turn`,
  `III. Features`, `IV. Founder`, `V. Begin`), fixed to the top, hidden
  during the Hero's invocation and fading in once you scroll past it.
  Active chapter highlights via scrollspy; clicking jumps via native
  anchor scroll (`html { scroll-behavior: smooth }`, already set).
  `html { scroll-padding-top }` was added so jumps clear the bar instead
  of tucking content underneath it.
- **Favicon + touch icon + OG image** — `app/icon.svg` (the real flame
  mark, not a placeholder), `app/apple-icon.tsx` and
  `app/opengraph-image.tsx` (both generated at request time via
  `next/og`, no image asset shipped).
- **Metadata** — `openGraph`, `twitter` card, `robots`, `metadataBase`,
  and a dark `theme-color` now set in `app/layout.tsx`. `app/robots.ts`
  and `app/sitemap.ts` added (both point at the deployed Vercel URL —
  update `siteUrl` in each if the domain changes).
- **Sign-up form polish** — a brief pending state ("Adding you…") with
  disabled inputs during submit, and `aria-live="polite"` so the state
  change is announced. Still just UI sugar — see below.

## What's real vs. still needs you

- **Founder bio** (`components/Founder.tsx`) — written to match your
  voice and the product, but it's a draft. Swap in whatever's actually
  true; specifics beat polish.
- **Sign-up form** — UI and micro-interactions are done; the submit
  handler (`components/SignupCTA.tsx`) still isn't wired to a real
  backend. Tell me which waitlist tool or API and I'll wire it.

## Structure

```
app/
  layout.tsx        fonts + full metadata (OG/Twitter/robots) + global overlays
  page.tsx           assembles the chapter sequence
  globals.css        brand tokens, glass/grain/focus/nav system
  icon.svg             favicon (flame mark)
  apple-icon.tsx         apple touch icon, generated via next/og
  opengraph-image.tsx      OG/Twitter share image, generated via next/og
  robots.ts                  robots.txt
  sitemap.ts                   sitemap.xml
components/
  Hero.tsx            I. invocation — orchestrated ignition
  Problem.tsx          II. the ache — blur-in reveal
  Philosophy.tsx        III. the turn — marked for field convergence
  Features.tsx           IV. what it does — glass panel grid
  Founder.tsx              V. who built it — clip-path photo + bio
  SignupCTA.tsx             VI. conversion — magnetic CTA
  Footer.tsx
  ChapterNav.tsx      fixed chapter table-of-contents / scrollspy
  AmbientEmberField.tsx  persistent, site-wide Three.js dust field
  FlameMark.tsx           logo glyph
  Grain.tsx                 film-grain overlay
lib/
  useScrollReveal.ts   reveal / split-text / stagger / magnetic hooks
  useHeroIntro.ts        hero load-in timeline
  flamePoints.ts           ambient / scatter / flame-silhouette point generators
  glowTexture.ts             shared soft-glow particle sprite
```

## Notes for the next pass

- Ambient audio callbacks on scroll (rain/wind/birdsong from the app),
  woven into the Features chapter.
- Real sign-up backend.
- If you want the EmberConverge shape to trace your *actual* logo mark
  pixel-for-pixel rather than a parametric approximation, that's doable
  by sampling the SVG path directly — flag it and I'll swap the
  generator in `lib/flamePoints.ts`.
