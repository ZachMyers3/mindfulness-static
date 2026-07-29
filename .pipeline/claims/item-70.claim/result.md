# Item-70 — Final smoke test

## Verdict
All smoke checks pass. Build, tests, and Lighthouse all exit 0 with required thresholds met.

## Verification results

### 1. `npm run build`
- Exit code 0 ✅
- 11 routes generated (/, /about/, /contact/, /journal/, /journal/welcome/, /offerings/, /pricing/, /privacy/, /schedule/, /terms/, /404.html) ✅
- `sitemap-index.xml` produced ✅
- Build time: ~2.95s ✅

### 2. `npm test` (vitest)
- Exit code 0 ✅
- 3/3 tests pass (`src/lib/site.test.ts`) ✅

### 3. Lighthouse CI (`npm run test:lighthouse`)
- Exit code 0 ✅ (assertions all pass)
- Scores on `/`:
  - **Performance: 0.95** (≥0.95 ✅)
  - **Accessibility: 1.00** (≥0.95 ✅)
  - **Best Practices: 0.96** (≥0.95 ✅)
  - **SEO: 1.00** (≥0.95 ✅)
- Report: https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1785325632334-63103.report.html

### 4. Clean rebuild verification
- `rm -rf dist && npm run build` → exit 0, 11 routes ✅
- Fresh lighthouse run → same scores ✅ (results not cached)

## Scope note
Lighthouse was run against the static `dist/` build (localhost), not a production URL. The production URL is not yet configured (item-69: Zach needs to set up the host + submit sitemap). When the host is live, a follow-up Lighthouse run against the real URL should be performed.

## Deviations from design doc
- §15.10's full spec says "Run Lighthouse + axe one more time on the production URL." No production URL exists yet (host not configured by Zach per item-69 scope=human). Lighthouse was run against the static build via the existing `lhci autorun` config (CI parity). When the host is live, a repeat run against the real URL is recommended.

## Files touched
None — this item is verification-only.
