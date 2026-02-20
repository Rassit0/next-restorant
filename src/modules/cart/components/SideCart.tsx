"use client";
import { Button, Input } from "@nextui-org/react";
import { Cancel01Icon } from "hugeicons-react";
import React, { FormEvent, useState } from "react";
import { useCartStore } from "@/modules/cart";
import { CartList } from "@/modules/cart";
import { toast } from "sonner";
import { createNewOrder } from "@/modules/orders";

export const SideCart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isCartOpen, handleCartOpen, total, cart, cleanCart } = useCartStore();

  const generateNewOrder = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (cart.length === 0) {
      toast.warning("No hay elementos en el carrito");
      return;
    }

    // const { client } = e.target as HTMLFormElement;
    const form = e.target as HTMLFormElement;
    const client = (form.client as HTMLInputElement).value;
    const scheduledAtRaw = (form.scheduledAt as HTMLInputElement | undefined)
      ?.value;

    // Validación: obligatorio
    if (!scheduledAtRaw) {
      toast.warning("Debes seleccionar la fecha y hora de entrega");
      setIsLoading(false);
      return;
    }

    // Convertir a Date
    const scheduledAt = new Date(scheduledAtRaw);

    const { error, message } = await createNewOrder(
      cart,
      total,
      client,
      scheduledAt,
    );

    if (error) {
      toast.error(message);
      setIsLoading(false);
      return;
    }

    toast.success(message);
    cleanCart();

    setIsLoading(false);
  };

  return (
    <form
      onSubmit={generateNewOrder}
      className={`side__cart ${isCartOpen && "side__cart--show"}`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-2xl">Carrito de compras</h3>
        <Button
          variant="light"
          isIconOnly
          radius="full"
          onPress={handleCartOpen}
          startContent={<Cancel01Icon />}
        />
      </div>

      <Input
        size="sm"
        placeholder="Nombre del cliente"
        name="client"
        className="my-4"
      />
      <Input
        isRequired
        size="sm"
        type="datetime-local"
        placeholder="Fecha y hora de entrega"
        name="scheduledAt"
        className="my-2"
        defaultValue={(() => {
          const d = new Date();
          d.setHours(12, 0, 0, 0);
          const year = d.getFullYear();
          const month = String(d.getMonth() + 1).padStart(2, "0");
          const day = String(d.getDate()).padStart(2, "0");
          const hours = String(d.getHours()).padStart(2, "0");
          const minutes = String(d.getMinutes()).padStart(2, "0");
          return `${year}-${month}-${day}T${hours}:${minutes}`;
        })()}
      />

      {/* LISTADO DE CARRITO */}
      <CartList />

      <div className="flex-1"></div>

      <p className="flex justify-between">
        <span className="text-lg font-bold text-gray-500">Total:</span>
        <span className="text-primary font-bold">{total} Bs.</span>
      </p>

      <Button
        fullWidth
        color="primary"
        type="submit"
        isLoading={isLoading}
        isDisabled={isLoading}
      >
        Generar Orden
      </Button>
    </form>
  );
};
