"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./cart-context";
import { CALM_EASE } from "./page-transition";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, subtotal } = useCart();

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
                Your Bag <span className="text-[#8C6A2F]">({items.reduce((a, b) => a + b.quantity, 0)})</span>
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
                  <p className="font-serif text-xl">Your bag is empty</p>
                  <p className="text-sm text-[#6B6B6B] mt-2">Add some gold to your life.</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-6 border border-black px-6 py-3 text-[11px] tracking-[0.16em] uppercase hover:bg-black hover:text-white transition-colors"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-5">
                  {items.map((item, i) => (
                    <motion.div
                      key={`${item.product.id}-${item.size}-${item.color}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.05 + i * 0.05, ease: [...CALM_EASE] }}
                      className="flex gap-4 pb-5 border-b border-[#E8E6E1]"
                    >
                      <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-24 object-cover bg-[#F6F5F2]" />
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="text-[13px] leading-tight font-medium line-clamp-2 hover:underline"
                        >
                          {item.product.name}
                        </Link>
                        <div className="text-[11px] text-[#6B6B6B] mt-1 tracking-wide">
                          {[item.color, item.size].filter(Boolean).join(", ") || item.product.category}
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-[#E8E6E1]">
                            <button onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.size, item.color)} className="w-7 h-7 text-sm hover:bg-[#F6F5F2]">
                              −
                            </button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.size, item.color)} className="w-7 h-7 text-sm hover:bg-[#F6F5F2]">
                              +
                            </button>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</div>
                            <button onClick={() => removeItem(item.product.id, item.size, item.color)} className="text-[10px] tracking-[0.12em] uppercase underline text-[#6B6B6B] hover:text-black">
                              Remove
                            </button>
                          </div>
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
                className="border-t border-[#E8E6E1] px-6 py-6 bg-white space-y-4"
              >
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B6B6B]">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="text-[11px] text-[#6B6B6B]">Free shipping on every order. Duties included for the EU.</div>
                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-[#0A0A0A] text-white text-center py-4 text-[11px] tracking-[0.18em] uppercase font-medium hover:bg-[#1A1A1A] transition-colors"
                >
                  Checkout, ${subtotal.toFixed(2)}
                </Link>
                <Link href="/cart" onClick={() => setIsOpen(false)} className="block w-full text-center text-[11px] tracking-[0.14em] uppercase underline">
                  View Bag
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
