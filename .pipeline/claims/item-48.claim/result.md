# item-48 — Keyboard-tab traversal verification

## Claim
- **Item**: item-48
- **Scope**: [frontend] Tab through every page with the keyboard; verify focus is visible and logical.
- **Branch**: `develop`
- **Claimed**: 2026-07-29T04:41:00-04:00 (re-claimed; original [~] stamp was stale with no claim dir)
- **Completed**: 2026-07-29T06:46:00-04:00

## Work Done
1. Audited focus indicators across the codebase. Found that every component relies on the global `:focus-visible` outline declared in `src/styles/global.css` (using `var(--color-focus)` = sage primary). Buttons, ServiceCard, FaqAccordion, and PricingCard have explicit `:focus-visible` overrides where needed; the global rule covers everything else.
2. Discovered a **duplicate skip-link** in `SiteHeader.astro` — BaseLayout already renders the skip-link as the first focusable element, so the one in SiteHeader (and its duplicate `.skip-link` styles) was redundant. The duplicate would have made the first 2 Tab presses both hit a skip-link, breaking logical tab order.
3. Removed the duplicate skip-link from `SiteHeader.astro` (kept only the BaseLayout one, which already has JS to focus `#main` on click).
4. Created `tests/e2e/keyboard-tab.spec.ts` — a 70-test Playwright suite that automates the §15.7 manual keyboard-tab check across all 10 public routes (7 assertions per route):
   - First focused element is the skip-link
   - Skip-link has a visible focus outline
   - Tab order reaches header logo and nav links
   - Every focused element in the tab chain has a visible outline
   - Footer links are reachable via Tab
   - No focus trap (chain eventually reaches BODY)
   - Every interactive element is keyboard accessible

## Deviations
- **Source deviation**: §15.7 lists "Tab through every page with the keyboard" as a manual verification item. I implemented it as an automated Playwright test instead, because manual tab-through is not auditable and doesn't fit the pipeline's CI gate pattern (item-52 CI runs the playwright suite on every push). The test passes deterministically and would catch a regression if a future change broke focus order or removed focus styles.
- **Discovered duplicate skip-link (fixed)**: Item-48's audit caught a latent a11y bug where SiteHeader rendered a second skip-link alongside the one in BaseLayout. This was a real defect — a keyboard user pressing Tab on every page would land on two skip-links before the logo. Fixed by removing the duplicate from SiteHeader. The comment in SiteHeader was updated to clarify that the skip-link is now BaseLayout's responsibility.

## Verification
- ✅ Build passes: `npm run build` → 11 routes, sitemap-index.xml generated
- ✅ Vitest 3/3 pass (`npm test`)
- ✅ Playwright 88/88 pass (70 new keyboard-tab + 10 axe-core accessibility + 8 site E2E)
- ✅ ESLint clean on changed files (pre-existing lint errors in `scripts/*.mjs` are out of scope)
- ✅ Build output: skip-link appears exactly once in every HTML page (was previously twice)

## Files Changed
- `src/components/SiteHeader.astro` (remove duplicate skip-link markup + styles; update header comment)
- `tests/e2e/keyboard-tab.spec.ts` (new file — 70 tests, 7 assertions × 10 routes)

## Commit
Commit d2d57cc372ed3b851de6e9e02ca6f5256f44f7f0.
