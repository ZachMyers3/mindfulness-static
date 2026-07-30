# Item-27 result

**Item:** item-27. [frontend] `src/components/PricingCard.astro` (props: `title`, `price`, `tagline?`, `features[]`, `ctaLabel`, `ctaHref`, `featured?`).
**Scope:** frontend (Astro component).
**Scope tag:** `<!-- batch: components -->`
**Scope tag source:** §15.4 item list, §9.2 PricingCard spec.

## Summary
Implemented `src/components/PricingCard.astro` per design doc §9.2 spec. Card renders an article with tier title, large price, optional tagline, bullet list of features, and a primary/secondary CTA button (via Button component). `featured` flag adds "Most popular" ribbon and visual elevation. Uses semantic `<article>` with aria-label; 100% height flex layout; accessible focus states.

## Files written
- `src/components/PricingCard.astro` (207 lines)

## Verification
- `npm run build` → exit 0 (11 routes built, including pricing page using PricingCard)
- Component renders correctly in pricing page smoke test

**Commit:** commit b41906e (components batch tail; ledger carried stale placeholder hash, no code impact)
