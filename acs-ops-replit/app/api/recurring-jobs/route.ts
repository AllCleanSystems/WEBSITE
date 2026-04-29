import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CreateRecurring = z.object({
  title: z.string().min(2),
  customerId: z.string().min(1),
  frequency: z.string().default("Weekly").optional(),
  intervalCount: z.number().int().min(1).default(1).optional(),
  priority: z.string().default("Medium").optional(),
  nextRunAt: z.string().datetime().optional(),
  notes: z.string().optional(),
});

export async function GET() {
  const data = await prisma.recurringJob.findMany({ include: { customer: true }, orderBy: { nextRunAt: "asc" }, take: 200 });
  return NextResponse.json({ success: true, data });
}

export async function POST(req: NextRequest) {
  const parsed = CreateRecurring.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ success: false, errors: parsed.error.flatten() }, { status: 400 });
  const data = await prisma.recurringJob.create({
    data: {
      ...parsed.data,
      nextRunAt: parsed.data.nextRunAt ? new Date(parsed.data.nextRunAt) : new Date(),
    },
  });
  return NextResponse.json({ success: true, data }, { status: 201 });
}
