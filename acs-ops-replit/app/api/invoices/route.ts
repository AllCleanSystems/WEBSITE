import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CreateInvoice = z.object({
  invoiceNumber: z.string().optional(),
  status: z.string().default("Draft").optional(),
  amountCents: z.number().int().nonnegative().default(0).optional(),
  dueDate: z.string().datetime().optional(),
  customerId: z.string(),
  workOrderId: z.string().optional(),
  quoteId: z.string().optional(),
  notes: z.string().optional(),
});

export async function GET() {
  const data = await prisma.invoice.findMany({ include: { customer: true, workOrder: true, quote: true }, orderBy: { createdAt: "desc" }, take: 100 });
  return NextResponse.json({ success: true, data });
}

export async function POST(req: NextRequest) {
  const parsed = CreateInvoice.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ success: false, errors: parsed.error.flatten() }, { status: 400 });

  const count = await prisma.invoice.count();
  const invoiceNumber = parsed.data.invoiceNumber ?? `INV-${(count + 9001).toString()}`;

  const data = await prisma.invoice.create({
    data: {
      ...parsed.data,
      invoiceNumber,
      dueDate: parsed.data.dueDate ? new Date(parsed.data.dueDate) : undefined,
    },
  });
  return NextResponse.json({ success: true, data }, { status: 201 });
}
