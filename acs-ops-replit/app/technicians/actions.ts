"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { logAutomation } from "@/lib/workflows";

export async function addTechnician(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim() || null;
  const email = String(formData.get("email") || "").trim() || null;
  const skillTags = String(formData.get("skillTags") || "").trim() || null;
  if (!name) return;

  const t = await prisma.technician.create({
    data: { name, phone: phone ?? undefined, email: email ?? undefined, skillTags: skillTags ?? undefined },
  });
  await logAutomation("technician_add", "technician", t.id, `Technician ${t.name} added.`);
  revalidatePath("/technicians");
  revalidatePath("/dispatch");
  revalidatePath("/automation-events");
}

export async function assignWorkOrder(formData: FormData) {
  const workOrderId = String(formData.get("workOrderId") || "");
  const technicianId = String(formData.get("technicianId") || "");
  if (!workOrderId || !technicianId) return;

  await prisma.workOrderAssignment.create({ data: { workOrderId, technicianId } });
  await prisma.workOrder.update({ where: { id: workOrderId }, data: { status: "Scheduled" } });
  await logAutomation("assignment_add", "work_order", workOrderId, "Technician assigned to work order.");
  revalidatePath("/technicians");
  revalidatePath("/dispatch");
  revalidatePath("/work-orders");
  revalidatePath("/automation-events");
}
