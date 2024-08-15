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
        
            <div className=" text-colorPrimary">
                <div className="w-full
                                mysm:hidden 
                                movileS:hidden
                                grid grid-cols-10 gap-g8
                                mysm:grid-cols-4 mysm:text-fs1
                                text-fs1rem tablet:text-fs1
                                font-fw3
                                items-center justify-between 
                                uppercase">

                    <div className="col-span-2 
                                    w-[7rem]
                                    tablet:w-[6rem]
                                    desktop:w-[8rem]
                                    items-center justify-center ">
                                    <p className="text-center">Producto</p>
                    </div> 

                    <div className="col-span-8
                                    grid grid-cols-8 gap-g8
                                    mysm:grid-cols-4
                                    tablet:grid-cols-6
                                    laptop:grid-cols-7
                                    items-center justify-between">

                        <div className="flex flex-col
                                        col-span-3 laptop:col-span-2
                                        mysm:col-span-3 
                                        tablet:col-span-1 tablet:text-fs1
                                        tablet:text-left">
                                        <p className="text-colorGray leading-tight"></p>
                        </div>   
                        <div className="flex flex-col
                                        col-span-1 
                                        text-center">
                            <p className="text-fs2">Size</p>
                        </div>   
                        <div className="flex flex-col
                                        col-span-3 
                                        justify-between text-center">
                                <div className="col-span-full sm:col-span-1 flex gap-g8 justify-between items-center">
                                <div className="col-span-1 sm:col-span-1 flex flex-col text-center w-[4rem]">
                                <p className="text-fs2 ">unidad</p>
                                </div>   
                                <div className="col-span-1 sm:col-span-2 flex items-center justify-center">
                                    <p className="text-fs2 laptop:mx-2">Cantidad</p>
                                </div>
                                <div className="col-span-1 sm:col-span-1 text-center w-[5.5rem]">
                                    <p className="text-fs2 pr-2.5">Total </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex
                                        col-span-1
                                        text-center justify-center">
                                        <p className="text-colorGray"></p>
                        </div>
                    </div>
                </div>
                {productsInCart.map(product => (
                <div key={`${product.slug}-${product.size}`} className="
                    w-full h-[7.65rem] mysm:h-fit movileS:h-fit mb-m8
                    grid grid-cols-10 gap-g8
                    mysm:grid-cols-7  
                    movileS:grid-cols-7 
                    items-center justify-between uppercase 
                    bg-colorSecondary border-colorPrimary text-colorPrimary rounded-brAll border-customBW overflow-hidden">
                   
                    <div className="w-[7rem] mysm:w-fit tablet:w-[6rem] movileS:w-fit 
                                    h-[7rem] mysm:h-fit tablet:h-fit movileS:h-fit
                                    col-span-2 m-1
                                    items-center justify-center ">
                        <ProductImage
                            src={product.image}
                            width={852}
                            height={852}
                            priority
                            alt={product.title}
                            className={clsx("rounded-brAll border-customBW w-full h-full", {
                            })}
                        />
                    </div>

                    <div className="mx-4 movileS:mx-0
                                    col-span-8 mysm:col-span-5 movileS:col-span-5
                                    grid grid-cols-8 gap-6 movileS:gap-4
                                    mysm:grid-cols-5 movileS:grid-cols-5 tablet:grid-cols-6 laptop:grid-cols-7 
                                    text-fs1rem tablet:text-fs1 laptop:text-fs2 desktop:text-fsLogo movileS:text-xs sm:text-fsHeader
                                    items-center justify-between font-fw7">
                        
                        <div className="flex flex-col mysm:pl-0 movileS:pl-0 pl-2 desktop:pl-0
                                        col-span-3 
                                        mysm:col-span-4 movileS:col-span-4
                                        tablet:col-span-1  
                                        laptop:col-span-2
                                        tems-center mysm:items-start movileS:items-start">
                                            
                                        <Link className="hover:underline cursor-pointer hover:text-colorHover font-fw7 leading-tight text-left mysm:whitespace-nowrap" href={`/product/${product.slug}`}>
                                            {product.title}
                                        </Link>
                        </div>
                        <div className="col-span-1 flex flex-col text-center ">
                            <div className="font-fw7">
                                {product.size}
                            </div>
                        </div>
                        <div className="flex flex-col
                                        col-span-3
                                        mysm:col-span-4 movileS:col-span-4
                                        justify-between text-center ">
                                        <div className="flex gap-g8 
                                                        mysm:col-span-full movileS:col-span-full col-span-1 justify-between items-center">
                                <div className="col-span-1 flex flex-col text-center w-[4rem] mysm:text-left movileS:text-left">
                                    <div className="">
                                        ${product.price}
                                    </div>
                                </div>
                                <div className="flex
                                                col-span-2
                                                mysm:col-span-1 movileS:col-span-1
                                                laptop:mx-2
                                                items-center mysm:items-start movileS:items-start  justify-center ">
                                                <div className="w-full">
                                                    <QuantitySelectorVertical
                                                        quantity={product.quantity}
                                                        onQuantityChanged={quantity => updateProductQuantity(product, quantity)} 
                                                    />
                                                </div>
                                </div>
                                <div className="col-span-1 text-center tablet:text-right w-[5.5rem] mysm:w-[8rem] movileS:w-[8rem] ">
                                    <p className="">${(product.price * product.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 flex text-center justify-center ">
                            <PiTrash
                                className="cursor-pointer hover:text-colorHover text-[1.7rem] movileS:text-[1rem] mysm: "
                                onClick={() => removeProductFromCart(product)}
                            />
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </>
    );
}
