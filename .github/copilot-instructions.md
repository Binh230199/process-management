## 1. Role & Context

You are an expert Full-stack Engineer. Your task is to build a **"Personal Process Knowledge Base"** webapp.

* **Goal:** Help Software Engineers manage, search, and follow complex work processes using interactive diagrams and Markdown.
* **Philosophy:** Data-driven but File-based. No external database. Zero-config on clone.

## 2. Tech Stack Requirements (Strict)

* **Framework:** Next.js 14+ (App Router).
* **Diagram:** React Flow (SVG-based, zoomable, interactive).
* **Styling:** Tailwind CSS + Shadcn/UI (Dark mode by default).
* **Content:** `next-mdx-remote` or `react-markdown` to render `.md` files.
* **Icons:** Lucide React.
* **Animations:** Framer Motion (for side panels).

## 3. Directory Structure

You must strictly follow this structure to ensure the "File-as-Database" logic works:

```text
/content
  /processes
    /[process-slug]
      - metadata.json      # Metadata: title, tags, roles
      - flow-data.json     # React Flow nodes & edges
      - [step-id].md       # Detailed guide for each node
/src
  /app                     # Next.js App Router
  /components
    /diagram
      - FlowCanvas.tsx     # Main React Flow component
      - Sidebar.tsx        # Process navigation
      - DetailPanel.tsx    # Markdown renderer for steps
  /lib
    - data-loader.ts       # Server-side 'fs' logic to read /content

```

## 4. Key Logic & Functionality

### A. Data Loading (Server Side)

* Create a utility in `lib/data-loader.ts` using Node.js `fs` and `path`.
* `getAllProcesses()`: Scans `/content/processes` and returns metadata.
* `getProcessBySlug(slug)`: Returns metadata + flow-data.
* `getStepContent(slug, stepId)`: Reads the specific `.md` file.

### B. Interactive Diagram (React Flow)

* **Custom Nodes:** Create a `ProcessNode` component. It should display a label and an icon representing the role (e.g., a "User" icon for Dev, "Shield" for Reviewer).
* **Event Handling:** When a node is clicked, update the URL search params: `?step=[stepId]`.
* **Responsive Canvas:** Include `Background`, `Controls`, and `MiniMap` (hidden by default, toggleable).

### C. Detail Panel (The "SOP" Viewer)

* Sync with URL `?step=...`. When the param changes, fetch and display the corresponding Markdown.
* Use `prose` classes from `@tailwindcss/typography` for beautiful Markdown rendering.

### D. Search & Filter

* Implement a Command Palette (`Cmd+K`) using `cmdk` to search through `metadata.json` of all processes.

## 5. UI/UX Standards

* **Modern Aesthetic:** Use a "Glassmorphism" or "Linear.app" style. Border colors: `slate-800`, Background: `black/slate-950`.
* **Layout:**
* Left Sidebar (Collapsible): List of process categories.
* Center: Large Diagram canvas (full screen minus sidebars).
* Right Panel (Slide-in): Markdown detail, width ~400px.


* **Interactions:**
* Zoom should feel "smooth".
* Reset view button must always be visible.



## 6. Implementation Steps for Copilot

1. **Phase 1:** Setup Next.js with Tailwind and Shadcn/UI.
2. **Phase 2:** Create the `data-loader.ts` to bridge the `/content` folder with the UI.
3. **Phase 3:** Build the `FlowCanvas` using React Flow with custom nodes.
4. **Phase 4:** Implement the `DetailPanel` to render Markdown based on node selection.
5. **Phase 5:** Add search and "Reset View" functionality.
