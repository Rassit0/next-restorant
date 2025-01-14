import { CategoryTable, getCategories } from "@/modules/categories";
import { HeaderPage } from "@/modules/shared";

export default async function CategoriesPage() {

  // OBTENER CATEGORIAS
  const categories = await getCategories();
  
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
      <CategoryTable
        categories = { categories }
      />
    </>
  );
}