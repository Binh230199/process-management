"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Shield, Cpu, GitBranch, Loader2, Copy, Check } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import type { FlowNode } from "@/lib/data-loader";

interface DetailPanelProps {
  slug: string;
  nodes: FlowNode[];
}

const roleIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  developer: User,
  reviewer: Shield,
  system: Cpu,
};

const roleColors: Record<string, string> = {
  developer: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  reviewer: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  system: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
};

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 p-1.5 rounded-md bg-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-600/60 transition-all"
      title="Copy code"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
    </button>
  );
}

export default function DetailPanel({ slug, nodes }: DetailPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stepId = searchParams.get("step");

  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedNode = nodes.find((n) => n.id === stepId);

  const fetchContent = useCallback(async (s: string, st: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/step-content?slug=${s}&step=${st}`);
      if (!res.ok) throw new Error("Content not found");
      const data = await res.json();
      setContent(data.content);
    } catch {
      setError("Could not load step content.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (stepId && slug) {
      fetchContent(slug, stepId);
    } else {
      setContent(null);
    }
  }, [stepId, slug, fetchContent]);

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("step");
    router.push(`/process/${slug}?${params.toString()}`, { scroll: false });
  };

  const role = selectedNode?.data?.role ?? "default";
  const RoleIcon = roleIcons[role] ?? GitBranch;
  const roleColor = roleColors[role] ?? "text-slate-400 bg-slate-500/10 border-slate-500/20";

  return (
    <AnimatePresence>
      {stepId && (
        <motion.div
          key="detail-panel"
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 h-full w-[420px] bg-slate-950/95 border-l border-slate-800 flex flex-col shadow-2xl shadow-black/50 z-40"
          style={{ backdropFilter: "blur(12px)" }}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-5 border-b border-slate-800">
            <div className="flex-1 min-w-0 pr-4">
              {selectedNode && (
                <>
                  <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border mb-2 ${roleColor}`}>
                    <RoleIcon size={11} />
                    <span className="capitalize">{role}</span>
                  </div>
                  <h2 className="text-base font-semibold text-slate-100 leading-tight">
                    {selectedNode.data.label}
                  </h2>
                  {selectedNode.data.description && (
                    <p className="text-xs text-slate-500 mt-1 leading-snug">
                      {selectedNode.data.description}
                    </p>
                  )}
                </>
              )}
            </div>
            <button
              onClick={handleClose}
              className="flex-shrink-0 p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-all"
            >
              <X size={16} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5">
            {loading && (
              <div className="flex items-center justify-center h-32">
                <Loader2 size={20} className="animate-spin text-slate-500" />
              </div>
            )}
            {error && (
              <p className="text-sm text-red-400 text-center mt-8">{error}</p>
            )}
            {content && !loading && (
              <div className="prose prose-sm prose-invert prose-slate max-w-none
                prose-headings:text-slate-100 prose-headings:font-semibold
                prose-h1:text-lg prose-h2:text-base prose-h3:text-sm
                prose-p:text-slate-300 prose-p:leading-relaxed
                prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-slate-100
                prose-code:text-indigo-300 prose-code:bg-slate-800/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:font-mono
                prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800 prose-pre:text-xs
                prose-table:text-sm
                prose-th:text-slate-300 prose-td:text-slate-400
                prose-blockquote:border-indigo-500/50 prose-blockquote:text-slate-400
                prose-ul:text-slate-300 prose-ol:text-slate-300
                prose-li:marker:text-slate-500
                prose-hr:border-slate-800
              ">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    pre({ children, ...props }) {
                      // Extract code text from the pre block
                      let codeText = "";
                      try {
                        const codeEl = children as React.ReactElement<{ children?: string }>;
                        codeText = codeEl?.props?.children ?? "";
                      } catch {
                        codeText = "";
                      }
                      return (
                        <div className="relative group">
                          <pre {...props}>{children}</pre>
                          <CopyButton code={typeof codeText === "string" ? codeText : ""} />
                        </div>
                      );
                    },
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
