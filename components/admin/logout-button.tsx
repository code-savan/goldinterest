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
          ? "text-[11px] tracking-[0.14em] uppercase text-white/70 hover:text-white"
          : "w-full text-left px-4 py-2.5 text-[12px] tracking-[0.12em] uppercase text-white/70 hover:text-white hover:bg-white/5 rounded-sm"
      }
    >
      Log out
    </button>
  );
}
