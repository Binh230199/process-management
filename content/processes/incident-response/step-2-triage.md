# Step 2: Triage Severity

**Role:** Incident Commander (On-Call Lead / Tech Lead)
**Tools:** PagerDuty, Slack, Status Page

---

## Overview

The Incident Commander evaluates the impact scope and assigns a **severity level**. This decision drives the entire response path:

- **P1 / P2** → immediate escalation, war room, all hands
- **P3 / P4** → log ticket, schedule fix, monitor

## Severity Matrix

| Level | Impact | Response Time | Example |
|-------|--------|---------------|---------|
| **P1** | Complete service outage for all users | Immediate (< 5 min) | Payment API down, login broken |
| **P2** | Partial outage or major feature broken | < 15 min | Checkout fails for 30% of users |
| **P3** | Degraded performance or minor feature broken | < 4 hours | Slow search results, non-critical export fails |
| **P4** | Cosmetic issue, single user affected | Next sprint | Wrong label in UI, formatting bug |

## Decision Checklist

Answer these questions to assign severity:

- [ ] **Who is affected?** All users / partial set / internal only / single user
- [ ] **Is revenue impacted?** Checkout, payments, or core funnel broken?
- [ ] **How long has it been happening?** Seconds → likely P1. Hours → users have workarounds
- [ ] **Is there a workaround?** Yes → lower severity
- [ ] **Is data at risk?** Potential data loss or corruption → always P1

## Communication at This Step

```
[Slack #incidents]
🚨 INCIDENT DECLARED
Severity: P1
Service: Payment API
Impact: All checkout flows failing (started ~14:32 UTC)
IC: @you
War room: https://meet.google.com/xyz-abc
```

> **Rule of thumb:** When in doubt, escalate to a higher severity. It's easier to downgrade than to under-respond to a P1.

## Outcome

- **P1/P2** → proceed to **Escalate to On-Call** (right branch)
- **P3/P4** → proceed to **Log & Monitor** (left branch, lower urgency)
