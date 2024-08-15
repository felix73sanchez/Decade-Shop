'use client';

import Link from "next/link";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { AddressForm } from "./address/AddressForm";
import { Title } from "@/components";
import { Product } from '../../../../interfaces/product.interface';


// Cargar componentes dinámicamente
const OrderSummaryDetails = dynamic(() => import('./checkout/resumen/OrderSummaryDetails'), { ssr: false });
const PlaceOrder = dynamic(() => import('./place-order/PlaceOrder').then(mod => mod.PlaceOrder), { ssr: false });
const ProductsInCart = dynamic(() => import('./products-in-cart/ProductsInCart').then(mod => mod.ProductsInCart), { ssr: false });
const ProductsPlaceOrder = dynamic(() => import('./place-order/ProductsPlaceOrder').then(mod => mod.ProductsPlaceOrder), { ssr: false });

interface CartClientPageProps {
    countries: any[]; // Reemplaza `any` con el tipo adecuado si es posible
    userAddress: any; // Reemplaza `any` con el tipo adecuado si es posible
}

const CartClientPage: React.FC<CartClientPageProps> = ({ countries, userAddress }) => {

    const [step, setStep] = useState(1); // 1: OrderSummaryDetails, 2: AddressForm, 3: PlaceOrder

    const handleNext = () => {
        setStep(prevStep => prevStep + 1);
    };

    return (
        <div className="">
            
                    {/* Renderizado condicional basado en el paso */}
                    {step === 1 && (
                        <>
                            <div className="grid mysm:grid-cols-2 movileS:grid-cols-2 grid-cols-5 gap-g8 w-full h-full items-center justify-center py-p8 movileS:text-center">
                                    <Title className="col-span-3 mysm:col-span-1 movileS:col-span-1 uppercase" title="Agregar más items" />
                                    <Link href="/" className=" col-span-2 mysm:col-span-1 movileS:col-span-1 pl-5 underline hover:text-colorHover justify-between items-center font-fw5 text-fs1rem mysm:text-fs1 movileS:text-sm ">
                                        ¡Continúa comprando!
                                    </Link>
                                
                            </div>
                            <div className="grid mysm:grid-cols-1 movileS:grid-cols-1 grid-cols-5 gap-g8 mysm:gap-1 w-full h-full">
                                    {/* Carrito */}
                                    <div className="col-span-3 mysm:col-span-1 movileS:col-span-1 h-fit w-full">
                                        <ProductsInCart />
                                    </div>
                                    {/* Resumen de la orden */}
                                    <div className="col-span-2 mysm:col-span-1 movileS:col-span-1 h-full w-full">
                                        <OrderSummaryDetails setShowAddressForm={handleNext} />
                                    </div>
                            </div>
                        </>
                    )}

                    
                    {step === 2 && (
                        <>
                        <div className="grid mysm:grid-cols-2 grid-cols-5 gap-g8 w-full h-full items-center justify-center py-p8">
                            <Title className="col-span-3 mysm:col-span-1 uppercase whitespace-nowrap"title="Agregar más items"/>
                            <Link href="/" className="col-span-2 mysm:col-span-1 pl-5 underline hover:text-colorHover justify-between items-center font-fw5 text-fs1rem mysm:text-fs1 whitespace-nowrap">
                                ¡Continúa comprando!
                            </Link>
                        </div>
                        <div className="grid mysm:grid-cols-1 grid-cols-5 gap-g8 mysm:gap-1 w-full h-full">
                            {/* Carrito */}
                            <div className="col-span-3 mysm:col-span-1 h-fit w-full">
                                {/* Items del carrito */}
                                <ProductsInCart />
                            </div>
                            <div className="sm:col-span-2 col-span-1 h-full w-full">
                                <AddressForm
                                    countries={countries}
                                    userStoredAddress={userAddress}
                                    onNext={handleNext} // Pasar la función `handleNext` a `AddressForm`
                                />
                            </div>
                        </div>
                        </>
                    )}
                {step === 3 && (
                    <>
                    <div className="grid mysm:grid-cols-2 grid-cols-2 gap-g8 w-full h-full items-center justify-center py-p8">
                        <Title className="col-span-1 mysm:col-span-1 uppercase whitespace-nowrap" title="Verificar Orden" />
                        <Link href="/cart" className="col-span-1 mysm:col-span-1 pl-5 underline hover:text-colorHover justify-between items-center font-fw5 text-fs1rem mysm:text-fs1 whitespace-nowrap">
                        Editar carrito
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-g8 w-full h-full">
                        {/* Carrito */}
                        <div className="flex flex-col w-full h-fit gap-g8">
                            {/* Items del carrito */}
                            <ProductsPlaceOrder />
                        </div>
                        <PlaceOrder />
                    </div>
                    </>
                )}
        </div>
    );
};

export default CartClientPage;
