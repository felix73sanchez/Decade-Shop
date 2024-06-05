export const revalidate = 60; // 1 minute or 60 seconds

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string;
    take?: string;
  };
}



export default async function Home({ searchParams }: Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page });

  console.log(currentPage, totalPages);

  if (products.length === 0) {
    redirect('/');
  }


  return (
    <>
      <Title
        title="Tienda"
        subtitle="Bienvenido a la tienda"
        className="mb-2 text-7xl"
      />
      <ProductGrid
        products={products}
      />

      <Pagination totalPages={totalPages} />

    </>
  );
}
