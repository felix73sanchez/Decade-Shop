'use client';

import { ProductImage, QuantitySelectorVertical } from "@/components";
import { useCartStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from 'clsx';
import { PiTrash } from "react-icons/pi";

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
        <div className="">
            <div className="w-full flex items-center justify-between h-full mb-m8 uppercase font-fw5 text-fs1rem mysm:text-fs1">
                <div className="mysm:w-[4rem] w-[8rem] text-center">                 
                    <p className="pl-2">Product</p>
                </div> 
                <div className="mysm:w-28 w-60">
                <p className=""></p>
                </div>   
                <div className="text-left ">
                    <p className="pl-2">Size</p>
                </div>   
                <div className="text-center mysm:w-16 w-22">
                    <p className="pl-2">Cantidad</p>
                </div>
                <div className="text-center">
                    <p className="pl-2">Total </p>
                </div>
                <div className=" mr-10 mysm:mr-[3.5rem]">
                    <p className=""></p>
                </div>
            </div>
            {productsInCart.map(product => (
                <div key={`${product.slug}-${product.size}`} 
                    className={clsx("mysm:p-0 w-full flex items-center justify-between h-full mb-m8 uppercase  bg-colorSecondary border-colorPrimary text-colorPrimary rounded-brAll border-customBW overflow-hidden  text-fs1rem mysm:text-fs1", {
                    })}>

                    <div className={clsx("rounded-brAll ", {
                            })}>
                        <ProductImage
                            src={product.image}
                            width={852}
                            height={852}
                            priority
                            alt={product.title}
                            className={clsx("rounded-brAll border-customBW mysm:w-[4rem] mysm:h-[4.2rem] w-[8rem] h-[7.2rem] ", {
                            })}
                        />
                    </div>
                        <div className="pl-5 mysm:pl-0.5 mysm:w-[4.5rem] w-60 ">
                            <Link className=" hover:underline cursor-pointer hover:text-colorHover font-fw7 mysm:text-[0.6rem] leading-tight text-fs1rem" href={`/product/${product.slug}`}>
                                {product.title} - ${product.price}
                            </Link>
                        </div>   
                        <div className="">
                            <Link className="hover:underline cursor-pointer hover:text-colorHover font-fw5 mysm:text-fs1 text-fs1rem" href={`/product/${product.slug}`}>
                                {product.size}
                            </Link>
                        </div>   
                        <div className="mx-2 mysm:p-0 mysm:mx-0 p-1 mysm:text-fs1 text-fs1rem mysm:w-16 w-22 items-center justify-center border-colorPrimary border-customBW rounded-brAll ">
                            <QuantitySelectorVertical
                                quantity={product.quantity}
                                onQuantityChanged={quantity => updateProductQuantity(product, quantity)}
                            />
                        </div>
                        <div className="">
                            <p className="mysm:text-fs1 text-fs1rem">${(product.price * product.quantity).toFixed(2)}</p>
                        </div>
                        <div className="p-1 mr-3 mysm:mr-2">
                            <PiTrash
                                className="cursor-pointer hover:text-colorHover text-[20px] mysm:text-[16px]"
                                onClick={() => removeProductFromCart(product)}
                            />
                        </div>
                </div>
            ))}
        </div>
        </>
    );
}
