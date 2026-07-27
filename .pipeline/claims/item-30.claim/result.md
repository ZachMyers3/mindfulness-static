# Item-30 result

**Item:** item-30. [frontend] `src/components/JsonLd.astro` (props: `data` object; renders `<script type="application/ld+json">`).
**Scope:** frontend (Astro component).
**Scope tag:** `<!-- batch: components -->`
**Scope tag source:** §15.4 item list, §9.2 JsonLd spec.

## Summary
Implemented `src/components/JsonLd.astro` per design doc §9.2 spec. Renders a `<script type="application/ld+json">` with JSON-serialized `data` prop. Escapes angle brackets (`<`, `>`) and `&` plus line/para separators to prevent script injection. Single-purpose, zero-dependency component.

## Files written
- `src/components/JsonLd.astro` (43 lines)

## Verification
- `npm run build` → exit 0 (11 routes built, contact page wires JsonLd with LocalBusiness data)
- Output validates as valid JSON-LD when inspected in built HTML

**Commit:** commit c12507c
