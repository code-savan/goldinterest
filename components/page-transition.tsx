"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { WhopPageTracker } from "./whop-pixel";

export const CALM_EASE = [0.32, 0.72, 0, 1] as const;

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <WhopPageTracker />
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [...CALM_EASE] }}
      >
        {children}
      </motion.div>
    </>
  );
}
