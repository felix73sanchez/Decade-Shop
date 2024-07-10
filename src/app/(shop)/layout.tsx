'use client';

import { Footer, Sidebar, TopMenu } from "@/components";
import BarMoving from "@/components/ui/barmoving/barMoving";
import { usePathname } from 'next/navigation';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

export default function ShopLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <main className="min-h-screen">

            <TopMenu />
            <Sidebar />

            <div className="p-0">
                {children}
            </div>

      <Footer /> {/* Componente del pie de página */}
      
      {pathname === '/' && <BarMoving />} {/* Componente de la barra móvil solo en la página inicial */}
    </main>
  );
}
