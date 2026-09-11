"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useWishlist } from "./wishlist-context";
import { useCart } from "./cart-context";
import { useToast } from "./toast";

export function WishlistDrawer() {
  const { items, isOpen, setIsOpen, remove } = useWishlist();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [visible, setVisible] = useState(false);
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRender(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else {
      setVisible(false);
      const t = setTimeout(() => setRender(false), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  if (!render) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
        onClick={() => setIsOpen(false)}
      />
      <div
        className={`relative w-full max-w-[420px] bg-[#FCFCF9] h-full flex flex-col shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${visible ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E6E1]">
          <h2 className="font-serif text-[18px] tracking-[0.08em] uppercase">
            Wishlist <span className="text-[#8C6A2F]">({items.length})</span>
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 border border-[#0A0A0A] flex items-center justify-center text-sm hover:bg-black hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-serif text-xl">Your wishlist is empty</p>
              <p className="text-sm text-[#6B6B6B] mt-2">Tap the heart on any product to save it.</p>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-6 border border-black px-6 py-3 text-[11px] tracking-[0.16em] uppercase hover:bg-black hover:text-white transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map((product) => (
                <div key={product.id} className="flex gap-4 pb-5 border-b border-[#E8E6E1]">
                  <Link href={`/product/${product.slug}`} onClick={() => setIsOpen(false)}>
                    <img src={product.images[0]} alt={product.name} className="w-20 h-24 object-cover bg-[#F6F5F2]" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${product.slug}`} onClick={() => setIsOpen(false)} className="text-[13px] leading-tight font-medium line-clamp-2 hover:underline">
                      {product.name}
                    </Link>
                    <div className="text-sm font-medium mt-1">${product.price.toFixed(2)}</div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => {
                          addItem(product, { color: product.colors[0]?.name, size: product.sizes?.[1] });
                          showToast({ title: "Added to bag", description: `${product.name} · $${product.price.toFixed(2)}`, image: product.images[0] });
                        }}
                        className="flex-1 bg-[#0A0A0A] text-white py-2 text-[11px] tracking-[0.12em] uppercase hover:bg-[#1A1A1A]"
                      >
                        Add to Bag
                      </button>
                      <button onClick={() => remove(product.id)} className="px-3 py-2 border border-[#E8E6E1] text-[11px] uppercase hover:border-black">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-[#E8E6E1] px-6 py-6 bg-white">
            <Link
              href="/shop"
              onClick={() => setIsOpen(false)}
              className="block w-full border border-[#0A0A0A] text-center py-3 text-[11px] tracking-[0.16em] uppercase hover:bg-black hover:text-white"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
