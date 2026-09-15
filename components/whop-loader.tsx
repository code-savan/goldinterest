"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const WHOP_SRC = "https://t.whop.tw/s.js";
const WHOP_SCOPE = "biz_FKFNrDl1t7K3Cn";
const IDLE_FALLBACK_MS = 5000;

type WhopStub = { q: unknown[][]; track: (...args: unknown[]) => void };

function getWhop(): WhopStub | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { whop?: WhopStub }).whop;
}

/** Minimal queue stub — mirrors what the Whop snippet installs, minus the download. */
function ensureStub() {
  if (typeof window === "undefined") return;
  const w = window as unknown as { whop?: WhopStub };
  if (w.whop) return;
  const queue: unknown[][] = [];
  w.whop = {
    q: queue,
    track(...args: unknown[]) {
      queue.push([Date.now(), ...args]);
    },
  };
}

function inject() {
  if (typeof document === "undefined") return;
  if (document.querySelector('script[data-whop-pixel]')) return;
  const s = document.createElement("script");
  s.async = true;
  s.dataset.whopPixel = "1";
  s.src = WHOP_SRC;
  document.head.appendChild(s);
}

/**
 * Loads the Whop tracker without blocking the critical window.
 * Cart/checkout get it immediately (conversion tracking matters there);
 * everywhere else it waits for an idle moment so landing pages stay fast.
 * Page-view events queued before load are replayed by the tracker.
 */
export function WhopLoader() {
  const pathname = usePathname();

  useEffect(() => {
    ensureStub();
    try {
      getWhop()?.track("setScope", WHOP_SCOPE);
      getWhop()?.track("page");
    } catch {}

    const hot = pathname.startsWith("/cart") || pathname.startsWith("/checkout");
    if (hot) {
      inject();
      return;
    }
    let timer: number | undefined;
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback;
    if (typeof ric === "function") {
      const id = ric.call(window, inject, { timeout: 8000 });
      return () => (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(id);
    }
    timer = window.setTimeout(inject, IDLE_FALLBACK_MS);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}
