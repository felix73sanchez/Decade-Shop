'use server';

import prisma from '@/lib/prisma';
import { Gender, Product, Size } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');


const productSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    title: z.string().min(3).max(255),
    slug: z.string().min(3).max(255),
    description: z.string(),
    price: z.coerce
        .number()
        .min(0)
        .transform(val => Number(val.toFixed(2))),
    inStock: z.coerce
        .number()
        .min(0)
        .transform(val => Number(val.toFixed(0))),
    categoryId: z.string().uuid(),
    sizes: z.coerce.string().transform(val => val.split(',')),
    tags: z.string(),
    gender: z.nativeEnum(Gender),
});

export const createUpdateProduct = async (formData: FormData) => {
    const data = Object.fromEntries(formData);
    const productParsed = productSchema.safeParse(data);

    if (!productParsed.success) {

        console.log(productParsed.error);
        return { ok: false };
    }

    const product = productParsed.data;
    product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim();

    const { id, ...rest } = product;

    try {
        const prismaTx = await prisma.$transaction(async (tx) => {

            let product: Product;
            const tagsArray = rest.tags.split(',').map(tag => tag.trim().toLowerCase());



            if (id) {
                //actualizar
                product = await tx.product.update({
                    where: { id },
                    data: {
                        ...rest,
                        sizes: { set: rest.sizes as Size[] },
                        tags: { set: tagsArray }

                    }
                });


            } else {
                //crear
                product = await prisma.product.create({
                    data: {
                        ...rest,
                        sizes: { set: rest.sizes as Size[] },
                        tags: { set: tagsArray }
                    }

                });
            }


            // Proceso de carga y guardado de imágenes
            //Recorrer las imagenes y guardarlas en el servidor.
            if (formData.getAll('images')) {
                const images = await uploadImages(formData.getAll('images') as File[]);

                if (!images) {
                    throw new Error('Error al subir las imágenes, RollingBack');
                }

                //Guardar las imágenes en la base de datos
                await prisma.productImage.createMany({
                    data: images.map(image => ({
                        url: image!,
                        altText: '', // Add the altText property here
                        productId: product.id,
                    }))
                });
            }


            return {

                product
            }
        });

        //TODO: revalidate paths
        revalidatePath('/admin/products');
        revalidatePath(`/admin/product/${product.slug}`);
        revalidatePath(`/products/${product.slug}`);

        return {
            ok: true,
            product: prismaTx.product,
        };

    } catch (error) {
        return {
            ok: false,
            message: 'Revisar los logs, no se pudo guardar/actualizar el producto'
        };
    }

}

const uploadImages = async (images: File[]) => {

    try {
        const uploadPromises = images.map(async (image) => {

            try {
                const buffer = await image.arrayBuffer();
                const base64Image = Buffer.from(buffer).toString('base64');

                return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`)
                    .then(r => r.secure_url);

            } catch (error) {
                console.log(error);
                return null;
            }
        });

        const uploadedImages = await Promise.all(uploadPromises);

        return uploadedImages;


    } catch (error) {
        console.log(error);
        return null;

    }

};