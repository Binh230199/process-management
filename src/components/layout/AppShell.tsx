"use client";

import { useState, useEffect, useCallback } from "react";
import Sidebar from "@/components/layout/Sidebar";
import CommandPalette from "@/components/search/CommandPalette";
import type { ProcessMetadata } from "@/lib/data-loader";

interface AppShellProps {
  processes: ProcessMetadata[];
  children: React.ReactNode;
}

export default function AppShell({ processes, children }: AppShellProps) {
  const [cmdOpen, setCmdOpen] = useState(false);

  const openCmd = useCallback(() => setCmdOpen(true), []);
  const closeCmd = useCallback(() => setCmdOpen(false), []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950">
      <Sidebar processes={processes} onSearchOpen={openCmd} />

      <main className="flex-1 overflow-hidden relative">
        {children}
      </main>

      <CommandPalette
        processes={processes}
        open={cmdOpen}
        onClose={closeCmd}
      />
    </div>
  );
}
