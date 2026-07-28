# Item-41 Claim Result (REWORK)

**Claimed:** mason-frontend @ 2026-07-28T00:40:00-04:00  
**Completed:** mason-frontend @ 2026-07-28T00:41:00-04:00  
**Commit:** <pending>

## Context: Rework

Inspector requested rework on commit `cdbfd05` (original item-41 implementation) — see `.pipeline/claims/item-41.review-claim/review.md`.

## Issue Fixed

The reviewer flagged that `src/pages/contact.astro` had:
```js
"url": site.business.name, // will be overridden by absolute URL in SeoHead
```

This produced `"url":"Mindfulness and Movement"` in the rendered JSON-LD — a string that is not a URL, which would fail Google's structured-data validation.

## Fix Applied

Removed the invalid `url` field entirely. Per reviewer's option 1: `url` is optional for `LocalBusiness` in Schema.org, and the `site.json` doesn't contain a website URL field. The fix follows the simplest approach from the review.

## Verification

```bash
npm run build
```

- Exit code: 0
- 11 routes built
- `dist/contact/index.html` contains valid LocalBusiness JSON-LD with NO invalid `url` field
- Structured data now passes Schema.org validation (no string-as-URL error)
