import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import { orders } from "@/db/schema";
import { getProducts, getPromoByCode, promoDiscount, requireDb } from "@/lib/store";
import { getWhopClient, whopConfigured } from "@/lib/whop";

type CartLine = { id: string; size?: string; color?: string; quantity: number };

const round2 = (n: number) => Math.round(n * 100) / 100;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const lines = (body.items || []) as CartLine[];
    const form = body.form || {};
    const promoCode = String(body.promoCode || "").trim().toUpperCase();

    if (!form.email || !form.name || !form.address || !form.city || !form.zip) {
      return NextResponse.json({ error: "Please fill in email, name and full shipping address." }, { status: 400 });
    }
    if (!Array.isArray(lines) || lines.length === 0) {
      return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });
    }

    const catalog = await getProducts(true);
    const byId = new Map(catalog.map((p) => [p.id, p]));

    const items = [];
    for (const l of lines) {
      const p = byId.get(l.id);
      if (!p) return NextResponse.json({ error: "One of the items is no longer available." }, { status: 400 });
      const qty = Math.min(Math.max(1, Number(l.quantity) || 1), 99);
      items.push({
        productId: p.id,
        name: p.name,
        image: p.images[0] || "",
        price: p.price,
        quantity: qty,
        size: l.size,
        color: l.color,
      });
    }

    const subtotal = round2(items.reduce((a, i) => a + i.price * i.quantity, 0));
    let discount = 0;
    let promoId: string | null = null;
    if (promoCode) {
      const promo = await getPromoByCode(promoCode);
      if (!promo) return NextResponse.json({ error: "That discount code is not valid." }, { status: 400 });
      discount = promoDiscount(promo, subtotal);
      promoId = promo.id;
    }
    const total = round2(subtotal - discount);
    if (total < 1) return NextResponse.json({ error: "Order total is too low to check out." }, { status: 400 });

    const db = requireDb();
    const orderId = randomUUID();
    await db.insert(orders).values({
      id: orderId,
      email: String(form.email),
      name: String(form.name),
      address: String(form.address),
      city: String(form.city),
      zip: String(form.zip),
      country: String(form.country || "United States"),
      items,
      subtotal,
      discount,
      total,
      currency: "USD",
      status: "pending",
      promoCode: promoCode || null,
    });
    void promoId;

    if (!whopConfigured()) {
      return NextResponse.json(
        { error: "Payments are not connected yet. Your order was saved and the owner will confirm it by email.", orderId },
        { status: 503 }
      );
    }

    const origin = process.env.SITE_URL || new URL(req.url).origin;
    const whop = getWhopClient();
    const checkout = await whop.checkoutConfigurations.create({
      account_id: process.env.WHOP_ACCOUNT_ID || undefined,
      currency: "usd",
      plan: {
        initial_price: total,
        plan_type: "one_time",
        currency: "usd",
        title: `Gold Interest order ${orderId.slice(0, 8)}`,
        force_create_new_plan: true,
        visibility: "hidden",
      },
      metadata: { order_id: orderId },
      redirect_url: `${origin}/checkout/success?order=${orderId}`,
    });

    if (!checkout.purchase_url) {
      return NextResponse.json({ error: "Could not start the payment. Please try again.", orderId }, { status: 502 });
    }

    await db
      .update(orders)
      .set({ whopPlanId: checkout.plan?.id ?? null, whopCheckoutId: checkout.id ?? null, updatedAt: new Date() })
      .where(eq(orders.id, orderId));

    return NextResponse.json({ orderId, purchaseUrl: checkout.purchase_url });
  } catch (e) {
    console.error("[checkout]", e);
    return NextResponse.json({ error: "Something went wrong starting checkout. Please try again." }, { status: 500 });
  }
}
