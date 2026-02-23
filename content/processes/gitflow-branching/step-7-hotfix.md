# Step 7: Hotfix (Critical Production Bug)

**Role:** Developer + Release Manager
**Tools:** Git, PagerDuty / Incident Management

---

## Overview

If a critical bug is discovered in production, a `hotfix/` branch is created **directly from `main`** and merged back into both `main` and `develop`.

## Branch Naming

```
hotfix/<version>-<description>
hotfix/2.4.1-fix-auth-crash
```

## Emergency Workflow

```bash
# 1. Branch from main (not develop!)
git checkout main
git pull origin main
git checkout -b hotfix/2.4.1-fix-auth-crash

# 2. Apply the fix
git commit -m "fix(auth): prevent crash on null user session"

# 3. Merge to main
git checkout main
git merge --no-ff hotfix/2.4.1-fix-auth-crash
git tag -a v2.4.1 -m "Hotfix 2.4.1"
git push origin main --tags

# 4. Merge to develop
git checkout develop
git merge --no-ff hotfix/2.4.1-fix-auth-crash
git push origin develop

# 5. Clean up
git branch -d hotfix/2.4.1-fix-auth-crash
git push origin --delete hotfix/2.4.1-fix-auth-crash
```

## Incident Checklist

- [ ] Incident declared and assigned
- [ ] Root cause identified
- [ ] Minimal fix applied (no scope creep!)
- [ ] Fix verified in staging
- [ ] Deployed to production
- [ ] Post-mortem scheduled
