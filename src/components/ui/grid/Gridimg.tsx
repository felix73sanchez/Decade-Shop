
import { allFont } from "@/config/fonts";

interface Props {
    grid: string;
}

export const Gridimg = () => {
    
    return (
        <div className={`mt-16 mr-2 p-1 pb-2 flex justify-between items-center max-w-full h-full`}>
            {/* Div a la izquierda */}
            <div className="m-1 h-h1 w-9/12 bg-colorSecondary rounded-brAll shadow-customBS border-customBC border-customBW">
                <p className="text-red-600">Div a la izquierda</p>
            </div>

            {/* Contenedor de los dos divs a la derecha */}
            <div className="flex flex-col w-1/2 h-h1 gap-g8 justify-between">
                <div className="mx-1 w-full h-1/2 bg-colorSecondary rounded-brAll shadow-customBS border-customBC border-customBW">
                    <p className="text-white">Div a la derecha arriba</p>
                </div>
                <div className="mx-1 w-full h-1/2 bg-colorSecondary  rounded-brAll shadow-customBS border-customBC border-customBW">
                    <p className="text-white">Div a la derecha abajo</p>
                </div>
            </div>
        </div>
    )
}
export default Gridimg;
