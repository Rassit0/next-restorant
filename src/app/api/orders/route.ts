import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const orders = await prisma.orders.findMany({
      where: {
        ...(startDate || endDate
           ? {
        createdAt: {
          ...(startDate ? { 
            gte: new Date(`${startDate}T00:00:00.000Z`) 
          } : {}),
          ...(endDate ? { 
            lte: new Date(`${endDate}T23:59:59.999Z`)
          } : {})
        }
      }
    : {})
      },
      include: {
        details: {
          select: {
            productName: true,
            productPrice: true,
            quantity: true,
            subTotal: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 },
    );
  }
}
