import { NextResponse } from "next/server";
import { getPromoByCode, promoDiscount } from "@/lib/store";
import { limit } from "@/lib/rate-limit";

const round2 = (n: number) => Math.round(n * 100) / 100;

export async function POST(req: Request) {
  // Code-guessing guard: 20 checks per 10 minutes per IP.
  const blocked = limit(req, "promo-validate", { limit: 20, windowMs: 10 * 60_000 });
  if (blocked) return blocked;
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
