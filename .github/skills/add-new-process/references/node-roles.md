# Node Roles Reference

Each node in `flow-data.json` must have a `role` value. This controls the **color**, **icon**, and **badge** displayed in the webapp.

---

## Available Roles

| Role Value | Display Color | Icon | Use For |
|------------|---------------|------|---------|
| `developer` | Blue (`blue-400 / blue-500`) | 👤 User | Tasks performed by a human developer |
| `reviewer` | Orange (`orange-400 / orange-500`) | 🛡 Shield | Tasks performed by a reviewer, approver, or QA |
| `system` | Green (`emerald-400 / emerald-500`) | 🖥 Cpu | Automated steps: CI, scripts, deployment systems |

> Any unknown value falls back to Gray (`slate-400`) with a ⑂ GitBranch icon.

---

## Visual Examples

```
┌─────────────────────────┐
│  👤  Push Commit         │  ← role: "developer" (Blue border)
│  Developer pushes code  │
└─────────────────────────┘

┌─────────────────────────┐
│  🛡  Code Review         │  ← role: "reviewer" (Orange border)
│  Reviewer inspects PR   │
└─────────────────────────┘

┌─────────────────────────┐
│  🖥  CI Verification     │  ← role: "system" (Green border)
│  Jenkins runs tests     │
└─────────────────────────┘
```

---

## Role in Participants (metadata.json)

Participants use **display strings** (any format), not the role enum:

```json
"participants": [
  { "role": "Developer", "count": 1 },
  { "role": "Tech Lead", "count": "1-2" },
  { "role": "CI System", "count": 1 }
]
```

These are shown in the ProcessHeader bar at the top of the diagram view.

---

## Role in Nodes (flow-data.json)

Node roles must use **exact lowercase** values:

```json
"data": {
  "role": "developer"   ✅ correct
  "role": "Developer"   ❌ will fall back to default gray
  "role": "dev"         ❌ will fall back to default gray
}
```
