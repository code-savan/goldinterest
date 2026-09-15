"use client";

import { useState } from "react";
import { Card } from "@/components/admin/ui";

/** Runs idempotent schema migrations — no manual SQL needed, ever. */
export function SyncButton() {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const sync = async () => {
    setBusy(true);
    setMsg("");
    try {
      const res = await fetch("/api/admin/migrate", { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Sync failed.");
      const n = (data.applied as string[]).length;
      setMsg(n === 0 ? "Database is already in sync." : `Database synced. ${n} migration${n === 1 ? "" : "s"} applied.`);
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Sync failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card className="p-4 sm:p-5 mb-4 flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="flex-1 min-w-0">
        <div className="text-[11px] tracking-[0.16em] uppercase font-medium">Database sync</div>
        <p className="text-[13px] text-[#6E6E73] mt-1 leading-5">
          Applies any pending schema updates. Run this after pulling new changes — never any manual SQL.
        </p>
        {msg && <p className="text-[12px] mt-1.5 text-[#131315]">{msg}</p>}
      </div>
      <button
        onClick={sync}
        disabled={busy}
        className="w-full sm:w-auto shrink-0 min-h-[44px] inline-flex items-center justify-center border border-black/10 bg-white rounded-xl px-5 py-2.5 text-[11px] tracking-[0.14em] uppercase hover:border-[#131315] disabled:opacity-50 transition-colors"
      >
        {busy ? "Syncing" : "Sync database"}
      </button>
    </Card>
  );
}
