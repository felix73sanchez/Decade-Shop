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

        <div className="flex justify-center items-center mx-mBody mt-20">

            <div className="flex flex-col w-full mx-mBody">

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
    );
}