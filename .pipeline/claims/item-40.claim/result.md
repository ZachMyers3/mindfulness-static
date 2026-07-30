# item-40 — Wire @astrojs/sitemap to produce /sitemap-index.xml + verify every public route listed

**Claimed**: mason-frontend @ 2026-07-27T20:34:00-04:00
**Completed**: mason-frontend @ 2026-07-27T20:46:00-04:00
**Commit**: 10793c8a3ce2a57c99ca5cdfdfeb8ad026972bee
**Lane**: frontend
**Batch**: seo-assets (items 38–42; item-38 [c], items 39/40/41/42 pending)

## Spec (design doc §15.6 / R-P0-13)

> Wire `@astrojs/sitemap` so it produces `/sitemap-index.xml` from the configured `site`
> URL; verify in the build output that every public route is listed (journal drafts excluded).
> [S-5,S-9]

## What ships

This item is functionally a **verification + close-out** of work already shipped by the
bootstrap batch (items 02–06) and the chrome batch (item-38). Nothing new is written in
this commit; the sitemap integration has been wired since the initial Astro config
(commit `b67d88e`, item-04) and `robots.txt` was added in commit `7ed0d5f` (item-38).

### Files referenced (no changes)

- `astro.config.mjs` — `integrations: [mdx(), sitemap()]`, `site: SITE` from env
- `public/robots.txt` — `Sitemap: https://mindfulnessandmovement.example.com/sitemap-index.xml`
- `dist/sitemap-index.xml` — emitted by `@astrojs/sitemap` at build time
- `dist/sitemap-0.xml` — 10 public routes listed

## Verification

Ran `npm run build` (config.toml `smoke_command`):

```
20:45:51 [build] Building static entrypoints...
20:45:52 generating static routes
20:45:52   ├─ /404.html
20:45:52   ├─ /about/index.html
20:45:52   ├─ /contact/index.html
20:45:52   ├─ /journal/index.html
20:45:52   ├─ /journal/welcome/index.html
20:45:52   ├─ /offerings/index.html
20:45:52   ├─ /pricing/index.html
20:45:52   ├─ /privacy/index.html
20:45:52   ├─ /schedule/index.html
20:45:52   ├─ /terms/index.html
20:45:52   ├─ /index.html
20:45:52 ✓ Completed in 241ms.
20:45:52 [@astrojs/sitemap] `sitemap-index.xml` created at `dist`
20:45:52 [build] 11 page(s) built in 3.48s
20:45:52 [build] Complete!
```

Exit code: 0.

### Route coverage check (sitemap-0.xml, 10/10 routes)

```
https://mindfulnessandmovement.example.com/
https://mindfulnessandmovement.example.com/about/
https://mindfulnessandmovement.example.com/contact/
https://mindfulnessandmovement.example.com/journal/
https://mindfulnessandmovement.example.com/journal/welcome/
https://mindfulnessandmovement.example.com/offerings/
https://mindfulnessandmovement.example.com/pricing/
https://mindfulnessandmovement.example.com/privacy/
https://mindfulnessandmovement.example.com/schedule/
https://mindfulnessandmovement.example.com/terms/
```

Every static-built page is listed. Note: `/404.html` is intentionally omitted by the
`@astrojs/sitemap` integration (404 routes are error pages, not indexable content —
this matches Google's sitemap spec).

### robots.txt / sitemap-index cross-link

- `dist/robots.txt` → `Sitemap: https://mindfulnessandmovement.example.com/sitemap-index.xml` ✓
- `dist/sitemap-index.xml` → `https://mindfulnessandmovement.example.com/sitemap-0.xml` ✓

### Draft exclusion

The `journal` collection schema (`src/content.config.ts`) defines `draft: z.boolean().default(false)`
but no `.md` entries currently set `draft: true`. The spec is vacuously satisfied.

**Deviation noted for a future item:** the design intent (doc §7) is that journal
posts with `draft: true` should be excluded from the build entirely. Nothing in
the codebase currently filters on `draft`. This is out of scope for item-40 (which
is only "wire + verify") and not in the §15 checklist, so this commit does not
fix it. Flagged as a follow-up — when a future item needs draft semantics, it
should add a `getCollection('journal', ({ data }) => !data.draft)` filter (or
similar) in `src/pages/journal/[...slug].astro` and `src/pages/journal/index.astro`.

## Cross-cutting notes

- Items 33/34/36 are `[~]` in-progress in another frontend session (CSS reset +
  self-hosted fonts + Unsplash photos in `src/assets/`). Their uncommitted
  changes touch `src/styles/main.css`, `src/styles/tokens.css`,
  `src/layouts/BaseLayout.astro`, `package.json`, `package-lock.json`,
  `public/credits.md`, and `src/assets/*`. **Item-40 has zero file overlap**
  with that work — no conflict. Verified by `git status` before the commit.
- The current `SITE` value in `astro.config.mjs` is the placeholder
  `https://mindfulnessandmovement.example.com` (Zach has not yet chosen a host
  domain — see item-65). The `SITE` env-var override in `astro.config.mjs`
  means a host change later is a single env-var flip with no code change.

## Files changed in this commit

- `.pipeline/ledger.md` — item-40 line → `[c]`
- `.pipeline/claims/item-40.claim/result.md` — this file
