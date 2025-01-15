"use client"
import { CircularProgress } from "@nextui-org/react";
import { Product } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProductsByCategory } from "@/modules/products";
import { ProductCard } from "./ProductCard";

export const ProductList = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);

    const categorySlug = useSearchParams().get('category');

    const updateProductList = async () => {
        setIsLoading(true);
        const productsResponse = await getProductsByCategory(categorySlug);
        setProducts(productsResponse);
        setIsLoading(false);
    }

    useEffect(() => {
        updateProductList();
    }, [categorySlug])
    

    if(isLoading){
        return (
            <section className="min-h[80vh] flex flex-col justify-center items-center">
                <CircularProgress aria-label="progress indicador" color="primary" size="lg"/>
            </section>
        )
    }

    return (
        <section className="pt-8 container">
            <ul className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
                {
                    products.map(product => (
                        <li key={product.id}>
                            <ProductCard product={product}/>
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}
