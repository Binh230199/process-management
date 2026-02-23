# Step 6: Tag & Merge to Main

**Role:** Release Manager
**Tools:** Git, Deployment Pipeline

---

## Overview

Once QA gives sign-off, the release branch is merged into `main` and tagged with the version number.

## Steps

1. **Merge to main:**
   ```bash
   git checkout main
   git merge --no-ff release/2.4.0
   ```

2. **Tag the release:**
   ```bash
   git tag -a v2.4.0 -m "Release version 2.4.0"
   git push origin main --tags
   ```

3. **Merge back to develop** (to capture any last-minute fixes):
   ```bash
   git checkout develop
   git merge --no-ff release/2.4.0
   git push origin develop
   ```

4. **Delete the release branch:**
   ```bash
   git branch -d release/2.4.0
   git push origin --delete release/2.4.0
   ```

## Production Deployment

The merge to `main` triggers the production pipeline automatically via CI/CD. Monitor the deployment in your observability platform.
