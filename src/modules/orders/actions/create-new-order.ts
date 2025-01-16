"use server"

import { prisma } from "@/lib/prisma";
import { ICart } from "@/modules/cart"
import { revalidatePath } from "next/cache";

export const createNewOrder = async (cart: ICart[], total: number, client: string) => {

    // VERIFICAR EL STOCK DISPONIBLE
    cart.map(({ product, quantity }) => {
        if (quantity > product.price) {
            return {
                error: true,
                message: "Stock insuficiente"
            }
        }
    });

    // ORDER ITEMS
    const orderItems = cart.map(({ product, quantity }) => {
        return {
            productPrice: product.price,
            productName: product.name,

            quantity: quantity,
            subTotal: product.price * quantity,

            productId: product.id
        }
    });

    // ORDER DSCRIPTION
    const order = {
        total,
        client,
        status: false,
        user: "ususario-1",
    }

    // GENERAR VENTA
    try {
        // CREANDO LA ORDEN Y DETALLES
        await prisma.orders.create({
            data: {
                ...order,
                details: {
                    createMany: {
                        data: orderItems
                    }
                }
            }
        });

        // ACTUALIZAR EL STOCK DE CADA PRODUCTO
        cart.map(async ({ product, quantity }) => {
            await prisma.product.update({
                where: {
                    id: product.id
                },
                data: {
                    stock: product.stock - quantity
                }
            })
        });

        revalidatePath('/admin/home')

        return {
            error: false,
            message: "Orden generada"
        }
    } catch (error) {
        console.log(error)
        return {
            error: true,
            message: "Error al generar la orden"
        }
    }

}