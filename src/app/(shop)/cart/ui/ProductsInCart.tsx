'use client';

import { ProductImage, QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from 'clsx';

export const ProductsInCart = () => {
    const [loaded, setLoaded] = useState(false);
    const productsInCart = useCartStore(state => state.cart);
    const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
    const removeProductFromCart = useCartStore(state => state.removeProductFromCart);

    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!loaded) {
        return <p>Cargando... </p>;
    }

    const isSingleProduct = productsInCart.length === 1;

    return (
        <>
            {productsInCart.map(product => (
                <div key={`${product.slug}-${product.size}`} className="flex p-5 h-full w-full bg-colorSecondary border-colorPrimary text-colorPrimary rounded-brAll border-customBW overflow-hidden text-fs1.2rem mysm:text-fs2">
                    <ProductImage
                        src={product.image}
                        width={852}
                        height={852}
                        priority
                        alt={product.title}
                        className={clsx("mr-5 rounded-brAll border-customBW", {
                            "w-40 mysm:w-32": !isSingleProduct,
                            "w-52 mysm:w-48": isSingleProduct // Clases aplicadas si solo hay un producto
                        })}
                    />

                    <div className="w-full h-full">
                        <Link className="hover:underline cursor-pointer hover:text-colorHover font-fw7 uppercase" href={`/product/${product.slug}`}>
                            {product.size} - {product.title}
                        </Link>
                        <p className=""> ${product.price} </p>
                        <div className="laptop:max-w-full">
                            <QuantitySelector
                                quantity={product.quantity}
                                onQuantityChanged={quantity => updateProductQuantity(product, quantity)}
                            />
                        </div>
                        <button
                            onClick={() => removeProductFromCart(product)}
                            className="underline hover:text-colorHover">
                            Eliminar
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
}
