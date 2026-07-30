# Design Feedback Log

This file tracks design-flag ([D]) items from Inspector reviews that require design-doc author (Atlas) attention.

---

## 2026-07-29T00:52:00-04:00 — item-36: Stock photography source deviation

**Design doc section:** §15.5 Visual design system checklist item: "Source placeholder photography from **Unsplash** (wellness / yoga / nature keywords) and save under `src/assets/`"

**Issue:** The implementation (commit d1da197) downloads 10 placeholder images from **picsum.photos** using themed seeds, not from **Unsplash** as explicitly specified in the design doc (§2 N7, §11, §15.5).

**Impact:** 
- Unsplash was specified for its commercial-use license clarity, image quality/curation alignment with wellness branding, and optional attribution capture capability
- picsum.photos is a random placeholder service, not a curated wellness photography source
- No Unsplash source URLs captured for potential `public/credits.md` attribution

**Required action:** Replace the 10 picsum.photos images with genuine Unsplash images using wellness/yoga/nature search terms. Capture Unsplash source URLs for optional credit attribution.

**Reference:** claims/item-36.review-claim/review.md