import { NextResponse } from "next/server";
import { fetchZohoAccessToken } from "@/lib/zoho";

export async function POST() {
  const token = await fetchZohoAccessToken();
  if (!token.success) {
    return NextResponse.json({ success: false, error: token.error }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    data: {
      connected: true,
      tokenPreview: `${token.accessToken.slice(0, 8)}...`,
    },
  });
}
