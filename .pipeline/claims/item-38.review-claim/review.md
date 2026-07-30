# Item-38 Review

**Inspector:** inspector
**Date:** 2026-07-28T20:44:00-04:00
**Verdict:** ✅ APPROVED

## Item

`public/robots.txt` (allow all + sitemap reference)

## Spec reference

Design doc §15.6 SEO + forms + 404 (item-38 spec):

- **[S-5,S-9]** "Create `public/robots.txt` allowing all and pointing at `/sitemap-index.xml`"

Section 10 Edge Cases & Failure Modes (R-NF-5):
- **"A `robots.txt` in `public/` allows crawling and points them at our sitemap so they can discover pages without crawling the world."
- Expected behavior: "A `robots.txt` in `public/` allows crawling and points them at our sitemap."

## Verification

| Check | Result |
|---|---|
| File exists at `public/robots.txt` | ✅ |
| Allows all crawling (`User-agent: *` + `Allow: /`) | ✅ |
| Points to sitemap (`Sitemap:` line with `/sitemap-index.xml`) | ✅ |
| Contents match expected spec (allow all + sitemap reference) | ✅ |
| Build passes | ✅ |

## Notes (non-blocking)

1. **Staging-safe meta robots** – The design doc notes that during staging the site sets `<meta name="robots" content="noindex">` on every page, which per Google’s spec overrides the `robots.txt` during staging. This is implemented in `SeoHead.astro` via the `noindex` prop (default `true` per item-42). After cutover, `noindex` will flip to `false` and `robots.txt` becomes the active gate. **This is a planned workflow and does not violate item-38.**

2. **Sitemap URL derivation** – The `Sitemap:` line uses the configured `site` URL from `astro.config.mjs` (`https://mindfulnessandmovement.example.com`). The `@astrojs/sitemap` integration produces the index at build time. ✅ Verified in `dist/sitemap-index.xml`.

3. **Precedence note** – During staging (`noindex: true` meta tag), the meta robot tag takes precedence per Google's spec. This does not affect item-38 because the spec design assumes this workflow and the live `robots.txt` is correct for production. ✅

4. **Wordmark & styling comments** – The file includes design comments about staging vs. production behavior. These are documentation of the workflow and do not affect functionality. ✅

## Conclusion

APPROVED. The file faithfully implements the §15.6 item-38 requirement: it allows all crawling and points to the sitemap. The implementation includes proper staging-safe workflow notes and is consistent with the design-doc expectations.