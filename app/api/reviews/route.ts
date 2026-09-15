import { NextResponse } from "next/server";
import { and, desc, eq } from "drizzle-orm";
import { products, reviews } from "@/db/schema";
import { dbReady } from "@/db";
import { requireDb } from "@/lib/store";
import { limit } from "@/lib/rate-limit";

/** GET /api/reviews?productId= — active reviews, newest first, with summary. */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId") || "";
    if (!productId) return NextResponse.json({ error: "Missing productId." }, { status: 400 });
    if (!dbReady) return NextResponse.json({ reviews: [], count: 0, avg: null });
    const { db } = await import("@/db");
    const rows = await db!
      .select({
        id: reviews.id,
        name: reviews.name,
        rating: reviews.rating,
        body: reviews.body,
        anonymous: reviews.anonymous,
        createdAt: reviews.createdAt,
      })
      .from(reviews)
      .where(and(eq(reviews.productId, productId), eq(reviews.active, true)))
      .orderBy(desc(reviews.createdAt));
    const visible = rows.filter((r) => r.body.trim() !== "");
    const count = visible.length;
    const avg = count === 0 ? null : Math.round((visible.reduce((a, r) => a + r.rating, 0) / count) * 10) / 10;
    return NextResponse.json({ reviews: visible, count, avg });
  } catch (e) {
    console.error("[reviews] list failed", e);
    return NextResponse.json({ error: "Could not load reviews." }, { status: 500 });
  }
}

/** POST /api/reviews — anyone can leave a review. */
export async function POST(req: Request) {
  // Spam guard: 5 reviews per 10 minutes per IP, plus a honeypot below.
  const blocked = limit(req, "reviews-post", { limit: 5, windowMs: 10 * 60_000 });
  if (blocked) return blocked;
  try {
    const db = requireDb();
    const b = await req.json();
    // Honeypot: real users never see the "website" field. Bots that fill it
    // get a fake success so they move on instead of retrying.
    if (typeof b.website === "string" && b.website.trim() !== "") {
      return NextResponse.json({ ok: true, id: "withheld" });
    }
    const productId = String(b.productId || "");
    const rating = Math.min(5, Math.max(1, Number(b.rating) || 5));
    const body = String(b.body || "").trim().slice(0, 2000);
    const anonymous = b.anonymous === true;
    const emailRaw = String(b.email || "").trim().slice(0, 160);
    const email = emailRaw === "" ? null : emailRaw;
    if (!productId) return NextResponse.json({ error: "Missing product." }, { status: 400 });
    if (body.length < 2) return NextResponse.json({ error: "Please write a few words." }, { status: 400 });
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: "That email does not look right." }, { status: 400 });
    }
    const found = await db.select({ id: products.id }).from(products).where(eq(products.id, productId));
    if (found.length === 0) return NextResponse.json({ error: "Product not found." }, { status: 404 });
    const name = anonymous ? "Anonymous" : String(b.name || "").trim().slice(0, 80) || "Anonymous";
    const id = `r-${Date.now().toString(36)}${Math.floor(Math.random() * 1296).toString(36)}`;
    await db.insert(reviews).values({
      id,
      productId,
      name: anonymous ? "Anonymous" : name,
      email,
      rating,
      body,
      anonymous,
      active: true,
    });
    return NextResponse.json({ ok: true, id });
  } catch (e) {
    console.error("[reviews] post failed", e);
    return NextResponse.json({ error: "Could not post your review. Please try again." }, { status: 500 });
  }
}
