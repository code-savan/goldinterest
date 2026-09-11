"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What do you sell?",
    a: "Wallpaper Packs (3 rolls), Printable Posters (instant download + archival print), Frame Wall Art (solid oak, museum glass), heavyweight Hoodies (450gsm) and Tee Shirts (180gsm organic cotton) — all designed in studio, free shipping on every order.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes — we ship worldwide from Barcelona. EU delivery is 3–5 business days, worldwide 6–12 days. Free shipping — all orders worldwide. Duties are included for EU orders; outside the EU duties/taxes are calculated at checkout.",
  },
  {
    q: "What is your return and refund policy?",
    a: "All sales are final — we operate a strict no-return policy. No returns or exchanges for change of mind, wrong size, or color. We only accept replacements/refunds for items that arrive damaged, defective, or incorrectly fulfilled. You must contact us within 48 hours of delivery with photos. See our Returns & Refunds page for full details.",
  },
  {
    q: "What about phone support?",
    a: "Reach us at +34 900 123 456 or hello@goldlifestyle.com, Mon–Fri 10:00–18:00 CET. We typically reply within 24 hours. For urgent damaged-goods claims, please email with order number and photos.",
  },
  {
    q: "How do I choose size & care for products?",
    a: "Apparel is unisex and garment-dyed. Check the size guide on each product page (S–3XL: Length 28″–33″ / Width 18″–28″ with cm toggle). Wallpaper Packs are paste-the-wall — no soaking, wipeable Printer Star finish. Printable Posters ship rolled or as instant download. Frame Wall Art is ready to hang.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="grid lg:grid-cols-[380px_1fr] gap-8 lg:gap-12">
        <div className="lg:sticky lg:top-[88px] h-fit">
          <div className="text-[11px] tracking-[0.22em] uppercase text-[#8C6A2F] font-medium">FAQ</div>
          <h2 className="font-serif text-[28px] lg:text-[32px] leading-none tracking-[-0.02em] font-light mt-3">
            Frequently <br />
            <span className="italic">Asked</span>
          </h2>
          <p className="text-[13px] leading-6 text-[#6B6B6B] mt-4">
            Everything you need to know before you order. Still unsure? Email us — we answer every message.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 border border-[#E8E6E1] px-4 py-3 bg-[#F6F5F2] text-xs">
            <span className="w-2 h-2 bg-[#C9A96E] rounded-full" />
            No returns — all sales final. See details inside.
          </div>
        </div>

        <div className="divide-y divide-[#E8E6E1] border-y border-[#E8E6E1] bg-white">
          {faqs.map((f, i) => (
            <div key={f.q} className="py-1">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-6 py-5 text-left"
              >
                <span className="text-[14px] font-medium leading-tight pr-4">{f.q}</span>
                <span className={`w-8 h-8 border flex items-center justify-center shrink-0 transition-colors ${open === i ? "bg-[#0A0A0A] text-white border-[#0A0A0A]" : "border-[#E8E6E1] bg-white"}`}>
                  {open === i ? "−" : "+"}
                </span>
              </button>
              {open === i && <div className="pb-6 pr-12 text-[13px] leading-6 text-[#6B6B6B]">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
