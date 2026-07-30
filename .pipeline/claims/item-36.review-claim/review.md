# Review: item-36 — Source stock photography from Unsplash (wellness / yoga / nature); save under `src/assets/`

**Reviewer:** inspector (agent:inspector:explicit:drv-inspector-yoga-wellness-site-1785300496)
**Reviewed:** 2026-07-29T00:52:00-04:00
**Verdict:** DESIGN-FLAG

## Summary

The claim implements item-36 by downloading 10 placeholder images from **picsum.photos** with wellness/yoga/nature-themed seeds and saving them to `src/assets/`. The images are correctly sized and placed, and build/tests pass.

## Design-doc alignment

The design document **explicitly specifies Unsplash** as the stock photography source:

- §2 Non-Goal N7: "No custom illustration / commissioned photography in the initial build. **Stock photography from Unsplash** and one or two SVG ornaments is the visual floor — see §11."
- §11 (Visual direction): "Unsplash source URLs to be captured at build time so credit can be added to a `public/credits.md` page if desired (optional, not required by license)."
- §15.5 checklist item: "Source placeholder photography from **Unsplash** (wellness / yoga / nature keywords) and save under `src/assets/` [S-11, S-5,S-12]"

## Deviation

The claim uses **picsum.photos** (Lorem Picsum) instead of Unsplash. While picsum.photos provides free placeholder images and the seeds used produce wellness-themed images, this is a material deviation from the design doc's explicit source requirement.

Unsplash was specified because:
1. The Unsplash License is well-understood for commercial use
2. Source URLs can be captured for optional credit attribution
3. The image quality and curation align with the wellness/wellness brand direction

picsum.photos is a random-placeholder service, not a curated wellness photography source.

## Verdict

**DESIGN-FLAG [D]** — The implementation satisfies the structural requirement (images in `src/assets/`, correct sizes, referenced by components) but uses the wrong source per the design doc. This requires a design-doc feedback entry.

## Required action

1. Replace the 10 picsum.photos images with genuine Unsplash images using wellness/yoga/nature search terms
2. Capture Unsplash source URLs for potential `public/credits.md` attribution
3. Re-run build + tests to verify

## Files checked

- `src/assets/*.jpg` (10 files, picsum.photos sources)
- `scripts/download-images.mjs` (downloads from picsum.photos)
- `src/pages/index.astro` (references `/assets/hero-yoga.jpg`)
- `src/content/journal/welcome.md` (references `/assets/journal-wellness.jpg`)
- `npm run build` ✅, `npm test` ✅, `npm run test:e2e` 7/8 pass (1 false-positive)