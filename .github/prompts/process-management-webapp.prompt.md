# PROJECT SPECIFICATION: PERSONAL PROCESS KNOWLEDGE BASE

## 1. Project Overview

A web-based application for managing, visualizing, and interacting with software engineering processes. It transforms "Process as Code" into an interactive, zoomable diagram with detailed Markdown documentation.

## 2. Technical Stack

* **Framework:** Next.js 14+ (App Router) - *Fastest setup, zero-config routing.*
* **Styling:** Tailwind CSS + Shadcn/UI - *Modern, professional, consistent UI.*
* **Diagram Engine:** React Flow - *For high-performance, zoomable SVG-based diagrams.*
* **Content:** MDX (next-mdx-remote) - *To render Markdown files with embedded React components.*
* **Icons:** Lucide React.
* **State Management:** URL-based (for deep linking to steps) + React Context.

---

## 3. Core Features & User Experience

### A. Dashboard & Search

* **Search Bar:** Global search (Command + K) to find processes by name, tag, or keyword.
* **Sidebar:** Folder-based navigation (e.g., `GitFlow`, `Environment Setup`, `Release`).

### B. Interactive Diagram Viewer (The Centerpiece)

* **Rendering:** View diagrams built from JSON/JavaScript configurations.
* **Interactions:** * **Zoom/Pan:** Support mouse wheel zoom and click-drag pan.
* **Reset View:** A button to snap back to 1:1 scale and center.
* **Node Click:** Clicking a node (step) highlights it and opens the **Detail Panel** on the right.


* **Visuals:** Different colors for different roles (e.g., Dev = Blue, Reviewer = Orange).

### C. Step Detail Panel (Right Side)

* **Content:** Renders a specific `.md` file associated with the clicked node.
* **Markdown Support:** Support for code blocks (with copy button), tables, and bold text.
* **Role Info:** Displays "Who is responsible" and "Tools used" at the top of the panel.

### D. GitOps & Editing (Optional/Advanced)

* **Edit Mode:** Simple UI to change node labels or markdown content.
* **Sync:** Simple button to commit and push changes back to the repository.

---

## 4. Folder Structure (The "Database")

To ensure portability and ease of use, all data is stored in the `/content` folder.

```text
/content
  /processes
    /code-review
      - metadata.json      # Tags, participants, title
      - diagram.js        # React Flow nodes and edges definition
      - step-1-push.md     # Markdown for step 1
      - step-2-review.md   # Markdown for step 2
/src
  /components
    /diagram
      - FlowViewer.tsx    # React Flow implementation
    /ui                   # Shadcn components
  /lib
    - process-loader.ts   # Utility to read local files (fs)

```

---

## 5. Implementation Guidelines for Copilot

### Data Format: `diagram.js`

The diagram should be defined using React Flow's structure:

```javascript
export const nodes = [
  { id: '1', data: { label: 'Push Commit' }, position: { x: 0, y: 0 }, type: 'processNode' },
];
export const edges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
];

```

### Data Format: `metadata.json`

```json
{
  "title": "Gerrit Code Review Process",
  "tags": ["git", "gerrit", "review"],
  "participants": [
    { "role": "Developer", "count": 1 },
    { "role": "Reviewer", "count": "1-2" }
  ]
}

```

### Detail Panel Logic

When a node with `id: "step-1"` is clicked, the app must:

1. Update the URL to `?step=step-1`.
2. Fetch and render `/content/processes/[current-slug]/step-1.md`.

---

## 6. UX/UI Requirements

* **Theme:** Support Dark/Light mode (default to Dark for Engineer aesthetic).
* **Layout:** * Left: Navigation (250px).
* Center: Diagram (Flexible).
* Right: Detail Panel (400px - collapsible).


* **Performance:** Transitions between steps must be smooth (use Framer Motion for the Detail Panel slide-in).

---

## 7. Setup & Run (Zero-Config)

The project must include a `dev` script that requires only:

1. `npm install`
2. `npm run dev`
*No external database (MongoDB/SQL) is allowed. All data must be read from the `/content` folder using Node.js `fs` module.*
