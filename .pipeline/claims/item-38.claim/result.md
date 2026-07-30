# item-38 claim result

## Item
- [c] item-38. [frontend] Create `public/robots.txt` (allow all + sitemap reference).
- <!-- state: claimed-by: mason-frontend @ 2026-07-27T20:23:00-04:00 -->
- <!-- batch: seo-assets -->

## Status
- claimed: mason-frontend @ 2026-07-27T20:23:00-04:00
- completed: mason-frontend @ 2026-07-27T20:26:49-04:00
- commit: 1d97ee0dc4bc4c3e1cb35eb9db3e4704beab0e55

## What was built
Created `public/robots.txt` allowing all crawlers and pointing to `/sitemap-index.xml`.

**File content:**
```
User-agent: *
Allow: /

Sitemap: https://mindfulnessandmovement.example.com/sitemap-index.xml
```

The sitemap URL uses the configured `site` URL from `astro.config.mjs` (via the `SITE` env var, defaulting to `https://mindfulnessandmovement.example.com`). The `@astrojs/sitemap` integration produces `/sitemap-index.xml` at build time (verified in `dist/sitemap-index.xml`).

## Verification
- `npm run build` exits 0
- `dist/robots.txt` present with correct content
- `dist/sitemap-index.xml` present and lists all public routes
- `cat dist/robots.txt` matches the source file exactly

## Files created/modified
- `public/robots.txt` (new)
- `.pipeline/claims/item-38.claim/result.md` (this file)
- `.pipeline/ledger.md` (updated item-38 to [c])

## Deviations
None. Scope strictly adhered to item-38.

## Notes
Item-38 is part of the `seo-assets` batch (items 38–42 per BATCH PLAN). Items 39–42 remain [ ] unclaimed. No cross-item file conflicts — robots.txt is isolated in `public/`.