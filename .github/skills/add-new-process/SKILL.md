---
name: add-new-process
description: 'Add a new process to the Personal Process Knowledge Base webapp. Use when asked to "add a process", "create a new process", "add a workflow", "thêm process mới", "tạo quy trình mới", or when the user provides a workflow/diagram they want to document. Scaffolds the complete folder structure under /content/processes/ including metadata.json, flow-data.json, and step .md files, then verifies the process appears in the webapp automatically.'
---

# Add New Process

This skill scaffolds a brand-new process entry into the webapp's file-based database. Because the app uses `fs.readdirSync` to auto-discover processes at build/runtime, **no code changes are needed** — only new files under `/content/processes/`.

---

## When to Use This Skill

- User asks to "add a process", "create a new process", or "add a workflow"
- User provides a list of steps they want to turn into a diagram
- User wants to document a new engineering procedure
- Vietnamese: "thêm process mới", "tạo quy trình", "thêm workflow"

---

## Prerequisites

- The webapp is already running (`npm run dev`)
- Node roles to use: `developer`, `reviewer`, `system` (see references/node-roles.md)
- Each step needs: an `id`, a short `label`, a `role`, and a `.md` file

---

## Workflow

### Step 1 — Gather Information

Before creating any files, collect:

| Field | Example | Required? |
|-------|---------|-----------|
| Process title | "CI/CD Deployment Pipeline" | ✅ |
| Slug (folder name) | `cicd-deployment` | ✅ (lowercase, hyphens only) |
| Category | "DevOps" | ✅ |
| Tags | `["ci", "cd", "docker", "k8s"]` | ✅ |
| Steps (list) | Push → Build → Test → Deploy | ✅ |
| Role per step | developer / reviewer / system | ✅ |
| Participants | Developer×1, DevOps×1 | ✅ |

> **Slug rules:** lowercase letters and hyphens only. No spaces, no underscores, no uppercase.
> Examples: `cicd-deployment`, `incident-response`, `onboarding-checklist`

---

### Step 2 — Create the Process Folder

Create:
```
/content/processes/<slug>/
├── metadata.json
├── flow-data.json
├── <step-id-1>.md
├── <step-id-2>.md
└── ...
```

Use the templates in `templates/` as starting points.

---

### Step 3 — Write `metadata.json`

Follow the schema in `templates/metadata.json`.

**Rules:**
- `"title"` — human-readable, any case
- `"category"` — used to group processes in the sidebar. Reuse an existing category or create a new one
- `"tags"` — lowercase strings, used in Command Palette search
- `"participants"` — array of `{ "role": string, "count": number | string }`

---

### Step 4 — Write `flow-data.json`

Follow the schema in `templates/flow-data.json`.

**Node positioning guide (vertical linear flow):**

```
Node 1  →  position: { x: 250, y: 0 }
Node 2  →  position: { x: 250, y: 120 }
Node 3  →  position: { x: 250, y: 240 }
...each step adds 120 to y
```

**For branching flows:**

```
Main path keeps x: 250
Branch left:   x: 0,   y: (parent_y + 120)
Branch right:  x: 500, y: (parent_y + 120)
```

**Node fields:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique. Should match the `.md` filename without extension. Pattern: `step-N-verb` |
| `type` | string | Always `"processNode"` |
| `data.label` | string | Short name shown on the node card (≤ 30 chars) |
| `data.role` | string | `developer`, `reviewer`, or `system` |
| `data.description` | string | One-sentence description shown under label (≤ 80 chars) |
| `data.stepFile` | string | Filename without `.md` extension — must match the actual `.md` file |
| `position.x` | number | X coordinate on canvas |
| `position.y` | number | Y coordinate on canvas |

**Edge fields:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique. Pattern: `e<source-id>-<target-id>` |
| `source` | string | Node id of the source |
| `target` | string | Node id of the target |
| `animated` | boolean | `true` for main happy-path edges |
| `label` | string | Optional — shown on the edge (e.g., "On Failure") |
| `type` | string | Optional — `"smoothstep"` for curved back-edges (loops) |

---

### Step 5 — Write Step Markdown Files

Create one `.md` file per node. Filename must exactly match `data.stepFile` + `.md`.

Follow the template in `templates/step-template.md`.

**Required sections:**
1. H1 heading with step name
2. `**Role:**` and `**Tools:**` on separate bold lines
3. `## Overview` — what this step does
4. `## Steps` — numbered list with bash code blocks where applicable
5. Optionally: `## Checklist`, `## Tips`, `## Common Mistakes` sections

---

### Step 6 — Verify in the Webapp

Because the app auto-discovers processes via `fs.readdirSync`, the new process will appear **immediately** after saving — no restart needed in dev mode.

1. Open http://localhost:3000 — new process card should appear on the dashboard
2. Click the process → confirm diagram renders
3. Click each node → confirm detail panel loads the correct `.md`
4. Press `Cmd+K` → confirm the process appears in search results

**Checklist:**
- [ ] Process card appears on dashboard with correct title, tags, and category
- [ ] All nodes render in the correct positions
- [ ] All edges connect correctly
- [ ] Each node click opens the correct Markdown content
- [ ] Role badge (developer/reviewer/system) shows correctly
- [ ] Tags searchable via `Cmd+K`

---

## Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| Process not on dashboard | Folder or `metadata.json` missing/malformed | Check JSON is valid, folder name must match |
| Node click shows "Content not found" | `data.stepFile` doesn't match `.md` filename | Double-check filename — case-sensitive on Linux |
| Diagram renders but no content | `.md` file is empty or wrong encoding | Save as UTF-8 without BOM |
| Nodes overlap | `position.x/y` values are the same | Increment `y` by 120 per node row |
| Edge not visible | `source` or `target` id doesn't match a node id | Verify ids are exact strings |

---

## References

- [Node roles & colors](references/node-roles.md)
- [Full field schema](references/schema.md)
- [Starter templates](templates/)
