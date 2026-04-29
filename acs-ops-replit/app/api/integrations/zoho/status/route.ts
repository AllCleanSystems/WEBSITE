import { NextResponse } from "next/server";
import { getZohoConfigStatus } from "@/lib/zoho";

export async function GET() {
  const status = getZohoConfigStatus();
  return NextResponse.json({ success: true, data: status });
}
