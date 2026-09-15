"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart-context";
import { PaymentIcons } from "@/components/payment-icons";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [form, setForm] = useState({ email: "", name: "", address: "", city: "", zip: "", country: "United States" });
  const [promoCode, setPromoCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8 py-16 text-center">
        <h1 className="font-serif text-[24px] font-light">Checkout</h1>
        <p className="text-sm text-[#6B6B6B] mt-2">Your bag is empty. Add products to checkout.</p>
        <Link href="/shop" className="inline-block mt-6 bg-[#0A0A0A] text-white px-8 py-4 text-[11px] tracking-[0.18em] uppercase">
          Go to Shop
        </Link>
      </div>
    );
  }

  const pay = async () => {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form,
          promoCode,
          items: items.map((i) => ({ id: i.product.id, size: i.size, color: i.color, quantity: i.quantity })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.purchaseUrl) {
        setError(data.error || "Could not start the payment. Please try again.");
        setBusy(false);
        return;
      }
      window.location.href = data.purchaseUrl;
    } catch {
      setError("Something went wrong. Please try again.");
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8 lg:py-14">
      <div className="flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-[#6B6B6B]">
        <Link href="/cart" className="hover:text-black underline">
          Bag
        </Link>
        <span>→</span>
        <span className="text-black">Checkout</span>
      </div>
      <h1 className="font-serif text-[28px] lg:text-[36px] font-light mt-3 tracking-tight">Checkout</h1>
      <p className="text-[13px] text-[#6B6B6B] mt-1">Free shipping on every order. All sales final.</p>

      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12 mt-6">
        <div className="space-y-6 bg-white border border-[#E8E6E1] p-5 lg:p-8 h-fit">
          <div>
            <h2 className="text-[11px] tracking-[0.18em] uppercase font-medium">Contact and shipping</h2>
            <p className="text-[12px] text-[#6B6B6B] mt-1">We collect your shipping details here. Payment happens securely through Whop.</p>
            <div className="grid gap-3 mt-4">
              <input placeholder="Email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="border border-[#E8E6E1] px-4 py-3.5 text-sm focus:outline-none focus:border-[#0A0A0A]" />
              <input placeholder="Full name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border border-[#E8E6E1] px-4 py-3.5 text-sm focus:outline-none focus:border-[#0A0A0A]" />
              <input placeholder="Address *" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="border border-[#E8E6E1] px-4 py-3.5 text-sm focus:outline-none focus:border-[#0A0A0A]" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input placeholder="City *" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="border border-[#E8E6E1] px-4 py-3.5 text-sm focus:outline-none focus:border-[#0A0A0A]" />
                <input placeholder="ZIP / Postal *" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} className="border border-[#E8E6E1] px-4 py-3.5 text-sm focus:outline-none focus:border-[#0A0A0A]" />
              </div>
              <select value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="border border-[#E8E6E1] px-4 py-3.5 text-sm bg-white">
                <option>United States</option>
                <option>Spain</option>
                <option>France</option>
                <option>Germany</option>
                <option>United Kingdom</option>
                <option>Other</option>
              </select>
              <div className="text-[11px] text-[#8C6A2F] bg-[#F5E6C8] border border-[#E8DCC6] px-3 py-2">Free shipping on every order, worldwide. EU delivery in 3 to 5 days, worldwide in 6 to 12 days.</div>
            </div>
          </div>

          <div className="border-t border-[#E8E6E1] pt-6">
            <h2 className="text-[11px] tracking-[0.18em] uppercase font-medium">Discount code</h2>
            <div className="flex gap-2 mt-3">
              <input
                placeholder="Enter code (optional)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                className="flex-1 border border-[#E8E6E1] px-4 py-3.5 text-sm uppercase focus:outline-none focus:border-[#0A0A0A]"
              />
            </div>
          </div>

          {error && <div className="text-[12px] text-red-700 bg-red-50 border border-red-200 px-3 py-2">{error}</div>}

          <button
            onClick={pay}
            disabled={busy}
            className="w-full bg-[#0A0A0A] text-white py-4 text-[11px] tracking-[0.18em] uppercase font-medium hover:bg-[#1A1A1A] transition-colors disabled:opacity-60"
          >
            {busy ? "Starting secure payment" : `Pay $${subtotal.toFixed(2)} with Whop`}
          </button>
          <div className="mt-4">
            <PaymentIcons />
          </div>
          <p className="text-[11px] text-[#9A9590] mt-3">You will be redirected to Whop to complete payment. By ordering you agree to our Terms and confirm all sales are final.</p>
        </div>

        <div className="space-y-6">
          <div className="border border-[#E8E6E1] bg-[#F6F5F2] p-6">
            <h2 className="text-[11px] tracking-[0.18em] uppercase font-medium">Order Summary</h2>
            <div className="divide-y divide-[#E8E6E1] mt-4">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-3 py-3">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-20 object-cover bg-white border border-[#E8E6E1]" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] leading-tight line-clamp-2">{item.product.name}</div>
                    <div className="text-[11px] text-[#6B6B6B] mt-1">
                      {[item.color, item.size].filter(Boolean).join(", ")}, qty {item.quantity}
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
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
            <div className="text-[11px] text-[#6B6B6B] mt-3">Discounts apply on the next step. Duties included for the EU.</div>
          </div>

          <div className="border border-[#E8E6E1] bg-white p-6 text-[12px] leading-5 text-[#6B6B6B]">
            <div className="font-medium text-black text-[11px] tracking-[0.14em] uppercase">Need help?</div>
            <div className="mt-2">hello@goldlifestyle.com, Mon to Fri, 10am to 6pm CET</div>
            <div className="mt-2">All sales final. Only damaged or defective items qualify within 48 hours, see Returns.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
