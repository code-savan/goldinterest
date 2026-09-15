import { getProducts, getSettings } from "@/lib/store";
import { getSiteContent } from "@/lib/site-content";
import { HomepageManager } from "@/components/admin/homepage-manager";

export default async function AdminHomepagePage() {
  const [s, all, content] = await Promise.all([getSettings(), getProducts(false), getSiteContent()]);
  return (
    <HomepageManager
      initialSettings={{
        featuredIds: s.featuredIds,
        announcement: s.announcement,
        heroKicker: s.heroKicker,
        heroTitleTop: s.heroTitleTop,
        heroTitleAccent: s.heroTitleAccent,
        heroTitleBottom: s.heroTitleBottom,
        heroSubtitle: s.heroSubtitle,
        heroImage: s.heroImage,
        heroImages: { ...s.heroImages },
      }}
      products={all.map((p) => ({ id: p.id, name: p.name, price: p.price, image: p.images[0] || "" }))}
      initialContent={content}
    />
  );
}
