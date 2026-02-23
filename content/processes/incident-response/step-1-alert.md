# Step 1: Alert Triggered

**Role:** Monitoring System (PagerDuty / Grafana / Datadog)
**Tools:** PagerDuty, Grafana, Datadog, Prometheus

---

## Overview

An automated alert fires when a monitoring system detects that one or more production SLOs have been breached — such as error rate exceeding threshold, latency spike, or service becoming unreachable. This is the entry point of every incident.

## Common Alert Sources

| Source | Example Trigger |
|--------|----------------|
| Error rate | `5xx > 1%` over 5 minutes |
| Latency | `p99 > 2s` sustained for 3 minutes |
| Availability | Health check failing for 2+ instances |
| Queue depth | Message backlog exceeding threshold |
| Disk / CPU | Resource saturation on critical host |

## What the System Does

1. **Fires the alert** via configured channels (PagerDuty, Slack, SMS).
2. **Pages the on-call engineer** according to the on-call rotation schedule.
3. **Creates an incident ticket** automatically in PagerDuty/Jira.
4. **Captures initial context**: alert name, affected service, first-seen timestamp.

## Validating a Real Alert vs. False Positive

Before escalating, the on-call engineer should spend **≤ 2 minutes** checking:

```bash
# Check service health quickly
curl -s https://api.yourservice.com/health | jq .

# Check recent deploy (did someone just push?)
git log origin/main --oneline -5
```

- If the alert auto-resolves within the SLA window → mark as flapping, tune alert threshold.
- If the alert persists → proceed to **Triage Severity**.

## Tips

- **Never ignore an alert** even if it looks like a false positive. Acknowledge it first, then assess.
- Tag the PagerDuty incident with the affected service immediately for better reporting.
