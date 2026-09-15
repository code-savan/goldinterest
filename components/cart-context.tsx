"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Product } from "@/lib/products";
import { trackWhop } from "./whop-pixel";

export type CartItem = {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, opts?: { size?: string; color?: string; quantity?: number }) => void;
  removeItem: (productId: string, size?: string, color?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("goldlifestyle-cart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {}
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("goldlifestyle-cart", JSON.stringify(items));
  }, [items, hydrated]);

  const addItem: CartContextType["addItem"] = (product, opts) => {
    setItems((prev) => {
      const key = `${product.id}-${opts?.size ?? ""}-${opts?.color ?? ""}`;
      const idx = prev.findIndex((i) => `${i.product.id}-${i.size ?? ""}-${i.color ?? ""}` === key);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + (opts?.quantity ?? 1) };
        return next;
      }
      trackWhop("add_to_cart", { value: product.price, currency: "USD" });
      return [...prev, { product, quantity: opts?.quantity ?? 1, size: opts?.size, color: opts?.color }];
    });
  };

  const removeItem = (productId: string, size?: string, color?: string) => {
    setItems((prev) => prev.filter((i) => !(i.product.id === productId && i.size === size && i.color === color)));
  };

  const updateQuantity = (productId: string, quantity: number, size?: string, color?: string) => {
    if (quantity <= 0) return removeItem(productId, size, color);
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId && i.size === size && i.color === color ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setItems([]);

  const count = items.reduce((a, b) => a + b.quantity, 0);
  const subtotal = items.reduce((a, b) => a + b.product.price * b.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, count, subtotal, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
