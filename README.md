# Process Knowledge Base

> Interactive diagrams and step-by-step Markdown guides for your software engineering workflows.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React Flow](https://img.shields.io/badge/React%20Flow-12-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Features

- 🗺 **Interactive Diagrams** — Zoomable, pannable React Flow canvas with custom role-coloured nodes
- 📄 **Markdown SOP Viewer** — Click any node to open its step guide (rendered with syntax highlighting)
- 🔍 **Command Palette** — `Cmd+K` / `Ctrl+K` full-text search across all processes
- 📁 **File-based Database** — No external DB. All data lives in `/content/processes/`
- ⚡ **Zero-config** — Clone → `npm install` → `npm run dev`. Done.
- 🌙 **Dark mode by default**

---

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/<your-username>/process-management.git
cd process-management

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
process-management/
├── content/
│   └── processes/
│       ├── code-review/          # Process folder (slug)
│       │   ├── metadata.json     # Title, tags, category, participants
│       │   ├── flow-data.json    # React Flow nodes & edges
│       │   ├── step-1-push.md    # Markdown guide per step
│       │   └── ...
│       └── gitflow-branching/
│           ├── metadata.json
│           ├── flow-data.json
│           └── ...
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── page.tsx              # Dashboard
│   │   ├── process/[slug]/       # Process diagram page
│   │   └── api/step-content/     # API route: serves .md content
│   ├── components/
│   │   ├── diagram/
│   │   │   ├── FlowCanvas.tsx    # React Flow canvas
│   │   │   ├── ProcessNode.tsx   # Custom node component
│   │   │   ├── DetailPanel.tsx   # Slide-in Markdown viewer
│   │   │   └── ProcessHeader.tsx # Header bar
│   │   ├── layout/
│   │   │   ├── AppShell.tsx      # Root layout with sidebar
│   │   │   └── Sidebar.tsx       # Collapsible nav
│   │   └── search/
│   │       └── CommandPalette.tsx # Cmd+K search
│   └── lib/
│       ├── data-loader.ts        # fs-based content loader
│       └── utils.ts              # cn() utility
└── .github/
    ├── copilot-instructions.md   # Copilot project context
    └── skills/
        └── add-new-process/      # Skill: scaffold a new process
```

---

## Adding a New Process

Create a folder under `content/processes/<your-slug>/` with three things:

### 1. `metadata.json`
```json
{
  "title": "My Process",
  "description": "What this process achieves.",
  "category": "DevOps",
  "tags": ["ci", "cd"],
  "participants": [
    { "role": "Developer", "count": 1 }
  ]
}
```

### 2. `flow-data.json`
```json
{
  "nodes": [
    {
      "id": "step-1-start",
      "type": "processNode",
      "data": { "label": "Start", "role": "developer", "stepFile": "step-1-start" },
      "position": { "x": 250, "y": 0 }
    }
  ],
  "edges": []
}
```

### 3. `step-1-start.md`
```markdown
# Step 1: Start
**Role:** Developer
**Tools:** Git

## Overview
Description of this step...
```

Save the files — the process appears on the dashboard automatically. No restart needed.

> See `.github/skills/add-new-process/` for full templates and schema reference.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Diagram | React Flow (`@xyflow/react`) |
| Styling | Tailwind CSS v4 + custom dark theme |
| Markdown | `react-markdown` + `rehype-highlight` |
| Animations | Framer Motion |
| Search | `cmdk` Command Palette |
| Icons | Lucide React |

---

## License

MIT

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
