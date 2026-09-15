"use client";

import { useRouter } from "next/navigation";

export function LogoutButton({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };
  return (
    <button
      onClick={logout}
      className={
        compact
          ? "min-h-[44px] inline-flex items-center text-[11px] tracking-[0.14em] uppercase text-white/70 hover:text-white"
          : "w-full flex items-center gap-3 min-h-[48px] px-4 text-[12px] tracking-[0.12em] uppercase text-white/70 hover:text-white hover:bg-white/5 rounded-xl"
      }
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M14 4H6v16h8M10 12h11M18 8.5 21.5 12 18 15.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Log out
    </button>
  );
}
