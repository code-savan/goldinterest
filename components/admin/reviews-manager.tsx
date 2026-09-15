"use client";

import { useMemo, useState } from "react";
import { Card, PageTitle, StatusBadge } from "@/components/admin/ui";

type Review = {
  id: string;
  productId: string;
  productName: string | null;
  name: string;
  email: string | null;
  rating: number;
  body: string;
  anonymous: boolean;
  active: boolean;
  createdAt: string | null;
};

function Stars({ value }: { value: number }) {
  return (
    <span className="text-[13px] tracking-[0.1em] text-[#C9A96E]" aria-label={`${value} of 5 stars`}>
      {"★".repeat(value)}
      <span className="text-[#D8D3C8]">{"★".repeat(Math.max(0, 5 - value))}</span>
    </span>
  );
}

export function ReviewsManager({ initial }: { initial: Review[] }) {
  const [list, setList] = useState<Review[]>(initial);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "visible" | "hidden">("all");

  const filtered = useMemo(
    () =>
      list.filter((r) => {
        if (filter === "visible" && !r.active) return false;
        if (filter === "hidden" && r.active) return false;
        if (query === "") return true;
        const hay = `${r.body} ${r.name} ${r.productName ?? ""} ${r.email ?? ""}`.toLowerCase();
        return hay.includes(query.toLowerCase());
      }),
    [list, query, filter]
  );

  const byProduct = useMemo(() => {
    const groups = new Map<string, { name: string; items: Review[] }>();
    for (const r of filtered) {
      const key = r.productId;
      const g = groups.get(key) ?? { name: r.productName ?? r.productId, items: [] };
      g.items.push(r);
      groups.set(key, g);
    }
    return [...groups.values()];
  }, [filtered]);

  const toggle = async (r: Review) => {
    await fetch("/api/admin/reviews", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: r.id, active: !r.active }),
    });
    setList((prev) => prev.map((x) => (x.id === r.id ? { ...x, active: !x.active } : x)));
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this review permanently?")) return;
    await fetch(`/api/admin/reviews?id=${id}`, { method: "DELETE" });
    setList((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <div>
      <PageTitle title="Reviews" sub={`${list.length} customer reviews across the catalog.`} />

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search reviews, names, products"
          className="w-full sm:max-w-[280px] min-h-[44px] border border-black/10 bg-white rounded-xl px-3.5 py-2.5 text-[16px] sm:text-sm focus:outline-none focus:border-[#131315] focus:ring-2 focus:ring-[#C9A96E]/25"
        />
        <div className="flex gap-2">
          {(["all", "visible", "hidden"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 sm:flex-none min-h-[44px] inline-flex items-center justify-center px-4 text-[11px] tracking-[0.12em] uppercase rounded-lg border ${filter === f ? "bg-[#131315] text-white border-[#131315]" : "bg-white border-black/10"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {byProduct.length === 0 && (
        <Card>
          <div className="p-8 text-center text-[13px] text-[#8A8A90]">No reviews match.</div>
        </Card>
      )}

      <div className="space-y-4">
        {byProduct.map((g) => (
          <Card key={g.name} className="overflow-hidden">
            <div className="px-4 sm:px-5 py-3.5 bg-[#F7F7F5] border-b border-black/[0.06] flex items-center justify-between gap-3">
              <div className="text-[13px] font-medium truncate">{g.name}</div>
              <div className="text-[11px] text-[#8A8A90] shrink-0">
                {g.items.length} review{g.items.length === 1 ? "" : "s"}
              </div>
            </div>
            <div className="divide-y divide-black/[0.06]">
              {g.items.map((r) => (
                <div key={r.id} className={`p-4 sm:p-5 ${r.active ? "" : "opacity-60"}`}>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <Stars value={r.rating} />
                    <span className="text-[13px] font-medium">{r.anonymous ? "Anonymous" : r.name || "Anonymous"}</span>
                    {r.email && <span className="text-[11px] text-[#8A8A90]">{r.email}</span>}
                    <span className="text-[11px] text-[#8A8A90]">
                      {r.createdAt ? new Date(r.createdAt).toLocaleString() : ""}
                    </span>
                    <StatusBadge status={r.active ? "visible" : "hidden"} />
                  </div>
                  <p className="text-[13px] leading-6 text-[#55555A] mt-2">{r.body}</p>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => toggle(r)}
                      className={`flex-1 sm:flex-none min-h-[44px] inline-flex items-center justify-center text-[11px] tracking-[0.12em] uppercase px-4 rounded-lg border ${r.active ? "border-black/10" : "bg-[#131315] text-white border-[#131315]"}`}
                    >
                      {r.active ? "Hide" : "Show"}
                    </button>
                    <button
                      onClick={() => remove(r.id)}
                      className="flex-1 sm:flex-none min-h-[44px] inline-flex items-center justify-center text-[11px] tracking-[0.12em] uppercase px-4 rounded-lg border border-red-200 text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
