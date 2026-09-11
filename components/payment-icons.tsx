export function PaymentIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      {/* Visa */}
      <div className="h-[26px] px-2.5 bg-white border border-[#E8E6E1] rounded-[4px] flex items-center justify-center">
        <span className="text-[11px] font-black tracking-tighter text-[#1A1FA0] italic">VISA</span>
      </div>
      {/* Mastercard */}
      <div className="h-[26px] px-2 bg-white border border-[#E8E6E1] rounded-[4px] flex items-center gap-0">
        <div className="w-[14px] h-[14px] rounded-full bg-[#EB001B] -mr-1" />
        <div className="w-[14px] h-[14px] rounded-full bg-[#F79E1B] opacity-90" />
        <span className="ml-1.5 text-[7px] font-bold tracking-wide text-[#0A0A0A] leading-none">
          Master
          <br />
          card
        </span>
      </div>
      {/* Amex */}
      <div className="h-[26px] px-2.5 bg-[#2E77BC] border border-[#2E77BC] rounded-[4px] flex items-center justify-center">
        <span className="text-[8px] font-black tracking-[0.12em] text-white">AMERICAN EXPRESS</span>
      </div>
      {/* PayPal */}
      <div className="h-[26px] px-2.5 bg-white border border-[#E8E6E1] rounded-[4px] flex items-center justify-center">
        <span className="text-[11px] font-bold tracking-tight">
          <span className="text-[#003087]">Pay</span>
          <span className="text-[#009CDE]">Pal</span>
        </span>
      </div>
      {/* Apple Pay */}
      <div className="h-[26px] px-2.5 bg-black border border-black rounded-[4px] flex items-center justify-center gap-1">
        <span className="text-white text-[11px]"></span>
        <span className="text-white text-[11px] font-medium tracking-tight">Pay</span>
      </div>
      {/* Google Pay */}
      <div className="h-[26px] px-2.5 bg-white border border-[#E8E6E1] rounded-[4px] flex items-center justify-center">
        <span className="text-[11px] font-medium tracking-tight">
          <span className="text-[#4285F4]">G</span>
          <span className="text-[#EA4335]">o</span>
          <span className="text-[#FBBC05]">o</span>
          <span className="text-[#4285F4]">g</span>
          <span className="text-[#34A853]">l</span>
          <span className="text-[#EA4335]">e</span>
          <span className="text-[#5F6368] font-normal ml-1">Pay</span>
        </span>
      </div>
      {/* Klarna */}
      <div className="h-[26px] px-2.5 bg-[#FFB3C7] border border-[#FFB3C7] rounded-[4px] flex items-center justify-center">
        <span className="text-[10px] font-black tracking-tight text-black">Klarna.</span>
      </div>
    </div>
  );
}
