# Item-15 Result

**Item**: item-15. [frontend] Create `src/pages/privacy.astro` and `src/pages/terms.astro` (simple prose pages)

**Scope**: frontend (inner-pages batch, content-copy batch)

**Commit**: `762d21d9ae15957ffda74cbb46c953bdd98c39b4` (full hash recorded for traceability; ledger references the short hash `762d21d`)

**Files touched**:
- `src/pages/privacy.astro` (new) — loads `pages/privacy` via `getEntry`, renders in `BaseLayout`
- `src/pages/terms.astro` (new) — loads `pages/terms` via `getEntry`, renders in `BaseLayout`
- `.pipeline/ledger.md` — item-15 line updated `[x]` with commit hash

**Implementation**:
- Followed the exact pattern from `contact.astro` (item-14 batch): `getEntry` → `render` → pass `title`/`description`/`noindex` to `BaseLayout` → `<article class="prose"><Content /></article>`.
- `noindex = true` default from `BaseLayout` props and `entry.data` keeps staging-safe noindex (item-42).
- Content bodies come from `src/content/pages/privacy.md` and `terms.md` (created in item-10 page-stubs batch).
- No new components needed; reuses existing `BaseLayout`, `SeoHead`, `prose` CSS (pending design-sys batch).

**Verification**:
- `npm run build` → exit 0, 8 static routes generated including `/privacy/` and `/terms/`.
- Sitemap (`dist/sitemap-0.xml`) lists both new routes.
- HTML output for `/privacy/` and `/terms/`:
  - `<title>` matches frontmatter `title`
  - `<meta name="description">` matches frontmatter `description`
  - `<meta name="robots" content="noindex">` staging-safe default present
- No new dependencies, no lint/test failures (tests not yet configured — items 49–53).

**Deviations / notes**:
- None. Implementation exactly matches the design doc §15.15 and the inner-pages batch pattern established by items 13–14.

**Next items in batch**: item-16 (404.astro), item-17 (journal routes).
