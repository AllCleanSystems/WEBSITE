import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CreateQuote = z.object({
  quoteNumber: z.string().optional(),
  status: z.string().default("Draft").optional(),
  amountCents: z.number().int().nonnegative().default(0).optional(),
  customerId: z.string(),
  workOrderId: z.string().optional(),
  notes: z.string().optional(),
});

export async function GET() {
  const data = await prisma.quote.findMany({ include: { customer: true, workOrder: true }, orderBy: { createdAt: "desc" }, take: 100 });
  return NextResponse.json({ success: true, data });
}

export async function POST(req: NextRequest) {
  const parsed = CreateQuote.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ success: false, errors: parsed.error.flatten() }, { status: 400 });

  const count = await prisma.quote.count();
  const quoteNumber = parsed.data.quoteNumber ?? `Q-${(count + 301).toString()}`;
  const data = await prisma.quote.create({ data: { ...parsed.data, quoteNumber } });
  return NextResponse.json({ success: true, data }, { status: 201 });
}
