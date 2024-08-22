'use client';

import { allFont } from "@/config/fonts";
import { logout } from "@/actions";
import { useUIStore } from "@/store";
import { useSession } from "next-auth/react";
import React from 'react';
import Link from "next/link";
import { IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoTicketOutline, IoShirtOutline } from "react-icons/io5";
import { useVisibility } from '@/components/ui/barmoving/VisibilityContext';
import { Title } from "../title/Title";

export const Sidebar = () => {
    const { isBarMovingVisible } = useVisibility();
    const isSidebarOpen = useUIStore(state => state.isSidebarOpen);
    const closeMenu = useUIStore(state => state.closeSideMenu);
    const { data: session } = useSession();
    const isAuthenticated = !!session?.user;
    const isAdmin = session?.user.role === 'admin';

    const onLogout = async () => {
        await logout();
        window.location.replace('/');
    };

    return (
        <div className={`${allFont.className} transition-opacity duration-300 ${isSidebarOpen && isBarMovingVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} fixed mt-[4.6rem] px-p8 mb-mBody top-0 right-0 mysm:w-full movileS:w-full tablet:w-full z-20 uppercase font-fw5 text-fs1.2rem`}>
            <nav className="h-[36rem] hmovileS:h-fit lg:w-[26rem] w-full p-6 bg-colorSecondary text-colorPrimary border-colorPrimary rounded-brAll shadow-customBS border-customBW flex flex-col justify-between">
                <div>
                    {/* gender en movil en el menu */}
                    <div className="topmenu:hidden blockmb-5 ">
                        <Title title="Categoria" className=""/>
                        <div className="grid grid-cols-4 movileS:grid-cols-2 gap-g8 w-full font-fw5 not-italic border-y-customBW border-colorPrimary">
                            <Link href="/gender/kid"  className="transition duration-300 ease-in-out hover:bg-colorHover hover:border-x-customBW rounded-brAll border-colorPrimary flex-1 text-left">NEW IN</Link>
                            <Link href="/gender/men" onClick={closeMenu} className="transition duration-300 ease-in-out hover:bg-colorHover hover:border-x-customBW rounded-brAll border-colorPrimary mr-4 movileS:mr-0  movileS:text-right">HOMBRES</Link>
                            <Link href="/gender/women" onClick={closeMenu} className="transition duration-300 ease-in-out hover:bg-colorHover hover:border-x-customBW rounded-brAll border-colorPrimary ml-4 movileS:ml-0 movileS:text-left">MUJERES</Link>
                            <Link href="/gender/kid" onClick={closeMenu} className="transition duration-300 ease-in-out hover:bg-colorHover hover:border-x-customBW rounded-brAll border-colorPrimary text-right">NIÑOS</Link>
                        </div>

                    </div>

                    <Title title="MENú" className=" mt-3 " />
                    <div className="hover:rounded-brAll border-y-customBW border-colorPrimary hover:border-colorSecondary">

                        {isAuthenticated && (
                            <>
                                <Link href="/profile" onClick={closeMenu} className="flex items-center py-1 hover:py-2 hover:bg-colorHover transition duration-300 ease-in-out pl-4 hover:rounded-brAll hover:border-customBW hover:border-colorPrimary">
                                    <IoPersonOutline size={24} />
                                    <span className="ml-2 ">Perfil</span>
                                </Link>
                                <Link href="/orders" onClick={closeMenu} className="flex items-center py-1 hover:py-2 hover:bg-colorHover transition duration-300 ease-in-out pl-4 hover:rounded-brAll hover:border-customBW hover:border-colorPrimary">
                                    <IoTicketOutline size={24} />
                                    <span className="ml-2">Historial de Órdenes</span>
                                </Link>
                            </>
                        )}

                        {!isAuthenticated && (
                            <Link href="/auth/login" onClick={closeMenu} className="flex items-center py-1 hover:py-2 hover:bg-colorHover transition duration-300 ease-in-out pl-4 hover:rounded-brAll hover:border-customBW hover:border-colorPrimary">
                                <IoLogInOutline size={24} />
                                <span className="ml-2">Ingresar</span>
                            </Link>
                        )}
                    </div>
                    <Title title="Admin" className=" mt-3 " />
                    <div className="hover:rounded-brAll border-y-customBW border-colorPrimary hover:border-colorSecondary">

                        {isAdmin && (
                            <>  
                                 <Link
                                href="/admin/products"
                                onClick={() => closeMenu()}
                                className="flex items-center py-1 hover:py-2 hover:bg-colorHover transition duration-300 ease-in-out pl-4 hover:rounded-brAll hover:border-customBW hover:border-colorPrimary"
                            >
                                <IoShirtOutline size={24} />
                                <span className="ml-2">Products</span>
                                </Link>

                                <Link href="/admin/orders" onClick={closeMenu} className="flex items-center py-1 hover:py-2 hover:bg-colorHover transition duration-300 ease-in-out pl-4 hover:rounded-brAll hover:border-customBW hover:border-colorPrimary">
                                    <IoTicketOutline size={24} />
                                    <span className="ml-2">Órdenes de Admin</span>
                                </Link>
                                <Link href="/admin/users" onClick={closeMenu} className="flex items-center py-1 hover:py-2 hover:bg-colorHover transition duration-300 ease-in-out pl-4 hover:rounded-brAll hover:border-customBW hover:border-colorPrimary">
                                    <IoPeopleOutline size={24} />
                                    <span className="ml-2">Usuarios de Admin</span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                {isAuthenticated && (
                    <button onClick={async () => { await onLogout(); closeMenu(); }} className="flex items-center py-1 hover:bg-colorHover transition duration-100 ease-in-out w-full uppercase mt-auto pl-4 hover:rounded-brAll border-y-customBW hover:border-customBW border-colorPrimary ">
                        <IoLogOutOutline size={24} />
                        <span className="ml-2 ">Cerrar sesión</span>
                    </button>
                )}
            </nav>
        </div>
    );
};
