# Step 3: Merge Feature to Develop

**Role:** Developer
**Tools:** Git, Gerrit / GitHub Pull Requests

---

## Overview

Once the feature is complete and reviewed, merge it back into the `develop` branch.

## Steps

1. **Ensure your branch is up to date:**
   ```bash
   git fetch origin
   git rebase origin/develop
   ```

2. **Open a Pull Request** targeting `develop` (not `main`).

3. **Get at least 1 approval** from a team member.

4. **After merge**, delete the feature branch:
   ```bash
   git branch -d feature/PROJ-123-user-authentication
   git push origin --delete feature/PROJ-123-user-authentication
   ```

## Merge Strategy

Use **Squash and Merge** to keep `develop` history clean, or **Rebase** for a linear history.

> Avoid plain **Merge commits** as they pollute the log.
