import type { ButtonHTMLAttributes, ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white border border-black/[0.07] rounded-2xl shadow-[0_1px_2px_rgba(19,19,21,0.05)] ${className}`}>
      {children}
    </div>
  );
}

export function PageTitle({ title, sub, action }: { title: string; sub?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-end sm:justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
      <div className="min-w-0">
        <h1 className="font-serif text-[26px] sm:text-[30px] lg:text-[34px] leading-tight sm:leading-none font-light tracking-tight">{title}</h1>
        {sub && <p className="text-[13px] text-[#6E6E73] mt-1.5 sm:mt-2 leading-5">{sub}</p>}
      </div>
      {action && <div className="w-full sm:w-auto shrink-0">{action}</div>}
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] tracking-[0.14em] uppercase font-medium text-[#6E6E73]">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

export const inputCls =
  "w-full min-h-[44px] border border-black/10 bg-white rounded-xl px-3.5 py-2.5 text-[16px] sm:text-sm focus:outline-none focus:border-[#131315] focus:ring-2 focus:ring-[#C9A96E]/25";

export function PrimaryButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center text-center w-full sm:w-auto min-h-[44px] bg-[#131315] text-white rounded-xl px-6 py-3 text-[11px] tracking-[0.16em] uppercase font-medium hover:bg-black disabled:opacity-50 transition-colors ${props.className || ""}`}
    >
      {children}
    </button>
  );
}

export function GhostButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center text-center min-h-[44px] border border-black/10 bg-white rounded-xl px-5 py-2.5 text-[11px] tracking-[0.14em] uppercase hover:border-[#131315] disabled:opacity-50 transition-colors ${props.className || ""}`}
    >
      {children}
    </button>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "bg-[#F3E7CF] text-[#7A5A1E]",
    paid: "bg-[#DCE9FD] text-[#1D4FA3]",
    preparing: "bg-[#E7DFFA] text-[#5B3BAE]",
    shipped: "bg-[#FCEBC8] text-[#92610A]",
    delivered: "bg-[#D9F0DF] text-[#1E7A3C]",
    failed: "bg-[#FADDD8] text-[#B3261E]",
    refunded: "bg-black/[0.06] text-[#55555A]",
    cancelled: "bg-black/[0.06] text-[#8A8A90]",
  };
  return (
    <span className={`inline-block px-3 py-1 text-[11px] tracking-[0.08em] uppercase font-medium rounded-full ${map[status] || "bg-black/[0.06] text-[#55555A]"}`}>
      {status}
    </span>
  );
}
