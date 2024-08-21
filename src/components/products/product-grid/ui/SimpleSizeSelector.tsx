import type { Size } from "@/interfaces";
import clsx from "clsx";

interface Props {
    selectedSize?: Size;
    availableSizes: Size[];

    onSizeChanged: (size: Size) => void;

}

export const SizeSelector = ({ selectedSize, availableSizes, onSizeChanged }: Props) => {



    return (
        
            <div className="flex">
                {
                    availableSizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => onSizeChanged(size)}
                            className={
                                clsx(
                                    "w-full p-1 mx-0 hover:underline bg-colorSecondary hover:bg-colorHover border-colorPrimary text-colorPrimary shadow-custom-2 border-customBW text-fs1rem font-fw5",
                                    {
                                        'bg-colorPrimary shadow-transparent text-colorSecondary': selectedSize === size,
                                    }
                                )
                            }> {/* BOTON NORMAL: //TODO className={`btn-secondary ${selectedSize === size ? "bg-primary text-white" : ""} mr-2` || "mx-2 hover:underline text-lg" 
                            */}
                            <div className="mx-2">
                                {size}
                            </div>
                        </button>
                    ))
                }
            </div>
    )
}
