# item-52 — Add `.github/workflows/ci.yml`

**Status:** ✅ Complete

## What was done
- Created `.github/workflows/ci.yml` with:
  - Trigger: push to `develop` + PRs to `develop`
  - Node.js 22 setup with npm cache
  - Steps: `npm ci` → `npm run build` → `npm test` (vitest) → Playwright install + `npm run test:e2e` → `npm run test:lighthouse`

## Deviations
- None — follows the design doc §13 test pipeline exactly.

## Verification
- YAML syntax validated manually (no yaml lint tool available in repo)
- All referenced npm scripts exist in package.json

**Commit:** 8aa47c3
