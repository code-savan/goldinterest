"use client";

import { useMemo, useState } from "react";
import { categories, products, categoryLabels, type Category } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

const priceRanges = [
  { id: "all", label: "All prices", test: () => true },
  { id: "under50", label: "Under $50", test: (p: number) => p < 50 },
  { id: "50-100", label: "$50 – $100", test: (p: number) => p >= 50 && p <= 100 },
  { id: "100-200", label: "$100 – $200", test: (p: number) => p > 100 && p <= 200 },
  { id: "200plus", label: "$200+", test: (p: number) => p > 200 },
];

const allSizes = ["S", "M", "L", "XL", "2XL", "3XL"];
const allColors = [
  { name: "Sand", hex: "#E8DCC6" },
  { name: "Noir", hex: "#0A0A0A" },
  { name: "Bone", hex: "#E8E6E1" },
  { name: "Tomato", hex: "#C44536" },
  { name: "Sage", hex: "#8A9A8B" },
  { name: "Cream", hex: "#F5E6C8" },
];

export function ShopClient({ initialCategory }: { initialCategory: Category | null }) {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(initialCategory ? [initialCategory] : []);
  const [priceId, setPriceId] = useState("all");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sort, setSort] = useState("featured");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

  const filtered = useMemo(() => {
    let out = [...products];
    if (selectedCategories.length) out = out.filter((p) => selectedCategories.includes(p.category));
    const range = priceRanges.find((r) => r.id === priceId)!;
    out = out.filter((p) => range.test(p.price));
    if (selectedSizes.length) out = out.filter((p) => p.sizes?.some((s) => selectedSizes.includes(s)));
    if (selectedColors.length) out = out.filter((p) => p.colors.some((c) => selectedColors.includes(c.name)));
    if (sort === "price-low") out.sort((a, b) => a.price - b.price);
    if (sort === "price-high") out.sort((a, b) => b.price - a.price);
    if (sort === "rating") out.sort((a, b) => b.rating - a.rating);
    return out;
  }, [selectedCategories, priceId, selectedSizes, selectedColors, sort]);

  const toggleCat = (id: Category) => setSelectedCategories((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const toggleSize = (s: string) => setSelectedSizes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  const toggleColor = (n: string) => setSelectedColors((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]));
  const clearAll = () => {
    setSelectedCategories([]);
    setPriceId("all");
    setSelectedSizes([]);
    setSelectedColors([]);
  };

  const activeCount = selectedCategories.length + (priceId !== "all" ? 1 : 0) + selectedSizes.length + selectedColors.length;

  // mobile filter sheet transition
  const openFilter = () => {
    setFilterOpen(true);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => requestAnimationFrame(() => setFilterVisible(true)));
  };
  const closeFilter = () => {
    setFilterVisible(false);
    document.body.style.overflow = "";
    setTimeout(() => setFilterOpen(false), 300);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 mt-8 lg:mt-10">
      {/* Mobile filter bar — peak */}
      <div className="lg:hidden flex gap-3">
        <button onClick={openFilter} className="flex-1 border border-[#0A0A0A] bg-white py-3 text-[11px] tracking-[0.16em] uppercase font-medium flex items-center justify-center gap-2">
          <span className="w-3 h-3 border border-black/30 rounded-sm flex items-center justify-center text-[8px]">◧</span> Filters {activeCount > 0 && `(${activeCount})`}
        </button>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="flex-1 border border-[#E8E6E1] bg-white px-3 py-3 text-xs">
          <option value="featured">Featured</option>
          <option value="price-low">Price ↑</option>
          <option value="price-high">Price ↓</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* Mobile full-screen filter sheet */}
      {filterOpen && (
        <div className={`lg:hidden fixed inset-0 z-[65] bg-[#FCFCF9] flex flex-col transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${filterVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}>
          <div className="flex items-center justify-between px-4 h-[56px] border-b border-[#E8E6E1] shrink-0">
            <span className="text-[11px] tracking-[0.18em] uppercase font-medium">Filters {activeCount > 0 && `· ${activeCount}`}</span>
            <button onClick={closeFilter} className="w-10 h-10 flex items-center justify-center text-xl">✕</button>
          </div>
          <div className="flex-1 overflow-auto px-6 py-6 space-y-8">
            <div>
              <h3 className="text-[11px] tracking-[0.16em] uppercase font-medium">Category</h3>
              <div className="mt-3 space-y-3">
                {categories.map((c) => (
                  <label key={c.id} className="flex items-center gap-3">
                    <input type="checkbox" checked={selectedCategories.includes(c.id)} onChange={() => toggleCat(c.id)} className="w-4 h-4 accent-[#0A0A0A]" />
                    <span className="text-[14px]">{c.label}</span>
                    <span className="ml-auto text-xs text-[#9A9590]">{products.filter((p) => p.category === c.id).length}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="border-t border-[#E8E6E1] pt-6">
              <h3 className="text-[11px] tracking-[0.16em] uppercase font-medium">Price</h3>
              <div className="mt-3 space-y-2">
                {priceRanges.map((r) => (
                  <label key={r.id} className="flex items-center gap-3">
                    <input type="radio" name="price-mobile" checked={priceId === r.id} onChange={() => setPriceId(r.id)} className="accent-[#0A0A0A]" />
                    <span className="text-[14px]">{r.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="border-t border-[#E8E6E1] pt-6">
              <h3 className="text-[11px] tracking-[0.16em] uppercase font-medium">Size</h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {allSizes.map((s) => (
                  <button key={s} onClick={() => toggleSize(s)} className={`px-3 py-2 text-xs border ${selectedSizes.includes(s) ? "bg-black text-white border-black" : "bg-white border-[#E8E6E1]"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="border-t border-[#E8E6E1] pt-6">
              <h3 className="text-[11px] tracking-[0.16em] uppercase font-medium">Color</h3>
              <div className="flex flex-wrap gap-3 mt-3">
                {allColors.map((c) => (
                  <button key={c.name} onClick={() => toggleColor(c.name)} className={`w-9 h-9 rounded-full border-2 ${selectedColors.includes(c.name) ? "border-black scale-105" : "border-white ring-1 ring-[#E8E6E1]"}`} style={{ background: c.hex }} />
                ))}
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-[#E8E6E1] flex gap-3 bg-white">
            <button onClick={() => { clearAll(); closeFilter(); }} className="flex-1 border border-[#E8E6E1] py-3 text-[11px] tracking-[0.16em] uppercase">
              Clear
            </button>
            <button onClick={closeFilter} className="flex-1 bg-[#0A0A0A] text-white py-3 text-[11px] tracking-[0.16em] uppercase">
              Show {filtered.length} pieces
            </button>
          </div>
        </div>
      )}

      {/* Left filter — desktop only */}
      <aside className="hidden lg:block lg:w-[280px] xl:w-[300px] shrink-0">
        <div className="lg:sticky lg:top-[104px] space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-[11px] tracking-[0.18em] uppercase font-medium">Filters</h2>
            <button onClick={clearAll} className="text-[11px] tracking-wide underline text-[#6B6B6B] hover:text-black">
              Clear all
            </button>
          </div>

          <div className="border-t border-[#E8E6E1] pt-6">
            <h3 className="text-[11px] tracking-[0.16em] uppercase font-medium">Category</h3>
            <div className="mt-3 space-y-2.5">
              {categories.map((c) => (
                <label key={c.id} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" checked={selectedCategories.includes(c.id)} onChange={() => toggleCat(c.id)} className="w-4 h-4 border-[#E8E6E1] rounded-none accent-[#0A0A0A]" />
                  <span className="text-[13px] group-hover:text-black">{c.label}</span>
                  <span className="ml-auto text-[11px] text-[#9A9590]">{products.filter((p) => p.category === c.id).length}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-[#E8E6E1] pt-6">
            <h3 className="text-[11px] tracking-[0.16em] uppercase font-medium">Price</h3>
            <div className="mt-3 space-y-2">
              {priceRanges.map((r) => (
                <label key={r.id} className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="price" checked={priceId === r.id} onChange={() => setPriceId(r.id)} className="accent-[#0A0A0A]" />
                  <span className="text-[13px]">{r.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-[#E8E6E1] pt-6">
            <h3 className="text-[11px] tracking-[0.16em] uppercase font-medium">Size</h3>
            <div className="flex flex-wrap gap-2 mt-3">
              {allSizes.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSize(s)}
                  className={`px-3 py-1.5 text-xs border font-medium transition-colors ${selectedSizes.includes(s) ? "bg-[#0A0A0A] text-white border-[#0A0A0A]" : "bg-white border-[#E8E6E1] hover:border-[#0A0A0A]"}`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="text-[11px] text-[#9A9590] mt-2">Apparel S–3XL · posters A3/A2/A1</div>
          </div>

          <div className="border-t border-[#E8E6E1] pt-6">
            <h3 className="text-[11px] tracking-[0.16em] uppercase font-medium">Color</h3>
            <div className="flex flex-wrap gap-2.5 mt-3">
              {allColors.map((c) => (
                <button
                  key={c.name}
                  title={c.name}
                  onClick={() => toggleColor(c.name)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColors.includes(c.name) ? "border-[#0A0A0A] scale-105" : "border-white ring-1 ring-[#E8E6E1]"}`}
                  style={{ background: c.hex }}
                />
              ))}
            </div>
          </div>

          <div className="border-t border-[#E8E6E1] pt-6 text-[11px] leading-5 text-[#6B6B6B]">
            Free shipping — all orders<br />
            All sales final · See Returns
          </div>
        </div>
      </aside>

      {/* Right — products 70%+ */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E8E6E1]">
          <div className="text-[11px] tracking-[0.14em] uppercase text-[#6B6B6B]">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"} · Free Shipping
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="hidden lg:block border border-[#E8E6E1] bg-white px-3 py-2 text-xs">
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {(selectedCategories.length > 0 || priceId !== "all" || selectedSizes.length > 0 || selectedColors.length > 0) && (
          <div className="flex flex-wrap gap-2 py-4">
            {selectedCategories.map((id) => (
              <span key={id} className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white px-3 py-1 text-[11px] tracking-wide">
                {categoryLabels[id]} <button onClick={() => toggleCat(id)}>✕</button>
              </span>
            ))}
            {priceId !== "all" && (
              <span className="inline-flex items-center gap-2 border border-[#E8E6E1] bg-white px-3 py-1 text-[11px]">
                {priceRanges.find((r) => r.id === priceId)?.label} <button onClick={() => setPriceId("all")}>✕</button>
              </span>
            )}
            {selectedSizes.map((s) => (
              <span key={s} className="inline-flex items-center gap-2 border border-[#E8E6E1] bg-white px-3 py-1 text-[11px]">
                {s} <button onClick={() => toggleSize(s)}>✕</button>
              </span>
            ))}
            {selectedColors.map((c) => (
              <span key={c} className="inline-flex items-center gap-2 border border-[#E8E6E1] bg-white px-3 py-1 text-[11px]">
                {c} <button onClick={() => toggleColor(c)}>✕</button>
              </span>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 mt-8">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {filtered.length === 0 && <div className="py-20 text-center text-[#6B6B6B] border border-dashed border-[#E8E6E1] mt-8">No pieces match these filters. Try clearing.</div>}
      </div>
    </div>
  );
}
