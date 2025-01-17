import { create, StateCreator } from "zustand";
import { ICart } from "../interfaces/cart";
import { Product } from "@prisma/client";
import { toast } from "sonner";
import { persist } from "zustand/middleware";

// Las variables q van a ser modificadas
interface CartState {
    cart: ICart[];
    total: number;
    isCartOpen: boolean;
}

// Las funciones del store
interface Actions {
    handleCartOpen: () => void;
    addProductToCart: (product: Product) => void;
    incrementQuantity: (id: string) => void;
    decrementQuantity: (id: string) => void;
    removeProductToCart: (id: string) => void;

    calcTotal: () => void;
    cleanCart: () => void;
}

// La lógica
const storeApi: StateCreator<CartState & Actions> = (set, get) => ({
    cart: [],
    total: 0,
    isCartOpen: false,
    handleCartOpen: () => {
        const { isCartOpen } = get();

        set({ isCartOpen: !isCartOpen });
    },
    addProductToCart: (product: Product) => {
        const { cart, calcTotal } = get();

        const productExists = cart.some(item => item.product.id == product.id)

        if (productExists) {
            toast.warning("El producto ya se agrego");
            return;
        }

        set({
            cart: [...cart, { product, quantity: 1 }]
        })

        toast.success('Producto agregado al carrito');
        calcTotal();
    },
    incrementQuantity: (id: string) => {
        const { cart, calcTotal } = get();

        const updateCartProducts = cart.map(item => {
            if (item.product.id == id) {
                return { ...item, quantity: item.quantity + 1 }
            }

            return item;
        });

        set({ cart: updateCartProducts }); // toma el listado actualizado
        calcTotal();
    },
    decrementQuantity: (id: string) => {
        const { cart, removeProductToCart, calcTotal } = get();

        // Si ya es uno y se decrementa, se eliminar el producto del carrito
        const deleteProductToCart = cart.filter(item => item.product.id == id);
        if (deleteProductToCart[0].quantity === 1) {
            removeProductToCart(id);
            return;
        }

        const updateCartProducts = cart.map(item => {
            if (item.quantity == 1) {
                return item;
            }

            if (item.product.id === id) {
                return { ...item, quantity: item.quantity - 1 }
            }

            return item;
        });

        set({ cart: updateCartProducts });
        calcTotal();
    },
    removeProductToCart: (id: string) => {
        const { cart, calcTotal } = get();

        const updateCartProducts = cart.filter(item => item.product.id != id);

        set({ cart: updateCartProducts });
        calcTotal();
    },
    calcTotal: () => {
        const { cart } = get();

        let subTotal = 0;

        cart.forEach(item => {
            subTotal += item.product.price * item.quantity;
        });

        set({ total: subTotal });
    },
    cleanCart: () => {
        set({ cart: [], total: 0 })
    }
});

// Exporta la lógica
export const useCartStore = create<CartState & Actions>()(
    //Hacer persistente el store para que no se pierda los datos al actualizar la pagina
    persist(
        storeApi,
        { name: "cart-menu-storage" } // Va guardar la info en el storage con este nombre
    )
    // storeApi
);