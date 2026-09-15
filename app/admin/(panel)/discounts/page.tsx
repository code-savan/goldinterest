import { requireDb } from "@/lib/store";
import { PromosManager } from "@/components/admin/promos-manager";
import { promos } from "@/db/schema";

export default async function AdminDiscountsPage() {
  let initial: (typeof promos.$inferSelect)[] = [];
  try {
    const db = requireDb();
    initial = await db.select().from(promos).orderBy(promos.createdAt);
  } catch {}
  return <PromosManager initial={initial} />;
}
