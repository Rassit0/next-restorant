
//ACTIONS
export { createProduct } from "./actions/create-product";
export { getAllProducts } from "./actions/get-all-products";
export { getProductsByCategory } from "./actions/get-products-by-category";
export { deleteProduct } from "./actions/delete-product";
export { getProductBySlug } from "./actions/get-product-by-slug";
export { ProductDetails } from "./components/ProductDetails";
export { ProductList } from "./components/product-list/ProductList";

//INTERFACES
export type { IProduct, IProductCategory } from './interfaces/products';
export type { IProductDetails } from './interfaces/product-details';

//COMPONENTS
export { ProductForm } from "./components/ProductForm";
export { ProductTable } from "./components/product-table/ProductTable";
export { DeleteProductModal } from "./components/product-table/DeleteProductModal";

