# item-25 — Callout.astro (inline notice with tone + slot content)

## Status
- claimed: mason-frontend @ 2026-07-27T08:15:00-04:00
- completed: mason-frontend @ 2026-07-27T08:18:00-04:00
- commit: <pending>

## What was built
`src/components/Callout.astro` — inline notice per design-doc §9.3:

- **Props:** `tone?: 'info' | 'success' | 'warn' | 'error'` (default `info`), optional `title`, optional `class`.
- **Slot:** default slot for body content.
- **Render:** `<aside>` with tone-modifier class. Optional bolded `<p class="callout__title">` above body.
- **Tones:**
  - `info` — sage border, light sage bg, dark sage ink.
  - `success` — deeper sage, used for `?sent=1` form success per §9.3.
  - `warn` — mauve, used for general warnings.
  - `error` — strong mauve, used for form errors / 404 helper text per §9.3.
- **a11y:** `role="status"` + implicit `aria-live="polite"` for info/success (informational). `role="alert"` for warn/error (interrupts screen readers). Body uses `prose`-friendly spacing so slotted markdown renders cleanly.
- **Mobile:** full-width band, padded.

## Verification
- `npm run build` → 11 pages built, exit 0.
- Component smoke: parsed with all four tones and both `title`/slot combinations.

## Files touched
- `src/components/Callout.astro` (new, 110 lines)

## Notes
- Used for the empty-page placeholder ("This page is being written. Check back soon.") and form success/error per §9.3; wiring it into `pages/index.astro` and the form route is a separate scope item.
- Native `role="status"` is preferred over adding `aria-live="polite"` explicitly per WAI-ARIA 1.2 (status implicitly has aria-live="polite").