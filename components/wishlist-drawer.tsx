"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWishlist } from "./wishlist-context";
import { useCart } from "./cart-context";
import { useToast } from "./toast";
import { CALM_EASE } from "./page-transition";

export function WishlistDrawer() {
  const { items, isOpen, setIsOpen, remove } = useWishlist();
  const { addItem } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, setIsOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [...CALM_EASE] }}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [...CALM_EASE] }}
            className="relative w-full max-w-[420px] bg-[#FCFCF9] h-full flex flex-col shadow-2xl"
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
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1, ease: [...CALM_EASE] }} className="py-16 text-center">
                  <p className="font-serif text-xl">Your wishlist is empty</p>
                  <p className="text-sm text-[#6B6B6B] mt-2">Tap the heart on any product to save it.</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-6 border border-black px-6 py-3 text-[11px] tracking-[0.16em] uppercase hover:bg-black hover:text-white transition-colors"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-5">
                  {items.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.05 + i * 0.05, ease: [...CALM_EASE] }}
                      className="flex gap-4 pb-5 border-b border-[#E8E6E1]"
                    >
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
                              showToast({ title: "Added to bag", description: `${product.name}, $${product.price.toFixed(2)}`, image: product.images[0] });
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
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15, ease: [...CALM_EASE] }}
                className="border-t border-[#E8E6E1] px-6 py-6 bg-white"
              >
                <Link
                  href="/shop"
                  onClick={() => setIsOpen(false)}
                  className="block w-full border border-[#0A0A0A] text-center py-3 text-[11px] tracking-[0.16em] uppercase hover:bg-black hover:text-white"
                >
                  Continue Shopping
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
