import { NextResponse } from "next/server";
import { products, settings } from "@/db/schema";
import { requireDb } from "@/lib/store";
import { products as staticProducts } from "@/lib/products";

export async function POST() {
  try {
    const db = requireDb();
    const existing = await db.select({ id: products.id }).from(products);
    if (existing.length > 0) return NextResponse.json({ ok: true, imported: 0, note: "Catalog already has products." });
    await db.insert(
      products
    ).values(
      staticProducts.map((p) => ({
        id: p.id,
        slug: p.slug,
        name: p.name,
        category: p.category,
        price: p.price,
        oldPrice: p.oldPrice ?? null,
        rating: p.rating,
        reviews: p.reviews,
        colors: p.colors,
        sizes: p.sizes ?? null,
        description: p.description,
        details: p.details,
        images: p.images,
        badge: p.badge ?? null,
        active: true,
      }))
    );
    await db.insert(settings).values({ id: 1 }).onConflictDoNothing();
    return NextResponse.json({ ok: true, imported: staticProducts.length });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
