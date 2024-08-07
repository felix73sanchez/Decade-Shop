"use client";

import { Footer } from "@/components";
import { IoCartOutline } from "react-icons/io5";
import { useState } from "react";

export default function EmptyPage() {
    const [shouldAnimate, setShouldAnimate] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault(); // Previene el comportamiento por defecto del enlace
        setShouldAnimate(true);

        // Redirige después de que la animación se haya completado
        setTimeout(() => {
            window.location.href = '/'; // Redirige a la página principal
        }, 1000); // La duración de la animación (1.2 segundos)
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow flex justify-center items-center w-full">
                <div className="grid grid-cols-1 items-center">
                    <div className={`flex flex-col-2 items-center ${shouldAnimate ? 'move-left' : ''}`}>
                        <IoCartOutline
                            size={128}
                            className={`mx-5 text-colorPrimary scale-x-[-1] mysm:w-[5rem] mysm:mx-m8`}
                        />
                        <div className="grid grid-cols-1 gap-0 items-center uppercase">
                            <h1 className="m-0 p-0 text-fsLogo mysm:text-[1rem] font-fw9 text-colorPrimary leading-none">
                                Tu carrito está vacío.
                            </h1>
                            <a
                                href="/" // Utiliza un elemento <a> para manejar el clic
                                onClick={handleClick}
                                className="m-0 p-0 text-color3 text-[4.2rem] mysm:text-[2.4rem] font-fw7 hover:underline cursor-pointer leading-none"
                            >
                                Regresar
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer /> {/* Componente del pie de página */}
        </div>
    );
}
