import { NextResponse } from "next/server";
import { getPromoByCode, promoDiscount } from "@/lib/store";

const round2 = (n: number) => Math.round(n * 100) / 100;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const code = String(body.code || "").trim().toUpperCase();
    const subtotal = Number(body.subtotal) || 0;
    if (!code) return NextResponse.json({ error: "Enter a code first." }, { status: 400 });
    if (subtotal <= 0) return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });
    const promo = await getPromoByCode(code);
    if (!promo) return NextResponse.json({ error: "That code is not valid." }, { status: 400 });
    const discount = promoDiscount(promo, subtotal);
    if (discount <= 0) return NextResponse.json({ error: "That code gives no discount on this order." }, { status: 400 });
    return NextResponse.json({ code: promo.code, discount, total: round2(subtotal - discount) });
  } catch {
    return NextResponse.json({ error: "Could not check that code. Try again." }, { status: 500 });
  }
}
