import { Title } from "@/components";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";






export default function CartPage() {

    //redirect('/empty');



    return (

        <div className="mt-20 mb-20 flex justify-center items-center m-mBody border-colorPrimary text-colorPrimary rounded-brAll shadow-custom-2 border-customBW overflow-hidden">

            <div className="flex flex-col w-full h-full" >

                <Title title="Carrito" className="border-b-customBW border-colorPrimary bg-color3"/>

                <div className=" grid grid-cols-1 sm:grid-cols-2 gap-g8 p-5 w-full h-full bg-colorGray">

                    {/* Carrito */}
                    <div className="flex flex-col p-5 w-full h-full bg-colorSecondary border-colorPrimary text-colorPrimary rounded-brAll shadow-custom-2 border-customBW overflow-hidden">
                        <span className="text-fs1.2rem font-fw7">Agregar mas items</span>
                        <Link href="/" className="underline mb-5 hover:text-colorHover">
                            Continua comprando!
                        </Link>


                        {/* Items del carrito */}
                        <ProductsInCart />

                    </div>

                    {/* Checkout - Resumen de Orden */}
                    <div className=" bg-colorSecondary p-5 h-fit border-colorPrimary text-colorPrimary rounded-brAll shadow-custom-2 border-customBW overflow-hidden">
                        <h2 className="text-fs1.2rem font-fw7 mb-2"> Resumen de Orden </h2>

                        <OrderSummary />

                        <div className=" mt-5 mb-2">
                            <Link
                                className="flex btn-primary justify-center mt-5"
                                href="/checkout/address">
                                Checkout
                            </Link>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}