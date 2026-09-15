import { pgTable, text, numeric, boolean, integer, jsonb, timestamp } from "drizzle-orm/pg-core";

export type ProductColor = { name: string; hex: string; image?: string };

export type OrderItem = {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
};

export const products = pgTable("products", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  price: numeric("price", { mode: "number" }).notNull(),
  oldPrice: numeric("old_price", { mode: "number" }),
  rating: numeric("rating", { mode: "number" }).notNull().default(4.8),
  reviews: integer("reviews").notNull().default(0),
  colors: jsonb("colors").$type<ProductColor[]>().notNull().default([]),
  sizes: jsonb("sizes").$type<string[] | null>(),
  description: text("description").notNull().default(""),
  details: jsonb("details").$type<string[]>().notNull().default([]),
  images: jsonb("images").$type<string[]>().notNull().default([]),
  badge: text("badge"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const settings = pgTable("settings", {
  id: integer("id").primaryKey().default(1),
  featuredIds: jsonb("featured_ids").$type<string[]>().notNull().default([]),
  announcement: text("announcement").notNull().default("Free shipping on every order, worldwide"),
  heroKicker: text("hero_kicker").notNull().default("Gold Interest, Est. 2024"),
  heroTitleTop: text("hero_title_top").notNull().default("Everything"),
  heroTitleAccent: text("hero_title_accent").notNull().default("for your"),
  heroTitleBottom: text("hero_title_bottom").notNull().default("Space"),
  heroSubtitle: text("hero_subtitle")
    .notNull()
    .default(
      "Wallpapers, printable posters, framed wall art and apparel. Carefully made with a smooth matte finish, heavyweight cotton and small gold details. Free shipping on every order."
    ),
  heroImage: text("hero_image")
    .notNull()
    .default("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6"),
  heroImages: jsonb("hero_images").$type<Record<string, string>>().notNull().default({}),
});

export const promos = pgTable("promos", {
  id: text("id").primaryKey(),
  code: text("code").notNull().unique(),
  kind: text("kind").notNull().default("percent"),
  value: numeric("value", { mode: "number" }).notNull(),
  active: boolean("active").notNull().default(true),
  usageLimit: integer("usage_limit"),
  usedCount: integer("used_count").notNull().default(0),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const orders = pgTable("orders", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  zip: text("zip").notNull(),
  country: text("country").notNull(),
  items: jsonb("items").$type<OrderItem[]>().notNull().default([]),
  subtotal: numeric("subtotal", { mode: "number" }).notNull(),
  discount: numeric("discount", { mode: "number" }).notNull().default(0),
  total: numeric("total", { mode: "number" }).notNull(),
  currency: text("currency").notNull().default("USD"),
  status: text("status").notNull().default("pending"),
  promoCode: text("promo_code"),
  whopPaymentId: text("whop_payment_id"),
  whopPlanId: text("whop_plan_id"),
  whopCheckoutId: text("whop_checkout_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const webhookEvents = pgTable("webhook_events", {
  id: text("id").primaryKey(),
  receivedAt: timestamp("received_at", { withTimezone: true }).defaultNow(),
});

export const siteContent = pgTable("site_content", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull().default({}),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: text("id").primaryKey(),
  productId: text("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  name: text("name").notNull().default(""),
  email: text("email"),
  rating: integer("rating").notNull().default(5),
  body: text("body").notNull().default(""),
  anonymous: boolean("anonymous").notNull().default(false),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
