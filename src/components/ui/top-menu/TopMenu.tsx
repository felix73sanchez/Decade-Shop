'use client';

import { logoFont, titleFont } from "@/config/fonts"
import { useCartStore, useUIStore } from "@/store";
import Link from "next/link"
import { useEffect, useState } from "react";
import { IoSearchOutline, IoCartOutline } from "react-icons/io5"



export const TopMenu = () => {

    const openSideMenu = useUIStore(state => state.openSideMenu);
    const totalItemsInCart = useCartStore(state => state.getTotalItems());
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, [])

    return (
        <nav className="flex px-5  rounded-md fixed top-0 left-0 right-0 m-3 w-auto bg-colorGreen text-colorblanco p-0 shadow justify-between items-center container z-50">

            {/*Logo*/}
            <div>
                <Link
                    href="/">
                    <span className={`${logoFont.className} antialiased text-2xl `}>DECAVENTURE</span>

                </Link>
            </div>

            {/*Center Menu*/}
            <div className="hidden sm:block">
                <Link className="m-2 p-2 rounded-md transition-all hover:bg-lime-500" href="/gender/kid">Idelvi</Link>
                <Link className="m-2 p-2 rounded-md transition-all hover:bg-lime-500" href="/gender/men">Hombres</Link>
                <Link className="m-2 p-2 rounded-md transition-all hover:bg-lime-500" href="/gender/women">Mujeres</Link>
                <Link className="m-2 p-2 rounded-md transition-all hover:bg-lime-500" href="/gender/kid">Niños</Link>
            </div>

            {/*Search, Cart, Menu*/}
            <div className="flex items-center">
                <Link href="/search" className="mx-2">
                    <IoSearchOutline className="w-5 h-5" />
                </Link>
                <Link href={
                    ((totalItemsInCart === 0) && loaded)
                        ? "/empty"
                        : "/cart"
                } className="mx-2">
                    <div className=" relative">
                        {
                            (loaded && totalItemsInCart > 0) && (
                                <span className=" fade-in absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-red-700 text-white">
                                    {totalItemsInCart}
                                </span>
                            )}
                        <IoCartOutline className="w-5 h-5" />
                    </div>

                </Link>

                <button className="m-2 p-2 rounded-md transition-all hover:bg-lime-500" onClick={openSideMenu} >
                    Menu
                </button>

            </div>

        </nav >
    )
}
