"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { products } from "@/db/schema";
import { Card, Field, GhostButton, PageTitle, PrimaryButton, inputCls } from "@/components/admin/ui";
import { CALM_EASE } from "../page-transition";

type Row = typeof products.$inferSelect;

const CATEGORIES = ["wallpaper-packs", "printable-posters", "frame-wall-art", "hoodies", "tee-shirts"];

type Draft = {
  id?: string;
  name: string;
  slug: string;
  category: string;
  price: string;
  oldPrice: string;
  rating: string;
  reviews: string;
  badge: string;
  active: boolean;
  colors: { name: string; hex: string }[];
  sizes: string;
  description: string;
  details: string;
  images: string[];
};

const emptyDraft: Draft = {
  name: "",
  slug: "",
  category: "hoodies",
  price: "",
  oldPrice: "",
  rating: "5",
  reviews: "0",
  badge: "",
  active: true,
  colors: [],
  sizes: "",
  description: "",
  details: "",
  images: [],
};

function toDraft(r: Row): Draft {
  return {
    id: r.id,
    name: r.name,
    slug: r.slug,
    category: r.category,
    price: String(r.price),
    oldPrice: r.oldPrice != null ? String(r.oldPrice) : "",
    rating: String(r.rating ?? 5),
    reviews: String(r.reviews ?? 0),
    badge: r.badge || "",
    active: r.active,
    colors: (r.colors as { name: string; hex: string }[]) ?? [],
    sizes: ((r.sizes as string[] | null) ?? []).join(", "),
    description: r.description ?? "",
    details: ((r.details as string[]) ?? []).join("\n"),
    images: (r.images as string[]) ?? [],
  };
}

export function ProductsManager({ initial }: { initial: Row[] }) {
  const [list, setList] = useState<Row[]>(initial);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [pending, setPending] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState("");
  const [urlBroken, setUrlBroken] = useState(false);

  useEffect(() => {
    if (!draft) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDraft();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [draft]);

  const filtered = useMemo(
    () =>
      list.filter(
        (p) =>
          (cat === "all" || p.category === cat) &&
          (query === "" || `${p.name} ${p.slug}`.toLowerCase().includes(query.toLowerCase()))
      ),
    [list, query, cat]
  );

  const refresh = async () => {
    const res = await fetch("/api/admin/products");
    const data = await res.json().catch(() => ({}));
    if (res.ok) setList(data.products);
  };

  const save = async () => {
    if (!draft || !draft.name.trim() || !draft.price) {
      setError("Name and price are required.");
      return;
    }
    setSaving(true);
    setError("");
    const payload = {
      ...draft,
      price: Number(draft.price),
      oldPrice: draft.oldPrice === "" ? null : Number(draft.oldPrice),
      rating: Number(draft.rating) || 5,
      reviews: Number(draft.reviews) || 0,
      sizes: draft.sizes.split(",").map((s) => s.trim()).filter(Boolean),
      details: draft.details.split("\n").map((s) => s.trim()).filter(Boolean),
    };
    const res = await fetch("/api/admin/products", {
      method: draft.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      setError(data.error || "Save failed.");
      return;
    }
    setDraft(null);
    setUrlInput("");
    setUrlBroken(false);
    await refresh();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    const row = list.find((p) => p.id === id);
    await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
    const imgs = ((row?.images as string[]) ?? []).filter((u) => u.includes("blob.vercel-storage"));
    for (const u of imgs) {
      try {
        await fetch(`/api/admin/upload?url=${encodeURIComponent(u)}`, { method: "DELETE" });
      } catch {}
    }
    await refresh();
  };

  const toggleActive = async (row: Row) => {
    await fetch("/api/admin/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...toDraft(row), id: row.id, active: !row.active }),
    });
    await refresh();
  };

  const upload = async (file: File) => {
    if (!draft) return;
    if (!file.type.startsWith("image/")) {
      setError("That file is not an image. Choose a JPG, PNG or WebP file.");
      return;
    }
    const localUrl = URL.createObjectURL(file);
    setPending((prev) => [...prev, localUrl]);
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Upload failed. Paste an image URL instead.");
      setDraft((d) => (d ? { ...d, images: [...d.images, data.url] } : d));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed. Paste an image URL instead.");
    } finally {
      URL.revokeObjectURL(localUrl);
      setPending((prev) => prev.filter((u) => u !== localUrl));
      setUploading(false);
    }
  };

  const uploadMany = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((f) => upload(f));
  };

  const closeDraft = () => {
    pending.forEach((u) => URL.revokeObjectURL(u));
    setPending([]);
    setDraft(null);
    setUrlInput("");
    setUrlBroken(false);
  };

  return (
    <div>
      <PageTitle
        title="Products"
        sub={`${list.length} products in the catalog.`}
        action={<PrimaryButton onClick={() => { setError(""); setPending([]); setDraft({ ...emptyDraft }); }}>New product</PrimaryButton>}
      />

      <div className="flex flex-wrap gap-3 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products"
          className={`max-w-[260px] ${inputCls}`}
        />
        <select value={cat} onChange={(e) => setCat(e.target.value)} className={inputCls} style={{ maxWidth: 220 }}>
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <Card>
        <div className="divide-y divide-black/[0.06]">
          {filtered.length === 0 && <div className="p-8 text-center text-[13px] text-[#8A8A90]">No products match.</div>}
          {filtered.map((p) => (
            <div key={p.id} className="flex items-center gap-4 p-4">
              <img src={(p.images as string[])[0] || ""} alt="" className="w-12 h-14 object-cover bg-black/[0.03] shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-medium truncate">{p.name}</div>
                <div className="text-[11px] text-[#8A8A90]">{p.category} · ${Number(p.price).toFixed(2)} · {p.active ? "Visible" : "Hidden"}</div>
              </div>
              <button onClick={() => toggleActive(p)} className={`text-[11px] tracking-[0.12em] uppercase px-3 py-1.5 border ${p.active ? "border-black/10" : "bg-[#131315] text-white border-[#131315]"}`}>
                {p.active ? "Hide" : "Show"}
              </button>
              <button onClick={() => { setError(""); setPending([]); setUrlBroken(false); setDraft(toDraft(p)); setUrlInput(""); }} className="text-[11px] tracking-[0.12em] uppercase underline underline-offset-4">
                Edit
              </button>
              <button onClick={() => remove(p.id)} className="text-[11px] tracking-[0.12em] uppercase text-red-700 underline underline-offset-4">
                Delete
              </button>
            </div>
          ))}
        </div>
      </Card>

      <AnimatePresence>
        {draft && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [...CALM_EASE] }}
            className="fixed inset-0 z-[80] bg-[#F3F3F1] overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [...CALM_EASE] }}
              className="min-h-full max-w-[880px] mx-auto px-4 sm:px-8 py-6 sm:py-10"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <div className="text-[11px] tracking-[0.18em] uppercase text-[#8C6A2F] font-medium">{draft.id ? "Editing" : "New product"}</div>
                  <div className="font-serif text-[28px] sm:text-[32px] leading-none font-light mt-1.5">
                    {draft.id ? draft.name || "Edit product" : "New product"}
                  </div>
                </div>
                <button
                  onClick={closeDraft}
                  className="shrink-0 h-11 px-5 rounded-xl border border-black/10 bg-white text-[11px] tracking-[0.14em] uppercase hover:border-[#131315] transition-colors"
                >
                  Close ✕
                </button>
              </div>
              <div className="bg-white border border-black/[0.07] rounded-2xl shadow-[0_1px_2px_rgba(19,19,21,0.05)] p-5 sm:p-8 space-y-5">
              {error && <div className="text-[12px] text-red-700 bg-red-50 border border-red-200 px-3 py-2">{error}</div>}

              <Field label="Name">
                <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className={inputCls} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Slug">
                  <input value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: e.target.value })} className={inputCls} placeholder="Auto if empty" />
                </Field>
                <Field label="Category">
                  <select value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} className={inputCls}>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Field label="Price (USD)">
                  <input type="number" step="0.01" min="0" value={draft.price} onChange={(e) => setDraft({ ...draft, price: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Old price">
                  <input type="number" step="0.01" min="0" value={draft.oldPrice} onChange={(e) => setDraft({ ...draft, oldPrice: e.target.value })} className={inputCls} placeholder="None" />
                </Field>
                <Field label="Rating">
                  <input type="number" step="0.1" min="0" max="5" value={draft.rating} onChange={(e) => setDraft({ ...draft, rating: e.target.value })} className={inputCls} />
                </Field>
                <Field label="Reviews">
                  <input type="number" min="0" value={draft.reviews} onChange={(e) => setDraft({ ...draft, reviews: e.target.value })} className={inputCls} />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Badge (optional)">
                  <input value={draft.badge} onChange={(e) => setDraft({ ...draft, badge: e.target.value })} className={inputCls} placeholder="NEW" />
                </Field>
                <Field label="Visibility">
                  <button onClick={() => setDraft({ ...draft, active: !draft.active })} className={`w-full py-2.5 text-[11px] tracking-[0.14em] uppercase border ${draft.active ? "bg-[#131315] text-white border-[#131315]" : "bg-white border-black/10"}`}>
                    {draft.active ? "Visible in store" : "Hidden"}
                  </button>
                </Field>
              </div>

              <Field label={`Images (${draft.images.length + pending.length})`}>
                {(draft.images.length > 0 || pending.length > 0) && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {draft.images.map((u, i) => (
                      <div key={`img-${i}`} className="relative group aspect-[3/4] bg-black/[0.03] overflow-hidden border border-black/10 rounded-xl">
                        <img src={u} alt={`Product image ${i + 1}`} className="w-full h-full object-cover" />
                        {i === 0 && <span className="absolute top-1.5 left-1.5 bg-[#131315] text-white text-[9px] tracking-[0.1em] px-1.5 py-0.5 rounded">MAIN</span>}
                        <button onClick={() => setDraft({ ...draft, images: draft.images.filter((_, j) => j !== i) })} aria-label="Remove image" className="absolute top-1.5 right-1.5 w-6 h-6 bg-white rounded-full text-xs shadow hover:bg-black hover:text-white transition-colors">
                          ✕
                        </button>
                      </div>
                    ))}
                    {pending.map((u) => (
                      <div key={u} className="relative aspect-[3/4] bg-black/[0.03] overflow-hidden border border-dashed border-[#C9A96E] rounded-xl">
                        <img src={u} alt="Uploading preview" className="w-full h-full object-cover opacity-70" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-white/40">
                          <span className="w-5 h-5 rounded-full border-2 border-[#8C6A2F] border-t-transparent animate-spin" />
                          <span className="text-[9px] tracking-[0.12em] uppercase font-medium text-[#8C6A2F]">Uploading</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-2 mt-2">
                  <label className={`cursor-pointer border border-[#131315] rounded-xl px-4 py-2.5 text-[11px] tracking-[0.14em] uppercase font-medium hover:bg-[#131315] hover:text-white transition-colors ${uploading ? "opacity-60 pointer-events-none" : ""}`}>
                    {uploading ? "Uploading" : "Upload images"}
                    <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => { uploadMany(e.target.files); e.target.value = ""; }} />
                  </label>
                  <div className="flex gap-2 flex-1 min-w-[220px]">
                    <input
                      value={urlInput}
                      onChange={(e) => { setUrlInput(e.target.value); setUrlBroken(false); }}
                      placeholder="Or paste image URL"
                      className={inputCls}
                    />
                    <GhostButton onClick={() => { if (urlInput.trim()) { setDraft({ ...draft, images: [...draft.images, urlInput.trim()] }); setUrlInput(""); setUrlBroken(false); } }}>
                      Add
                    </GhostButton>
                  </div>
                </div>
                {/^https?:\/\//i.test(urlInput.trim()) && (
                  <div className="mt-2 flex items-center gap-3 border border-black/10 rounded-xl p-2 bg-white">
                    {urlBroken ? (
                      <div className="w-12 h-14 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-700 text-lg">!</div>
                    ) : (
                      <img src={urlInput.trim()} alt="Pasted URL preview" onError={() => setUrlBroken(true)} className="w-12 h-14 rounded-lg object-cover bg-black/[0.03]" />
                    )}
                    <div className="text-[11px] leading-4 text-[#6E6E73]">
                      {urlBroken ? "This URL does not load as an image. Check the link and try again." : "Live preview of the pasted link. Looks good? Hit Add."}
                    </div>
                  </div>
                )}
                <p className="text-[11px] text-[#8A8A90] mt-1">First image is the main one seen in the store. You can select multiple files at once. Uploads need Blob storage connected.</p>
              </Field>

              <Field label="Colors">
                <div className="space-y-2">
                  {draft.colors.map((c, i) => (
                    <div key={i} className="flex gap-2">
                      <input value={c.name} onChange={(e) => { const n = [...draft.colors]; n[i] = { ...n[i], name: e.target.value }; setDraft({ ...draft, colors: n }); }} placeholder="Name" className={inputCls} />
                      <input type="color" value={c.hex} onChange={(e) => { const n = [...draft.colors]; n[i] = { ...n[i], hex: e.target.value }; setDraft({ ...draft, colors: n }); }} className="w-12 h-[42px] border border-black/10 bg-white p-1" />
                      <button onClick={() => setDraft({ ...draft, colors: draft.colors.filter((_, j) => j !== i) })} className="px-3 text-red-700">✕</button>
                    </div>
                  ))}
                  <GhostButton onClick={() => setDraft({ ...draft, colors: [...draft.colors, { name: "", hex: "#C9A96E" }] })}>Add color</GhostButton>
                </div>
              </Field>

              <Field label="Sizes (comma separated)">
                <input value={draft.sizes} onChange={(e) => setDraft({ ...draft, sizes: e.target.value })} className={inputCls} placeholder="S, M, L, XL" />
              </Field>

              <Field label="Description">
                <textarea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} rows={4} className={inputCls} />
              </Field>

              <Field label="Details (one per line)">
                <textarea value={draft.details} onChange={(e) => setDraft({ ...draft, details: e.target.value })} rows={4} className={inputCls} />
              </Field>

              <div className="flex gap-3 pt-2">
                <PrimaryButton onClick={save} disabled={saving} className="flex-1">{saving ? "Saving" : "Save product"}</PrimaryButton>
                <GhostButton onClick={closeDraft}>Cancel</GhostButton>
              </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
