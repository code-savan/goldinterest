import { sql } from "drizzle-orm";
import { db } from "@/db";

/**
 * Append-only registry of idempotent schema statements.
 *
 * Every statement must be safe to run repeatedly (IF NOT EXISTS guards).
 * The Admin dashboard "Sync database" button runs these against the live
 * database, so schema changes never require manual SQL in Neon.
 * To evolve the schema: add a new entry here AND to db/migrate.sql
 * (which stays the canonical fresh-install script).
 */
type Migration = { id: string; statements: string[] };

const MIGRATIONS: Migration[] = [
  {
    id: "001-site-content-table",
    statements: [
      `CREATE TABLE IF NOT EXISTS site_content (key TEXT PRIMARY KEY, value JSONB NOT NULL DEFAULT '{}', updated_at TIMESTAMPTZ DEFAULT NOW())`,
    ],
  },
  {
    id: "002-reviews-table",
    statements: [
      `CREATE TABLE IF NOT EXISTS reviews (id TEXT PRIMARY KEY, product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE, name TEXT NOT NULL DEFAULT '', email TEXT, rating INTEGER NOT NULL DEFAULT 5, body TEXT NOT NULL DEFAULT '', anonymous BOOLEAN NOT NULL DEFAULT FALSE, active BOOLEAN NOT NULL DEFAULT TRUE, created_at TIMESTAMPTZ DEFAULT NOW())`,
      `CREATE INDEX IF NOT EXISTS reviews_product_idx ON reviews(product_id)`,
    ],
  },
  {
    // One-off cleanup: drop color entries with blank names (they rendered
    // as duplicate React keys and untaggable swatches).
    id: "003-strip-blank-colors",
    statements: [
      `UPDATE products SET colors = (SELECT COALESCE(jsonb_agg(c), '[]'::jsonb) FROM jsonb_array_elements(COALESCE(colors, '[]'::jsonb)) AS c WHERE COALESCE(c->>'name', '') <> ''), updated_at = NOW() WHERE colors IS NOT NULL`,
    ],
  },
  {
    id: "004-hero-image-setting",
    statements: [
      `ALTER TABLE settings ADD COLUMN IF NOT EXISTS hero_image TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6'`,
    ],
  },
  {
    id: "005-hero-section-images",
    statements: [
      `ALTER TABLE settings ADD COLUMN IF NOT EXISTS hero_images JSONB NOT NULL DEFAULT '{}'`,
    ],
  },
];

export async function ensureSchema(): Promise<{ applied: string[] }> {
  if (!db) throw new Error("Database is not connected.");
  const applied: string[] = [];
  for (const m of MIGRATIONS) {
    for (const stmt of m.statements) {
      await db.execute(sql.raw(stmt));
      applied.push(`${m.id}: ${stmt.slice(0, 80)}${stmt.length > 80 ? "…" : ""}`);
    }
  }
  return { applied };
}
