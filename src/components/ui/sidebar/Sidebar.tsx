'use client';

import { allFont } from "@/config/fonts";
import { logout } from "@/actions";
import { useUIStore } from "@/store";
import { useSession } from "next-auth/react";
import React from 'react';
import Link from "next/link";
import { IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoTicketOutline, IoCloseOutline } from "react-icons/io5";
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
        <div className={`${allFont.className} transition-opacity duration-300 ${isSidebarOpen && isBarMovingVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} fixed mt-[4.6rem] mr-mBody mb-mBody top-0 right-0 w-[25.9rem] mysm:w-screen h-[35rem] z-10 `}>
            <nav className=" p-6 bg-colorSecondary text-colorPrimary border-colorPrimary rounded-brAll shadow-customBS border-customBW ">
                <Title title="MENú" className="border-b-customBW border-colorPrimary" />
                <div className="mt-6">
                    {isAuthenticated && (
                        <>
                            <Link href="/profile" onClick={closeMenu} className="flex items-center py-2 hover:bg-colorHover transition-all">
                                <IoPersonOutline size={24} />
                                <span className="ml-2">Perfil</span>
                            </Link>
                            <Link href="/orders" onClick={closeMenu} className="flex items-center py-2 hover:bg-colorHover transition-all">
                                <IoTicketOutline size={24} />
                                <span className="ml-2">Historial de Órdenes</span>
                            </Link>
                        </>
                    )}

                    {isAuthenticated && (
                        <button onClick={async () => { await onLogout(); closeMenu(); }} className="flex items-center py-2 hover:bg-colorHover transition-all w-full">
                            <IoLogOutOutline size={24} />
                            <span className="ml-2">Cerrar sesión</span>
                        </button>
                    )}

                    {!isAuthenticated && (
                        <Link href="/auth/login" onClick={closeMenu} className="flex items-center py-2 hover:bg-colorHover transition-all">
                            <IoLogInOutline size={24} />
                            <span className="ml-2">Ingresar</span>
                        </Link>
                    )}

                    {isAdmin && (
                        <>
                            <Link href="/admin/orders" onClick={closeMenu} className="flex items-center py-2 hover:bg-colorHover transition-all">
                                <IoTicketOutline size={24} />
                                <span className="ml-2">Órdenes de Admin</span>
                            </Link>
                            <Link href="/admin/users" onClick={closeMenu} className="flex items-center py-2 hover:bg-colorHover transition-all">
                                <IoPeopleOutline size={24} />
                                <span className="ml-2">Usuarios de Admin</span>
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
};
