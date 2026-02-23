# Step 5: Approve the Change (+2)

**Role:** Senior Reviewer / Tech Lead
**Tools:** Gerrit Web UI

---

## Overview

Once the code is satisfactory, the reviewer grants a **Code-Review +2** score, signaling the change is ready to merge.

## Pre-Approval Checklist

- [ ] All review comments have been addressed (marked "Done" or explained).
- [ ] CI pipeline shows `+1 Verified`.
- [ ] The latest patch set contains all agreed changes.
- [ ] Commit message is clean and descriptive.

## How to Approve

1. Open the Gerrit change page.
2. Click **"Reply"**.
3. Set **Code-Review** to `+2`.
4. Optionally add a message: *"LGTM — nice clean implementation!"*
5. Click **"Send"**.

## Who Can Give +2?

Only users with the **Reviewer** role or higher can grant +2.
Typically this is: Tech Lead, Staff Engineer, or Senior Developer.

> **Note:** A developer **cannot** +2 their own change.

## After Approval

The change will show status: **Approved** 🟢
The developer (or CI automation) can now submit/merge it.
