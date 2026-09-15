import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { unwrapWebhook } from "@whop/sdk/helpers";
import { eq, sql } from "drizzle-orm";
import { orders, promos } from "@/db/schema";
import { claimWebhookEvent, getOrder, requireDb } from "@/lib/store";

type WhopEvent = { id: string; type: string; data: Record<string, unknown> };

function readMeta(data: Record<string, unknown>): string | null {
  const direct = (data.metadata as Record<string, unknown> | undefined)?.order_id;
  if (typeof direct === "string") return direct;
  const nested = ((data.checkout_configuration as Record<string, unknown> | undefined)?.metadata as
    | Record<string, unknown>
    | undefined)?.order_id;
  if (typeof nested === "string") return nested;
  return null;
}

export async function POST(req: NextRequest) {
  let event: WhopEvent;
  try {
    const raw = await req.text();
    const headers: Record<string, string> = {};
    req.headers.forEach((v, k) => {
      headers[k] = v;
    });
    event = unwrapWebhook<WhopEvent>(raw, { headers, key: process.env.WHOP_WEBHOOK_SECRET });
  } catch (e) {
    console.error("[whop webhook] invalid signature", e);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  if (event.type !== "payment.succeeded") {
    return new NextResponse("OK", { status: 200 });
  }

  const first = await claimWebhookEvent(event.id);
  if (!first) return new NextResponse("OK", { status: 200 });

  try {
    const data = event.data ?? {};
    const orderId = readMeta(data);
    if (!orderId) {
      console.error("[whop webhook] payment.succeeded with no order_id", event.id);
      return new NextResponse("OK", { status: 200 });
    }

    const db = requireDb();
    const order = await getOrder(orderId);
    if (!order || order.status !== "pending") return new NextResponse("OK", { status: 200 });

    const paidRaw = (data.final_amount ?? data.amount) as unknown;
    const paidTotal = typeof paidRaw === "number" ? paidRaw : Number(paidRaw);
    if (Number.isFinite(paidTotal) && Math.abs(paidTotal - Number(order.total)) > 0.02) {
      console.error("[whop webhook] amount mismatch", { orderId, expected: order.total, got: paidTotal });
      return new NextResponse("OK", { status: 200 });
    }

    await db
      .update(orders)
      .set({
        status: "paid",
        whopPaymentId: typeof data.id === "string" ? data.id : null,
        updatedAt: new Date(),
      })
      .where(eq(orders.id, orderId));

    if (order.promoCode) {
      await db
        .update(promos)
        .set({ usedCount: sql`${promos.usedCount} + 1` })
        .where(eq(promos.code, order.promoCode));
    }
  } catch (e) {
    console.error("[whop webhook] fulfillment failed", e);
  }

  return new NextResponse("OK", { status: 200 });
}
