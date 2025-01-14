"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const deleteProduct = async (id: string) => {
    try {
        await prisma.product.delete({
            where:{
                id
            }
        })

        revalidatePath('/admin/products');
        return {
            error: null,
            message: "Producto eliminado exitosamente"
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}