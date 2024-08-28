'use client';

import { Product } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { PiHeartBold } from "react-icons/pi";
import { AddToCart } from "./ui/SimpleAddToCart";

interface Props {
    product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [displayImage, setDisplayImage] = useState<string>('');
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [notisHovered, setnotIsHovered] = useState<boolean>(false);

    useEffect(() => {
        const checkLocalImages = async () => {
            const localImageUrls = await Promise.all(
                product.images.map(async (image) => {
                    const localUrl = `/products/${image}`;
                    try {
                        const response = await fetch(localUrl, { method: 'HEAD' });
                        if (response.ok) {
                            return localUrl;
                        } else {
                            return image; // URL de Cloudinary
                        }
                    } catch (error) {
                        return image; // URL de Cloudinary
                    }
                })
            );
            setImageUrls(localImageUrls);
            setDisplayImage(localImageUrls[0]); // Establece la imagen inicial
        };

        checkLocalImages();
    }, [product.images]);

    if (imageUrls.length === 0) {
        return null; // Evita renderizar el componente si no se han cargado las URLs
    }

    return (
        <div
            className="relative p-0 overflow-hidden fade-in flex flex-col h-full border-colorPrimary text-colorPrimary rounded-brAll shadow-custom-2 border-customBW uppercase"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={`/product/${product.slug}`}>
                <Image
                    src={displayImage}
                    alt={product.title}
                    className="w-full object-cover border-customBC border-b-customBW"
                    priority
                    width={852}
                    height={852}
                    onMouseEnter={() => setDisplayImage(imageUrls[1])}
                    onMouseLeave={() => setDisplayImage(imageUrls[0])}
                />
            </Link>

            <div className="h-full p-2 flex flex-col justify-between flex-grow bg-colorSecondary">
                <div className="h-12">
                    {/* Botón de Añadir al Carrito */}
                    {isHovered && (
                        <div className="flex items-center justify-center text-center">
                            <div className="w-full py-2.5 rounded-brAll">
                                <AddToCart product={product} />
                            </div>
                        </div>
                    )}
                    {!isHovered && (
                        <div className="w-full px-2 py-0 my-1">
                            <Link
                                className="hover:text-color text-fs2 mysm:text-xs font-fw9 text-colorPrimary hover:text-colorHover "
                                href={`/product/${product.slug}`}
                            >
                                {product.title}
                            </Link>
                        </div>)
                    }
                </div>
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-end flex-grow my-2 mx-1">
                        <span className="w-fit px-3 py-1 font-fw7 text-fs2 border-colorPrimary text-colorPrimary rounded-brAll shadow-custom-2 border-customBW">
                            ${product.price}
                        </span>
                        {/* Icono de Favoritos */}
                        <button className="ml-4">
                            <PiHeartBold className="text-3xl w-fit px-3 py-1 border-colorPrimary text-colorPrimary rounded-brAll shadow-custom-2 border-customBW" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
