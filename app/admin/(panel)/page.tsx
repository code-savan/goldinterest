import Link from "next/link";
import { dbReady } from "@/db";
import { adminConfigured } from "@/lib/admin-auth";
import { adminProductCount, orderStats } from "@/lib/store";
import { promos } from "@/db/schema";
import { Card, PageTitle } from "@/components/admin/ui";
import { SeedButton } from "@/components/admin/seed-button";
import { SyncButton } from "@/components/admin/sync-button";

export default async function AdminDashboard() {
  const [stats, productCount, promoCount] = await Promise.all([
    orderStats(),
    adminProductCount(),
    (async () => {
      if (!dbReady) return 0;
      try {
        const { db } = await import("@/db");
        const rows = await db!.select({ id: promos.id }).from(promos);
        return rows.length;
      } catch {
        return 0;
      }
    })(),
  ]);

  return (
    <div>
      <PageTitle title="Dashboard" sub="A calm overview of the store." />

      <SyncButton />

      {!dbReady && (
        <Card className="p-6 mb-6 border-[#C9A96E]">
          <div className="text-[11px] tracking-[0.16em] uppercase font-medium text-[#8C6A2F]">Setup needed</div>
          <p className="text-[13px] leading-6 text-[#6E6E73] mt-2 max-w-[560px]">
            The database is not connected yet. In the Vercel dashboard, open Storage, create a Postgres database, then run
            the statements in <span className="font-medium text-black">db/migrate.sql</span> in the database query tab. The
            storefront keeps running on the built in catalog until then.
          </p>
        </Card>
      )}

      {!adminConfigured() && (
        <Card className="p-6 mb-6 border-[#C9A96E]">
          <div className="text-[11px] tracking-[0.16em] uppercase font-medium text-[#8C6A2F]">Login not set</div>
          <p className="text-[13px] leading-6 text-[#6E6E73] mt-2">
            Add ADMIN_PASSWORD to the environment so this area stays private.
          </p>
        </Card>
      )}

      {dbReady && productCount === 0 && (
        <Card className="p-6 mb-6">
          <div className="text-[11px] tracking-[0.16em] uppercase font-medium">Catalog is empty</div>
          <p className="text-[13px] text-[#6E6E73] mt-2 mb-4">Bring in the current products to start managing them here.</p>
          <SeedButton />
        </Card>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Revenue", value: `$${stats.revenue.toFixed(2)}` },
          { label: "Orders", value: String(stats.total) },
          { label: "Products", value: productCount == null ? "n/a" : String(productCount) },
          { label: "Active promos", value: String(promoCount) },
        ].map((s) => (
          <Card key={s.label} className="p-4 sm:p-5">
            <div className="text-[10px] sm:text-[11px] tracking-[0.16em] uppercase text-[#8A8A90]">{s.label}</div>
            <div className="font-serif text-[24px] sm:text-[28px] leading-none mt-2 truncate">{s.value}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
        <Card className="p-5">
          <div className="text-[11px] tracking-[0.16em] uppercase font-medium">Orders by status</div>
          <div className="mt-3 space-y-2">
            {Object.keys(stats.byStatus).length === 0 && <div className="text-[13px] text-[#8A8A90]">No orders yet.</div>}
            {Object.entries(stats.byStatus).map(([k, v]) => (
              <div key={k} className="flex items-center justify-between text-[13px]">
                <span className="capitalize">{k}</span>
                <span className="font-medium">{v}</span>
              </div>
            ))}
          </div>
          <Link href="/admin/orders" className="inline-block mt-4 text-[11px] tracking-[0.14em] uppercase underline underline-offset-4">
            Manage orders
          </Link>
        </Card>
        <Card className="p-5">
          <div className="text-[11px] tracking-[0.16em] uppercase font-medium">Recent orders</div>
          <div className="mt-3 space-y-3">
            {stats.recent.length === 0 && <div className="text-[13px] text-[#8A8A90]">Nothing here yet.</div>}
            {stats.recent.map((o) => (
              <div key={o.id} className="flex items-center justify-between gap-3 text-[13px]">
                <div className="min-w-0">
                  <div className="font-medium truncate">{o.email}</div>
                  <div className="text-[11px] text-[#8A8A90]">{o.id.slice(0, 8)} · {o.status}</div>
                </div>
                <div className="font-medium shrink-0">${Number(o.total).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
