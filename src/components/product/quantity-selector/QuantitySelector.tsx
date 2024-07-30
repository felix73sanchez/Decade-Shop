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
        <div className="flex w-full bg-gray-200 text-center rounded-brAll px-2 mb-5">
            <button onClick={() => onValueChange(-1)}>
                <IoRemoveCircleOutline size={30} />
            </button>
            <span className="w-full mx-3 py-p8 bg-gray-200 text-center rounded-brAll ">{quantity}</span>
            <button onClick={() => onValueChange(+1)}>
                <IoAddCircleOutline size={30} />
            </button>
        </div>
    )
}
