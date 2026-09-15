import { LegalLayout } from "@/components/legal-layout";

export default function ReturnsPage() {
  return (
    <LegalLayout
      title="Returns & Refunds"
      subtitle="Our policy is simple: all sales are final. We only accept replacements for items that arrive damaged, defective, or incorrectly fulfilled."
      updated="September 10, 2026"
    >
      <div className="bg-[#0A0A0A] text-white p-6 not-prose">
        <div className="text-[11px] tracking-[0.18em] uppercase text-[#C9A96E]">Important</div>
        <div className="font-serif text-xl mt-1">All sales final</div>
        <p className="text-sm text-white/70 mt-2 leading-6">
          Please choose size and color carefully. Use the size guide on each product page and double-check your cart before paying. We do not offer returns, exchanges, or refunds for change of mind.
        </p>
      </div>

      <section>
        <h2 className="font-serif text-xl">What Is Not Returnable</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Wrong size or color ordered</li>
          <li>Changed mind after purchase</li>
          <li>Wallpaper opened, pasted, or cut</li>
          <li>Posters removed from tube and handled/creased</li>
          <li>Apparel washed, worn, or with tags removed</li>
        </ul>
      </section>

      <section>
        <h2 className="font-serif text-xl">What Is Eligible</h2>
        <p>We will replace or refund only if:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Item arrives damaged in transit (with photo evidence of packaging and product)</li>
          <li>Manufacturing defect (print error, dye flaw, seam failure)</li>
          <li>Wrong item or size shipped vs. what you ordered</li>
        </ul>
      </section>

      <section>
        <h2 className="font-serif text-xl">How to Report (48-Hour Window)</h2>
        <p>Email hello@goldlifestyle.com within 48 hours of delivery with:</p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Order number and item name</li>
          <li>Photos of the outer package, inner package, and defect/damage</li>
          <li>Brief description of the issue</li>
        </ol>
        <p>We aim to respond within 24 hours on business days. If approved, we will arrange a replacement at no cost or issue a refund to the original payment method. We may request return of the defective item at our expense.</p>
      </section>

      <section>
        <h2 className="font-serif text-xl">Refunds</h2>
        <p>Approved refunds go back to the original payment method within 5 to 10 business days after confirmation. Shipping costs are non refundable unless the error was ours. Refunds apply only to approved damaged or defective cases, not to general returns.</p>
      </section>

      <section>
        <h2 className="font-serif text-xl">Need Help Deciding?</h2>
        <p>We are happy to advise on sizing and color before you order. Contact us at hello@goldlifestyle.com with your measurements and we will guide you. Once shipped, the sale is final.</p>
      </section>
    </LegalLayout>
  );
}
