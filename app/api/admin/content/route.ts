import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { requireDb } from "@/lib/store";
import { DEFAULT_CONTENT, type ContentKey } from "@/lib/site-content";
import { siteContent } from "@/db/schema";

const KEYS = Object.keys(DEFAULT_CONTENT) as ContentKey[];

/** GET /api/admin/content — full site content bundle for the admin editor. */
export async function GET() {
  try {
    const { getSiteContent } = await import("@/lib/site-content");
    const content = await getSiteContent();
    return NextResponse.json({ content });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

/** PUT /api/admin/content — partial update, e.g. { faq, socials, contact }. */
export async function PUT(req: Request) {
  try {
    const db = requireDb();
    const b = await req.json();
    const saved: string[] = [];
    for (const key of KEYS) {
      const value = b[key];
      if (value && typeof value === "object") {
        await db
          .insert(siteContent)
          .values({ key, value })
          .onConflictDoUpdate({ target: siteContent.key, set: { value, updatedAt: new Date() } });
        saved.push(key);
      }
    }
    if (saved.length === 0) return NextResponse.json({ error: "Nothing to save." }, { status: 400 });
    revalidateTag("site-content", "max");
    return NextResponse.json({ ok: true, saved });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
