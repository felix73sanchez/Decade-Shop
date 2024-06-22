import { getOrderById } from "@/actions";
import { OrderStatus, PaypalButton, Title } from "@/components";
import { initialData } from "@/seed/seed";
import { currencyFormat } from "@/utils";
import Image from "next/image";
import { redirect } from "next/navigation";





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


export default async function OrderPageById({ params }: Props) {

    const { id } = params;

    //Todo: Llamar al server Action.

    const { ok, order } = await getOrderById(id);

    if (!ok) {
        redirect('/');
    }

    const address = order!.OrderAddress;

    return (

        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

            <div className="flex flex-col w-[1000px]">

                <Title title={`Orden #deca|${id.split('-').at(-1)}`} />

                <div className=" grid grid-cols-1 sm:grid-cols-2 gap-10">

                    {/* Carrito */}
                    <div className="flex flex-col mt-5">
                        <OrderStatus isPaid={order?.isPaid ?? false} />

                        {/* Items del carrito */}

                        {
                            order!.OrderItem.map(item => (
                                <div key={item.product.slug + '-' + item.size} className="flex mb-5">
                                    <Image

                                        src={`/products/${item.product.ProductImage[0].url}`}
                                        width={100}
                                        height={100}
                                        style={{ objectFit: "cover" }}
                                        alt={item.product.title}
                                        className="mr-5 rounded"
                                    />
                                    <div>
                                        <p> {item.product.title} </p>
                                        <p> ${item.price} x {item.quantity} </p>
                                        <p className="font-bold"> Subtotal: {currencyFormat(item.price * item.quantity)}</p>
                                    </div>

                                </div>
                            ))
                        }
                    </div>

                    {/* Checkout - Resumen de Orden */}
                    <div className=" bg-white rounded-xl shadow-xl p-7">

                        <h2 className=" text-2xl mb-2">Direccion de entrega</h2> {/*//TODO Adecuar esto con la realidad de la Orden y la Tienda.*/}
                        <div className="mb-10 ">
                            <p className="text-xl"> {address!.firstName} {address!.lastName} </p>
                            <p> {address!.address} </p>
                            <p> {address!.city} </p>
                            <p> {address!.countryId}</p>
                            <p> {address!.postalCode} </p>
                            <p> {address!.phone} </p>

                        </div>

                        {/*LINEA DIVISAORA */}
                        <div
                            className="w-full h-0.5 bg-gray-200 mb-10"
                        />

                        <h2 className="text-2xl mb-2"> Resumen de Orden </h2>
                        <div className="grid grid-cols-2 justify-between">

                            <span>No. Productos</span>
                            <span className="text-right">
                                {order?.itemsInOrder === 1 ? "1 artículo" : `${order?.itemsInOrder} artículos`}
                            </span>

                            <span>Subtotal</span>
                            <span className="text-right">{currencyFormat(order!.subTotal)}</span>

                            <span>Impuestos (15%)</span>
                            <span className="text-right">{currencyFormat(order!.tax)}</span>

                            <span className="mt-5 text-2xl">Total:</span>
                            <span className="mt-5 text-2xl text-right">{currencyFormat(order!.total)}</span>

                        </div>


                        <div className=" mt-5 mb-2 w-full">
                            {
                                order?.isPaid ? (
                                    <OrderStatus isPaid={order?.isPaid ?? false} />
                                ) : (
                                    <PaypalButton amount={order!.total} orderId={order!.id} />
                                )}


                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}