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
