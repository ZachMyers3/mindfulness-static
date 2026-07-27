# Deviations

Items where the implementation departs from the literal text of the design doc (or the ledger item line). Each entry points to the claim's `result.md` for the full context.

## yoga-wellness-site

### 2026-07-27 — item-12, item-13, item-18 (base-layout batch, commit 3fd827e)
- **BaseLayout imports `src/styles/global.css`** (not `src/styles/main.css` per item-32). Token values are in `src/styles/tokens.css`. The design-sys batch (items 32-36) will install Tailwind v4 + `@theme static { ... }` in `src/styles/main.css` and migrate these stylesheets. No functional impact for the build.
- **SeoHead `theme-color` and BaseLayout skip-link hard-code `#3a7268`** (sage-600 primary). Same reason: Tailwind v4 tokens land in design-sys batch.
- **index.astro renders only title + description + Markdown body** — does not yet use Hero/ServiceCard/CTA-strip components. Those land in components batch (items 22-28). The current render satisfies §9.3 "empty data" fallback semantics (the Markdown body provides the placeholder copy).
- **src/content/journal/welcome.md was committed in the same commit** (item-11): the file existed in the worktree but was never written by any prior commit — the prior item-11 commit was a "verify" commit only. Adding it here ensures the build is reproducible end-to-end.

See `claims/item-12.claim/result.md`, `claims/item-13.claim/result.md`, `claims/item-18.claim/result.md` for full rationale.
