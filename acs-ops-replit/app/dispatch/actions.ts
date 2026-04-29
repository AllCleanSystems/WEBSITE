"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { logAutomation } from "@/lib/workflows";

export async function moveWorkOrder(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !status) return;

  await prisma.workOrder.update({ where: { id }, data: { status } });
  await logAutomation("dispatch_move", "work_order", id, `Moved work order to ${status} from dispatch board.`);
  revalidatePath("/dispatch");
  revalidatePath("/work-orders");
}
