import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface State {
    cart: CartProduct[];


    getTotalItems: () => number;

    // Funcion para la informacion del resumen del carrito
    getSummaryInformation: () => {
        subTotal: number;
        tax: number;
        total: number;
        itemsInCart: number;
    };

    // Add a product to the cart
    addProductToCart: (product: CartProduct) => void;
    // Remove a product from the cart
    removeProductFromCart: (product: CartProduct) => void;
    // Update the quantity of a product in the cart
    updateProductQuantity: (product: CartProduct, quantity: number) => void;

    //clear cart
    clearCart: () => void;
}


export const useCartStore = create<State>()(

    persist(
        (set, get) => ({


            cart: [],

            //Methods
            getTotalItems: () => {
                const { cart } = get();
                return cart.reduce((total, item) => total + item.quantity, 0);
            },

            getSummaryInformation: () => {
                const { cart } = get();
                const subTotal = cart.reduce((subTotal, product) => (product.price * product.quantity) + subTotal, 0);
                const tax = subTotal * 0.15;
                const total = subTotal + tax;
                const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

                return { subTotal, tax, total, itemsInCart };
            },

            addProductToCart: (product) => {
                const { cart } = get();

                // 1. Revisar si el producto existe en el carrito con la talla seleccionada.
                const productInCart = cart.some(
                    (item) => (item.id === product.id && item.size === product.size)
                );
                if (!productInCart) {
                    set({ cart: [...cart, product] })
                    return;
                }
                // 2. Se que el producto existe por talla... tengo que incrementar la cantidad.
                const updatedCarProducts = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: item.quantity + product.quantity }
                    }
                    return item;
                });

                set({ cart: updatedCarProducts });
            },

            updateProductQuantity: (product: CartProduct, quantity: number) => {
                const { cart } = get();
                const updatedCartProducts = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity }
                    }
                    return item;
                });

                set({ cart: updatedCartProducts });
            },
            removeProductFromCart: (product: CartProduct) => {
                const { cart } = get();
                const updatedCartProducts = cart.filter((item) => item.id !== product.id || item.size !== product.size);
                set({ cart: updatedCartProducts });
            },
            clearCart: () => {
                set({ cart: [] });
            }
        }),



        {
            name: "shopping-cart",
        }

    )


)