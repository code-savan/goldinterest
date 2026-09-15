import { asc, desc, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { db } from "@/db";
import { orders, products, promos, settings, webhookEvents } from "@/db/schema";
import type { OrderItem } from "@/db/schema";
import { products as staticProducts, type Category, type Product } from "@/lib/products";

export type { OrderItem };

export type DbOrder = typeof orders.$inferSelect;
export type DbPromo = typeof promos.$inferSelect;
export type StoreSettings = typeof settings.$inferSelect;

type ProductRow = typeof products.$inferSelect;

function rowToProduct(r: ProductRow): Product {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    category: r.category as Category,
    price: Number(r.price),
    oldPrice: r.oldPrice != null ? Number(r.oldPrice) : undefined,
    rating: Number(r.rating ?? 4.8),
    reviews: r.reviews ?? 0,
    colors: (r.colors as { name: string; hex: string }[]) ?? [],
    sizes: (r.sizes as string[] | null) ?? undefined,
    description: r.description ?? "",
    details: (r.details as string[]) ?? [],
    images: (r.images as string[]) ?? [],
    badge: r.badge ?? undefined,
  };
}

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!db) return fallback;
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

/* ---------- Storefront reads (DB first, static fallback) ---------- */

export async function getProducts(activeOnly = true): Promise<Product[]> {
  return safe(async () => {
    const rows = activeOnly
      ? await db!.select().from(products).where(eq(products.active, true)).orderBy(asc(products.createdAt))
      : await db!.select().from(products).orderBy(asc(products.createdAt));
    if (rows.length === 0) return staticProducts;
    return rows.map(rowToProduct);
  }, staticProducts);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const all = await getProducts(false);
  const want = normalizeSlug(slug);
  const match = (p: Product) => normalizeSlug(p.slug) === want;
  return all.find((p) => match(p) && (p as Product & { active?: boolean }).active !== false)
    ?? all.find(match);
}

/**
 * Page params can arrive percent-encoded ("Nightcrawlers%20only") when the
 * route also defines generateStaticParams, and stored slugs were not always
 * URL-safe. Normalize both sides so lookups never 404 on encoding or case.
 */
function normalizeSlug(s: string): string {
  let out = s;
  try {
    out = decodeURIComponent(out);
  } catch {
    // Keep the raw value if it isn't valid percent-encoding.
  }
  return out.trim().toLowerCase();
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return safe(async () => {
    const rows = await db!.select().from(products).where(eq(products.id, id));
    return rows[0] ? rowToProduct(rows[0]) : staticProducts.find((p) => p.id === id);
  }, staticProducts.find((p) => p.id === id));
}

export const DEFAULT_SETTINGS = {
  featuredIds: ["1", "2", "3", "4", "7", "9"],
  announcement: "Free shipping on every order, worldwide",
  heroKicker: "Gold Interest, Est. 2024",
  heroTitleTop: "Everything",
  heroTitleAccent: "for your",
  heroTitleBottom: "Space",
  heroSubtitle:
    "Wallpapers, printable posters, framed wall art and apparel. Carefully made with a smooth matte finish, heavyweight cotton and small gold details. Free shipping on every order.",
};

export async function getSettings(): Promise<StoreSettings & typeof DEFAULT_SETTINGS> {
  if (!db) return { id: 1, ...DEFAULT_SETTINGS };
  return getCachedSettings();
}

// Homepage settings change rarely but are read on every page render —
// cache across requests and invalidate on save (see /api/admin/settings).
const getCachedSettings = unstable_cache(
  async (): Promise<StoreSettings & typeof DEFAULT_SETTINGS> => {
    return safe(async () => {
      const rows = await db!.select().from(settings).where(eq(settings.id, 1));
      const s = rows[0];
      if (!s) return { id: 1, ...DEFAULT_SETTINGS };
      return {
        id: 1,
        featuredIds: s.featuredIds?.length ? s.featuredIds : DEFAULT_SETTINGS.featuredIds,
        announcement: s.announcement || DEFAULT_SETTINGS.announcement,
        heroKicker: s.heroKicker || DEFAULT_SETTINGS.heroKicker,
        heroTitleTop: s.heroTitleTop || DEFAULT_SETTINGS.heroTitleTop,
        heroTitleAccent: s.heroTitleAccent || DEFAULT_SETTINGS.heroTitleAccent,
        heroTitleBottom: s.heroTitleBottom || DEFAULT_SETTINGS.heroTitleBottom,
        heroSubtitle: s.heroSubtitle || DEFAULT_SETTINGS.heroSubtitle,
      };
    }, { id: 1, ...DEFAULT_SETTINGS });
  },
  ["store-settings"],
  { tags: ["store-settings"], revalidate: 300 }
);

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  const [s, all] = await Promise.all([getSettings(), getProducts(true)]);
  const byId = new Map(all.map((p) => [p.id, p]));
  const picked = s.featuredIds.map((id) => byId.get(id)).filter(Boolean) as Product[];
  if (picked.length > 0) return picked.slice(0, limit);
  return all.slice(0, limit);
}

export async function getPromoByCode(code: string): Promise<DbPromo | undefined> {
  if (!db) return undefined;
  try {
    const rows = await db.select().from(promos).where(eq(promos.code, code.trim().toUpperCase()));
    const p = rows[0];
    if (!p || !p.active) return undefined;
    if (p.expiresAt && p.expiresAt < new Date()) return undefined;
    if (p.usageLimit != null && (p.usedCount ?? 0) >= p.usageLimit) return undefined;
    return p;
  } catch {
    return undefined;
  }
}

export function promoDiscount(promo: DbPromo, subtotal: number): number {
  const d = promo.kind === "fixed" ? Number(promo.value) : (subtotal * Number(promo.value)) / 100;
  return Math.min(Math.max(0, Math.round(d * 100) / 100), subtotal);
}

/* ---------- Admin writes (DB required) ---------- */

export function requireDb() {
  if (!db) throw new Error("Database is not connected. Add DATABASE_URL and run db/migrate.sql.");
  return db;
}

export async function adminProductCount(): Promise<number | null> {
  if (!db) return null;
  try {
    const rows = await db.select({ id: products.id }).from(products);
    return rows.length;
  } catch {
    return null;
  }
}

export async function getOrder(id: string): Promise<DbOrder | undefined> {
  if (!db) return undefined;
  try {
    const rows = await db.select().from(orders).where(eq(orders.id, id));
    return rows[0];
  } catch {
    return undefined;
  }
}

export async function listOrders(limit = 100): Promise<DbOrder[]> {
  if (!db) return [];
  try {
    return await db.select().from(orders).orderBy(desc(orders.createdAt)).limit(limit);
  } catch {
    return [];
  }
}

export async function orderStats() {
  const list = await listOrders(500);
  const paid = list.filter((o) => ["paid", "preparing", "shipped", "delivered"].includes(o.status));
  const revenue = paid.reduce((a, o) => a + Number(o.total), 0);
  const byStatus: Record<string, number> = {};
  for (const o of list) byStatus[o.status] = (byStatus[o.status] ?? 0) + 1;
  return { revenue, total: list.length, byStatus, recent: list.slice(0, 6) };
}

export async function claimWebhookEvent(id: string): Promise<boolean> {
  if (!db) return true;
  try {
    await db.insert(webhookEvents).values({ id });
    return true;
  } catch {
    return false;
  }
}
