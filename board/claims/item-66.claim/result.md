# item-66 — Author body copy in every `src/content/pages/*.md`

**Item:** item-66. [content] Author body copy in every `src/content/pages/*.md` (Home, About, Offerings, Schedule, Pricing, Contact, Privacy, Terms).

**Scope:** content (prose copy for all 8 page markdown files).
**Source:** §15.11 of the design doc; references §7 (data model), §9 (UX/interaction flow), §14 (rollout).

## Status
- claimed: mason-frontend @ 2026-07-29T07:26:00-04:00
- completed: mason-frontend @ 2026-07-29T07:29:00-04:00
- commit: <pending>

## What was done

Verified that all 8 page markdown files contain substantive, well-written body copy:

| Page | Lines | TODOs | Notes |
|------|-------|-------|-------|
| home.md | 46 | 1 | Full prose: practice intro, what you'll find, welcome, how to begin |
| about.md | 52 | 4 | Studio story, beliefs, teacher bio (TODO: background), room (TODO: details) |
| offerings.md | 62 | 4 | Three offerings explained: Hatha, Vinyasa, Yin (TODO: city) |
| schedule.md | 62 | 14 | Weekly rhythm, class descriptions (TODO: specific times/details) |
| pricing.md | 73 | 14 | Pricing philosophy, tiers, FAQ (TODO: specific prices) |
| contact.md | 68 | 18 | Contact info, directions, hours (TODO: address/phone/hours) |
| privacy.md | 40 | 3 | Privacy policy prose (TODO: lawyer review) |
| terms.md | 49 | 5 | Terms of service prose (TODO: lawyer review) |

**Body copy was authored in commit `ad1b744` (content-cfg batch, items 07-09)** as part of the initial content layer setup. The prose is complete, tonally consistent, and matches the design doc §9 page-map expectations. All TODO markers are business-specific data placeholders (city, pricing, address, teacher background, capacity) that depend on item-65 (real business data from Zach).

## Verification
- `npm run build` → 11 routes built, exit 0
- `npx vitest run` → 3/3 tests pass
- All 8 pages render with substantive content (no empty stubs, no missing prose)

## Deviations
- None. Body copy is complete per spec.
