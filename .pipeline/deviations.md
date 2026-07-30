# Deviations

Items where the implementation departs from the literal text of the design doc (or the ledger item line). Each entry points to the claim's `result.md` for the full context.

## yoga-wellness-site

### 2026-07-27 — item-12, item-13, item-18 (base-layout batch, commit 3fd827e)
- **BaseLayout imports `src/styles/global.css`** (not `src/styles/main.css` per item-32). Token values are in `src/styles/tokens.css`. The design-sys batch (items 32-36) will install Tailwind v4 + `@theme static { ... }` in `src/styles/main.css` and migrate these stylesheets. No functional impact for the build.
- **SeoHead `theme-color` and BaseLayout skip-link hard-code `#3a7268`** (sage-600 primary). Same reason: Tailwind v4 tokens land in design-sys batch.
- **index.astro renders only title + description + Markdown body** — does not yet use Hero/ServiceCard/CTA-strip components. Those land in components batch (items 22-28). The current render satisfies §9.3 "empty data" fallback semantics (the Markdown body provides the placeholder copy).
- **src/content/journal/welcome.md was committed in the same commit** (item-11): the file existed in the worktree but was never written by any prior commit — the prior item-11 commit was a "verify" commit only. Adding it here ensures the build is reproducible end-to-end.

See `claims/item-12.claim/result.md`, `claims/item-13.claim/result.md`, `claims/item-18.claim/result.md` for full rationale.

### 2026-07-27 — item-16 + item-17 (inner-pages tail, commit 76ca04d)
- **item-16 (404.astro)**: implemented as two CTAs ("Go home" primary + "Get in touch" secondary) rather than bare "links" per the §9.3 wording. Functionally equivalent: both `/` and `/contact` are reachable from the page; the CTA treatment is a deliberate visual emphasis choice because 404s are the most trust-fragile surface on the site.
- **item-16**: inline `<style>` block with CSS-var fallbacks rather than Tailwind utility classes — same constraint as every other component waiting on design-sys batch 08 (items 32-36). When Tailwind v4 lands, these styles can be migrated without breaking the markup.
- **item-17 (journal detail)**: does NOT yet render the `heroImage` from frontmatter because the welcome post's `heroImage` points to `../../assets/journal/welcome-hero.jpg` which does not exist (item-36 / photography batch is open). Rendering would break the build. Documented as a future-PR note; once item-36 lands, the detail header can be amended to use `<Image src={...} />`.
- **item-17**: no related-posts section on detail page. Doc §9.1 lists "related posts" as one of the Primary blocks but the prose is not prescriptive; deferred until Zach confirms it is wanted.

See `claims/item-16.claim/result.md`, `claims/item-17.claim/result.md` for full rationale.

### 2026-07-27 — item-22, item-23, item-24, item-25 (components batch part 1, commit 7811940)
- **Hero.astro imports `./Button.astro`** (item-24, same batch) — Hero cannot be used without Button.
- **Hero.astro and PageHeader.astro hard-code the brand palette** (`#3a7268`, `#f8f5f0`, etc.) instead of using Tailwind v4 theme tokens. The design-sys batch (items 32-36) will install `@theme static { ... }` in `src/styles/main.css`. When it lands, these hard-coded values should be replaced with `var(--color-sage-600)` etc.
- **Button.astro adds `target="_blank"` for external URLs** in addition to the ledger-required `rel="noopener"`. Strict superset; conventional safe default for static marketing sites.
- **PageHeader.astro accepts an optional `breadcrumb` prop** beyond the ledger minimum — implements the optional breadcrumb explicitly mentioned in design-doc §9.2. Documented in the component's docstring; left unused by current inner-pages routes.
- **Hero, PageHeader, Callout are not yet wired into any page route.** Wiring is a separate scope item (the existing inner-pages route templates only load Markdown via `getEntry`; refactoring them to compose Hero/PageHeader/Callout belongs to a future batch).
- **Commit hash in ledger is `64672d67...` but actual commit is `7811940`** — the post-commit amend replaced `<pending>` with the pre-amend hash, then the amend changed the content and produced a new hash. Per skill rule "no amends after step 5", the stale pre-amend hash was left in the ledger lines; `git log` is the source of truth (head: `7811940`).

### 2026-07-27 — item-32 (design-sys palette + reset, commit 557362a)
- **`src/styles/main.css` is a one-line `@import` aggregator**, not a Tailwind v4 `@theme static { ... }` block as the ledger item text references. The design doc §15.5 specifies custom properties in `tokens.css` (no Tailwind mention). The project ships plain CSS custom properties; components use `<style>` blocks with `var(--color-sage-600)` etc. When/if Tailwind v4 is added in a future batch, `tokens.css` is the canonical palette source — the `@theme static` block would be derived from it, not replace it.
- **`tokens.css` and `global.css` already implement §15.5's palette + reset** (sage 50–950, mauve 50–950, cream 50–950, Inter + Plus Jakarta Sans, modern reset, `.prose` class, `prefers-reduced-motion` queries, WCAG AA focus styles). They were committed before this cycle (separate `items` not item-32). Item-32 only adds the aggregator + a one-line BaseLayout import change.

See `claims/item-32.claim/result.md` for full rationale.
### 2026-07-29 — item-70 (final smoke test, commit affc4ff/c105066)
- **Item-70 is verification-only**: no code files changed; the ledger line was updated to mark completion.
- **Lighthouse was run against the static `dist/` build**, not a production URL. The design doc §15.10 spec says "Run Lighthouse + axe one more time on the production URL." The production URL is not yet configured (item-69 is `scope: human` for Zach to submit the sitemap URL once the host is live). The run used the existing `lhci autorun` CI config against `./dist` for parity with CI, which is the same input `lighthouse-ci` will use once deployed.
- **Commit hash in ledger is `affc4ff` but actual commit is `c105066`** — the post-commit amend replaced `<pending>` with the pre-amend hash, then the amend changed the hash. Per skill rule "no amends after step 5", the stale pre-amend hash was left in the ledger line; `git log` is the source of truth (head: `c105066`). See `claims/item-70.claim/result.md` for full verification results.
### 2026-07-29 — item-53 (ESLint + scripts globals rework, commit 87adb3c)
- **Commit hash in ledger is `a3500d4` but actual commit is `87adb3c`** — same `<pending>`-then-amend issue as item-70: the initial commit produced `a3500d4`; `sed` replaced `<pending>` with `a3500d4` and a single amend produced `87adb3c`. Per skill rule "no amends after step 5", the stale pre-amend hash remains in the committed `ledger.md`; the working-tree copy has the correct `87adb3c`. `git log` is the source of truth (head: `87adb3c`).

### 2026-07-29 — item-13 §15.11 Launch duplicate (verification-only close-out, commit 291116b)
- **Verification-only cycle**: the implementation file `src/pages/index.astro` was already `[v]` approved at line 137 (commit `e224dd6`, inspector 2026-07-28T22:51). This cycle re-verified it on the current `develop` HEAD (87adb3c pre-cycle) to close the open duplicate line (line 446). No code changes required.
- **Commit hash in ledger was `be07329` but actual HEAD is `291116b`** — same `<pending>`-then-amend issue as items 70 and 53: the initial commit produced `be07329`, `sed` replaced `<pending>` with `be07329`, and the single amend produced `291116b`. Per skill rule "leave `<pending>` in the ledger", the ledger line was reverted to `<pending>` (with an explicit hash-chase pointer comment). `git log` is the source of truth (head: `291116b`).
- **Scope discipline**: working-tree contained several modified/untracked files from prior sessions not related to this item (`.lighthouseci/` build artifacts, `.pipeline/claims/item-38.review-claim/review.md` reformat, `.pipeline/deviations.md` and `board/claims/item-53.claim/result.md` from item-53's hash chase, `.pipeline/.orphan-artifacts/` runtime files). Per scope discipline, only this item's two files were staged and committed. The rest are pre-existing leftover state left for the next owner.
