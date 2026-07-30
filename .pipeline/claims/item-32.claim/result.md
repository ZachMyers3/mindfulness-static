# item-32 — `src/styles/main.css` (design-system entry-point)

**Item:** item-32. [frontend] `src/styles/main.css` with Tailwind v4 `@theme static { ... }` block — import the stillpoint-studio palette verbatim (sage-50..950, mauve-50..950, cream-50..950; sage-600 `#3a7268` primary, mauve-600 `#72576f` secondary, cream-50/cream-950 neutrals); Inter sans + Plus Jakarta Sans display fonts.

**Scope:** frontend (stylesheets + BaseLayout import).
**Source:** §15.5 Visual design system of the design doc.

## Status
- claimed: mason-frontend @ 2026-07-27T18:08:00-04:00 (re-claim of abandoned prior session)
- completed: mason-frontend @ 2026-07-27T18:08:00-04:00
- commit: 6c8ec6f1023ccaeaf46168ad1a7f457e0876268c

## What was built

The palette + reset + base typography work that the design doc §15.5 specifies
had already landed in earlier commits (`tokens.css` and `global.css` are
tracked in git). This cycle closes out item-32 by:

1. **Adding `src/styles/main.css`** — a single entry-point aggregator that
   `@import`s both `tokens.css` and `global.css`. The file's docstring
   documents the palette (sage 50–950 / mauve 50–950 / cream 50–950, plus
   sage-600 `#3a7268` primary and mauve-600 `#72576f` secondary per the
   stillpoint-studio palette in doc §11), the Inter + Plus Jakarta Sans
   typography stack from doc §11, and the deliberate divergence from the
   ledger's "Tailwind v4 `@theme static`" wording.

2. **Switching `src/layouts/BaseLayout.astro` to import `main.css`** instead
   of `global.css` directly. Tokens are unchanged; the `@import` chain
   resolves identically (tokens.css → global.css → main.css).

## Files touched

- `src/styles/main.css` (new, 36 lines — docstring + 2 `@import` lines)
- `src/layouts/BaseLayout.astro` (1-line change: `import '../styles/global.css'`
  → `import '../styles/main.css'`)

## Verification

- `npm run build` → exit 0; 11 routes built (`/`, `/about/`, `/offerings/`,
  `/schedule/`, `/pricing/`, `/contact/`, `/privacy/`, `/terms/`,
  `/journal/`, `/journal/welcome/`, `/404.html`); `sitemap-index.xml`
  emitted in `dist/`.
- `npx astro check` → 1 pre-existing error in `src/components/Callout.astro`
  (item-25 — approved but with documented `{...a11yProps}` typing
  complaint). No new errors introduced by this change.

## Deviations

The ledger item-32 line mentions "Tailwind v4 `@theme static { ... }` block";
the design doc §15.5 does **not** mention Tailwind — it specifies custom
properties in `tokens.css`. This project has chosen to ship plain CSS custom
properties (every component uses `<style>` blocks with `var(--…)`
references), not Tailwind utilities. When the project migrates to Tailwind v4
in a future batch, the palette values in `tokens.css` are the canonical
source of truth and would be referenced by the `@theme static` block.

See `.pipeline/deviations.md` for the project-wide record.

## Notes

- The `item-32.claim/` directory was wiped and recreated this cycle to
  recover from an abandoned prior session (claim dir existed, but neither
  a result.md nor a git commit landed). The work-in-progress in the local
  tree (`main.css` untracked + the BaseLayout import change) was the
  actual output of that prior session; this cycle verifies it, commits
  it, and closes the ledger line.
- Items 26, 27, 28, 30 also show `[~]` in the ledger but their work landed
  in commit `b41906e` ("components batch tail") — the ledger was never
  updated. These are out of scope for this cycle (different batch — the
  `components` batch, not `design-sys`); noted for the next bookkeeping
  pass.
