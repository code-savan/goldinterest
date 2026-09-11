export function LegalLayout({ title, subtitle, updated, children }: { title: string; subtitle: string; updated: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[800px] px-6 lg:px-8 py-12">
      <div className="text-[11px] tracking-[0.18em] uppercase text-[#8C6A2F]">Gold Lifestyle · Maison</div>
      <h1 className="font-serif text-[36px] leading-none font-light mt-3">{title}</h1>
      <p className="text-[14px] leading-6 text-[#6B6B6B] mt-3 max-w-[640px]">{subtitle}</p>
      <div className="text-[11px] tracking-wide text-[#9A9590] mt-2">Last updated: {updated}</div>
      <div className="prose prose-sm max-w-none mt-8 prose-headings:font-serif prose-headings:font-light prose-headings:tracking-tight prose-p:leading-7 prose-p:text-[#2A2A2A] prose-li:text-[#2A2A2A] prose-strong:text-black">
        <div className="border-t border-[#E8E6E1] pt-8 space-y-8 text-[13.5px] leading-7 text-[#2A2A2A]">{children}</div>
      </div>
    </div>
  );
}
