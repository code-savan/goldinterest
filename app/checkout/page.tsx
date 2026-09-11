"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart-context";
import { PaymentIcons } from "@/components/payment-icons";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const shipping = 0; // free for all orders
  const total = subtotal + shipping;
  const [form, setForm] = useState({ email: "", name: "", address: "", city: "", zip: "", country: "Spain", payment: "card" });

  if (placed) {
    return (
      <div className="mx-auto max-w-[700px] px-6 lg:px-8 py-16 text-center">
        <div className="w-12 h-12 mx-auto rounded-full bg-[#C9A96E] flex items-center justify-center text-white text-xl">✓</div>
        <h1 className="font-serif text-[32px] font-light mt-4">Order Confirmed</h1>
        <p className="text-[13px] leading-6 text-[#6B6B6B] mt-3 max-w-[480px] mx-auto">
          Thank you — your order is confirmed. A confirmation email has been sent to <span className="text-black font-medium">{form.email || "your email"}</span>. All sales are final.
        </p>
        <div className="mt-6 border border-[#E8E6E1] bg-[#F6F5F2] p-6 text-left text-sm">
          <div className="font-medium">Order summary — ${total.toFixed(2)} · Free Shipping · Worldwide Delivery</div>
          <div className="text-xs text-[#6B6B6B] mt-1">Tracking will be sent within 24h. Questions? hello@goldlifestyle.com</div>
        </div>
        <Link href="/shop" className="inline-block mt-8 bg-[#0A0A0A] text-white px-8 py-4 text-[11px] tracking-[0.18em] uppercase">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8 py-16 text-center">
        <h1 className="font-serif text-3xl font-light">Checkout</h1>
        <p className="text-sm text-[#6B6B6B] mt-2">Your bag is empty — add products to checkout.</p>
        <Link href="/shop" className="inline-block mt-6 bg-[#0A0A0A] text-white px-8 py-4 text-[11px] tracking-[0.18em] uppercase">
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <div className="flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-[#6B6B6B]">
        <Link href="/cart" className="hover:text-black underline">
          Bag
        </Link>
        <span>→</span>
        <span className="text-black">Checkout</span>
      </div>
      <h1 className="font-serif text-[32px] lg:text-[36px] font-light mt-3 tracking-tight">Checkout</h1>
      <p className="text-[13px] text-[#6B6B6B] mt-1">Free shipping — all orders. All sales final — no returns.</p>

      <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-12 mt-8">
        {/* Form */}
        <div className="space-y-8 bg-white border border-[#E8E6E1] p-6 lg:p-8">
          <div>
            <h2 className="text-[11px] tracking-[0.18em] uppercase font-medium">Contact & Shipping</h2>
            <div className="grid gap-4 mt-4">
              <input placeholder="Email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="border border-[#E8E6E1] px-4 py-3 text-sm focus:outline-none focus:border-[#0A0A0A]" />
              <input placeholder="Full name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border border-[#E8E6E1] px-4 py-3 text-sm focus:outline-none focus:border-[#0A0A0A]" />
              <input placeholder="Address *" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="border border-[#E8E6E1] px-4 py-3 text-sm focus:outline-none focus:border-[#0A0A0A]" />
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="City *" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="border border-[#E8E6E1] px-4 py-3 text-sm focus:outline-none focus:border-[#0A0A0A]" />
                <input placeholder="ZIP / Postal *" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} className="border border-[#E8E6E1] px-4 py-3 text-sm focus:outline-none focus:border-[#0A0A0A]" />
              </div>
              <select value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="border border-[#E8E6E1] px-4 py-3 text-sm bg-white">
                <option>Spain</option>
                <option>France</option>
                <option>Germany</option>
                <option>United Kingdom</option>
                <option>United States</option>
                <option>Other</option>
              </select>
              <div className="text-[11px] text-[#8C6A2F] bg-[#F5E6C8] border border-[#E8DCC6] px-3 py-2">✓ Free shipping — all orders worldwide. EU 3–5 days, worldwide 6–12 days.</div>
            </div>
          </div>

          <div className="border-t border-[#E8E6E1] pt-8">
            <h2 className="text-[11px] tracking-[0.18em] uppercase font-medium">Payment</h2>
            <div className="flex gap-2 mt-4">
              {[
                { id: "card", label: "Card" },
                { id: "paypal", label: "PayPal" },
                { id: "apple", label: "Apple Pay" },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setForm({ ...form, payment: p.id })}
                  className={`flex-1 py-3 text-[11px] tracking-[0.14em] uppercase font-medium border ${form.payment === p.id ? "bg-[#0A0A0A] text-white border-[#0A0A0A]" : "bg-white border-[#E8E6E1]"}`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            {form.payment === "card" && (
              <div className="grid gap-3 mt-4">
                <input placeholder="Card number" className="border border-[#E8E6E1] px-4 py-3 text-sm" />
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="MM / YY" className="border border-[#E8E6E1] px-4 py-3 text-sm" />
                  <input placeholder="CVC" className="border border-[#E8E6E1] px-4 py-3 text-sm" />
                </div>
              </div>
            )}
            <div className="mt-4">
              <PaymentIcons />
            </div>
            <p className="text-[11px] text-[#9A9590] mt-3">All transactions encrypted. We never store card details. By placing your order you agree to our Terms and confirm all sales are final.</p>
          </div>

          <button
            onClick={() => {
              if (!form.email || !form.name || !form.address) return alert("Please fill email, name and address.");
              setPlaced(true);
              clearCart();
            }}
            className="w-full bg-[#0A0A0A] text-white py-4 text-[11px] tracking-[0.18em] uppercase font-medium hover:bg-[#1A1A1A] transition-colors"
          >
            Place Order — ${total.toFixed(2)}
          </button>
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-[88px] h-fit space-y-6">
          <div className="border border-[#E8E6E1] bg-[#F6F5F2] p-6">
            <h2 className="text-[11px] tracking-[0.18em] uppercase font-medium">Order Summary</h2>
            <div className="divide-y divide-[#E8E6E1] mt-4">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-3 py-3">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-20 object-cover bg-white border border-[#E8E6E1]" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] leading-tight line-clamp-2">{item.product.name}</div>
                    <div className="text-[11px] text-[#6B6B6B] mt-1">
                      {[item.color, item.size].filter(Boolean).join(" · ")} · ×{item.quantity}
                    </div>
                  </div>
                  <div className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div className="space-y-2 mt-4 text-sm border-t border-[#E8E6E1] pt-4">
              <div className="flex justify-between">
                <span className="text-[#6B6B6B]">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B6B6B]">Shipping</span>
                <span className="text-[#8C6A2F] font-medium">Free</span>
              </div>
              <div className="flex justify-between text-base font-medium border-t border-[#E8E6E1] pt-3">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <div className="text-[11px] text-[#6B6B6B] mt-3">Free shipping — all orders. Duties included for EU.</div>
          </div>

          <div className="border border-[#E8E6E1] bg-white p-6 text-[12px] leading-5 text-[#6B6B6B]">
            <div className="font-medium text-black text-[11px] tracking-[0.14em] uppercase">Need help?</div>
            <div className="mt-2">hello@goldlifestyle.com · +34 900 123 456 · Mon–Fri 10–18 CET</div>
            <div className="mt-2">All sales final — no returns. Damaged/defective only within 48h — see Returns.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
