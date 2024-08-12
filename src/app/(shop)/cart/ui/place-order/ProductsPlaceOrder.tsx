'use client';


import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import Image from "next/image";
import { Title } from "@/components";
import { useEffect, useState } from "react";
import Link from "next/link";


export const ProductsPlaceOrder = () => {

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
        <div className="">
            {
                productsIncCart.map(product => (
                    <div key={`${product.slug}-${product.size}`} className="flex my-5 pl-5 uppercase">
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
                            <span className="font-fw7 text-fs1.2rem">
                                {product.size} - {product.title} ({product.quantity})
                            </span>
                            <p className=" font-fw7"> {currencyFormat(product.price * product.quantity)} </p>


                        </div>

                    </div>
                ))
            }

        </div>
        </>
    )
}
