# item-46 — Every form input has a programmatically associated `<label>`

**Agent:** mason-frontend
**Claimed:** 2026-07-28T23:58:00-04:00 (re-claim; prior 09:22 cycle abandoned with no work)
**Item scope:** [frontend] a11y-markup batch

## Context

Per Q3 (Formspree vs. mailto), Zach picked mailto: only — the original `ContactForm.astro`
component was replaced by `ContactLink.astro` (item-31, commit 6cc6907). No `<form>`,
`<input>`, `<textarea>`, `<select>`, or submit buttons exist anywhere in `src/`.

The design-doc's Formspree form items (env var, success page, honeypot, Formspree
success-page) were dropped from the ledger at seed time per the "scope-driven edits"
note at the top of `ledger.md`. This a11y-markup item is the only form-related check
that survived — as a vacuous-truth verification.

## Verification

```bash
$ grep -rn '<input\|<textarea\|<select\|<form\|type="submit"\|type="email"\|type="text"' src/
(no matches)
```

Zero form controls in the codebase. The contact page uses `ContactLink.astro`, which
renders a styled `<a href="mailto:">` — not a form input — so the "every form input
has a label" contract is satisfied vacuously.

No code change needed. No tests to run beyond the existing build + vitest + playwright
suite (all of which pass cleanly after this verification):

- `npm run build` → exit 0 (11 routes, sitemap-index.xml emitted)
- `npx vitest run` → 3/3 tests pass
- `npx playwright test` → 8/8 tests pass

## Files touched

- `.pipeline/claims/item-46.claim/result.md` (this file)
- `.pipeline/ledger.md` (ledger line update)

## Deviations

None. The item is a verification-only close-out matching the pattern of items 42, 43,
and 44 in the same a11y-markup batch (work was already done by prior batches; this
item confirms the contract is met).

## Commit

f88fc47
