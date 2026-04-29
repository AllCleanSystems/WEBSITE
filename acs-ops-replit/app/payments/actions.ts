"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { logAutomation } from "@/lib/workflows";

export async function capturePayment(formData: FormData) {
  const invoiceId = String(formData.get("invoiceId") || "");
  const amount = Number(formData.get("amount") || 0);
  const method = String(formData.get("method") || "Card");
  const externalRef = String(formData.get("externalRef") || "").trim() || null;
  if (!invoiceId || !Number.isFinite(amount) || amount <= 0) return;

  const amountCents = Math.round(amount * 100);
  const invoice = await prisma.invoice.findUnique({ where: { id: invoiceId } });
  if (!invoice) return;

  await prisma.payment.create({
    data: {
      invoiceId,
      amountCents,
      method,
      status: "Captured",
      externalRef: externalRef ?? undefined,
    },
  });

  const totals = await prisma.payment.aggregate({
    where: { invoiceId },
    _sum: { amountCents: true },
  });
  const paidCents = totals._sum.amountCents ?? 0;
  const remaining = invoice.amountCents - paidCents;
  await prisma.invoice.update({
    where: { id: invoiceId },
    data: { status: remaining <= 0 ? "Paid" : "Sent" },
  });

  await logAutomation("payment_capture", "invoice", invoiceId, `Captured $${amount.toFixed(2)} via ${method}.`);
  revalidatePath("/payments");
  revalidatePath("/quotes-invoices");
  revalidatePath("/automation-events");
}
