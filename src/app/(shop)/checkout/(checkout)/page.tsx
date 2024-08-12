import { Title } from "@/components";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { PlaceOrder } from "./ui/PlaceOrder";
import { Footer } from "@/components";

export default function CheckoutPage() {
    return (
        <div className="flex flex-col min-h-screen ">
            <div className="mt-20 flex-grow flex justify-center items-start mx-mBody">
                <div className="flex flex-col w-full h-full m-mBody ">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-gap8">
                        {/* Carrito */}
                        <div className="flex flex-col px-5">
                            {/* Items del carrito */}
                            <Title className="font-fw7 text-fs1rem" title="Verificar Orden" />
                            <div className="text-xl  mb-5 pl-3">
                                <span className="">Ajustar elementos</span>
                                <Link href="/cart" className=" ml-3 underline">
                                    Editar carrito
                                </Link>
                            </div>
                            <div className="pl-3">
                                <ProductsInCart />
                            </div>
                        </div>

                        {/* Checkout - Resumen de Orden */}
                        <PlaceOrder />
                    </div>
                </div>
            </div>
            <Footer /> {/* Componente del pie de página */}
        </div>
    );
}
