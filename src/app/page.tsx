import Link from "next/link";
import { getAllProcesses } from "@/lib/data-loader";
import { GitBranch, Users, Tag, ArrowRight, LayoutDashboard } from "lucide-react";

export default async function DashboardPage() {
  const processes = getAllProcesses();
  const categories = Array.from(new Set(processes.map((p) => p.category)));

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto px-8 py-10">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
            <LayoutDashboard size={14} />
            <span>Dashboard</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">
            Process Knowledge Base
          </h1>
          <p className="text-slate-400 max-w-xl">
            Interactive diagrams and step-by-step guides for your engineering
            workflows. Click a process to explore its diagram.
          </p>

          {/* Stats */}
          <div className="flex items-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-2xl font-bold text-indigo-400">{processes.length}</span>
              <span className="text-slate-500">Processes</span>
            </div>
            <div className="w-px h-6 bg-slate-800" />
            <div className="flex items-center gap-2 text-sm">
              <span className="text-2xl font-bold text-emerald-400">{categories.length}</span>
              <span className="text-slate-500">Categories</span>
            </div>
            <div className="w-px h-6 bg-slate-800" />
            <div className="flex items-center gap-2 text-sm">
              <span className="text-2xl font-bold text-orange-400">
                {Array.from(new Set(processes.flatMap((p) => p.tags))).length}
              </span>
              <span className="text-slate-500">Tags</span>
            </div>
          </div>
        </div>

        {/* Processes by category */}
        {categories.map((category) => (
          <div key={category} className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <GitBranch size={14} className="text-slate-600" />
              <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                {category}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {processes
                .filter((p) => p.category === category)
                .map((process) => (
                  <Link
                    key={process.slug}
                    href={`/process/${process.slug}`}
                    className="group relative flex flex-col p-5 rounded-xl border border-slate-800/60 bg-slate-900/40 hover:bg-slate-800/40 hover:border-slate-700 transition-all duration-200 cursor-pointer"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500/0 to-indigo-500/0 group-hover:from-indigo-500/5 group-hover:to-transparent transition-all duration-300" />

                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-600/10 border border-indigo-500/20">
                        <GitBranch size={18} className="text-indigo-400" />
                      </div>
                      <ArrowRight
                        size={16}
                        className="text-slate-700 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all duration-200"
                      />
                    </div>

                    <h3 className="text-sm font-semibold text-slate-100 mb-1.5 group-hover:text-white transition-colors">
                      {process.title}
                    </h3>

                    {process.description && (
                      <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">
                        {process.description}
                      </p>
                    )}

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
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
                      {process.participants && (
                        <div className="flex items-center gap-1 text-[10px] text-slate-600">
                          <Users size={11} />
                          <span>{process.participants.length} roles</span>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        ))}

        {processes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-800/60 border border-slate-700 flex items-center justify-center mb-4">
              <GitBranch size={28} className="text-slate-600" />
            </div>
            <h2 className="text-lg font-semibold text-slate-400 mb-2">No processes found</h2>
            <p className="text-sm text-slate-600 max-w-xs">
              Add process folders to{" "}
              <code className="text-indigo-400">/content/processes/</code> to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
