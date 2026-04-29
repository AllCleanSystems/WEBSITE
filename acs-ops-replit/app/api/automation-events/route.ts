import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await prisma.automationEvent.findMany({ orderBy: { createdAt: "desc" }, take: 200 });
  return NextResponse.json({ success: true, data });
}
