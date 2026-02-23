# Step 3: Code Review

**Role:** Reviewer (Senior Developer / Tech Lead)
**Tools:** Gerrit Web UI

---

## Overview

A reviewer examines the code change for correctness, style, maintainability, and potential side effects.

## Review Checklist

### Correctness
- [ ] Does the code do what the commit message says?
- [ ] Are edge cases handled?
- [ ] Are there any off-by-one errors or null pointer risks?

### Code Quality
- [ ] Is the code readable without heavy comments?
- [ ] Does it follow team coding conventions?
- [ ] Are functions single-responsibility?

### Testing
- [ ] Are there adequate unit tests?
- [ ] Are integration tests included where necessary?
- [ ] Do existing tests still pass?

### Security
- [ ] Is user input properly validated/sanitized?
- [ ] Are there any hardcoded credentials?
- [ ] Are new dependencies trusted?

## Providing Feedback

Use **inline comments** on Gerrit for specific line-level feedback.
Use the **cover message** for overall change-level observations.

### Scoring

| Score | Meaning |
|-------|---------|
| `Code-Review +2` | Approved — ready to merge |
| `Code-Review +1` | Looks good, but defers to another reviewer |
| `Code-Review 0` | No opinion |
| `Code-Review -1` | Do not submit — concerns raised |
| `Code-Review -2` | Do NOT submit — hard block |

## Communication Tips

- Be **constructive**, not critical of the person.
- Use phrasing like "Consider..." or "What if we...".
- Mark comments as `nit:` if they're minor/optional.
