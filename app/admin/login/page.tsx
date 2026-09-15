"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) {
      setError(data.error || "Login failed.");
      return;
    }
    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="h-full flex items-center justify-center px-4 bg-[#131315]">
      <div className="w-full max-w-[380px]">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#C9A96E] flex items-center justify-center">
            <span className="font-serif text-lg text-[#131315]">G</span>
          </div>
          <h1 className="font-serif text-2xl text-white font-light mt-4">Store Admin</h1>
          <p className="text-[12px] text-white/50 mt-1 tracking-wide">Gold Lifestyle dashboard</p>
        </div>
        <form onSubmit={submit} className="mt-8 bg-white rounded-2xl p-6 space-y-4 shadow-xl">
          <div>
            <label className="text-[11px] tracking-[0.16em] uppercase font-medium text-[#6E6E73]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#131315] focus:ring-2 focus:ring-[#C9A96E]/25"
              placeholder="Enter admin password"
              autoFocus
            />
          </div>
          {error && <div className="text-[12px] text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2">{error}</div>}
          <button
            type="submit"
            disabled={busy}
            className="w-full bg-[#131315] text-white rounded-xl py-3.5 text-[11px] tracking-[0.18em] uppercase font-medium hover:bg-black disabled:opacity-60"
          >
            {busy ? "Signing in" : "Sign in"}
          </button>
        </form>
        <a href="/" className="block text-center mt-6 text-[11px] tracking-[0.16em] uppercase text-white/50 hover:text-white">
          Back to store
        </a>
      </div>
    </div>
  );
}
