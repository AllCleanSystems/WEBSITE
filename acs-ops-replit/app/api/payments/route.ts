import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CreatePayment = z.object({
  invoiceId: z.string().min(1),
  amountCents: z.number().int().min(1),
  method: z.string().default("Card").optional(),
  status: z.string().default("Captured").optional(),
  externalRef: z.string().optional(),
  notes: z.string().optional(),
});

export async function GET() {
  const data = await prisma.payment.findMany({ include: { invoice: true }, orderBy: { createdAt: "desc" }, take: 200 });
  return NextResponse.json({ success: true, data });
}

export async function POST(req: NextRequest) {
  const parsed = CreatePayment.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ success: false, errors: parsed.error.flatten() }, { status: 400 });
  const data = await prisma.payment.create({ data: parsed.data });
  const invoice = await prisma.invoice.findUnique({ where: { id: parsed.data.invoiceId } });
  if (invoice) {
    const totals = await prisma.payment.aggregate({
      where: { invoiceId: parsed.data.invoiceId },
      _sum: { amountCents: true },
    });
    const paid = totals._sum.amountCents ?? 0;
    await prisma.invoice.update({
      where: { id: parsed.data.invoiceId },
      data: { status: paid >= invoice.amountCents ? "Paid" : "Sent" },
    });
  }
  return NextResponse.json({ success: true, data }, { status: 201 });
}
