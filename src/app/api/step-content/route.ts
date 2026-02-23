import { NextRequest, NextResponse } from "next/server";
import { getStepContent } from "@/lib/data-loader";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const step = searchParams.get("step");

  if (!slug || !step) {
    return NextResponse.json({ error: "slug and step are required" }, { status: 400 });
  }

  const content = getStepContent(slug, step);

  if (!content) {
    return NextResponse.json({ error: "Step content not found" }, { status: 404 });
  }

  return NextResponse.json({ content });
}
