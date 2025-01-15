"use server"

import { prisma } from "@/lib/prisma"
import { IProductDetails } from "../interfaces/product-details"

export const getProductBySlug = async (slug: string): Promise<IProductDetails | null> => {
    try {
        const product = await prisma.product.findFirst({
            where: {
                slug
            },
            include: {
                category: true
            }
        })

        return product;
    } catch (error) {
        console.log(error)
        throw error
    }
}