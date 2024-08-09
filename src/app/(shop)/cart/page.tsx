// src/app/(shop)/cart/page.tsx
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { Footer } from "@/components";
import dynamic from 'next/dynamic';
import { getCountries, getUserAddress } from "@/actions";
import { auth } from '@/auth.config';
import { redirect } from 'next/navigation'; // Importa redirect

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
        <div className="flex flex-col min-h-screen">
            <div className="mt-20 flex-grow flex justify-center items-start mx-mBody">
                <div className="flex flex-col w-full h-full mx-mBody">
                    <div className="ml-3 grid grid-cols-2 gap-g8 w-full h-full">
                        <span className="text-fs1.2rem font-fw7 uppercase">Agregar más items</span>
                        <Link href="/" className="underline mb-5 mysm:pl-5 hover:text-colorHover text-fs1rem font-fw5">
                            ¡Continúa comprando!
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-g8 w-full h-full">
                        {/* Carrito */}
                        <div className="flex flex-col w-full h-fit gap-g8">
                            {/* Items del carrito */}
                            <ProductsInCart />
                        </div>

                        {/* Checkout - Resumen de Orden */}
                        <CartClientPage countries={countries} userAddress={userAddress} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
