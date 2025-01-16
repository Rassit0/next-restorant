import { Product } from "@prisma/client";

export interface ICart{
    product: Product;
    quantity: number;
}