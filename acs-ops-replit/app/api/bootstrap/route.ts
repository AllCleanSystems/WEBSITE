import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  const existing = await prisma.customer.count();
  if (existing > 0) {
    return NextResponse.json({ success: true, message: "Data already exists, bootstrap skipped." });
  }

  const acme = await prisma.customer.create({
    data: {
      name: "Acme Property Group",
      email: "ops@acmeprop.com",
      phone: "701-555-0101",
      address: "101 Main St, Bismarck, ND",
    },
  });

  const north = await prisma.customer.create({
    data: {
      name: "Northside Offices",
      email: "facilities@northside.com",
      phone: "701-555-0188",
      address: "88 Industrial Ave, Bismarck, ND",
    },
  });

  const wo1 = await prisma.workOrder.create({ data: { title: "HVAC filter replacement", customerId: acme.id, priority: "High", status: "Unassigned" } });
  const wo2 = await prisma.workOrder.create({ data: { title: "Deep clean turnover unit", customerId: north.id, priority: "Medium", status: "Scheduled" } });
  const wo3 = await prisma.workOrder.create({ data: { title: "Monthly common-area polish", customerId: acme.id, priority: "Low", status: "Ready to Invoice" } });

  await prisma.serviceRequest.createMany({
    data: [
      { title: "No cooling on 3rd floor", customerId: acme.id, priority: "High", status: "Open", workOrderId: wo1.id },
      { title: "Post-event sanitation", customerId: north.id, priority: "Medium", status: "Open", workOrderId: wo2.id },
    ],
  });

  await prisma.quote.create({ data: { quoteNumber: "Q-301", customerId: acme.id, workOrderId: wo1.id, status: "Sent", amountCents: 145000 } });
  await prisma.invoice.create({ data: { invoiceNumber: "INV-9001", customerId: north.id, workOrderId: wo2.id, status: "Overdue", amountCents: 74000 } });

  await prisma.lead.createMany({
    data: [
      { name: "City Plaza", source: "Google Ads", status: "New", phone: "701-555-0123" },
      { name: "Ridge Apartments", source: "Referral", status: "Qualified", phone: "701-555-0144" },
    ],
  });

  const techA = await prisma.technician.create({
    data: { name: "Maria Lopez", phone: "701-555-1110", skillTags: "DeepClean,Floors,Turnovers" },
  });
  const techB = await prisma.technician.create({
    data: { name: "Derrick Shah", phone: "701-555-1111", skillTags: "HVAC,Repairs,Maintenance" },
  });

  await prisma.workOrderAssignment.createMany({
    data: [
      { workOrderId: wo1.id, technicianId: techB.id, note: "Urgent HVAC experience." },
      { workOrderId: wo2.id, technicianId: techA.id, note: "Turnover specialist." },
    ],
  });

  await prisma.recurringJob.create({
    data: {
      title: "Weekly Lobby Sanitation",
      customerId: north.id,
      frequency: "Weekly",
      intervalCount: 1,
      nextRunAt: new Date(),
      priority: "Medium",
      notes: "Generate every week.",
    },
  });

  await prisma.payment.create({
    data: {
      invoiceId: (await prisma.invoice.findFirstOrThrow({ where: { invoiceNumber: "INV-9001" } })).id,
      amountCents: 24000,
      method: "ACH",
      status: "Captured",
      externalRef: "ACH-SETTLE-9001",
    },
  });

  await prisma.automationEvent.create({
    data: {
      eventType: "bootstrap",
      entityType: "system",
      entityId: "init",
      message: "Sample data bootstrap completed.",
      success: true,
    },
  });

  return NextResponse.json({ success: true, message: "Bootstrap complete." });
}
