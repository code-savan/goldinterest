import { categories } from "@/lib/products";

export function ShopByCategory() {
  return (
    <section id="shop" className="py-20 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Header - free, centered, lots of whitespace */}
        <div className="max-w-2xl">
          <div className="text-[11px] tracking-[0.24em] uppercase text-[#8C6A2F] font-medium">Shop by Category</div>
          <h2 className="font-serif text-[34px] sm:text-[42px] leading-[0.95] tracking-[-0.02em] font-light mt-4">
            Everything <span className="italic">we make,</span>
            <br />
            <span className="font-normal">curated by use</span>
          </h2>
          <div className="w-12 h-px bg-[#C9A96E] mt-6" />
          <p className="text-[13px] leading-6 text-[#6B6B6B] mt-6 max-w-[520px]">
            Five collections: Wallpaper Packs, Printable Posters, Frame Wall Art, Hoodies and Tee Shirts. Each one made with care, in its own material and scale.
          </p>
        </div>

        {/* Grid - free, not clustered: big gaps, airy */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 mt-14 lg:mt-16">
          {categories.map((cat) => (
            <a key={cat.id} href={cat.href} className="group block">
              <div className="relative overflow-hidden bg-[#F6F5F2] aspect-[4/5.2] border border-[#E8E6E1]">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[900ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-[10px] tracking-[0.18em] uppercase text-white/70">{cat.count}</div>
                  <div className="text-white font-serif text-[19px] leading-none mt-1.5">{cat.label}</div>
                  <div className="mt-3 text-[11px] tracking-[0.14em] uppercase text-white/90 flex items-center gap-1.5">
                    Shop <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
              <div className="pt-3 flex items-center justify-between">
                <span className="text-[11px] tracking-[0.14em] uppercase text-[#6B6B6B]">{cat.label}</span>
                <span className="w-6 h-px bg-[#E8E6E1] group-hover:bg-[#C9A96E] group-hover:w-8 transition-all" />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <div className="text-[11px] tracking-[0.16em] uppercase text-[#9A9590]">Free shipping on every order. All sales final.</div>
        </div>
      </div>
    </section>
  );
}
