// src/app/(shop)/cart/CartClientPage.tsx
'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { AddressForm } from "./address/AddressForm";

// Cargar OrderSummaryDetails dinámicamente
const OrderSummaryDetails = dynamic(() => import('./resumen/OrderSummaryDetails'), { ssr: false });

interface CartClientPageProps {
    countries: any[]; // Reemplaza `any` con el tipo adecuado si es posible
    userAddress: any; // Reemplaza `any` con el tipo adecuado si es posible
}

const CartClientPage: React.FC<CartClientPageProps> = ({countries, userAddress}) => {
    
    const [showAddressForm, setShowAddressForm] = useState(false);

    return (
        <div className="bg-colorSecondary p-5 h-fit border-colorPrimary text-colorPrimary rounded-brAll border-customBW overflow-hidden">
            <OrderSummaryDetails setShowAddressForm={setShowAddressForm} />
            {showAddressForm && <AddressForm countries={countries} userStoredAddress={userAddress} />}
        </div>
    );
};

export default CartClientPage;
