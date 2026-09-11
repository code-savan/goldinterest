import { LegalLayout } from "@/components/legal-layout";

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms & Conditions"
      subtitle="Please read these terms carefully before using Gold Lifestyle. By accessing or purchasing from our store, you agree to be bound by them."
      updated="September 10, 2026"
    >
      <section>
        <h2 className="font-serif text-xl">1. About Us</h2>
        <p>Gold Lifestyle is operated from Barcelona, Spain. Contact: hello@goldlifestyle.com · +34 900 123 456. VAT ID: ES-B12345678. These terms are governed by Spanish law.</p>
      </section>
      <section>
        <h2 className="font-serif text-xl">2. Products & Availability</h2>
        <p>All products are described as accurately as possible. Colors may vary slightly due to screen calibration and printing. We reserve the right to limit quantities, discontinue products, or correct pricing errors. Apparel is unisex and garment-dyed; slight variations are inherent to the dye process.</p>
      </section>
      <section>
        <h2 className="font-serif text-xl">3. Orders & Acceptance</h2>
        <p>Placing an order is an offer to purchase. We confirm acceptance by sending a confirmation email. We may refuse or cancel any order for reasons including stock error, pricing error, suspected fraud, or delivery constraints.</p>
      </section>
      <section>
        <h2 className="font-serif text-xl">4. Pricing & Payment</h2>
        <p>Prices are in EUR and include Spanish VAT where applicable. Payment is due at checkout via Visa, Mastercard, American Express, PayPal, Apple Pay, Google Pay or Klarna. All payments are encrypted; we never store card details.</p>
      </section>
      <section>
        <h2 className="font-serif text-xl">5. No Returns — All Sales Final</h2>
        <p className="font-medium text-black bg-[#F6F5F2] border border-[#E8E6E1] p-4">All sales are final. We do not accept returns or exchanges for change of mind, incorrect size, or color choice. Only items that arrive damaged, defective, or incorrectly fulfilled are eligible for replacement — see Returns & Refunds.</p>
      </section>
      <section>
        <h2 className="font-serif text-xl">6. Intellectual Property</h2>
        <p>All designs, images, text and trademarks are owned by Gold Lifestyle. You may not reproduce or use our content without prior written permission.</p>
      </section>
      <section>
        <h2 className="font-serif text-xl">7. Limitation of Liability</h2>
        <p>To the fullest extent permitted by law, our liability is limited to the price paid for the product. We are not liable for indirect or consequential losses.</p>
      </section>
      <section>
        <h2 className="font-serif text-xl">8. Contact</h2>
        <p>Questions? Email hello@goldlifestyle.com. For formal notices, write to: Gold Lifestyle, C/ de Mallorca 290, 08037 Barcelona, Spain.</p>
      </section>
    </LegalLayout>
  );
}
