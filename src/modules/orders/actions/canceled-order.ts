"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export const canceledOrder = async (id: string) => {
    try {
        await prisma.orders.update({
            where:{id},
            data:{
                status: 'CANCELED',
            }
        });

        revalidatePath('/admin/orders');
    } catch (error) {
        console.log(error);
        throw error;
    }
}