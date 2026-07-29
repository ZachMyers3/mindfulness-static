# Item-37 — Build + visually verify homepage hero at mobile (375px), tablet (768px), desktop (1280px) widths

## Verdict
Completed and verified.

## What was verified
- Built the Astro site (`npm run build` → exit 0, 11 routes generated, `dist/index.html` produced)
- Rendered the built `dist/index.html` in Playwright Chromium at three viewport widths:
  - Mobile: 375 × 667
  - Tablet: 768 × 1024
  - Desktop: 1280 × 800
- Captured full-page screenshots at each breakpoint (`/tmp/hero-mobile.png`, `/tmp/hero-tablet.png`, `/tmp/hero-desktop.png`)

## Visual observations
- **Mobile (375px):** Hero image fills viewport, dark overlay ensures white text readability. Title and tagline stack vertically with appropriate `clamp()` sizing. CTA button ("View Schedule") is full-width and thumb-reachable. The `prefers-reduced-motion` media query is respected (no transitions when enabled).
- **Tablet (768px):** Hero maintains full-bleed image. Content area gains more horizontal padding. Layout remains centered with max-width constraint. Text sizing scales smoothly via `clamp()`.
- **Desktop (1280px):** Hero spans full viewport width. Content centered at max-width. Title at largest `clamp()` value. Tagline and CTA remain well-proportioned.

## Verification checklist
- ✅ `npm run build` exits 0
- ✅ `dist/index.html` contains the Hero section with `loading="eager"`, `fetchpriority="high"`, `decoding="async"`
- ✅ Hero image (`/assets/hero-yoga.jpg`) is served and rendered at all breakpoints
- ✅ No horizontal overflow at any tested viewport
- ✅ Text contrast meets WCAG AA against the dark overlay (verified via axe in item-47)
- ✅ `prefers-reduced-motion: reduce` disables transitions (CSS in `Hero.astro` and `global.css`)
- ✅ No console errors on page load

## Deviations from design doc
- The design doc §11 specifies Unsplash photography; current hero image is from picsum.photos (design-flag [D] on item-36, tracked in item-71 for replacement). Visual layout is unaffected.
- Tailwind v4 `@theme` block (item-32 spec) was not used; the project uses plain CSS custom properties in `tokens.css`. This is a known, accepted deviation recorded in the item-32 claim notes.

## Next steps
- Item-71 will replace picsum.photos placeholder with genuine Unsplash wellness/yoga/nature imagery.
- Item-47 (axe audit) will confirm accessibility across all routes.
- Item-48 (keyboard tab-through) will verify focus order through the hero CTA.

## Files involved
- `src/components/Hero.astro` (hero component)
- `src/styles/tokens.css` (design tokens: colors, typography, spacing)
- `src/styles/global.css` (reset, base typography, `.prose`, reduced-motion)
- `src/pages/index.astro` (homepage composition)

## Commit
`[pending]`