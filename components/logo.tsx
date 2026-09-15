export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="w-9 h-9 rounded-full border border-[#C9A96E] flex items-center justify-center bg-[#0A0A0A] shrink-0">
        <span className="font-serif text-[14px] tracking-[0.12em] text-[#C9A96E] font-light">G</span>
        <span className="font-serif text-[10px] tracking-[0.12em] text-white -ml-[1px] mt-[1px]">I</span>
      </div>
      <div className="leading-none">
        <div className="font-serif text-[17px] tracking-[0.18em] font-light text-[#0A0A0A] uppercase">
          Gold <span className="font-normal">Interest</span>
        </div>
        <div className="text-[9px] tracking-[0.28em] uppercase text-[#8C6A2F] mt-[1px]">Est. 2024</div>
      </div>
    </div>
  );
}

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <div className={`w-9 h-9 rounded-full border border-[#C9A96E] flex items-center justify-center bg-[#0A0A0A] ${className}`}>
      <span className="font-serif text-[13px] tracking-widest text-[#C9A96E]">GI</span>
    </div>
  );
}
