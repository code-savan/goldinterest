"use client";

import { useEffect, useState, type FormEvent } from "react";
import { GhostButton, PrimaryButton, inputCls } from "@/components/admin/ui";

type Review = {
  id: string;
  name: string;
  rating: number;
  body: string;
  anonymous: boolean;
  createdAt: string | Date | null;
};

function Stars({ value, size = "text-[15px]" }: { value: number; size?: string }) {
  return (
    <span className={`${size} tracking-[0.1em] text-[#C9A96E]`} aria-label={`${value} out of 5 stars`}>
      {"★".repeat(value)}
      <span className="text-[#D8D3C8]">{"★".repeat(Math.max(0, 5 - value))}</span>
    </span>
  );
}

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || "Anonymous";
}

export function ProductReviews({ productId, productName }: { productId: string; productName: string }) {
  const [list, setList] = useState<Review[]>([]);
  const [count, setCount] = useState(0);
  const [avg, setAvg] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  const load = async () => {
    try {
      const res = await fetch(`/api/reviews?productId=${encodeURIComponent(productId)}`);
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setList(data.reviews ?? []);
        setCount(data.count ?? 0);
        setAvg(data.avg ?? null);
      }
    } catch {}
    setLoaded(true);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (body.trim().length < 2) {
      setMsg("Please write a few words.");
      return;
    }
    setBusy(true);
    setMsg("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, name, email, rating, body, anonymous }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not post your review.");
      setName("");
      setEmail("");
      setBody("");
      setAnonymous(false);
      setRating(5);
      setFormOpen(false);
      setMsg("Thanks! Your review is live below.");
      await load();
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Could not post your review.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="mt-16 lg:mt-20 border-t border-[#E8E6E1] pt-10 lg:pt-14">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <div className="text-[11px] tracking-[0.22em] uppercase text-[#8C6A2F] font-medium">Reviews</div>
          <h2 className="font-serif text-[24px] lg:text-[28px] leading-none font-light mt-2">
            What owners <span className="italic">say</span>
          </h2>
          {loaded && (
            <div className="flex items-center gap-2 mt-2">
              {avg != null ? (
                <>
                  <Stars value={Math.round(avg)} />
                  <span className="text-[13px] text-[#6B6B6B]">
                    {avg.toFixed(1)} · {count} review{count === 1 ? "" : "s"}
                  </span>
                </>
              ) : (
                <span className="text-[13px] text-[#6B6B6B]">No reviews yet — be the first.</span>
              )}
            </div>
          )}
        </div>
        <div className="w-full sm:w-auto shrink-0">
          <GhostButton onClick={() => setFormOpen((v) => !v)}>{formOpen ? "Close" : "Write a review"}</GhostButton>
        </div>
      </div>

      {formOpen && (
        <form onSubmit={submit} className="mt-6 bg-white border border-black/[0.07] rounded-2xl p-5 sm:p-6 space-y-4 max-w-[640px]">
          <div>
            <div className="text-[11px] tracking-[0.14em] uppercase font-medium text-[#6E6E73]">Your rating</div>
            <div className="flex gap-1.5 mt-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  aria-label={`${n} star${n === 1 ? "" : "s"}`}
                  className={`w-11 h-11 text-[22px] transition-transform ${n <= rating ? "text-[#C9A96E] scale-110" : "text-[#D8D3C8]"}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] tracking-[0.14em] uppercase font-medium text-[#6E6E73]">First name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Maya"
                disabled={anonymous}
                className={`${inputCls} mt-1.5 disabled:opacity-50`}
              />
            </div>
            <div>
              <label className="text-[11px] tracking-[0.14em] uppercase font-medium text-[#6E6E73]">Email (optional)</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                inputMode="email"
                className={`${inputCls} mt-1.5`}
              />
            </div>
          </div>
          <label className="flex items-center gap-3 text-[13px] text-[#55555A] cursor-pointer">
            <input
              type="checkbox"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
              className="w-5 h-5 accent-[#131315]"
            />
            Post anonymously (your name stays hidden)
          </label>
          <div>
            <label className="text-[11px] tracking-[0.14em] uppercase font-medium text-[#6E6E73]">Your review</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={`How is the ${productName}? Fit, finish, delivery…`}
              rows={4}
              className={`${inputCls} mt-1.5`}
            />
          </div>
          {msg && <div className="text-[12px] text-[#55555A] bg-black/[0.03] border border-black/10 rounded-xl px-3 py-2">{msg}</div>}
          <PrimaryButton type="submit" disabled={busy} className="sm:!w-auto">
            {busy ? "Posting" : "Post review"}
          </PrimaryButton>
        </form>
      )}
      {!formOpen && msg && <div className="mt-4 max-w-[640px] text-[12px] text-[#55555A] bg-black/[0.03] border border-black/10 rounded-xl px-3 py-2">{msg}</div>}

      <div className="mt-8 space-y-4 max-w-[720px]">
        {!loaded && <div className="text-[13px] text-[#8A8A90]">Loading reviews…</div>}
        {loaded && list.length === 0 && (
          <div className="text-[13px] text-[#8A8A90] border border-dashed border-black/15 rounded-2xl p-6 text-center">
            Nothing here yet. Your words help other shoppers decide.
          </div>
        )}
        {list.map((r) => (
          <article key={r.id} className="bg-white border border-black/[0.07] rounded-2xl p-5">
            <div className="flex items-center justify-between gap-3">
              <Stars value={r.rating} size="text-[13px]" />
              <time className="text-[11px] text-[#8A8A90]">
                {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : ""}
              </time>
            </div>
            <p className="text-[14px] leading-6 mt-2.5">{r.body}</p>
            <div className="text-[12px] text-[#6B6B6B] mt-2">— {r.anonymous ? "Anonymous" : firstName(r.name)}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
