import { NextResponse } from "next/server";
import { getOpenPhoneConfigStatus } from "@/lib/openphone";

export async function GET() {
  return NextResponse.json({ success: true, data: getOpenPhoneConfigStatus() });
}
