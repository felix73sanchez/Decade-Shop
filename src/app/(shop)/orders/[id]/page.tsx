import { Title } from "@/components";
import { inter } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { IoCard, IoCardOutline } from "react-icons/io5";



const productInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
];


interface Props {
    params: {
        id: string;
    }
}


export default function ({ params }: Props) {

    const { id } = params;

    //TODO: Implementar la logica para obtener la orden con el id proporcionado.
    //redirect a (/).

    return (

        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

            <div className="flex flex-col w-[1000px]">

                <Title title={`Orden #${id}`} />

                <div className=" grid grid-cols-1 sm:grid-cols-2 gap-10">

                    {/* Carrito */}
                    <div className="flex flex-col mt-5">
                        <div className={
                            clsx(
                                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                                {
                                    'bg-red-500': false,
                                    'bg-green-600': true,
                                }
                            )
                        }>
                            <IoCardOutline size={30} className="mr-2" />
                            {/* <span className="mx-2 "> Pendiente de pago </span> */}
                            <span className="mx-2 "> Orden pagada </span>
                        </div>


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

                            <div className={
                                clsx(
                                    "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                                    {
                                        'bg-red-500': false,
                                        'bg-green-600': true,
                                    }
                                )
                            }>
                                <IoCardOutline size={30} className="mr-2" />
                                {/* <span className="mx-2 "> Pendiente de pago </span> */}
                                <span className="mx-2 "> Orden pagada </span>
                            </div>


                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}