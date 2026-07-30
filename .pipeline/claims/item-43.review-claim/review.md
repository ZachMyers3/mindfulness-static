# Item-43 Review

**Inspector:** inspector
**Date:** 2026-07-29T00:34:00-04:00
**Verdict:** ✅ APPROVED

## Item

`[frontend]` Add skip-link as first focusable element on every page (rendered by `BaseLayout.astro`)

## Spec reference

Design doc §15.7 Accessibility (line 844):
- "[ ] Add a skip-link as the first focusable element on every page (rendered by `BaseLayout.astro`) [S-5,S-9, S-9]"

Design doc §9.4 Navigation:
- "**Skip link.** First focusable element on every page is 'Skip to main content', hidden until focused."

Design doc §15.3 Pages and routing, item-12:
- `BaseLayout.astro` props: `title`, `description`, `noindex`; renders `<SeoHead>`, optional `<AnnouncementBar>`, `<SiteHeader>`, `<main id="main">`, `<SiteFooter>`
- Batch note: "a11y-markup (skip-link must be first focusable in BaseLayout)"

## Verification

| Check | Result | Evidence |
|---|---|---|
| File exists at `src/layouts/BaseLayout.astro` | ✅ | Verified |
| Skip-link is first child of `<body>` | ✅ | Line 23: `<a href="#main" class="skip-link">Skip to main content</a>` before `AnnouncementBar`, `SiteHeader`, `main` |
| Link targets `#main` (the `<main>` element) | ✅ | `href="#main"` matches `<main id="main">` |
| `<main>` has `tabindex="-1"` for programmatic focus | ✅ | `<main id="main" tabindex="-1">` line 28 |
| Skip-link hidden by default, visible on focus | ✅ | CSS: `top: -100%` default, `top: 0` on `:focus` |
| High-contrast styling (sage-600 background, white text) | ✅ | CSS: `background: #3a7268; color: #fff;` matches design-doc primary color |
| Inline script ensures focus + smooth scroll | ✅ | Script lines 35–46: prevents default, focuses main, smooth scroll |
| Respects `prefers-reduced-motion` | ✅ | `@media (prefers-reduced-motion: reduce)` disables smooth scroll |
| Build passes | ✅ | Verified in item-42 cycle (commit de14fbfe) |

## Notes (non-blocking)

1. **Design doc color token alignment** – The skip-link uses `#3a7268` (sage-600) directly rather than a CSS custom property from `tokens.css`. The design doc §15.5 specifies tokens as the canonical source. This is a minor token-drift deviation but does not violate the accessibility requirement. The item-33 review (CSS reset + tokens) noted this pattern of hard-coded hex values pending design-sys batch.

2. **Focus outline on main** – `main:focus { outline: none; }` removes the focus ring on the main element itself. Since the skip-link visually indicates focus and the main content receives programmatic focus, this is acceptable UX but could be revisited if manual tabbing to main shows no visible focus indicator.

3. **Smooth scroll behavior** – The `html { scroll-behavior: smooth; }` with `prefers-reduced-motion` override matches the design-doc requirement for motion respect.

## Conclusion

APPROVED. The implementation fully satisfies the design-doc requirement: skip-link is the first focusable element, targets the main content area, is hidden until focused, has high-contrast styling, and handles focus/scroll correctly with reduced-motion support. All verification checks pass.