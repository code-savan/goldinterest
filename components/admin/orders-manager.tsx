"use client";

import { useMemo, useState } from "react";
import type { orders } from "@/db/schema";
import type { OrderItem } from "@/db/schema";
import { Card, PageTitle, StatusBadge } from "@/components/admin/ui";

type Row = typeof orders.$inferSelect;

const FILTERS = ["all", "pending", "paid", "preparing", "shipped", "delivered", "failed", "refunded", "cancelled"];
const NEXT = ["pending", "paid", "preparing", "shipped", "delivered", "failed", "refunded", "cancelled"];

export function OrdersManager({ initial }: { initial: Row[] }) {
  const [list, setList] = useState<Row[]>(initial);
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState<string | null>(null);

  const filtered = useMemo(() => (filter === "all" ? list : list.filter((o) => o.status === filter)), [list, filter]);

  const setStatus = async (id: string, status: string) => {
    await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setList((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  return (
    <div>
      <PageTitle title="Orders" sub={`${list.length} orders. Paid orders arrive here automatically from Whop.`} />

      <div className="flex gap-2 mb-4 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap pb-1 [scrollbar-width:thin]">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 snap-start min-h-[44px] inline-flex items-center px-4 py-2 text-[11px] tracking-[0.12em] uppercase rounded-lg border ${filter === f ? "bg-[#131315] text-white border-[#131315]" : "bg-white border-black/10"}`}
          >
            {f}
          </button>
        ))}
      </div>

      <Card>
        <div className="divide-y divide-black/[0.06]">
          {filtered.length === 0 && <div className="p-8 text-center text-[13px] text-[#8A8A90]">No orders in this view.</div>}
          {filtered.map((o) => {
            const items = (o.items as OrderItem[]) ?? [];
            const expanded = open === o.id;
            return (
              <div key={o.id}>
                <button onClick={() => setOpen(expanded ? null : o.id)} aria-expanded={expanded} className="w-full flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-3 p-4 text-left hover:bg-[#F7F7F5] min-h-[44px]">
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-medium truncate">{o.email}</div>
                    <div className="text-[11px] text-[#8A8A90] mt-0.5">
                      {o.id.slice(0, 8)} · {o.createdAt ? new Date(o.createdAt).toLocaleString() : ""} · {items.reduce((a, i) => a + i.quantity, 0)} items
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={o.status} />
                    <div className="font-medium text-[15px]">${Number(o.total).toFixed(2)}</div>
                    <span className="text-[#8A8A90] w-6 text-center">{expanded ? "▴" : "▾"}</span>
                  </div>
                </button>
                {expanded && (
                  <div className="px-4 pb-5 pt-1 grid md:grid-cols-2 gap-5 bg-[#F7F7F5] border-t border-black/10">
                    <div>
                      <div className="text-[11px] tracking-[0.16em] uppercase font-medium text-[#6E6E73]">Customer</div>
                      <div className="text-[13px] mt-1 leading-6">
                        {o.name}<br />{o.address}<br />{o.city}, {o.zip}<br />{o.country}
                      </div>
                      <div className="text-[11px] tracking-[0.16em] uppercase font-medium text-[#6E6E73] mt-4">Items</div>
                      <div className="mt-1 space-y-3">
                        {items.map((it, i) => (
                          <div key={i} className="flex items-center gap-3 text-[13px] border border-black/10 bg-white p-2.5">
                            {it.image && <img src={it.image} alt="" className="w-9 h-11 object-cover bg-white border border-black/10 shrink-0" />}
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate">{it.name}</div>
                              <div className="text-[12px] text-[#55555A] mt-0.5 leading-5">
                                Color: {it.color || "—"} · Size: {it.size || "—"} · Qty: {it.quantity}
                              </div>
                            </div>
                            <div className="font-medium shrink-0">${(it.price * it.quantity).toFixed(2)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] tracking-[0.16em] uppercase font-medium text-[#6E6E73]">Payment</div>
                      <div className="text-[13px] mt-1 leading-6">
                        Subtotal ${Number(o.subtotal).toFixed(2)}<br />
                        Discount ${Number(o.discount).toFixed(2)}{o.promoCode ? ` (${o.promoCode})` : ""}<br />
                        <span className="font-medium">Total ${Number(o.total).toFixed(2)} {o.currency}</span><br />
                        {o.whopPaymentId ? <span className="text-[11px] text-[#8A8A90]">Whop payment {o.whopPaymentId}</span> : <span className="text-[11px] text-[#8A8A90]">Not paid through Whop yet</span>}
                      </div>
                      <div className="text-[11px] tracking-[0.16em] uppercase font-medium text-[#6E6E73] mt-4">Status</div>
                      <select
                        value={o.status}
                        onChange={(e) => setStatus(o.id, e.target.value)}
                        className="mt-1 w-full sm:w-auto min-h-[44px] border border-black/10 bg-white rounded-xl px-3 py-2.5 text-[16px] sm:text-sm focus:outline-none focus:border-[#131315]"
                      >
                        {NEXT.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
