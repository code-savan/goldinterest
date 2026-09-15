"use client";

import { useState } from "react";
import { DEFAULT_FAQ, type FaqContent } from "@/lib/site-content";

export function FAQ({ content = DEFAULT_FAQ }: { content?: FaqContent }) {
  const [open, setOpen] = useState<number | null>(0);
  const faqs = content.items;
  if (faqs.length === 0) return null;

  return (
    <section id="faq" className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="grid lg:grid-cols-[380px_1fr] gap-8 lg:gap-12">
        <div className="lg:sticky lg:top-[88px] h-fit">
          <div className="text-[11px] tracking-[0.22em] uppercase text-[#8C6A2F] font-medium">{content.kicker}</div>
          <h2 className="font-serif text-[28px] lg:text-[32px] leading-none tracking-[-0.02em] font-light mt-3">
            {content.titleA} <br />
            <span className="italic">{content.titleAccent}</span>
          </h2>
          <p className="text-[13px] leading-6 text-[#6B6B6B] mt-4">
            {content.sub}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 border border-[#E8E6E1] px-4 py-3 bg-[#F6F5F2] text-xs">
            <span className="w-2 h-2 bg-[#C9A96E] rounded-full" />
            {content.note}
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
