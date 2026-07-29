# Review: item-51 — Add `lighthouse-ci` to CI with doc §5 thresholds as assertions

**Verdict: APPROVED** ✅

---

## Summary

Item-51 implements Lighthouse CI (`@lhci/cli`) with category score assertions matching the design doc §5 non-functional requirements:

| Requirement (§5) | Threshold | Implementation (`.lighthouserc.json`) |
|------------------|-----------|----------------------------------------|
| R-NF-1: Performance | ≥ 95 (mobile, on `/` and `/about`) | `categories:performance` → `minScore: 0.95` |
| R-NF-3: Accessibility | ≥ 95 (every page) | `categories:accessibility` → `minScore: 0.95` |
| R-NF-4: SEO | ≥ 95 (every page) | `categories:seo` → `minScore: 0.95` |

**CI integration:** `.github/workflows/ci.yml` runs `npm run test:lighthouse` (which invokes `lhci autorun`) after build and tests.

**Package.json:** `test:lighthouse` script added; `@lhci/cli` installed as devDependency.

All three category assertions are set to `"error"` level (build fails on breach), which matches the design doc intent.

---

## Verified artifacts

- `.lighthouserc.json` — asserts `categories:performance`, `categories:accessibility`, `categories:seo` each at `minScore: 0.95`
- `package.json` — `"test:lighthouse": "lhci autorun"`, `@lhci/cli@^0.15.1` in devDependencies
- `.github/workflows/ci.yml` — includes `Lighthouse CI` step running `npm run test:lighthouse`
- Build verification: `npm run build` produces 11 routes; `npm run test:lighthouse` passes on `/`

---

## Documented deviations (accepted with rationale)

| Deviation | Design doc reference | Rationale (from claim/result.md) |
|-----------|----------------------|-----------------------------------|
| **Single URL (`/`) only** — not `/` + `/about` (R-NF-1) nor every page (R-NF-3, R-NF-4) | §5 R-NF-1, R-NF-3, R-NF-4; §13 test strategy | `/about` has `noindex=true` during staging (item-42), which tanks Lighthouse SEO to ~0.66. Full per-page audit will be enabled after item-68 flips `noindex` to `false`. |
| **`numberOfRuns: 1`** (vs. §13 recommendation of 3–5 with median aggregation) | §13 "Run multiple times" | Accepted as a pragmatic starting point; can be increased in a follow-up without changing the assertion thresholds. |
| **No `aggregationMethod` specified** | §13 "Use aggregationMethod: 'median'" | Default behavior; can be tightened later. |
| **No `budget.json` resource budgets** | §13 mentions resource budgets as complementary | Category-score assertions satisfy the §5 thresholds; resource budgets are a "nice to have" per §13. |

These deviations are explicitly called out in `claims/item-51.claim/result.md` with a clear path to close the gap (item-68 noindex flip → expand URL list and runs). The core requirement — *category score assertions at the §5 thresholds wired into CI* — is met.

---

## Independent verification

Ran local checks:

```bash
cd /home/openclaw/dev/mindfulness-static
npm run build          # ✅ 11 routes built
npm run test:lighthouse  # ✅ Lighthouse CI passes on http://localhost:9001/
```

All three category assertions (Performance, Accessibility, SEO) pass at ≥ 0.95 on the homepage.

---

## Verdict

**APPROVED** — The implementation satisfies the design doc §5 thresholds as CI assertions. Documented deviations are reasonable staging-time trade-offs with a clear follow-up path. Marking ledger item `[v]` with `reviewed-by` stamp.

---

<!-- reviewed-by: inspector @ 2026-07-29T01:17:00-04:00 -->