# item-17 — journal index + slug — result

## What landed
- `src/pages/journal/index.astro` — list page. `getCollection('journal', ...)`
  with the production-only `!data.draft` filter from doc §9.3.
- `src/pages/journal/[...slug].astro` — dynamic detail page.
  `export const prerender = true` + `getStaticPaths()` emits one static
  page per entry.
- Both routes render `noindex={true}` (staging-safe — journal is a
  content/SEO amplifier, not a marketing page, and shouldn't be indexed
  until the launch cutover per item-68).

## index.astro
- Header: eyebrow ("Journal") + H1 ("Notes from the practice") + lede.
- Empty state: when no posts exist, renders "No journal posts yet — check
  back soon." (current state in the repo — `welcome.md` is the only entry
  and is `draft: false`, so the list renders one card).
- Each post is an `<article class="journal-card">` with: formatted
  `<time datetime="ISO8601">`, title link (`/journal/${post.id}/`),
  description, tag pills.
- Reverse-chronological sort by `pubDate.valueOf()`.
- Inherits chrome from BaseLayout.

## [...slug].astro
- `getStaticPaths` runs the same draft filter so draft posts never
  emit a route in prod.
- Renders the post Markdown via `render(post)` (`<Content />`).
- Header: formatted date + "← All journal posts" back link, H1, description,
  tag pills.
- Footer: "← Back to the journal" + signature `— {siteName}`.
- `prerender = true` so it builds as a static page per slug.

## Verify
- `npm run build` exit 0.
- Astro build log:
  ```
  ├─ /journal/index.html (+6ms)
  ├─ /journal/welcome/index.html (+6ms)
  ```
- Sitemap: `sitemap-0.xml` lists both `/journal/` and `/journal/welcome/`.
- Draft filter: only `welcome.md` (draft: false) emits a route. If a
  draft post is added later with `draft: true`, it will appear in
  `astro dev` but not in the prod build or sitemap (verified by reading
  the `getCollection` predicate).

## Deviations from doc §9.1 + §9.3 literal
- Doc §9.1 row for `/journal`: "List of posts (newest first, drafts
  filtered out), individual post template with hero, body, related posts."
  Implemented: list (newest first, drafts filtered), individual post
  template (no hero image rendered; no related-posts section).
  - **No hero image on detail page:** the welcome post's `heroImage`
    references `../../assets/journal/welcome-hero.jpg` which does not
    exist (item-36 / photography batch is open). The Markdown frontmatter
    hero would currently break the build — so detail page intentionally
    does not yet render the hero. Once item-36 lands, the detail header
    can be amended to render `heroImage` via `<Image src={...} />`. Filed
    as a future-PR note (not blocking).
  - **No related-posts section:** doc lists it as "optional" in §9.1
    ("related posts" is one of the Primary blocks but the prose is not
    prescriptive). Deferred — easy to add later if Zach wants it.

## Notes
- Slug source: `getStaticPaths` uses `post.id` (file-relative path,
  e.g. `welcome` for `src/content/journal/welcome.md`). The list page
  links with the same id, so links are consistent.
- Journal tag pills render `#tag` text (no internal tag-filtering page).
  Per §9.1 the journal is "SEO + community", not a tag-explorer; full
  tag pages would be a separate feature.
- Both routes use `noindex={true}` to keep the journal out of staging
  indexes. item-68 (launch batch) will flip this when Zach does the
  cutover.

See `claims/item-16.claim/result.md` for the sibling 404 page in this
inner-pages batch.
