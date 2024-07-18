import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function ShopLayout({ children }: {
    children: React.ReactNode;
}) {

    const session = await auth();

    if (session?.user) {
        redirect('/');
    };

    return (

        <main className="w-full h-full">
            <div className="p-0">
                {children}
            </div>

        </main>
    );
}