"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const deleteCategory = async (id: string) => {
    try {
        await prisma.category.delete({
            where: { id }
        })

        revalidatePath('/admin/categories');

        return {
            error: null,
            message: "Se eliminó la categoría"
        }
    } catch (error) {
        console.log(error)

        return {
            error: true,
            message: "Revise los logs del sistema"
        }
    }
}