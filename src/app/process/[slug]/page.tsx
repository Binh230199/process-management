import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getProcessBySlug, getAllProcesses } from "@/lib/data-loader";
import FlowCanvas from "@/components/diagram/FlowCanvas";
import DetailPanel from "@/components/diagram/DetailPanel";
import ProcessHeader from "@/components/diagram/ProcessHeader";

interface ProcessPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ step?: string }>;
}

export async function generateStaticParams() {
  const processes = getAllProcesses();
  return processes.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProcessPageProps) {
  const { slug } = await params;
  const process = getProcessBySlug(slug);
  if (!process) return { title: "Not Found" };
  return {
    title: `${process.title} — Process KB`,
    description: process.description,
  };
}

export default async function ProcessPage({ params }: ProcessPageProps) {
  const { slug } = await params;
  const process = getProcessBySlug(slug);

  if (!process) {
    notFound();
  }

  return (
    <div className="flex flex-col h-full">
      {/* Process header bar */}
      <ProcessHeader process={process} />

      {/* Flow canvas takes remaining height */}
      <div className="flex-1 relative overflow-hidden">
        <Suspense fallback={<div className="flex items-center justify-center h-full text-slate-500 text-sm">Loading diagram...</div>}>
          <FlowCanvas flowData={process.flowData} slug={slug} />
          <DetailPanel slug={slug} nodes={process.flowData.nodes} />
        </Suspense>
      </div>
    </div>
  );
}
