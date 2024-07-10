'use client';

import { logoFont, allFont } from "@/config/fonts"
import { useCartStore, useUIStore } from "@/store";
import Link from "next/link"
import { useEffect, useState } from "react";
import { IoSearchOutline, IoCartOutline, IoMenuSharp } from "react-icons/io5"
import { RiShoppingCart2Line } from "react-icons/ri";


export const TopMenu = () => {

    const openSideMenu = useUIStore(state => state.openSideMenu);
    const totalItemsInCart = useCartStore(state => state.getTotalItems());
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, [])
//ocultar menu y mostrar
    const [showMenu, setShowMenu] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleScroll = () => {
        if (window.scrollY > lastScrollY) {
            setShowMenu(false);
        } else {
            setShowMenu(true);
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        setLoaded(true);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        
        <nav className={`flex fixed top-0 left-0 right-0 m-m8 p-p8 justify-between items-center z-10 w-auto bg-colorPrimary text-colorSecondary rounded-brAll shadow-customBS border-colorPrimary border-customBW transition-transform duration-1000 ${showMenu ? 'translate-y-0.5' : '-translate-y-16'}`}>

            {/*Logo*/}
            <div>
                <Link
                    href="/">
                    <span className={`${logoFont.className} antialiased text-fsLogo font-fw9 pl-p8 `}>DECAVENTURE</span>

                </Link>
            </div>

            {/*Center Menu*/}
            <div className="hidden sm:block font-fw4 items-center">
                <Link className="mx-m8 transition-all hover:text-colorHover" href="/gender/kid">NEW IN</Link>
                <Link className="mx-m8 transition-all hover:text-colorHover" href="/gender/men">HOMBRES</Link>
                <Link className="mx-m8 transition-all hover:text-colorHover" href="/gender/women">MUJERES</Link>
                <Link className="mx-m8 transition-all hover:text-colorHover" href="/gender/kid">NIÑOS</Link>
            </div>

            {/*Search, Cart, Menu*/}
            <div className="flex items-center space-x-4">
                <Link href="/search" className="mx-m8">
                    <IoSearchOutline className="w-5 h-5" />
                </Link>
                <Link href={
                    ((totalItemsInCart === 0) && loaded)
                        ? "/empty"
                        : "/cart"
                } className="mx-m8 ">
                    <div className=" relative">
                        {
                            (loaded && totalItemsInCart > 0) && (
                                <span className=" fade-in absolute text-fs1 px-1 rounded-brAll font-fw7 -top-2 -right-2 bg-red-700 text-colorSecondary">
                                    {totalItemsInCart}
                                </span>
                            )}
                        <RiShoppingCart2Line className="w-5 h-5" />
                    </div>

                </Link>
                
                <button className="px-p8 font-fw4 transition-all hover:text-colorHover" onClick={openSideMenu} >
                    <IoMenuSharp className="w-7 h-7" />
                </button>

            </div>

        </nav >
    )
}
