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
            <h3 className="text-fs1rem font-fw9 mb-5 ">Tallas disponibles</h3>
            <div className="flex ">
                {
                    availableSizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => onSizeChanged(size)}
                            className={
                                clsx(
                                    "w-full p-1 mx-2 hover:underline hover:bg-colorHover border-colorPrimary text-colorPrimary rounded-brAll shadow-custom-2 border-customBW text-fs1rem font-fw5",
                                    {
                                        'bg-colorPrimary shadow-transparent text-colorSecondary': selectedSize === size,
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
