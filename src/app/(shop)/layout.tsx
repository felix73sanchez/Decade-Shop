// src/app/(shop)/layout.tsx
'use client';

import { Footer, Sidebar, TopMenu } from "@/components";
import BarMoving from "@/components/ui/barmoving/barMoving";
import { usePathname } from 'next/navigation';
import { VisibilityProvider,  } from '@/components/ui/barmoving/VisibilityContext';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <VisibilityProvider>
      <main className="min-h-screen relative uppercase "> {/*uppercase todo mayúscula*/}
        <TopMenu /> {/* Componente del menú superior */}
        <Sidebar /> {/* Componente de la barra lateral */}
        
        <div className="p-0">
          {children} {/* Aquí se renderizará el contenido de las páginas */}
        </div>

        <Footer /> {/* Componente del pie de página */}
        
        {pathname === '/' && <BarMoving />} {/* Componente de la barra móvil solo en la página inicial */}
      </main>
    </VisibilityProvider>
  );
}
