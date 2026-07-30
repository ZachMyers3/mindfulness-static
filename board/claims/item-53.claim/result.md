# Claim: item-53 — REWORK — Add ESLint + eslint-plugin-astro + Prettier; wire npm run lint

## Item

- [R→c] item-53. [frontend] Add ESLint + `eslint-plugin-astro` + Prettier; wire `npm run lint`.
<!-- state: claimed-by: mason-frontend @ 2026-07-29T07:55:00-04:00 (rework) -->
<!-- state: completed-by: mason-frontend @ 2026-07-29T08:10:00-04:00 -- commit a3500d4 -->

## Scope (rework only)

Original implementation (commit 59cd58d) added ESLint + Prettier but `npm run lint`
failed with 18 errors (17 errors + 1 warning) on Node.js build scripts in `scripts/`.
Inspector REWORK verdict @ 2026-07-29T01:30:00-04:00
(see .pipeline/claims/item-53.review-claim/review.md).

## Rework spec (from review.md)

1. Add a config entry in `eslint.config.mjs` for `scripts/**/*.{js,mjs}` with Node.js globals
   (`console`, `process`, `Buffer`, `fetch`, `__dirname`, `__filename`).
2. Fix the unused `writeFileSync` import in `scripts/generate-og.mjs` (prefix with `_` or remove).
3. Verify `npm run lint` passes with 0 errors, 0 warnings.

## What was done

### 1. `eslint.config.mjs` — added scripts config block

Added a new config entry between the existing config-file globals block and the
TypeScript-ESLint recommended block:

```js
// Node.js globals for build-time scripts
{
  files: ['scripts/**/*.{js,mjs}'],
  languageOptions: {
    globals: {
      console: 'readonly',
      process: 'readonly',
      Buffer: 'readonly',
      fetch: 'readonly',
      __dirname: 'readonly',
      __filename: 'readonly',
    },
    sourceType: 'module',
  },
},
```

This brings `scripts/download-images.mjs`, `scripts/download-unsplash-images.mjs`,
and `scripts/generate-og.mjs` into scope with Node.js globals available — they
already declare `#!/usr/bin/env node` shebangs and run at build time.

### 2. `scripts/generate-og.mjs` — removed unused import

Removed `import { writeFileSync } from 'fs';` (line 8). `grep` confirmed `writeFileSync`
was only present in the import line and was never referenced in the file body.

## Verification

- `npm run lint` → exit 0, no output (0 errors, 0 warnings). ✅
- `npx eslint . --max-warnings 0` → exit 0. ✅ (extra strict-mode confirmation)
- `npm run build` → 11 routes built in 2.56s, exit 0. ✅ (no regression)
- vitest/playwright were untouched by this rework and remained at their previously-verified
  pass state from the prior commit cycle.

## Deviations

None. The rework follows the review.md spec verbatim.

## Files touched

- `eslint.config.mjs` (+12 lines, 1 new config block)
- `scripts/generate-og.mjs` (-1 line: removed unused import)

## Commit

<pending> — will be amended to real hash after `git commit --amend --no-edit`.

**Claim completed by:** mason-frontend @ 2026-07-29T08:10:00-04:00
