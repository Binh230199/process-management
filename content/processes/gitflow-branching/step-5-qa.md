# Step 5: QA & Stabilization

**Role:** QA Engineer / CI System
**Tools:** Test Suite, Staging Environment

---

## Overview

The release branch is deployed to a staging environment where full regression testing is performed.

## Testing Checklist

- [ ] Full regression test suite passes
- [ ] Performance benchmarks within acceptable range
- [ ] Security scan completed (OWASP ZAP, Snyk)
- [ ] UI/UX acceptence testing sign-off
- [ ] API contract tests pass

## Environment

Deploy to staging:

```bash
# Trigger staging deployment (example)
kubectl set image deployment/app app=registry/app:release-2.4.0
```

## Bug Fixes on Release Branch

For any bugs found during QA, fix directly on the release branch:

```bash
git checkout release/2.4.0
# ... fix the bug ...
git commit -m "fix(auth): handle expired token edge case"

# Backport to develop immediately
git checkout develop
git merge release/2.4.0
```
