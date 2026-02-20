import { Button, Card, Chip, Divider } from "@nextui-org/react";
import React, { useState } from "react";
import { IOrderWithDetails } from "../interfaces/orders-with-details";
import { canceledOrder, completeOrder } from "@/modules/orders";

interface Props {
  order: IOrderWithDetails;
}
export const OrderCard = ({ order }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCompletedOrder = async (id: string) => {
    setIsLoading(true);

    await completeOrder(id);

    setIsLoading(false);
  };

   const handleCanceledOrder = async (id: string) => {
    setIsLoading(true);

    await canceledOrder(id);

    setIsLoading(false);
  };

  const statusColorMap: Record<
    IOrderWithDetails["status"],
    "warning" | "success" | "danger"
  > = {
    PENDING: "warning",
    COMPLETED: "success",
    CANCELED: "danger",
  };

  const statusTextMap: Record<
    IOrderWithDetails["status"],
    "Pendiente" | "Completado" | "Cancelado"
  > = {
    PENDING: "Pendiente",
    COMPLETED: "Completado",
    CANCELED: "Cancelado",
  };

  return (
    <Card
      // isPressable
      shadow="md"
      className="border-none rounded-xl p-6 hover:shadow-2xl flex justify-between"
      fullWidth
    >
      <div>
        <div className="text-start flex justify-between items-start">
          <div>
            <p className="font-semibold text-xl line-clamp-1">{order.client}</p>
            <p>{order.scheduledAt.toLocaleString()}</p>
          </div>

          <Chip color={statusColorMap[order.status]} variant="shadow">
            {statusTextMap[order.status]}
          </Chip>
        </div>

        <Divider className="my-3" />
        <div className="grid grid-cols-3 gap-2 w-full text-center font-semibold mb-3">
          <p>Items</p>
          <p>qty</p>
          <p>Precio</p>
        </div>
        <ul className="space-y-3">
          {order.details.map((detail) => (
            <li
              key={detail.productName}
              className="grid text-start grid-cols-3 items-center gap-2"
            >
              <p>{detail.productName}</p>
              <p className="text-center">{detail.quantity}u.</p>
              <p className="text-center">{detail.subTotal} Bs.</p>
            </li>
          ))}
        </ul>

        <Divider className="my-3" />

        <div className="w-full font-semibold text-xl flex justify-between">
          <p>Total:</p>
          <p>Bs. {order.total}</p>
        </div>
      </div>

      {order.status === "PENDING" && (
        <div className="flex gap-2">
          <Button
            fullWidth
            color="danger"
            onPress={() => handleCanceledOrder(order.id)}
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            Cancelar Orden
          </Button>
          <Button
            fullWidth
            color="primary"
            onPress={() => handleCompletedOrder(order.id)}
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            Completar Orden
          </Button>
        </div>
      )}
    </Card>
  );
};
