import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

export default function EmptyPage() {
    return (
        <div className="flex justify-center items-center h-[800px]">

            <IoCartOutline size={100} className="mx-5 text-gray-400" />

            <div className=" flex flex-col items-center">
                <h1 className="text-3xl font-bold">Tu carrito esta vacío.</h1>
                <Link
                    href="/"
                    className="text-blue-500 mt-2 text-4xl"
                >
                    Regresar
                </Link>

            </div>

        </div>
    );
}