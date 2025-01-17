import { OrderList } from "@/modules/orders";
import { HeaderPage } from "@/modules/shared";

export default function OrdersPage() {
  return (
    <>
      <HeaderPage
        title="Listado de comandas"
        description="Listado de pedidos del restaurante"
        linkName="Nuevo pedido"
        pathName="/admin/home"
      />

      <OrderList/>
    </>
  );
}