import { ProductGrid, Title } from '@/components';
import { Category } from '@/interfaces';
import { initialData } from '@/seed/seed';
import { notFound } from 'next/navigation'

interface Props {
    params: {
        id: Category;
    }
}

const seedProducts = initialData.products;

export default function ({ params }: Props) {

    const { id } = params;
    const products = seedProducts.filter(product => product.gender === id);

    const labels: Record<Category, string> = {
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
                title={`Articulos ${labels[id]}`}
                subtitle={`Seccion de  ${id}'s de la tienda`}
                className="mb-2 text-7xl"
            />
            <ProductGrid
                products={products}
            />

        </>

    );
}