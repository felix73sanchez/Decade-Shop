'use client';

import { SizeSelector } from "./SimpleSizeSelector";
import type { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";
import { getStockBySlug } from "@/actions";
import { useState, useEffect } from "react";

interface Props {
    product: Product;
}

export const AddToCart = ({ product }: Props) => {
    const addProductToCart = useCartStore(state => state.addProductToCart);
    const [posted, setPosted] = useState(false);
    const [isOutOfStock, setIsOutOfStock] = useState(false);
    const [currentStock, setCurrentStock] = useState<number | null>(null);

    useEffect(() => {
        const checkStock = async () => {
            const stock = await getStockBySlug(product.slug);
            setCurrentStock(stock);
            setIsOutOfStock(stock === 0);
        };

        checkStock();
    }, [product.slug]);

    const addToCart = async (size: Size) => {
        // Verificar el stock cada vez que se selecciona una talla
        const updatedStock = await getStockBySlug(product.slug);

        if (updatedStock > 0) {
            const cartProduct: CartProduct = {
                id: product.id,
                quantity: 1, // Siempre una unidad
                size: size,
                title: product.title,
                price: product.price,
                image: product.images[0],
                slug: product.slug
            }

            addProductToCart(cartProduct);
            setPosted(true);
        } else {
            setIsOutOfStock(true);
        }

        setCurrentStock(updatedStock);
    }

    return (
        <>
            {posted && !isOutOfStock && (
                <span className="mt-0 text-green-500 fade-in">
                    Producto añadido al carrito*
                </span>
            )}

            {isOutOfStock && (
                <span className="mt-0 text-red-500 fade-in">
                    Producto sin stock
                </span>
            )}

            {/* Selector de Tallas */}
            {!isOutOfStock && currentStock !== null && currentStock > 0 && (
                <SizeSelector
                    selectedSize={undefined}
                    availableSizes={product.sizes}
                    onSizeChanged={addToCart} // Se agrega al carrito al seleccionar una talla
                />
            )}
        </>
    )
}
