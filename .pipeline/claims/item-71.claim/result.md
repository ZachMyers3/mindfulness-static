# Claim: item-71 — Replace picsum.photos placeholder images with genuine Unsplash images

## Summary

Replaced all 10 placeholder images in `src/assets/` with genuine Unsplash photography (wellness/yoga/nature). Created `scripts/download-unsplash-images.mjs` for reproducibility and `public/credits.md` for optional attribution per §2 N7, §11, §15.5.

## Images Replaced (10 total)

| File | Dimensions | Source |
|------|-----------|--------|
| hero-yoga.jpg | 1920×1080 | Unsplash — Getty Images (sunrise yoga) |
| about-studio.jpg | 1200×800 | Unsplash — eran design (modern studio) |
| offerings-vinyasa.jpg | 800×600 | Unsplash (sun salutation) |
| offerings-yin.jpg | 800×600 | Unsplash (yin/restorative) |
| offerings-meditation.jpg | 800×600 | Unsplash — Margaret Young (seated meditation) |
| schedule-class.jpg | 1200×800 | Unsplash — Christian Harb (group class) |
| pricing-membership.jpg | 800×600 | Unsplash (yoga mats + plants) |
| journal-wellness.jpg | 1200×800 | Unsplash (morning mountains) |
| contact-studio.jpg | 1200×800 | Unsplash — Margaret Young (yoga pose) |
| og-fallback.jpg | 1200×630 | Unsplash (wellness landscape) |

All images verified as real Unsplash CDN downloads (JFIF + ICC profile markers, not picsum Exif markers).

## Files Created

1. `scripts/download-unsplash-images.mjs` — Node.js script that downloads all 10 Unsplash images + generates credits.md. Captures photographer attribution and Unsplash source URLs.
2. `public/credits.md` — Attribution table listing all 10 images with photographer/source links.

## Verification

- `npm run build` ✓ (11 routes built, sitemap-index generated)
- `npm test` ✓ (3 vitest unit tests passed)
- All 10 images verified as genuine Unsplash JPEGs (no picsum.photos remaining)
- `grep -r "picsum" src/ public/` → no results

## Deviation

Two Unsplash photo URLs from the original download script (schedule-class.jpg, og-fallback.jpg) returned 404s. Updated to working Unsplash photo IDs: schedule-class.jpg → photo-1761034114082, og-fallback.jpg → photo-1540205597869.

---

**Claim completed by:** mason-frontend @ 2026-07-29T04:22:00-04:00
**Commit:** 199ac86
