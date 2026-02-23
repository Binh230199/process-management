import { Tag, Users } from "lucide-react";
import type { ProcessDetail } from "@/lib/data-loader";

const roleColors: Record<string, string> = {
  Developer: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  Reviewer: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  "CI System": "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  "Release Manager": "text-purple-400 bg-purple-500/10 border-purple-500/20",
  "DevOps Engineer": "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
};

export default function ProcessHeader({ process }: { process: ProcessDetail }) {
  return (
    <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-sm flex-shrink-0">
      <div className="flex items-center gap-4 min-w-0">
        <div>
          <h1 className="text-sm font-semibold text-slate-100 truncate">{process.title}</h1>
          {process.description && (
            <p className="text-xs text-slate-500 truncate max-w-sm">{process.description}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 flex-shrink-0 ml-4">
        {/* Tags */}
        <div className="hidden md:flex items-center gap-1">
          {process.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] bg-slate-800/60 text-slate-500 border border-slate-700/40"
            >
              <Tag size={9} />
              {tag}
            </span>
          ))}
        </div>

        <div className="w-px h-4 bg-slate-800 hidden md:block" />

        {/* Participants */}
        <div className="hidden md:flex items-center gap-1.5">
          <Users size={12} className="text-slate-600" />
          <div className="flex items-center gap-1">
            {process.participants?.map((p) => (
              <span
                key={p.role}
                className={`px-2 py-0.5 rounded-full text-[10px] border font-medium ${
                  roleColors[p.role] ?? "text-slate-400 bg-slate-500/10 border-slate-500/20"
                }`}
              >
                {p.role} ×{p.count}
              </span>
            ))}
          </div>
        </div>

        {/* Node count */}
        <div className="flex items-center gap-1 text-[10px] text-slate-600 bg-slate-800/60 border border-slate-700/40 px-2 py-1 rounded-lg">
          <span className="text-slate-400 font-mono font-semibold">{process.flowData.nodes.length}</span>
          <span>steps</span>
        </div>
      </div>
    </div>
  );
}
