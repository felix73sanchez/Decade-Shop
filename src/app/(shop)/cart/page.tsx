import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";



const productInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
];

export default function () {

    //redirect('/empty');



    return (

        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

            <div className="flex flex-col w-[1000px]">

                <Title title="Carrito" />

                <div className=" grid grid-cols-1 sm:grid-cols-2 gap-10">

                    {/* Carrito */}
                    <div className="flex flex-col mt-5">
                        <span className="text-xl">Agregar mas items</span>
                        <Link href="/" className="underline mb-5">
                            Continua comprando!
                        </Link>


                        {/* Items del carrito */}

                        {
                            productInCart.map(product => (
                                <div key={product.slug} className="flex mb-5">
                                    <Image

                                        src={`/products/${product.images[0]}`}
                                        width={100}
                                        height={100}
                                        style={{ objectFit: "cover" }}
                                        priority
                                        alt={product.title}
                                        className="mr-5 rounded"
                                    />
                                    <div>
                                        <p> {product.title} </p>
                                        <p> ${product.price} </p>
                                        <QuantitySelector quantity={3} />
                                        <button className="underline mt-3">
                                            Eliminar
                                        </button>
                                    </div>

                                </div>
                            ))
                        }
                    </div>

                    {/* Checkout - Resumen de Orden */}
                    <div className=" bg-white rounded-xl shadow-xl p-7 h-fit">
                        <h2 className="text-2xl mb-2"> Resumen de Orden </h2>
                        <div className="grid grid-cols-2 justify-between">

                            <span> No. Productos:</span>
                            <span className=" text-right"> 3 articulos</span>

                            <span> Subtotal: </span>
                            <span className=" text-right"> $100 </span>

                            <span> Impuestos(15%):   </span>
                            <span className=" text-right"> $100 </span>

                            <span className=" mt-5 text-2xl"> Total: </span>
                            <span className=" mt-5 text-2xl text-right"> $100 </span>

                        </div>

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