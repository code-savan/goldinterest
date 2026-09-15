"use client";

import dynamic from "next/dynamic";

// Interaction-only UI. Split into separate chunks that load after
// hydration instead of blocking first paint.
const CartDrawer = dynamic(() => import("@/components/cart-drawer").then((m) => m.CartDrawer), {
  ssr: false,
});
const WishlistDrawer = dynamic(
  () => import("@/components/wishlist-drawer").then((m) => m.WishlistDrawer),
  { ssr: false }
);

export function DeferredDrawers() {
  return (
    <>
      <CartDrawer />
      <WishlistDrawer />
    </>
  );
}
