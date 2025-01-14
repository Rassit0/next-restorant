import { getCategories } from "@/modules/categories";
import { ProductForm } from "@/modules/products";
import { HeaderPage } from "@/modules/shared";

export default async function CreateNewProductPage() {

    const categories = await getCategories();

    return (
        <>
            <HeaderPage
                title="Agrega un nuevo producto"
                description="Agrega un nuevo producto a tu gestion de restaurante"
                linkName="Volver"
                pathName="/admin/products"
            />

            {/* FORMULARIO */}
            <ProductForm
                categories={categories}
            />
        </>
    );
}