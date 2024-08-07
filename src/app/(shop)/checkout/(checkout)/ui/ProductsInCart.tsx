'use client';


import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import Image from "next/image";

import { useEffect, useState } from "react";



export const ProductsInCart = () => {

    const [loaded, setloaded] = useState(false);
    const productsIncCart = useCartStore(state => state.cart);


    useEffect(() => {
        setloaded(true);
    }, []);


    if (!loaded) {
        return <p>Cargando... </p>
    }


    return (
        <>
            {
                productsIncCart.map(product => (
                    <div key={`${product.slug}-${product.size}`} className="flex mb-5">
                        <Image

                            src={`/products/${product.image}`}
                            width={100}
                            height={100}
                            style={{
                                width: '100px',
                                height: '100px',
                            }}
                            priority
                            alt={product.title}
                            className="mr-5 rounded-brAll"
                        />
                        <div>
                            <span>
                                {product.size} - {product.title} ({product.quantity})
                            </span>
                            <p className=" font-fw7"> {currencyFormat(product.price * product.quantity)} </p>


                        </div>

                    </div>
                ))
            }


        </>
    )
}
