import type { Size } from "@/interfaces";
import clsx from "clsx";

interface Props {
    selectedSize?: Size;
    availableSizes: Size[];

    onSizeChanged: (size: Size) => void;

}

export const SizeSelector = ({ selectedSize, availableSizes, onSizeChanged }: Props) => {



    return (
        <div className="my-5 text-colorPrimary">
            <h3 className="font-bold mb-5">Tallas disponibles</h3>
            <div className="flex ">
                {
                    availableSizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => onSizeChanged(size)}
                            className={
                                clsx(
                                    "w-full p-1 mx-2 hover:underline hover:bg-colorHover text-fs2 font-fw5 rounded-brAll shadow-customBS border-customBC border-customBW",
                                    {
                                        'bg-colorPrimary text-colorSecondary': selectedSize === size,
                                    }
                                )
                            }> {/* BOTON NORMAL: //TODO className={`btn-secondary ${selectedSize === size ? "bg-primary text-white" : ""} mr-2` || "mx-2 hover:underline text-lg" 
                            */}
                            {size}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}
