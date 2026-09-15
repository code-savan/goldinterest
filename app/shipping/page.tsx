import { LegalLayout } from "@/components/legal-layout";

export default function ShippingPage() {
  return (
    <LegalLayout
      title="Shipping & Delivery"
      subtitle="Where we ship, how long it takes, and what it costs. All orders are prepared in Barcelona with care."
      updated="September 10, 2026"
    >
      <section>
        <h2 className="font-serif text-xl">Shipping Zones & Timelines</h2>
        <div className="grid sm:grid-cols-3 gap-3 not-prose mt-4">
          <div className="border border-[#E8E6E1] bg-[#F6F5F2] p-4">
            <div className="text-[11px] tracking-[0.16em] uppercase font-medium">Spain & EU</div>
            <div className="font-medium mt-1">3 to 5 business days</div>
            <div className="text-xs text-[#6B6B6B] mt-1">Duties included</div>
          </div>
          <div className="border border-[#E8E6E1] bg-white p-4">
            <div className="text-[11px] tracking-[0.16em] uppercase font-medium">UK & Rest of World</div>
            <div className="font-medium mt-1">6 to 12 business days</div>
            <div className="text-xs text-[#6B6B6B] mt-1">Duties calculated at checkout</div>
          </div>
          <div className="border border-[#0A0A0A] bg-[#0A0A0A] text-white p-4">
            <div className="text-[11px] tracking-[0.16em] uppercase text-[#C9A96E]">Free Shipping</div>
            <div className="font-medium mt-1">All Orders</div>
            <div className="text-xs text-white/60 mt-1">Worldwide, no minimum</div>
          </div>
        </div>
      </section>
      <section>
        <h2 className="font-serif text-xl">Shipping Costs</h2>
        <p>Free shipping on every order, no minimum, worldwide. Express options may appear at checkout where available.</p>
      </section>
      <section>
        <h2 className="font-serif text-xl">Processing Time</h2>
        <p>Orders are processed within 1 to 2 business days. Wallpapers and posters are made to order in small runs, so a short delay of 1 day can happen during drops. You will receive a tracking number once your order ships.</p>
      </section>
      <section>
        <h2 className="font-serif text-xl">Packaging</h2>
        <p>Wallpapers are packed in rigid tubes and boxes to prevent creasing. Apparel is folded with tissue and shipped in recycled mailers. Posters ship rolled in reinforced tubes and are never folded.</p>
      </section>
      <section>
        <h2 className="font-serif text-xl">Tracking & Delays</h2>
        <p>Customs, weather, or carrier delays can affect international timelines. If your tracking has not updated for 7 days, contact hello@goldlifestyle.com with your order number.</p>
      </section>
      <section>
        <h2 className="font-serif text-xl">International Duties</h2>
        <p>For EU destinations, duties and VAT are included. For non-EU, duties/taxes are calculated at checkout where possible; otherwise they are payable on delivery. We are not responsible for customs delays.</p>
      </section>
    </LegalLayout>
  );
}
