'use client'; // Marca el componente como Client Component

import { allFont } from "@/config/fonts";

interface Props {
    leftImageUrl: string;
    topRightImageUrl: string;
    bottomRightImageUrl: string;
}

export const Gridimg = ({ leftImageUrl, topRightImageUrl, bottomRightImageUrl }: Props) => {
    return (
        <div className={`mt-16 mr-2 p-1 pb-2 flex justify-between items-center max-w-full h-full`}>
            {/* Div a la izquierda */}
            <div className="m-1 h-h1 w-9/12 bg-colorSecondary rounded-brAll shadow-customBS border-customBC border-customBW">
                <img src={leftImageUrl} alt="Descripción de la imagen izquierda" className="w-full h-full object-cover rounded-brAll" />
            </div>

            {/* Contenedor de los dos divs a la derecha */}
            <div className="flex flex-col w-1/2 h-h1 gap-g8 justify-between">
                <div className="mx-1 w-full h-1/2 bg-colorSecondary rounded-brAll shadow-customBS border-customBC border-customBW">
                    <img src={topRightImageUrl} alt="Descripción de la imagen derecha arriba" className="w-full h-full object-cover rounded-brAll" />
                </div>
                <div className="mx-1 w-full h-1/2 bg-colorSecondary rounded-brAll shadow-customBS border-customBC border-customBW">
                    <img src={bottomRightImageUrl} alt="Descripción de la imagen derecha abajo" className="w-full h-full object-cover rounded-brAll" />
                </div>
            </div>
        </div>
    );
}

export default Gridimg;
