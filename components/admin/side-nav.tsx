"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/components/admin/logout-button";

const links = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/products", label: "Products", exact: false },
  { href: "/admin/homepage", label: "Homepage", exact: false },
  { href: "/admin/discounts", label: "Discounts", exact: false },
  { href: "/admin/orders", label: "Orders", exact: false },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <>
      <div className="hidden lg:block px-6 pt-8 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#C9A96E] flex items-center justify-center shrink-0">
            <span className="font-serif text-base text-[#131315]">G</span>
          </div>
          <div>
            <div className="font-serif text-[15px] tracking-[0.12em] uppercase text-white">Gold Lifestyle</div>
            <div className="text-[10px] tracking-[0.24em] uppercase text-[#C9A96E]">Admin</div>
          </div>
        </div>
      </div>
      <nav className="flex lg:flex-col gap-1 px-3 lg:px-4 overflow-x-auto w-full">
        {links.map((l) => {
          const active = l.exact ? pathname === l.href : pathname === l.href || pathname.startsWith(l.href + "/");
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`relative shrink-0 px-4 py-2.5 text-[12px] tracking-[0.12em] uppercase rounded-lg whitespace-nowrap transition-colors ${
                active ? "text-white bg-white/[0.08]" : "text-white/55 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-full bg-[#C9A96E]" />}
              {l.label}
            </Link>
          );
        })}
      </nav>
      <div className="hidden lg:block mt-auto p-4 space-y-1">
        <a
          href="/"
          target="_blank"
          className="block px-4 py-2.5 text-[12px] tracking-[0.12em] uppercase text-white/55 hover:text-white hover:bg-white/[0.05] rounded-lg"
        >
          View store
        </a>
        <LogoutButton />
      </div>
    </>
  );
}
