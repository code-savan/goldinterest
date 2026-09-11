"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Product } from "@/lib/products";

type WishlistContextType = {
  items: Product[];
  toggle: (product: Product) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
  count: number;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  clear: () => void;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("goldlifestyle-wishlist");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {}
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("goldlifestyle-wishlist", JSON.stringify(items));
  }, [items, hydrated]);

  const toggle = (product: Product) => {
    setItems((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev.filter((p) => p.id !== product.id);
      return [...prev, product];
    });
  };

  const remove = (id: string) => setItems((prev) => prev.filter((p) => p.id !== id));
  const has = (id: string) => items.some((p) => p.id === id);
  const clear = () => setItems([]);
  const count = items.length;

  return (
    <WishlistContext.Provider value={{ items, toggle, remove, has, count, isOpen, setIsOpen, clear }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
