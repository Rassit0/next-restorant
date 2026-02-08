import { prisma } from '@/lib/prisma'

export async function GET() {
    const orders = await prisma.orders.findMany({
        include: {
            details: {
                select: {
                    productName: true,
                    productPrice: true,
                    quantity: true,
                    subTotal: true,
                }
            }
        },
        orderBy:{
            createdAt:'desc'
        }
    });

    // return new Error("Ocurrio un erro en el servidor")

    return Response.json(orders);

}