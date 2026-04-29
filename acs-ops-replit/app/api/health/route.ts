import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ ok: true, service: "acs-ops-replit", ts: new Date().toISOString() });
}
