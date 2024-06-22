'use client';

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts"
import { useEffect, useState } from "react";


interface Props {
    slug: string;
}


export const StockLabel = ({ slug }: Props) => {

    const [stock, setStock] = useState(0);
    const [isloading, setIsLoading] = useState(true);


    useEffect(() => {
        const getStock = async () => {
            const instock = await getStockBySlug(slug);
            setStock(instock);
            setIsLoading(false);
        }
        getStock();
    }, [slug])


    return (
        <>
            {
                isloading ? (
                    <h1 className={`${titleFont.className} antialiased font-bold text-lg bg-gray-200 rounded-lg animate-pulse`}>
                        &nbsp;
                    </h1>

                ) : (
                    <h1 className={`${titleFont.className} antialiased font-bold text-lg`}>
                        Stock: {stock}
                    </h1>

                )}
        </>
    )
}
