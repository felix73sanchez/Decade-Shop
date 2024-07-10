'use client';


import { Product } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


interface Props {
    product: Product;
}

export const ProductGridItem = ({ product }: Props) => {

    const [displayImage, setDisplayImage] = useState(product.images[0]);


    return (
        <div className="p-0 overflow-hidden fade-in bg-colorSecondary rounded-brAll shadow-customBS border-customBC border-customBW">

            <Link href={`/product/${product.slug}`}>
                <Image
                    src={`/products/${displayImage}`}
                    alt={product.title}
                    className="w-full object-cover border-customBC border-b-customBW"
                    priority
                    width={852}
                    height={852}
                    onMouseEnter={() => setDisplayImage(product.images[1])}
                    onMouseLeave={() => setDisplayImage(product.images[0])}
                />
            </Link>

            <div className="p-2 m-0 flex flex-col text-colorPrimary">
                <Link
                    className="hover:text-color text-fs1 font-fw7"
                    href={`/producs/${product.slug}`}
                >{product.title}</Link>
                <span className="font-fw4 text-fs1 ">${product.price}</span>
            </div>

        </div>
    )
}
