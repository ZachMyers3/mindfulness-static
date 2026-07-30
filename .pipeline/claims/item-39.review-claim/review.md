# Item-39 Review

**Inspector:** inspector
**Date:** 2026-07-29T00:29:00-04:00
**Verdict:** ✅ APPROVED

## Item

`public/og-default.jpg` (1200×630 OG fallback image) + wiring in `SeoHead.astro`

## Spec reference

Design doc §15.6 SEO + forms + 404 (item-39 spec):

- **[S-5,S-9]** "Generate `public/og-default.jpg` (1200×630, with the brand name + tagline + a tasteful background) and wire it as the default OG image in `SeoHead.astro`"

Design doc §11 Visual direction (brand tokens locked per Foreman 2026-07-26 doc-walk Q1+Q5+Q6):
- Brand name: **Mindfulness and Movement** (locked)
- Tagline: **Movement, breath, rest.** (from `site.json` `business.tagline`)
- Primary color: **sage-600 `#3a7268`** (Stillpoint Studio palette)
- Secondary color: **mauve-600 `#72576f`**
- Fonts: **Inter sans + Plus Jakarta Sans display**

## Verification

| Check | Result |
|---|---|
| File exists at `public/og-default.jpg` | ✅ |
| Dimensions 1200×630 | ✅ (verified via `file` command) |
| Copied to `dist/og-default.jpg` on build | ✅ |
| `SeoHead.astro` default image points to `${baseUrl}/og-default.jpg` | ✅ (line 10 of `SeoHead.astro`) |
| OG image meta tag emits correct URL on homepage | ✅ (`og:image` = `https://mindfulnessandmovement.example.com/og-default.jpg`) |
| OG image meta tag emits correct URL on `/about` | ✅ |
| Build passes (`npm run build`) | ✅ |
| Vitest passes (3/3) | ✅ |
| Playwright passes (8/8) | ✅ |
| Lighthouse accessibility = 1.0, performance = 1.0 | ✅ (SEO 0.66 expected due to staging `noindex`) |

## Visual verification (manual)

- Image opens as valid 1200×630 JPEG
- Sage-600 → sage-700 gradient background (Stillpoint Studio palette)
- White typography: "Mindfulness and Movement" (brand name) + "Movement, breath, rest." (tagline)
- Matches design doc §11 visual direction exactly

## Deviations from Design Doc

**None.** The implementation fully satisfies:
- §15.6 item-39: 1200×630, brand name + tagline + tasteful background, wired as default OG image
- §11 brand tokens: uses locked brand name "Mindfulness and Movement", tagline from `site.json`, sage-600 primary gradient

## Notes

1. **Staging-safe SEO** – The Lighthouse SEO score of 0.66 is expected during staging because `SeoHead.astro` emits `<meta name="robots" content="noindex">` on every page (frontmatter `noindex` defaults to `true` per item-42). Once item-68 flips `noindex: false` at cutover, SEO will pass ≥ 95. This is the documented workflow per §14 Phase 5 and does not affect item-39.

2. **No code changes needed beyond the image** – `SeoHead.astro` already had `const defaultImage = \`${baseUrl}/og-default.jpg\`` (line 10). The implementation was purely generating the correctly-spec'd image file.

3. **File location** – The image lives in `public/` (served at root `/og-default.jpg`) and is correctly copied to `dist/` by Astro's static asset handling.

## Conclusion

**APPROVED.** The OG fallback image meets all dimensional, content, branding, and wiring requirements from the design doc. No rework needed.