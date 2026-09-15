import type { ReactNode } from "react";
import { SideNav } from "@/components/admin/side-nav";
import { LogoutButton } from "@/components/admin/logout-button";

export default function AdminPanelLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-dvh flex flex-col lg:grid lg:grid-cols-[248px_1fr] overflow-hidden">
      <aside className="shrink-0 bg-[#131315] lg:h-dvh lg:overflow-y-auto flex lg:flex-col items-center lg:items-stretch gap-1 lg:gap-0 py-2 lg:py-0 border-b lg:border-b-0 lg:border-r border-white/10">
        <div className="lg:hidden px-3 font-serif text-[13px] tracking-[0.14em] uppercase text-white whitespace-nowrap">
          Gold Admin
        </div>
        <div className="flex-1 min-w-0 flex lg:flex-col w-full">
          <SideNav />
        </div>
        <div className="lg:hidden px-2 shrink-0">
          <LogoutButton compact />
        </div>
      </aside>
      <main className="flex-1 min-h-0 overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-10 max-w-[1120px] mx-auto">{children}</div>
      </main>
    </div>
  );
}
