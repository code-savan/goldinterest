"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/components/admin/logout-button";

const links = [
  {
    href: "/admin",
    label: "Dashboard",
    exact: true,
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    href: "/admin/products",
    label: "Products",
    exact: false,
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M6 7h12l-1.2 12.2a1 1 0 0 1-1 .8H8.2a1 1 0 0 1-1-.8L6 7Z" strokeLinejoin="round" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/admin/homepage",
    label: "Homepage",
    exact: false,
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 10.5 12 4l8 6.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 9.5V19h12V9.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/admin/discounts",
    label: "Discounts",
    exact: false,
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 4h7l9 9-7 7-9-9V4Z" strokeLinejoin="round" />
        <circle cx="9" cy="9" r="1.4" />
      </svg>
    ),
  },
  {
    href: "/admin/orders",
    label: "Orders",
    exact: false,
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 7h16v11a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18V7Z" strokeLinejoin="round" />
        <path d="M4 7l1.5-3h13L20 7M8.5 11h7" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function SideNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      <nav className="flex flex-col gap-1 px-4" aria-label="Admin">
        <div className="px-2 pb-2 text-[10px] tracking-[0.22em] uppercase text-white/35">Manage</div>
        {links.map((l) => {
          const active = l.exact ? pathname === l.href : pathname === l.href || pathname.startsWith(l.href + "/");
          return (
            <Link
              key={l.href}
              href={l.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`relative flex items-center gap-3 min-h-[48px] px-4 text-[12px] tracking-[0.12em] uppercase rounded-xl whitespace-nowrap transition-colors ${
                active ? "text-white bg-white/[0.08]" : "text-white/55 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              {active && <span className="absolute left-1 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-full bg-[#C9A96E]" />}
              <span className={active ? "text-[#C9A96E]" : "text-white/45"}>{l.icon}</span>
              {l.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto px-4 pt-4 pb-2 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          onClick={onNavigate}
          className="flex items-center gap-3 min-h-[48px] px-4 text-[12px] tracking-[0.12em] uppercase text-white/55 hover:text-white hover:bg-white/[0.05] rounded-xl"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          View store
        </a>
        <LogoutButton />
      </div>
    </div>
  );
}
