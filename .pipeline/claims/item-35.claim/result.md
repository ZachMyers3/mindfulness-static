# item-35 — WCAG AA Contrast Audit

## Status: DONE

## Changes
- **tokens.css**: Added `--color-cream-750: #7a7253` (new intermediate between cream-700 and cream-800)
- **tokens.css**: Changed `--color-muted` from `var(--color-cream-700)` to `var(--color-cream-750)` — raises contrast from 4.22:1 to 4.74:1 on surface
- **tokens.css**: Changed `--color-border` from `var(--color-cream-300)` to `var(--color-sage-400)` — raises contrast from 1.29:1 to 3.17:1 on surface (passes WCAG AA non-text 3:1)

## Contrast Ratios (post-fix)
| Combination | Ratio | WCAG AA | Status |
|---|---|---|---|
| ink on surface | 13.78:1 | ≥4.5 | ✅ PASS |
| ink on surface-alt | 13.11:1 | ≥4.5 | ✅ PASS |
| muted on surface | 4.74:1 | ≥4.5 | ✅ PASS |
| muted on surface-alt | 4.51:1 | ≥4.5 | ✅ PASS |
| primary on surface | 5.46:1 | ≥4.5 | ✅ PASS |
| secondary on surface | 6.24:1 | ≥4.5 | ✅ PASS |
| button on primary | 5.46:1 | ≥4.5 | ✅ PASS |
| button on primary-hover | 7.68:1 | ≥4.5 | ✅ PASS |
| button on secondary | 6.24:1 | ≥4.5 | ✅ PASS |
| button on secondary-hover | 8.39:1 | ≥4.5 | ✅ PASS |
| border on surface | 3.17:1 | ≥3.0 (non-text) | ✅ PASS |

## Verification
- `npm run build` → exit 0 (11 pages built)
- `npx vitest run` → 3/3 pass

## Notes
- The original palette (Stillpoint Studio cream-700 #827a5e) was too light for muted text at 4.22:1 on cream-50
- Added cream-750 (#7a7253) as a semantic intermediate; no visual jarring change
- Border switched from cream-300 (invisible on cream) to sage-400 (subtle green accent matching primary)
- cream-400/500/600 remain unchanged — they are decorative/non-text-use-only tokens and not used for text in current components
