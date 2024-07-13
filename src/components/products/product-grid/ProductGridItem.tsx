'use client';

import { PiHeartBold } from "react-icons/pi";
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
        <div className="p-pImgGrid overflow-hidden fade-in bg-colorSecondary rounded-brAll shadow-custom-1 border-customBC border-customBW ">
            <Link href={`/product/${product.slug}`} >
                <Image
                    src={`/products/${displayImage}`}
                    alt={product.title}
                    className="w-full object-cover border-colorPrimary border-b-customBW rounded-brImg shadow-customBS "
                    priority
                    width={852}
                    height={852}
                    onMouseEnter={() => setDisplayImage(product.images[1])}
                    onMouseLeave={() => setDisplayImage(product.images[0])}
                 />
            </Link>
            
            <div className="flex justify-between items-start w-full h-fit py-2 px-4  text-colorPrimary gap-g8">
                <div className="flex-1 flex flex-col  ">
                    <Link
                        className=" hover:text-colorHover text-fs1 font-fw7"
                        href={`/producs/${product.slug}`}
                        >{product.title}</Link>
                    <span className="font-fw4 text-fs1 break-words">${product.price}</span>
                </div>
                <div className=" flex-shrink-0 mt-auto pt-6  ">
                    <button className="bottom-0" >
                    <PiHeartBold className="text-3xl w-8 h-8 p-1 rounded-lg bg-color4 text-colorSecondary  "/>
                    </button>
                </div>                
            </div>

        </div>
    )
}
