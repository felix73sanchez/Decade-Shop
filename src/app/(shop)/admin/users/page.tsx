export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table
import { getPaginatedUsers } from "@/actions";
import { Pagination, Title } from "@/components";

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
        <>  <div className="mt-20 m-mBody border-colorPrimary text-colorPrimary rounded-brAll shadow-custom-2 border-customBW overflow-hidden">
                <Title title="Mantenimiento de usuarios"  className="pl-4 font-fw5 text-fs1"/>

                <div className="">
                    <UsersTable users={users} />

                   
                </div> 
                
            </div>
            <Pagination totalPages={3}/>
        </>
    );
}