// src/app/(shop)/page.tsx

import { Gridimg } from '@/components';
import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string;
    take?: string;
  };
}

export const revalidate = 60; // 1 minute or 60 seconds

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page });

  console.log(currentPage, totalPages);

  if (products.length === 0) {
    redirect('/');
    return null; // Evita renderizar el resto de la página si se redirige
  }

  return (
    <>
      {/* Renderiza el componente Title solo en la página de inicio */}
      {<Gridimg/>}
      <div className='ml-mElement p-pHeader font-fw7 text-fsHeader text-colorPrimary'>LO MAS RECIENTE</div>
      
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}

// Función para verificar si la página actual es la página de inicio
function isHomePage() {
  // Lógica para determinar si esta es la página de inicio (por ejemplo, basado en la URL, etc.)
  // Por ejemplo, podrías verificar la ruta o cualquier otro criterio que identifique la página de inicio
  return true; // Asume que esta función retorna true si estamos en la página de inicio
}
