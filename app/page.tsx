import { Hero } from "@/components/hero";
import { ShopByCategory } from "@/components/shop-by-category";
import { FeaturedCollection } from "@/components/featured";
import { EditorialWallpapers, EditorialApparel } from "@/components/editorial";
import { FAQ } from "@/components/faq";
import { getFeaturedProducts, getSettings } from "@/lib/store";
import { getSiteContent } from "@/lib/site-content";

export const revalidate = 60;

export default async function Home() {
  const [featured, s, content] = await Promise.all([getFeaturedProducts(6), getSettings(), getSiteContent()]);
  const sec = content.sections;

  return (
    <div className="bg-[#FCFCF9]">
      <Hero
        kicker={s.heroKicker}
        titleTop={s.heroTitleTop}
        titleAccent={s.heroTitleAccent}
        titleBottom={s.heroTitleBottom}
        subtitle={s.heroSubtitle}
        image={s.heroImage}
      />
      <ShopByCategory
        copy={{
          kicker: sec.categoriesKicker,
          titleA: sec.categoriesTitleA,
          titleAccent: sec.categoriesTitleAccent,
          titleB: sec.categoriesTitleB,
          sub: sec.categoriesSub,
        }}
      />
      <FeaturedCollection
        products={featured}
        copy={{
          kicker: sec.featuredKicker,
          titleA: sec.featuredTitleA,
          titleAccent: sec.featuredTitleAccent,
          titleB: sec.featuredTitleB,
          sub: sec.featuredSub,
        }}
      />
      <EditorialWallpapers
        copy={{
          kicker: sec.wallpapersKicker,
          titleA: sec.wallpapersTitleA,
          titleAccent: sec.wallpapersTitleAccent,
          titleB: sec.wallpapersTitleB,
          sub: sec.wallpapersSub,
        }}
      />
      <EditorialApparel
        copy={{
          kicker: sec.apparelKicker,
          titleA: sec.apparelTitleA,
          titleAccent: sec.apparelTitleAccent,
          titleB: sec.apparelTitleB,
          sub: sec.apparelSub,
        }}
      />

      {/* Free, editorial separator - not a dense grid, just breathing */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="border-t border-[#E8E6E1] pt-12 flex flex-col lg:flex-row gap-8 lg:items-center justify-between">
          <div className="max-w-xl">
            <div className="text-[11px] tracking-[0.24em] uppercase text-[#8C6A2F]">{sec.visitKicker}</div>
            <h2 className="font-serif text-[28px] lg:text-[32px] leading-none font-light mt-3">
              {sec.visitTitleA} <span className="italic">{sec.visitTitleAccent}</span>
            </h2>
            <p className="text-[13px] leading-6 text-[#6B6B6B] mt-4">
              {featured.length} {sec.visitSub}
            </p>
          </div>
          <div className="flex gap-3">
            <a href="/shop" className="bg-[#0A0A0A] text-white px-8 py-4 text-[11px] tracking-[0.18em] uppercase font-medium hover:bg-[#1A1A1A] transition-colors">
              Enter shop, $22 to $295
            </a>
            <a href="#faq" className="border border-[#E8E6E1] bg-white px-8 py-4 text-[11px] tracking-[0.18em] uppercase hover:border-[#0A0A0A] transition-colors">
              FAQ
            </a>
          </div>
        </div>
      </section>

      <FAQ content={content.faq} />
    </div>
  );
}
