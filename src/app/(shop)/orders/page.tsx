export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table
import { getOrdersByUser } from "@/actions";
import { Title, Pagination, Footer  } from "@/components";

import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

export default async function OrdersPage() {
    const { ok, orders = [] } = await getOrdersByUser();

    if (!ok) {
        redirect("/auth/login");
    }

    return (
        <>  
            <div className="flex flex-col min-h-screen">
                <div className="flex-grow mt-20 m-mBody">
                    <div className="bg-colorSecondary border-colorPrimary text-colorPrimary rounded-brAll shadow-custom-2 border-customBW overflow-hidden ">
                        <div className="m-5">
                            <Title title="Orders"  className=""/>
                            <div className=" border-y-customBW border-colorPrimary mb-16">
                                <div className="min-w-full">
                                    <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 bg-colorSecondary px-5 py-3 uppercase font-fw7 text-fs1rem">
                                        <div className="text-left">
                                            #ID
                                        </div>
                                        <div className="text-left">
                                            Nombre
                                        </div>
                                        <div className="text-left">
                                            Estado
                                        </div>
                                        <div className="text-left">
                                            Opciones
                                        </div>
                                    </div>

                                    <div>
                                        {orders.map((order) => (
                                            <div
                                                key={order.id}
                                                className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 bg-colorSecondary  border-y-customBW hover:bg-colorHover hover:border-colorPrimary hover:rounded-brAll hover:border-customBW transition duration-300 ease-in-out px-5 py-3 uppercase font-fw5 text-fs1rem"
                                            >
                                                <div className="">
                                                    #deca|{order.id.split("-").at(-1)}
                                                </div>
                                                <div>
                                                    {order.OrderAddress?.firstName} {order.OrderAddress?.lastName}
                                                </div>
                                                <div className="flex items-center">
                                                    {order.isPaid ? (
                                                        <>
                                                            <IoCardOutline className="text-green-800" />
                                                            <span className="mx-1 text-green-800">Pagada</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <IoCardOutline className="text-red-800" />
                                                            <span className="text-red-800 mx-1">No Pagada</span>
                                                        </>
                                                    )}
                                                </div>
                                                <div>
                                                    <Link href={`/orders/${order.id}`} className="hover:underline">
                                                        Ver orden
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <Pagination totalPages={1} />
                <Footer /> {/* Componente del pie de página */}
            </div>
        </>
    );
}