import { requireDb } from "@/lib/store";
import { ProductsManager } from "@/components/admin/products-manager";
import { products } from "@/db/schema";

export default async function AdminProductsPage() {
  let initial: (typeof products.$inferSelect)[] = [];
  try {
    const db = requireDb();
    initial = await db.select().from(products).orderBy(products.createdAt);
  } catch {}

  return <ProductsManager initial={initial} />;
}
