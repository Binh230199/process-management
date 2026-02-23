import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content", "processes");

export interface ProcessMetadata {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  participants: Array<{ role: string; count: string | number }>;
}

export interface FlowData {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

export interface FlowNode {
  id: string;
  type?: string;
  data: {
    label: string;
    role?: string;
    description?: string;
    stepFile?: string;
  };
  position: { x: number; y: number };
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  animated?: boolean;
  label?: string;
  type?: string;
  style?: Record<string, unknown>;
  labelStyle?: Record<string, unknown>;
  labelBgStyle?: Record<string, unknown>;
}

export interface ProcessDetail extends ProcessMetadata {
  flowData: FlowData;
}

export function getAllProcesses(): ProcessMetadata[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const slugs = fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  return slugs
    .map((slug) => {
      const metaPath = path.join(CONTENT_DIR, slug, "metadata.json");
      if (!fs.existsSync(metaPath)) return null;
      const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
      return { ...meta, slug } as ProcessMetadata;
    })
    .filter(Boolean) as ProcessMetadata[];
}

export function getProcessBySlug(slug: string): ProcessDetail | null {
  const metaPath = path.join(CONTENT_DIR, slug, "metadata.json");
  const flowPath = path.join(CONTENT_DIR, slug, "flow-data.json");

  if (!fs.existsSync(metaPath) || !fs.existsSync(flowPath)) return null;

  const meta: ProcessMetadata = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
  const flowData: FlowData = JSON.parse(fs.readFileSync(flowPath, "utf-8"));

  return { ...meta, slug, flowData };
}

export function getStepContent(slug: string, stepId: string): string | null {
  const processDir = path.join(CONTENT_DIR, slug);
  if (!fs.existsSync(processDir)) return null;

  // Try different file name patterns
  const possibleFiles = [
    `${stepId}.md`,
    `${stepId.replace(/-/g, "_")}.md`,
  ];

  for (const file of possibleFiles) {
    const filePath = path.join(processDir, file);
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, "utf-8");
    }
  }

  return null;
}
