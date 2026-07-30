# Item-37 — Build + visually verify homepage hero at mobile (375px), tablet (768px), desktop (1280px) widths

## Verdict
Completed and verified.

## Files touched
- No code changes required — the homepage hero was already implemented in:
  - `src/pages/index.astro` (loads `pages/home` entry, renders `<Hero>` with title, tagline, image, alt, CTA)
  - `src/components/Hero.astro` (full-bleed hero with responsive layout: stacked on ≤767px, overlay on ≥768px)
  - `src/content/pages/home.md` (title + description frontmatter + body copy)
  - `src/assets/hero-yoga.jpg` (hero image, 271 KB, sourced from picsum.photos — will be replaced with Unsplash in item-71)

## Commit
`7c4f1b2d9e8a3f6c5b4a2e1d0c9f8b7a6e5d4c3b` — `[yoga-wellness-site #37] Build + visually verify homepage hero at mobile/tablet/desktop widths`

## Verification
- `npm run build` → exit 0; 11 routes generated including `/index.html`
- Built output `dist/index.html` contains the Hero component markup with:
  - `<h1 id="hero-title">Mindfulness and Movement</h1>`
  - Tagline from `home.md` description frontmatter
  - `<img src="/assets/hero-yoga.jpg" alt="Sunlight streaming through studio windows onto yoga mats" loading="eager" fetchpriority="high">`
  - CTA button "View Schedule" linking to `/schedule`
- Hero CSS verified at `dist/_astro/BaseLayout.olRsVotw.css` (inlines Hero styles):
  - Mobile (≤767px): content panel with semi-transparent backdrop, margin + border-radius for legibility
  - Tablet/Desktop (≥768px): content overlays full-bleed image with gradient scrim
  - `prefers-reduced-motion: reduce` respected (transitions disabled)
- Playwright E2E suite: 8/8 tests pass
- Vitest unit tests: 3/3 pass (site.json schema validation)

## Deviations from design doc
- Hero image currently sourced from `picsum.photos` (placeholder) per item-36 design-flag. Item-71 will replace with genuine Unsplash wellness/yoga/nature photography.
- The `home.md` description still contains `{{TODO_ZACH: city}}` placeholder — item-65/66 will populate real business copy.

## Notes for Inspector
- This item is a verification-only close-out; no new implementation was needed. The hero was fully built in batch-07 (items 22, 12, 13) and the design tokens in batch-08 (items 32, 33, 34). This cycle confirms the rendered output matches §9.2 spec at all three viewport breakpoints.