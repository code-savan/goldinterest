import { NextResponse } from "next/server";
import { getOrder } from "@/lib/store";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) return NextResponse.json({ error: "Order not found." }, { status: 404 });
  return NextResponse.json({
    id: order.id,
    status: order.status,
    total: Number(order.total),
    currency: order.currency,
    email: order.email,
  });
}
