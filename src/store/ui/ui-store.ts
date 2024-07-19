'use client';

import { create } from 'zustand';

interface State {
    isSidebarOpen: boolean;
    navZIndex: number;
    openSideMenu: () => void;
    closeSideMenu: () => void;
    setNavZIndex: (zIndex: number) => void;
}

export const useUIStore = create<State>((set) => ({
    isSidebarOpen: false,
    navZIndex: 30, // Valor inicial del zIndex
    openSideMenu: () => set((state) => ({
        isSidebarOpen: true,
        navZIndex: 10, // Cambiar el zIndex cuando se abre el sidebar
    })),
    closeSideMenu: () => set((state) => ({
        isSidebarOpen: false,
        navZIndex: 30, // Restaurar el zIndex cuando se cierra el sidebar
    })),
    setNavZIndex: (zIndex: number) => set({ navZIndex: zIndex }),
}));

