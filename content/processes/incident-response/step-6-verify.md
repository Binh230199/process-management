# Step 6: Verify in Production

**Role:** On-Call Engineer / System Monitoring
**Tools:** Datadog / Grafana, Postman / curl, PagerDuty

---

## Overview

After applying the fix, do **not** declare victory immediately. Verify that production is genuinely healthy using real metrics — not just the absence of alerts.

---

## Verification Checklist

### 1. Check Error Rates

```bash
# Real-time error rate via Datadog CLI
datadog-cli metrics query "rate:http.server.errors{env:production,service:payment-api}[1m]"

# Or grep app logs
kubectl logs -l app=payment-api -n production --since=5m | grep -E "ERROR|FATAL" | wc -l
```

**Pass criteria:** Error rate < 0.1% (or back to pre-incident baseline)

---

### 2. Check Latency & SLO Compliance

Monitor these for at least **5 minutes** after the fix:

| Metric | Target | Check Via |
|--------|--------|-----------|
| p99 latency | < 500ms | Grafana → API Performance dashboard |
| Error rate | < 0.1% | Datadog SLO dashboard |
| Success rate | > 99.9% | Uptime monitor (e.g., Pingdom) |
| CPU / Memory | < 80% | Kubernetes metrics-server |

---

### 3. Smoke Test Critical Endpoints

```bash
# Health check
curl -s https://api.example.com/health | jq '.status'
# Expected: "healthy"

# Critical business flow
curl -s -X POST https://api.example.com/payments \
  -H "Authorization: Bearer $TEST_TOKEN" \
  -d '{"amount": 1, "currency": "USD", "test": true}' | jq '.status'
# Expected: "processed"
```

---

### 4. Confirm Alerts Resolved

- [ ] PagerDuty incident alert auto-resolved (or manually resolve)
- [ ] Status page shows "Investigating" → "Monitoring" state
- [ ] No new high-severity alerts firing in past 5 minutes

---

## Decision Gate

```
Is production healthy after 5–10 minutes observation?

    ✅ YES → Proceed to Step 7: Close & Post-Mortem
    ❌ NO  → Loop back to Step 4: Investigate & Diagnose
              (New information likely — log new symptoms)
```

> **Rule:** If you loop back, increment the incident timeline entry with new findings. Do not overwrite previous investigation notes.

---

## Update War Room

```
15:01 - Rollback to v2.4.0 deployed
15:03 - Error rate: 0.02% ✓  p99 latency: 210ms ✓
15:04 - Smoke tests passed ✓
15:05 - SLO dashboard green ✓
→ RESOLVED. Proceeding to close.
```
