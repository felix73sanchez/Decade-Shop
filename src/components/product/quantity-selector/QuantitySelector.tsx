'use client';


import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
    quantity: number;

    onQuantityChanged: (quantity: number) => void;
}



export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {


    const onValueChange = (value: number) => {
        if (quantity + value < 1) return;

        onQuantityChanged(quantity + value);
    };


    return (
        <div className="flex w-full mysm:h-8 px-2 mysm:px-0 my-2  text-center bg-slate-50 border-colorPrimary text-colorPrimary rounded-brAll mysm:rounded-xl border-customBW items-center">
            <button className="hover:text-colorHover"  onClick={() => onValueChange(-1)}>
                <IoRemoveCircleOutline size={30} />
            </button>
            <span className="w-full mx-3 py-p8 rounded-brAll text-fs1rem font-fw5 ">{quantity}</span>
            <button className="hover:text-colorHover" onClick={() => onValueChange(+1)}>
                <IoAddCircleOutline size={30} />
            </button>
        </div>
    )
}
