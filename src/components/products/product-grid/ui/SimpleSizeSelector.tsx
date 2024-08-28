import type { Size } from "@/interfaces";
import clsx from "clsx";
import React, { useState } from "react";

interface Props {
    selectedSize?: Size;
    availableSizes: Size[];
    onSizeChanged: (size: Size) => void;
}

export const SizeSelector = React.memo(({ selectedSize, availableSizes, onSizeChanged }: Props) => {
    const [hoveredSize, setHoveredSize] = useState<Size | null>(null);

    return (
        <div className="flex flex-col relative">
            <div className="flex items-center justify-center">
                {availableSizes.map((size) => (
                    <div key={size} className="relative">
                        <button
                            onClick={() => {
                                onSizeChanged(size);
                                setHoveredSize(size);
                            }}
                            onMouseEnter={() => setHoveredSize(size)}
                            onMouseLeave={() => setHoveredSize(null)}
                            className={clsx(
                                "w-full p-0 topmenu:p-1 hover:underline bg-colorSecondary hover:bg-colorHover border-colorPrimary text-colorPrimary border-y-customBW text-fs1rem  font-fw7",
                                { 'bg-colorPrimary shadow-transparent text-colorSecondary': selectedSize === size }
                            )}
                        >
                            <div className="mx-1">
                                {size}
                            </div>
                        </button>
                        
                        {/* Tooltip */}
                        {hoveredSize === size && (
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2">
                                <div className="relative w-[8.31rem] px-2 py-1 bg-colorPrimary text-colorSecondary text-xs rounded">
                                    Agregar al carrito

                                    {/* Flecha debajo del tooltip */}
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                                        <div className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-colorPrimary"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
});
