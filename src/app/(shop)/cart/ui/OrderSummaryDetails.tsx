// components/OrderSummaryDetails.tsx
"use client";

import { useState } from 'react'; // Importar useState
import { Dispatch, SetStateAction } from 'react'; // Importar tipos de React
import { OrderSummary } from "./OrderSummary";

interface OrderSummaryDetailsProps {
    setShowAddressForm: Dispatch<SetStateAction<boolean>>;
}

const OrderSummaryDetails: React.FC<OrderSummaryDetailsProps> = ({ setShowAddressForm }) => {
    const [isSummaryVisible, setIsSummaryVisible] = useState(true);
    const numProductos = 1;
    const subtotal = 30.00;
    const impuestos = subtotal * 0.15;
    const total = subtotal + impuestos;

    const handleCheckoutClick = () => {
        setShowAddressForm(true);
        setIsSummaryVisible(false);
    };

    if (!isSummaryVisible) {
        return null; // No renderizar nada si el resumen no es visible
    }

    return (
        <div>
            <h2 className="text-fs1.2rem font-fw7 mb-2 uppercase">Resumen de Orden</h2>
            <OrderSummary />
            <div className="mt-5 mb-2">
                <button 
                    className="flex btn-primary justify-center mt-5 w-full"
                    onClick={handleCheckoutClick}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default OrderSummaryDetails;
