
//ACTIONS
export { createProduct } from "./actions/create-product";
export { getAllProducts } from "./actions/get-all-products";
export type { IProduct, IProductCategory } from './interfaces/products';
export { deleteProduct } from "./actions/delete-product";

//COMPONENTS
export { ProductForm } from "./components/ProductForm";
export { ProductTable } from "./components/product-table/ProductTable";
export { DeleteProductModal } from "./components/product-table/DeleteProductModal";