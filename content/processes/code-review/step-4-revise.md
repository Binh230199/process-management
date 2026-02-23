# Step 4: Address Review Comments

**Role:** Developer
**Tools:** Git, IDE

---

## Overview

After receiving feedback, the developer addresses all reviewer comments and pushes an updated patch set.

## Workflow

1. **Read all comments** carefully in Gerrit before making changes.
2. **Reply to each comment** — even if you agree, mark it "Done".
3. **Make changes** in your local branch:
   ```bash
   # Edit the relevant files
   git add .
   git commit --amend --no-edit  # Keep same commit for same logical change
   ```

4. **Push the updated patch set:**
   ```bash
   git push origin HEAD:refs/for/main
   ```

## When to Create a New Commit

Only create a new commit (instead of amending) if:
- The reviewer requested a **distinct** additional change
- You're adding a follow-up fix that is logically separate

## Responding to Comments

- For each comment, either:
  - **Mark as Done**: If you've applied the fix.
  - **Reply with explanation**: If you disagree or need clarification.

> **Rule:** Never push a new patch set without responding to existing comments.

## Common Mistakes to Avoid

- ❌ Force-pushing a completely different commit SHA
- ❌ Leaving comments unacknowledged
- ❌ Making unrelated changes in the same patch set
