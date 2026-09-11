import { Hero } from "@/components/hero";
import { ShopByCategory } from "@/components/shop-by-category";
import { FeaturedCollection } from "@/components/featured";
import { EditorialWallpapers, EditorialApparel } from "@/components/editorial";
import { FAQ } from "@/components/faq";

export default function Home() {
  return (
    <div className="bg-[#FCFCF9]">
      <Hero />
      <ShopByCategory />
      <FeaturedCollection />
      <EditorialWallpapers />
      <EditorialApparel />

      {/* Free, editorial separator - not a dense grid, just breathing */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="border-t border-[#E8E6E1] pt-12 flex flex-col lg:flex-row gap-8 lg:items-center justify-between">
          <div className="max-w-xl">
            <div className="text-[11px] tracking-[0.24em] uppercase text-[#8C6A2F]">Visit the Shop</div>
            <h2 className="font-serif text-[28px] lg:text-[32px] leading-none font-light mt-3">
              All products, <span className="italic">one place</span>
            </h2>
            <p className="text-[13px] leading-6 text-[#6B6B6B] mt-4">
              14 pieces across five categories — free shipping on every order, worldwide. All sales final.
            </p>
          </div>
          <div className="flex gap-3">
            <a href="/shop" className="bg-[#0A0A0A] text-white px-8 py-4 text-[11px] tracking-[0.18em] uppercase font-medium hover:bg-[#1A1A1A] transition-colors">
              Enter Shop — $22 to $295
            </a>
            <a href="#faq" className="border border-[#E8E6E1] bg-white px-8 py-4 text-[11px] tracking-[0.18em] uppercase hover:border-[#0A0A0A] transition-colors">
              FAQ
            </a>
          </div>
        </div>
      </section>

      <FAQ />

      {/* Newsletter - airy, not clustered */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pb-20 lg:pb-28 pt-4">
        <div className="bg-[#0A0A0A] text-white px-6 lg:px-16 py-12 lg:py-14 flex flex-col lg:flex-row gap-8 lg:items-center justify-between">
          <div>
            <div className="font-serif text-[24px] lg:text-[26px] leading-none">Join the Maison</div>
            <div className="text-[13px] text-white/60 mt-3 max-w-[420px] leading-6">10% off your first wallpaper pack. No spam — just new drops, quietly.</div>
          </div>
          <form className="flex gap-2 w-full lg:w-auto">
            <input
              placeholder="Your email"
              className="flex-1 lg:w-[340px] bg-white text-black px-4 py-3.5 text-sm placeholder:text-[#9A9590] focus:outline-none"
            />
            <button type="button" className="bg-[#C9A96E] text-black px-7 py-3.5 text-[11px] tracking-[0.18em] uppercase font-medium hover:bg-white transition-colors">
              Subscribe
            </button>
          </form>
        </div>
        <div className="text-center text-[11px] tracking-[0.14em] uppercase text-[#9A9590] mt-6">Free shipping — all orders · Duties included for EU</div>
      </section>
    </div>
  );
}
