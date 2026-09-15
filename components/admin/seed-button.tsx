"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SeedButton() {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const run = async () => {
    setBusy(true);
    setMsg("");
    const res = await fetch("/api/admin/seed", { method: "POST" });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) {
      setMsg(data.error || "Import failed.");
      return;
    }
    setMsg(`Imported ${data.imported} products.`);
    router.refresh();
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={run}
        disabled={busy}
        className="bg-[#131315] text-white rounded-xl px-6 py-3 text-[11px] tracking-[0.16em] uppercase font-medium hover:bg-black disabled:opacity-50"
      >
        {busy ? "Importing" : "Import current catalog"}
      </button>
      {msg && <span className="text-[12px] text-[#6E6E73]">{msg}</span>}
    </div>
  );
}
