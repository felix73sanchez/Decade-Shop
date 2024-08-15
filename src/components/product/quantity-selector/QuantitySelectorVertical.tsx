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
        <div className="h-8 mysm:h-6 movileS:h-5 flex w-full items-center justify-between mysm:text-fs1 border-colorPrimary border-2 mysm:border-customBW movileS:border-customBW rounded-brAll">
            <button className="hover:text-colorHover mysm:text-fs1 p-0.5 ml-1 movileS:ml-0 border-colorPrimary border-2 mysm:border-customBW movileS:border-customBW rounded-brAll"  onClick={() => onValueChange(-1)}>
                <PiMinusBold size={10} />
            </button>
            <span className="w-8 text-fs1rem mysm:text-fs1 font-fw5">{quantity}</span>
            <button className="hover:text-colorHover mysm:text-fs1 items-center border-colorPrimary border-2 mysm:border-customBW movileS:border-customBW rounded-brAll p-0.5 mr-1 movileS:mr-0" onClick={() => onValueChange(+1)}>
                <PiPlusBold  size={10} 
                />
            </button>
        </div>
    )
}
