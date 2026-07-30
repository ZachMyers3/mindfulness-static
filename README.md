# Mindfulness & Movement

> A yoga-derived wellness practice. This repo is the website — a small,
> fast, fully static Astro + MDX site whose content lives in plain
> Markdown + one JSON file. Edit the source, push to `develop`, watch the
> build run, and the site goes live.

## Stack

- **Astro 4+** with MDX integration. Zero client-side JS by default; one
  pre-rendered HTML file per route.
- **Tailwind v4** via the CSS-first `@theme` directive.
- **TypeScript strict** for shape safety.
- **Zod** content-collection schemas (`src/content.config.ts`) — a typo or
  missing field fails the build, not the live site.

## Editing the site

**Visual editor (recommended for page/journal copy):**

```bash
npm run dev
# open http://localhost:4321/_writenex
```

[Writenex](https://writenex.com/astro) is a WYSIWYG editor wired to the
`pages` and `journal` Markdown collections. It only runs during `astro
dev` (never in production builds). Config: `writenex.config.ts`.

**Where everything lives:**

| What you want to edit                            | Where it is                                  |
|--------------------------------------------------|----------------------------------------------|
| Page / journal body copy                         | Writenex at `/_writenex`, or the `.md` files below |
| Business name, tagline, nav, footer, hours, email | `src/content/site.json`                      |
| Page body copy (Home, About, Offerings, …)       | `src/content/pages/<slug>.md` (frontmatter + Markdown) |
| Journal / blog posts                             | `src/content/journal/<slug>.md`              |
| Brand colors, fonts                              | `src/styles/main.css` (`@theme static { … }`) |
| Photo placeholders                               | `src/assets/` (swap files; no code changes)  |

**Edit → live workflow:**

```bash
# 1. Edit via Writenex (pages/journal) or site.json
npm run dev                             # http://localhost:4321
#    → http://localhost:4321/_writenex  # visual editor
vim src/content/site.json               # hours, phone, nav, etc.

# 2. Push to develop (NOT main — main is human-gated)
git checkout develop
git add .
git commit -m "Update About copy + hours"
git push origin develop

# 3. The pipeline handles the rest: Mason commits to a feature branch,
#    Inspector reviews it, on approval the driver auto-merges into
#    develop (Rule 7). When you're ready to ship, cut a PR develop→main.
```

**What you can edit yourself** vs **what needs Mason (the engineer):**

- ✅ Safe: Writenex edits, text in `site.json`, body copy in any `.md` file, photo files
  under `src/assets/`, font or color token values in `src/styles/main.css`.
- ⚠️ Needs Mason: component code (`src/components/*.astro`), page templates
  (`src/pages/*.astro`), schemas (`src/content.config.ts`), Astro config.
- ⛔ Don't touch: `.pipeline/` (the pipeline's own state), `package.json`
  unless you know what you're changing, `astro.config.mjs`.

## Local development

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # builds to ./dist (host-agnostic output)
npm run preview      # serves ./dist locally
npm test             # Vitest unit suite
npm run test:e2e     # Playwright E2E
npm run test:lighthouse # Lighthouse CI (perf/access/seo ≥95)
npm run lint         # ESLint + Prettier check
```

Requires **Node 22+** (see `.nvmrc`).

## Deploy

The build output (`./dist`) is host-agnostic. Pick any of:

- **GitHub Pages** (simplest if the repo is already on GitHub).
- **Netlify** (free, GitHub-native, native forms if you ever add bookings).
- **Vercel** (fine, no specific advantage for a static site).
- **Cloudflare Pages** (free tier generous, edge cache — recommended).

For each: connect the repo, set the production branch to `main`, build
command to `npm run build`, build directory to `dist`, Node version to 22.

See **`DEPLOY.md`** for one-line notes per host.

## Project / pipeline layout

```
mindfulness-static/
├── src/
│   ├── assets/               # photos, fonts
│   ├── components/           # Astro components (Button, Hero, …)
│   ├── content/
│   │   ├── pages/            # one Markdown file per page
│   │   └── journal/          # journal / blog posts
│   ├── content.config.ts     # Zod schemas for content collections
│   ├── layouts/              # BaseLayout, etc.
│   ├── lib/                  # site.ts (parsed site.json)
│   ├── pages/                # one Astro file per route
│   └── styles/main.css       # Tailwind v4 + design tokens
├── public/
│   ├── og-default.jpg
│   ├── robots.txt
│   └── _headers              # (Cloudflare/Netlify cache headers)
├── .pipeline/
│   ├── config.toml           # RULES.md per-project config
│   ├── ledger.md             # 70 implementation items, Rule 1 format
│   └── design.md             # (symlink to design doc)
├── astro.config.mjs
├── package.json
└── README.md                  # this file
```

## Pipeline

This repo is driven by the OpenClaw pipeline. The `mason-frontend` durable
agent picks up items from `.pipeline/ledger.md`; `inspector` reviews each
implementation; `cyclops-visual-qa` runs the visual-QA items (§15.9); on
final approval the driver auto-merges into `develop` (Rule 7).

**Human gates:** the build runs on every push to `develop`. The
`develop → main` promotion is **human-only** — Zach will do it explicitly
when ready.

## Brand assets

- **Primary color:** sage-600 `#3a7268` (sage ramp 50→950 in `main.css`)
- **Secondary color:** mauve-600 `#72576f` (mauve ramp 50→950)
- **Neutral:** cream-50 `#fdfcfa` (bg) ↔ cream-950 `#1a1917` (ink)
- **Fonts:** Plus Jakarta Sans (display) + Inter (body)
- **Photography:** Unsplash stock (free for commercial use). Swap files
  in `src/assets/` to upgrade.

## License

Site content (copy, photos, fonts) is owned by Mindfulness & Movement.
Source code ISC-licensed; fork freely.
