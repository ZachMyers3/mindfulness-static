# item-23 — PageHeader.astro (smaller hero band for inner pages)

## Status
- claimed: mason-frontend @ 2026-07-27T08:15:00-04:00
- completed: mason-frontend @ 2026-07-27T08:18:00-04:00
- commit: <pending>

## What was built
`src/components/PageHeader.astro` — smaller hero band per design-doc §9.2:

- **Props:** `title`, `description?`, `image?`, `alt?`, optional `breadcrumb?: { label, href? }[]`, optional `class`. All required props per ledger, optional props marked with `?`.
- **Render:** `<section aria-labelledby="page-header-title">` containing breadcrumb nav (when present), then a two-column flex layout (text 60% / image 40%) that stacks vertically below 768px.
- **H1 = page title** per §9.2. Text column gets the description if provided.
- **Breadcrumb:** renders as `<nav aria-label="Breadcrumb"><ol>...</ol></nav>`. Last crumb gets `aria-current="page"` and renders as a non-link `<span>`. Separator rendered as `/` with `aria-hidden="true"`.
- **Image:** `<img loading="eager" decoding="async">`. When image absent, header renders as a text-only band (still uses PageHeader semantics).
- **Mobile:** image moves above text (`order: -1`), full-width, 4:3 aspect ratio container.
- **a11y:** semantic breadcrumb, H1 for page title, focus-visible button styles inherited from global.

## Verification
- `npm run build` → 11 pages built, exit 0.
- Component smoke: parsed cleanly with all prop combinations.

## Files touched
- `src/components/PageHeader.astro` (new, 153 lines)

## Notes
- `breadcrumb` prop is an addition beyond the ledger minimum; it implements the optional "Home / About" breadcrumb explicitly mentioned in §9.2. Documented in the component's docstring.
- PageHeader is not yet wired into any inner page; those pages exist (about, offerings, etc., from item-14) but the inner-page route template only loads the Markdown entry via `getEntry`. Wiring PageHeader into the route templates is a separate scope item (or could be folded into the existing inner-pages batch as a follow-up).