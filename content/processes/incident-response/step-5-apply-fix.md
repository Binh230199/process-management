# Step 5: Apply Fix / Rollback

**Role:** On-Call Engineer / Technical Lead
**Tools:** Git, CI/CD Pipeline, kubectl, Terraform

---

## Overview

Once the root cause is identified, apply the minimum change needed to restore service. The priority is **speed of recovery**, not elegance of solution. You can refactor later.

## Decision: Hotfix or Rollback?

```
Is the issue caused by a recent deploy?
    └── YES → Rollback first (faster, safer)
    └── NO  → Apply targeted hotfix
```

**Rollback** is always preferred when a deploy is the cause — it's predictable and fast.

---

## Option A: Rollback (Recommended for Deploy-Caused Incidents)

### Kubernetes Rolling Rollback

```bash
# View rollout history
kubectl rollout history deployment/payment-api -n production

# Roll back to previous version
kubectl rollout undo deployment/payment-api -n production

# Confirm rollback is progressing
kubectl rollout status deployment/payment-api -n production

# Verify running image
kubectl get deployment payment-api -n production -o jsonpath='{.spec.template.spec.containers[0].image}'
```

### Docker / ECS Rollback

```bash
# Re-deploy the previous task definition (AWS ECS)
aws ecs update-service \
  --cluster production \
  --service payment-api \
  --task-definition payment-api:PREVIOUS_REVISION \
  --force-new-deployment
```

---

## Option B: Hotfix Deployment

Only when rollback isn't viable (e.g., database migration already applied):

1. **Create minimal fix on a hotfix branch:**
   ```bash
   git checkout -b hotfix/fix-db-connection-leak main
   # Apply targeted fix
   git commit -m "fix: close db connection in finally block"
   git push origin hotfix/fix-db-connection-leak
   ```

2. **Fast-track review** — at minimum one reviewer LGTM.

3. **Deploy through CI/CD** — do not skip the pipeline even during incidents.
   ```bash
   # After merge to main, trigger deploy
   # Most pipelines auto-deploy on merge to main
   ```

---

## Common Mitigation Patterns

| Root Cause | Immediate Mitigation |
|-----------|---------------------|
| Slow DB query | Kill long-running queries, add index (if fast), disable feature flag |
| OOM crash | Increase memory limits temporarily |
| 3rd-party API down | Enable circuit breaker / fallback mode |
| Traffic spike | Scale up replicas or enable rate limiting |
| Bad config | Revert config change via feature flag or secret update |

## Post-Fix Documentation

```
14:52 - ACTION: Rolling back payment-api to v2.4.0
14:54 - Rollback complete. All pods running v2.4.0
→ Moving to verification step
```
