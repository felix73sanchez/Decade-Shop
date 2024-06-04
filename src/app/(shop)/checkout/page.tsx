import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";



const productInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
];

export default function () {
    return (

        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

            <div className="flex flex-col w-[1000px]">

                <Title title="Verificar Orden" />

                <div className=" grid grid-cols-1 sm:grid-cols-2 gap-10">

                    {/* Carrito */}
                    <div className="flex flex-col mt-5">
                        <span className="text-xl">Ajustar elementos</span>
                        <Link href="/cart" className="underline mb-5">
                            Editar carrito
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
                                        alt={product.title}
                                        className="mr-5 rounded"
                                    />
                                    <div>
                                        <p> {product.title} </p>
                                        <p> ${product.price} x 3 </p>
                                        <p className="font-bold"> Subtotal: ${product.price * 3}</p>
                                    </div>

                                </div>
                            ))
                        }
                    </div>

                    {/* Checkout - Resumen de Orden */}
                    <div className=" bg-white rounded-xl shadow-xl p-7">

                        <h2 className=" text-2xl mb-2">Direccion de entrega</h2> {/*//TODO Adecuar esto con la realidad de la Orden y la Tienda.*/}
                        <div className="mb-10 ">
                            <p className="text-xl"> Nombre: Felix Sanchez </p>
                            <p> Direccion: Calle la paz </p>
                            <p> Ciudad: SD </p>
                            <p> Pais: RD</p>
                            <p> Codigo Postal: 23156 </p>
                            <p> Telefono: 809-123-4567 </p>

                        </div>

                        {/*LINEA DIVISAORA */}
                        <div
                            className="w-full h-0.5 bg-gray-200 mb-10"
                        />

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


                        <div className=" mt-5 mb-2 w-full">

                            <p className="mb-5">
                                {/*DISCLAIMER*/}
                                Al hacer clic en "Hacer la orden", aceptas nuestros <a href="#" className="underline"> términos y condiciones de la tienda</a> y <a href="#" className="underline">nuestra política de privacidad.</a>
                            </p>


                            <Link
                                className="flex btn-primary justify-center mt-5"
                                href="/orders/123">
                                Hacer la orden
                            </Link>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}