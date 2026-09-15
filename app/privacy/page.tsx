import { LegalLayout } from "@/components/legal-layout";

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="How we collect, use and protect your information, explained in plain language."
      updated="September 10, 2026"
    >
      <section>
        <h2 className="font-serif text-xl">1. Who We Are</h2>
        <p>Gold Interest, C/ de Mallorca 290, 08037 Barcelona, Spain. Email: hello@goldinterest.com. We are the data controller for your personal information.</p>
      </section>
      <section>
        <h2 className="font-serif text-xl">2. What We Collect</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Order information: name, email, shipping address, phone, order contents</li>
          <li>Payment information: processed securely by our payment providers (Stripe, PayPal, Klarna), we never store full card numbers</li>
          <li>Website usage: pages viewed, device, and anonymized analytics via cookies</li>
          <li>Communications: emails and messages you send us</li>
        </ul>
      </section>
      <section>
        <h2 className="font-serif text-xl">3. How We Use It</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>To fulfill and ship your orders and provide customer support</li>
          <li>To send order confirmations, shipping updates, and (if you opt in) new drop emails</li>
          <li>To improve our store, prevent fraud, and comply with law</li>
        </ul>
      </section>
      <section>
        <h2 className="font-serif text-xl">4. Legal Basis (EU GDPR)</h2>
        <p>We process data on the basis of contract (to fulfill your order), legitimate interest (to improve our services and prevent fraud), consent (for marketing emails), and legal obligation (tax and accounting).</p>
      </section>
      <section>
        <h2 className="font-serif text-xl">5. Sharing</h2>
        <p>We share data only with service providers necessary to run the store: payment processors, shipping carriers, email and hosting providers. We do not sell your data. International transfers are protected by standard contractual clauses where required.</p>
      </section>
      <section>
        <h2 className="font-serif text-xl">6. Cookies</h2>
        <p>We use essential cookies to keep your bag and session, and analytics cookies to understand site usage. You can control cookies in your browser. Our newsletter uses your email only if you subscribe.</p>
      </section>
      <section>
        <h2 className="font-serif text-xl">7. Retention</h2>
        <p>Order data is retained for 6 years for tax and accounting. Marketing data is kept until you unsubscribe. You can request deletion where legally allowed.</p>
      </section>
      <section>
        <h2 className="font-serif text-xl">8. Your Rights</h2>
        <p>You have the right to access, correct, delete, restrict, object, and port your data, and to lodge a complaint with your supervisory authority. Contact hello@goldinterest.com to exercise your rights.</p>
      </section>
      <section>
        <h2 className="font-serif text-xl">9. Contact</h2>
        <p>For privacy questions, email hello@goldinterest.com. For formal requests, write to the address above.</p>
      </section>
    </LegalLayout>
  );
}
