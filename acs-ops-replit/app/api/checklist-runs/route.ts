import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CreateRun = z.object({
  workOrderId: z.string(),
  status: z.string().default("Not Started").optional(),
  completionPct: z.number().int().min(0).max(100).default(0).optional(),
  notes: z.string().optional(),
});

export async function GET() {
  const data = await prisma.checklistRun.findMany({ include: { workOrder: true }, orderBy: { createdAt: "desc" }, take: 100 });
  return NextResponse.json({ success: true, data });
}

export async function POST(req: NextRequest) {
  const parsed = CreateRun.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ success: false, errors: parsed.error.flatten() }, { status: 400 });
  const data = await prisma.checklistRun.create({ data: parsed.data });
  return NextResponse.json({ success: true, data }, { status: 201 });
}
