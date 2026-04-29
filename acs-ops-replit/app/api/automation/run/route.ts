import { NextResponse } from "next/server";
import { runOpsAutopilot } from "@/lib/ai-ops";

export async function POST() {
  const result = await runOpsAutopilot();
  return NextResponse.json({ success: true, data: result });
}
