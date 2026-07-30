# Deploy — Host-Agnostic Guide

The build output is `./dist` (Astro's default static output). It works on
any static host without platform-specific code. Connect the repo to a host,
point it at `dist/`, and the site goes live.

> **Key invariant:** the same `dist/` directory works on GitHub Pages,
> Netlify, Vercel, or Cloudflare Pages. There is no host-specific code in
> this repo.

---

## Prerequisites

| Requirement | Value | Source |
|---|---|---|
| Node.js | ≥ 22.12 | `package.json → engines.node` |
| Build command | `npm run build` | Produces `./dist` |
| Publish directory | `dist/` | Static HTML + assets |
| Default branch | `develop` | Auto-merge target (Rule 7) |
| Production branch | `main` | Human-gated promotion |

### Environment variables

| Variable | Required? | Purpose |
|---|---|---|
| `SITE` | Recommended | Overrides the canonical site URL used by `<SeoHead>` and `@astrojs/sitemap`. Defaults to `https://mindfulnessandmovement.example.com` if unset. Set this to your real domain in the host's build settings (e.g. `https://mindfulnessandmovement.com`). |
| `BASE_PATH` | Only for project-path hosts | Astro `base` path. Defaults to `/`. The GitHub Pages workflow sets this to `/<repo>` automatically; set to `/` when using a custom domain. |

No other runtime or build-time env vars are needed. All content is in-repo.

---

## One-liner per host

### GitHub Pages (simplest, free, GitHub-native)

Workflow: `.github/workflows/deploy.yml` — builds and publishes `dist/` on
every push to `main` (and via **Actions → Deploy to GitHub Pages → Run workflow**).

1. Push `main` to GitHub (or merge `develop` → `main`).
2. In **Settings → Pages**, set source to **GitHub Actions**.
3. After the first successful run, the site URL appears on the workflow
   summary (typically `https://<user>.github.io/mindfulness-static/`).

Optional repo **Variables** (Settings → Secrets and variables → Actions):

| Variable | When to set | Example |
|---|---|---|
| `SITE` | Custom domain, or to override the default Pages URL | `https://mindfulnessandmovement.com` |
| `BASE_PATH` | Custom domain (must be `/`); leave unset for project Pages | `/` |

- **Custom domain:** set `SITE` + `BASE_PATH=/`, then configure the domain in
  Settings → Pages → Custom domain (or add a `CNAME` under `./public/`).
- **Trailing slash:** GitHub Pages serves `about/index.html` as `/about/`
  by default — compatible with this repo's `trailingSlash: 'always'`.
- **Visibility:** GitHub Pages is **public by default**, even from a private
  repo. Restricting Pages to collaborators requires GitHub Enterprise Cloud.
### Netlify (free tier, GitHub-native)

1. **Add new site → Import an existing project** → select this repo.
2. Build command: `npm run build`. Publish directory: `dist`. Node: 22.
3. Set `SITE` = `https://your-domain.com` in **Build & deploy → Environment**.

- **Forms:** add `data-netlify="true"` to a `<form>` and a hidden
  `<input type="hidden" name="form-name" value="contact">` if you ever
  add a contact form backend.
- **Deploy previews:** Netlify automatically creates preview deploys for
  PRs against `develop`.

### Vercel (works, no specific advantage for a static site)

1. **New Project** → import this repo.
2. Framework preset: Astro (auto-detected). Build command: `npm run build`.
   Output directory: `dist/`.
3. Set `SITE` in **Settings → Environment Variables**.

- Vercel auto-detects Astro and configures the build correctly.
- Deploy previews are automatic for PRs.

### Cloudflare Pages (recommended — free tier most generous, edge cache)

1. **Workers & Pages → Create → Connect to Git** → select this repo.
2. Build command: `npm run build`. Build output directory: `dist/`.
   Node.js version: 22 (set in the build settings).
3. Set `SITE` in **Settings → Environment Variables**.

- **Custom domain:** Pages → Custom domains tab → add your domain.
- **Headers:** see the `_headers` section below for cache configuration.
- **Deploy previews:** automatic for every push.

---

## Cache headers (`public/_headers`)

Add a `_headers` file in `public/` to set cache policies. The host serves
this file as-is (Cloudflare Pages and Netlify both support it):

```
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=3600

/sitemap*.xml
  Cache-Control: public, max-age=3600

/robots.txt
  Cache-Control: public, max-age=86400
```

- **Assets** (hashed filenames in `dist/assets/`) get immutable 1-year
  cache — safe because the filename changes on every build.
- **HTML pages** get 1-hour cache — short enough that content changes
  propagate quickly, long enough to reduce origin hits.
- **Sitemap** gets 1-hour cache — regenerated every build.
- **robots.txt** gets 1-day cache — rarely changes.

> GitHub Pages does not support `_headers` files. For GitHub Pages, cache
> headers are set by the CDN automatically (immutable for hashed assets,
> short TTL for HTML). No action needed.

---

## Build commands

| Command | Purpose |
|---|---|
| `npm run build` | Production build → `./dist` |
| `npm run preview` | Serve `./dist` locally (verify before deploy) |
| `npm test` | Vitest unit suite |
| `npm run test:e2e` | Playwright E2E tests |
| `npm run test:lighthouse` | Lighthouse CI (≥95 perf/access/seo) |
| `npm run lint` | ESLint + Prettier check |

---

## Branch strategy

| Branch | Purpose | Who merges |
|---|---|---|
| `develop` | Active development (Mason commits here) | Auto-merge on Inspector approval (Rule 7) |
| `main` | Production (deploy target) | **Human-only** — Zach cuts a PR from `develop` when ready to ship |

The host should be configured to **build from `main`** (production) or
**`develop`** (staging) depending on your workflow. For a single-environment
setup, build from `main` and promote via PR.

---

## Post-deploy checklist

After the first deploy, verify:

- [ ] **Homepage loads:** visit the live URL and confirm the brand name,
  nav, hero, and footer render correctly.
- [ ] **OG image:** paste the URL into a [Twitter Card validator](https://cards-dev.twitter.com/validator)
  or [OpenGraph debugger](https://www.opengraph.xyz/) — confirm the
  `og-default.jpg` renders.
- [ ] **Sitemap:** visit `https://<your-domain>/sitemap-index.xml` — confirm
  it lists all public routes (no draft journal posts).
- [ ] **robots.txt:** visit `https://<your-domain>/robots.txt` — confirm it
  allows crawling and points at the sitemap.
- [ ] **Lighthouse:** run Lighthouse on the live URL; target ≥95 across
  Performance, Accessibility, SEO, and Best Practices.
- [ ] **Noindex:** confirm `<meta name="robots" content="noindex">` is NOT
  present in the page source (it should only be `true` during staging).
- [ ] **HTTPS:** confirm the site loads over HTTPS (all hosts provision
  this automatically for custom domains).
- [ ] **Mobile:** test on a real phone or Chrome DevTools device mode —
  confirm the mobile menu works, images scale, and text is readable.
- [ ] **Search Console:** submit `https://<your-domain>/sitemap-index.xml`
  to [Google Search Console](https://search.google.com/search-console/about).

---

## Rollback

All four hosts keep per-deploy snapshots. Rollback is a single click in
the host's dashboard — "promote the previous deploy as current." No code
action needed. Maximum recovery time: the host's redeploy time (~1–3 min).

For **Git-based rollback** (if you need to undo a code change):

```bash
git revert <bad-commit-hash>
git push origin main
```

The host detects the push and redeploys the previous state. No data is at
risk because there is no database.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Build fails with "Image not found" | A page's `heroImage` path is wrong or the file was deleted | Check the path in the page's frontmatter; images live in `src/assets/` |
| Build fails with Zod error | `site.json` or a page's frontmatter has a missing/malformed field | Read the error message — it names the field and the expected type |
| Sitemap is empty | `SITE` env var is not set in the host | Set `SITE=https://your-domain.com` in the host's env vars |
| Site works locally but 404s on deploy | Host is not configured to serve `dist/` | Verify the publish directory is `dist/` (not `./` or `public/`) |
| Fonts don't load | `@fontsource` packages not installed | Run `npm install` (they're in `package.json` dependencies) |
