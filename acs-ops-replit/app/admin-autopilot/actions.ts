"use server";

import { revalidatePath } from "next/cache";
import { runOpsAutopilot } from "@/lib/ai-ops";
import { prisma } from "@/lib/prisma";
import { logAutomation } from "@/lib/workflows";

export async function runDailyAutopilot() {
  const result = await runOpsAutopilot();
  await logAutomation(
    "autopilot_run",
    "system",
    "daily",
    `Autopilot run complete. Leads:${result.leadUpdates}, Scheduled:${result.scheduledOrders}, Assigned:${result.assignedOrders}, Recurring:${result.recurringGenerated}, DraftInvoices:${result.followupsGenerated}, SentInvoices:${result.invoicesMarkedSent}.`
  );

  revalidatePath("/");
  revalidatePath("/leads");
  revalidatePath("/dispatch");
  revalidatePath("/work-orders");
  revalidatePath("/quotes-invoices");
  revalidatePath("/automation-events");
  revalidatePath("/admin-autopilot");
}

export async function runCollectionsOnly() {
  const overdue = await prisma.invoice.findMany({
    where: { status: "Overdue" },
    include: { customer: true },
    take: 50,
  });

  for (const invoice of overdue) {
    await logAutomation(
      "collections_followup",
      "invoice",
      invoice.id,
      `Follow-up queued for ${invoice.invoiceNumber} (${invoice.customer.name}).`
    );
  }

  await logAutomation(
    "collections_run",
    "system",
    "manual",
    `Collections run finished. Follow-ups created: ${overdue.length}.`
  );
  revalidatePath("/automation-events");
  revalidatePath("/quotes-invoices");
  revalidatePath("/admin-autopilot");
}
