# item-16 — 404.astro — result

## What landed
- `src/pages/404.astro` — friendly 404 page per doc §9.3 ("Built-in Astro 404.
  Renders a friendly message + 'Go home' button. No tracking of 404s in the
  initial build.").
- `export const prerender = true` so Astro emits `dist/404.html` (the static
  path that Netlify, Cloudflare Pages, and GitHub Pages-with-custom-404 all
  look for on an unmatched route). Verified in `dist/404.html`.
- BaseLayout wrapper with `noindex={true}` so 404s don't accidentally end up
  in search indexes.
- "404" eyebrow + "Page not found" H1 + body copy ("The page you're looking
  for has either moved, been retired, or never existed in the first place.
  Take a breath — and pick a next step below.").
- Two CTAs: "Go home" (primary, sage-600) and "Get in touch" (secondary,
  outlined) → `/contact/`.
- Includes a small `{siteTagline} — {siteName}` line so the page still
  carries the brand voice in isolation (no nav/footer chrome by virtue of
  BaseLayout already rendering SiteHeader/Footer).
- Inline `<style>` scoped to `.not-found` so the page has its own look
  without needing the design-sys Tailwind tokens (which still live in
  items 32-36). Falls back to CSS vars (`--color-primary`, `--color-ink`,
  etc.) defined elsewhere — same pattern used by other unfinished pages
  awaiting the design-sys batch.
- `prefers-reduced-motion` neutralizes the CTA hover transitions.

## Verify
- `npm run build` exit 0.
- `dist/404.html` present after build.
- Astro's build log: "├─ /404.html (+39ms)" — page emitted.
- `sitemap-0.xml` does NOT list `/404/` (correct: 404 is a fallback, not a
  discoverable route — same as `/index.html` is not in the URL set).

## Deviations from doc §9.3 literal
- Doc says "link to `/` and `/contact`". Implemented as two buttons
  (`<a class="not-found__cta">`) styled as CTAs, not bare links — better
  visual prominence on a 404 (which is the page most likely to lose the
  user's trust). Functionally equivalent: both routes are linked.
- Inline `<style>` block rather than Tailwind classes — same reason as
  every other component so far (design-sys batch 08 not yet landed). No
  `class="not-found__cta--primary"` strings hard-coded; they are scoped
  class names within the file.

## Notes
- The 404 page intentionally reads `site.business` (not `site.contact`
  etc.) because at this point in the build there are no other chrome
  elements to give the visitor a brand cue — the 404 has to be its own
  signpost.
- No 404-tracking analytics (per spec — analytics is a Zach decision, not
  yet made).

See `claims/item-13.claim/result.md` for the staging-noindex context
(item-16 inherits the staging-safe default by passing `noindex={true}`
explicitly, so even if item-42's cutover flips the schema default, this
specific page is still safe).
