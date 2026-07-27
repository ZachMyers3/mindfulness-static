# Deploy — host-agnostic guide

The build output is `./dist` (Astro's default static output). It works on
any static host without platform-specific code. Connect the repo to a host,
tell it where the build output is, done.

## One-liners per host

**GitHub Pages** (simplest, free, GitHub-native)
- Push to a `gh-pages` branch (or use GitHub Actions with `actions/deploy-pages@v4`).
- Build command: `npm run build` → `dist/`.
- Custom domain: set `CNAME` file in `./public/`.

**Netlify** (free tier, GitHub-native, native form handling if you ever add bookings)
- "Add new site → Import an existing project" → pick this repo.
- Build command: `npm run build`. Publish directory: `dist`. Node: 20.
- Forms: add `data-netlify="true"` to a `<form>` and a hidden `form-name` input.

**Vercel** (works, but no specific advantage over Netlify for a static site)
- "New Project" → pick this repo → Astro preset auto-detected.
- Override the build command to `npm run build` if needed; output: `dist`.

**Cloudflare Pages** (recommended — free tier is most generous, edge cache everywhere)
- Pages → Create → Connect to Git → pick this repo.
- Build command: `npm run build`. Build directory: `dist`. Node: 20.
- Custom domain: Pages → Custom domains tab.

## Build commands

- `npm run build` — production build (HTML, CSS, assets).
- `npm run preview` — serve `./dist` locally to verify a built site before deploy.

## Environment variables

This site has **no runtime env vars**. All content is in-repo.

(If you ever add Formspree or a contact-form backend: set the endpoint at
build time via `PUBLIC_CONTACT_FORM_ENDPOINT` in the host's UI, and add it
to `.env.example`.)

## Post-deploy checklist

- [ ] Confirm the live URL loads the homepage.
- [ ] Verify OG image renders (paste the URL into a Twitter/Slack preview tester).
- [ ] Run Lighthouse on the live URL; target ≥95 across all 4 categories.
- [ ] Submit the sitemap URL (`https://<your-domain>/sitemap-index.xml`) to [Google Search Console](https://search.google.com/search-console/about).
- [ ] If using a custom domain, verify HTTPS provisioning (the host does this automatically).

## Rollback

All hosts do per-deploy snapshots. Rollback = "promote the previous deploy
as current" in the host's UI. No code action needed.
