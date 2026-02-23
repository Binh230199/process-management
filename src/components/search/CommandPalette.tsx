"use client";

import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";
import { Search, GitBranch, Tag, ArrowRight } from "lucide-react";
import type { ProcessMetadata } from "@/lib/data-loader";

interface CommandPaletteProps {
  processes: ProcessMetadata[];
  open: boolean;
  onClose: () => void;
}

export default function CommandPalette({
  processes,
  open,
  onClose,
}: CommandPaletteProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSelect = useCallback(
    (slug: string) => {
      router.push(`/process/${slug}`);
      onClose();
      setSearch("");
    },
    [router, onClose]
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [onClose]);

  // Group processes by category
  const categories = Array.from(new Set(processes.map((p) => p.category)));

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cmd-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            key="cmd-dialog"
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-[20vh] left-1/2 -translate-x-1/2 w-full max-w-lg z-50 px-4"
          >
            <Command
              shouldFilter={true}
              className="rounded-2xl border border-slate-700/60 bg-slate-950/95 shadow-2xl shadow-black/60 overflow-hidden"
              style={{ backdropFilter: "blur(20px)" }}
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800">
                <Search size={16} className="text-slate-500 flex-shrink-0" />
                <Command.Input
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Search processes..."
                  className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none"
                  autoFocus
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="text-[10px] text-slate-500 hover:text-slate-300 px-1.5 py-0.5 rounded border border-slate-700 hover:border-slate-600 transition-all"
                  >
                    Clear
                  </button>
                )}
              </div>

              <Command.List className="p-2 max-h-80 overflow-y-auto">
                <Command.Empty className="py-8 text-center text-sm text-slate-500">
                  No processes found for &ldquo;{search}&rdquo;
                </Command.Empty>

                {categories.map((category) => {
                  const categoryProcesses = processes.filter(
                    (p) => p.category === category
                  );
                  return (
                    <Command.Group
                      key={category}
                      heading={category}
                      className="[&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-slate-600 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5"
                    >
                      {categoryProcesses.map((process) => (
                        <Command.Item
                          key={process.slug}
                          value={`${process.title} ${process.tags.join(" ")} ${process.description}`}
                          onSelect={() => handleSelect(process.slug)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-sm data-[selected=true]:bg-indigo-600/20 data-[selected=true]:text-indigo-200 text-slate-300 hover:bg-slate-800/60 transition-all outline-none group"
                        >
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800/60 border border-slate-700/50 flex-shrink-0">
                            <GitBranch size={14} className="text-slate-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-slate-100 truncate">
                              {process.title}
                            </div>
                            {process.description && (
                              <div className="text-xs text-slate-500 truncate mt-0.5">
                                {process.description}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            {process.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-500 border border-slate-700/50"
                              >
                                <Tag size={9} />
                                {tag}
                              </span>
                            ))}
                            <ArrowRight
                              size={14}
                              className="text-slate-700 group-data-[selected=true]:text-indigo-400 transition-colors ml-1"
                            />
                          </div>
                        </Command.Item>
                      ))}
                    </Command.Group>
                  );
                })}
              </Command.List>

              {/* Footer */}
              <div className="flex items-center gap-4 px-4 py-2.5 border-t border-slate-800 bg-slate-900/40">
                <span className="text-[10px] text-slate-600 flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono">↑↓</kbd>
                  Navigate
                </span>
                <span className="text-[10px] text-slate-600 flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono">↵</kbd>
                  Open
                </span>
                <span className="text-[10px] text-slate-600 flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono">Esc</kbd>
                  Close
                </span>
              </div>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
