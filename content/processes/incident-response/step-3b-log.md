# Step 3b: Log & Monitor P3/P4

**Role:** On-Call Engineer / Developer
**Tools:** Jira / Linear, Slack, Monitoring Dashboard

---

## Overview

P3 and P4 incidents do **not** require an emergency war room. The on-call engineer logs the issue properly for the team to address in the next available sprint window, while setting up monitoring to catch any severity escalation.

## Steps

1. **Acknowledge the alert** in PagerDuty to stop further escalation pages.

2. **Create a ticket** in Jira/Linear:
   ```
   Title:   [P3] Slow search results on product listing page
   Labels:  bug, p3, monitoring
   Body:
   - First detected: 2026-02-23 14:32 UTC
   - Alert: p99 latency > 800ms on /api/search
   - Affected: ~5% of search requests
   - Workaround: None, but degraded not broken
   - Logs: [link to Datadog trace]
   ```

3. **Add to next sprint backlog** — do not block current work.

4. **Set up a monitoring watch:**
   - Configure an alert that pages if severity escalates (e.g., latency jumps to > 2s).
   - Check in on the metric every 2 hours for the rest of the shift.

5. **Post brief update in #on-call:**
   ```
   P3 logged: slow search latency (~800ms p99). Ticket: PROJ-456. Monitoring.
   No immediate action needed. Will review in next sprint.
   ```

## When to Escalate to P1/P2

Immediately re-triage if:
- More users start reporting the issue
- Error rate increases from degraded → broken
- Data integrity concerns are discovered
- Business reaches out about direct revenue impact

## Tips

- A P3 poorly tracked becomes the P1 of next month — log thoroughly.
- Include links to dashboard snapshots as evidence for future debugging.
