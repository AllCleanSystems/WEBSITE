import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CreateTechnician = z.object({
  name: z.string().min(2),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  status: z.string().default("Available").optional(),
  skillTags: z.string().optional(),
});

export async function GET() {
  const data = await prisma.technician.findMany({ include: { assignments: true }, orderBy: { name: "asc" } });
  return NextResponse.json({ success: true, data });
}

export async function POST(req: NextRequest) {
  const parsed = CreateTechnician.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ success: false, errors: parsed.error.flatten() }, { status: 400 });
  const data = await prisma.technician.create({ data: parsed.data });
  return NextResponse.json({ success: true, data }, { status: 201 });
}
