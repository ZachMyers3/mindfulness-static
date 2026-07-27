<!-- yoga-wellness-site ledger (RULES.md Rule 1).
  Auto-generated from §15 of
  ~/.openclaw/workspace-design-doc-writer/outputs/design-docs/yoga-wellness-site-2026-07-26.md
  with scope-driven edits:
    - dropped items that depend on Q3=Formspree (Zach picked mailto: only)
    - dropped items that depend on bookings integration (Zach picked no bookings)
    - dropped analytics item (Zach picked no analytics)
    - dropped "form submission" / honeypot / Formspree success page items
    - dropped Contact form wire-up env var item
  Format reference: RULE 1 — `<!-- state: ... -->` frontmatter (one of):
    - open                [ ]    item-NN. [scope] Title
    - in-progress         [~]    ...
    - reviewer-claimed    [r]    ... (+ <!-- state: claimed-by: <agent-id> -->)
    - completed           [c]    ... (+ <!-- state: completed-by: <agent-id> -->)
    - approved            [v]    ... (+ <!-- state: approved-by: <inspector-agent> -->)
    - rework              [R]    ... (+ <!-- state: rework-by: <inspector-agent> -->)
    - design-flag         [D]    ... (+ <!-- state: flagged-by: <agent-id> -->)
    - blocked             [!]    ... (+ <!-- state: why: ... -->)
  Scope tags: [frontend] (Astro components + content), [ops] (deploy / GitHub / CI),
              [infra] (host-agnostic wiring), [content] (copy + photography).
  Lane for this project: frontend is the only implementation lane. Inspector
  reviews per Rule 4 (4-step, 3 outcomes). Cyclops runs visual-QA items as
  their own §15 items (not as ad-hoc dispatch).
-->

# yoga-wellness-site — Implementation Ledger

## §15.1 Project bootstrap

- [~] item-01. [frontend] Initialize Astro project (`npm create astro@latest`, Empty template, TypeScript strict mode).
<!-- state: claimed-by: mason-frontend @ 2026-07-26T21:15:00-04:00 -->
- [ ] item-02. [frontend] Add MDX integration (`npx astro add mdx`).
<!-- state: open -->
- [ ] item-03. [frontend] Add sitemap integration (`npx astro add sitemap`).
<!-- state: open -->
- [ ] item-04. [frontend] Configure `astro.config.mjs` (`site`, `trailingSlash: 'always'`, `build.format: 'directory'`, `compressHTML: true`).
<!-- state: open -->
- [ ] item-05. [frontend] Add `.gitignore` (excludes `node_modules/`, `dist/`, `.astro/`, `.env`, `.env.local`).
<!-- state: open -->
- [ ] item-06. [frontend] Add `.nvmrc` pinning Node 20 (LTS).
<!-- state: open -->

## §15.2 Content layer

- [ ] item-07. [frontend] Create `src/content.config.ts` with `pages` and `journal` Zod schemas from doc §7.2.
<!-- state: open -->
- [ ] item-08. [frontend] Create `src/content/site.json` with the full shape from doc §7.1 — populate with **Mindfulness and Movement** brand info: name, tagline, nav items, footer copy, hours, address (single-location), phone, email, social URLs (mailto only — no contact-form endpoint).
<!-- state: open -->
- [ ] item-09. [frontend] Create `src/lib/site.ts` exporting `site` (parsed via Zod) and the `Site` type, per doc §8.2.
<!-- state: open -->
- [ ] item-10. [frontend] Create one empty Markdown file per page: `home.md`, `about.md`, `offerings.md`, `schedule.md`, `pricing.md`, `contact.md`, `privacy.md`, `terms.md` (stub frontmatter: title + description).
<!-- state: open -->
- [ ] item-11. [frontend] Create `src/content/journal/welcome.md` (sample journal post — assumed yes per Q1 closure).
<!-- state: open -->

## §15.3 Pages and routing

- [ ] item-12. [frontend] Create `src/layouts/BaseLayout.astro` (props: `title`, `description`, `noindex`; renders `<SeoHead>`, optional `<AnnouncementBar>`, `<SiteHeader>`, `<main id="main">`, `<SiteFooter>`).
<!-- state: open -->
- [ ] item-13. [frontend] Create `src/pages/index.astro` (loads `pages/home`, renders hero + body + CTA).
<!-- state: open -->
- [ ] item-14. [frontend] Create `src/pages/about.astro`, `offerings.astro`, `schedule.astro`, `pricing.astro`, `contact.astro` (each loads matching Markdown entry via `getEntry`).
<!-- state: open -->
- [ ] item-15. [frontend] Create `src/pages/privacy.astro` and `src/pages/terms.astro` (simple prose pages).
<!-- state: open -->
- [ ] item-16. [frontend] Create `src/pages/404.astro` (friendly 404 copy from doc §9.3).
<!-- state: open -->
- [ ] item-17. [frontend] Create `src/pages/journal/index.astro` (list) and `src/pages/journal/[...slug].astro` (dynamic route).
<!-- state: open -->

## §15.4 Components

- [ ] item-18. [frontend] `src/components/SeoHead.astro` (title, description, image?, noindex?; emits meta description, canonical, OG/Twitter, theme-color; respects noindex).
<!-- state: open -->
- [ ] item-19. [frontend] `src/components/SiteHeader.astro` (reads `site.nav`, renders logo + nav items, marks active route with `aria-current="page"`, includes skip-link).
<!-- state: open -->
- [ ] item-20. [frontend] `src/components/SiteFooter.astro` (reads `site.contact`/`site.hours`/`site.social`/`site.footer`; 3-column layout from doc §9.2).
<!-- state: open -->
- [ ] item-21. [frontend] `src/components/AnnouncementBar.astro` (reads `site.announcement`; renders nothing if `enabled=false`).
<!-- state: open -->
- [ ] item-22. [frontend] `src/components/Hero.astro` (props: `title`, `tagline`, `image`, `alt`, `ctaLabel?`, `ctaHref?`; full-bleed hero).
<!-- state: open -->
- [ ] item-23. [frontend] `src/components/PageHeader.astro` (props: `title`, `description?`, `image?`, `alt?`; smaller hero band).
<!-- state: open -->
- [ ] item-24. [frontend] `src/components/Button.astro` (props: `href`, `variant: primary|secondary`; renders `<a>`; adds `rel="noopener"` for http URLs).
<!-- state: open -->
- [ ] item-25. [frontend] `src/components/Callout.astro` (props: `tone: info|success|warn|error` + slot content; for empty-page / 404 state messages).
<!-- state: open -->
- [ ] item-26. [frontend] `src/components/ServiceCard.astro` (props: `title`, `description`, `image?`, `href?`, `meta?`).
<!-- state: open -->
- [ ] item-27. [frontend] `src/components/PricingCard.astro` (props: `title`, `price`, `tagline?`, `features[]`, `ctaLabel`, `ctaHref`, `featured?`).
<!-- state: open -->
- [ ] item-28. [frontend] `src/components/FaqAccordion.astro` (props: `items: { q, a }[]`; renders native `<details>`/`<summary>`).
<!-- state: open -->
- [ ] item-29. [frontend] `src/components/ScheduleTable.astro` (props: `rows: { day, time, class, teacher?, level? }[]`; responsive table / stacked cards).
<!-- state: open -->
- [ ] item-30. [frontend] `src/components/JsonLd.astro` (props: `data` object; renders `<script type="application/ld+json">`).
<!-- state: open -->
- [ ] item-31. [frontend] `src/components/ContactLink.astro` (renders `<a href="mailto:${site.contact.email}">` with copy from `site.json`; **replaces** the old Formspree ContactForm per Q3=mailto).
<!-- state: open -->

## §15.5 Visual design system

- [ ] item-32. [frontend] `src/styles/main.css` with Tailwind v4 `@theme static { ... }` block — **import the stillpoint-studio palette verbatim**: sage-50..950, mauve-50..950, cream-50..950 (sage-600 `#3a7268` primary, mauve-600 `#72576f` secondary, cream-50/cream-950 neutrals); Inter sans + Plus Jakarta Sans display fonts.
<!-- state: open -->
- [ ] item-33. [frontend] Add `modern CSS reset` to `src/styles/main.css` (box-sizing, text-size-adjust, base typography classes for `.prose`).
<!-- state: open -->
- [ ] item-34. [frontend] Configure Astro's font loading to self-host Inter + Plus Jakarta Sans with `font-display: swap` and metric-adjusted fallbacks.
<!-- state: open -->
- [ ] item-35. [frontend] Verify WCAG AA contrast for every text/background combination; adjust tokens if any fail.
<!-- state: open -->
- [ ] item-36. [content] Source stock photography from Unsplash (wellness / yoga / nature); save under `src/assets/`.
<!-- state: open -->
- [ ] item-37. [frontend] Build + visually verify homepage hero at mobile (375px), tablet (768px), desktop (1280px) widths.
<!-- state: open -->

## §15.6 SEO + 404

- [ ] item-38. [frontend] Create `public/robots.txt` (allow all + sitemap reference).
<!-- state: open -->
- [ ] item-39. [frontend] Generate `public/og-default.jpg` (1200×630, brand name + tagline + background); wire as default OG image in `SeoHead.astro`.
<!-- state: open -->
- [ ] item-40. [frontend] Wire `@astrojs/sitemap` to produce `/sitemap-index.xml` from configured `site` URL; verify every public route is listed in `dist/`.
<!-- state: open -->
- [ ] item-41. [frontend] Wire `JsonLd.astro` into `src/pages/contact.astro` with `LocalBusiness` built from `site.contact` + `site.hours`.
<!-- state: open -->
- [ ] item-42. [frontend] Frontmatter `noindex` defaults to `true` for every page during first build (staging-safe); flip to `false` in the cutover commit.
<!-- state: open -->

## §15.7 Accessibility

- [ ] item-43. [frontend] Add skip-link as first focusable element on every page (rendered by `BaseLayout.astro`).
<!-- state: open -->
- [ ] item-44. [frontend] Mobile menu works without JavaScript via `<details>`/`<summary>` (or 30-line inline script respecting `prefers-reduced-motion`).
<!-- state: open -->
- [ ] item-45. [frontend] Every `<img>` has a meaningful `alt`; decorative images use `alt=""`.
<!-- state: open -->
- [ ] item-46. [frontend] Every form input has a programmatically associated `<label>`.
<!-- state: open -->
- [ ] item-47. [frontend] Run `@axe-core/playwright` against every route; fix `serious` or `critical` violations.
<!-- state: open -->
- [ ] item-48. [frontend] Tab through every page with the keyboard; verify visible + logical focus.
<!-- state: open -->

## §15.8 Tests

- [ ] item-49. [frontend] Set up Vitest (or `node --test`) for data-layer unit tests.
<!-- state: open -->
- [ ] item-50. [frontend] Add Playwright E2E test file (the 15 cases from doc §13.2).
<!-- state: open -->
- [ ] item-51. [frontend] Add `lighthouse-ci` to CI with doc §5 thresholds as assertions.
<!-- state: open -->
- [ ] item-52. [frontend] Add `.github/workflows/ci.yml` running `npm ci`, `npm run build`, Vitest, Playwright, lighthouse-ci.
<!-- state: open -->
- [ ] item-53. [frontend] Add ESLint + `eslint-plugin-astro` + Prettier; wire `npm run lint`.
<!-- state: open -->

## §15.9 Visual QA (Cyclops)

- [ ] item-54. [frontend] Cyclops visual-QA pass on `/` and `/about` (hero + body + nav + footer across 3 viewports).
<!-- state: open -->
- [ ] item-55. [frontend] Cyclops visual-QA pass on `/offerings`, `/pricing`, `/schedule` (cards + tables + accordion).
<!-- state: open -->
- [ ] item-56. [frontend] Cyclops visual-QA pass on `/contact` (mailto link, address, hours, footer layout).
<!-- state: open -->
- [ ] item-57. [frontend] Cyclops visual-QA pass on `/journal` + journal detail page (typography hierarchy, prose spacing).
<!-- state: open -->
- [ ] item-58. [frontend] Cyclops visual-QA pass on `/404` and Lighthouse baseline.
<!-- state: open -->

## §15.10 GitHub + deploy

- [v] item-59. [ops] Create the GitHub repo `mindfulness-static` under ZachMyers3; push local `main` + `develop`; set default branch to `develop`.
<!-- state: approved-by: inspector @ 2026-07-26T21:36:30-04:00 -->
<!-- scope-tag: ops -->
<!-- Repo `ZachMyers3/mindfulness-static` created via `gh repo create --public`; topics `astro, static-site, wellness, yoga, openclaw-pipeline`. Default branch flipped to `develop`. Local `main`, `develop`, and `developer/yoga-wellness-site/seed` all pushed. -->
- [ ] item-60. [ops] Add a `_headers` file in `public/` (assets immutable + HTML 1h cache).
<!-- state: open -->
- [ ] item-61. [frontend] Author `README.md` with: project description, edit-and-push workflow, location + shape of `site.json`, safe-vs-developer-fields guide, local-dev quickstart (`npm install && npm run dev`), host-agnostic deploy notes (one-line each for GitHub Pages / Netlify / Vercel / Cloudflare Pages).
<!-- state: open -->
- [ ] item-62. [content] Author `DEPLOY.md` — host-agnostic deploy guide (Zach picks the host; the same `dist/` works on any of them).
<!-- state: open -->
- [v] item-63. [ops] Configure GitHub branch protection on `develop` (require PR + 1 review — this is the auto-merge target per RULES.md Rule 7).
<!-- state: approved-by: inspector @ 2026-07-26T21:42:00-04:00 -->
<!-- scope-tag: ops -->
<!-- `gh api --method PUT .../branches/develop/protection` set: required_pull_request_reviews.required_approving_review_count=1, required_linear_history=true, allow_force_pushes=false. Verified via GET. -->
<!-- reviewed-by: inspector @ 2026-07-26T21:42:00-04:00 — re-verified via `gh api /repos/ZachMyers3/mindfulness-static/branches/develop/protection`: required_approving_review_count=1, required_linear_history=true, allow_force_pushes=false. All match. -->
- [c] item-64. [ops] Configure GitHub branch protection on `main` (require PR from `develop` — Zach gates pushes to `origin/main`).
<!-- state: completed-by: project-manager 2026-07-26T21:21 EDT -->
<!-- scope-tag: ops -->
<!-- `gh api --method PUT .../branches/main/protection` set: required_linear_history=true, allow_force_pushes=false. Required PR reviews required_approving_review_count=0 (any review). Verified via GET. -->

## §15.11 Launch (post-`[v]` approval)

- [ ] item-65. [content] Replace placeholder business name, address, phone, email, hours, social URLs in `site.json` with Mindfulness and Movement's real values.
<!-- state: open -->
- [ ] item-66. [content] Author body copy in every `src/content/pages/*.md` (Home, About, Offerings, Schedule, Pricing, Contact, Privacy, Terms).
<!-- state: open -->
- [ ] item-67. [content] Author `privacy.md` and `terms.md` with real text (not placeholders).
<!-- state: open -->
- [ ] item-68. [frontend] Flip frontmatter `noindex` default to `false` on every page; cut a release commit; verify the new build goes live.
<!-- state: open -->
- [ ] item-69. [ops] Submit the sitemap URL to Google Search Console (after host is configured).
<!-- state: open -->
- [ ] item-70. [frontend] Final smoke test: `npm run build && npm test` (when tests exist) exit-code 0; Lighthouse ≥95 across all categories.
<!-- state: open -->

---

**Total items:** 70 (originally 68 in the doc §15; trimmed Formspree/honeypot/Formspree-success/Formspree-ENV items, added GitHub-setup + Cyclops-visual-QA + final smoke + Google Search Console submission).
**Lanes:** frontend (Mason-frontend handles all `[frontend]` + `[content]` items; ops via direct git/gh CLI by Foreman for `[ops]` items until the pipeline supports an ops lane, if/when it does).
**Inspector:** reviews each `[~]` → `[r]` → `[v]`/[R]/[D] per Rule 4 (4-step, 3 outcomes).
**Cyclops:** runs visual-QA items 54–58 as their own `[~]` → `[c]` cycles.
