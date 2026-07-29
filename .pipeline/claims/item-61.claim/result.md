# Claim: item-61 (rework) — Update `.nvmrc` to match README + `package.json` engines

## Summary
Rework for `README.md` per inspector REWORK verdict @ 2026-07-29T02:40:00-04:00
(see `.pipeline/claims/item-61.review-claim/review.md`).

**Issue:** `.nvmrc` still contained `20`, but README line 72 said
"Requires **Node 22+** (see `.nvmrc`)" and README line 84 said
"Node version to 22". `package.json` engines also requires
`>=22.12.0`. README pointed users at `.nvmrc` as the source of truth
and the file disagreed with the README.

**Fix (option A from the review — preferred):** Update `.nvmrc` from
`20` to `22` so the README's cross-reference becomes factually accurate
and `package.json` engines / `.nvmrc` / README all agree.

## Files changed
- `.nvmrc` — `20` → `22` (single line)

## Verification

### Build
```
npm run build
```
11 routes built in ~3.6s, no errors, sitemap-index generated. ✓

### Unit tests
```
npm test
```
3/3 vitest tests passed. ✓

### Manual consistency check
- `.nvmrc` → `22` ✓
- `README.md` line 72 → "Requires **Node 22+** (see `.nvmrc`)" ✓ (unchanged, now accurate)
- `README.md` line 84 → "Node version to 22" ✓ (unchanged, now accurate)
- `package.json` engines → `>=22.12.0` ✓ (unchanged)
- `DEPLOY.md` → uses Node 22.12 per `package.json` ✓ (unchanged, now consistent)

All four sources now agree on Node 22 (`.nvmrc=22`, `README=Node 22+`,
`DEPLOY=Node 22.12`, `package.json=engines.node>=22.12.0`).

## Deviations
None. Inspector's option (a) was preferred and applied as-is.

## Note (out of scope, not blocking)
The design doc §15.1 / §15.9 still say Node 20, which is now stale
relative to the repo's Node 22 reality. Inspector's review flagged this
as a possible future design-flag; not part of this rework item.

## Commit
`e0e5af80d01e87feb0d48926a92b71c335fe6874` ([yoga-wellness-site #61] Rework: pin .nvmrc to 22 to match README + package.json engines (>=22.12.0))
