import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CreateWorkOrder = z.object({
  title: z.string().min(2),
  customerId: z.string().min(1),
  status: z.string().default("Scheduled").optional(),
  priority: z.string().default("Medium").optional(),
  notes: z.string().optional(),
  scheduledDate: z.string().datetime().optional(),
});

export async function GET() {
  const data = await prisma.workOrder.findMany({ include: { customer: true }, orderBy: { createdAt: "desc" }, take: 100 });
  return NextResponse.json({ success: true, data });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = CreateWorkOrder.safeParse(body);
  if (!parsed.success) return NextResponse.json({ success: false, errors: parsed.error.flatten() }, { status: 400 });

  const data = {
    ...parsed.data,
    scheduledDate: parsed.data.scheduledDate ? new Date(parsed.data.scheduledDate) : undefined,
  };

  const record = await prisma.workOrder.create({ data });
  return NextResponse.json({ success: true, data: record }, { status: 201 });
}
