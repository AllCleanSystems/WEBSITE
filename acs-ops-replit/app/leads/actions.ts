"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { logAutomation } from "@/lib/workflows";

export async function updateLeadStage(formData: FormData) {
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");
  if (!id || !status) return;

  await prisma.lead.update({ where: { id }, data: { status } });
  await logAutomation("lead_stage_update", "lead", id, `Lead status updated to ${status}.`);
  revalidatePath("/leads");
  revalidatePath("/automation-events");
}

export async function convertLeadToActive(formData: FormData) {
  const leadId = String(formData.get("leadId") || "");
  if (!leadId) return;

  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) return;

  const customer =
    lead.customerId
      ? await prisma.customer.findUnique({ where: { id: lead.customerId } })
      : await prisma.customer.create({
          data: {
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            notes: `Created from lead ${lead.id}.`,
          },
        });

  if (!customer) return;

  const workOrder = await prisma.workOrder.create({
    data: {
      title: `New job kickoff - ${lead.name}`,
      status: "Scheduled",
      priority: "Medium",
      customerId: customer.id,
      notes: "Auto-created from lead conversion.",
      scheduledDate: new Date(),
    },
  });

  const quoteCount = await prisma.quote.count();
  const quoteNumber = `Q-${(quoteCount + 301).toString()}`;

  await prisma.quote.create({
    data: {
      quoteNumber,
      customerId: customer.id,
      workOrderId: workOrder.id,
      status: "Draft",
      amountCents: 0,
      notes: "Auto-created from lead conversion.",
    },
  });

  await prisma.lead.update({
    where: { id: leadId },
    data: {
      status: "Won",
      customerId: customer.id,
    },
  });

  await logAutomation(
    "lead_conversion",
    "lead",
    leadId,
    `Lead converted to customer ${customer.name}, work order ${workOrder.title}, and quote ${quoteNumber}.`
  );

  revalidatePath("/leads");
  revalidatePath("/customers");
  revalidatePath("/work-orders");
  revalidatePath("/quotes-invoices");
  revalidatePath("/automation-events");
}
