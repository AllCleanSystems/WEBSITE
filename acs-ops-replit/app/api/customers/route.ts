import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CreateCustomer = z.object({
  name: z.string().min(2),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  notes: z.string().optional(),
});

export async function GET() {
  const data = await prisma.customer.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  return NextResponse.json({ success: true, data });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = CreateCustomer.safeParse(body);
  if (!parsed.success) return NextResponse.json({ success: false, errors: parsed.error.flatten() }, { status: 400 });
  const record = await prisma.customer.create({ data: parsed.data });
  return NextResponse.json({ success: true, data: record }, { status: 201 });
}
