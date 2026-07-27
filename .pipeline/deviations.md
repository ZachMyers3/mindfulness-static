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
