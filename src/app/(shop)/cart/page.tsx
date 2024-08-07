"use client";

import { useState } from 'react';
import { Title } from "@/components";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { Footer } from "@/components";
import { AddressForm } from "../checkout/address/ui/AddressForm"; // Importar AddressForm
import OrderSummaryDetails from "./ui/OrderSummaryDetails"; // Importar el nuevo componente

const countries = [
  { id: 'us', name: 'United States' },
  { id: 'ca', name: 'Canada' },
  // Agrega otros países según sea necesario
];

export default function CartPage() {
    const [showAddressForm, setShowAddressForm] = useState(false);

    return (
        <div className="flex flex-col min-h-screen">
            <div className="mt-20 flex-grow flex justify-center items-start mx-mBody">
                <div className="flex flex-col w-full h-full mx-mBody">
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

                        {/* Checkout - Resumen de Orden */}
                        <div className="bg-colorSecondary p-5 h-fit border-colorPrimary text-colorPrimary rounded-brAll border-customBW overflow-hidden">

                            <OrderSummaryDetails setShowAddressForm={setShowAddressForm} />

                            {showAddressForm && <AddressForm countries={countries} />} {/* Renderizado condicional */}

                        </div>
                    </div>
                </div>
            </div>
            <Footer /> {/* Componente del pie de página */}
        </div>
    );
}
