# Step 3a: Escalate to On-Call (P1/P2)

**Role:** Incident Commander
**Tools:** PagerDuty, Slack, Google Meet / Zoom, Status Page

---

## Overview

For P1 and P2 incidents, immediate escalation is required. This step sets up the command structure, communication channels, and external stakeholder notifications to ensure the team can work fast and in sync.

## Actions

### 1. Page Additional Responders

```bash
# PagerDuty CLI (if configured)
pd incident create \
  --service "payment-api" \
  --urgency high \
  --title "P1: Checkout API returning 500s" \
  --body "Started at 14:32 UTC, 100% error rate on /api/checkout"
```

Or manually escalate in PagerDuty web UI → Escalate → select on-call rotation.

### 2. Open a War Room

- Create a dedicated **Slack channel**: `#inc-YYYYMMDD-short-description`
  - e.g. `#inc-20260223-checkout-down`
- Start a **video bridge** for real-time coordination

### 3. Assign Roles

| Role | Responsibility |
|------|---------------|
| **Incident Commander** | Coordinates response, owns communication |
| **Technical Lead** | Drives investigation and fix |
| **Communications Lead** | Updates status page and stakeholders |
| **Scribe** | Documents timeline and decisions in real time |

### 4. Post to Status Page

```
[statuspage.io]
Status: Investigating
Title: Elevated error rates on Checkout API
Body: We are aware of an issue affecting checkout. Our team is actively investigating.
```

### 5. Notify Stakeholders

```
[Slack #exec-incidents or email]
📣 P1 Incident in progress
Service: Checkout API
Impact: ~100% of checkout flows failing for all users
IC: @name | Started: 14:32 UTC | Bridge: [link]
ETA for update: T+30 min
```

## Tips

- **Update every 30 minutes** even if there's no resolution. Silence feels worse than bad news.
- **Don't over-invite** — too many people in the war room slows things down.
- Keep the Slack channel **pinned document** with latest status updated live.
