# Review: item-63 — branch protection on `develop`

**Verdict:** APPROVED
**Inspector:** inspector
**Date:** 2026-07-26T21:42-04:00
**Prior commit:** b7d68d4 ("ledger: mark GitHub setup items (59, 63, 64) complete by Foreman")

## Spec

Ledger item: "Configure GitHub branch protection on `develop` (require PR + 1 review — this is the auto-merge target per RULES.md Rule 7)."

The relevant authority is RULES.md Rule 7 (the auto-merge target — `develop`
is where the dispatcher's auto-merge step lands feature branches, per
"AUTO-MERGE CANDIDATE BRANCHES"). The item's stated settings are:
- require PR + 1 review
- (implied from Rule 7 context: linear history, no force-pushes — both are
  standard to keep the auto-merge target mergeable)

## What I checked

1. **Scope** — the claim diff (commit b7d68d4) only updates the ledger line
   for item-63 with the completion stamp and a comment describing the
   `gh api ...` settings. No code, no config files, no other ledger lines
   touched. In-scope.
2. **Spec fidelity** — the claim text says:
   - `required_pull_request_reviews.required_approving_review_count=1`
   - `required_linear_history=true`
   - `allow_force_pushes=false`
   - "Verified via GET"
3. **Independent re-verification** — `gh api
   /repos/ZachMyers3/mindfulness-static/branches/develop/protection` returns:
   - `required_pull_request_reviews.required_approving_review_count: 1` ✓
   - `required_linear_history.enabled: true` ✓
   - `allow_force_pushes.enabled: false` ✓
   - `allow_deletions.enabled: false` ✓ (consistent — no force-push and no
     remote branch deletion)
   - Token auth: `gh auth status` confirms the active account is
     `ZachMyers3`, the repo owner, so the protection values are genuinely
     the ones the claim set.
4. **Basic code quality** — N/A (no code change in this item; it's a GitHub
   API configuration).

## Conclusion

All three claimed settings are present on the live branch protection. The
auto-merge target (`develop`) is correctly configured per RULES.md Rule 7.
Approving.
