import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { settings } from "@/db/schema";
import { getSettings, requireDb } from "@/lib/store";
import { DEFAULT_HERO_IMAGES, type HeroImages } from "@/lib/store";

export async function GET() {
  const s = await getSettings();
  return NextResponse.json({ settings: s });
}

export async function PUT(req: Request) {
  try {
    const db = requireDb();
    const b = await req.json();
    // Sanitize the hero image map: known keys only, short string URLs.
    let heroImages: HeroImages | undefined;
    if (b.heroImages && typeof b.heroImages === "object") {
      heroImages = { ...DEFAULT_HERO_IMAGES };
      for (const key of Object.keys(DEFAULT_HERO_IMAGES) as (keyof HeroImages)[]) {
        const v = (b.heroImages as Record<string, unknown>)[key];
        if (typeof v === "string" && v.length <= 2000) heroImages[key] = v;
      }
    }
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
        heroImage: b.heroImage ?? "",
        heroImages: heroImages ?? DEFAULT_HERO_IMAGES,
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
          heroImage: b.heroImage ?? "",
          heroImages: heroImages ?? DEFAULT_HERO_IMAGES,
        },
      });
    revalidateTag("store-settings", "max");
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
