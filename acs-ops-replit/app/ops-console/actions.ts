"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { logAutomation } from "@/lib/workflows";

export async function createCustomer(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim() || null;
  const phone = String(formData.get("phone") || "").trim() || null;
  if (!name) return;

  const customer = await prisma.customer.create({ data: { name, email: email ?? undefined, phone: phone ?? undefined } });
  await logAutomation("customer_create", "customer", customer.id, `Customer ${customer.name} created from Ops Console.`);
  revalidatePath("/customers");
  revalidatePath("/");
  revalidatePath("/ops-console");
  revalidatePath("/automation-events");
}

export async function createWorkOrder(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const customerId = String(formData.get("customerId") || "");
  const priority = String(formData.get("priority") || "Medium");
  if (!title || !customerId) return;

  const wo = await prisma.workOrder.create({
    data: { title, customerId, priority, status: "Unassigned" },
  });
  await logAutomation("work_order_create", "work_order", wo.id, `Work order ${wo.title} created from Ops Console.`);
  revalidatePath("/work-orders");
  revalidatePath("/dispatch");
  revalidatePath("/ops-console");
  revalidatePath("/automation-events");
}

export async function createServiceRequest(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const customerId = String(formData.get("customerId") || "");
  const priority = String(formData.get("priority") || "Medium");
  if (!title || !customerId) return;

  const sr = await prisma.serviceRequest.create({
    data: { title, customerId, priority, status: "Open" },
  });
  await logAutomation("service_request_create", "service_request", sr.id, `Service request ${sr.title} created from Ops Console.`);
  revalidatePath("/service-requests");
  revalidatePath("/ops-console");
  revalidatePath("/automation-events");
}
