import { DEFAULT_SECTIONS } from "@/lib/site-content";

type Copy = {
  kicker: string;
  titleA: string;
  titleAccent: string;
  titleB: string;
  sub: string;
};

export function EditorialWallpapers({
  copy = {
    kicker: DEFAULT_SECTIONS.wallpapersKicker,
    titleA: DEFAULT_SECTIONS.wallpapersTitleA,
    titleAccent: DEFAULT_SECTIONS.wallpapersTitleAccent,
    titleB: DEFAULT_SECTIONS.wallpapersTitleB,
    sub: DEFAULT_SECTIONS.wallpapersSub,
  },
}: {
  copy?: Copy;
}) {
  return (
    <section id="wallpapers" className="py-20 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Free, editorial: big image with floating text, lots of negative space */}
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-start">
          <div className="relative">
            <div className="relative overflow-hidden aspect-[4/3.4] bg-[#0A0A0A]">
              <img
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1200&auto=format&fit=crop&q=75"
                alt="Wallpapers"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 bg-white px-4 py-3 shadow-lg">
                <div className="text-[11px] tracking-[0.16em] uppercase text-[#8C6A2F]">Washable, matte, linen texture</div>
                <div className="text-sm font-medium">Easy to clean and soft to the touch</div>
              </div>
            </div>
            {/* Floating detached card */}
            <div className="hidden lg:block absolute -right-8 bottom-12 bg-[#F6F5F2] border border-[#E8E6E1] p-6 w-[300px] shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
              <div className="text-[11px] tracking-[0.16em] uppercase text-[#8C6A2F]">Details, pack</div>
              <ul className="mt-3 space-y-2 text-[13px] leading-5 text-[#1A1A1A]">
                <li className="flex gap-2"><span className="text-[#C9A96E]">•</span> 3 rolls, 15.9 sqm coverage</li>
                <li className="flex gap-2"><span className="text-[#C9A96E]">•</span> Paste the wall, wipeable</li>
                <li className="flex gap-2"><span className="text-[#C9A96E]">•</span> Printed in the EU on FSC certified paper</li>
              </ul>
              <div className="mt-4 text-[11px] text-[#6B6B6B]">Free shipping on every order</div>
            </div>
          </div>

          <div className="lg:pt-8 lg:pl-8">
            <div className="text-[11px] tracking-[0.24em] uppercase text-[#8C6A2F] font-medium">{copy.kicker}</div>
            <h3 className="font-serif text-[32px] lg:text-[42px] leading-[0.9] tracking-[-0.02em] font-light mt-4">
              {copy.titleA} <br />
              <span className="italic text-[#8C6A2F]">{copy.titleAccent}</span> &
              <br />
              {copy.titleB}
            </h3>
            <div className="w-10 h-px bg-[#C9A96E] mt-6" />
            <p className="text-[14px] leading-7 text-[#6B6B6B] mt-6">
              {copy.sub}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <a href="/shop?category=wallpaper-packs" className="group bg-[#0A0A0A] text-white p-5 hover:bg-[#1A1A1A] transition-colors">
                <div className="text-[11px] tracking-[0.14em] uppercase text-[#C9A96E]">From $129</div>
                <div className="font-serif text-[18px] leading-none mt-1">Wallpaper Packs</div>
                <div className="text-xs text-white/60 mt-1">3 rolls, free shipping</div>
                <div className="text-[11px] tracking-wide mt-3 flex items-center gap-1">Shop <span className="group-hover:translate-x-1 transition-transform">→</span></div>
              </a>
              <a href="/shop?category=printable-posters" className="group bg-white border border-[#E8E6E1] p-5 hover:border-[#0A0A0A] transition-colors">
                <div className="text-[11px] tracking-[0.14em] uppercase text-[#8C6A2F]">From $22</div>
                <div className="font-serif text-[18px] leading-none mt-1">Printable</div>
                <div className="text-xs text-[#6B6B6B] mt-1">Instant download</div>
                <div className="text-[11px] tracking-wide mt-3 flex items-center gap-1">Shop <span className="group-hover:translate-x-1 transition-transform">→</span></div>
              </a>
            </div>

            <a href="/shop?category=frame-wall-art" className="mt-6 flex items-center gap-4 border border-[#E8E6E1] bg-[#F6F5F2] p-4 hover:border-[#0A0A0A] transition-colors group">
              <img src="https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?w=200&auto=format&fit=crop&q=60" alt="" loading="lazy" decoding="async" className="w-16 h-16 object-cover" />
              <div className="flex-1">
                <div className="text-[11px] tracking-[0.16em] uppercase text-[#8C6A2F]">Also in framed wall art</div>
                <div className="text-sm font-medium">Solid oak and museum glass</div>
                <div className="text-xs text-[#6B6B6B]">From $189, ready to hang</div>
              </div>
              <span className="w-8 h-8 border border-[#0A0A0A] flex items-center justify-center group-hover:bg-[#0A0A0A] group-hover:text-white transition-colors">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function EditorialApparel({
  copy = {
    kicker: DEFAULT_SECTIONS.apparelKicker,
    titleA: DEFAULT_SECTIONS.apparelTitleA,
    titleAccent: DEFAULT_SECTIONS.apparelTitleAccent,
    titleB: DEFAULT_SECTIONS.apparelTitleB,
    sub: DEFAULT_SECTIONS.apparelSub,
  },
}: {
  copy?: Copy;
}) {
  return (
    <section id="apparel" className="bg-[#FCFCF9] py-20 lg:py-32 border-t border-[#E8E6E1]/50">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="text-[11px] tracking-[0.24em] uppercase text-[#8C6A2F] font-medium">{copy.kicker}</div>
            <h3 className="font-serif text-[32px] lg:text-[42px] leading-[0.9] tracking-[-0.02em] font-light mt-4">
              {copy.titleA} <br />
              <span className="italic">{copy.titleAccent}</span>
              <br />
              <span className="text-[#8C6A2F]">{copy.titleB}</span>
            </h3>
            <div className="w-10 h-px bg-[#C9A96E] mt-6" />
            <p className="text-[14px] leading-7 text-[#6B6B6B] mt-6 max-w-[480px]">
              {copy.sub}
            </p>

            <div className="grid grid-cols-3 gap-3 mt-8 max-w-[420px]">
              <div className="bg-white border border-[#E8E6E1] p-4 text-center">
                <div className="text-[10px] tracking-[0.14em] uppercase opacity-60">Tee Shirts</div>
                <div className="font-medium text-sm mt-1">From $38</div>
                <div className="text-[11px] text-[#6B6B6B]">180gsm</div>
              </div>
              <div className="bg-white border border-[#E8E6E1] p-4 text-center">
                <div className="text-[10px] tracking-[0.14em] uppercase opacity-60">Hoodies</div>
                <div className="font-medium text-sm mt-1">From $89</div>
                <div className="text-[11px] text-[#6B6B6B]">450gsm</div>
              </div>
              <div className="bg-[#0A0A0A] text-white p-4 text-center">
                <div className="text-[10px] tracking-[0.14em] uppercase text-[#C9A96E]">Fit</div>
                <div className="font-medium text-sm mt-1">S → 3XL</div>
                <div className="text-[11px] text-white/60">Unisex</div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <a href="/shop?category=tee-shirts" className="flex-1 bg-[#0A0A0A] text-white text-center py-4 text-[11px] tracking-[0.18em] uppercase font-medium hover:bg-[#1A1A1A] transition-colors">
                Shop Tee Shirts
              </a>
              <a href="/shop?category=hoodies" className="flex-1 border border-[#0A0A0A] text-center py-4 text-[11px] tracking-[0.18em] uppercase font-medium hover:bg-[#0A0A0A] hover:text-white bg-white transition-colors">
                Shop Hoodies
              </a>
            </div>
            <div className="text-[11px] text-[#6B6B6B] mt-3">Free shipping on every order, worldwide</div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="grid grid-cols-[1.1fr_0.9fr] gap-4 lg:gap-6">
              <div className="space-y-4 lg:space-y-6">
                <div className="relative overflow-hidden bg-[#EDE9E3] aspect-[3/4]">
                  <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=60" alt="Hoodie" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute bottom-3 left-3 bg-white px-3 py-1.5 text-xs shadow-sm">Bone Hoodie, $89</div>
                </div>
                <div className="bg-[#F5E6C8] border border-[#E8DCC6] p-5">
                  <div className="text-[11px] tracking-[0.16em] uppercase text-[#8C6A2F]">Wishlist</div>
                  <div className="text-sm leading-5 mt-1">Tap the heart on any product to save it for later. It syncs across devices.</div>
                </div>
              </div>
              <div className="pt-8 lg:pt-12">
                <div className="relative overflow-hidden bg-[#F6F5F2] aspect-[3/4]">
                  <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=60" alt="T-shirt" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute bottom-3 left-3 bg-[#0A0A0A] text-white px-3 py-1.5 text-xs">Interest Tee, $38</div>
                </div>
                <div className="mt-4 text-[11px] leading-4 text-[#6B6B6B]">Oversized, garment-dyed, brushed interior. Made in Portugal.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
