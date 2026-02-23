# Step 6: Merge to Main Branch

**Role:** Developer / CI System
**Tools:** Gerrit Web UI, Git

---

## Overview

With a +2 approval and +1 Verified, the change can be submitted and merged into the main branch.

## Submitting the Change

1. Go to the Gerrit change page.
2. Click the **"Submit"** button.
3. Gerrit will merge the change using the configured merge strategy (usually **rebase-if-necessary**).

## Merge Strategies

| Strategy | Description |
|----------|-------------|
| **Merge if Necessary** | Creates a merge commit only if needed |
| **Rebase if Necessary** | Rebases before merging (clean history) ✅ Recommended |
| **Fast Forward Only** | Requires a linear history |
| **Always Merge** | Always creates a merge commit |

## Post-Merge Verification

```bash
# Verify the commit is in the main branch
git fetch origin
git log origin/main --oneline -5
```

## Cleanup

After successful merge, delete your local feature branch:

```bash
git branch -d feature/my-feature
```

## If Submit Fails

Common reasons:
- **Merge conflict**: Another change was merged in between. Rebase your change:
  ```bash
  git fetch origin
  git rebase origin/main
  git push origin HEAD:refs/for/main
  ```
- **CI re-triggered and failed**: Fix the issue, amend, and push again.

## Notifications

Gerrit automatically notifies:
- The change author ✉️
- All reviewers ✉️
- Any CC'd users ✉️
