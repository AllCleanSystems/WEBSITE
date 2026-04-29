"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { createInvoiceDraftForWorkOrder, logAutomation } from "@/lib/workflows";

async function revalidateAll(id: string) {
  revalidatePath(`/work-orders/${id}`);
  revalidatePath("/work-orders");
  revalidatePath("/dispatch");
  revalidatePath("/quotes-invoices");
  revalidatePath("/automation-events");
}

async function updateStatus(id: string, status: string) {
  await prisma.workOrder.update({ where: { id }, data: { status } });
  await logAutomation("status_change", "work_order", id, `Status changed to ${status}`);
  await revalidateAll(id);
}

export async function markOnMyWay(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await updateStatus(id, "En Route");
}

export async function markArrived(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await updateStatus(id, "On Site");
}

export async function saveDraft(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const notes = String(formData.get("notes") ?? "");
  if (!id) return;
  await prisma.workOrder.update({
    where: { id },
    data: {
      notes,
      status: "In Progress",
    },
  });
  await logAutomation("save_draft", "work_order", id, "Draft notes saved and status moved to In Progress.");
  await revalidateAll(id);
}

export async function createInvoiceDraft(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const invoice = await createInvoiceDraftForWorkOrder(id);
  if (!invoice) return;

  await prisma.workOrder.update({
    where: { id },
    data: { status: "Ready to Invoice" },
  });
  await logAutomation("invoice_draft", "invoice", invoice.id, `Draft invoice ${invoice.invoiceNumber} linked to work order.`);
  await revalidateAll(id);
}

export async function markComplete(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const order = await prisma.workOrder.findUnique({ where: { id } });
  if (!order) return;

  const stamp = `[AUTO] Work order completed at ${new Date().toISOString()}`;
  const mergedNotes = order.notes ? `${order.notes}\n${stamp}` : stamp;

  await prisma.workOrder.update({
    where: { id },
    data: {
      status: "Completed",
      notes: mergedNotes,
    },
  });
  await createInvoiceDraftForWorkOrder(id);
  await logAutomation("complete_work_order", "work_order", id, "Work order marked complete and invoice draft ensured.");
  await revalidateAll(id);
}
