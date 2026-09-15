import Link from "next/link";
import { Logo } from "./logo";
import { PaymentIcons } from "./payment-icons";
import { DEFAULT_CONTACT, DEFAULT_FOOTER, DEFAULT_SOCIALS, getSiteContent, type SocialNetwork } from "@/lib/site-content";

const ICON_CLS =
  "w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all";

function SocialIcon({ network }: { network: SocialNetwork }) {
  switch (network) {
    case "instagram":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "tiktok":
      return (
        <svg width="15" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.11V8.93a6.27 6.27 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.2 8.2 0 0 0 4.76 1.52V6.84a4.83 4.83 0 0 1-1-0.15Z" />
        </svg>
      );
    case "pinterest":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 4.9 3 9.1 7.3 10.9-.1-.9-.2-2.3 0-3.3.2-.9 1.3-5.5 1.3-5.5s-.3-.7-.3-1.6c0-1.5.9-2.6 2-2.6.9 0 1.4.7 1.4 1.5 0 .9-.6 2.3-.9 3.5-.3 1.1.6 2 1.7 2 2 0 3.6-2.1 3.6-5.2 0-2.7-1.9-4.6-4.7-4.6-3.2 0-5.1 2.4-5.1 4.9 0 .9.3 1.9.8 2.5.1.1.1.2.1.3l-.3 1.2c0 .2-.1.2-.3.1-1.1-.5-1.8-2.1-1.8-3.4 0-2.7 2-5.3 5.7-5.3 3.1 0 5.4 2.2 5.4 5.1 0 3-1.9 5.5-4.5 5.5-1 0-1.8-.5-2.1-1l-.7 2.6c-.2 1-.9 2.2-1.4 3 .9.3 1.9.4 2.9.4 6.627 0 12-5.373 12-12S18.627 0 12 0Z" />
        </svg>
      );
    case "facebook":
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5V11H8.5v3H11v7h2.5Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg width="16" height="11" viewBox="0 0 24 16" fill="none">
          <path d="M23.5 2.3c-.2-.9-.9-1.6-1.8-1.8C19.9 0 12 0 12 0S4.1 0 2.3.5C1.4.7.7 1.4.5 2.3 0 4.2 0 8 0 8s0 3.8.5 5.7c.2.9.9 1.6 1.8 1.8C4.1 16 12 16 12 16s7.9 0 9.7-.5c.9-.2 1.6-.9 1.8-1.8.5-1.9.5-5.7.5-5.7s0-3.8-.5-5.7Z" fill="currentColor" />
          <path d="M9.7 11.2 15.5 8 9.7 4.8v6.4Z" fill="#0A0A0A" />
        </svg>
      );
    case "x":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L1.6 2H8l4.4 5.9L18.9 2Zm-1.1 18h1.7L7 3.8H5.2L17.8 20Z" />
        </svg>
      );
  }
}

const NETWORK_LABELS: Record<SocialNetwork, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  pinterest: "Pinterest",
  facebook: "Facebook",
  youtube: "YouTube",
  x: "X",
};

export async function Footer() {
  let contact = DEFAULT_CONTACT;
  let footer = DEFAULT_FOOTER;
  let socials = DEFAULT_SOCIALS;
  try {
    const content = await getSiteContent();
    contact = content.contact;
    footer = content.footer;
    socials = content.socials;
  } catch {}

  const visible = socials.links.filter((l) => l.active && l.url.trim() !== "");

  return (
    <footer className="bg-[#0A0A0A] text-white mt-16">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="py-10 lg:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 border-b border-white/10">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="bg-white inline-flex p-3 rounded-sm">
              <Logo />
            </div>
            <p className="text-[13px] leading-6 text-white/60 mt-4 max-w-xs">{footer.blurb}</p>
            {visible.length > 0 && (
              <div className="flex gap-3 mt-6">
                {visible.map((l) => (
                  <a key={l.id} href={l.url} target="_blank" rel="noreferrer" aria-label={NETWORK_LABELS[l.network]} className={ICON_CLS}>
                    <SocialIcon network={l.network} />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h4 className="text-[11px] tracking-[0.18em] uppercase font-medium mb-4 text-[#C9A96E]">Shop</h4>
            <ul className="space-y-2.5 text-[13px] text-white/70">
              <li><Link href="/shop" className="hover:text-white">All Products</Link></li>
              <li><Link href="/shop?category=wallpaper-packs" className="hover:text-white">Wallpaper Packs</Link></li>
              <li><Link href="/shop?category=printable-posters" className="hover:text-white">Printable Posters</Link></li>
              <li><Link href="/shop?category=frame-wall-art" className="hover:text-white">Frame Wall Art</Link></li>
              <li><Link href="/shop?category=hoodies" className="hover:text-white">Hoodies</Link></li>
              <li><Link href="/shop?category=tee-shirts" className="hover:text-white">Tee Shirts</Link></li>
              <li><Link href="/cart" className="hover:text-white">Cart</Link></li>
              <li><Link href="/checkout" className="hover:text-white">Checkout</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] tracking-[0.18em] uppercase font-medium mb-4 text-[#C9A96E]">Help</h4>
            <ul className="space-y-2.5 text-[13px] text-white/70">
              <li><Link href="/shipping" className="hover:text-white">Shipping & Delivery</Link></li>
              <li><Link href="/returns" className="hover:text-white">Returns & Refunds</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] tracking-[0.18em] uppercase font-medium mb-4 text-[#C9A96E]">Contact</h4>
            <ul className="space-y-2.5 text-[13px] text-white/70">
              <li>{contact.email}</li>
              <li className="text-white/50">{contact.hours}</li>
              <li className="pt-2 text-[11px] leading-4 text-white/50">{contact.address}</li>
            </ul>
          </div>
        </div>

        <div className="py-8 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="text-[11px] tracking-[0.14em] uppercase text-white/50">Secure Payments With</div>
            <PaymentIcons />
            <div className="text-[11px] text-white/40">All transactions are encrypted and secure. We never store card details.</div>
          </div>
          <div className="text-[11px] tracking-wide text-white/40 lg:text-right">
            <div>© {new Date().getFullYear()} Gold Interest. All rights reserved.</div>
            <div className="mt-1">{footer.bottomNote}</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
