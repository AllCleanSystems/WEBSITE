import { prisma } from "@/lib/prisma";

function cents(amount: number | null | undefined) {
  if (!amount || Number.isNaN(amount)) return 0;
  return Math.round(amount * 100);
}

export async function logAutomation(eventType: string, entityType: string, entityId: string, message: string, metadata?: unknown) {
  await prisma.automationEvent.create({
    data: {
      eventType,
      entityType,
      entityId,
      message,
      success: true,
      metadata: metadata ? JSON.stringify(metadata) : null,
    },
  });
}

export async function createInvoiceDraftForWorkOrder(workOrderId: string) {
  const order = await prisma.workOrder.findUnique({
    where: { id: workOrderId },
    include: { customer: true },
  });
  if (!order) return null;

  const existing = await prisma.invoice.findFirst({
    where: { workOrderId, status: "Draft" },
    orderBy: { createdAt: "desc" },
  });
  if (existing) return existing;

  const count = await prisma.invoice.count();
  const invoiceNumber = `INV-${(count + 9001).toString()}`;

  const invoice = await prisma.invoice.create({
    data: {
      invoiceNumber,
      status: "Draft",
      amountCents: cents(0),
      customerId: order.customerId,
      workOrderId: order.id,
      notes: "Auto-generated draft from work order completion flow.",
    },
  });

  await logAutomation(
    "create_invoice_draft",
    "work_order",
    workOrderId,
    `Invoice draft ${invoice.invoiceNumber} created automatically.`
  );

  return invoice;
}
