'use client';
import { useState, useEffect } from 'react';
import { allFont } from "@/config/fonts";

interface Props {
    className?: string;
}

const images = [
    { src: '/gridimg/1.jpg', alt: 'Descripción de la imagen izquierda' },
    { src: '/gridimg/2.jpg', alt: 'Descripción de la imagen derecha superior' },
    { src: '/gridimg/3.jpg', alt: 'Descripción de la imagen derecha inferior' }
];

export const Gridimg: React.FC<Props> = ({ className }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Cambiar imagen cada 3 segundos
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`relative w-full h-[36rem] px-p8 overflow-hidden fade-in mt-[4.6rem] grid grid-cols-1 sm:grid-cols-3 gap-p8 sm:gap-g8 ${allFont.className} ${className}`}>
            {/* Imagen visible en pantallas móviles */}
            <div className="relative w-full h-[36rem] sm:hidden rounded-brAll shadow-customBS border-customBC border-customBW">
                <img src={images[currentImageIndex].src} alt={images[currentImageIndex].alt} className="w-full h-full object-cover rounded-brAll" />
                <div className="absolute inset-x-0 bottom-4 flex justify-center">
                    {images.map((image, index) => (
                        <div key={index} className={`w-2 h-2 rounded-full mx-1 ${index === currentImageIndex ? 'bg-color3' : 'bg-color4'}`} />
                    ))}
                </div>
                <div className="absolute top-4 left-4 sm:top-8 sm:left-10">
                    <p className="text-colorPrimary text-xl sm:text-5xl font-fw9">NEW ARRIVALS</p>
                </div>
            </div>

            {/* Div a la izquierda, visible en pantallas medianas y grandes */}
            <div className="relative hidden sm:block w-full h-[36rem] sm:col-span-2 rounded-brAll shadow-customBS border-customBC border-customBW">
                <div className="w-full h-full overflow-hidden rounded-brAll">
                    <img src="/gridimg/1.jpg" alt="Descripción de la imagen izquierda" className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-4 left-4 sm:top-8 sm:left-10">
                    <p className="text-colorPrimary text-xl sm:text-5xl font-fw9">NEW ARRIVALS</p>
                </div>
            </div>

            {/* Contenedor de los dos divs a la derecha, visible en pantallas medianas y grandes */}
            <div className="relative hidden sm:grid grid-rows-1 gap-g8 sm:gap-g8 w-full h-full">
                <div className="relative w-full h-[17.75rem] rounded-brAll shadow-customBS border-customBC border-customBW">
                    <img src="/gridimg/2.jpg" alt="Descripción de la imagen derecha superior" className="w-full h-full object-cover rounded-brAll" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-p8">
                        {/* <p className="text-colorSecondary text-xl sm:text-3xl font-fw9 whitespace-nowrap">YOUR STORY</p> */}
                    </div>
                </div>
                <div className="relative w-full h-[17.75rem] bg-colorSecondary rounded-brAll shadow-customBS border-customBC border-customBW">
                    <img src="/gridimg/3.jpg" alt="Descripción de la imagen derecha inferior" className="w-full h-full object-cover rounded-brAll" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                       {/* <p className="text-colorSecondary text-xl sm:text-3xl font-fw9 whitespace-nowrap">ANYTIME</p> */}
                    </div>
                </div>
            </div>
        </div>
    );
};
