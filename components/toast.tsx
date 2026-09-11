"use client";

import { createContext, useContext, useCallback, useState, ReactNode } from "react";

type Toast = {
  id: number;
  title: string;
  description?: string;
  image?: string;
};

type ToastContextType = {
  showToast: (t: Omit<Toast, "id">) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

let idCounter = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((t: Omit<Toast, "id">) => {
    const id = ++idCounter;
    setToasts((prev) => [...prev, { ...t, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== id));
    }, 2600);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-5 right-4 sm:right-5 z-[60] flex flex-col gap-2.5 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto w-[300px] max-w-[92vw] bg-white border border-[#E8E6E1] shadow-[0_12px_40px_rgba(0,0,0,0.14)] flex items-center gap-3 pl-3 pr-2 py-3 animate-[toastIn_0.35s_cubic-bezier(0.32,0.72,0,1)]"
          >
            <div className="w-7 h-7 rounded-full bg-[#0A0A0A] flex items-center justify-center shrink-0">
              <span className="text-[#C9A96E] text-[11px]">✓</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-serif text-[13px] leading-none tracking-tight text-[#0A0A0A]">{toast.title}</div>
              {toast.description && <div className="text-[11px] leading-3 text-[#6B6B6B] mt-1 truncate">{toast.description}</div>}
            </div>
            <button
              onClick={() => setToasts((prev) => prev.filter((x) => x.id !== toast.id))}
              className="w-7 h-7 flex items-center justify-center text-[#9A9590] hover:text-black shrink-0 text-xs"
            >
              ✕
            </button>
            <style>{`@keyframes toastIn{from{opacity:0;transform:translateY(8px) scale(0.98)}to{opacity:1;transform:translateY(0) scale(1)}}`}</style>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
