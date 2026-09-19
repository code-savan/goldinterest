import { unstable_cache } from "next/cache";
import { sql } from "drizzle-orm";
import { db } from "@/db";

/* ---------- Types ---------- */

export type FaqItem = { q: string; a: string };
export type FaqContent = {
  kicker: string;
  titleA: string;
  titleAccent: string;
  sub: string;
  note: string;
  items: FaqItem[];
};

export type SocialNetwork = "instagram" | "tiktok" | "pinterest" | "facebook" | "youtube" | "x";
export type SocialLink = { id: string; network: SocialNetwork; url: string; active: boolean };
export type SocialsContent = { links: SocialLink[] };

export type ContactContent = { email: string; hours: string; address: string };

export type SectionsContent = {
  categoriesKicker: string;
  categoriesTitleA: string;
  categoriesTitleAccent: string;
  categoriesTitleB: string;
  categoriesSub: string;
  featuredKicker: string;
  featuredTitleA: string;
  featuredTitleAccent: string;
  featuredTitleB: string;
  featuredSub: string;
  wallpapersKicker: string;
  wallpapersTitleA: string;
  wallpapersTitleAccent: string;
  wallpapersTitleB: string;
  wallpapersSub: string;
  apparelKicker: string;
  apparelTitleA: string;
  apparelTitleAccent: string;
  apparelTitleB: string;
  apparelSub: string;
  visitKicker: string;
  visitTitleA: string;
  visitTitleAccent: string;
  visitSub: string;
};

export type FooterContent = { blurb: string; bottomNote: string };

export type CategoriesContent = { images: Record<string, string> };

export type SiteContent = {
  faq: FaqContent;
  socials: SocialsContent;
  contact: ContactContent;
  sections: SectionsContent;
  footer: FooterContent;
  categories: CategoriesContent;
};

export type ContentKey = keyof SiteContent;

/* ---------- Defaults (mirror the current storefront copy) ---------- */

export const DEFAULT_FAQ: FaqContent = {
  kicker: "FAQ",
  titleA: "Frequently",
  titleAccent: "Asked",
  sub: "Everything you need to know before you order. Still unsure? Email us, we answer every message.",
  note: "All sales final. See details inside.",
  items: [
    {
      q: "What do you sell?",
      a: "Wallpaper packs with 3 rolls, printable posters as instant downloads with an archival print option, framed wall art in solid oak with museum glass, heavyweight hoodies in 450gsm cotton and tee shirts in 180gsm organic cotton. Everything is designed in our studio and ships free.",
    },
    {
      q: "Do you ship internationally?",
      a: "Yes, we ship worldwide from Barcelona. Delivery is 3 to 5 business days in the EU and 6 to 12 days worldwide. Shipping is free on every order. Duties are included for EU orders. Outside the EU, duties and taxes are calculated at checkout.",
    },
    {
      q: "What is your return and refund policy?",
      a: "All sales are final, so we do not offer returns or exchanges for change of mind, wrong size or color choice. We only replace or refund items that arrive damaged, defective or incorrectly fulfilled. Please contact us within 48 hours of delivery with photos. See our Returns and Refunds page for full details.",
    },
    {
      q: "How can I reach support?",
      a: "Email us at hello@goldinterest.com, Monday to Friday, 10am to 6pm CET. We usually reply within 24 hours. For damaged orders, please include your order number and photos.",
    },
    {
      q: "How do I choose a size and care for products?",
      a: "Our apparel is unisex and garment dyed. Check the size guide on each product page, from S to 3XL, with inch and cm options. Wallpaper pastes straight to the wall with no soaking and wipes clean with a damp cloth. Posters ship rolled in a tube or as an instant download. Framed art arrives ready to hang.",
    },
  ],
};

export const DEFAULT_SOCIALS: SocialsContent = {
  links: [
    { id: "instagram", network: "instagram", url: "", active: true },
    { id: "tiktok", network: "tiktok", url: "", active: true },
    { id: "pinterest", network: "pinterest", url: "", active: true },
  ],
};

export const DEFAULT_CONTACT: ContactContent = {
  email: "hello@goldinterest.com",
  hours: "Mon to Fri, 10am to 6pm CET",
  address: "C/ de Mallorca 290, Barcelona, ES",
};

export const DEFAULT_SECTIONS: SectionsContent = {
  categoriesKicker: "Shop by Category",
  categoriesTitleA: "Everything",
  categoriesTitleAccent: "we make,",
  categoriesTitleB: "curated by use",
  categoriesSub:
    "Five collections: Wallpaper Packs, Printable Posters, Frame Wall Art, Hoodies and Tee Shirts. Each one made with care, in its own material and scale.",
  featuredKicker: "Featured Collection",
  featuredTitleA: "Editors'",
  featuredTitleAccent: "picks,",
  featuredTitleB: "worn and hung",
  featuredSub: "A short edit of our most loved pieces. Free shipping on everything.",
  wallpapersKicker: "Art for Your Screen, Your Space",
  wallpapersTitleA: "Wallpaper",
  wallpapersTitleAccent: "Packs",
  wallpapersTitleB: "Printable Posters",
  wallpapersSub:
    "Beautiful designs for calm walls in matte, washable and lightly textured finishes. From Aurum Minimal to Golden Horizon. Posters come as an instant download or as an archival print with gold foil.",
  apparelKicker: "Find Your Interest",
  apparelTitleA: "Hoodies &",
  apparelTitleAccent: "Tee Shirts,",
  apparelTitleB: "softly made",
  apparelSub:
    "Made for food lovers and comfort seekers. Tomato, Avocado and Chili tees in soft 180gsm organic cotton with water based inks, plus garment dyed hoodies in Bone, Noir and Clay. Unisex, S to 3XL.",
  visitKicker: "Visit the Shop",
  visitTitleA: "All products,",
  visitTitleAccent: "one place",
  visitSub:
    "featured pieces and the full catalog with free shipping on every order, worldwide. All sales final.",
};

export const DEFAULT_FOOTER: FooterContent = {
  blurb:
    "Gold Interest makes wallpapers, posters and apparel in our studio. Designed with care and made to last.",
  bottomNote: "All sales final. See Returns and Refunds for our damaged goods policy.",
};

export const DEFAULT_CATEGORIES: CategoriesContent = {
  images: {
    "wallpaper-packs": "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=600&auto=format&fit=crop&q=60",
    "printable-posters": "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&auto=format&fit=crop&q=60",
    "frame-wall-art": "https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?w=600&auto=format&fit=crop&q=60",
    hoodies: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=60",
    "tee-shirts": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=60",
  },
};

export const DEFAULT_CONTENT: SiteContent = {
  faq: DEFAULT_FAQ,
  socials: DEFAULT_SOCIALS,
  contact: DEFAULT_CONTACT,
  sections: DEFAULT_SECTIONS,
  footer: DEFAULT_FOOTER,
  categories: DEFAULT_CATEGORIES,
};

const KEYS = Object.keys(DEFAULT_CONTENT) as ContentKey[];

/* ---------- Reads (cached, self-creating table) ---------- */

export async function getSiteContent(): Promise<SiteContent> {
  if (!db) return DEFAULT_CONTENT;
  return getCachedContent();
}

const getCachedContent = unstable_cache(
  async (): Promise<SiteContent> => {
    try {
      await db!.execute(sql`CREATE TABLE IF NOT EXISTS site_content (key TEXT PRIMARY KEY, value JSONB NOT NULL DEFAULT '{}', updated_at TIMESTAMPTZ DEFAULT NOW())`);
      const rows = await db!.execute(sql`SELECT key, value FROM site_content`);
      const out = { ...DEFAULT_CONTENT } as SiteContent;
      for (const r of rows.rows as unknown as { key: string; value: unknown }[]) {
        if (KEYS.includes(r.key as ContentKey) && r.value && typeof r.value === "object") {
          (out as Record<string, unknown>)[r.key] = { ...(DEFAULT_CONTENT[r.key as ContentKey] as object), ...(r.value as object) };
        }
      }
      // Deep-merge category images so a partial save never blanks the other tiles.
      out.categories = {
        images: { ...DEFAULT_CATEGORIES.images, ...((out.categories as CategoriesContent | undefined)?.images ?? {}) },
      };
      return out;
    } catch {
      return DEFAULT_CONTENT;
    }
  },
  ["site-content"],
  { tags: ["site-content"], revalidate: 300 }
);
