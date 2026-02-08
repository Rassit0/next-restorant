import { getAllProducts, getProductBySlug, ProductDetails } from "@/modules/products";
import { HeaderPage } from "@/modules/shared";
import { notFound } from "next/navigation";

export default async function ProductDetailsPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const product = await getProductBySlug(slug);
    if (!product) {
        notFound();
    }

    return (
        <>
            <HeaderPage
                title={product.name}
                description="Detalles del producto"
                linkName="Volver"
                pathName="/admin/products"
            />

            <ProductDetails product={product} />

        </>
    );
}


export async function generateStaticParams() {
    const products = await getAllProducts();

    // Devuelve los slugs creados actualizados para construir las paginas que dependen de slug
    return products.map(product => ({
        slug: product.slug
    }))
}

export const revalidate = 5 // cada 5 segundos se va generar toda la informacion de manera estatica