export const revalidate = 60; // 1 minute or 60 seconds

import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';
import { Gender } from '@prisma/client';
import { redirect } from 'next/navigation'

interface Props {
    params: {
        gender: string;
    },
    searchParams: {
        page?: string;
    }
}



export default async function GenderPageById({ params, searchParams }: Props) {

    const { gender } = params;

    const page = searchParams.page ? parseInt(searchParams.page) : 1;

    const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({
        page,
        gender: gender as Gender,
    });

    console.log(currentPage, totalPages);

    if (products.length === 0) {
        redirect(`/gender/${gender}`);
    }


    const labels: Record<string, string> = {
        'men': 'para hombres',
        'women': 'para mujeres',
        'kid': 'para niños',
        'unisex': 'para todos',
    }

    // if (id === 'kids') {
    //     notFound();
    // }

    return (
        <>
            <Title
                title={`Articulos ${labels[gender]}`}
                subtitle={`Seccion de  ${gender}'s de la tienda`}
                className="mb-2 text-7xl"
            />
            <ProductGrid
                products={products}
            />

            <Pagination totalPages={totalPages} />

        </>

    );
}