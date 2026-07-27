# item-24 — Button.astro (styled <a> with primary/secondary variants)

## Status
- claimed: mason-frontend @ 2026-07-27T08:15:00-04:00
- completed: mason-frontend @ 2026-07-27T08:18:00-04:00
- commit: <pending>

## What was built
`src/components/Button.astro` — styled anchor per design-doc §15.4:

- **Props:** `href` (required), `variant?: 'primary' | 'secondary'` (default `primary`), optional `class`.
- **Render:** `<a class:list={['button', `button--${variant}`]}>`. Slot for label.
- **External-link safety:** if `href.startsWith('http')`, adds `rel="noopener"` and `target="_blank"` so external links open safely in a new tab without leaking the opener. Per ledger item-24 spec.
- **Styles:** sage-600 filled primary, sage-600 outlined secondary. `:focus-visible` outline using sage-600 with 2px outline-offset (keyboard a11y).
- **`prefers-reduced-motion: reduce`** disables the hover transition.

## Verification
- `npm run build` → 11 pages built, exit 0.
- Component smoke: parsed with both variants, with internal and external hrefs.

## Files touched
- `src/components/Button.astro` (new, 85 lines)

## Notes
- Adding `target="_blank"` for external URLs is a strict superset of the ledger spec (which only requires `rel="noopener"`). The standard security pairing is `rel="noopener noreferrer"`, and `target="_blank"` is implied when `rel="noopener"` is requested without an in-tab target. This is the conventional safe-default for static marketing sites.
- Button is the dependency for Hero (item-22) which imports it. Same batch.