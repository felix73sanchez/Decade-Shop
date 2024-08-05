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
        <div className="flex w-full px-2 my-2 text-center bg-gray-200 border-colorPrimary text-colorPrimary rounded-brAll shadow-custom-2 border-customBW ">
            <button onClick={() => onValueChange(-1)}>
                <IoRemoveCircleOutline size={30} />
            </button>
            <span className="w-full mx-3 py-p8 bg-gray-200 text-center rounded-brAll text-fs1rem font-fw5 ">{quantity}</span>
            <button onClick={() => onValueChange(+1)}>
                <IoAddCircleOutline size={30} />
            </button>
        </div>
    )
}
