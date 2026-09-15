"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    whop?: { track: (...args: unknown[]) => void };
  }
}

export function trackWhop(event: string, data?: Record<string, unknown>) {
  try {
    if (typeof window !== "undefined" && window.whop && typeof window.whop.track === "function") {
      if (data) window.whop.track(event, data);
      else window.whop.track(event);
    }
  } catch {}
}

/**
 * Re-fires the pixel's page view on client-side navigation.
 * The snippet in <head> tracks the initial load; Next.js route
 * changes never reload the page, so without this only the
 * landing page would count.
 */
export function WhopPageTracker() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    trackWhop("page");
  }, [pathname]);

  return null;
}
