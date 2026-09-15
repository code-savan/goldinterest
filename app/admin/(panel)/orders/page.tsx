import { listOrders } from "@/lib/store";
import { OrdersManager } from "@/components/admin/orders-manager";

export default async function AdminOrdersPage() {
  const initial = await listOrders(200);
  return <OrdersManager initial={initial} />;
}
