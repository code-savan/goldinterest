import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { promos } from "@/db/schema";
import { requireDb } from "@/lib/store";
import { randomUUID } from "crypto";

export async function GET() {
  try {
    const db = requireDb();
    const rows = await db.select().from(promos).orderBy(promos.createdAt);
    return NextResponse.json({ promos: rows });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 503 });
  }
}

export async function POST(req: Request) {
  try {
    const db = requireDb();
    const b = await req.json();
    const code = String(b.code || "").trim().toUpperCase();
    if (!code || b.value == null) return NextResponse.json({ error: "Code and value are required." }, { status: 400 });
    const row = {
      id: randomUUID(),
      code,
      kind: b.kind === "fixed" ? "fixed" : "percent",
      value: Number(b.value),
      active: b.active !== false,
      usageLimit: b.usageLimit ? Number(b.usageLimit) : null,
      expiresAt: b.expiresAt ? new Date(b.expiresAt) : null,
    };
    await db.insert(promos).values(row);
    return NextResponse.json({ ok: true, id: row.id });
  } catch (e) {
    return NextResponse.json({ error: "That code already exists or the data is invalid." }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    const db = requireDb();
    const b = await req.json();
    if (!b.id) return NextResponse.json({ error: "Missing id." }, { status: 400 });
    await db
      .update(promos)
      .set({
        code: String(b.code || "").trim().toUpperCase(),
        kind: b.kind === "fixed" ? "fixed" : "percent",
        value: Number(b.value),
        active: Boolean(b.active),
        usageLimit: b.usageLimit ? Number(b.usageLimit) : null,
        expiresAt: b.expiresAt ? new Date(b.expiresAt) : null,
      })
      .where(eq(promos.id, b.id));
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
    await db.delete(promos).where(eq(promos.id, id));
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
