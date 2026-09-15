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

      <div className="flex flex-wrap gap-2 mb-4">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-2 text-[11px] tracking-[0.12em] uppercase border ${filter === f ? "bg-[#131315] text-white border-[#131315]" : "bg-white border-black/10"}`}
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
                <button onClick={() => setOpen(expanded ? null : o.id)} className="w-full flex flex-wrap items-center gap-3 p-4 text-left hover:bg-[#F7F7F5]">
                  <div className="flex-1 min-w-[180px]">
                    <div className="text-[14px] font-medium">{o.email}</div>
                    <div className="text-[11px] text-[#8A8A90]">
                      {o.id.slice(0, 8)} · {o.createdAt ? new Date(o.createdAt).toLocaleString() : ""} · {items.reduce((a, i) => a + i.quantity, 0)} items
                    </div>
                  </div>
                  <StatusBadge status={o.status} />
                  <div className="font-medium text-[15px]">${Number(o.total).toFixed(2)}</div>
                  <span className="text-[#8A8A90]">{expanded ? "▴" : "▾"}</span>
                </button>
                {expanded && (
                  <div className="px-4 pb-5 pt-1 grid md:grid-cols-2 gap-5 bg-[#F7F7F5] border-t border-black/10">
                    <div>
                      <div className="text-[11px] tracking-[0.16em] uppercase font-medium text-[#6E6E73]">Customer</div>
                      <div className="text-[13px] mt-1 leading-6">
                        {o.name}<br />{o.address}<br />{o.city}, {o.zip}<br />{o.country}
                      </div>
                      <div className="text-[11px] tracking-[0.16em] uppercase font-medium text-[#6E6E73] mt-4">Items</div>
                      <div className="mt-1 space-y-2">
                        {items.map((it, i) => (
                          <div key={i} className="flex items-center gap-3 text-[13px]">
                            {it.image && <img src={it.image} alt="" className="w-9 h-11 object-cover bg-white border border-black/10" />}
                            <div className="flex-1 min-w-0">
                              <div className="truncate">{it.name}</div>
                              <div className="text-[11px] text-[#8A8A90]">{[it.color, it.size].filter(Boolean).join(", ")} · qty {it.quantity}</div>
                            </div>
                            <div className="font-medium">${(it.price * it.quantity).toFixed(2)}</div>
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
                        className="mt-1 border border-black/10 bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#131315]"
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
