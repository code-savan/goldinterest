"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SideNav } from "@/components/admin/side-nav";

const TITLES: { href: string; label: string }[] = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/homepage", label: "Homepage" },
  { href: "/admin/discounts", label: "Discounts" },
  { href: "/admin/orders", label: "Orders" },
];

function sectionFor(pathname: string) {
  const match = TITLES.filter((t) => t.href !== "/admin").find(
    (t) => pathname === t.href || pathname.startsWith(t.href + "/")
  );
  return match?.label ?? "Dashboard";
}

export function AdminShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the drawer on every navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="h-dvh flex flex-col lg:grid lg:grid-cols-[260px_minmax(0,1fr)] overflow-hidden">
      {/* Mobile top bar */}
      <header className="lg:hidden shrink-0 z-40 bg-[#131315] border-b border-white/10 safe-pt">
        <div className="flex items-center gap-3 pl-4 pr-2 min-h-[60px]">
          <div className="w-9 h-9 rounded-full border border-[#C9A96E] bg-[#0A0A0A] flex items-center justify-center shrink-0">
            <span className="font-serif text-[14px] tracking-[0.1em] text-[#C9A96E] font-light">G</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[9px] tracking-[0.24em] uppercase text-[#C9A96E] leading-none">Gold Admin</div>
            <div className="text-white text-[15px] font-medium truncate leading-tight mt-0.5">
              {sectionFor(pathname)}
            </div>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            aria-label="View store"
            className="w-11 h-11 flex items-center justify-center text-white/60 hover:text-white shrink-0"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="w-11 h-11 flex flex-col items-center justify-center gap-[5px] text-white shrink-0"
          >
            <span
              className={`block w-5 h-[1.5px] bg-current transition-transform duration-300 ${
                open ? "rotate-45 translate-y-[6.5px]" : ""
              }`}
            />
            <span className={`block w-5 h-[1.5px] bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span
              className={`block w-5 h-[1.5px] bg-current transition-transform duration-300 ${
                open ? "-rotate-45 -translate-y-[6.5px]" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`lg:hidden fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          role="dialog"
          aria-label="Admin navigation"
          className={`absolute inset-y-0 left-0 w-[280px] max-w-[85vw] bg-[#131315] border-r border-white/10 flex flex-col transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center gap-3 px-5 min-h-[60px] border-b border-white/10">
            <div className="w-9 h-9 rounded-full border border-[#C9A96E] bg-[#0A0A0A] flex items-center justify-center shrink-0">
              <span className="font-serif text-[14px] tracking-[0.1em] text-[#C9A96E] font-light">G</span>
            </div>
            <div>
              <div className="font-serif text-[14px] tracking-[0.12em] uppercase text-white leading-none">
                Gold Interest
              </div>
              <div className="text-[9px] tracking-[0.24em] uppercase text-[#C9A96E] mt-1">Admin</div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto py-3">
            <SideNav onNavigate={() => setOpen(false)} />
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col bg-[#131315] border-r border-white/10 h-dvh overflow-y-auto">
        <div className="px-6 pt-8 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-[#C9A96E] bg-[#0A0A0A] flex items-center justify-center shrink-0">
              <span className="font-serif text-[16px] tracking-[0.1em] text-[#C9A96E] font-light">G</span>
            </div>
            <div>
              <div className="font-serif text-[15px] tracking-[0.12em] uppercase text-white">Gold Interest</div>
              <div className="text-[10px] tracking-[0.24em] uppercase text-[#C9A96E]">Admin</div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <SideNav />
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 min-h-0 min-w-0 overflow-y-auto overscroll-contain">
        <div className="px-4 sm:px-6 lg:px-10 py-5 sm:py-8 lg:py-10 pb-24 lg:pb-10 max-w-[1120px] mx-auto safe-pb">
          {children}
        </div>
      </main>
    </div>
  );
}
