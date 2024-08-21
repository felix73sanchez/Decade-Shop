export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table
import { getPaginatedUsers } from "@/actions";
import { Pagination, Title, Footer } from "@/components";

import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";
import { UsersTable } from "./ui/UsersTable";

export default async function OrdersPage() {
    const { ok, users = [] } = await getPaginatedUsers();

    if (!ok) {
        redirect("/auth/login");
    }

    return (
        <>  
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow mt-20 m-mBody"> 
                <div className="bg-colorSecondary border-colorPrimary text-colorPrimary rounded-brAll shadow-custom-2 border-customBW overflow-hidden">
                    <div className="m-5">
                        <Title title="Mantenimiento de usuarios"  className=""/>

                        <div className="border-y-customBW border-colorPrimary mb-16 ">
                            <UsersTable users={users} />

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