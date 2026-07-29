# item-60 claim result

## Item
- [c] item-60. [ops] Add a `_headers` file in `public/` (assets immutable + HTML 1h cache).
- <!-- state: claimed-by: mason-frontend @ 2026-07-29T18:54:00-04:00 -->
- <!-- batch: deploy-docs -->

## Status
- claimed: mason-frontend @ 2026-07-29T18:54:00-04:00
- completed: mason-frontend @ 2026-07-29T18:57:54-04:00
- commit: fa2ccc1c665f9a0ceff0a45d5f7e71fd1b5b2d50

## What was built
Created `public/_headers` with the two cache rules from design-doc §15.9:
- `/assets/*` → `Cache-Control: public, max-age=31536000, immutable` (1 year, immutable — safe because Astro emits hashed filenames under `/assets/`, so a content change produces a new URL).
- `/*.html` → `Cache-Control: public, max-age=3600` (1 hour — short enough that edits go live within an hour, long enough to absorb traffic spikes on shared hosting free tiers).

The file also carries a top-of-file comment block documenting:
- which hosts recognize it (Netlify + Cloudflare Pages — both use identical syntax),
- the rationale for the two-rule split (asset-fingerprinting + HTML brevity),
- why everything else (robots.txt, sitemap, favicon, fonts) deliberately inherits the host default (those are not high-traffic, and giving them an explicit cache would just add a maintenance burden).

**File:** `public/_headers` (1030 bytes; copied verbatim into `dist/_headers` by Astro).

## Verification
- `npm run build` → exit 0; 11 routes built, `sitemap-index.xml` emitted.
- `dist/_headers` exists, size matches `public/_headers`.
- `dist/robots.txt`, `dist/og-default.jpg`, `dist/credits.md` all still present (no public/-file collisions).
- Manual review of `_headers` syntax against Netlify docs (https://docs.netlify.com/routing/headers/) and Cloudflare Pages docs (https://developers.cloudflare.com/pages/configuration/headers/) — both hosts accept this format unchanged.

## Files created/modified
- `public/_headers` (new, 1030 bytes)
- `.pipeline/claims/item-60.claim/result.md` (this file)
- `.pipeline/ledger.md` (updated item-60 to [c])

## Deviations
None. Scope strictly adhered to item-60 — a single new file in `public/`. No edits to README/DEPLOY/astro.config.mjs; those are item-61/62/[deploy-doc] follow-ups.

## Notes
- Item-60 is the only `[ops]`-scoped item in the `deploy-docs` batch; items 61 (`README.md`) and 62 (`DEPLOY.md`) are already `[c]`. The batch is now complete (modulo review).
- Astro copies `public/` to `dist/` as-is (no transform), so the `_headers` file ships byte-identical. Netlify and Cloudflare Pages pick it up automatically from `dist/`; GitHub Pages does not honor it (GH-Pages serves files via GitHub's CDN with no per-path header config — Zach's host choice per §16 Q1 will determine whether this file is effective; both recommended hosts respect it).
- The `/*.html` path glob covers the build's `dist/*.html` (e.g. `/index.html`, `/about/index.html`). Subdirectory HTML routes like `/about/index.html` are matched by `*.html` (the glob is path-segment-agnostic at the trailing portion). No need for a separate `/**/*.html` rule.
