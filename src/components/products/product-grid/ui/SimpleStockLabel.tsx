'use client';

import { getStockBySlug } from "@/actions";
import { useEffect, useState } from "react";

interface Props {
    slug: string;
    onStockChange: (stock: number) => void;
}

export const StockLabel = ({ slug, onStockChange }: Props) => {
    useEffect(() => {
        const getStock = async () => {
            const instock = await getStockBySlug(slug);
            onStockChange(instock);
        };
        getStock();
    }, [slug, onStockChange]);

    return null; // No renderiza nada
};
