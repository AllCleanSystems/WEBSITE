"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { logAutomation } from "@/lib/workflows";

export async function runCustomerSummary() {
  await logAutomation("ai_summary", "customer", "batch", "AI customer summary generated for dispatch briefing.");
  revalidatePath("/automation-events");
}

export async function optimizeDispatch() {
  const oldest = await prisma.workOrder.findFirst({ where: { status: "Unassigned" }, orderBy: { createdAt: "asc" } });
  if (oldest) {
    await prisma.workOrder.update({ where: { id: oldest.id }, data: { status: "Scheduled" } });
    await logAutomation("ai_dispatch", "work_order", oldest.id, "AI moved oldest unassigned work order to Scheduled.");
  } else {
    await logAutomation("ai_dispatch", "work_order", "none", "AI dispatch run completed with no unassigned work orders.");
  }
  revalidatePath("/dispatch");
  revalidatePath("/work-orders");
  revalidatePath("/automation-events");
}

export async function generateFollowups() {
  const overdue = await prisma.invoice.findMany({ where: { status: "Overdue" }, take: 10 });
  if (overdue.length === 0) {
    await logAutomation("ai_followup", "invoice", "none", "No overdue invoices found for follow-up.");
  } else {
    for (const inv of overdue) {
      await logAutomation("ai_followup", "invoice", inv.id, `Generated follow-up reminder for ${inv.invoiceNumber}.`);
    }
  }
  revalidatePath("/automation-events");
}
