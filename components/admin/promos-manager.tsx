"use client";

import { useState } from "react";
import type { promos } from "@/db/schema";
import { Card, Field, GhostButton, PageTitle, PrimaryButton, inputCls } from "@/components/admin/ui";

type Row = typeof promos.$inferSelect;

export function PromosManager({ initial }: { initial: Row[] }) {
  const [list, setList] = useState<Row[]>(initial);
  const [code, setCode] = useState("");
  const [kind, setKind] = useState("percent");
  const [value, setValue] = useState("");
  const [usageLimit, setUsageLimit] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const refresh = async () => {
    const res = await fetch("/api/admin/promos");
    const data = await res.json().catch(() => ({}));
    if (res.ok) setList(data.promos);
  };

  const create = async () => {
    if (!code.trim() || !value) {
      setMsg("Code and value are required.");
      return;
    }
    setBusy(true);
    setMsg("");
    const res = await fetch("/api/admin/promos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        kind,
        value: Number(value),
        usageLimit: usageLimit || null,
        expiresAt: expiresAt || null,
      }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) {
      setMsg(data.error || "Could not create code.");
      return;
    }
    setCode("");
    setValue("");
    setUsageLimit("");
    setExpiresAt("");
    setMsg("Discount code created.");
    await refresh();
  };

  const toggle = async (row: Row) => {
    await fetch("/api/admin/promos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...row, active: !row.active, value: Number(row.value) }),
    });
    await refresh();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this discount code?")) return;
    await fetch(`/api/admin/promos?id=${id}`, { method: "DELETE" });
    await refresh();
  };

  return (
    <div>
      <PageTitle title="Discounts" sub="Promo codes apply at checkout before payment." />
      {msg && <div className="mb-4 text-[12px] bg-white border border-black/10 px-3 py-2">{msg}</div>}

      <Card className="p-5 mb-4">
        <div className="text-[11px] tracking-[0.16em] uppercase font-medium mb-4">New code</div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Field label="Code">
            <input value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="GOLD10" className={inputCls} />
          </Field>
          <Field label="Type">
            <select value={kind} onChange={(e) => setKind(e.target.value)} className={inputCls}>
              <option value="percent">Percent off</option>
              <option value="fixed">Fixed USD off</option>
            </select>
          </Field>
          <Field label={kind === "percent" ? "Percent" : "Amount (USD)"}>
            <input type="number" min="0" value={value} onChange={(e) => setValue(e.target.value)} placeholder="10" className={inputCls} />
          </Field>
          <Field label="Usage limit">
            <input type="number" min="0" value={usageLimit} onChange={(e) => setUsageLimit(e.target.value)} placeholder="Unlimited" className={inputCls} />
          </Field>
          <Field label="Expires">
            <input type="date" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} className={inputCls} />
          </Field>
        </div>
        <div className="mt-4">
          <PrimaryButton onClick={create} disabled={busy}>{busy ? "Creating" : "Create code"}</PrimaryButton>
        </div>
      </Card>

      <Card>
        <div className="divide-y divide-black/[0.06]">
          {list.length === 0 && <div className="p-8 text-center text-[13px] text-[#8A8A90]">No discount codes yet.</div>}
          {list.map((p) => (
            <div key={p.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-4">
              <div className="font-mono font-medium text-[14px] bg-black/[0.03] border border-black/10 px-3 py-2 rounded-lg w-fit">{p.code}</div>
              <div className="text-[13px] text-[#6E6E73] leading-5">
                {p.kind === "percent" ? `${Number(p.value)}% off` : `$${Number(p.value).toFixed(2)} off`}
                {p.usageLimit ? ` · ${p.usedCount}/${p.usageLimit} used` : ` · ${p.usedCount} used`}
                {p.expiresAt ? ` · ends ${new Date(p.expiresAt).toLocaleDateString()}` : ""}
              </div>
              <div className="flex gap-2 sm:ml-auto">
                <button onClick={() => toggle(p)} className={`flex-1 sm:flex-none min-h-[44px] inline-flex items-center justify-center text-[11px] tracking-[0.12em] uppercase px-4 py-2 rounded-lg border ${p.active ? "border-black/10" : "bg-[#131315] text-white border-[#131315]"}`}>
                  {p.active ? "Disable" : "Enable"}
                </button>
                <button onClick={() => remove(p.id)} className="flex-1 sm:flex-none min-h-[44px] inline-flex items-center justify-center text-[11px] tracking-[0.12em] uppercase px-4 py-2 rounded-lg border border-red-200 text-red-700 underline underline-offset-4">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
