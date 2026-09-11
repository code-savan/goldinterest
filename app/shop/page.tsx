import { categories, type Category } from "@/lib/products";
import { ShopClient } from "@/components/shop-client";

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const initialCategory =
    category && categories.some((c) => c.id === category) ? (category as Category) : null;

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="pb-8 border-b border-[#E8E6E1]">
        <div className="text-[11px] tracking-[0.24em] uppercase text-[#8C6A2F] font-medium">Shop</div>
        <h1 className="font-serif text-[36px] lg:text-[44px] leading-none tracking-[-0.02em] font-light mt-3">All Products</h1>
        <p className="text-[13px] leading-6 text-[#6B6B6B] mt-3 max-w-[560px]">Wallpapers, printable posters, framed wall art & apparel — free shipping, all orders. White space is the luxury.</p>
      </div>
      <ShopClient initialCategory={initialCategory} />
    </div>
  );
}
