import { prisma } from "@/lib/prisma";
import { logAutomation } from "@/lib/workflows";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const Body = z.object({ status: z.string().min(2) });

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const parsed = Body.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ success: false, errors: parsed.error.flatten() }, { status: 400 });

  const data = await prisma.workOrder.update({ where: { id: params.id }, data: { status: parsed.data.status } });
  await logAutomation("status_change", "work_order", params.id, `Status changed to ${parsed.data.status}`);
  return NextResponse.json({ success: true, data });
}
