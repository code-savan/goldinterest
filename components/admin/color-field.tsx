"use client";

import { useEffect, useRef, useState } from "react";
import { inputCls } from "@/components/admin/ui";
import { findColorByName, searchColors } from "@/lib/colors";

export type ColorValue = { name: string; hex: string };

/**
 * Typable color picker: type to filter 100+ named colors, pick a suggestion
 * to fill name + shade, or keep a custom name and tune the shade manually.
 */
export function ColorField({
  value,
  onChange,
  autoFocus,
}: {
  value: ColorValue;
  onChange: (v: ColorValue) => void;
  autoFocus?: boolean;
}) {
  const [text, setText] = useState(value.name);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);

  // Keep the text in sync when the parent resets the value (e.g. editing another product).
  useEffect(() => {
    setText(value.name);
  }, [value.name]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const matches = searchColors(text);
  const exactKnown = findColorByName(text);

  const pick = (name: string, hex: string) => {
    onChange({ name, hex });
    setText(name);
    setOpen(false);
  };

  return (
    <div ref={boxRef} className="relative flex-1 min-w-0">
      <div className="flex gap-2">
        <span
          aria-hidden
          className="w-11 h-[44px] shrink-0 rounded-lg border border-black/10"
          style={{ background: value.hex }}
        />
        <input
          value={text}
          autoFocus={autoFocus}
          onChange={(e) => {
            const t = e.target.value;
            setText(t);
            setOpen(true);
            setHighlight(0);
            const known = findColorByName(t);
            // Typing an exact known name snaps the shade; anything else stays custom.
            onChange(known ? { name: t.trim(), hex: known.hex } : { name: t, hex: value.hex });
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" && matches.length > 0) {
              e.preventDefault();
              setHighlight((h) => (h + 1) % matches.length);
            } else if (e.key === "ArrowUp" && matches.length > 0) {
              e.preventDefault();
              setHighlight((h) => (h - 1 + matches.length) % matches.length);
            } else if (e.key === "Enter" && open && matches.length > 0) {
              e.preventDefault();
              pick(matches[highlight]?.name ?? matches[0].name, matches[highlight]?.hex ?? matches[0].hex);
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
          placeholder="Type a color, e.g. Bone"
          className={inputCls}
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
        />
        <input
          type="color"
          value={/^#[0-9a-fA-F]{6}$/.test(value.hex) ? value.hex : "#C9A96E"}
          onChange={(e) => onChange({ name: text.trim(), hex: e.target.value })}
          title="Tune the shade"
          aria-label="Tune the shade"
          className="w-12 h-[44px] shrink-0 border border-black/10 bg-white p-1 rounded-lg cursor-pointer"
        />
      </div>
      {open && (
        <div role="listbox" className="absolute z-30 left-0 right-0 mt-1 bg-white border border-black/10 rounded-xl shadow-lg overflow-hidden max-h-[240px] overflow-y-auto">
          {matches.length === 0 && (
            <div className="px-3.5 py-3 text-[13px] text-[#8A8A90]">
              No match — press Enter to keep “{text.trim() || "…" }” as a custom color.
            </div>
          )}
          {matches.map((c, i) => (
            <button
              key={c.name}
              role="option"
              aria-selected={i === highlight}
              onMouseDown={(e) => {
                e.preventDefault();
                pick(c.name, c.hex);
              }}
              onMouseEnter={() => setHighlight(i)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-left text-[13px] ${i === highlight ? "bg-black/[0.04]" : ""}`}
            >
              <span className="w-5 h-5 rounded-full border border-black/10 shrink-0" style={{ background: c.hex }} />
              <span className="flex-1">{c.name}</span>
              <span className="text-[11px] text-[#8A8A90] font-mono">{c.hex}</span>
            </button>
          ))}
          {text.trim() !== "" && !exactKnown && (
            <button
              onMouseDown={(e) => {
                e.preventDefault();
                onChange({ name: text.trim(), hex: value.hex });
                setOpen(false);
              }}
              className="w-full text-left px-3.5 py-2.5 text-[13px] text-[#8C6A2F] border-t border-black/10"
            >
              Use “{text.trim()}” as a custom color
            </button>
          )}
        </div>
      )}
    </div>
  );
}
