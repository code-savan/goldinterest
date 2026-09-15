import Link from "next/link";

export const DEFAULT_HERO_IMAGE = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6";

// Sized variants for imgix-style URLs (Unsplash); any other URL is used as-is
// so admin uploads and pasted links work unchanged.
function heroSrc(base: string, w: number) {
  const clean = base.split("?")[0];
  if (!/unsplash\.com|imgix\.net/.test(clean)) return base;
  return `${clean}?auto=format&fit=crop&w=${w}&q=60`;
}

function heroSrcSet(base: string) {
  const clean = base.split("?")[0];
  if (!/unsplash\.com|imgix\.net/.test(clean)) return undefined;
  return `${heroSrc(base, 640)} 640w, ${heroSrc(base, 960)} 960w, ${heroSrc(base, 1440)} 1440w`;
}

export function Hero({
  kicker = "Gold Interest, Est. 2024",
  titleTop = "Everything",
  titleAccent = "for your",
  titleBottom = "Space",
  subtitle = "Wallpapers, printable posters, framed wall art and apparel. Carefully made with a smooth matte finish, heavyweight cotton and small gold details. Free shipping on every order.",
  image = DEFAULT_HERO_IMAGE,
}: {
  kicker?: string;
  titleTop?: string;
  titleAccent?: string;
  titleBottom?: string;
  subtitle?: string;
  image?: string;
}) {
  const src = image.trim() !== "" ? image : DEFAULT_HERO_IMAGE;
  const srcSet = heroSrcSet(src);
  return (
    <section className="relative overflow-hidden h-[100dvh] min-h-[620px] lg:min-h-[660px] flex flex-col">
      {/* Preload the exact LCP candidate — React hoists this into <head> */}
      <link rel="preload" as="image" {...(srcSet ? { imageSrcSet: srcSet, imageSizes: "100vw" } : {})} href={heroSrc(src, 960)} />
      {/* Background — wallpaper + framed art interior, ultra-fast */}
      <div className="absolute inset-0 bg-[#0A0A0A]">
        <img
          src={heroSrc(src, 960)}
          {...(srcSet ? { srcSet } : {})}
          sizes="100vw"
          alt="Wallpaper packs and framed wall art in a warm modern interior"
          className="w-full h-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      {/* Content — peak mobile: tighter vertical rhythm, generous mobile padding */}
      <div className="relative flex-1 flex items-center mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-0">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-20 xl:gap-28 items-center w-full">
          {/* Left — floating glass headline — sized-down, softer contrast */}
          <div className="relative">
            <div className="bg-white/[0.92] backdrop-blur-md p-6 lg:p-8 xl:p-9 max-w-[520px] shadow-[0_12px_40px_rgba(0,0,0,0.10)]">
              <div className="text-[10px] tracking-[0.24em] uppercase text-[#8C6A2F]/80 font-medium">{kicker}</div>
              <h1 className="font-serif text-[34px] sm:text-[40px] lg:text-[48px] leading-[0.9] tracking-[-0.03em] font-light mt-3.5 text-[#1A1A1A]">
                {titleTop} <br />
                <span className="italic font-normal text-[#8C6A2F]/90">{titleAccent}</span> <br />
                {titleBottom}
              </h1>
              <p className="text-[13px] leading-6 text-[#6B6B6B]/90 mt-4 max-w-[380px]">
                {subtitle}
              </p>
              <div className="flex flex-wrap gap-2.5 mt-6">
                <Link
                  href="/shop"
                  className="bg-[#0A0A0A]/90 text-white px-6 py-3 text-[11px] tracking-[0.16em] uppercase font-medium hover:bg-[#0A0A0A] transition-colors"
                >
                  Shop all with free shipping
                </Link>
                <Link
                  href="/shop?category=wallpaper-packs"
                  className="border border-[#0A0A0A]/80 px-6 py-3 text-[11px] tracking-[0.16em] uppercase font-medium hover:bg-[#0A0A0A] hover:text-white transition-colors bg-white/90"
                >
                  Wallpaper Packs
                </Link>
              </div>
              <div className="flex items-center gap-3 mt-7 pt-5 border-t border-[#E8E6E1]/60">
                <div className="flex -space-x-2">
                  <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=64&auto=format&fit=crop&q=60" alt="" loading="lazy"
                  fetchPriority="low" decoding="async" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&auto=format&fit=crop&q=60" alt="" loading="lazy"
                  fetchPriority="low" decoding="async" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&auto=format&fit=crop&q=60" alt="" loading="lazy"
                  fetchPriority="low" decoding="async" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                </div>
                <div className="text-[11px] leading-4">
                  <div className="font-medium text-[#1A1A1A]">4.8/5 from 1,200+ reviews</div>
                  <div className="text-[#6B6B6B]/70">Trusted by 12,000+ homes</div>
                </div>
              </div>
            </div>

            {/* Floating mini stat — sized-down, lower contrast */}
            <div className="hidden lg:flex absolute -right-8 -bottom-6 bg-[#0A0A0A]/85 backdrop-blur-sm text-white/90 px-5 py-3 items-center gap-3 shadow-lg">
              <div className="w-8 h-8 rounded-full bg-[#C9A96E]/90 flex items-center justify-center text-black font-serif text-sm">★</div>
              <div>
                <div className="text-[10px] tracking-[0.16em] uppercase text-[#C9A96E]/80">Free Shipping</div>
                <div className="text-[13px] font-medium">Every order, worldwide</div>
              </div>
            </div>
          </div>

          {/* Right — floating product cards — sized-down, softer */}
          <div className="relative hidden lg:block h-[520px] xl:h-[560px]">
            {/* Card 1 - Wallpaper — top far right */}
            <div className="absolute top-0 right-6 bg-white/95 backdrop-blur-sm p-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.12)] w-[240px]">
              <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&auto=format&fit=crop&q=60" alt="" loading="lazy"
                  fetchPriority="low" decoding="async" className="w-full h-[150px] object-cover opacity-95" />
              <div className="pt-2.5">
                <div className="text-[10px] tracking-[0.14em] uppercase text-[#8C6A2F]/80">Printer Star</div>
                <div className="text-[13px] font-medium leading-tight">Aurum Minimal Wallpaper Pack</div>
                <div className="text-[11px] text-[#6B6B6B]/70">3 rolls, washable, matte</div>
                <div className="flex items-center justify-between mt-2.5">
                  <span className="text-[13px] font-medium">$129</span>
                  <span className="text-[10px] tracking-wide bg-[#0A0A0A]/85 text-white px-2.5 py-1">Shop →</span>
                </div>
              </div>
            </div>

            {/* Card 2 - Apparel — bottom left, far */}
            <div className="absolute bottom-0 left-2 bg-white/95 backdrop-blur-sm p-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.12)] w-[220px]">
              <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&auto=format&fit=crop&q=60" alt="" loading="lazy"
                  fetchPriority="low" decoding="async" className="w-full h-[140px] object-cover opacity-95" />
              <div className="pt-2.5">
                <div className="text-[10px] tracking-[0.14em] uppercase text-[#8C6A2F]/80">Apparel</div>
                <div className="text-[13px] font-medium">Essential Hoodie in Bone</div>
                <div className="text-[11px] text-[#6B6B6B]/70">450gsm, S to 3XL</div>
              </div>
            </div>

            {/* Small badge — middle left, offset — muted */}
            <div className="absolute top-1/2 left-0 -translate-y-8 bg-[#C9A96E]/90 backdrop-blur-sm text-black/80 px-4 py-3 shadow-md">
              <div className="text-[10px] tracking-[0.16em] uppercase opacity-60">From</div>
              <div className="text-[13px] font-medium">$22</div>
              <div className="text-[10px] opacity-60">Printable Posters</div>
            </div>

            {/* Floating rating pill — top left, softer */}
            <div className="absolute top-12 left-0 bg-white/80 backdrop-blur px-3 py-2 shadow-sm flex items-center gap-2 text-[11px]">
              <span className="w-1.5 h-1.5 bg-green-600/80 rounded-full animate-pulse" />
              <span className="text-[#1A1A1A]/70">In stock, ships today</span>
            </div>
          </div>

          {/* Mobile — peak: stacked, not cramped scroll */}
          <div className="lg:hidden mt-6 space-y-3">
            {/* Primary preview */}
            <div className="bg-white/95 backdrop-blur-sm p-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)] flex gap-3 items-center">
              <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&auto=format&fit=crop&q=60" alt="" loading="lazy"
                  fetchPriority="low" decoding="async" className="w-20 h-20 object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-[10px] tracking-[0.14em] uppercase text-[#8C6A2F]/80">Bestseller</div>
                <div className="text-[13px] font-medium leading-tight truncate">Aurum Minimal, $129</div>
                <div className="text-[11px] text-[#6B6B6B]/70">3 rolls with free shipping</div>
              </div>
              <span className="text-[11px] tracking-wide bg-[#0A0A0A] text-white px-3 py-2 shrink-0">Shop</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/95 backdrop-blur-sm p-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&auto=format&fit=crop&q=60" alt="" loading="lazy"
                  fetchPriority="low" decoding="async" className="w-full h-24 object-cover" />
                <div className="text-[11px] font-medium mt-2">Hoodie, from $89</div>
                <div className="text-[10px] text-[#6B6B6B]/70">S to 3XL, 450gsm</div>
              </div>
              <div className="bg-[#C9A96E]/95 backdrop-blur-sm p-4 flex flex-col justify-center">
                <div className="text-[10px] tracking-[0.14em] uppercase opacity-60">From</div>
                <div className="font-serif text-[18px] leading-none mt-1">$22</div>
                <div className="text-[11px] opacity-70 mt-1">Printable Posters</div>
                <div className="text-[11px] tracking-wide mt-3 underline underline-offset-4">Shop →</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom stats — no divider line */}
      <div className="relative mt-auto">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center lg:justify-between items-center gap-3 lg:gap-8 py-3.5 lg:py-4 text-center text-[10px] sm:text-[10.5px] tracking-[0.16em] uppercase text-white/20">
          <span>Free shipping on every order</span>
          <span className="hidden sm:inline w-px h-3 bg-white/[0.02]" />
          <span>Quality finish, made in the EU</span>
          <span className="hidden lg:inline w-px h-3 bg-white/[0.02]" />
          <span className="hidden lg:inline">Framed wall art in oak</span>
          <span className="hidden lg:inline w-px h-3 bg-white/[0.02]" />
          <span className="hidden lg:inline">All sales final</span>
        </div>
      </div>
    </section>
  );
}
