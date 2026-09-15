"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What do you sell?",
    a: "Wallpaper packs with 3 rolls, printable posters as instant downloads with an archival print option, framed wall art in solid oak with museum glass, heavyweight hoodies in 450gsm cotton and tee shirts in 180gsm organic cotton. Everything is designed in our studio and ships free.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, we ship worldwide from Barcelona. Delivery is 3 to 5 business days in the EU and 6 to 12 days worldwide. Shipping is free on every order. Duties are included for EU orders. Outside the EU, duties and taxes are calculated at checkout.",
  },
  {
    q: "What is your return and refund policy?",
    a: "All sales are final, so we do not offer returns or exchanges for change of mind, wrong size or color choice. We only replace or refund items that arrive damaged, defective or incorrectly fulfilled. Please contact us within 48 hours of delivery with photos. See our Returns and Refunds page for full details.",
  },
  {
    q: "How can I reach support?",
    a: "Email us at hello@goldinterest.com, Monday to Friday, 10am to 6pm CET. We usually reply within 24 hours. For damaged orders, please include your order number and photos.",
  },
  {
    q: "How do I choose a size and care for products?",
    a: "Our apparel is unisex and garment dyed. Check the size guide on each product page, from S to 3XL, with inch and cm options. Wallpaper pastes straight to the wall with no soaking and wipes clean with a damp cloth. Posters ship rolled in a tube or as an instant download. Framed art arrives ready to hang.",
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
            Everything you need to know before you order. Still unsure? Email us, we answer every message.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 border border-[#E8E6E1] px-4 py-3 bg-[#F6F5F2] text-xs">
            <span className="w-2 h-2 bg-[#C9A96E] rounded-full" />
            All sales final. See details inside.
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
