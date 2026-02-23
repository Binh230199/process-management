# Step 4: Investigate & Diagnose

**Role:** On-Call Engineer / Technical Lead
**Tools:** Datadog, Grafana, Kibana, Jaeger, kubectl, AWS Console

---

## Overview

This is the core technical step — and the one most likely to **loop**. The goal is to identify the **root cause**: the specific change, resource, or dependency that triggered the incident. If the applied fix in Step 5 doesn't resolve the issue, you'll return here for deeper investigation.

## Investigation Checklist

Work through these layers **from top to bottom**:

### Layer 1: Recent Changes (5 min)

```bash
# What deployed recently?
git log origin/main --oneline --since="2 hours ago"

# Any infra changes?
# Check Terraform/CloudFormation change history in your cloud console
```

- [ ] Any deploy in the last 2 hours? → **Most likely culprit. Consider rollback first.**
- [ ] Any config or feature flag change?
- [ ] Any database migration run?

### Layer 2: Application Logs (10 min)

```bash
# Kubernetes — check logs of failing pods
kubectl logs -n production -l app=payment-api --since=10m | grep -i error

# Filter for exception stack traces
kubectl logs ... | grep -A 10 "Exception\|ERROR\|FATAL"
```

Key questions:
- What's the error message?
- Is it one service or multiple?
- Is the error rate 100% or partial?

### Layer 3: Metrics & Traces (10 min)

Check these dashboards in Datadog/Grafana:

| Metric | What to look for |
|--------|-----------------|
| Error rate | When did it spike? Correlate with deploys |
| Latency p99 | Upstream timeout? Database slow? |
| CPU / Memory | Resource pressure or OOM kill? |
| External calls | Third-party API (Stripe, SendGrid) returning errors? |
| DB query time | Slow queries, lock waits, connection pool exhaustion |

### Layer 4: Dependencies (5 min)

```bash
# Check if downstream services are healthy
curl -s https://status.stripe.com/api/v2/status.json | jq .status.description
curl -s https://status.aws.amazon.com/ | grep -i "service disruption"
```

## Documenting Findings

As you investigate, **write in the war room channel** in real time:

```
14:35 - Checked recent deploys. payment-api v2.4.1 deployed at 14:28 UTC
14:37 - Error: "connection pool exhausted" in payment-api logs
14:40 - DB connection pool maxed out. Likely cause: leaked connections in v2.4.1
→ ROOT CAUSE HYPOTHESIS: DB connection leak introduced in v2.4.1
```

## Outcome

- **Root cause found** → proceed to **Apply Fix / Rollback**
- **Still unclear** → continue deeper investigation (this step loops until cause is identified)

> ⚠️ **Time box each investigation layer to 10 minutes.** If you're stuck, ask for a second pair of eyes in the war room.
