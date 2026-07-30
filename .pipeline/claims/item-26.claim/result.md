# Item-26 result

**Item:** item-26. [frontend] `src/components/ServiceCard.astro` (props: `title`, `description`, `image?`, `href?`, `meta?`).
**Scope:** frontend (Astro component).
**Scope tag:** `<!-- batch: components -->`
**Scope tag source:** §15.4 item list, §9.2 ServiceCard spec.

## Summary
Implemented `src/components/ServiceCard.astro` per design doc §9.2 spec. Card renders an article with optional 4:3 image (placeholder when missing), H3 title, 1-2 sentence description, optional meta line, and optional "Learn more" CTA link wrapping the whole card. Uses semantic `<article>`; card-wide link when `href` provided; accessible focus styles; `prefers-reduced-motion` respected.

## Files written
- `src/components/ServiceCard.astro` (226 lines)

## Verification
- `npm run build` → exit 0 (11 routes built, including pages using ServiceCard)
- Component renders correctly in offerings page smoke test

**Commit:** commit b41906e (components batch tail; ledger carried stale placeholder hash, no code impact)
