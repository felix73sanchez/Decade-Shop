'use client';
import { allFont } from "@/config/fonts";
import { logoFont } from "@/config/fonts";

interface Props {
    grid: string;
}

export const Gridimg = () => {

    return (
        <div className={`flex pt-p8 mt-16 items-center  w-[62rem] h-[32rem] gap-g8 ${allFont.className}`}>
            {/* Div a la izquierda */}
            <div className="relative h-h1 w-9/12 bg-colorSecondary rounded-brAll shadow-customBS border-customBC border-customBW ">

                <img src="/gridimg/1.jpg" alt="Descripción de la imagen izquierda" className="w-full h-full object-cover overflow-hidden rounded-brAll" />

                <div className="absolute top-8 left-10">
                    <p className="text-colorPrimary text-5xl font-fw9 ">NEW ARRIVALS</p>
                </div>

            </div>

            {/* Contenedor de los dos divs a la derecha */}
            <div className="flex flex-col w-[32rem] h-[32rem]
            gap-g8">
                <div className="relative w-full h-[15.725rem] bg-colorSecondary rounded-brAll shadow-customBS border-customBC border-customBW">
                    <img src="/gridimg/2.jpg" alt="Descripción de la imagen izquierda" className="w-full h-full  top-0 left-0 object-cover overflow-hidden rounded-brAll" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-p8">
                        {/* <p className="text-colorSecondary text-3xl font-fw9 whitespace-nowrap">YOUR STORY</p>*/}
                    </div>
                </div>
                <div className="relative w-full h-[15.725rem] bg-colorSecondary  rounded-brAll shadow-customBS border-customBC border-customBW">
                    <img src="/gridimg/3.jpg" alt="Descripción de la imagen izquierda" className="w-full h-full object-cover overflow-hidden rounded-brAll" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                       {/* <p className="text-colorSecondary text-3xl font-fw9 whitespace-nowrap">ANYTIME</p>*/}
                    </div>
                </div>
            </div>
        </div>
        
    )
}