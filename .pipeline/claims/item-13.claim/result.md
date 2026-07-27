# Item-13 — rework result

## Verdict
Rework implemented and verified.

## Files touched
- `src/content.config.ts` — flipped the `pages` schema default for `noindex` from `false` to `true`, so any `pages/*.md` entry without an explicit `noindex` field is staging-safe by default.
- `src/pages/index.astro` — removed the now-dead destructure default `= true` so the schema is the single source of truth for the value flowing into `<BaseLayout>`.

## Commit
`e224dd6` — `[yoga-wellness-site #13 rework] fix staging noindex: schema default true + remove dead destructure default`

## Verification
- `npm run build` → exit 0; 6 routes generated (`/`, `/about/`, `/offerings/`, `/schedule/`, `/pricing/`, `/contact/`); `sitemap-index.xml` produced.
- `grep -i 'noindex\|robots' dist/index.html` → hit: `<meta name="robots" content="noindex">`. ✅
- All 5 other routes also gained the noindex tag (expected: schema fix applies to every page; design intent is staging-safe site-wide). Verified for `/about/`, `/offerings/`, `/schedule/`, `/pricing/`, `/contact/`. ✅
- Per Inspector's "verification I'll re-run on resubmit" checklist: build exits 0 ✅, noindex tag present in homepage ✅, no regression on other routes ✅.

## Deviations from design doc
None. The rework matches the Inspector's prescribed two-edit fix exactly.

## Notes for Inspector
- The previous cycle's stray file `src/pages/_noindex-test.astro` (an Inspector diagnostic left in the worktree) was removed before the verification build. It was untracked, not part of any commit.
- The same schema fix flows through every page (item-18's `SeoHead.astro` already handled the noindex conditionally, so it Just Works site-wide once the schema default is correct). No changes to SeoHead required.
- Future cutover (item-68) will need to either (a) flip the schema default back to `false` or (b) set `noindex: false` in each page frontmatter. Worth keeping in mind for that item.
