# Step 2: CI Verification

**Role:** CI System (Jenkins / GitHub Actions)
**Tools:** Jenkins, SonarQube, Automated Test Suite

---

## Overview

Once a change is pushed to Gerrit, the CI pipeline is automatically triggered to verify build integrity, test coverage, and code quality.

## What CI Checks

| Check | Tool | Blocking? |
|-------|------|-----------|
| Build compilation | Maven / Gradle | ✅ Yes |
| Unit tests | JUnit / Jest | ✅ Yes |
| Integration tests | Testcontainers | ✅ Yes |
| Code style lint | Checkstyle / ESLint | ✅ Yes |
| Static analysis | SonarQube | ⚠️ Warning |

## Reading CI Results

1. Go to the **Gerrit change page**.
2. Look for the **Verified** label:
   - `+1 Verified` — All checks passed ✅
   - `-1 Verified` — One or more checks failed ❌

3. Click the CI job link in the change comments to view detailed logs.

## Fixing CI Failures

If CI fails, **do not ask reviewers to proceed**. Fix the issue first:

```bash
# Make your fix, then amend the commit
git add .
git commit --amend --no-edit

# Push a new patch set
git push origin HEAD:refs/for/main
```

> A new patch set replaces the failed one — no new Gerrit change is created.

## Pro Tips

- Run CI checks **locally** before pushing:
  ```bash
  npm run test && npm run lint
  ```
- Use `--dry-run` flags where available to simulate CI behavior.
