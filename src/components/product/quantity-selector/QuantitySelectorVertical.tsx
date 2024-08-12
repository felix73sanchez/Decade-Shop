'use client';

import { PiPlusBold, PiMinusBold  } from "react-icons/pi";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
    quantity: number;

    onQuantityChanged: (quantity: number) => void;
}



export const QuantitySelectorVertical = ({ quantity, onQuantityChanged }: Props) => {


    const onValueChange = (value: number) => {
        if (quantity + value < 1) return;

        onQuantityChanged(quantity + value);
    };


    return (
        <div className="flex w-full items-center justify-between  mysm:text-fs1  ">
            <button className="hover:text-colorHover mysm:text-fs1 p-1 border-colorPrimary border-customBW rounded-brAll"  onClick={() => onValueChange(-1)}>
                <PiMinusBold size={10} />
            </button>
            <span className="w-full mx-5 mysm:mx-1 mysm:py-0 px-0 text-fs1rem mysm:text-fs2 font-fw5   rotate-0">{quantity}</span>
            <button className="hover:text-colorHover mysm:text-fs1 items-center border-colorPrimary border-customBW rounded-brAll p-1" onClick={() => onValueChange(+1)}>
                <PiPlusBold  size={10} 
                />
            </button>
        </div>
    )
}
