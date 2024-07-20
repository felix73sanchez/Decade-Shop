'use client';

import { Product } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Props {
    product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [displayImage, setDisplayImage] = useState<string>('');

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
        <div className="p-0 overflow-hidden fade-in bg-colorSecondary rounded-brAll shadow-customBS border-customBC border-customBW">
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

            <div className="p-2 m-0 flex flex-col text-colorPrimary">
                <Link
                    className="hover:text-color text-fs1 font-fw7"
                    href={`/product/${product.slug}`}
                >
                    {product.title}
                </Link>
                <span className="font-fw4 text-fs1">${product.price}</span>
            </div>
        </div>
    );
};
