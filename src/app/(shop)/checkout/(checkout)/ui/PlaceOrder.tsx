'use client';

import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export const PlaceOrder = () => {

    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isPlacingOrder, setisPlacingOrder] = useState(false);

    const address = useAddressStore(state => state.address);
    const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
        state.getSummaryInformation()
    );
    const cart = useCartStore(state => state.cart);
    const clearCart = useCartStore(state => state.clearCart);

    useEffect(() => {
        setLoaded(true);
    }, []);

    const PlaceOrder = async () => {
        setisPlacingOrder(true);

        const productsToOrder = cart.map(product => ({
            productId: product.id,
            quantity: product.quantity,
            size: product.size,
        }));

        console.log({ address, productsToOrder });


        //! Server Actions 
        const resp = await placeOrder(productsToOrder, address);

        if (!resp.ok) {
            setisPlacingOrder(false);
            setErrorMessage(resp.message);
            return;
        }

        //* Todo salio bien!
        clearCart();
        router.replace('/orders/' + resp.order?.id);


    }


    if (!loaded) return (<div> Loading... </div>);


    return (
        <div className=" bg-colorSecondary rounded-brAll shadow-custom-2 border-colorPrimary border-customBW p-7 text-colorPrimary">

            <h2 className=" antialiased text-fsHeader font-fw7 uppercase mb-2">Direccion de entrega</h2> {/*//TODO Adecuar esto con la realidad de la Orden y la Tienda.*/}
            <div className="grid grid-cols-2 justify-between px-2">
                <span>Nombre completo</span>
                <p className="text-right"> {address.firstName} {address.lastName} </p>
                <span>Dirección</span>
                <p className="text-right"> {address.address} </p>
                <span>Ciudad</span>
                <p className="text-right"> {address.city} </p>
                <span>País</span>
                <p className="text-right"> {address.country}</p>
                <span>Código postal</span>
                <p className="text-right"> {address.postalCode} </p>
                <span>Teléfono</span>
                <p className="text-right"> {address.phone} </p>

            </div>

            {/*LINEA DIVISAORA */}
            <div
                className="w-full h-[0.02rem] bg-colorGray my-5"
            />

            <h2 className="antialiased text-fsHeader font-fw7 uppercase mb-2"> Resumen de Orden </h2>
            <div className="grid grid-cols-2 justify-between px-2">

                <span>No. Productos</span>
                <span className="text-right">
                    {itemsInCart === 1 ? "1 artículo" : `${itemsInCart} artículos`}
                </span>

                <span>Subtotal</span>
                <span className="text-right">{currencyFormat(subTotal)}</span>

                <span>Impuestos (15%)</span>
                <span className="text-right">{currencyFormat(tax)}</span>

            </div>
            <div className="grid grid-cols-2 justify-between p">

                <span className="mt-5 antialiased text-fsHeader font-fw7 uppercase">Total:</span>
                <span className="mt-5 antialiased text-fsHeader font-fw7 uppercase text-right">{currencyFormat(total)}</span>

            </div>


            <div className=" mt-5 mb-2 w-full">

                <p className="mb-5">
                    {/*DISCLAIMER*/}
                    Al hacer clic en &quot;Hacer la orden&quot;, aceptas nuestros <a href="#" className="underline"> términos y condiciones de la tienda</a> y <a href="#" className="underline">nuestra política de privacidad.</a>
                </p>

                <p className="text-red-500"> {errorMessage} </p>
                <button
                    //href="/orders/123"
                    onClick={PlaceOrder}
                    className={clsx(
                        {
                            "btn-primary": !isPlacingOrder,
                            "btn-disabled": isPlacingOrder
                        },
                    )}
                >
                    Terminar la orden
                </button>
            </div>

        </div>
    )
}
