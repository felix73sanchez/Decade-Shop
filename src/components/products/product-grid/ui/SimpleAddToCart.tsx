'use client';

import { SizeSelector } from "./SimpleSizeSelector";
import type { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";
import { getStockBySlug } from "@/actions";
import { useState, useEffect, useCallback } from "react";

interface Props {
    product: Product;
}

export const AddToCart = ({ product }: Props) => {
    const addProductToCart = useCartStore(state => state.addProductToCart);
    const [posted, setPosted] = useState(false);
    const [isOutOfStock, setIsOutOfStock] = useState(false);
    const [currentStock, setCurrentStock] = useState<number | null>(null);

    // Guardar en caché para evitar llamadas repetidas
    const stockCache: Record<string, number | null> = {};

    useEffect(() => {
        const checkStock = async () => {
            if (stockCache[product.slug] !== undefined) {
                setCurrentStock(stockCache[product.slug]);
                setIsOutOfStock(stockCache[product.slug] === 0);
            } else {
                const stock = await getStockBySlug(product.slug);
                stockCache[product.slug] = stock;
                setCurrentStock(stock);
                setIsOutOfStock(stock === 0);
            }
        };

        checkStock();
    }, [product.slug]);

    const addToCart = useCallback(async (size: Size) => {
        // Verificar si el stock está en caché antes de hacer la llamada
        let updatedStock = stockCache[product.slug];
    
        if (updatedStock === undefined) {
            updatedStock = await getStockBySlug(product.slug);
            stockCache[product.slug] = updatedStock;
        }
    
        // Asegúrate de que updatedStock no es null antes de hacer la comparación
        if (updatedStock !== null && updatedStock > 0) {
            const cartProduct: CartProduct = {
                id: product.id,
                quantity: 1, 
                size: size,
                title: product.title,
                price: product.price,
                image: product.images[0],
                slug: product.slug
            };
    
            addProductToCart(cartProduct);
            setPosted(true);
        } else {
            setIsOutOfStock(true);
        }
    
        setCurrentStock(updatedStock);
    }, [addProductToCart, product]);    

    return (
        <>
            {posted && !isOutOfStock && (
                <span className="mt-0 text-colorPrimary fade-in border-y-customBW border-colorPrimary text-fs1 font-fw5 py-1.5 m-0 topmenu:text-xs">
                    Producto añadido al carrito*
                </span>
            )}

            {isOutOfStock && (
                <span className="text-red-500 w-full p-1 m-0 bg-colorSecondary border-colorPrimary border-y-customBW text-fs1 topmenu:text-xs font-fw5 ">
                    Producto sin stock
                </span>
            )}

            {!posted && !isOutOfStock && currentStock !== null && currentStock > 0 && (
                <SizeSelector
                    selectedSize={undefined}
                    availableSizes={product.sizes}
                    onSizeChanged={addToCart} 
                />
            )}
        </>
    )
}
