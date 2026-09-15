"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { useCart } from "./cart-context";
import { useWishlist } from "./wishlist-context";
import { categories } from "@/lib/products";
import { DEFAULT_CONTACT } from "@/lib/site-content";

const nav = [
  { label: "Shop", href: "/shop" },
  { label: "Wallpaper Packs", href: "/shop?category=wallpaper-packs" },
  { label: "Apparel", href: "/shop?category=hoodies" },
  { label: "FAQ", href: "#faq" },
];

const mobileLinks = [
  { label: "All Products", href: "/shop", count: "14" },
  ...categories.map((c) => ({ label: c.label, href: c.href, count: c.count.split(" ")[0] })),
  { label: "FAQ", href: "#faq", count: "" },
];

export function Header({ contact = DEFAULT_CONTACT }: { contact?: { email: string; hours: string } }) {
  const { count, setIsOpen } = useCart();
  const { count: wishCount, setIsOpen: setWishOpen } = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-40 bg-[#FCFCF9]/95 backdrop-blur-md border-b border-[#E8E6E1] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${visible ? "translate-y-0 opacity-100 top-[34px]" : "-translate-y-full opacity-0 pointer-events-none top-0"}`}
      >
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 h-[64px] flex items-center justify-between gap-6">
          <Link href="/" className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-9">
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="relative text-[11px] tracking-[0.2em] uppercase font-medium text-[#0A0A0A]/65 hover:text-[#0A0A0A] transition-colors py-1 group"
              >
                {n.label}
                <span className="absolute left-0 -bottom-1 w-full h-px bg-[#C9A96E] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            {/* Wishlist — no box, minimal icon */}
            <button
              onClick={() => setWishOpen(true)}
              aria-label="Wishlist"
              className="relative p-2.5 text-[#0A0A0A] hover:text-[#8C6A2F] transition-colors"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M12 21s-6.5-4.2-8.8-9.1A5.2 5.2 0 0 1 12 5.1a5.2 5.2 0 0 1 8.8 6.8C18.5 16.8 12 21 12 21Z" />
              </svg>
              {wishCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#C9A96E] text-white text-[10px] min-w-[16px] h-[16px] px-1 flex items-center justify-center rounded-full font-medium leading-none">
                  {wishCount}
                </span>
              )}
            </button>

            {/* Cart — no box, minimal icon */}
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Cart"
              className="relative p-2.5 text-[#0A0A0A] hover:text-[#8C6A2F] transition-colors"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M6 7h12l-1 12H7L6 7Z" />
                <path d="M9 7V5a3 3 0 0 1 6 0v2" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#0A0A0A] text-white text-[10px] min-w-[16px] h-[16px] px-1 flex items-center justify-center rounded-full font-medium leading-none">
                  {count}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2.5 text-[#0A0A0A] ml-1"
              aria-label="Menu"
            >
              <div className="space-y-1">
                <div className={`w-5 h-px bg-black transition-all ${mobileOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
                <div className={`w-5 h-px bg-black transition-opacity ${mobileOpen ? "opacity-0" : "opacity-100"}`} />
                <div className={`w-5 h-px bg-black transition-all ${mobileOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav sheet — rendered outside the transformed <header> so `fixed inset-0` covers the viewport */}
      <div className={`md:hidden fixed inset-0 z-[70] ${mobileOpen ? "" : "pointer-events-none"}`} aria-hidden={!mobileOpen}>
        <div
          className={`absolute inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute inset-0 bg-[#FCFCF9] flex flex-col shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${mobileOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
        >
              {/* Top bar */}
              <div className="flex items-center justify-between px-4 sm:px-6 h-[64px] border-b border-[#E8E6E1] shrink-0">
                <Link href="/" onClick={() => setMobileOpen(false)}>
                  <Logo />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-[#0A0A0A]"
                  aria-label="Close menu"
                >
                  <span className="text-[22px] font-light leading-none">✕</span>
                </button>
              </div>

              {/* Links — peak mobile: large serif, airy */}
              <div className="flex-1 overflow-auto px-6 py-8">
                <div className="text-[10px] tracking-[0.24em] uppercase text-[#8C6A2F]/70 font-medium">Menu</div>
                <nav className="mt-4 space-y-1">
                  {mobileLinks.map((l, i) => (
                    <a
                      key={l.label}
                      href={l.href}
                      onClick={() => setMobileOpen(false)}
                      style={{ animationDelay: `${0.08 + i * 0.05}s` }}
                      className={`flex items-baseline justify-between py-3 border-b border-[#E8E6E1]/60 group ${mobileOpen ? "rise-in" : "opacity-0"}`}
                    >
                      <span className="font-serif text-[26px] leading-none tracking-[-0.02em] font-light group-active:text-[#8C6A2F]">{l.label}</span>
                      {l.count && <span className="text-[11px] tracking-[0.14em] text-[#9A9590]">{l.count}</span>}
                    </a>
                  ))}
                </nav>

                <div
                  style={{ animationDelay: "0.35s" }}
                  className={mobileOpen ? "rise-in" : "opacity-0"}
                >
                  <div className="mt-8 grid grid-cols-2 gap-3">
                    <a href="/cart" onClick={() => setMobileOpen(false)} className="border border-[#E8E6E1] bg-white py-3 text-center text-[11px] tracking-[0.16em] uppercase">
                      Bag ({count})
                    </a>
                    <a href="/shop" onClick={() => setMobileOpen(false)} className="bg-[#0A0A0A] text-white py-3 text-center text-[11px] tracking-[0.16em] uppercase">
                      Shop Now
                    </a>
                  </div>

                  <div className="mt-10 pt-8 border-t border-[#E8E6E1]">
                    <div className="text-[11px] tracking-[0.16em] uppercase text-[#8C6A2F]">Get in touch</div>
                    <div className="text-sm text-[#6B6B6B] mt-2 leading-6">
                      {contact.email}
                      <br />
                      <span className="text-[#9A9590]">{contact.hours}</span>
                    </div>
                    <div className="text-[11px] tracking-wide text-[#6B6B6B] mt-6">Free shipping on every order, worldwide</div>
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="px-6 py-4 border-t border-[#E8E6E1] flex items-center justify-between text-[11px] tracking-[0.14em] uppercase text-[#9A9590] bg-[#FCFCF9]">
                <span>© Gold Interest</span>
                <span className="text-[#C9A96E]">Est. 2024</span>
              </div>
        </div>
      </div>
    </>
  );
}
