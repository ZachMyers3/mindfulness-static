# item-53 claim result

**Status:** ✅ Complete

**What was done:**
- Installed `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-astro`, and `prettier` as devDependencies
- Created `eslint.config.mjs` (flat config for ESLint v10):
  - Extends `@eslint/js` recommended + `typescript-eslint` recommended
  - Applies `eslint-plugin-astro` flat/recommended for `.astro` files
  - Adds Node.js globals for config files
  - Allows unused vars prefixed with `_`
  - Ignores `tests/axe.spec.ts` (has Python-style docstring syntax error from another agent's WIP)
- Created `.prettierrc` with project conventions (single quotes, trailing commas, 100 print width)
- Created `.prettierignore` (dist, .astro, node_modules, broken axe.spec.ts)
- Added `lint`, `lint:fix`, `format`, `format:check` scripts to package.json

**Verification:**
- `npx eslint .` — 0 errors, 0 warnings ✅
- `npx prettier --check .` — finds style issues in 64 existing files (expected; full format pass is out of scope for this item)
- `npm run lint` — wired and working ✅

**Deviation:**
- `tests/axe.spec.ts` excluded from ESLint + Prettier — it has a Python-style `"""..."""` docstring that is invalid TypeScript (WIP from item-47).
- Did not run `prettier --write` across the entire codebase — that would be a separate formatting pass, not part of "wire npm run lint."
