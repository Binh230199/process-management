"use client";

import { EdgeLabelRenderer, type EdgeProps } from "@xyflow/react";

/**
 * LoopEdge: a generic loop-back edge that arcs to the LEFT or RIGHT side,
 * determined automatically by the sourceHandle id:
 *   - "right-source" / "right-target" → arc swings RIGHT
 *   - "left-source"  / "left-target"  → arc swings LEFT
 *
 * Draws 3 orthogonal segments with rounded corners:
 *
 *   RIGHT mode:            LEFT mode:
 *   [src] ───┐             ┌─── [src]
 *            │             │
 *   [tgt] ───┘             └─── [tgt]
 */
export default function LoopEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourceHandleId,
  label,
  markerEnd,
}: EdgeProps) {
  const offset = 80; // distance from the node edge to the spine
  const r = 12;      // corner radius

  // Determine side: default to right if not specified
  const isLeft =
    typeof sourceHandleId === "string" && sourceHandleId.startsWith("left");

  const spineX = isLeft
    ? Math.min(sourceX, targetX) - offset  // spine sits LEFT of both nodes
    : Math.max(sourceX, targetX) + offset; // spine sits RIGHT of both nodes

  // Path: exit handle → horizontal → spine corner → vertical → spine corner → horizontal → enter handle
  const path = isLeft
    ? [
        `M ${sourceX} ${sourceY}`,
        `L ${spineX + r} ${sourceY}`,
        `Q ${spineX} ${sourceY} ${spineX} ${sourceY - r}`,
        `L ${spineX} ${targetY + r}`,
        `Q ${spineX} ${targetY} ${spineX + r} ${targetY}`,
        `L ${targetX} ${targetY}`,
      ].join(" ")
    : [
        `M ${sourceX} ${sourceY}`,
        `L ${spineX - r} ${sourceY}`,
        `Q ${spineX} ${sourceY} ${spineX} ${sourceY - r}`,
        `L ${spineX} ${targetY + r}`,
        `Q ${spineX} ${targetY} ${spineX - r} ${targetY}`,
        `L ${targetX} ${targetY}`,
      ].join(" ");

  // Label floats beside the spine midpoint
  const labelX = isLeft ? spineX - 8 : spineX + 8;
  const labelY = (sourceY + targetY) / 2;

  return (
    <>
      {/* Invisible wide hit area */}
      <path
        id={`${id}-hit`}
        d={path}
        fill="none"
        stroke="transparent"
        strokeWidth={20}
      />

      {/* Visible dashed red path */}
      <path
        id={id}
        d={path}
        fill="none"
        stroke="#f87171"
        strokeWidth={2}
        strokeDasharray="8 4"
        markerEnd={markerEnd}
        style={{ filter: "drop-shadow(0 0 5px rgba(248,113,113,0.35))" }}
      />

      {/* Label beside the spine */}
      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: isLeft
                ? `translate(-100%, -50%) translate(${labelX}px, ${labelY}px)`
                : `translate(0%, -50%) translate(${labelX}px, ${labelY}px)`,
              pointerEvents: "none",
            }}
            className="px-2 py-0.5 rounded text-[11px] font-medium text-red-400 bg-slate-950/90 border border-red-500/30 whitespace-nowrap nodrag nopan"
          >
            {String(label)}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
