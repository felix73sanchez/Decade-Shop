'use client';

import { Footer, Sidebar, TopMenu } from "@/components";
import BarMoving from "@/components/ui/barmoving/barMoving";
import { usePathname } from 'next/navigation';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen relative">
      <TopMenu /> {/* Componente del menú superior */}
      <Sidebar /> {/* Componente de la barra lateral */}
      
      <div className="p-0">
        {children} {/* Aquí se renderizará el contenido de las páginas */}
      </div>

      <Footer /> {/* Componente del pie de página */}
      
      {pathname === '/' && <BarMoving />} {/* Componente de la barra móvil solo en la página inicial */}
    </main>
  );
}