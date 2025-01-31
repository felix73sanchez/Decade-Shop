import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Gridimg } from "@/components";
import { redirect } from "next/navigation";
import { allFont } from "@/config/fonts"

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
      {/* Renderiza el componente Gridimg solo en la página 1 */}
      {page === 1 && <Gridimg className={`${allFont.className}`} />}

      <div className="flex items-center justify-between p-p8 text-colorPrimary">
            <div className="font-fw9 text-[1.1rem] ">CHECK OUT THE NEW</div>
            <button className="font-fw5 text-fs2 py-2  hover:text-colorHover focus:outline-none ">
                VIEW ALL
            </button>
        </div>
      
      {/* Aplica mt-16 a ProductGrid después de la página 1 */}
      
      <div className={`px-p8 ${page > 1 ? 'mt-5' : ''}`}>
        <ProductGrid products={products } />
      </div>
      <Pagination totalPages={totalPages} />
    </>
  );
}
