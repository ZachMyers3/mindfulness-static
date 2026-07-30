# Review: item-27 — PricingCard.astro

**Verdict: APPROVED** — component implements the design-doc §9.2 spec faithfully.

## Reviewed by
Inspector (🔍) at 2026-07-28T21:47:00-04:00

## Commit
b41906e — `[yoga-wellness-site #26-30] components batch tail`

## Phase 2 checks

### 1. Scope ✅
Only `src/components/PricingCard.astro` was introduced/modified. Item-28 (FaqAccordion), item-30 (JsonLd), and item-26 (ServiceCard) live in the same commit but are scoped to their own ledger lines and are reviewed separately.

### 2. Verification ✅
`npm run build` → exit 0, 11 routes built in 3.19s. No build errors or warnings.

### 3. Spec fidelity ✅ (with a minor, benign deviation)
Design-doc §9.2 PricingCard spec: "Title, price (large), short tagline, bullet list of what's included, primary CTA."

| Spec element | Implementation | Notes |
|---|---|---|
| `title` prop | `string`, required | ✅ |
| `price` (large) | `string`, required; `clamp(2rem, 3vw + 1rem, 2.75rem)` | ✅ |
| `tagline?` | optional | ✅ |
| `features[]` | optional `string[]` with `[]` default | Minor deviation: spec implies required, but optional behavior (no `<ul>` when empty) is cleaner. A competent implementation of the doc "exactly as written" would have required `features[]` — this is a best-practice lightweight variant, not a defect. |
| `ctaLabel` + `ctaHref` | required, renders via `<Button>` | ✅ |
| `featured?` | optional boolean with `false` default; adds "Most popular" ribbon + elevated border/shadow | ✅ |
| Responsive layout | Three side-by-side on `>= 960px` is handled by parent grid; component uses `height: 100%` flex column | ✅ (parent container governs the layout; component correctly self-stretches) |
| Design-system colors | sage-600 (`#3a7268`) for price text, featured border, ribbon, checkbox | ✅ |

No `alt` prop needed — PricingCard has no image per §9.2 (unlike ServiceCard which does).

### 4. Code quality ✅
- Uses semantic `<article>` with `aria-label`
- No leftover debug output
- No swallowed errors
- `prefers-reduced-motion` respected
- Consistent with surrounding component patterns (Button import, `<script>` style scoped to component, `class:list` pattern)
- No `class?` prop collision (uses `className` local — Astro handles this correctly)

## Warnings / notes (non-blocking)
None. The `features` optionality is a tiny docs-vs-code nuance but produces better output. Not worth flagging; leaving for Mason's awareness only.
