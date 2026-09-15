"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { WhopPageTracker } from "./whop-pixel";

export const CALM_EASE = [0.32, 0.72, 0, 1] as const;

/** Route fade via CSS keyframes — no animation library in the critical path. */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <WhopPageTracker />
      <div key={pathname} className="page-enter">
        {children}
      </div>
    </>
  );
}
