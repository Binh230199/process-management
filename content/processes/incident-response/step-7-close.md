# Step 7: Close Incident & Schedule Post-Mortem

**Role:** Incident Commander / Engineering Manager
**Tools:** PagerDuty, Statuspage.io, Confluence / Notion, Slack

---

## Overview

Closing an incident is more than pressing "Resolve" in PagerDuty. A proper closure restores stakeholder trust and seeds the institutional knowledge that **prevents recurrence**.

---

## Phase 1: Resolve & Communicate (Immediately)

### 1. Update Status Page

Change status from **"Monitoring"** → **"Resolved"** with a final message:

```
[RESOLVED] Payment API Degradation
We have resolved the issue affecting payment processing.
All systems are operating normally as of 15:05 UTC.

Impact: ~40 minutes of elevated error rates (14:21–15:01 UTC)
Cause: Memory leak introduced in v2.4.1 (deployed 14:15 UTC)
Action: Rolled back to v2.4.0

A full post-mortem will be published within 48 hours.
```

### 2. Resolve PagerDuty Alert

```bash
# Via PagerDuty CLI
pd incident resolve --id <INCIDENT_ID>

# Or via API
curl -X PUT https://api.pagerduty.com/incidents/<INCIDENT_ID> \
  -H "Authorization: Token token=$PD_TOKEN" \
  -d '{"incident": {"type": "incident", "status": "resolved"}}'
```

### 3. Notify Stakeholders

Post in `#incidents` Slack channel:

```
✅ RESOLVED: Payment API Degradation (INC-2024-0312)

Duration: 14:21 – 15:05 UTC (44 minutes)
User Impact: ~8% of payment requests failed with 500
Root Cause: Memory leak in v2.4.1 connection pool
Fix: Rolled back to v2.4.0; hotfix in progress
MTTR: 44 minutes | MTTD: 6 minutes

Post-mortem scheduled: 2024-03-14 10:00 UTC
Incident page: [link]
```

---

## Phase 2: Post-Mortem (Within 48 Hours)

### Schedule the Meeting

| Invitees | Why |
|----------|-----|
| On-call engineers (all involved) | Share timeline + findings |
| Engineering Manager | Prioritize action items |
| QA Lead | Review testing gaps |
| Product Manager | Understand user impact |

### Post-Mortem Document Template

```markdown
## Incident: INC-2024-0312 — Payment API Degradation

### Summary
One-paragraph description of what happened.

### Timeline
| Time (UTC) | Event |
|-----------|-------|
| 14:15     | v2.4.1 deployed to production |
| 14:21     | First 500 errors detected by monitoring |
| 14:27     | PagerDuty alert fired, on-call paged |
| 14:32     | War room opened |
| 14:45     | Root cause identified (memory leak) |
| 14:52     | Rollback initiated |
| 15:01     | Service restored |
| 15:05     | Metrics confirmed healthy, incident closed |

### Root Cause
Memory leak in connection pool introduced by PR #892 (merged 14:00 UTC).
The fix for issue #445 incorrectly removed the `finally` block that closes DB connections.

### Contributing Factors
- Memory leak not caught in staging (staging has auto-restart on memory threshold)
- No memory utilization alert configured in production

### Impact
- 44 minutes of degraded service
- ~1,200 failed payment requests
- 0 data loss or corruption

### Action Items
| Action | Owner | Due Date |
|--------|-------|----------|
| Add memory utilization alert in production | @devops-team | 2024-03-16 |
| Fix staging env to match production memory behavior | @infra-team | 2024-03-20 |
| Add integration test for DB connection cleanup | @backend-team | 2024-03-16 |
| Implement canary deploys for payment service | @platform-team | 2024-03-30 |

### What Went Well
- On-call responded within 5 minutes of page
- War room coordination was efficient
- Rollback executed cleanly with no additional disruption

### What Could Be Improved
- Alert should have fired earlier (6 min delay)
- Runbook link was missing from PagerDuty alert
```

---

## Incident Metrics

| Metric | Value | Definition |
|--------|-------|------------|
| **MTTD** | 6 min | Mean Time To Detect (first error → alert fired) |
| **MTTA** | 5 min | Mean Time To Acknowledge (alert → on-call responded) |
| **MTTR** | 44 min | Mean Time To Resolve (first error → service restored) |

> Track these metrics over time in your team's incident analytics dashboard.
