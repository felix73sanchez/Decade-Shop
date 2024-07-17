'use client';

import { allFont, logoFont } from "@/config/fonts"
import { logout } from "@/actions";
import { useUIStore } from "@/store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"
import { PiXBold } from "react-icons/pi";
import { useVisibility } from '@/components/ui/barmoving/VisibilityContext';

export const Sidebar = () => {
    const isSidebarOpen = useUIStore(state => state.isSidebarOpen);
    const closeMenu = useUIStore(state => state.closeSideMenu);
    const { isBarMovingVisible, setBarMovingVisible } = useVisibility();
    const setNavZIndex = useUIStore(state => state.setNavZIndex);

    const onLogout = async () => {
        await logout();
        window.location.replace('/');
    }

    const { data: session } = useSession();
    const isAuthenticated = !!session?.user;
    const isAdmin = (session?.user.role === 'admin');

    return (
        <div className={`${allFont.className}`}>
            {isSidebarOpen && (
                <div className="fixed top-0 left-0 w-full h-full z-20 bg-colorSecondary bg-opacity-20" />
            )}

            {isSidebarOpen && (
                <div
                    className="fixed top-0 left-0 w-full h-full z-20 backdrop-filter backdrop-blur-lg"
                />
            )}
            
            <div className={clsx("flex fixed flex-col w-full h-full top-0 left-0 p-pHeader justify-between gap-g8 z-20 transform transition-opacity duration-[2000ms] font-fw9 ", { "translate-x-[100rem]": !isSidebarOpen })}>
                
                {/* Top Menu */}
                <nav className="flex px-5 sm:px-5 py-[0.5rem] sm:py-[0.5rem] justify-between items-center bg-colorPrimary text-colorSecondary border-colorPrimary rounded-brAll shadow-customBS border-customBW ">
                    <div>
                        <Link href="/">
                            <span className={`${logoFont.className} m-0 p-0 antialiased text-fsLogo font-fw9 text-colorSecondary italic`}>My PAGE</span>
                        </Link>
                    </div>

                    <PiXBold
                        size={30}
                        className="top-5 right-5 cursor-pointer hover:text-colorHover "
                        onClick={() => {
                            closeMenu();
                            setBarMovingVisible(true);
                            setNavZIndex(30); // Restaurar z-index cuando se cierra el sidebar
                        }}
                    />
                </nav>

                {/* Side Menu */}
                <nav className="grid grid-cols-1 sm:grid-cols-3 gap-g8 w-full h-full m-0 p-6 bg-colorSecondary rounded-brAll shadow-customBS border-customBC  border-customBW uppercase">

{/* Input  para poner al topmenu
                    <div className="relative ">
                        <IoSearchOutline
                            size={20}
                            className="absolute top-1 left-2"
                        />
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
                        />
                    </div>*/}

                    {/* Menu Items */}
                    {isAuthenticated && (
                        <>
                            <Link
                                href="/profile"
                                onClick={() => closeMenu()}
                                className="flex items-center hover:bg-colorHover bg-colorSecondary text-colorPrimary  border-colorPrimary rounded-brAll shadow-customBS border-customBW transition-all"
                            >
                                <IoPersonOutline size={30} />
                                <span className=" text-xl">Perfil</span>
                            </Link>

                            <Link
                                href="/orders"
                                onClick={() => closeMenu()}
                                className="flex items-center hover:bg-colorHover bg-colorSecondary text-colorPrimary  border-colorPrimary rounded-brAll shadow-customBS border-customBW transition-all"
                            >
                                <IoTicketOutline size={30} />
                                <span className="text-xl">Historial de Órdenes</span>
                            </Link>
                        </>
                    )}

                    {isAuthenticated && (
                        <button
                            className="flex w-full items-center hover:bg-colorHover bg-colorSecondary text-colorPrimary  border-colorPrimary rounded-brAll shadow-customBS border-customBW transition-all uppercase"
                            onClick={() => [onLogout(), closeMenu()]}
                        >
                            <IoLogOutOutline size={30} />
                            <span className=" text-xl">Cerrar sesión</span>
                        </button>
                    )}
                    <div className="border-t border-gray-300 w-full"></div>
                    {!isAuthenticated && (
                        <Link
                            href="/auth/login"
                            className="flex items-center hover:bg-colorHover bg-colorSecondary text-colorPrimary  border-colorPrimary rounded-brAll shadow-customBS border-customBW transition-all"
                            onClick={() => closeMenu()}
                        >
                            <IoLogInOutline size={30} />
                            <span className="text-xl">Ingresar</span>
                        </Link>
                    )}

                    {/* Admin Menu Items */}
                    {isAdmin && (
                        <>

                            <Link
                                href="/admin/orders"
                                onClick={() => closeMenu()}
                                className="flex items-center hover:bg-colorHover bg-colorSecondary text-colorPrimary  border-colorPrimary rounded-brAll shadow-customBS border-customBW transition-all"
                            >
                                <IoTicketOutline size={30} />
                                <span className="text-xl">Órdenes de Admin</span>
                            </Link>

                            <Link
                                href="/admin/users"
                                onClick={() => closeMenu()}
                                className="flex items-center hover:bg-colorHover bg-colorSecondary text-colorPrimary  border-colorPrimary rounded-brAll shadow-customBS border-customBW transition-all"
                            >
                                <IoPeopleOutline size={30} />
                                <span className="text-xl">Usuarios de Admin</span>
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </div>
    );
};
