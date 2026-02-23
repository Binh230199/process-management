# Full Schema Reference

Complete field-level documentation for all JSON files in a process folder.

---

## Directory Layout

```
/content/processes/<slug>/
├── metadata.json       ← Process metadata (required)
├── flow-data.json      ← React Flow diagram (required)
├── <step-id>.md        ← One file per node (required per node)
└── ...
```

**Slug rules:**
- Lowercase letters and hyphens only: `cicd-pipeline`, `incident-response`
- No spaces, underscores, or uppercase
- Must be unique across all processes

---

## `metadata.json` Schema

```json
{
  "title": string,           // Required. Human-readable title shown in UI.
  "description": string,     // Required. 1-2 sentences. Shown on dashboard card.
  "category": string,        // Required. Groups processes in sidebar. e.g. "DevOps"
  "tags": string[],          // Required. Lowercase. Used in Cmd+K search.
  "participants": [          // Required. Shown in process header.
    {
      "role": string,        // Display string e.g. "Developer", "Tech Lead"
      "count": number | string  // e.g. 1 or "1-2" or "N"
    }
  ]
}
```

---

## `flow-data.json` Schema

```json
{
  "nodes": [
    {
      "id": string,           // Required. Unique. Matches .md filename without extension.
      "type": "processNode",  // Required. Always this value.
      "data": {
        "label": string,      // Required. Short text on node card. Max ~30 chars.
        "role": string,       // Required. "developer" | "reviewer" | "system"
        "description": string,// Optional. One sentence under label. Max ~80 chars.
        "stepFile": string    // Required. Filename without .md (e.g. "step-1-push")
      },
      "position": {
        "x": number,          // Required. Canvas X coordinate.
        "y": number           // Required. Canvas Y coordinate.
      }
    }
  ],
  "edges": [
    {
      "id": string,           // Required. Unique. Suggested pattern: "e<src>-<tgt>"
      "source": string,       // Required. Must match a node id.
      "target": string,       // Required. Must match a node id.
      "animated": boolean,    // Optional. true = flowing dashes on edge.
      "label": string,        // Optional. Text shown on the edge.
      "type": string          // Optional. "smoothstep" for curved/loop edges.
    }
  ]
}
```

---

## Step Markdown (.md) Schema

No strict schema — markdown is rendered as-is. Recommended structure:

```markdown
# Step N: Title

**Role:** Human-readable role
**Tools:** Tool1, Tool2

---

## Overview
...

## Steps
1. First step
   ```bash
   command
   ```

## Checklist
- [ ] item

## Tips
- tip

## Common Mistakes
- ❌ anti-pattern
```

---

## Position Layout Cookbook

### Linear (top-to-bottom)

```
Step 1: x:250, y:0
Step 2: x:250, y:120
Step 3: x:250, y:240
Step 4: x:250, y:360
```

### Two-branch decision

```
              Step 3   x:250, y:240
             /       \
Step 4L x:0,360    Step 4R x:500,360
```

### Merge after branch

```
Step 4L x:0,360    Step 4R x:500,360
             \       /
              Step 5   x:250, y:480
```

### Loop back

Use edge `type: "smoothstep"` from a lower node back to an upper node.
The React Flow renderer handles the curve automatically.

---

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Process slug | `kebab-case` | `release-pipeline` |
| Node id | `step-N-verb` | `step-3-review` |
| Step file | same as node id | `step-3-review.md` |
| Edge id | `e<src>-<tgt>` | `e2-3` or `e-loop` |
| Tags | lowercase words | `["docker", "k8s", "ci"]` |
