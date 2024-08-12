import Link from "next/link";
import { Footer } from "@/components";
import dynamic from 'next/dynamic';
import { getCountries, getUserAddress } from "@/actions";
import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';

// Cargar CartClientPage dinámicamente
const CartClientPage = dynamic(() => import('./ui/CartClientPage'), { ssr: false });

export default async function CartPage() {
    const countries = await getCountries();
    const session = await auth();

    if (!session?.user) {
        redirect('/auth/login'); // Redirige al login
        return null; // No renderizar nada después de redirigir
    }

    const userAddress = await getUserAddress(session.user.id) ?? undefined;

    return (
        <div className="flex flex-col min-h-screen ">
            <div className="mt-16 flex-grow flex justify-center items-start mx-mBody">
                <div className="flex flex-col w-full h-full mx-mBody mysm:mx-0">
                    <div className="pb-5">
                        {/* Checkout - Resumen de Orden */}
                        <CartClientPage countries={countries} userAddress={userAddress} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
