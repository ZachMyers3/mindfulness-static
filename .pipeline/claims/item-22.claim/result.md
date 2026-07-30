# item-22 — Hero.astro (full-bleed hero)

## Status
- claimed: mason-frontend @ 2026-07-27T08:15:00-04:00
- completed: mason-frontend @ 2026-07-27T08:18:00-04:00
- commit: <pending>

## What was built
`src/components/Hero.astro` — full-bleed hero per design-doc §9.2:

- **Props:** `title`, `tagline`, `image`, `alt`, `ctaLabel?`, `ctaHref?`, optional `class`. All required props per ledger, `cta*` optional as specified.
- **Render:** `<section aria-labelledby="hero-title">` containing `<h1>`, `<p>` tagline, optional CTA `<Button>`. Hero image fills the section with `object-fit: cover`; text overlays via a content layer.
- **Image:** `<img loading="eager" decoding="async" fetchpriority="high">` so the hero preloads with the initial HTML (above-the-fold performance per §12).
- **Scrim:** linear-gradient overlay on the image for legibility over any photo.
- **Mobile:** text panel sits beneath the image; padded translucent backdrop so it stays legible against any hero art.
- **a11y:** aria-labelledby pointing at the h1; semantic H1 for the page's primary heading; `prefers-reduced-motion` respected.
- **Style:** uses the brand palette (sage-600 #3a7268 for the CTA), warm cream/mauve from §9.2.

## Verification
- `npm run build` → 11 pages built, exit 0.
- Component smoke: temporary page importing Hero with all prop combinations (with/without CTA, all image/alt variations) parsed cleanly; removed before commit.
- Hero imports `./Button.astro` — companion batch item-24.

## Files touched
- `src/components/Hero.astro` (new, 113 lines)

## Notes
- No `astro check` configured for the project (no `astro check` script in package.json), so the build exit code is the only formal verification.
- The Hero is not yet wired into `pages/index.astro` — that's a separate ledger item (index.astro already exists at item-13). Out of scope for this item; flag in deviations.