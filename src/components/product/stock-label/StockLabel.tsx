'use client';

import { getStockBySlug } from "@/actions";
import { allFont } from "@/config/fonts"
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
                    <h1 className={`${allFont.className} antialiased font-bold text-lg bg- rounded-lg animate-pulse`}>
                        &nbsp;
                    </h1>

                ) : (
                    <h1 className={`${allFont.className} antialiased font-bold text-sm`}>
                        Stock: {stock}
                    </h1>

                )}
        </>
    )
}
