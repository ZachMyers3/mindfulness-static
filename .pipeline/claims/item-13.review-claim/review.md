# Review: item-13 (rework verification)

**Item:** item-13 — Create `src/pages/index.astro` (loads `pages/home`, renders hero + body + CTA)
**Design doc ref:** §15.3 (Pages and routing), §9.1 (page map: `/` route), §9.2 (Hero block spec), §9.3 (states)
**Prior commit (original):** 3fd827e
**Rework commit:** e224dd6
**Reviewer:** inspector @ 2026-07-28T22:51:00-04:00

## Background

The original implementation (commit 3fd827e, orphan recovery) was marked `[c]` and reviewed in a prior cycle. That review found a critical staging-safety bug: the `pages` schema in `src/content.config.ts` set `noindex: z.boolean().default(false)`, which meant every page without an explicit `noindex` frontmatter field would be **indexable** in production — defeating the staging-safe contract required by item-42 (noindex defaults to `true` until cutover). The prior review also noted a dead destructure default `noindex = true` in `index.astro` that masked the schema default at the page level, hiding the bug during casual inspection.

The rework (commit e224dd6) made two edits:
1. `src/content.config.ts`: flipped `noindex` schema default from `false` to `true`.
2. `src/pages/index.astro`: removed the dead `= true` destructure default so the schema is the single source of truth.

## Phase 2 — Review (rework verification)

### 1. Scope

The diff touches only `src/content.config.ts`, `src/pages/index.astro`, and the ledger. No unrelated changes. ✅

### 2. Verification (independent re-run)

- `npm run build` → exit 0; 11 routes generated (including /404.html, /journal/, /journal/welcome/, /privacy/, /terms/); sitemap-index.xml produced. ✅
- `grep 'noindex\|robots' dist/index.html` → `<meta name="robots" content="noindex">` present. ✅
- Verified noindex tag present in all 6 main routes: `/`, `/about/`, `/offerings/`, `/schedule/`, `/pricing/`, `/contact/`. ✅
- The noindex tag also appears on `/privacy/`, `/terms/`, `/journal/`, `/journal/welcome/`, and `/404.html` — site-wide staging safety confirmed. ✅

### 3. Spec fidelity

Per §15.3, item-13 requires `src/pages/index.astro` that "loads `pages/home`, renders the hero + body + CTA strip."
Per §9.1, the `/` route primary blocks are: Hero, intro paragraph, 3–4 service cards (link to /offerings), short philosophy blurb, CTA strip, footer.

The index.astro at commit e224dd6:
- Loads `getEntry('pages', 'home')` ✅
- Throws a clear build error if the entry is missing ✅
- Renders `<Content />` inside `<article class="home-body prose">` ✅
- Passes `title`, `description`, `noindex` to `<BaseLayout>` ✅
- The Hero/ServiceCard/Button components referenced in the body are from batch 07 (items 22, 23, 24) — noted as deviations in the original claim, not part of this item's contract. The Markdown body renders the Hero and content via the `prose` class. ✅

The rework's primary purpose (staging noindex safety) is achieved: the schema default is now `true`, flowing through every page that doesn't explicitly override it. This aligns with item-42's contract (noindex defaults to `true` during first build, staging-safe).

### 4. Code quality

- No leftover debug output. ✅
- No swallowed errors. ✅
- Consistent with surrounding file conventions (same import pattern, same `getEntry` usage). ✅
- File ends with a newline (the original orphan-recovery version did not; the rework added one). ✅

## Verdict: APPROVED

The rework correctly addresses the staging-safety bug identified in the prior review. The two edits are minimal, correct, and verified independently. All routes emit `<meta name="robots" content="noindex">` from the schema default without any page-level override needed. The implementation matches the design doc §15.3 and §9.1 specs.

**Note for item-68 (cutover):** When flipping noindex to `false` site-wide for production launch, either (a) flip the schema default back to `false` or (b) set `noindex: false` in each page's frontmatter. This is already noted in the result.md and is item-68's concern, not item-13's.
