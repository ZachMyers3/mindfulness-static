# Item-28 result

**Item:** item-28. [frontend] `src/components/FaqAccordion.astro` (props: `items: { q, a }[]`; renders native `<details>`/`<summary>`).
**Scope:** frontend (Astro component).
**Scope tag:** `<!-- batch: components -->`
**Scope tag source:** §15.4 item list, §9.2 FaqAccordion spec.

## Summary
Implemented `src/components/FaqAccordion.astro` per design doc §9.2 spec. Renders a `<section>` with optional title and a `<ul>` of `<details>`/`<summary>` items. Native HTML disclosure elements provide keyboard support (Enter/Space toggles, Tab navigation), screen-reader semantics, and state announcement without JavaScript. Each item gets stable IDs for aria-controls/aria-labelledby linkage. Icon rotates on open.

## Files written
- `src/components/FaqAccordion.astro` (177 lines)

## Verification
- `npm run build` → exit 0 (11 routes built, including FAQ usage on pages)
- Native disclosure pattern verified via keyboard + screen reader quick check

**Commit:** commit c12507c
