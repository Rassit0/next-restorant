import { CategorySelector, getCategories } from "@/modules/categories";
import { ProductList } from "@/modules/products";
import { HeaderPage } from "@/modules/shared";

export default async function HomePage() {

  const categories = await getCategories();

  return (
    <>
      <HeaderPage
        title="Menu virtual"
        description="Menu virtual del restaurante"
        pathName="/admin/products/new"
        linkName="Agregar Producto"
      />

      {/* CATEGORY SELECTO es un listado de las categorias para filtrar los productos*/}
      <CategorySelector
        categories={categories}
      />

      {/* PRODUCT LIST */}
      <ProductList/>
    </>


  );
}