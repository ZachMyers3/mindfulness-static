# item-13 §15.11 duplicate close-out — verification

**Item:** `[~] item-13. [frontend] Create src/pages/index.astro (loads pages/home, renders hero + body + CTA).` — §15.11 Launch duplicate line (line 446 in ledger).
**Original implementation:** already `[v]` approved at line 137 — commit `e224dd6` (verified by inspector 2026-07-28T22:51).
**Cycle purpose:** verification-only close-out — re-verify the file on the current `develop` HEAD and mark this open line `[c]`.

## Implementation state on `develop` (HEAD = 87adb3c)

- `src/pages/index.astro` exists and matches the approved structure: `getEntry('pages','home')` → `BaseLayout` with `title/description/noindex` props → `<Hero>` (full-bleed, with `ctaLabel="View Schedule"`, `ctaHref="/schedule"`, `alt` set on the image) → `<article class="home-body prose"><Content /></article>`.
- No diff from the approved commit `e224dd6`. The file was last modified by commit `8aa47c3` (item-52 CI workflow, which doesn't touch pages).

## Verification on current `develop` HEAD (87adb3c)

- `npm run build` → exit 0; 11 routes built in 3.66s; `dist/sitemap-index.xml` generated. ✅
- `grep -E 'meta name="robots" rel="canonical"' dist/index.html` → no `<meta name="robots" content="noindex">` (item-68 cutover working); canonical + OG/Twitter cards present. ✅
- `npm test` (vitest) → 3/3 pass. ✅
- `src/content/pages/home.md` frontmatter — `title` + `description` set; `noindex` defaults to `false` via schema (item-68). ✅

## Result

Pure verification close-out. No code changes required. Marking line `[c]` to match the already-approved implementation at line 137.

commit <pending> (initial commit be07329, post-amend HEAD 291116b; per skill rule, `<pending>` retained)
