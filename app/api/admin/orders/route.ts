import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { orders } from "@/db/schema";
import { listOrders, requireDb } from "@/lib/store";

const STATUSES = ["pending", "paid", "preparing", "shipped", "delivered", "failed", "refunded", "cancelled"];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const all = await listOrders(200);
    const list = status ? all.filter((o) => o.status === status) : all;
    return NextResponse.json({ orders: list });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 503 });
  }
}

export async function PATCH(req: Request) {
  try {
    const db = requireDb();
    const b = await req.json();
    if (!b.id || !STATUSES.includes(b.status)) return NextResponse.json({ error: "Invalid id or status." }, { status: 400 });
    await db.update(orders).set({ status: b.status, updatedAt: new Date() }).where(eq(orders.id, b.id));
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
