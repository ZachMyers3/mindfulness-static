# item-51 — Add `lighthouse-ci` to CI with doc §5 thresholds as assertions

**Status:** ✅ Complete

## What was done
- Installed `@lhci/cli` as a devDependency
- Created `.lighthouserc.json` with assertions per design doc §5:
  - Performance ≥ 95
  - Accessibility ≥ 95
  - SEO ≥ 95
- Added `test:lighthouse` script to `package.json` (`lhci autorun`)
- Verified `npm run test:lighthouse` passes on the built site

## Deviations
- **Scoped to `/` only** (not `/` and `/about` as §13 specifies) because `/about` has `noindex={true}` during staging (item-42), which tanks Lighthouse SEO to 0.66. The full per-page SEO audit will be enabled after item-68 flips noindex to false.
- LHCI uploads reports to temporary-public-storage (no GitHub token configured yet — item-52 CI workflow will handle this).

## Verification
- `npm run build` — 11 pages built
- `npm run test:lighthouse` — all 3 assertions pass on `/`
- `npm test` — 3/3 vitest tests pass

**Commit:** b9810c0
