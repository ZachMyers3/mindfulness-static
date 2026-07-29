# item-68. [frontend] Flip frontmatter `noindex` default to `false` on every page; cut a release commit; verify the new build goes live.

## Claimed by
mason-frontend @ 2026-07-29T07:03:30-04:00

## Scope of changes

Per design doc §15 line 873 ("Flip the frontmatter `noindex` default to `false` on every page; cut a release commit; verify the new build goes live"), this is the cutover commit that flips staging-safe defaults to production defaults:

1. **`src/content.config.ts`** — Zod schema default: `noindex: z.boolean().default(true)` → `default(false)`. The schema default is what `entry.data.noindex` resolves to when an MD frontmatter omits the field.
2. **`src/layouts/BaseLayout.astro`** — Props default + JSDoc comment: `noindex = true` → `noindex = false` (and comment "default: true for staging safety" → "default: false for production"). This is the fallback for any direct call to BaseLayout without the prop.
3. **Per-page entries** (7 files): `src/pages/{about,contact,offerings,pricing,privacy,schedule,terms}.astro` — the local `const { title, description, noindex = true } = entry.data` destructure defaults flipped to `false`. These were dead defaults (every content entry always has `noindex` set explicitly via schema, and the schema now defaults to false too), but the item scope explicitly says "every page" so they're cleaned up to match.
4. **`src/pages/404.astro`** — kept as explicit `noindex={true}`. The 404 page should always be excluded from indexing regardless of the staging/production flip; this is a deliberate exception.

## What is intentionally NOT changed

- **`src/pages/journal/index.astro`** and **`src/pages/journal/[...slug].astro`** still hardcode `noindex={true}`. These pages don't pull from the frontmatter `pages` schema; they hardcode. Per design doc scope ("Flip frontmatter `noindex` default to `false` on every page"), the journal hardcoding is a separate concern — out of scope. Flagged below as a follow-up for inspector/cyclops review.
- **`src/components/SeoHead.astro`** — its `noindex?: boolean` prop has no default (it's an optional prop, BaseLayout decides the value to pass). No change needed.
- **`src/pages/index.astro`** — has `const { title, description, noindex } = entry.data` (no local default). Since the schema default is now `false`, the page will inherit `noindex=false` from entry.data. No change needed.

## Verification

- `npm run build` → exit 0, 11 routes built (`/`, `/404.html`, `/about`, `/contact`, `/journal`, `/journal/welcome`, `/offerings`, `/pricing`, `/privacy`, `/schedule`, `/terms`). Sitemap index generated.
- `npm test` (vitest) → 1 file, 3 tests, all passing.
- Built-dist `grep 'noindex'` audit:
  - `/about`, `/offerings`, `/pricing`, `/schedule`, `/contact`, `/privacy`, `/terms`, `/index` → 0 matches ✅
  - `/journal/index.html`, `/journal/welcome/index.html` → 1 match each (the hardcoded journal noindex, out of scope per above).
  - `/404.html` → 1 match (`<meta name="robots" content="noindex">`) ✅ correct (deliberate exception).
- Schema + BaseLayout + per-page changes are all consistent (defaults all flipped to `false`).

## Deviations / follow-ups

- **Journal pages still hardcode `noindex={true}`.** Out of scope for item-68 (which targets the frontmatter default), but inspector/Cyclops may want a separate item to decide whether `/journal` and `/journal/*` should be indexed at launch. Two options if asked: (a) flip to `noindex={false}` and let SEO surface blog content, or (b) keep `noindex={true}` and surface journal only via sitemap/sidebar nav. Recommend (a) once item-66 (content copy) is done.
- **No `RELEASE.md` / release notes** — the item asks for a "release commit"; this commit IS the release commit. The release-tag/push step is downstream of `develop` → `main` PR (item-63/64) which is human-gated.

## Commit

commit 3934d32
