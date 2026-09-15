import { requireDb } from "@/lib/store";
import { desc } from "drizzle-orm";
import { products, reviews } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ReviewsManager } from "@/components/admin/reviews-manager";

export default async function AdminReviewsPage() {
  let initial: React.ComponentProps<typeof ReviewsManager>["initial"] = [];
  try {
    const db = requireDb();
    const rows = await db
      .select({
        id: reviews.id,
        productId: reviews.productId,
        productName: products.name,
        name: reviews.name,
        email: reviews.email,
        rating: reviews.rating,
        body: reviews.body,
        anonymous: reviews.anonymous,
        active: reviews.active,
        createdAt: reviews.createdAt,
      })
      .from(reviews)
      .leftJoin(products, eq(reviews.productId, products.id))
      .orderBy(desc(reviews.createdAt));
    initial = rows.map((r) => ({ ...r, createdAt: r.createdAt ? r.createdAt.toISOString() : null }));
  } catch {}

  return <ReviewsManager initial={initial} />;
}
