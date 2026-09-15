import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { requireDb } from "@/lib/store";
import { ensureSchema } from "@/lib/migrate";

/**
 * POST /api/admin/migrate — applies pending idempotent schema migrations.
 * Protected by the admin session cookie (see proxy.ts). Powers the
 * dashboard "Sync database" button so schema changes never need manual SQL.
 */
export async function POST() {
  try {
    requireDb();
    const { applied } = await ensureSchema();
    revalidateTag("site-content", "max");
    return NextResponse.json({ ok: true, applied });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
