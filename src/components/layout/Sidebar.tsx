"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  GitBranch,
  Search,
  Layers,
  Tag,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProcessMetadata } from "@/lib/data-loader";

const categoryIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "Code Quality": GitBranch,
  "Git Workflow": GitBranch,
  default: Layers,
};

interface SidebarProps {
  processes: ProcessMetadata[];
  onSearchOpen: () => void;
}

export default function Sidebar({ processes, onSearchOpen }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const categories = Array.from(new Set(processes.map((p) => p.category)));

  return (
    <aside
      className={cn(
        "relative flex flex-col h-full bg-slate-950/90 border-r border-slate-800 transition-all duration-300 flex-shrink-0",
        collapsed ? "w-14" : "w-64"
      )}
    >
      {/* Logo */}
      <div className={cn("flex items-center gap-3 px-4 py-4 border-b border-slate-800", collapsed && "justify-center px-0")}>
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex-shrink-0">
          <GitBranch size={16} className="text-indigo-400" />
        </div>
        {!collapsed && (
          <div>
            <span className="text-sm font-semibold text-slate-100">Process KB</span>
            <p className="text-[10px] text-slate-500">Knowledge Base</p>
          </div>
        )}
      </div>

      {/* Search Button */}
      <div className={cn("px-3 py-3 border-b border-slate-800", collapsed && "px-1.5")}>
        <button
          onClick={onSearchOpen}
          className={cn(
            "w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700 hover:bg-slate-800/60 transition-all text-xs",
            collapsed && "justify-center px-0 border-none bg-transparent hover:bg-slate-800/60"
          )}
        >
          <Search size={14} />
          {!collapsed && (
            <>
              <span className="flex-1 text-left">Search...</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] border border-slate-700">⌘K</kbd>
            </>
          )}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2">
        {/* Home */}
        <div className="px-3 mb-1">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-150",
              pathname === "/"
                ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/20"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60",
              collapsed && "justify-center px-0"
            )}
          >
            <Home size={15} className="flex-shrink-0" />
            {!collapsed && <span>Dashboard</span>}
          </Link>
        </div>

        {/* Categories */}
        {categories.map((category) => {
          const CategoryIcon = categoryIcons[category] ?? categoryIcons.default;
          const categoryProcesses = processes.filter((p) => p.category === category);

          return (
            <div key={category} className="mt-4">
              {!collapsed && (
                <div className="flex items-center gap-1.5 px-6 mb-1">
                  <CategoryIcon size={11} className="text-slate-600" />
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">
                    {category}
                  </span>
                </div>
              )}

              <div className="px-3 space-y-0.5">
                {categoryProcesses.map((process) => {
                  const isActive = pathname === `/process/${process.slug}`;
                  return (
                    <Link
                      key={process.slug}
                      href={`/process/${process.slug}`}
                      title={collapsed ? process.title : undefined}
                      className={cn(
                        "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 group",
                        isActive
                          ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/20"
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60",
                        collapsed && "justify-center px-0"
                      )}
                    >
                      <div
                        className={cn(
                          "w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all",
                          isActive ? "bg-indigo-400" : "bg-slate-600 group-hover:bg-slate-400"
                        )}
                      />
                      {!collapsed && (
                        <span className="truncate">{process.title}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Tags at bottom (expanded only) */}
      {!collapsed && (
        <div className="px-4 py-3 border-t border-slate-800">
          <div className="flex items-center gap-1.5 mb-2">
            <Tag size={11} className="text-slate-600" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">
              All Tags
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {Array.from(new Set(processes.flatMap((p) => p.tags)))
              .slice(0, 10)
              .map((tag) => (
                <span
                  key={tag}
                  className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800/60 text-slate-500 border border-slate-700/50"
                >
                  {tag}
                </span>
              ))}
          </div>
        </div>
      )}

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed((v) => !v)}
        className="absolute -right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600 transition-all z-10"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}
