import type { ReactNode } from "react";

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return <div className="h-dvh overflow-hidden bg-[#F3F3F1] text-[#131315]">{children}</div>;
}
