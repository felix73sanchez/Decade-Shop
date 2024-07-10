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
        <div className="p-5 overflow-hidden fade-in border border-colorGreen  bg-colorblanco ">

            <Link href={`/product/${product.slug}`}>
                <Image
                    src={`/products/${displayImage}`}
                    alt={product.title}
                    className="w-full object-cover "
                    priority
                    width={852}
                    height={852}
                    onMouseEnter={() => setDisplayImage(product.images[1])}
                    onMouseLeave={() => setDisplayImage(product.images[0])}
                />
            </Link>

            <div className="p-2 py-0 m-0 flex flex-col text-colorGreen">
                <Link
                    className="hover:text-gray-400 text-xs pt-5"
                    href={`/producs/${product.slug}`}
                >{product.title}</Link>
                <span className="font-semibold">${product.price}</span>
            </div>

        </div>
    )
}
