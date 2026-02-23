# Step 4: Create Release Branch

**Role:** Release Manager
**Tools:** Git, CI/CD

---

## Overview

When `develop` is feature-complete for a sprint, a `release/` branch is created to stabilize the codebase before going to production.

## Branch Naming

```
release/x.y.z
```

**Example:** `release/2.4.0`

## Steps

```bash
git checkout develop
git pull origin develop
git checkout -b release/2.4.0
git push -u origin release/2.4.0
```

## What Happens on a Release Branch

- **Allowed:** Bug fixes, documentation updates, version bumps.
- **Not Allowed:** New features (they go into the next sprint's develop).

## Update Version

```bash
# Update package.json version
npm version minor  # or patch / major

git commit -am "chore: bump version to 2.4.0"
```
