# Step 1: Create Feature Branch

**Role:** Developer
**Tools:** Git, Jira / Linear

---

## Overview

All new features are developed in isolated `feature/` branches created from `develop`. This ensures the main codebase remains stable while work is in progress.

## Branch Naming Convention

```
feature/<ticket-id>-<short-description>
```

**Examples:**
- `feature/PROJ-123-user-authentication`
- `feature/PROJ-456-dashboard-redesign`

## Steps

1. **Ensure develop is up to date:**
   ```bash
   git checkout develop
   git pull origin develop
   ```

2. **Create and switch to a feature branch:**
   ```bash
   git checkout -b feature/PROJ-123-user-authentication
   ```

3. **Push the branch to remote (track it):**
   ```bash
   git push -u origin feature/PROJ-123-user-authentication
   ```

4. **Link the branch to your ticket** in Jira/Linear for traceability.

## Rules

| Rule | Description |
|------|-------------|
| Always branch from `develop` | Never branch from `main` directly |
| One ticket = One branch | Keep scope small and focused |
| Delete after merge | Keep the remote repo tidy |

## Tips

- Use short-lived branches — aim to merge within **2-3 days**.
- If the branch lives longer, **sync with develop regularly** to avoid large merges:
  ```bash
  git fetch origin
  git rebase origin/develop
  ```
