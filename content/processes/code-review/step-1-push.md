# Step 1: Push Commit to Gerrit

**Role:** Developer
**Tools:** Git, Gerrit CLI

---

## Overview

The process begins when a developer completes a feature or bug fix and pushes a commit to Gerrit for review.

## Prerequisites

- Your local Git repo must have the Gerrit remote configured.
- You must have a valid Gerrit account and SSH key set up.

## Steps

1. **Stage your changes:**
   ```bash
   git add .
   git commit -m "feat(auth): add OAuth2 token refresh logic"
   ```

2. **Push to Gerrit for review:**
   ```bash
   git push origin HEAD:refs/for/main
   ```

   > **Tip:** Add a topic to group related changes:
   > ```bash
   > git push origin HEAD:refs/for/main%topic=oauth2-refresh
   > ```

3. **Verify the change appeared in Gerrit:**
   Open the Gerrit web UI and confirm your change is listed under "Your Changes".

## Common Commit Message Format

```
<type>(<scope>): <short summary>

<body>

Refs: #TICKET-123
```

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `refactor` | Code improvements |
| `docs` | Documentation changes |
| `test` | Adding/updating tests |

## Tips

- Keep commits **atomic** — one logical change per commit.
- Rebase your branch before pushing to keep a clean history.
