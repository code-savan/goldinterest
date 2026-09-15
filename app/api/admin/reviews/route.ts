import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { products, reviews } from "@/db/schema";
import { requireDb } from "@/lib/store";

/** GET /api/admin/reviews — every review with its product, newest first. */
export async function GET() {
  try {
    const db = requireDb();
    const rows = await db
      .select({
        id: reviews.id,
        productId: reviews.productId,
        productName: products.name,
        name: reviews.name,
        email: reviews.email,
        rating: reviews.rating,
        body: reviews.body,
        anonymous: reviews.anonymous,
        active: reviews.active,
        createdAt: reviews.createdAt,
      })
      .from(reviews)
      .leftJoin(products, eq(reviews.productId, products.id))
      .orderBy(desc(reviews.createdAt));
    return NextResponse.json({ reviews: rows });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

/** PATCH /api/admin/reviews — toggle visibility. DELETE — remove permanently. */
export async function PATCH(req: Request) {
  try {
    const db = requireDb();
    const b = await req.json();
    if (!b.id) return NextResponse.json({ error: "Missing id." }, { status: 400 });
    await db.update(reviews).set({ active: b.active !== false }).where(eq(reviews.id, b.id));
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const db = requireDb();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id." }, { status: 400 });
    await db.delete(reviews).where(eq(reviews.id, id));
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
