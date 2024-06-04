import type { Size } from "@/interfaces";
import clsx from "clsx";

interface Props {
    selectedSize: Size;
    availableSizes: Size[];
}

export const SizeSelector = ({ selectedSize, availableSizes }: Props) => {



    return (
        <div className="my-5">
            <h3 className="font-bold mb-4">Tallas disponibles</h3>
            <div className="flex">
                {
                    availableSizes.map((size) => (
                        <button
                            key={size}
                            className={
                                clsx(
                                    "mx-2 hover:underline text-lg",
                                    {
                                        'underline': selectedSize === size,
                                    }
                                )
                            }> {/* BOTON NORMAL: //TODO className={`btn-secondary ${selectedSize === size ? "bg-primary text-white" : ""} mr-2` || "mx-2 hover:underline text-lg" */}
                            {size}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}
