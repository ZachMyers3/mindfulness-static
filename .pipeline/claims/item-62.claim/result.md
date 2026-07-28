# item-62 Claim Result

**Item:** Author `DEPLOY.md` — host-agnostic deploy guide
**Batch:** deploy-docs
**Completed:** 2026-07-28T19:12:00-04:00
**Commit:** d766851

## What was done

Polished the existing DEPLOY.md skeleton (from commit a18c823) into a comprehensive, host-agnostic deploy guide covering:

- **Prerequisites section** — Node ≥22.12 (per package.json engines), build command, publish directory, branch strategy
- **Environment variables** — `SITE` env var for canonical URL and sitemap, with note that no other vars are needed
- **One-liner per host** — GitHub Pages (with full GitHub Actions workflow YAML), Netlify, Vercel, Cloudflare Pages — each with setup steps, env var guidance, and host-specific notes
- **Cache headers section** — `public/_headers` template with immutable asset cache, 1h HTML cache, sitemap/robots cache policies, and note about GitHub Pages incompatibility
- **Build commands table** — all npm scripts for quick reference
- **Branch strategy** — develop (auto-merge) vs main (human-gated) with clear guidance on which branch the host should build
- **Post-deploy checklist** — 9-item verification checklist (homepage, OG image, sitemap, robots.txt, Lighthouse, noindex, HTTPS, mobile, Search Console)
- **Rollback** — both host-dashboard and git-revert approaches
- **Troubleshooting table** — 6 common failure modes with fixes

## Deviations

- **Node version discrepancy:** `.nvmrc` pins Node 20, but `package.json` engines requires `>=22.12.0` and README says "Node 22+". DEPLOY.md uses `22.12` per package.json (authoritative). This is a pre-existing inconsistency (`.nvmrc` should be updated to 22); flagged but not fixed in this item (item-60 `_headers` is a separate item).
- **`_headers` file does not exist yet** (item-60, still open). DEPLOY.md includes a recommended `_headers` template but does not create the file — that's item-60's scope.

## Verification

- `npm run build` → 11 routes built, no errors, 1.22s
- `DEPLOY.md` is 207 lines, covers all four hosts mentioned in design doc §10
- No component or page code changed — documentation-only
