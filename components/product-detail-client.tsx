"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "./cart-context";
import { useWishlist } from "./wishlist-context";
import { useToast } from "./toast";

export function ProductDetailClient({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toggle: toggleWishlist, has: hasWishlist } = useWishlist();
  const { showToast } = useToast();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? "");
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[1] ?? product.sizes?.[0] ?? "");
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [sizeUnit, setSizeUnit] = useState<"in" | "cm">("in");
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const isWearable = product.category === "hoodies" || product.category === "tee-shirts";

  const handleAdd = () => {
    addItem(product, { color: selectedColor, size: selectedSize, quantity: 1 });
    setAdded(true);
    showToast({
      title: "Added to bag",
      description: `${product.name}, ${selectedColor}${selectedSize ? ", " + selectedSize : ""}, $${product.price.toFixed(2)}`,
      image: product.images[0],
    });
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-10 mt-4">
      {/* Images */}
      <div className="space-y-3">
        <div className="bg-[#F6F5F2] aspect-[3/4] lg:aspect-[4/5] overflow-hidden relative">
          <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
          {product.badge && (
            <span className="absolute top-4 left-4 bg-white text-[11px] tracking-[0.16em] uppercase px-3 py-1.5 font-medium border border-black/5">
              {product.badge}
            </span>
          )}
        </div>
        {product.images.length > 1 && (
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-20 h-20 overflow-hidden border-2 ${activeImage === i ? "border-[#0A0A0A]" : "border-transparent"}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
        {/* Thumbnail strip info */}
        <div className="flex gap-2 text-[11px] tracking-wide text-[#6B6B6B]">
          <span className="border border-[#E8E6E1] px-3 py-1.5 bg-white">Printer Star Finish</span>
          <span className="border border-[#E8E6E1] px-3 py-1.5 bg-white">Ships in 48h</span>
        </div>
      </div>

      {/* Details */}
      <div className="lg:sticky lg:top-[88px] h-fit lg:pt-2">
        <div className="text-[11px] tracking-[0.18em] uppercase text-[#8C6A2F]">{product.category}, {product.reviews} reviews</div>
        <h1 className="font-serif text-[24px] lg:text-[32px] leading-none tracking-[-0.02em] font-light mt-2">{product.name}</h1>
        <div className="flex items-center gap-3 mt-3">
          <span className="text-xl font-medium">${product.price.toFixed(2)}</span>
          {product.oldPrice && <span className="text-sm text-[#9A9590] line-through">${product.oldPrice.toFixed(2)}</span>}
          <span className="ml-auto text-sm flex items-center gap-1">
            <span className="text-[#C9A96E]">★</span> {product.rating} <span className="text-[#6B6B6B]">({product.reviews})</span>
          </span>
        </div>

        <p className="text-[13px] leading-6 text-[#6B6B6B] mt-4 border-l-2 border-[#C9A96E] pl-4">{product.description}</p>

        {/* Color */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <span className="text-[11px] tracking-[0.16em] uppercase font-medium">Colour, {selectedColor}</span>
            <span className="text-xs text-[#6B6B6B]">{product.colors.length} options</span>
          </div>
          <div className="flex gap-2.5 mt-3">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c.name)}
                title={c.name}
                className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${selectedColor === c.name ? "border-[#0A0A0A] scale-105" : "border-white ring-1 ring-[#E8E6E1]"}`}
                style={{ background: c.hex }}
                aria-label={c.name}
              >
                {selectedColor === c.name && <span className={`w-1.5 h-1.5 rounded-full ${c.hex === "#F6F5F2" || c.hex === "#E8DCC6" || c.hex === "#F5E6C8" || c.hex === "#E8E6E1" ? "bg-black" : "bg-white"}`} />}
              </button>
            ))}
          </div>
        </div>

        {/* Size */}
        {product.sizes && (
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <span className="text-[11px] tracking-[0.16em] uppercase font-medium">Size, {selectedSize}</span>
              <button onClick={() => setShowSizeGuide((v) => !v)} className="text-[11px] tracking-[0.14em] uppercase underline underline-offset-4">
                Size Guide
              </button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 mt-3">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`py-3 text-sm border font-medium transition-colors ${selectedSize === s ? "bg-[#0A0A0A] text-white border-[#0A0A0A]" : "bg-white border-[#E8E6E1] hover:border-[#0A0A0A]"}`}
                >
                  {s}
                </button>
              ))}
            </div>
            {showSizeGuide && (
              <div className="mt-4 border border-[#E8E6E1] bg-[#F6F5F2] p-5">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] tracking-[0.16em] uppercase font-medium">
                    {isWearable ? "Size guide, wearables (Unisex)" : "Size Guide"}
                  </div>
                  {isWearable && (
                    <div className="flex border border-[#E8E6E1] bg-white p-1 gap-1">
                      <button onClick={() => setSizeUnit("in")} className={`px-3 py-1 text-[11px] tracking-wide ${sizeUnit === "in" ? "bg-[#0A0A0A] text-white" : "text-[#6B6B6B]"}`}>
                        Inches
                      </button>
                      <button onClick={() => setSizeUnit("cm")} className={`px-3 py-1 text-[11px] tracking-wide ${sizeUnit === "cm" ? "bg-[#0A0A0A] text-white" : "text-[#6B6B6B]"}`}>
                        Centimetres
                      </button>
                    </div>
                  )}
                </div>

                {isWearable ? (
                  <>
                    <table className="w-full text-xs mt-4">
                      <thead className="text-left text-[#6B6B6B] border-b border-[#E8E6E1]">
                        <tr>
                          <th className="pb-2 font-normal">SIZE</th>
                          <th className="pb-2 font-normal">LENGTH {sizeUnit === "in" ? "(IN)" : "(CM)"}</th>
                          <th className="pb-2 font-normal">WIDTH {sizeUnit === "in" ? "(IN)" : "(CM)"}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E8E6E1]/60 text-[13px]">
                        <tr><td className="py-2.5 font-medium">S</td><td>{sizeUnit === "in" ? '28"' : "71.1 cm"}</td><td>{sizeUnit === "in" ? '18"' : "45.7 cm"}</td></tr>
                        <tr><td className="py-2.5 font-medium">M</td><td>{sizeUnit === "in" ? '29"' : "73.7 cm"}</td><td>{sizeUnit === "in" ? '20"' : "50.8 cm"}</td></tr>
                        <tr><td className="py-2.5 font-medium">L</td><td>{sizeUnit === "in" ? '30"' : "76.2 cm"}</td><td>{sizeUnit === "in" ? '22"' : "55.9 cm"}</td></tr>
                        <tr><td className="py-2.5 font-medium">XL</td><td>{sizeUnit === "in" ? '31"' : "78.7 cm"}</td><td>{sizeUnit === "in" ? '24"' : "61.0 cm"}</td></tr>
                        <tr><td className="py-2.5 font-medium">2XL</td><td>{sizeUnit === "in" ? '32"' : "81.3 cm"}</td><td>{sizeUnit === "in" ? '26"' : "66.0 cm"}</td></tr>
                        <tr><td className="py-2.5 font-medium">3XL</td><td>{sizeUnit === "in" ? '33"' : "83.8 cm"}</td><td>{sizeUnit === "in" ? '28"' : "71.1 cm"}</td></tr>
                      </tbody>
                    </table>
                    <div className="text-[11px] text-[#6B6B6B] mt-3 leading-4">
                      Unisex relaxed fit. Model is 178cm wearing size M. For an oversized fit, size up. Measurements taken flat. {sizeUnit === "in" ? "Inches" : "Centimetres"}, 1 inch equals 2.54 cm.
                    </div>
                  </>
                ) : (
                  <>
                    <table className="w-full text-xs mt-3">
                      <thead className="text-left text-[#6B6B6B] border-b border-[#E8E6E1]">
                        <tr>
                          <th className="pb-2 font-normal">Size</th>
                          <th className="pb-2 font-normal">Dimensions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E8E6E1]/60">
                        <tr><td className="py-2">A3</td><td>29.7 × 42.0 cm</td></tr>
                        <tr><td className="py-2">A2</td><td>42.0 × 59.4 cm</td></tr>
                        <tr><td className="py-2">A1</td><td>59.4 × 84.1 cm</td></tr>
                        <tr><td className="py-2">40×50</td><td>40 × 50 cm</td></tr>
                        <tr><td className="py-2">50×70</td><td>50 × 70 cm</td></tr>
                      </tbody>
                    </table>
                    <div className="text-[11px] text-[#6B6B6B] mt-3">Framed sizes include mount. Posters ship rolled in tube.</div>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* Add to cart + wishlist */}
        <div className="flex flex-col gap-3 mt-6">
          <button
            onClick={handleAdd}
            className="w-full py-4 text-[11px] tracking-[0.18em] uppercase font-medium transition-colors bg-[#0A0A0A] text-white hover:bg-[#1A1A1A]"
          >
            {added ? "✓ Added to Bag" : `Add to Bag, $${product.price.toFixed(2)}`}
          </button>
          <button
            onClick={() => toggleWishlist(product)}
            className="w-12 h-12 flex items-center justify-center border border-[#E8E6E1] transition-colors bg-white hover:border-[#0A0A0A]"
            aria-label="Wishlist"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill={hasWishlist(product.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6">
              <path d="M12 21s-6.5-4.2-8.8-9.1A5.2 5.2 0 0 1 12 5.1a5.2 5.2 0 0 1 8.8 6.8C18.5 16.8 12 21 12 21Z" />
            </svg>
          </button>
          <div className="text-[11px] text-center text-[#6B6B6B] mt-1">Free shipping on every order. All sales final.</div>
        </div>

        {/* Details accordion */}
        <div className="mt-6 border-t border-[#E8E6E1] divide-y divide-[#E8E6E1]">
          <details open className="py-4 group">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="text-[11px] tracking-[0.16em] uppercase font-medium">Product Description</span>
              <span className="text-sm group-open:rotate-180 transition-transform">⌄</span>
            </summary>
            <ul className="mt-3 space-y-1.5 text-[13px] leading-5 text-[#6B6B6B] list-disc pl-4">
              {product.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </details>
          <details className="py-4 group">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="text-[11px] tracking-[0.16em] uppercase font-medium">Shipping & Delivery</span>
              <span className="text-sm group-open:rotate-180 transition-transform">⌄</span>
            </summary>
            <div className="mt-3 text-[13px] leading-6 text-[#6B6B6B]">
              Ships from Barcelona. EU delivery in 3 to 5 days, worldwide in 6 to 12 days. Free shipping on every order. Duties included for the EU.
            </div>
          </details>
          <details className="py-4 group">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="text-[11px] tracking-[0.16em] uppercase font-medium">Returns, all sales final</span>
              <span className="text-sm group-open:rotate-180 transition-transform">⌄</span>
            </summary>
            <div className="mt-3 text-[13px] leading-6 text-[#6B6B6B]">
              No returns or exchanges. Only damaged or defective items qualify for a replacement. Please contact us within 48 hours with photos.
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
