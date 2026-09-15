import { products as staticProducts, type Product } from "@/lib/products";
import { ProductCard } from "./product-card";
import { DEFAULT_SECTIONS } from "@/lib/site-content";

type Copy = {
  kicker: string;
  titleA: string;
  titleAccent: string;
  titleB: string;
  sub: string;
};

export function FeaturedCollection({
  products,
  copy = {
    kicker: DEFAULT_SECTIONS.featuredKicker,
    titleA: DEFAULT_SECTIONS.featuredTitleA,
    titleAccent: DEFAULT_SECTIONS.featuredTitleAccent,
    titleB: DEFAULT_SECTIONS.featuredTitleB,
    sub: DEFAULT_SECTIONS.featuredSub,
  },
}: {
  products?: Product[];
  copy?: Copy;
}) {
  const featured = (products ?? staticProducts).slice(0, 6);

  return (
    <section className="bg-[#F6F5F2] border-y border-[#E8E6E1] py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Free header - left aligned with huge whitespace */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <div className="text-[11px] tracking-[0.24em] uppercase text-[#8C6A2F] font-medium">{copy.kicker}</div>
            <h2 className="font-serif text-[32px] sm:text-[40px] leading-[0.95] tracking-[-0.02em] font-light mt-4">
              {copy.titleA} <span className="italic text-[#8C6A2F]">{copy.titleAccent}</span>
              <br />
              {copy.titleB}
            </h2>
          </div>
          <div className="lg:text-right max-w-[360px]">
            <p className="text-[13px] leading-6 text-[#6B6B6B]">{copy.sub}</p>
            <div className="hidden sm:flex gap-2 mt-4 lg:justify-end">
              <span className="text-[11px] tracking-[0.14em] uppercase border border-[#E8E6E1] px-3 py-1.5 bg-white">★ 4.8</span>
              <span className="text-[11px] tracking-[0.14em] uppercase bg-[#0A0A0A] text-white px-3 py-1.5">Free Shipping</span>
            </div>
          </div>
        </div>

        {/* Grid - declustered: 3 per row, generous whitespace */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 xl:gap-14 mt-16">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <a
            href="/shop"
            className="inline-flex items-center gap-3 border border-[#0A0A0A] px-8 py-4 text-[11px] tracking-[0.18em] uppercase font-medium hover:bg-[#0A0A0A] hover:text-white transition-colors"
          >
            View complete shop <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
