import { NextRequest, NextResponse } from "next/server";
import { listOpenPhoneMessages } from "@/lib/openphone";
import { logAutomation } from "@/lib/workflows";

export async function GET(req: NextRequest) {
  const limit = Number(req.nextUrl.searchParams.get("limit") || 25);
  const result = await listOpenPhoneMessages(Number.isFinite(limit) ? limit : 25);
  if (!result.success) {
    return NextResponse.json({ success: false, error: result.error }, { status: 400 });
  }

  await logAutomation("openphone_pull_messages", "integration", "openphone", "Fetched message list from OpenPhone.");
  return NextResponse.json({ success: true, data: result.data });
}
