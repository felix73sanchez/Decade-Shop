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

// Función para verificar si una imagen existe localmente
const checkLocalImage = async (image: string): Promise<boolean> => {
    const localUrl = `/products/${image}`;
    try {
        const response = await fetch(localUrl, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        return false;
    }
};

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const slug = params.slug;
    const product = await getProductBySlug(slug);

    if (!product) {
        return {
            title: "Producto no encontrado",
            description: "",
            openGraph: {
                title: "Producto no encontrado",
                description: "",
                images: [],
            },
        };
    }

    const imageUrls = await Promise.all(
        product.images.map(async (image) => {
            const existsLocally = await checkLocalImage(image);
            return existsLocally ? `/products/${image}` : image; // URL de Cloudinary
        })
    );

    return {
        title: product.title ?? "Producto no encontrado",
        description: product.description ?? "",
        openGraph: {
            title: product.title ?? "Producto no encontrado",
            description: product.description ?? "",
            images: imageUrls.map((url) => ({
                url,
                width: 852, // Puedes ajustar esto según tus necesidades
                height: 852, // Puedes ajustar esto según tus necesidades
                alt: product.title,
            })),
        },
    };
}

export default async function ProductSlugPage({ params }: Props) {
    const { slug } = params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3 ">
            {/* Slide Show */}
            <div className="col-span-1 md:col-span-2">
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
            <div className="col-span-1 px-5">
                <StockLabel slug={slug} />
                <h1 className={`${allFont.className} antialiased font-black text-xl`}>
                    {product.title}
                </h1>
                <p className="text-lg mb-5">${product.price}</p>
                <AddToCart product={product} />
                {/* Descripcion */}
                <h3 className="font-bold text-sm">Descripcion</h3>
                <p className="font-light">{product.description}</p>
            </div>
        </div>
    );
}
