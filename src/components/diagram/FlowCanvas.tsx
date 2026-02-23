"use client";

import { useCallback, useMemo, useRef } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  addEdge,
  useNodesState,
  useEdgesState,
  type NodeMouseHandler,
  type Connection,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useRouter, useSearchParams } from "next/navigation";
import { RotateCcw, Map } from "lucide-react";
import { useState } from "react";
import ProcessNode from "./ProcessNode";
import type { FlowData } from "@/lib/data-loader";

const nodeTypes = {
  processNode: ProcessNode,
};

interface FlowCanvasProps {
  flowData: FlowData;
  slug: string;
}

export default function FlowCanvas({ flowData, slug }: FlowCanvasProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedStep = searchParams.get("step");
  const [showMiniMap, setShowMiniMap] = useState(false);
  const reactFlowRef = useRef<{ fitView: () => void } | null>(null);

  const initialNodes = useMemo(
    () =>
      flowData.nodes.map((n) => ({
        ...n,
        data: {
          ...n.data,
          isSelected: n.id === selectedStep,
        },
      })),
    [flowData.nodes, selectedStep]
  );

  const initialEdges = useMemo(
    () =>
      flowData.edges.map((e) => ({
        ...e,
        style: { stroke: "#475569", strokeWidth: 1.5 },
        labelStyle: { fill: "#94a3b8", fontSize: 11 },
        labelBgStyle: { fill: "#0f172a", fillOpacity: 0.9 },
      })),
    [flowData.edges]
  );

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick: NodeMouseHandler = useCallback(
    (_, node) => {
      const params = new URLSearchParams(searchParams.toString());
      if (params.get("step") === node.id) {
        params.delete("step");
      } else {
        params.set("step", node.id);
      }
      router.push(`/process/${slug}?${params.toString()}`, { scroll: false });
    },
    [router, searchParams, slug]
  );

  return (
    <div className="relative w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        minZoom={0.2}
        maxZoom={2}
        className="bg-slate-950"
        defaultEdgeOptions={{
          animated: false,
          style: { stroke: "#475569", strokeWidth: 1.5 },
        }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#1e293b"
        />
        <Controls className="!bottom-4 !left-4" />
        {showMiniMap && (
          <MiniMap
            nodeColor={(n) => {
              const role = (n.data as { role?: string }).role;
              if (role === "developer") return "#3b82f6";
              if (role === "reviewer") return "#f97316";
              if (role === "system") return "#10b981";
              return "#64748b";
            }}
            maskColor="rgba(2, 8, 23, 0.7)"
          />
        )}
      </ReactFlow>

      {/* Toolbar */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button
          onClick={() => setShowMiniMap((v) => !v)}
          title="Toggle MiniMap"
          className={[
            "flex items-center justify-center w-9 h-9 rounded-lg border transition-all duration-200",
            showMiniMap
              ? "bg-indigo-600/30 border-indigo-500/50 text-indigo-300"
              : "bg-slate-900/80 border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600",
          ].join(" ")}
        >
          <Map size={16} />
        </button>
      </div>

      {/* Reset view button */}
      <button
        onClick={() => {
          const resetBtn = document.querySelector(
            ".react-flow__controls-fitview"
          ) as HTMLButtonElement | null;
          resetBtn?.click();
        }}
        title="Reset View"
        className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600 text-xs font-medium transition-all duration-200"
      >
        <RotateCcw size={13} />
        Reset View
      </button>
    </div>
  );
}
