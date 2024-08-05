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
                    <div key={`${product.slug}-${product.size}`} className="flex mb-5 h-full w-full ">

                        <ProductImage
                            src={product.image}
                            width={150}
                            height={150}
                            style={{
                                width: '130px',
                                height: '140px',
                            }}
                            priority
                            alt={product.title}
                            className="mr-5 rounded-brAll border-colorPrimary border-customBW"
                        />
                        <div className="w-full h-full">
                            <Link className="hover:underline cursor-pointer hover:text-colorHover" href={`/product/${product.slug}`}>
                                {product.size} - {product.title}
                            </Link>
                            <p className=""> ${product.price} </p>
                            <QuantitySelector
                                quantity={product.quantity}
                                onQuantityChanged={quantity => updateProductQuantity(product, quantity)}
                            />
                            <button
                                onClick={() => removeProductFromCart(product)}
                                className="underline ">
                                Eliminar
                            </button>
                        </div>

                    </div>
                ))
            }


        </>
    )
}
