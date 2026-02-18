"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const deleteUser = async (id: string) => {
    try {
        // Verificar si el usuario existe
        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) {
            return {
                error: true,
                message: "El usuario no existe"
            };
        }

        // Eliminar el usuario
        await prisma.user.delete({
            where: { id }
        });

        revalidatePath('/admin/users');

        return {
            error: null,
            message: "Usuario eliminado correctamente"
        };
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        
        return {
            error: true,
            message: "No se pudo eliminar el usuario. Asegúrese de que no tenga órdenes o datos relacionados."
        };
    }
}