import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { settings } from "@/db/schema";
import { getSettings, requireDb } from "@/lib/store";

export async function GET() {
  const s = await getSettings();
  return NextResponse.json({ settings: s });
}

export async function PUT(req: Request) {
  try {
    const db = requireDb();
    const b = await req.json();
    await db
      .insert(settings)
      .values({
        id: 1,
        featuredIds: b.featuredIds ?? [],
        announcement: b.announcement ?? "",
        heroKicker: b.heroKicker ?? "",
        heroTitleTop: b.heroTitleTop ?? "",
        heroTitleAccent: b.heroTitleAccent ?? "",
        heroTitleBottom: b.heroTitleBottom ?? "",
        heroSubtitle: b.heroSubtitle ?? "",
      })
      .onConflictDoUpdate({
        target: settings.id,
        set: {
          featuredIds: b.featuredIds ?? [],
          announcement: b.announcement ?? "",
          heroKicker: b.heroKicker ?? "",
          heroTitleTop: b.heroTitleTop ?? "",
          heroTitleAccent: b.heroTitleAccent ?? "",
          heroTitleBottom: b.heroTitleBottom ?? "",
          heroSubtitle: b.heroSubtitle ?? "",
        },
      });
    revalidateTag("store-settings", "max");
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
