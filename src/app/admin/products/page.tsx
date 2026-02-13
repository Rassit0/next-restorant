import { getCategories } from "@/modules/categories";
import { getAllProducts, ProductTable } from "@/modules/products";
import { HeaderPage } from "@/modules/shared";

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategories(),
  ]);

  return (
    <>
      <HeaderPage
        title="Productos"
        description="Gestion de productos y comidas en el restaurante"
        linkName="Agregar Producto"
        pathName="/admin/products/new"
      />

      {/* PRODUCT TABLE */}
      <ProductTable products={products} categories={categories} />
    </>
  );
}
