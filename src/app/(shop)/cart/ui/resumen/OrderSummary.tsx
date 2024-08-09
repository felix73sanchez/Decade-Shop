"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export const OrderSummary = () => {

    const router = useRouter();

    const [loaded, setLoaded] = useState(false);
    const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
        state.getSummaryInformation()
    );

    useEffect(() => {
        setLoaded(true);
    }, []);


    useEffect(() => {

        if (itemsInCart === 0 && loaded === true) {
            router.replace('/empty')
        }


    }, [itemsInCart, loaded, router])



    if (!loaded) return <p>Loading...</p>;

    return (
        <div className="grid grid-cols-2 w-full ">
            <span>No. Productos</span>
            <span className="text-right">
                {itemsInCart === 1 ? "1 artículo" : `${itemsInCart} artículos`}
            </span>

            <span>Subtotal</span>
            <span className="text-right">{currencyFormat(subTotal)}</span>

            <span>Impuestos (15%)</span>
            <span className="text-right">{currencyFormat(tax)}</span>

            <span className="mt-5 text-fs1.2rem font-fw7">Total:</span>
            <span className="mt-5 text-fs1.2rem font-fw7 text-right">{currencyFormat(total)}</span>
        </div>
    );
};