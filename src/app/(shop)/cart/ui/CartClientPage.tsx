'use client';

import Link from "next/link";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { AddressForm } from "./address/AddressForm";
import { Title } from "@/components";
import { Product } from '../../../../interfaces/product.interface';


// Cargar componentes dinámicamente
const OrderSummaryDetails = dynamic(() => import('./resumen/OrderSummaryDetails'), { ssr: false });
const PlaceOrder = dynamic(() => import('./place-order/PlaceOrder').then(mod => mod.PlaceOrder), { ssr: false });
const ProductsInCart = dynamic(() => import('./ProductsInCart').then(mod => mod.ProductsInCart), { ssr: false });
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
                            <div className="grid grid-cols-1 sm:grid-cols-5 w-full h-full items-center py-2">
                                <Title className="sm:col-span-3 col-span-1 text-fs1.2rem sm:text-fs1rem font-fw7 uppercase whitespace-nowrap" title="Agregar más items" />
                                
                            </div>
                            <div className=" w-full">
                                <div className="col-span-2 mysm:col-span-1 h-full w-full flex  justify-between items-center font-fw7 text-fs1rem">
                                        <Link href="/" className=" col-span-2 mysm:col-span-1 pl-5 underline hover:text-colorHover justify-between items-center font-fw5 text-fs1rem">
                                            ¡Continúa comprando!
                                        </Link>
                                </div>
                            </div>
                            <div className="grid mysm:grid-cols-1 grid-cols-5 gap-g8 mysm:gap-1 w-full h-full">
                                    {/* Carrito */}
                                    <div className="col-span-3 mysm:col-span-1 h-fit w-full">
                                        <ProductsInCart />
                                    </div>
                                    {/* Resumen de la orden */}
                                    <div className="sm:col-span-2 col-span-1 h-full w-full">
                                        <OrderSummaryDetails setShowAddressForm={handleNext} />
                                    </div>
                            </div>
                        </>
                    )}

                    
                    {step === 2 && (
                        <>
                        <div className="ml-3 grid grid-cols-2 gap-g8 w-full h-full">
                            <span className="text-fs1.2rem font-fw7 uppercase">Agregar más items</span>
                            <Link href="/" className="underline mb-5 mysm:pl-5 hover:text-colorHover text-fs1rem font-fw5">
                                ¡Continúa comprando!
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-g8 w-full h-full">
                            {/* Carrito */}
                            <div className="flex flex-col w-full h-fit gap-g8">
                                {/* Items del carrito */}
                                <ProductsInCart />
                            </div>
                            <AddressForm
                                countries={countries}
                                userStoredAddress={userAddress}
                                onNext={handleNext} // Pasar la función `handleNext` a `AddressForm`
                            />
                        </div>
                        </>
                    )}
                {step === 3 && (
                    <>
                    <div className="ml-3 grid grid-cols-2 gap-g8 w-full h-full">
                        <Title className="pl-5 font-fw7 text-fs1rem" title="Verificar Orden" />
                        <Link href="/cart" className="underline mb-5 mysm:pl-5 hover:text-colorHover text-fs1rem font-fw5">
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
