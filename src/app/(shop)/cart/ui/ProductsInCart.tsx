'use client';

import { ProductImage, QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";



export const ProductsInCart = () => {

    const [loaded, setloaded] = useState(false);
    const productsIncCart = useCartStore(state => state.cart);
    const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
    const removeProductFromCart = useCartStore(state => state.removeProductFromCart);

    useEffect(() => {
        setloaded(true);
    }, []);


    if (!loaded) {
        return <p>Cargando... </p>
    }


    return (
        <>
            {
                productsIncCart.map(product => (
                    <div key={`${product.slug}-${product.size}`} className="flex mb-5">

                        <ProductImage
                            src={product.image}
                            width={100}
                            height={100}
                            style={{
                                width: '100px',
                                height: '100px',
                            }}
                            priority
                            alt={product.title}
                            className="mr-5 rounded"
                        />
                        <div>
                            <Link className="hover:underline cursor-pointer" href={`/product/${product.slug}`}>
                                {product.size} - {product.title}
                            </Link>
                            <p> ${product.price} </p>
                            <QuantitySelector
                                quantity={product.quantity}
                                onQuantityChanged={quantity => updateProductQuantity(product, quantity)}
                            />
                            <button
                                onClick={() => removeProductFromCart(product)}
                                className="underline mt-3">
                                Eliminar
                            </button>
                        </div>

                    </div>
                ))
            }


        </>
    )
}
