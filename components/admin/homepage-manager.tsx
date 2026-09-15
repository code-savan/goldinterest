"use client";

import { useMemo, useState } from "react";
import { Card, Field, GhostButton, PageTitle, PrimaryButton, inputCls } from "@/components/admin/ui";
import {
  type SectionsContent,
  type SiteContent,
  type SocialLink,
  type SocialNetwork,
} from "@/lib/site-content";

type P = { id: string; name: string; price: number; image: string };
type S = {
  featuredIds: string[];
  announcement: string;
  heroKicker: string;
  heroTitleTop: string;
  heroTitleAccent: string;
  heroTitleBottom: string;
  heroSubtitle: string;
  heroImage: string;
  heroImages: Record<string, string>;
};

const NETWORKS: SocialNetwork[] = ["instagram", "tiktok", "pinterest", "facebook", "youtube", "x"];

const HERO_IMAGE_FIELDS: { key: string; label: string; hint: string }[] = [
  { key: "avatar1", label: "Review face 1", hint: "Tiny circle, square photo" },
  { key: "avatar2", label: "Review face 2", hint: "Tiny circle, square photo" },
  { key: "avatar3", label: "Review face 3", hint: "Tiny circle, square photo" },
  { key: "cardWallpaper", label: "Desktop floating card (wallpaper)", hint: "Portrait, ~240px wide" },
  { key: "cardApparel", label: "Desktop floating card (apparel)", hint: "Portrait, ~220px wide" },
  { key: "mobileCard1", label: "Mobile bestseller card", hint: "Square-ish, small" },
  { key: "mobileCard2", label: "Mobile hoodie card", hint: "Portrait, small" },
];

/** URL + upload + live preview for one editable image. */
function ImageField({
  label,
  hint,
  value,
  onChange,
  onUpload,
  uploading,
}: {
  label: string;
  hint: string;
  value: string;
  onChange: (url: string) => void;
  onUpload: (file: File) => Promise<void>;
  uploading: boolean;
}) {
  return (
    <div className="border border-black/10 rounded-xl p-3 bg-white space-y-2">
      <div className="flex items-center gap-3">
        {value.trim() !== "" ? (
          <img src={value} alt={`${label} preview`} className="w-14 h-14 rounded-lg object-cover border border-black/10 shrink-0" />
        ) : (
          <div className="w-14 h-14 rounded-lg border border-dashed border-black/20 bg-black/[0.03] flex items-center justify-center text-[10px] text-[#8A8A90] shrink-0 text-center leading-tight">
            No<br />image
          </div>
        )}
        <div className="min-w-0">
          <div className="text-[13px] font-medium">{label}</div>
          <div className="text-[11px] text-[#8A8A90]">{hint}</div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Image URL"
          inputMode="url"
          className={`${inputCls} flex-1`}
        />
        <label className={`inline-flex items-center justify-center text-center min-h-[44px] border border-black/10 rounded-xl px-4 py-2.5 text-[11px] tracking-[0.12em] uppercase cursor-pointer hover:border-[#131315] transition-colors ${uploading ? "opacity-60 pointer-events-none" : ""}`}>
          {uploading ? "…" : "Upload"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              e.target.value = "";
              if (f) void onUpload(f);
            }}
          />
        </label>
      </div>
    </div>
  );
}

const SECTION_GROUPS: { key: string; title: string; fields: { key: keyof SectionsContent; label: string }[] }[] = [
  {
    key: "categories",
    title: "Shop by category",
    fields: [
      { key: "categoriesKicker", label: "Kicker" },
      { key: "categoriesTitleA", label: "Title line 1" },
      { key: "categoriesTitleAccent", label: "Title accent" },
      { key: "categoriesTitleB", label: "Title line 3" },
      { key: "categoriesSub", label: "Subtitle" },
    ],
  },
  {
    key: "featured",
    title: "Featured collection",
    fields: [
      { key: "featuredKicker", label: "Kicker" },
      { key: "featuredTitleA", label: "Title line 1" },
      { key: "featuredTitleAccent", label: "Title accent" },
      { key: "featuredTitleB", label: "Title line 3" },
      { key: "featuredSub", label: "Subtitle" },
    ],
  },
  {
    key: "wallpapers",
    title: "Wallpapers editorial",
    fields: [
      { key: "wallpapersKicker", label: "Kicker" },
      { key: "wallpapersTitleA", label: "Title line 1" },
      { key: "wallpapersTitleAccent", label: "Title accent" },
      { key: "wallpapersTitleB", label: "Title line 3" },
      { key: "wallpapersSub", label: "Subtitle" },
    ],
  },
  {
    key: "apparel",
    title: "Apparel editorial",
    fields: [
      { key: "apparelKicker", label: "Kicker" },
      { key: "apparelTitleA", label: "Title line 1" },
      { key: "apparelTitleAccent", label: "Title accent" },
      { key: "apparelTitleB", label: "Title line 3" },
      { key: "apparelSub", label: "Subtitle" },
    ],
  },
  {
    key: "visit",
    title: "Visit shop block",
    fields: [
      { key: "visitKicker", label: "Kicker" },
      { key: "visitTitleA", label: "Title line 1" },
      { key: "visitTitleAccent", label: "Title accent" },
      { key: "visitSub", label: "Subtitle (follows the featured count)" },
    ],
  },
];

export function HomepageManager({
  initialSettings,
  products,
  initialContent,
}: {
  initialSettings: S;
  products: P[];
  initialContent: SiteContent;
}) {
  const [s, setS] = useState<S>(initialSettings);
  const [query, setQuery] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [contentSaving, setContentSaving] = useState(false);
  const [contentMsg, setContentMsg] = useState("");
  const [heroUploading, setHeroUploading] = useState(false);

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

  const uploadImage = async (file: File): Promise<string> => {
    if (!file.type.startsWith("image/")) throw new Error("That file is not an image. Choose a JPG, PNG or WebP file.");
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Upload failed. Paste an image URL instead.");
    return data.url as string;
  };

  const uploadHero = async (file: File) => {
    setHeroUploading(true);
    try {
      const url = await uploadImage(file);
      setS({ ...s, heroImage: url });
      setMsg("");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Upload failed. Paste an image URL instead.");
    } finally {
      setHeroUploading(false);
    }
  };

  const saveContent = async () => {
    setContentSaving(true);
    setContentMsg("");
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    const data = await res.json().catch(() => ({}));
    setContentSaving(false);
    setContentMsg(res.ok ? `Saved ${(data.saved as string[]).join(", ")}. Live within a minute.` : data.error || "Save failed.");
  };

  const moveFaq = (i: number, dir: -1 | 1) => {
    const items = [...content.faq.items];
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    [items[i], items[j]] = [items[j], items[i]];
    setContent({ ...content, faq: { ...content.faq, items } });
  };

  const setSocial = (id: string, patch: Partial<SocialLink>) => {
    setContent({
      ...content,
      socials: { links: content.socials.links.map((l) => (l.id === id ? { ...l, ...patch } : l)) },
    });
  };

  return (
    <div className="pb-8">
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
              <div key={id} className="flex items-center gap-2 sm:gap-3 border border-black/10 rounded-xl p-2.5 bg-white">
                <span className="w-6 text-center text-[12px] text-[#8A8A90] font-medium shrink-0">{i + 1}</span>
                {p && <img src={p.image} alt="" className="w-10 h-12 rounded-lg object-cover bg-black/[0.03] shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium truncate">{p ? p.name : id}</div>
                  {p && <div className="text-[11px] text-[#8A8A90]">${p.price.toFixed(2)}</div>}
                </div>
                <button onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up" className="w-11 h-11 shrink-0 inline-flex items-center justify-center border border-black/10 rounded-lg disabled:opacity-30">↑</button>
                <button onClick={() => move(i, 1)} disabled={i === s.featuredIds.length - 1} aria-label="Move down" className="w-11 h-11 shrink-0 inline-flex items-center justify-center border border-black/10 rounded-lg disabled:opacity-30">↓</button>
                <button onClick={() => setS({ ...s, featuredIds: s.featuredIds.filter((x) => x !== id) })} aria-label="Remove" className="w-11 h-11 shrink-0 inline-flex items-center justify-center text-red-700 rounded-lg">✕</button>
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

      <Card className="p-5 mb-8">
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
          <Field label="Background image">
            {s.heroImage.trim() !== "" && (
              <div className="relative mb-2 overflow-hidden rounded-xl border border-black/10 aspect-[16/9] bg-black/[0.03]">
                <img src={s.heroImage} alt="Hero background preview" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                value={s.heroImage}
                onChange={(e) => setS({ ...s, heroImage: e.target.value })}
                placeholder="Image URL, or upload below"
                inputMode="url"
                className={`${inputCls} flex-1`}
              />
              <label className={`inline-flex items-center justify-center text-center min-h-[44px] border border-[#131315] rounded-xl px-5 py-2.5 text-[11px] tracking-[0.14em] uppercase font-medium cursor-pointer hover:bg-[#131315] hover:text-white transition-colors ${heroUploading ? "opacity-60 pointer-events-none" : ""}`}>
                {heroUploading ? "Uploading" : "Upload"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    e.target.value = "";
                    if (f) uploadHero(f);
                  }}
                />
              </label>
            </div>
            <p className="text-[11px] text-[#8A8A90] mt-1">Wide landscape photo works best. Leave empty to use the default.</p>
          </Field>
          <div>
            <div className="text-[11px] tracking-[0.1em] uppercase text-[#8A8A90] mb-2">Section images (faces, floating cards, mobile previews)</div>
            <div className="space-y-2">
              {HERO_IMAGE_FIELDS.map((f) => (
                <ImageField
                  key={f.key}
                  label={f.label}
                  hint={f.hint}
                  value={s.heroImages[f.key] ?? ""}
                  onChange={(url) => setS({ ...s, heroImages: { ...s.heroImages, [f.key]: url } })}
                  uploading={heroUploading}
                  onUpload={async (file) => {
                    setHeroUploading(true);
                    try {
                      const url = await uploadImage(file);
                      setS((prev) => ({ ...prev, heroImages: { ...prev.heroImages, [f.key]: url } }));
                      setMsg("");
                    } catch (e) {
                      setMsg(e instanceof Error ? e.message : "Upload failed. Paste an image URL instead.");
                    } finally {
                      setHeroUploading(false);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* ---------- Page content (FAQ, socials, contact, headings, footer) ---------- */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
        <div>
          <h2 className="font-serif text-[22px] sm:text-[24px] leading-none font-light tracking-tight">Page content</h2>
          <p className="text-[13px] text-[#6E6E73] mt-1.5">FAQ, socials, contact details, headings and footer.</p>
        </div>
        <div className="w-full sm:w-auto shrink-0">
          <PrimaryButton onClick={saveContent} disabled={contentSaving}>{contentSaving ? "Saving" : "Save page content"}</PrimaryButton>
        </div>
      </div>
      {contentMsg && <div className="mb-4 text-[12px] bg-white border border-black/10 px-3 py-2">{contentMsg}</div>}

      <Card className="p-5 mb-4">
        <div className="text-[11px] tracking-[0.16em] uppercase font-medium mb-1">FAQ section</div>
        <p className="text-[12px] text-[#6E6E73] mb-4">Heading plus every question and answer. Remove all questions to hide the section.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <Field label="Kicker">
            <input value={content.faq.kicker} onChange={(e) => setContent({ ...content, faq: { ...content.faq, kicker: e.target.value } })} className={inputCls} />
          </Field>
          <Field label="Title line 1">
            <input value={content.faq.titleA} onChange={(e) => setContent({ ...content, faq: { ...content.faq, titleA: e.target.value } })} className={inputCls} />
          </Field>
          <Field label="Title accent">
            <input value={content.faq.titleAccent} onChange={(e) => setContent({ ...content, faq: { ...content.faq, titleAccent: e.target.value } })} className={inputCls} />
          </Field>
        </div>
        <div className="space-y-4 mb-4">
          <Field label="Subtitle">
            <textarea value={content.faq.sub} onChange={(e) => setContent({ ...content, faq: { ...content.faq, sub: e.target.value } })} rows={2} className={inputCls} />
          </Field>
          <Field label="Side note">
            <input value={content.faq.note} onChange={(e) => setContent({ ...content, faq: { ...content.faq, note: e.target.value } })} className={inputCls} />
          </Field>
        </div>
        <div className="space-y-3">
          {content.faq.items.map((f, i) => (
            <div key={i} className="border border-black/10 rounded-xl p-3 bg-white space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 text-center text-[12px] text-[#8A8A90] font-medium shrink-0">{i + 1}</span>
                <div className="flex-1" />
                <button onClick={() => moveFaq(i, -1)} disabled={i === 0} aria-label="Move up" className="w-11 h-11 inline-flex items-center justify-center border border-black/10 rounded-lg disabled:opacity-30">↑</button>
                <button onClick={() => moveFaq(i, 1)} disabled={i === content.faq.items.length - 1} aria-label="Move down" className="w-11 h-11 inline-flex items-center justify-center border border-black/10 rounded-lg disabled:opacity-30">↓</button>
                <button onClick={() => setContent({ ...content, faq: { ...content.faq, items: content.faq.items.filter((_, j) => j !== i) } })} aria-label="Remove" className="w-11 h-11 inline-flex items-center justify-center text-red-700 rounded-lg">✕</button>
              </div>
              <Field label="Question">
                <input
                  value={f.q}
                  onChange={(e) => { const items = [...content.faq.items]; items[i] = { ...items[i], q: e.target.value }; setContent({ ...content, faq: { ...content.faq, items } }); }}
                  className={inputCls}
                />
              </Field>
              <Field label="Answer">
                <textarea
                  value={f.a}
                  onChange={(e) => { const items = [...content.faq.items]; items[i] = { ...items[i], a: e.target.value }; setContent({ ...content, faq: { ...content.faq, items } }); }}
                  rows={3}
                  className={inputCls}
                />
              </Field>
            </div>
          ))}
          <GhostButton onClick={() => setContent({ ...content, faq: { ...content.faq, items: [...content.faq.items, { q: "", a: "" }] } })}>Add question</GhostButton>
        </div>
      </Card>

      <Card className="p-5 mb-4">
        <div className="text-[11px] tracking-[0.16em] uppercase font-medium mb-1">Social links</div>
        <p className="text-[12px] text-[#6E6E73] mb-4">Footer icons. Toggle off to mute, delete to remove, or add a network. Empty URLs are hidden.</p>
        <div className="space-y-2">
          {content.socials.links.length === 0 && <div className="text-[13px] text-[#8A8A90]">No social links. Add one below.</div>}
          {content.socials.links.map((l) => (
            <div key={l.id} className="flex flex-col sm:flex-row gap-2 border border-black/10 rounded-xl p-3 bg-white">
              <select
                value={l.network}
                onChange={(e) => setSocial(l.id, { network: e.target.value as SocialNetwork })}
                className={`${inputCls} sm:max-w-[160px]`}
                aria-label="Network"
              >
                {NETWORKS.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              <input
                value={l.url}
                onChange={(e) => setSocial(l.id, { url: e.target.value })}
                placeholder="https://…"
                inputMode="url"
                className={`${inputCls} flex-1`}
                aria-label="URL"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setSocial(l.id, { active: !l.active })}
                  className={`flex-1 sm:flex-none min-h-[44px] inline-flex items-center justify-center text-[11px] tracking-[0.12em] uppercase px-4 rounded-lg border ${l.active ? "border-black/10" : "bg-[#131315] text-white border-[#131315]"}`}
                >
                  {l.active ? "Mute" : "Muted"}
                </button>
                <button
                  onClick={() => setContent({ ...content, socials: { links: content.socials.links.filter((x) => x.id !== l.id) } })}
                  aria-label="Remove"
                  className="min-h-[44px] px-4 inline-flex items-center justify-center text-red-700 rounded-lg border border-red-200"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
          <div>
            <GhostButton
              onClick={() => setContent({ ...content, socials: { links: [...content.socials.links, { id: `link-${Date.now()}`, network: "instagram", url: "", active: true }] } })}
            >
              Add social link
            </GhostButton>
          </div>
        </div>
      </Card>

      <Card className="p-5 mb-4">
        <div className="text-[11px] tracking-[0.16em] uppercase font-medium mb-4">Contact details</div>
        <div className="space-y-4">
          <Field label="Support email">
            <input value={content.contact.email} onChange={(e) => setContent({ ...content, contact: { ...content.contact, email: e.target.value } })} inputMode="email" className={inputCls} />
          </Field>
          <Field label="Support hours">
            <input value={content.contact.hours} onChange={(e) => setContent({ ...content, contact: { ...content.contact, hours: e.target.value } })} className={inputCls} />
          </Field>
          <Field label="Address">
            <input value={content.contact.address} onChange={(e) => setContent({ ...content, contact: { ...content.contact, address: e.target.value } })} className={inputCls} />
          </Field>
        </div>
      </Card>

      <Card className="p-5 mb-4">
        <div className="text-[11px] tracking-[0.16em] uppercase font-medium mb-1">Section headings</div>
        <p className="text-[12px] text-[#6E6E73] mb-4">Every homepage section heading and subtitle.</p>
        <div className="space-y-6">
          {SECTION_GROUPS.map((g) => (
            <div key={g.key}>
              <div className="text-[11px] tracking-[0.1em] uppercase text-[#8A8A90] mb-2">{g.title}</div>
              <div className="space-y-3">
                {g.fields.map((f) => (
                  <Field key={f.key} label={f.label}>
                    {f.label === "Subtitle" || f.label.startsWith("Subtitle ") ? (
                      <textarea
                        value={content.sections[f.key]}
                        onChange={(e) => setContent({ ...content, sections: { ...content.sections, [f.key]: e.target.value } })}
                        rows={2}
                        className={inputCls}
                      />
                    ) : (
                      <input
                        value={content.sections[f.key]}
                        onChange={(e) => setContent({ ...content, sections: { ...content.sections, [f.key]: e.target.value } })}
                        className={inputCls}
                      />
                    )}
                  </Field>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <div className="text-[11px] tracking-[0.16em] uppercase font-medium mb-4">Footer</div>
        <div className="space-y-4">
          <Field label="Brand blurb">
            <textarea value={content.footer.blurb} onChange={(e) => setContent({ ...content, footer: { ...content.footer, blurb: e.target.value } })} rows={3} className={inputCls} />
          </Field>
          <Field label="Bottom note">
            <input value={content.footer.bottomNote} onChange={(e) => setContent({ ...content, footer: { ...content.footer, bottomNote: e.target.value } })} className={inputCls} />
          </Field>
        </div>
      </Card>
    </div>
  );
}
