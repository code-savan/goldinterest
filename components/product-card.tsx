"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "./cart-context";
import { useWishlist } from "./wishlist-context";
import { useToast } from "./toast";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const { showToast } = useToast();
  const wished = has(product.id);
  const [adding, setAdding] = useState(false);

  return (
    <div className="group flex flex-col">
      <Link href={`/product/${product.slug}`} className="relative overflow-hidden bg-[#F6F5F2] aspect-[3/4] block">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-white text-[10px] tracking-[0.16em] uppercase px-2 py-1 font-medium border border-black/5">
            {product.badge}
          </span>
        )}
        {product.oldPrice && (
          <span className="absolute top-3 right-3 bg-[#0A0A0A] text-white text-[10px] tracking-wide px-2 py-1">
            SAVE ${(product.oldPrice - product.price).toFixed(0)}
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggle(product);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-black/5 transition-all ${wished ? "text-[#C9A96E]" : "text-[#0A0A0A]"} ${product.oldPrice ? "top-10" : ""}`}
          aria-label="Wishlist"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6">
            <path d="M12 21s-6.5-4.2-8.8-9.1A5.2 5.2 0 0 1 12 5.1a5.2 5.2 0 0 1 8.8 6.8C18.5 16.8 12 21 12 21Z" />
          </svg>
        </button>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
        <button
          onClick={(e) => {
            e.preventDefault();
            addItem(product, { color: product.colors[0]?.name, size: product.sizes?.[2] ?? undefined });
            setAdding(true);
            showToast({
              title: "Added to bag",
              description: `${product.name} · $${product.price.toFixed(2)}`,
              image: product.images[0],
            });
            setTimeout(() => setAdding(false), 1200);
          }}
          className={`absolute bottom-3 left-3 right-3 py-3 text-[11px] tracking-[0.16em] uppercase font-medium transition-all duration-300 border border-black/5 ${adding ? "bg-[#C9A96E] text-white opacity-100 translate-y-0" : "bg-white text-[#0A0A0A] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-[#0A0A0A] hover:text-white"}`}
        >
          {adding ? "✓ Added" : "Add to Cart"}
        </button>
      </Link>
      <div className="pt-3 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/product/${product.slug}`} className="text-[13px] leading-tight font-medium hover:underline line-clamp-2">
            {product.name}
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">${product.price.toFixed(2)}</span>
          {product.oldPrice && <span className="text-xs text-[#9A9590] line-through">${product.oldPrice.toFixed(2)}</span>}
          <span className="ml-auto text-[11px] text-[#6B6B6B] flex items-center gap-1">
            ★ {product.rating} <span className="opacity-60">({product.reviews})</span>
          </span>
        </div>
        <div className="flex gap-1.5 pt-1">
          {product.colors.slice(0, 4).map((c) => (
            <span key={c.name} title={c.name} className="w-4 h-4 rounded-full border border-white shadow-sm ring-1 ring-[#E8E6E1]" style={{ background: c.hex }} />
          ))}
          {product.sizes && <span className="text-[11px] text-[#6B6B6B] ml-2">{product.sizes.join(" · ")}</span>}
        </div>
      </div>
    </div>
  );
}
