"use client";

import { useEffect, useState } from "react";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`w-full bg-[#0A0A0A] text-white text-[11px] tracking-[0.18em] uppercase font-medium fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}`}
    >
      <div className="mx-auto max-w-[1400px] px-4 py-[11px] flex items-center justify-center gap-6 text-center">
        <span className="hidden sm:inline opacity-60">—</span>
        <span>
          Free Shipping — <span className="text-[#C9A96E]">All Orders</span> · Worldwide Delivery
        </span>
        <span className="hidden md:inline-flex items-center gap-2 opacity-80">
          <span className="w-px h-3 bg-white/20" />
          <span className="text-[#C9A96E]">★</span> New: Wallpaper Packs Live
        </span>
        <span className="hidden sm:inline opacity-60">—</span>
      </div>
    </div>
  );
}
