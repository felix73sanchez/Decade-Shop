export const revalidate = 60; // 1 minute or 60 seconds

import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title, Footer } from '@/components';
import { Gender } from '@prisma/client';
import { redirect } from 'next/navigation';

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
            <div className='m-mBody mt-5'>
                <div className='mt-16 text-colorPrimary text-fs1 font-fw1 '>
                    <Title
                        title={`${labels[gender]}`}
                        className=''
                        /*subtitle={`Seccion de  ${gender}'s de la tienda`}
                        className="mb-2 text-7xl"*/
                    />
                </div>
                <ProductGrid
                    products={products}
                />

                <Pagination totalPages={totalPages} />
                <Footer /> {/* Componente del pie de página */}
            </div>
        </>

    );
}