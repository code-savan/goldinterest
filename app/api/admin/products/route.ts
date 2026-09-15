import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { products } from "@/db/schema";
import { requireDb } from "@/lib/store";

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80) || `product-${Date.now()}`;
}

export async function GET() {
  try {
    const db = requireDb();
    const rows = await db.select().from(products).orderBy(products.createdAt);
    return NextResponse.json({ products: rows });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 503 });
  }
}

export async function POST(req: Request) {
  try {
    const db = requireDb();
    const b = await req.json();
    if (!b.name || b.price == null) return NextResponse.json({ error: "Name and price are required." }, { status: 400 });
    const id = b.id || `p-${Date.now().toString(36)}`;
    const slug = b.slug || `${slugify(b.name)}-${id.slice(-4)}`;
    const row = {
      id,
      slug,
      name: String(b.name),
      category: String(b.category || "hoodies"),
      price: Number(b.price),
      oldPrice: b.oldPrice != null && b.oldPrice !== "" ? Number(b.oldPrice) : null,
      rating: Number(b.rating ?? 5),
      reviews: Number(b.reviews ?? 0),
      colors: Array.isArray(b.colors) ? b.colors : [],
      sizes: Array.isArray(b.sizes) && b.sizes.length ? b.sizes : null,
      description: String(b.description || ""),
      details: Array.isArray(b.details) ? b.details : [],
      images: Array.isArray(b.images) ? b.images : [],
      badge: b.badge || null,
      active: b.active !== false,
    };
    await db.insert(products).values(row);
    return NextResponse.json({ ok: true, id });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const db = requireDb();
    const b = await req.json();
    if (!b.id) return NextResponse.json({ error: "Missing id." }, { status: 400 });
    await db
      .update(products)
      .set({
        name: b.name,
        slug: b.slug,
        category: b.category,
        price: b.price != null ? Number(b.price) : undefined,
        oldPrice: b.oldPrice === "" || b.oldPrice == null ? null : Number(b.oldPrice),
        rating: b.rating != null ? Number(b.rating) : undefined,
        reviews: b.reviews != null ? Number(b.reviews) : undefined,
        colors: b.colors,
        sizes: b.sizes && b.sizes.length ? b.sizes : null,
        description: b.description,
        details: b.details,
        images: b.images,
        badge: b.badge || null,
        active: b.active,
        updatedAt: new Date(),
      })
      .where(eq(products.id, b.id));
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
    await db.delete(products).where(eq(products.id, id));
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
