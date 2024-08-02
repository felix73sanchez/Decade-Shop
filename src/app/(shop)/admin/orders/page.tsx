export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table
import { getPaginatedOrders } from "@/actions";
import { Pagination, Title } from "@/components";

import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";
import clsx from 'clsx';

export default async function OrdersPage() {
    const { ok, orders = [] } = await getPaginatedOrders();

    if (!ok) {
        redirect("/auth/login");
    }

    return (
        <>  <div className="mt-20 m-mBody border-colorPrimary text-colorPrimary rounded-brAll shadow-custom-2 border-customBW overflow-hidden">
                <Title title="Todas las ordenes" className="pl-4 font-fw5 text-fs1" />

                <div className="">
                    <table className="min-w-full bg-gray-200 font-fw9 text-fs1rem  mysm:text-[0.6rem]">
                        <thead className="bg-gray-200 border-b">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-4 mysm:py-2 mysm:px-2 whitespace-nowrap mysm:whitespace-normal text-left"
                                >
                                    #ID
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-4 mysm:py-2 mysm:px-2 whitespace-nowrap mysm:whitespace-normal text-left"
                                >
                                    Nombre completo
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-4 mysm:py-2 mysm:px-2 whitespace-nowrap mysm:whitespace-normal text-left"
                                >
                                    Estado
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-4 mysm:py-2 mysm:px-2 whitespace-nowrap mysm:whitespace-normal text-left"
                                >
                                    Opciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="bg-colorSecondary border-b transition duration-300 ease-in-out hover:bg-colorHover font-fw5 text-fs2 mysm:text-[0.6rem] w-full"
                                >
                                    <td className="px-6 py-4 mysm:py-2 mysm:px-2 whitespace-nowrap mysm:whitespace-normal">
                                        #deca|{order.id.split("-").at(-1)}
                                    </td>
                                    <td className="px-6 py-4 mysm:py-2 mysm:px-2 whitespace-nowrap mysm:whitespace-normal">
                                        {order.OrderAddress?.firstName} {order.OrderAddress?.lastName}
                                    </td>
                                    <td className="flex items-center px-6 py-4 mysm:py-2 mysm:px-2 whitespace-nowrap mysm:whitespace-normal">
                                        {order.isPaid ? (
                                            <>
                                                <IoCardOutline className="text-green-800 mysm:hidden" />
                                                <span className="mx-2 mysm:mx-0 text-green-800">Pagada</span>
                                            </>
                                        ) : (
                                            <>
                                                <IoCardOutline className="text-red-800 mysm:hidden" />
                                                <span className="mx-2 mysm:mx-0 text-red-800">No Pagada</span>
                                            </>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 mysm:py-2 mysm:px-3 mysm:whitespace-normal">
                                        <Link href={`/orders/${order.id}`} className="hover:underline">
                                            Ver orden
                                        </Link>
                                    </td>
                                </tr>
                            ))}


                        </tbody>
                    </table>

                    
                </div>
            </div>
            <div className="flex flex-col min-h-screen justify-end">
                <div className="mb-4">
                    <Pagination totalPages={1} />
                </div>
            </div>

            
        </>
    );
}