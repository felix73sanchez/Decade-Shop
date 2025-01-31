'use client';


import { QuantitySelector, SizeSelector } from "@/components";
import type { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";
import { useState } from "react";


interface Props {
    product: Product;
}

export const AddToCart = ({ product }: Props) => {

    const addProductToCart = useCartStore(state => state.addProductToCart);
    const [size, setSize] = useState<Size | undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    const [posted, setposted] = useState(false);

    const addToCart = () => {
        setposted(true);
        if (!size) return;

        const cartProduct: CartProduct = {
            id: product.id,
            quantity: quantity,
            size: size,
            title: product.title,
            price: product.price,
            image: product.images[0],
            slug: product.slug
        }

        addProductToCart(cartProduct);
        setposted(false);
        setQuantity(1);
        setSize(undefined);

    }



    return (
        <>
            {
                posted && !size && (
                    <span className=" mt-2 text-red-500 fade-in">
                        Debe de seleccionar una talla*
                    </span>
                )
            }


            {/* Selector de Tallas */}
            <SizeSelector
                selectedSize={size}
                availableSizes={product.sizes}
                onSizeChanged={setSize}
            />

            {/* Selector de cantidad */}
            <QuantitySelector
                quantity={quantity}
                onQuantityChanged={setQuantity}
            />

            {/* Boton de Añadir al Carrito */}
            <button
                onClick={addToCart}
                className="btn-primary my-5">Añadir al Carrito</button>

        </>
    )
}
