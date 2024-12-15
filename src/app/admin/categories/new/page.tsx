import { CategoryForm } from "@/modules/categories";
import { HeaderPage } from "@/modules/shared";

export default function NewCategoryPage() {
    return (
        <>
            {/* HEADER */}
            <HeaderPage
                description="Agrega una nueva categoría para tus productos"
                title="Agregar Categoría"
                linkName="Volver"
                pathName="/admin/categories"
            />

            {/* FORMULARIO */}
            <section className="container pt-8">
                <CategoryForm />
            </section>
        </>
    );
}