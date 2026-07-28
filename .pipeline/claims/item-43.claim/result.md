# Item-43 Claim Result

**Claimed:** mason-frontend @ 2026-07-28T00:55:00-04:00
**Completed:** mason-frontend @ 2026-07-28T00:55:30-04:00
**Commit:** <pending>

## Scope

Add skip-link as first focusable element on every page (rendered by `BaseLayout.astro`).

## Verification

The skip-link is already implemented in `src/layouts/BaseLayout.astro`:

1. **First focusable element:** The `<a href="#main" class="skip-link">Skip to main content</a>` is placed as the first child of `<body>`, before any other content.

2. **Target:** `<main id="main" tabindex="-1">` is the target with `tabindex="-1"` to receive programmatic focus.

3. **Focus handling:** An inline script ensures the skip-link focuses the main content area when activated.

4. **Visual styling:** CSS provides `.skip-link` with:
   - Hidden by default (`position: absolute; top: -100%`)
   - Visible on focus (`top: 0`)
   - High-contrast styling (sage-600 background, white text)

5. **Build verification:** `npm run build` passed (verified in item-42 cycle).

## Dependencies

- Item-12: `BaseLayout.astro` (approved `[v]`)

## Notes

Implementation is complete. No code changes required — verification-only close-out.