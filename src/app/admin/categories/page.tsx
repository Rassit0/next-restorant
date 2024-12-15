import { CategoryTable } from "@/modules/categories";
import { HeaderPage } from "@/modules/shared";

export default function CategoriesPage() {
  return (
    <>
      {/* HEADER */}
      <HeaderPage
        description="Listado de tus categorías en el restaurante"
        title="Categorías"
        linkName="Nueva Categoría"
        pathName="/admin/categories/new"
      />


      {/* TABLA DE CATEGORIAS */}
      <CategoryTable />
    </>
  );
}