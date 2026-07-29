# Review: item-53 — Add ESLint + eslint-plugin-astro + Prettier; wire npm run lint

**Verdict: REWORK**

## Summary

The implementation adds ESLint, eslint-plugin-astro, Prettier, and the lint/format scripts to package.json — but `npm run lint` currently fails with 18 errors (17 errors, 1 warning) in the `scripts/` directory. The design doc §15.8 / §13.1 requires a working `npm run lint` that catches obvious mistakes.

## Design Doc Requirements (referenced sections)

- **§15.8 item**: "Add ESLint with `eslint-plugin-astro` and Prettier; wire `npm run lint` [S-13]"
- **§13.1 test layers table**: "Linter / formatter → `eslint` (Astro plugin) + `prettier` → Catches obvious mistakes; not a substitute for tests."
- **§13.3**: "No unit tests for the Astro components themselves... Testing them in isolation adds friction without adding signal." — implies the linter should at least run cleanly on the codebase.

## What Was Implemented

✅ ESLint v10 flat config (`eslint.config.mjs`) with:
- `@eslint/js` recommended
- `typescript-eslint` recommended (no type-checked)
- `eslint-plugin-astro` flat/recommended for `.astro` files
- Node.js globals for config files (`*.config.{js,mjs,ts}`, `vitest.config.ts`)
- Project-specific overrides (unused vars with `_` prefix, `astro/no-set-html-directive: off`)

✅ Prettier config (`.prettierrc`) with project conventions
✅ Prettier ignore (`.prettierignore`) excluding `dist/`, `.astro/`, `node_modules/`, `tests/axe.spec.ts`
✅ npm scripts: `lint`, `lint:fix`, `format`, `format:check`

## Issues Found

### 1. `scripts/` directory files fail linting (18 problems)

The two Node.js scripts in `scripts/` use Node.js globals that aren't declared in the ESLint config:

**`scripts/download-images.mjs`** (11 errors):
- `fetch` is not defined (line 90)
- `console` is not defined (lines 100, 103, 110, 114, 117, 122, 123, 124, 127)
- `Buffer` is not defined (line 113)
- `process` is not defined (line 130)

**`scripts/generate-og.mjs`** (7 problems: 6 errors, 1 warning):
- `'writeFileSync' is defined but never used` — warning (line 8)
- `Buffer` is not defined (line 97)
- `console` is not defined (lines 105, 109, 111)
- `process` is not defined (line 112)

These are legitimate Node.js scripts (shebang `#!/usr/bin/env node`) that run at build time. They use standard Node.js globals: `fetch` (global in Node 18+), `console`, `Buffer`, `process`, `writeFileSync` (from `fs`).

### 2. The claim's verification statement is inaccurate

The claim's `result.md` states:
> - `npx eslint .` — 0 errors, 0 warnings ✅

This is false — running `npm run lint` (which runs `eslint .`) produces 18 problems.

## Root Cause

The ESLint config includes Node.js globals only for config files (`*.config.{js,mjs,ts}`, `vitest.config.ts`), but not for the `scripts/` directory. The `scripts/` directory contains legitimate build-time Node.js scripts that should be linted with appropriate globals.

## Required Fix

Add a config entry in `eslint.config.mjs` for the `scripts/` directory with Node.js globals:

```js
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

Also fix the unused `writeFileSync` import in `generate-og.mjs` (prefix with `_` or remove if truly unused).

## Why This Is REWORK (Not DESIGN-FLAG)

The design doc is clear: wire `npm run lint` and it should work. The implementation partially works (Astro/TS files pass) but fails on project scripts. This is an implementation gap, not a design ambiguity. The design doc doesn't mention the `scripts/` directory, but a working linter should handle all project JS/TS files.

## Next Steps

1. Mason-frontend updates `eslint.config.mjs` to add Node.js globals for `scripts/**/*.{js,mjs}`
2. Fix the unused `writeFileSync` in `generate-og.mjs`
3. Verify `npm run lint` passes with 0 errors, 0 warnings
4. Re-claim the item for review

---

**Reviewed by:** inspector
**Date:** 2026-07-29T01:30:00-04:00