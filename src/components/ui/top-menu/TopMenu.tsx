'use client';

import { logoFont } from "@/config/fonts";
import { useCartStore, useUIStore } from "@/store";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { PiMagnifyingGlassBold, PiShoppingCartSimpleBold, PiListBold, PiXBold } from "react-icons/pi";
import { useVisibility } from '@/components/ui/barmoving/VisibilityContext';
import { Sidebar } from '@/components/ui/sidebar/Sidebar';

export const TopMenu = () => {
    const isSidebarOpen = useUIStore(state => state.isSidebarOpen);
    const closeMenu = useUIStore(state => state.closeSideMenu);
    const openSideMenu = useUIStore(state => state.openSideMenu);

    const totalItemsInCart = useCartStore(state => state.getTotalItems());
    const [loaded, setLoaded] = useState(false);
    const { setBarMovingVisible } = useVisibility();

    useEffect(() => {
        setLoaded(true);
    }, []);

    const [showMenu, setShowMenu] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY;

        if (scrollY > lastScrollY && scrollY > 100) {
            setShowMenu(false); // Oculta el menú cuando se baja más de 20 píxeles
        } else if (scrollY < lastScrollY) {
            setShowMenu(true); // Muestra el menú cuando se sube
        }
        
        setLastScrollY(scrollY);

        // Cierra el sidebar si está abierto y se hace scroll
        if (isSidebarOpen) {
            closeMenu();
        }
    }, [lastScrollY, isSidebarOpen, closeMenu]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    const handleButtonClick = () => {
        openSideMenu();
        setBarMovingVisible(true);
    };

    const handleCloseButtonClick = () => {
        closeMenu();
    };

    return (
        <>
            {/* Fondo borroso y oscuro */}
            {isSidebarOpen && (
                <div 
                    onClick={closeMenu} 
                    className="fixed inset-0 bg-colorPrimary bg-opacity-85 backdrop-blur-lg z-10 transition-opacity duration-300"
                />
            )}

            <nav className={`${logoFont.className} flex fixed top-0 sm:left-0 sm:right-0 left-2 right-2 sm:mx-mBody mt-[0.3rem] px-5 sm:px-5 py-[0.5rem] sm:py-[0.5rem] justify-between items-center bg-colorPrimary text-colorSecondary border-colorPrimary rounded-brAll shadow-customBS border-customBW transition-transform duration-1000 z-20 ${showMenu ? 'translate-y-0.5' : '-translate-y-20'}`}>
                <div className="m-0 p-0 antialiased text-fsLogo font-fw9 italic hover:text-colorHover text-colorSecondary">
                    <Link href="/" onClick={handleCloseButtonClick}>
                        <span className={``}>DECA</span>
                        <span className={`movileS:hidden`}>VENTURE</span>
                    </Link>
                </div>

                <div className={`hidden topmenu:block font-fw5 not-italic m-0 p-0`} onClick={handleCloseButtonClick}>
                    <Link className="mx-mElement transition-all hover:text-colorHover" href="/gender/kid">NEW IN</Link>
                    <Link className="mx-mElement transition-all hover:text-colorHover" href="/gender/men">HOMBRES</Link>
                    <Link className="mx-mElement transition-all hover:text-colorHover" href="/gender/women">MUJERES</Link>
                    <Link className="mx-mElement transition-all hover:text-colorHover" href="/gender/kid">NIÑOS</Link>
                </div>

                <div className="flex items-center space-x-5 m-0 p-0">
                    <Link href="/search" className="hover:text-colorHover ">
                        <PiMagnifyingGlassBold className="w-6 h-6" onClick={handleCloseButtonClick}/>
                    </Link>
                    <Link href={((totalItemsInCart === 0) && loaded) ? "/empty" : "/cart"} className=" ">
                        <div className="relative hover:text-colorHover">
                            {loaded && totalItemsInCart > 0 && (
                                <span className="bg-red-600 fade-in absolute text-fs1 px-1 rounded-brAll font-fw7 not-italic -top-1 -right-2 text-colorSecondary">
                                    {totalItemsInCart}
                                </span>
                            )}
                            <PiShoppingCartSimpleBold className="w-6 h-6" onClick={handleCloseButtonClick} />
                        </div>
                    </Link>

                    {!isSidebarOpen && (
                        <button className="font-fw4 transition-all hover:text-colorHover" onClick={handleButtonClick}>
                            <PiListBold className="w-7 h-7" />
                        </button>
                    )}
                    {isSidebarOpen && (
                        <PiXBold
                            size={28}
                            className="top-5 right-5 cursor-pointer hover:text-colorHover"
                            onClick={handleCloseButtonClick}
                        />
                    )}
                </div>
            </nav>
            {isSidebarOpen && <Sidebar />} {/* Renderiza el Sidebar solo si isSidebarOpen es true */}
        </>
    );
};
