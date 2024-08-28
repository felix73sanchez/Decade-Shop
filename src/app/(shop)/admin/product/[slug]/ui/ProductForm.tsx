"use client";

import { useState, useRef } from 'react';
import { useForm } from "react-hook-form";
import { Category, Product, ProductImage as PorductWithImage } from "@/interfaces";
import Image from "next/image";
import clsx from "clsx";
import { createUpdateProduct, deleteProductImage } from "@/actions";
import { useRouter } from "next/navigation";
import { ProductImage } from "@/components";
import { PiXBold } from "react-icons/pi";

interface Props {
    product: Partial<Product> & { ProductImage?: PorductWithImage[] };
    categories: Category[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormImputs {
    title: string;
    slug: string;
    description: string;
    price: number;
    inStock: number;
    sizes: string[];
    tags: string; 
    gender: string;
    categoryId: string;
    images?: FileList;
}

export const ProductForm = ({ product, categories }: Props) => {
    const router = useRouter();
    const [selectedImages, setSelectedImages] = useState<{ id: string, file: File, url: string }[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null); 

    const {
        register,
        handleSubmit,
        formState: { isValid },
        getValues,
        setValue,
        watch,
    } = useForm<FormImputs>({
        defaultValues: {
            ...product,
            tags: product.tags?.join(', '),
            sizes: product.sizes ?? [],
            images: undefined,
        }
    });

    watch('sizes');

    const onSizeChanged = (size: string) => {
        const sizes = new Set(getValues('sizes'));
        sizes.has(size) ? sizes.delete(size) : sizes.add(size);
        setValue('sizes', Array.from(sizes));
    };

    const generateUniqueId = () => {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    };

    const onImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            if (files.length + selectedImages.length > 5) {
                alert('Puedes seleccionar hasta 5 imágenes como máximo.');
                event.target.value = ""; // Limpiar el input
                return;
            }
    
            const newImages = Array.from(files).map(file => ({
                id: generateUniqueId(),
                file: file,
                url: URL.createObjectURL(file),
            }));
    
            setSelectedImages(prevImages => [...prevImages, ...newImages]);
            event.target.value = ""; // Limpiar el input
        }
    };
    

    const onRemoveImage = (id: string) => {
        const updatedImages = selectedImages.filter(image => image.id !== id);
        setSelectedImages(updatedImages);

        // Crear un nuevo FileList con los archivos restantes
        const dataTransfer = new DataTransfer();
        updatedImages.forEach(image => dataTransfer.items.add(image.file));
        if (fileInputRef.current) {
            fileInputRef.current.files = dataTransfer.files;
        }
    };

    const onSubmit = async (data: FormImputs) => {
        const formData = new FormData();
        const { images, ...productToSave } = data;

        if (product.id) {
            formData.append('id', product.id ?? '');
        }
        formData.append('title', productToSave.title);
        formData.append('slug', productToSave.slug);
        formData.append('description', productToSave.description);
        formData.append('price', productToSave.price.toString());
        formData.append('inStock', productToSave.inStock.toString());
        formData.append('sizes', productToSave.sizes.toString());
        formData.append('tags', productToSave.tags);
        formData.append('categoryId', productToSave.categoryId);
        formData.append('gender', productToSave.gender);

        // Incluir las imágenes seleccionadas en el FormData
        selectedImages.forEach(image => formData.append('images', image.file));

        const { ok, product: updatedProduct } = await createUpdateProduct(formData);

        if (!ok) {
            alert('Error al guardar el producto');
            return;
        }

        router.replace(`/admin/product/${updatedProduct?.slug}`);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid px-5 py-6  grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3 border-t-customBW border-colorPrimary font-fw7">
            <div className="w-full">
                {/* Inputs de texto aquí */}
                <div className="flex flex-col mb-2">
                    <span className='ml-3 mb-1'>Título</span>
                    <input type="text" className="p-2 font-fw5 border-colorPrimary border-customBW rounded-brAll bg-colorGray" {...register('title', { required: true })} />
                </div>

                <div className="flex flex-col mb-2">
                    <span className='ml-3 mb-1'>Slug</span>
                    <input type="text" className="p-2 font-fw5 border-colorPrimary border-customBW rounded-brAll bg-colorGray" {...register('slug', { required: true })} />
                </div>

                <div className="flex flex-col mb-2">
                    <span className='ml-3 mb-1'>Descripción</span>
                    <textarea
                        rows={5}
                        className="p-2 font-fw5 border-colorPrimary border-customBW rounded-brAll bg-colorGray"
                        {...register('description', { required: true })}
                    ></textarea>
                </div>

                <div className="flex flex-col mb-2">
                    <span className='ml-3 mb-1'>Price</span>
                    <input type="number" className="p-2 font-fw5 border-colorPrimary border-customBW rounded-brAll bg-colorGray" {...register('price', { required: true, min: 0 })} />
                </div>

                <div className="flex flex-col mb-2">
                    <span className='ml-3 mb-1'>Tags</span>
                    <input type="text" className="p-2 font-fw5 border-colorPrimary border-customBW rounded-brAll bg-colorGray" {...register('tags', { required: true })} />
                </div>

                <div className="flex flex-col mb-2">
                    <span className='ml-3 mb-1'>Gender</span>
                    <select className="p-2 font-fw5 border-colorPrimary border-customBW rounded-brAll bg-colorGray" {...register('gender', { required: true })}>
                        <option value="">[Seleccione]</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kid">Kid</option>
                        <option value="unisex">Unisex</option>
                    </select>
                </div>

                <div className="flex flex-col mb-2">
                    <span className='ml-3 mb-1'>Categoria</span>
                    <select className="p-2 font-fw5 border-colorPrimary border-customBW rounded-brAll bg-colorGray" {...register('categoryId', { required: true })}>
                        <option value="">[Seleccione]</option>
                        {
                            categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))
                        }
                        <option value=""></option>
                    </select>
                </div>
            </div>
            <div className="w-full">
                {/* Selector de tallas y fotos */}
                <div className="flex flex-col mb-2">
                    <span className='ml-3 mb-1'>Inventario</span>
                    <input
                        type="number"
                        className="p-2 font-fw5 border-colorPrimary border-customBW rounded-brAll bg-colorGray"
                        {...register("inStock", { required: true, min: 0 })}
                    />
                </div>
                {/* As checkboxes */}
                <div className="flex flex-col">
                    <span className='ml-3 mb-1'>Tallas</span>
                    <div className="grid grid-cols-3 justify-between">
                        {sizes.map(size => {
                            const isActive = getValues('sizes').includes(size);

                            return (
                                <div 
                                    key={size}
                                    onClick={() => onSizeChanged(size)}
                                    className={clsx(
                                        "p-2 border-colorPrimary border-customBW rounded-brAll mr-2 mb-2 transition-all text-center cursor-pointer",
                                        {
                                            "bg-colorPrimary text-white": isActive
                                        }
                                    )}
                                >
                                    <input
                                        type="number"
                                        placeholder={`Cantidad ${size}`}
                                        className={clsx(
                                            "mb-2 py-2 px-3 w-full border-colorPrimary border-customBW rounded-brAll transition-opacity bg-colorGray",
                                            {
                                                "text-colorPrimary opacity-100": isActive,
                                                "text-gray-400 opacity-50": !isActive,
                                            }
                                        )}
                                        disabled={!isActive}
                                        onClick={(e) => e.stopPropagation()}
                                        onKeyDown={(e) => {
                                            if (
                                                e.key !== "Backspace" &&
                                                e.key !== "Tab" &&
                                                e.key !== "Enter" &&
                                                (e.key < "0" || e.key > "9")
                                            ) {
                                                e.preventDefault();
                                            }
                                        }}
                                        style={{
                                            WebkitAppearance: 'none',
                                            MozAppearance: 'textfield'
                                        }}
                                    />
                                    <span>{size}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="flex flex-col mb-2">
                    <span className='ml-3 mb-1'>Fotos</span>
                    <input
                        type="file"
                        multiple
                        onChange={onImagesChange}
                        className="p-2 font-fw5 border-colorPrimary border-customBW rounded-brAll bg-colorGray"
                        accept="image/png, image/jpeg, image/jpg, image/avif"
                        ref={fileInputRef} 
                    />
                </div>
                <div className="grid grid-cols-5 gap-3 mt-4 h-40 mb-5 px-3 border-colorPrimary border-customBW rounded-brAll bg-colorGray">
                    {selectedImages.map((image) => (
                        <div key={image.id} className="relative h-full overflow-hidden py-3">
                            <Image
                                src={image.url}
                                alt={`Selected image`}
                                width={200}
                                height={200}
                                className="object-cover rounded-brAll shadow-md h-full w-full"
                            />
                            <button
                                type="button"
                                onClick={() => onRemoveImage(image.id)}
                                className="absolute top-4 right-1 bg-red-500 text-white p-0.5 rounded-full shadow-md"
                            >
                            <PiXBold
                            size={18}
                            className=""
                            />
                            </button>
                        </div>
                    ))}
                </div>

                <button className="btn-primary w-full">
                    Guardar
                </button>
            </div>
        </form>
    );
};