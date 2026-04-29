"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { logAutomation } from "@/lib/workflows";

function nextDateFromFrequency(base: Date, frequency: string, intervalCount: number) {
  const next = new Date(base);
  if (frequency === "Daily") next.setDate(next.getDate() + intervalCount);
  else if (frequency === "Weekly") next.setDate(next.getDate() + intervalCount * 7);
  else if (frequency === "Biweekly") next.setDate(next.getDate() + intervalCount * 14);
  else next.setMonth(next.getMonth() + intervalCount);
  return next;
}

export async function createRecurringJob(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const customerId = String(formData.get("customerId") || "");
  const frequency = String(formData.get("frequency") || "Weekly");
  const intervalCount = Number(formData.get("intervalCount") || 1);
  const priority = String(formData.get("priority") || "Medium");
  if (!title || !customerId) return;

  const recurring = await prisma.recurringJob.create({
    data: {
      title,
      customerId,
      frequency,
      intervalCount: Number.isFinite(intervalCount) ? intervalCount : 1,
      priority,
      nextRunAt: new Date(),
    },
  });
  await logAutomation("recurring_job_create", "recurring_job", recurring.id, `Recurring job ${title} created.`);
  revalidatePath("/recurring-jobs");
  revalidatePath("/automation-events");
}

export async function runRecurringGenerator() {
  const now = new Date();
  const due = await prisma.recurringJob.findMany({
    where: { active: true, nextRunAt: { lte: now } },
    include: { customer: true },
    take: 50,
  });

  for (const item of due) {
    await prisma.workOrder.create({
      data: {
        title: `${item.title} (${item.frequency})`,
        customerId: item.customerId,
        status: "Unassigned",
        priority: item.priority,
        notes: `Generated from recurring job ${item.id}.`,
      },
    });
    await prisma.recurringJob.update({
      where: { id: item.id },
      data: { nextRunAt: nextDateFromFrequency(now, item.frequency, item.intervalCount) },
    });
    await logAutomation("recurring_job_run", "recurring_job", item.id, `Generated work order for ${item.customer.name}.`);
  }

  revalidatePath("/recurring-jobs");
  revalidatePath("/work-orders");
  revalidatePath("/dispatch");
  revalidatePath("/automation-events");
}
