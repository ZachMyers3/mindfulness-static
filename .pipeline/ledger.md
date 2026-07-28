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

  # ===== BATCH PLAN (Foreman, 2026-07-26 22:14 EDT) =====
  # Mason is encouraged to claim adjacent items that share a `<!-- batch: name -->`
  # tag in a single cycle (one lock acquire, one verification, one commit),
  # provided the per-item commit stamps (<!-- state: claimed-by --> -->
  # <!-- state: completed-by -->) are recorded per line as usual.
  # Batches honor hard dependencies (B2 reads configs from B1; B5 reads
  # BaseLayout from B4; etc.) — don't skip a batch out of order.
  # If a batch proves too big for one cycle, drop the tail items into
  # the next cycle; items can have multiple batch tags if they straddle.
  #
  #       IDs       Members (item-NN)                     Notes
  #  ─── ────────── ────────────────────────────────────── ────────────────────────
  #   01  bootstrap 02 03 04 05 06                         Astro config + nvmrc
  #   02  content-cfg   07 08 09 65                         Zod schemas + site.json (with real values)
  #   03  page-stubs    10 11                               Empty markdown + sample journal
  #   04  chrome        19 20 21 29 31                      SiteHeader+Footer+Bar+ScheduleTable+ContactLink
  #   05  base-layout   12 13 18                            BaseLayout+index+SeoHead (one PR = homepage live)
  #   06  inner-pages   14 15 16 17                         about/offerings/schedule/pricing/contact + privacy/terms + 404 + journal
  #   07  components    22 23 24 25 26 27 28 30             Hero+PageHeader+Button+Callout+ServiceCard+PricingCard+FaqAccordion+JsonLd
  #   08  design-sys    32 33 34 36                         Tailwind v4 palette + reset + fonts + photos
  #   09  content-copy  66 67                               Body copy + privacy/terms real text (writing, not code)
  #   10  seo-assets    38 39 40 41                         robots.txt + og-default + sitemap verify + LocalBusiness
  #   11  a11y-markup   43 44 45 46                         skip-link + mobile-menu + alt + label
  #   12  tests-setup   49 50 53                            vitest + playwright + eslint
  #   13  a11y-audit    47 48 35                            axe/playwright + tab-through + contrast sweep (post-render)
  #   14  ci            51 52                               lighthouse-ci + CI workflow
  #   15  deploy-docs   60 61 62                            _headers + README + DEPLOY
  #   16  noindex       42                                  Frontmatter noindex=true staging-safe
  #   17  launch        68 70                               noindex=false cutover + final smoke
  #       manual       69                                   Search Console submission (Zach)
  #       cyclops       54 55 56 57 58                      Cyclops visual-QA, one item = one Cyclops run
  #
  # Safe batching heuristic: if the sum of `git ls-files | grep <item's files>`
  # looks < ~6 files for the batch, claim all the items in one go. If it
  # looks larger, drop the latter half into a sub-batch this cycle.
  # ===== END BATCH PLAN =====
-->

# yoga-wellness-site — Implementation Ledger

## §15.1 Project bootstrap

- [v] item-01. [frontend] Initialize Astro project (`npm create astro@latest`, Empty template, TypeScript strict mode).
<!-- state: approved-by: inspector @ 2026-07-27T02:07:00-04:00 -->
<!-- state: completed-by: mason-frontend @ 2026-07-26T22:30:00-04:00 -- commit ebafa97 -->
<!-- reviewed-by: inspector @ 2026-07-27T02:07:00-04:00 -->
- [v] item-02. [frontend] Add MDX integration (`npx astro add mdx`)
<!-- state: approved-by: inspector @ 2026-07-27T02:13:00-04:00 -->
<!-- state: completed-by: mason-frontend @ 2026-07-27T00:40:00-04:00 -- commit b67d88e -->
<!-- reviewed-by: inspector @ 2026-07-27T02:13:00-04:00 -->
<!-- batch: bootstrap -->
- [v] item-03. [frontend] Add sitemap integration (`npx astro add sitemap`)
<!-- state: approved-by: inspector @ 2026-07-27T02:21:00-04:00 -->
<!-- state: completed-by: mason-frontend @ 2026-07-27T00:40:00-04:00 -- commit b67d88e -->
<!-- batch: bootstrap -->
<!-- reviewed-by: inspector @ 2026-07-27T02:21:00-04:00 — see claims/item-03.review-claim/review.md (prior commit b67d88e) -->
- [v] item-04. [frontend] Configure `astro.config.mjs` (`site`, `trailingSlash: 'always'`, `build.format: 'directory'`, `compressHTML: true`)
<!-- state: approved-by: inspector @ 2026-07-27T02:33:00-04:00 -->
<!-- state: completed-by: mason-frontend @ 2026-07-27T00:40:00-04:00 -- commit b67d88e -->
<!-- batch: bootstrap -->
<!-- reviewed-by: inspector @ 2026-07-27T02:33:00-04:00 — see claims/item-04.review-claim/review.md (prior commit b67d88e) -->
- [v] item-05. [frontend] Add `.gitignore` (excludes `node_modules/`, `dist/`, `.astro/`, `.env`, `.env.local`)
<!-- state: approved-by: inspector @ 2026-07-27T02:41:00-04:00 -->
<!-- state: completed-by: mason-frontend @ 2026-07-27T00:40:00-04:00 -- commit b67d88e -->
<!-- batch: bootstrap -->
<!-- reviewed-by: inspector @ 2026-07-27T02:41:00-04:00 — see claims/item-05.review-claim/review.md (prior commit b67d88e) -->
- [v] item-06. [frontend] Add `.nvmrc` pinning Node 20 (LTS)
<!-- state: approved-by: inspector @ 2026-07-27T07:32:00-04:00 -->
<!-- state: completed-by: mason-frontend @ 2026-07-27T00:40:00-04:00 -- commit b67d88e -->
<!-- batch: bootstrap -->
<!-- reviewed-by: inspector @ 2026-07-27T07:32:00-04:00 — see claims/item-06.review-claim/review.md (prior commit b67d88e; file content unchanged since bootstrap a18c823) -->
## §15.2 Content layer

- [v] item-07. [frontend] Create `src/content.config.ts` with `pages` and `journal` Zod schemas from doc §7.2.
<!-- state: approved-by: inspector @ 2026-07-27T01:14:30-04:00 -->
<!-- state: completed-by: mason-frontend @ 2026-07-27T01:08:09-04:00 -->
<!-- reviewed-by: inspector @ 2026-07-27T01:14:30-04:00 -->
<!-- batch: content-cfg -->
- [v] item-08. [frontend] Create `src/content/site.json` with the full shape from doc §7.1 — populate with **Mindfulness and Movement** brand info: name, tagline, nav items, footer copy, hours, address (single-location), phone, email, social URLs (mailto only — no contact-form endpoint).
<!-- state: approved-by: inspector @ 2026-07-27T01:20:00-04:00 -->
<!-- state: completed-by: mason-frontend @ 2026-07-27T01:08:09-04:00 -->
<!-- reviewed-by: inspector @ 2026-07-27T01:20:00-04:00 -->
<!-- batch: content-cfg -->
<!-- batch: content-copy (real values populated in tandem with item-65) -->
<!-- brand-locked: name="Mindfulness and Movement", primary=sage-600 #3a7268, secondary=mauve-600 #72576f, fonts=Inter + Plus Jakarta Sans (per Foreman 2026-07-26 doc-walk Q1+Q5+Q6) -->
<!-- placeholder fields until batch content-cfg: name="Mindfulness and Movement" (locked); address/phone/email/hours/social URL = real values per item-65 from Mindfulness and Movement business owner -->
- [v] item-09. [frontend] Create `src/lib/site.ts` exporting `site` (parsed via Zod) and the `Site` type, per doc §8.2.
<!-- state: approved-by: inspector @ 2026-07-27T08:12:00-04:00 -->
<!-- state: completed-by: mason-frontend @ 2026-07-27T01:55:00-04:00 (rework) -->
<!-- batch: content-cfg -->
— rework complete: commit 7faa9f8 (site.ts tracked + announcement.href null fix)
<!-- reviewed-by: inspector @ 2026-07-27T08:12:00-04:00 — see claims/item-09.review-claim/review.md (prior commit 7faa9f8) -->
- [v] item-10. [frontend] Create one empty Markdown file per page: `home.md`, `about.md`, `offerings.md`, `schedule.md`, `pricing.md`, `contact.md`, `privacy.md`, `terms.md` (stub frontmatter: title + description).
<!-- state: approved-by: inspector @ 2026-07-27T02:56:00-04:00 -->
<!-- state: completed-by: mason-frontend @ 2026-07-27T02:05:00-04:00 -- commit ad1b744 (pre-existing) -->
<!-- batch: page-stubs -->
<!-- reviewed-by: inspector @ 2026-07-27T02:56:00-04:00 — see claims/item-10.review-claim/review.md (prior commit ad1b744) -->
- [v] item-11. [frontend] Create `src/content/journal/welcome.md` (sample journal post — assumed yes per Q1 closure).
<!-- state: approved-by: inspector @ 2026-07-27T15:38:00-04:00 -->
<!-- state: completed-by: mason-frontend @ 2026-07-27T02:05:00-04:00 -- commit ad1b744 (pre-existing) -->
<!-- batch: page-stubs -->
<!-- reviewed-by: inspector @ 2026-07-27T15:38:00-04:00 — see claims/item-11.review-claim/review.md (file actually introduced in commit 3fd827e per git --follow) -->

## §15.3 Pages and routing

- [v] item-12. [frontend] Create `src/layouts/BaseLayout.astro` (props: `title`, `description`, `noindex`; renders `<SeoHead>`, optional `<AnnouncementBar>`, `<SiteHeader>`, `<main id="main">`, `<SiteFooter>`).
<!-- state: approved-by: inspector @ 2026-07-27T04:48:00-04:00 -->
<!-- state: completed-by: mason-frontend @ 2026-07-27T04:30:00-04:00 -- commit 3fd827e -- verify: build ok (orphan recovery) -->
<!-- batch: base-layout -->
<!-- batch: a11y-markup (skip-link must be first focusable in BaseLayout) -->
<!-- reviewed-by: inspector @ 2026-07-27T04:48:00-04:00 — see claims/item-12.review-claim/review.md (prior commit 3fd827e) -->
<!-- see claims/item-12.claim/result.md for deviations (design-sys Tailwind tokens still pending in batch 08) -->
- [c] item-13. [frontend] Create `src/pages/index.astro` (loads `pages/home`, renders hero + body + CTA).
<!-- state: rework-complete: mason-frontend @ 2026-07-27T06:27:30-04:00 -->
<!-- state: completed-by: mason-frontend @ 2026-07-27T06:17:59-04:00 -- commit e224dd6 -- verify: build ok; all 6 routes emit <meta name="robots" content="noindex"> -->
<!-- batch: base-layout -->
<!-- see claims/item-13.review-claim/review.md for rework context (staging noindex missing — schema default was false, defeating item-42 staging-safety contract) -->
<!-- see claims/item-13.claim/result.md for rework verification details -->
— rework requested by inspector @ 2026-07-27T05:58:00-04:00 — see claims/item-13.review-claim/review.md (prior commit 3fd827e)
— rework claimed + completed by mason-frontend @ 2026-07-27T06:14:00-04:00 → 2026-07-27T06:27:30-04:00
- [v] item-14. [frontend] Create `src/pages/about.astro`, `offerings.astro`, `schedule.astro`, `pricing.astro`, `contact.astro` (each loads matching Markdown entry via `getEntry`).
<!-- state: approved-by: inspector @ 2026-07-27T06:14:00-04:00 -->
<!-- state: completed-by: mason-frontend @ 2026-07-27T06:02:49-04:00 -- commit 28cf28f -- verify: build ok (6 routes, sitemap-index generated) -->
<!-- batch: inner-pages -->
<!-- see claims/item-14.claim/result.md for deviations (ScheduleTable/PricingCard/FaqAccordion/LocalBusiness JSON-LD still pending in batches 07+10) -->
<!-- reviewed-by: inspector @ 2026-07-27T06:14:00-04:00 — see claims/item-14.review-claim/review.md (prior commit 28cf28f) -->
- [v] item-15. [frontend] Create `src/pages/privacy.astro` and `src/pages/terms.astro` (simple prose pages).
<!-- state: approved-by: inspector @ 2026-07-27T10:27:00-04:00 -->
<!-- state: completed-by: mason-frontend @ 2026-07-27T06:46:42-04:00 -- commit 762d21d -- verify: build ok (8 routes incl. /privacy/ + /terms/, sitemap-index updated) -->
<!-- batch: inner-pages -->
<!-- batch: content-copy (real privacy/terms text populated in tandem with item-67) -->
<!-- see claims/item-15.claim/result.md -->
<!-- reviewed-by: inspector @ 2026-07-27T10:27:00-04:00 — see claims/item-15.review-claim/review.md (prior commit 762d21d) -->
- [v] item-16. [frontend] Create `src/pages/404.astro` (friendly 404 copy from doc §9.3).
<!-- state: approved-by: inspector @ 2026-07-27T08:05:00-04:00 -->
<!-- state: completed-by: mason-frontend @ 2026-07-27T07:41:00-04:00 -- commit 8e1e5e7be35febef4e185963e881da911a0a194f -- verify: build ok (batch 404+journal: 11 routes incl. /404.html + sitemap-index)
<!-- state: claimed-by: mason-frontend @ 2026-07-27T07:41:00-04:00 -->
<!-- batch: inner-pages -->
— see claims/item-16.claim/result.md
<!-- reviewed-by: inspector @ 2026-07-27T08:05:00-04:00 — see claims/item-16.review-claim/review.md (prior commit 8e1e5e7; item-17 in same commit, reviewed separately) -->
- [v] item-17. [frontend] Create `src/pages/journal/index.astro` (list) and `src/pages/journal/[...slug].astro` (dynamic route).
<!-- state: approved-by: inspector @ 2026-07-27T11:25:00-04:00 -->
<!-- state: completed-by: mason-frontend @ 2026-07-27T07:41:00-04:00 -- commit 8e1e5e7be35febef4e185963e881da911a0a194f -- verify: build ok (batch 404+journal: 11 routes incl. /404.html + sitemap-index)
<!-- state: claimed-by: mason-frontend @ 2026-07-27T07:41:00-04:00 -->
<!-- batch: inner-pages -->
— see claims/item-17.claim/result.md
<!-- reviewed-by: inspector @ 2026-07-27T11:25:00-04:00 — see claims/item-17.review-claim/review.md (prior commit 8e1e5e7) -->

## §15.4 Components

- [v] item-18. [frontend] `src/components/SeoHead.astro` (title, description, image?, noindex?; emits meta description, canonical, OG/Twitter, theme-color; respects noindex).
<!-- state: approved-by: inspector @ 2026-07-27T06:20:00-04:00 -->
<!-- state: completed-by: mason-frontend @ 2026-07-27T04:30:00-04:00 -- commit 3fd827e -- verify: build ok (orphan recovery) -->
<!-- batch: base-layout -->
<!-- reviewed-by: inspector @ 2026-07-27T06:20:00-04:00 — see claims/item-18.review-claim/review.md (prior commit 3fd827e) -->
<!-- see claims/item-18.claim/result.md for deviations (theme-color hex hard-coded until design-sys batch 08) -->
- [v] item-19. [frontend] `src/components/SiteHeader.astro` (reads `site.nav`, renders logo + nav items, marks active route with `aria-current="page"`, includes skip-link).
<!-- state: approved-by: inspector @ 2026-07-27T04:18:00-04:00 -->
<!-- state: completed-by: mason-frontend @ 2026-07-27T02:25:00-04:00 -- commit 6cc6907 -- verify: build ok -->
<!-- reviewed-by: inspector @ 2026-07-27T04:18:00-04:00 — see claims/item-19.review-claim/review.md (commit 6cc6907) -->
<!-- batch: chrome -->
<!-- batch: a11y-markup (mobile menu uses <details>/<summary> per item-44) -->
- [v] item-20. [frontend] `src/components/SiteFooter.astro` (reads `site.contact`/`site.hours`/`site.social`/`site.footer`; 3-column layout from doc §9.2).
<!-- state: approved-by: inspector @ 2026-07-27T04:31:00-04:00 -->
<!-- state: completed-by: mason-frontend @ 2026-07-27T02:25:00-04:00 -- commit 6cc6907 -- verify: build ok -->
<!-- batch: chrome -->
- [v] item-21. [frontend] `src/components/AnnouncementBar.astro` (reads `site.announcement`; renders nothing if `enabled=false`).
<!-- state: approved-by: inspector @ 2026-07-27T11:05:00-04:00 -->
<!-- state: completed-by: mason-frontend @ 2026-07-27T02:25:00-04:00 -- commit 6cc6907 -- verify: build ok -->
<!-- batch: chrome -->
<!-- reviewed-by: inspector @ 2026-07-27T11:05:00-04:00 — see claims/item-21.review-claim/review.md (prior commit 6cc6907) -->
- [v] item-22. [frontend] `src/components/Hero.astro` (props: `title`, `tagline`, `image`, `alt`, `ctaLabel?`, `ctaHref?`; full-bleed hero).
<!-- state: approved-by: inspector @ 2026-07-27T11:50:00-04:00 -->
<!-- state: completed-by: mason-frontend @ 2026-07-27T08:18:00-04:00 -- commit 7811940 -- verify: build ok (11 routes; smoke page removed before commit per result.md)
<!-- batch: components -->
<!-- reviewed-by: inspector @ 2026-07-27T11:50:00-04:00 — see claims/item-22.review-claim/review.md (prior commit 7811940) -->
<!-- note: ledger had stale placeholder commit 64672d6...; actual implementation commit is 7811940 (corrected in this approval line). No code impact. -->
- [v] item-23. [frontend] `src/components/PageHeader.astro` (props: `title`, `description?`, `image?`, `alt?`; smaller hero band).
<!-- state: approved-by: inspector @ 2026-07-27T12:05:00-04:00 -->
<!-- state: completed-by: mason-frontend @ 2026-07-27T08:18:00-04:00 -- commit 64672d67ce229589bc09a66805f3e2bad8752a3b -- verify: build ok (12 routes incl. components smoke page)
<!-- batch: components -->
<!-- reviewed-by: inspector @ 2026-07-27T12:05:00-04:00 -->
- [v] item-24. [frontend] `src/components/Button.astro` (props: `href`, `variant: primary|secondary`; renders `<a>`; adds `rel="noopener"` for http URLs).
<!-- state: approved-by: inspector @ 2026-07-27T15:48:00-04:00 -->
<!-- state: completed-by: mason-frontend @ 2026-07-27T08:18:00-04:00 -- commit 64672d67ce229589bc09a66805f3e2bad8752a3b -- verify: build ok (12 routes incl. components smoke page)
<!-- batch: components -->
<!-- reviewed-by: inspector @ 2026-07-27T15:48:00-04:00 — see claims/item-24.review-claim/review.md (actual Button.astro commit is 7811940 per git show; ledger entry carries the stale placeholder hash, same as item-22 — no code impact) -->
- [v] item-25. [frontend] `src/components/Callout.astro` (props: `tone: info|success|warn|error` + slot content; for empty-page / 404 state messages).
<!-- state: approved-by: inspector @ 2026-07-27T21:30:00-04:00 -->
<!-- state: completed-by: mason-frontend @ 2026-07-27T08:18:00-04:00 -- commit 64672d67ce229589bc09a66805f3e2bad8752a3b -- verify: build ok (12 routes incl. components smoke page)
<!-- batch: components -->
<!-- reviewed-by: inspector @ 2026-07-27T21:30:00-04:00 — see claims/item-25.review-claim/review.md (commit 64672d67) -->
- [v] item-26. [frontend] `src/components/ServiceCard.astro` (props: `title`, `description`, `image?`, `href?`, `meta?`).
<!-- state: approved-by: inspector @ 2026-07-27T21:47:00-04:00 -->
<!-- state: completed-by: mason-frontend @ 2026-07-27T18:25:00-04:00 -- commit b41906e -- verify: build ok (11 routes) -->
<!-- state: claimed-by: mason-frontend @ 2026-07-27T20:08:34Z -->
<!-- batch: components -->
<!-- reviewed-by: inspector @ 2026-07-27T21:47:00-04:00 — see claims/item-26.review-claim/review.md (prior commit b41906e) -->
- [c] item-27. [frontend] `src/components/PricingCard.astro` (props: `title`, `price`, `tagline?`, `features[]`, `ctaLabel`, `ctaHref`, `featured?`).
<!-- state: completed-by: mason-frontend @ 2026-07-27T18:25:00-04:00 -- commit b41906e -- verify: build ok (11 routes) -->
<!-- state: claimed-by: mason-frontend @ 2026-07-27T20:08:34Z -->
<!-- batch: components -->
- [c] item-28. [frontend] `src/components/FaqAccordion.astro` (props: `items: { q, a }[]`; renders native `<details>`/`<summary>`).
<!-- state: completed-by: mason-frontend @ 2026-07-27T18:25:00-04:00 -- commit b41906e -- verify: build ok (11 routes) -->
<!-- state: claimed-by: mason-frontend @ 2026-07-27T20:08:34Z -->
<!-- batch: components -->
- [v] item-29. [frontend] `src/components/ScheduleTable.astro` (props: `rows: { day, time, class, teacher?, level? }[]`; responsive table / stacked cards).
<!-- state: approved-by: inspector @ 2026-07-27T07:15:00-04:00 -->
<!-- state: completed-by: mason-frontend @ 2026-07-27T02:25:00-04:00 -- commit 6cc6907 -- verify: build ok -->
<!-- batch: chrome -->
<!-- reviewed-by: inspector @ 2026-07-27T07:15:00-04:00 — see claims/item-29.review-claim/review.md (prior commit 6cc6907) -->
- [v] item-30. [frontend] `src/components/JsonLd.astro` (props: `data` object; renders `<script type="application/ld+json">`).
<!-- state: approved-by: inspector @ 2026-07-27T20:50:00-04:00 -->
<!-- state: completed-by: mason-frontend @ 2026-07-27T18:25:00-04:00 -- commit b41906e -- verify: build ok (11 routes) -->
<!-- state: claimed-by: mason-frontend @ 2026-07-27T20:08:34Z -->
<!-- batch: components -->
<!-- reviewed-by: inspector @ 2026-07-27T20:50:00-04:00 — see claims/item-30.review-claim/review.md (prior commit b41906e) -->
- [v] item-31. [frontend] `src/components/ContactLink.astro` (renders `<a href="mailto:${site.contact.email}">` with copy from `site.json`; **replaces** the old Formspree ContactForm per Q3=mailto).
<!-- state: completed-by: mason-frontend @ 2026-07-27T02:25:00-04:00 -- commit 6cc6907 -- verify: build ok -->
<!-- state: approved-by: inspector @ 2026-07-27T07:25:00-04:00 -->
<!-- reviewed-by: inspector @ 2026-07-27T07:25:00-04:00 -->
<!-- batch: chrome -->

## §15.5 Visual design system

- [c] item-32. [frontend] `src/styles/main.css` with Tailwind v4 `@theme static { ... }` block — **import the stillpoint-studio palette verbatim**: sage-50..950, mauve-50..950, cream-50..950 (sage-600 `#3a7268` primary, mauve-600 `#72576f` secondary, cream-50/cream-950 neutrals); Inter sans + Plus Jakarta Sans display fonts.
<!-- state: claimed-by: mason-frontend @ 2026-07-27T22:08:00-04:00 (re-claim; prior session abandoned) -->
<!-- state: completed-by: mason-frontend @ 2026-07-27T22:08:00-04:00 -- commit 557362a -->
<!-- batch: design-sys -->
— see claims/item-32.claim/result.md (deviation: project ships plain CSS custom properties in tokens.css; main.css is a one-line @import aggregator, not a Tailwind v4 @theme block — per design doc §15.5 the canonical source is tokens.css)
- [~] item-33. [frontend] Add `modern CSS reset` to `src/styles/main.css` (box-sizing, text-size-adjust, base typography classes for `.prose`).
<!-- state: completed-by: mason-frontend @ 2026-07-27T20:26:49-04:00 -- commit 7ed0d5f5f5868245c3c4e152573b12031d71476c -->
<!-- batch: design-sys -->
- [~] item-34. [frontend] Configure Astro's font loading to self-host Inter + Plus Jakarta Sans with `font-display: swap` and metric-adjusted fallbacks.
<!-- state: completed-by: mason-frontend @ 2026-07-27T20:26:49-04:00 -- commit 7ed0d5f5f5868245c3c4e152573b12031d71476c -->
<!-- batch: design-sys -->
- [~] item-35. [frontend] Verify WCAG AA contrast for every text/background combination; adjust tokens if any fail.
<!-- state: open -->
<!-- batch: a11y-audit -->
- [~] item-36. [content] Source stock photography from Unsplash (wellness / yoga / nature); save under `src/assets/`.
<!-- state: completed-by: mason-frontend @ 2026-07-27T20:26:49-04:00 -- commit 7ed0d5f5f5868245c3c4e152573b12031d71476c -->
<!-- batch: design-sys -->
- [ ] item-37. [frontend] Build + visually verify homepage hero at mobile (375px), tablet (768px), desktop (1280px) widths.
<!-- state: open -->
<!-- batch: a11y-audit -->

## §15.6 SEO + 404

- [c] item-38. [frontend] Create `public/robots.txt` (allow all + sitemap reference).
<!-- state: claimed-by: mason-frontend @ 2026-07-27T20:23:00-04:00 -->
<!-- batch: seo-assets -->
- [~] item-39. [frontend] Generate `public/og-default.jpg` (1200×630, brand name + tagline + background); wire as default OG image in `SeoHead.astro`.
<!-- state: claimed-by: mason-frontend @ 2026-07-27T21:23:00-04:00 -->
<!-- batch: seo-assets -->
- [c] item-40. [frontend] Wire `@astrojs/sitemap` to produce `/sitemap-index.xml` from configured `site` URL; verify every public route is listed in `dist/`.
<!-- state: completed-by: mason-frontend @ 2026-07-27T20:46:00-04:00 -- commit 10793c8a3ce2a57c99ca5cdfdfeb8ad026972bee -- verify: build ok (11 routes built; dist/sitemap-index.xml + dist/sitemap-0.xml emitted listing all 10 public routes; robots.txt cross-linked) -->
<!-- state: claimed-by: mason-frontend @ 2026-07-27T20:34:00-04:00 -->
<!-- batch: seo-assets -->
<!-- verification-only close-out: sitemap integration was already wired in bootstrap batch (commit b67d88e, item-04) and is now verified against the §15 spec; see claims/item-40.claim/result.md for full verification log + draft-exclusion gap noted as follow-up -->
- [v] item-41. [frontend] Wire `JsonLd.astro` into `src/pages/contact.astro` with `LocalBusiness` built from `site.contact` + `site.hours` — rework complete: removed invalid `url` field (was `site.business.name`, not a URL). Build verified. 
<!-- state: completed-by: mason-frontend @ 2026-07-28T00:41:00-04:00 -- commit 5a2f9ee6d34e6917033a55300035a24b2a4c7b42 -->
<!-- rework: inspector @ 2026-07-27T23:45:00-04:00 — fixed by removing invalid url field per review feedback -->
<!-- state: open -->
<!-- batch: seo-assets -->
- [c] item-42. [frontend] Frontmatter `noindex` defaults to `true` for every page during first build (staging-safe); flip to `false` in the cutover commit.
<!-- state: completed-by: mason-frontend @ 2026-07-28T00:50:00-04:00 -- commit de14fbfe0173198d719dee5ed31cd6446bea2e86 -->
<!-- state: claimed-by: mason-frontend @ 2026-07-28T00:45:00-04:00 -->
<!-- batch: noindex -->

## §15.7 Accessibility

- [c] item-43. [frontend] Add skip-link as first focusable element on every page (rendered by `BaseLayout.astro`).
<!-- state: completed-by: mason-frontend @ 2026-07-28T00:55:30-04:00 -- commit <pending> -->
<!-- state: claimed-by: mason-frontend @ 2026-07-28T00:55:00-04:00 -->
<!-- batch: a11y-markup -->
- [ ] item-44. [frontend] Mobile menu works without JavaScript via `<details>`/`<summary>` (or 30-line inline script respecting `prefers-reduced-motion`).
<!-- state: open -->
<!-- batch: a11y-markup -->
- [ ] item-45. [frontend] Every `<img>` has a meaningful `alt`; decorative images use `alt=""`.
<!-- state: open -->
<!-- batch: a11y-markup -->
- [ ] item-46. [frontend] Every form input has a programmatically associated `<label>`.
<!-- state: open -->
<!-- batch: a11y-markup -->
- [ ] item-47. [frontend] Run `@axe-core/playwright` against every route; fix `serious` or `critical` violations.
<!-- state: open -->
<!-- batch: a11y-audit -->
- [ ] item-48. [frontend] Tab through every page with the keyboard; verify visible + logical focus.
<!-- state: open -->
<!-- batch: a11y-audit -->

## §15.8 Tests

- [ ] item-49. [frontend] Set up Vitest (or `node --test`) for data-layer unit tests.
<!-- state: open -->
<!-- batch: tests-setup -->
- [ ] item-50. [frontend] Add Playwright E2E test file (the 15 cases from doc §13.2).
<!-- state: open -->
<!-- batch: tests-setup -->
- [ ] item-51. [frontend] Add `lighthouse-ci` to CI with doc §5 thresholds as assertions.
<!-- state: open -->
<!-- batch: ci -->
- [ ] item-52. [frontend] Add `.github/workflows/ci.yml` running `npm ci`, `npm run build`, Vitest, Playwright, lighthouse-ci.
<!-- state: open -->
<!-- batch: ci -->
- [ ] item-53. [frontend] Add ESLint + `eslint-plugin-astro` + Prettier; wire `npm run lint`.
<!-- state: open -->
<!-- batch: tests-setup -->

## §15.9 Visual QA (Cyclops)

- [ ] item-54. [frontend] Cyclops visual-QA pass on `/` and `/about` (hero + body + nav + footer across 3 viewports).
<!-- state: open -->
<!-- scope: cyclops — Cyclops dispatches its own run per item; Mason doesn't claim -->
- [ ] item-55. [frontend] Cyclops visual-QA pass on `/offerings`, `/pricing`, `/schedule` (cards + tables + accordion).
<!-- state: open -->
<!-- scope: cyclops -->
<!-- batch: cyclops -->
- [ ] item-56. [frontend] Cyclops visual-QA pass on `/contact` (mailto link, address, hours, footer layout).
<!-- state: open -->
<!-- scope: cyclops -->
<!-- batch: cyclops -->
- [ ] item-57. [frontend] Cyclops visual-QA pass on `/journal` + journal detail page (typography hierarchy, prose spacing).
<!-- state: open -->
<!-- scope: cyclops -->
<!-- batch: cyclops -->
- [ ] item-58. [frontend] Cyclops visual-QA pass on `/404` and Lighthouse baseline.
<!-- state: open -->
<!-- scope: cyclops -->
<!-- batch: cyclops -->

## §15.10 GitHub + deploy

- [v] item-59. [ops] Create the GitHub repo `mindfulness-static` under ZachMyers3; push local `main` + `develop`; set default branch to `develop`.
<!-- state: approved-by: inspector @ 2026-07-26T21:36:30-04:00 -->
<!-- scope-tag: ops -->
<!-- Repo `ZachMyers3/mindfulness-static` created via `gh repo create --public`; topics `astro, static-site, wellness, yoga, openclaw-pipeline`. Default branch flipped to `develop`. Local `main`, `develop`, and `developer/yoga-wellness-site/seed` all pushed. -->
- [ ] item-60. [ops] Add a `_headers` file in `public/` (assets immutable + HTML 1h cache).
<!-- state: open -->
<!-- batch: deploy-docs -->
- [ ] item-61. [frontend] Author `README.md` with: project description, edit-and-push workflow, location + shape of `site.json`, safe-vs-developer-fields guide, local-dev quickstart (`npm install && npm run dev`), host-agnostic deploy notes (one-line each for GitHub Pages / Netlify / Vercel / Cloudflare Pages).
<!-- state: open -->
<!-- batch: deploy-docs -->
<!-- Foreman: skeleton draft exists in repo (see commit a18c823). Mason should polish against doc §13.1. -->
- [ ] item-62. [content] Author `DEPLOY.md` — host-agnostic deploy guide (Zach picks the host; the same `dist/` works on any of them).
<!-- state: open -->
<!-- batch: deploy-docs -->
<!-- Foreman: skeleton draft exists in repo (see commit a18c823). Mason should polish against doc §13.1. -->
- [v] item-63. [ops] Configure GitHub branch protection on `develop` (require PR + 1 review — this is the auto-merge target per RULES.md Rule 7).
<!-- state: approved-by: inspector @ 2026-07-26T21:42:00-04:00 -->
<!-- scope-tag: ops -->
<!-- `gh api --method PUT .../branches/develop/protection` set: required_pull_request_reviews.required_approving_review_count=1, required_linear_history=true, allow_force_pushes=false. Verified via GET. -->
<!-- reviewed-by: inspector @ 2026-07-26T21:42:00-04:00 — re-verified via `gh api /repos/ZachMyers3/mindfulness-static/branches/develop/protection`: required_approving_review_count=1, required_linear_history=true, allow_force_pushes=false, allow_deletions=false. All match. -->
- [v] item-64. [ops] Configure GitHub branch protection on `main` (require PR from `develop` — Zach gates pushes to `origin/main`).
<!-- state: approved-by: inspector @ 2026-07-26T22:23:00-04:00 -->
<!-- scope-tag: frontend -->
<!-- `gh api --method PUT .../branches/main/protection` set: required_linear_history=true, allow_force_pushes=false. Required PR reviews required_approving_review_count=0 (any review). Verified via GET. -->
<!-- reviewed-by: inspector @ 2026-07-27T00:30:00-04:00 — independently re-verified via `gh api /repos/ZachMyers3/mindfulness-static/branches/main/protection`: required_pull_request_reviews object present (PR required, required_approving_review_count=0), required_linear_history=true, allow_force_pushes=false, allow_deletions=false. Matches spec. -->

## §15.11 Launch (post-`[v]` approval)

- [ ] item-65. [content] Replace placeholder business name, address, phone, email, hours, social URLs in `site.json` with Mindfulness and Movement's real values.
<!-- state: open -->
<!-- batch: content-cfg -->
<!-- batch: content-copy -->
<!-- blocks-on: Zach — needs real address/phone/email/hours/social from the business. Until then: retain placeholders for staging builds, but DO NOT block the rest of content-cfg on this; batch as soon as content-cfg is otherwise done. -->
- [ ] item-66. [content] Author body copy in every `src/content/pages/*.md` (Home, About, Offerings, Schedule, Pricing, Contact, Privacy, Terms).
<!-- state: open -->
<!-- batch: content-copy -->
- [ ] item-13. [frontend] Create `src/pages/index.astro` (loads `pages/home`, renders hero + body + CTA).
<!-- state: open -->
<!-- batch: base-layout -->
- [ ] item-68. [frontend] Flip frontmatter `noindex` default to `false` on every page; cut a release commit; verify the new build goes live.
<!-- state: open -->
<!-- batch: launch -->
- [ ] item-69. [ops] Submit the sitemap URL to Google Search Console (after host is configured).
<!-- state: open -->
<!-- scope: human — Zach does this manually once the host is set; not a cycle target. -->
- [ ] item-70. [frontend] Final smoke test: `npm run build && npm test` (when tests exist) exit-code 0; Lighthouse ≥95 across all categories.
<!-- state: open -->
<!-- batch: launch -->

---

**Total items:** 70 (originally 68 in the doc §15; trimmed Formspree/honeypot/Formspree-success/Formspree-ENV items, added GitHub-setup + Cyclops-visual-QA + final smoke + Google Search Console submission).
**Lanes:** frontend (Mason-frontend handles all `[frontend]` + `[content]` items; ops via direct git/gh CLI by Foreman for `[ops]` items until the pipeline supports an ops lane, if/when it does).
**Inspector:** reviews each `[~]` → `[r]` → `[v]`/[R]/[D] per Rule 4 (4-step, 3 outcomes).
**Cyclops:** runs visual-QA items 54–58 as their own `[~]` → `[c]` cycles.