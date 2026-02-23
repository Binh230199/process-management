"use client";

import { memo } from "react";
import { Handle, Position, useHandleConnections, type NodeProps } from "@xyflow/react";
import { User, Shield, Cpu, GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";

type ProcessNodeData = {
  label: string;
  role?: string;
  description?: string;
  stepFile?: string;
  isSelected?: boolean;
};

const roleConfig: Record<
  string,
  { color: string; border: string; icon: React.ComponentType<{ size?: number; className?: string }> }
> = {
  developer: {
    color: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-500/50 group-hover:border-blue-400",
    icon: User,
  },
  reviewer: {
    color: "from-orange-500/20 to-orange-600/10",
    border: "border-orange-500/50 group-hover:border-orange-400",
    icon: Shield,
  },
  system: {
    color: "from-emerald-500/20 to-emerald-600/10",
    border: "border-emerald-500/50 group-hover:border-emerald-400",
    icon: Cpu,
  },
  default: {
    color: "from-slate-500/20 to-slate-600/10",
    border: "border-slate-500/50 group-hover:border-slate-400",
    icon: GitBranch,
  },
};

function ProcessNode({ data, selected }: NodeProps) {
  const nodeData = data as ProcessNodeData;
  const role = nodeData.role ?? "default";
  const config = roleConfig[role] ?? roleConfig.default;
  const Icon = config.icon;

  // Only show a handle if it has at least one connected edge
  const topConns         = useHandleConnections({ type: "target" });
  const bottomConns      = useHandleConnections({ type: "source" });
  const rightSrcConns    = useHandleConnections({ type: "source", id: "right-source" });
  const rightTgtConns    = useHandleConnections({ type: "target", id: "right-target" });
  const leftSrcConns     = useHandleConnections({ type: "source", id: "left-source" });
  const leftTgtConns     = useHandleConnections({ type: "target", id: "left-target" });

  const showTop      = topConns.length > 0;
  const showBottom   = bottomConns.length > 0;
  const showRightSrc = rightSrcConns.length > 0;
  const showRightTgt = rightTgtConns.length > 0;
  const showLeftSrc  = leftSrcConns.length > 0;
  const showLeftTgt  = leftTgtConns.length > 0;

  const handleBase = "!w-2 !h-2";
  const visibleHandle = `${handleBase} !bg-slate-500 !border-slate-400`;
  const hiddenHandle  = `${handleBase} !opacity-0 !pointer-events-none`;
  const visibleSide   = `${handleBase} !bg-red-500/60 !border-red-400/60`;

  return (
    <div
      className={cn(
        "group relative min-w-[160px] max-w-[200px] rounded-xl border bg-gradient-to-br px-4 py-3 transition-all duration-200 cursor-pointer select-none",
        config.color,
        config.border,
        selected
          ? "ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-950 shadow-lg shadow-indigo-500/20"
          : "hover:shadow-lg hover:shadow-black/40"
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        className={showTop ? visibleHandle : hiddenHandle}
      />

      <div className="flex items-center gap-2">
        <div
          className={cn(
            "flex items-center justify-center w-7 h-7 rounded-lg",
            role === "developer" && "bg-blue-500/20 text-blue-400",
            role === "reviewer" && "bg-orange-500/20 text-orange-400",
            role === "system" && "bg-emerald-500/20 text-emerald-400",
            role === "default" && "bg-slate-500/20 text-slate-400"
          )}
        >
          <Icon size={14} />
        </div>
        <span className="text-sm font-semibold text-slate-100 leading-tight">
          {nodeData.label}
        </span>
      </div>

      {nodeData.description && (
        <p className="mt-1.5 text-xs text-slate-400 leading-snug line-clamp-2">
          {nodeData.description}
        </p>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className={showBottom ? visibleHandle : hiddenHandle}
      />
      {/* Side handles — for loop-back or cross-branch edges */}
      <Handle
        id="right-source"
        type="source"
        position={Position.Right}
        className={showRightSrc ? visibleSide : hiddenHandle}
      />
      <Handle
        id="right-target"
        type="target"
        position={Position.Right}
        className={showRightTgt ? visibleSide : hiddenHandle}
      />
      <Handle
        id="left-source"
        type="source"
        position={Position.Left}
        className={showLeftSrc ? visibleSide : hiddenHandle}
      />
      <Handle
        id="left-target"
        type="target"
        position={Position.Left}
        className={showLeftTgt ? visibleSide : hiddenHandle}
      />
    </div>
  );
}

export default memo(ProcessNode);
