# item-47 — axe-core accessibility audit

## Claim
- **Item**: item-47
- **Scope**: [frontend] Run `@axe-core/playwright` against every route; fix `serious` or `critical` violations.
- **Branch**: `develop`
- **Claimed**: 2026-07-28T12:20:00-04:00
- **Completed**: 2026-07-29T01:32:00-04:00

## Work Done
1. Created `tests/e2e/accessibility.spec.ts` running axe-core against all 10 public routes.
2. Ran tests — initial failures showed **color-contrast** violations (serious impact) on footer copyright text across all pages:
   - Foreground: `#777777` on background `#1a1a1a` (ratio 3.88:1, needed 4.5:1)
3. Fixed by updating `src/components/SiteFooter.astro` to use design tokens:
   - Background: `var(--color-cream-950)` → `#2e2c22`
   - Copyright text: `var(--color-cream-500)` → `#c9bc99`
   - Contrast ratio now ~6.8:1 (WCAG AA compliant)
4. Re-ran axe tests — **0 serious/critical violations** across all routes.

## Results
- ✅ All 10 routes pass axe-core with no serious or critical violations
- ✅ Moderate `page-has-heading-one` violations on some pages (acceptable per WCAG; not serious/critical)
- ✅ Build passes (`npm run build`)

## Files Changed
- `tests/e2e/accessibility.spec.ts` (new)
- `src/components/SiteFooter.astro` (footer colors → design tokens)

## Commit
`git commit` pending — will stamp after ledger update.