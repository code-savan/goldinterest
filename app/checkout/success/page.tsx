"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/components/cart-context";

export default function CheckoutSuccessPage() {
  return (
    <Suspense>
      <SuccessInner />
    </Suspense>
  );
}

function SuccessInner() {
  const params = useSearchParams();
  const orderId = params.get("order") || "";
  const { clearCart } = useCart();
  const [status, setStatus] = useState("checking");
  const [total, setTotal] = useState<string | null>(null);
  const cleared = useRef(false);

  useEffect(() => {
    if (!orderId) {
      setStatus("missing");
      return;
    }
    let tries = 0;
    const poll = async () => {
      tries += 1;
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        const data = await res.json().catch(() => ({}));
        if (res.ok) {
          setStatus(data.status);
          setTotal(Number(data.total).toFixed(2));
          if (["paid", "preparing", "shipped", "delivered"].includes(data.status) && !cleared.current) {
            cleared.current = true;
            clearCart();
          }
          if (["paid", "preparing", "shipped", "delivered", "failed", "refunded", "cancelled"].includes(data.status)) return;
        }
      } catch {}
      if (tries < 40) setTimeout(poll, 2500);
      else setStatus((s) => (s === "checking" || s === "pending" ? "slow" : s));
    };
    poll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const paid = ["paid", "preparing", "shipped", "delivered"].includes(status);

  return (
    <div className="mx-auto max-w-[700px] px-6 lg:px-8 py-16 text-center">
      {paid ? (
        <>
          <div className="w-12 h-12 mx-auto rounded-full bg-[#C9A96E] flex items-center justify-center text-white text-xl">✓</div>
          <h1 className="font-serif text-[32px] font-light mt-4">Order Confirmed</h1>
          <p className="text-[13px] leading-6 text-[#6B6B6B] mt-3 max-w-[480px] mx-auto">
            Thank you. Your payment went through{total ? ` (${total} USD)` : ""} and a confirmation email is on its way. All sales are final.
          </p>
          <div className="mt-6 border border-[#E8E6E1] bg-[#F6F5F2] p-6 text-left text-sm">
            <div className="font-medium">Order {orderId.slice(0, 8)} · Free shipping · Worldwide delivery</div>
            <div className="text-xs text-[#6B6B6B] mt-1">Tracking will be sent within 24 hours. Questions? Email hello@goldlifestyle.com</div>
          </div>
        </>
      ) : status === "failed" ? (
        <>
          <h1 className="font-serif text-[32px] font-light mt-4">Payment did not go through</h1>
          <p className="text-[13px] leading-6 text-[#6B6B6B] mt-3">No charge was made. Please try checkout again.</p>
        </>
      ) : status === "missing" ? (
        <>
          <h1 className="font-serif text-[32px] font-light mt-4">No order found</h1>
          <p className="text-[13px] leading-6 text-[#6B6B6B] mt-3">This confirmation link is missing its order reference.</p>
        </>
      ) : (
        <>
          <div className="w-12 h-12 mx-auto rounded-full border border-[#E8E6E1] flex items-center justify-center">
            <span className="w-4 h-4 rounded-full border-2 border-[#C9A96E] border-t-transparent animate-spin" />
          </div>
          <h1 className="font-serif text-[32px] font-light mt-4">Confirming your payment</h1>
          <p className="text-[13px] leading-6 text-[#6B6B6B] mt-3 max-w-[480px] mx-auto">
            {status === "slow"
              ? "This is taking longer than usual. Your payment may still confirm, check your email or contact us with your order reference."
              : "Give us a moment while Whop confirms your payment."}
          </p>
          {orderId && <div className="text-[11px] text-[#9A9590] mt-2">Order {orderId.slice(0, 8)}</div>}
        </>
      )}
      <Link href="/shop" className="inline-block mt-8 bg-[#0A0A0A] text-white px-8 py-4 text-[11px] tracking-[0.18em] uppercase">
        Continue Shopping
      </Link>
    </div>
  );
}
