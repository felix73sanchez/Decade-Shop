'use client';

import { logoFont, allFont } from "@/config/fonts";
import { useCartStore, useUIStore } from "@/store";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react"; // Importar useCallback
import { PiMagnifyingGlassBold, PiShoppingCartSimpleBold, PiListBold } from "react-icons/pi";

export const TopMenu = () => {
    const openSideMenu = useUIStore(state => state.openSideMenu);
    const totalItemsInCart = useCartStore(state => state.getTotalItems());
    const [loaded, setLoaded] = useState(false);
    const [showMenu, setShowMenu] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Definir handleScroll usando useCallback para evitar la recreación en cada render
    const handleScroll = useCallback(() => {
        if (window.scrollY > lastScrollY) {
            setShowMenu(false);
        } else {
            setShowMenu(true);
        }
        setLastScrollY(window.scrollY);
    }, [lastScrollY]);

    useEffect(() => {
        setLoaded(true);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]); // Agregar handleScroll a las dependencias

    return (
        <nav className={`${logoFont.className} flex fixed top-0 sm:left-0 sm:right-0 left-2 right-2 sm:mx-mBody mt-[0.3rem] px-5 sm:px-5 py-[0.5rem] sm:py-[0.5rem] justify-between items-center z-10 bg-colorPrimary text-colorSecondary border-colorPrimary rounded-brAll shadow-customBS border-customBW transition-transform duration-500 ${showMenu ? 'translate-y-0.5' : '-translate-y-20'}`}>

            {/*Logo*/}
            <div>
                <Link href="/">
                    <span className={`m-0 p-0 antialiased text-fsLogo font-fw9 hover:text-colorHover text-colorSecondary`}>DECAVENTURE</span>
                </Link>
            </div>

            {/*Center Menu*/}
            <div className={`hidden sm:block font-fw5 not-italic m-0 p-0`}>
                <Link className="mx-mElement transition-all hover:text-colorHover" href="/gender/kid">NEW IN</Link>
                <Link className="mx-mElement transition-all hover:text-colorHover" href="/gender/men">HOMBRES</Link>
                <Link className="mx-mElement transition-all hover:text-colorHover" href="/gender/women">MUJERES</Link>
                <Link className="mx-mElement transition-all hover:text-colorHover" href="/gender/kid">NIÑOS</Link>
            </div>

            {/*Search, Cart, Menu*/}
            <div className="flex items-center space-x-5 m-0 p-0">
                <Link href="/search" className="hover:text-colorHover">
                    <PiMagnifyingGlassBold className="w-6 h-6" />
                </Link>
                <Link href={((totalItemsInCart === 0) && loaded) ? "/empty" : "/cart"} className=" ">
                    <div className="relative hover:text-colorHover">
                        {(loaded && totalItemsInCart > 0) && (
                            <span className="bg-red-600 fade-in absolute text-fs1 px-1 rounded-brAll font-fw7 not-italic -top-1 -right-2 text-colorSecondary">
                                {totalItemsInCart}
                            </span>
                        )}
                        <PiShoppingCartSimpleBold className="w-6 h-6" />
                    </div>
                </Link>

                <button className="font-fw4 transition-all hover:text-colorHover" onClick={openSideMenu}>
                    <PiListBold className="w-7 h-7" />
                </button>
            </div>
        </nav>
    );
}
