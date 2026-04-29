import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CreateRequest = z.object({
  title: z.string().min(2),
  status: z.string().default("Open").optional(),
  priority: z.string().default("Medium").optional(),
  description: z.string().optional(),
  customerId: z.string(),
  workOrderId: z.string().optional(),
});

export async function GET() {
  const data = await prisma.serviceRequest.findMany({ include: { customer: true, workOrder: true }, orderBy: { createdAt: "desc" }, take: 100 });
  return NextResponse.json({ success: true, data });
}

export async function POST(req: NextRequest) {
  const parsed = CreateRequest.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ success: false, errors: parsed.error.flatten() }, { status: 400 });
  const data = await prisma.serviceRequest.create({ data: parsed.data });
  return NextResponse.json({ success: true, data }, { status: 201 });
}
