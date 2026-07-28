# item-50 claim result

**Status:** ✅ Complete

**What was done:**
- Installed `@playwright/test` as a devDependency
- Created `playwright.config.ts` with Chromium project, preview server webServer config
- Created `tests/e2e/site.spec.ts` with 8 E2E tests covering doc §13.2 cases:
  - Test 5: Home page renders brand name from site.json
  - Test 6: Current nav link marked aria-current="page"
  - Test 7: Contact page contains mailto link (adapted from Formspree — project uses mailto only per Q3)
  - Test 9: Sitemap contains every public route (fetches sitemap-index.xml, follows to child sitemap)
  - Test 10: 404 page renders for unknown route
  - Test 11: Draft journal post excluded from journal listing
  - Test 12: JSON-LD on /contact parses as valid LocalBusiness
  - Test 13: No console errors on any route
- Added `test:e2e` and `test:e2e:ui` scripts to package.json
- Tests 1–3 (site.json Zod validation) already covered by Vitest in `src/lib/site.test.ts`
- Tests 14 (Lighthouse) and 15 (axe) are separate pipeline items (item-51 and item-47)

**Verification:**
- `npm test` (Vitest): 3/3 pass
- `npx playwright test`: 8/8 pass (Chromium, ~12.5s)

**Deviation:**
- Test 4 (`page with missing title fails build`) omitted — this is a build-time check that requires deliberately breaking a page; not suitable for a stable E2E suite.
- Test 7 adapted from Formspree form submission to mailto link test (per project decision Q3=mailto).
- Test 8 (honeypot field) omitted — no contact form exists; mailto link only.
- Tests 14 (Lighthouse ≥95) and 15 (axe zero serious) deferred to their own pipeline items (item-51 and item-47).
