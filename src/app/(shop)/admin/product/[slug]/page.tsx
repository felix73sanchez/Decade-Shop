
import { getCategories, getProductBySlug } from '@/actions';
import { Title } from '@/components';
import { redirect } from 'next/navigation';
import { ProductForm } from './ui/ProductForm';

interface Props {
    params: {
        slug: string;
    }
}



export default async function ProductPage({ params }: Props) {

    const { slug } = params;

    const [product, categories] = await Promise.all([
        getProductBySlug(slug),
        getCategories()
    ]);


    // Todo: new
    if (!product && slug !== 'new') {
        redirect('/admin/products')
    }

    const title = (slug === 'new') ? 'Nuevo producto' : 'Editar producto'

    return (
        <>
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow mt-20 m-mBody">
                <div className="bg-colorSecondary border-colorPrimary text-colorPrimary rounded-brAll shadow-custom-2 border-customBW overflow-hidden ">
                    <div className="m-5">
                        <Title title={title} />

                        <ProductForm product={product ?? {}} categories={categories} />
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
