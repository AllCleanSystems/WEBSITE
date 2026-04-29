import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CreateLead = z.object({
  name: z.string().min(2),
  source: z.string().default("Web").optional(),
  status: z.string().default("New").optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  notes: z.string().optional(),
  customerId: z.string().optional(),
});

export async function GET() {
  const data = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  return NextResponse.json({ success: true, data });
}

export async function POST(req: NextRequest) {
  const parsed = CreateLead.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ success: false, errors: parsed.error.flatten() }, { status: 400 });
  const data = await prisma.lead.create({ data: parsed.data });
  return NextResponse.json({ success: true, data }, { status: 201 });
}
