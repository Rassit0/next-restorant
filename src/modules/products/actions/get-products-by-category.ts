"use server"

import { prisma } from "@/lib/prisma"

export const getProductsByCategory = async (categorySlug: string | null) => {
    try {
        if(categorySlug){
            const products = await prisma.product.findMany({
                where:{
                    category:{
                        slug: categorySlug
                    }
                }
            });

            return products;
        }

        const products = await prisma.product.findMany();
        return products;
    } catch (error) {
        console.log(error)
        throw error;
    }
}