"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-context";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, clearCart } = useCart();
  const shipping = 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8 py-16 text-center">
        <h1 className="font-serif text-[24px] font-light">Your bag is empty</h1>
        <p className="text-[#6B6B6B] mt-2">Discover our wallpapers, posters and apparel.</p>
        <Link href="/#shop" className="inline-block mt-6 bg-[#0A0A0A] text-white px-8 py-4 text-[11px] tracking-[0.18em] uppercase">
          Shop All Products
        </Link>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 mt-14 text-left">
          {products.slice(0, 3).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-6 lg:px-8 py-10">
      <h1 className="font-serif text-[24px] lg:text-[28px] font-light">Your Bag</h1>
      <p className="text-[13px] text-[#6B6B6B] mt-1">Free shipping on every order. All sales final.</p>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-8 mt-6">
        <div className="space-y-3">
          {items.map((item) => (
            <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-3 p-4 border border-[#E8E6E1] bg-white">
              <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-24 object-cover bg-[#F6F5F2] shrink-0" />
              <div className="flex-1 min-w-0">
                <Link href={`/product/${item.product.slug}`} className="font-medium text-sm hover:underline">
                  {item.product.name}
                </Link>
                <div className="text-xs text-[#6B6B6B] mt-1">
                  {[item.color, item.size].filter(Boolean).join(", ")}, {item.product.category}
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center border border-[#E8E6E1]">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.size, item.color)} className="w-10 h-10 hover:bg-[#F6F5F2] flex items-center justify-center text-base">−</button>
                    <span className="w-10 text-center text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.size, item.color)} className="w-10 h-10 hover:bg-[#F6F5F2] flex items-center justify-center text-base">+</button>
                  </div>
                  <button onClick={() => removeItem(item.product.id, item.size, item.color)} className="text-[11px] tracking-[0.14em] uppercase underline">
                    Remove
                  </button>
                </div>
              </div>
              <div className="text-right self-center">
                <div className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</div>
                <div className="text-xs text-[#6B6B6B]">${item.product.price.toFixed(2)} each</div>
              </div>
            </div>
          ))}
          <button onClick={clearCart} className="text-[11px] tracking-[0.16em] uppercase underline">
            Clear Bag
          </button>
        </div>

        <div className="border border-[#E8E6E1] bg-white p-6 h-fit order-first lg:order-last lg:sticky lg:top-[88px]">
          <h2 className="text-[11px] tracking-[0.18em] uppercase font-medium">Order Summary</h2>
          <div className="space-y-3 mt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-[#6B6B6B]">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B6B6B]">Shipping</span>
              <span className="text-[#8C6A2F] font-medium">Free</span>
            </div>
            <div className="flex justify-between border-t border-[#E8E6E1] pt-3 font-medium text-base">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <Link href="/checkout" className="block w-full mt-6 bg-[#0A0A0A] text-white py-4 text-[11px] tracking-[0.18em] uppercase font-medium hover:bg-[#1A1A1A] text-center">
            Checkout, ${total.toFixed(2)}
          </Link>
          <div className="text-[11px] text-[#6B6B6B] text-center mt-3">Secure checkout. All sales final.</div>
          <Link href="/#shop" className="block text-center mt-4 text-[11px] tracking-[0.16em] uppercase underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
