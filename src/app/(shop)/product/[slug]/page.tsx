export const revalidate = 604800;


import { getProductBySlug } from "@/actions";
import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { allFont } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";


interface Props {
    params: {
        slug: string;
    }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const slug = params.slug

    // fetch data
    const product = await getProductBySlug(slug)

    // optionally access and extend (rather than replace) parent metadata
    // const previousImages = (await parent).openGraph?.images || []

    return {
        title: product?.title ?? 'Product no encontrado',
        description: product?.description ?? '',
        openGraph: {
            title: product?.title ?? 'Product no encontrado',
            description: product?.description ?? '',

            images: [`/products/${product?.images[1]}.jpg`],
        },
    }
}


export default async function ProductSlugPage({ params }: Props) {

    const { slug } = params;
    const product = await getProductBySlug(slug);


    if (!product) {
        notFound();
    }


    return (
        <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3 ">
            {/* Slide Showw */}
            <div className=" col-span-1 md:col-span-2">

                {/* Mobile SlideShow */}
                <ProductMobileSlideshow
                    title={product.title}
                    images={product.images}
                    className="block md:hidden"
                />


                {/* Desktop SlideShow */}
                <ProductSlideshow
                    title={product.title}
                    images={product.images}
                    className="hidden md:block"
                />
            </div>

            {/* Detalles */}
            <div className=" col-span-1 px-5">
                <StockLabel slug={slug} />
                <h1 className={`${allFont.className} antialiased font-black text-xl`}>
                    {product.title}
                </h1>
                <p className=" text-lg mb-5 ">${product.price}</p>

                <AddToCart product={product} />

                {/* Descripcion */}
                <h3 className="font-bold text-sm "> Descripcion </h3>
                <p className=" font-light">{product.description}</p>

            </div>

        </div>
    );
}