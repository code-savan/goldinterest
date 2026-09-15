"use client";

import { useMemo, useState } from "react";
import { Card, Field, PageTitle, PrimaryButton, inputCls } from "@/components/admin/ui";

type P = { id: string; name: string; price: number; image: string };
type S = {
  featuredIds: string[];
  announcement: string;
  heroKicker: string;
  heroTitleTop: string;
  heroTitleAccent: string;
  heroTitleBottom: string;
  heroSubtitle: string;
};

export function HomepageManager({ initialSettings, products }: { initialSettings: S; products: P[] }) {
  const [s, setS] = useState<S>(initialSettings);
  const [query, setQuery] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const byId = useMemo(() => new Map(products.map((p) => [p.id, p])), [products]);
  const results = useMemo(() => {
    if (!query) return [];
    return products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 6);
  }, [products, query]);

  const move = (i: number, dir: -1 | 1) => {
    const next = [...s.featuredIds];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    setS({ ...s, featuredIds: next });
  };

  const save = async () => {
    setSaving(true);
    setMsg("");
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(s),
    });
    const data = await res.json().catch(() => ({}));
    setSaving(false);
    setMsg(res.ok ? "Saved. The homepage updates instantly." : data.error || "Save failed.");
  };

  return (
    <div>
      <PageTitle title="Homepage" sub="Choose what the storefront shows." action={<PrimaryButton onClick={save} disabled={saving}>{saving ? "Saving" : "Save changes"}</PrimaryButton>} />
      {msg && <div className="mb-4 text-[12px] bg-white border border-black/10 px-3 py-2">{msg}</div>}

      <Card className="p-5 mb-4">
        <div className="text-[11px] tracking-[0.16em] uppercase font-medium mb-1">Featured section</div>
        <p className="text-[12px] text-[#6E6E73] mb-4">These products show first on the homepage, in this order.</p>
        <div className="space-y-2">
          {s.featuredIds.length === 0 && <div className="text-[13px] text-[#8A8A90]">No featured products yet. Search below to add some.</div>}
          {s.featuredIds.map((id, i) => {
            const p = byId.get(id);
            return (
              <div key={id} className="flex items-center gap-3 border border-black/10 p-2.5 bg-white">
                <span className="w-6 text-center text-[12px] text-[#8A8A90] font-medium">{i + 1}</span>
                {p && <img src={p.image} alt="" className="w-10 h-12 object-cover bg-black/[0.03]" />}
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium truncate">{p ? p.name : id}</div>
                  {p && <div className="text-[11px] text-[#8A8A90]">${p.price.toFixed(2)}</div>}
                </div>
                <button onClick={() => move(i, -1)} disabled={i === 0} className="w-8 h-8 border border-black/10 disabled:opacity-30">↑</button>
                <button onClick={() => move(i, 1)} disabled={i === s.featuredIds.length - 1} className="w-8 h-8 border border-black/10 disabled:opacity-30">↓</button>
                <button onClick={() => setS({ ...s, featuredIds: s.featuredIds.filter((x) => x !== id) })} className="w-8 h-8 text-red-700">✕</button>
              </div>
            );
          })}
        </div>
        <div className="mt-4">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products to add" className={inputCls} />
          {results.length > 0 && (
            <div className="mt-2 border border-black/10 divide-y divide-black/[0.06] bg-white">
              {results.map((p) => (
                <button
                  key={p.id}
                  disabled={s.featuredIds.includes(p.id)}
                  onClick={() => { setS({ ...s, featuredIds: [...s.featuredIds, p.id] }); setQuery(""); }}
                  className="w-full flex items-center gap-3 p-2.5 text-left hover:bg-black/[0.03] disabled:opacity-40"
                >
                  <img src={p.image} alt="" className="w-9 h-11 object-cover bg-black/[0.03]" />
                  <span className="text-[13px] flex-1 truncate">{p.name}</span>
                  <span className="text-[12px] text-[#6E6E73]">${p.price.toFixed(2)}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </Card>

      <Card className="p-5 mb-4">
        <div className="text-[11px] tracking-[0.16em] uppercase font-medium mb-4">Announcement bar</div>
        <Field label="Message">
          <input value={s.announcement} onChange={(e) => setS({ ...s, announcement: e.target.value })} className={inputCls} />
        </Field>
      </Card>

      <Card className="p-5">
        <div className="text-[11px] tracking-[0.16em] uppercase font-medium mb-4">Hero</div>
        <div className="space-y-4">
          <Field label="Kicker">
            <input value={s.heroKicker} onChange={(e) => setS({ ...s, heroKicker: e.target.value })} className={inputCls} />
          </Field>
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Title line 1">
              <input value={s.heroTitleTop} onChange={(e) => setS({ ...s, heroTitleTop: e.target.value })} className={inputCls} />
            </Field>
            <Field label="Title accent">
              <input value={s.heroTitleAccent} onChange={(e) => setS({ ...s, heroTitleAccent: e.target.value })} className={inputCls} />
            </Field>
            <Field label="Title line 3">
              <input value={s.heroTitleBottom} onChange={(e) => setS({ ...s, heroTitleBottom: e.target.value })} className={inputCls} />
            </Field>
          </div>
          <Field label="Subtitle">
            <textarea value={s.heroSubtitle} onChange={(e) => setS({ ...s, heroSubtitle: e.target.value })} rows={3} className={inputCls} />
          </Field>
        </div>
      </Card>
    </div>
  );
}
