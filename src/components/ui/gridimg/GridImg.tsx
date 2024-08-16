'use client';
import { useState, useEffect } from 'react';
import { allFont } from "@/config/fonts";
import Image from 'next/image';

interface Props {
    className?: string;
}

const images = [
    { src: '/gridimg/1.jpg', alt: 'Descripción de la imagen izquierda', width: 600, height: 400 },
    { src: '/gridimg/2.jpg', alt: 'Descripción de la imagen derecha superior', width: 600, height: 400 },
    { src: '/gridimg/3.jpg', alt: 'Descripción de la imagen derecha inferior', width: 600, height: 400 }
];

export const GridImg: React.FC<Props> = ({ className }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Cambiar imagen cada 5 segundos
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`relative w-full h-[36rem] px-p8 overflow-hidden fade-in mt-[4.6rem] grid grid-cols-1 topmenu:grid-cols-3 gap-g8 ${allFont.className} ${className}`}>
            {/* Imagen visible en pantallas móviles */}
            <div className="relative w-full h-[36rem] topmenu:hidden block border-colorPrimary text-colorPrimary rounded-brAll shadow-custom-2 border-customBW">
                <Image
                    src={images[currentImageIndex].src}
                    alt={images[currentImageIndex].alt}
                    width={images[currentImageIndex].width}
                    height={images[currentImageIndex].height}
                    className="w-full h-full object-cover rounded-brAll"
                    priority // Agrega esta línea para dar prioridad a la carga de la imagen
                />
                <div className="absolute inset-x-0 bottom-4 flex justify-center">
                    {images.map((image, index) => (
                        <div key={index} className={`w-2 h-2 rounded-full mx-1 ${index === currentImageIndex ? 'bg-color3' : 'bg-color4'}`} />
                    ))}
                </div>
                <div className="absolute top-4 topmenu:left-4 topmenu:top-8 left-10">
                    <p className="text-colorPrimary text-3xl font-fw9">NEW ARRIVALS</p>
                </div>
            </div>

            {/* Div a la izquierda, visible en pantallas medianas y grandes */}
            <div className="relative hidden topmenu:block w-full h-[36rem] col-span-2 border-colorPrimary text-colorPrimary rounded-brAll shadow-custom-2 border-customBW">
                <div className="w-full h-full overflow-hidden rounded-brAll">
                    <Image
                        src="/gridimg/1.jpg"
                        alt="Descripción de la imagen izquierda"
                        width={800}
                        height={600}
                        className="w-full h-full object-cover"
                        priority // Agrega esta línea para dar prioridad a la carga de la imagen
                    />
                </div>
                <div className="absolute top-4 left-4 topmenu:top-8 topmenu:left-10">
                    <p className="text-colorPrimary topmenu:text-5xl font-fw9">NEW ARRIVALS</p>
                </div>
            </div>

            {/* Contenedor de los dos divs a la derecha, visible en pantallas medianas y grandes */}
            <div className="relative hidden topmenu:grid grid-rows-1 gap-g8 w-full h-full">
                <div className="relative w-full h-[17.75rem] rounded-brAll shadow-customBS border-customBC border-customBW">
                    <Image
                        src="/gridimg/2.jpg"
                        alt="Descripción de la imagen derecha superior"
                        width={800}
                        height={600}
                        className="w-full h-full object-cover rounded-brAll"
                    />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-p8">
                        {/* <p className="text-colorSecondary text-xl sm:text-3xl font-fw9 whitespace-nowrap">YOUR STORY</p> */}
                    </div>
                </div>
                <div className="relative w-full h-[17.75rem] bg-colorSecondary rounded-brAll shadow-customBS border-customBC border-customBW">
                    <Image
                        src="/gridimg/3.jpg"
                        alt="Descripción de la imagen derecha inferior"
                        width={800}
                        height={600}
                        className="w-full h-full object-cover rounded-brAll"
                    />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        {/* <p className="text-colorSecondary text-xl sm:text-3xl font-fw9 whitespace-nowrap">ANYTIME</p> */}
                    </div>
                </div>
            </div>
        </div>
    );
};
