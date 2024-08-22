export const revalidate = 0;

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductImage, Title } from "@/components";
import Link from "next/link";
import { currencyFormat } from "@/utils";
import React from 'react';

interface Props {
    searchParams: {
        page?: string;
        take?: string;
    };
}

export default async function OrdersPage({ searchParams }: Props) {
    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const { products, totalPages } = await getPaginatedProductsWithImages({ page });

    return (
        <>
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow mt-20 m-mBody">
                <div className="bg-colorSecondary border-colorPrimary text-colorPrimary rounded-brAll shadow-custom-2 border-customBW overflow-hidden ">
                    <div className="m-5">
                        <div className="grid grid-cols-5">
                            <Title title="Mantenimiento de productos" className="col-span-4"/>

                            <div className="flex justify-end mb-5">
                                <Link href="/admin/product/new" className="col-span-1 btn-primary rounded-brAll hover:bg-colorHover text-center text-fs1rem font-fw7">
                                    Crear producto
                                </Link>
                            </div>
                        </div>
                        <div className="border-y-customBW border-colorPrimary mb-16 hover:border-y-0">
                            <div className="grid grid-cols-12 text-fs1rem text-colorPrimary">
                                <div className="col-span-1 px-2 py-4 font-fw7 ">Imagen</div>
                                <div className="col-span-3 px-2 py-4 font-fw7 ">Título</div>
                                <div className="col-span-2 px-2 py-4 font-fw7">Precio</div>
                                <div className="col-span-2 px-2 py-4 font-fw7">Género</div>
                                <div className="col-span-2 px-2 py-4 font-fw7">Inventario</div>
                                <div className="col-span-2 px-2 py-4 font-fw7">Tallas</div>
                            </div>
                                {products.map((product) => (
                                    <React.Fragment key={product.id}>
                                        <div className="grid grid-cols-12 gap-4 bg-colorSecondary border-y-customBW hover:bg-colorHover hover:border-colorPrimary hover:rounded-brAll hover:border-customBW transition duration-300 ease-in-out uppercase font-fw5 text-fs1rem">
                                            
                                            <div className="col-span-1 flex">
                                                <Link href={`/product/${product.slug}`}>
                                                    <ProductImage
                                                        src={product.ProductImage[0]?.url}
                                                        alt={product.title}
                                                        width={50}
                                                        height={50}
                                                        className="w-20 h-20 object-cover rounded-brAll border-customBW"
                                                    />
                                                </Link>
                                            </div>
                                            <div className="col-span-3 flex items-center">
                                                <Link href={`/admin/product/${product.slug}`} className="hover:underline">
                                                    {product.title}
                                                </Link>
                                            </div>
                                            <div className="col-span-2 flex items-center">
                                                {currencyFormat(product.price)}
                                            </div>
                                            <div className="col-span-2 flex items-center">
                                                {product.gender}
                                            </div>
                                            <div className="col-span-2 flex items-center">
                                                {product.inStock}
                                            </div>
                                            <div className="col-span-2 flex items-center">
                                                {product.sizes.join(", ")}
                                            </div>
                                        </div>    
                                    </React.Fragment>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        <Pagination totalPages={totalPages} />
        </div>
        </>
    );
}
