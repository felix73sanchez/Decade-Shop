'use client';

import React, { useState } from "react";
import Image from 'next/image';
import { Swiper as SwiperObject } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { ProductImage } from "@/components";
import './slideshow.css';

interface Props {
    images: string[];
    title: string;
    className?: string;
}

export const ProductSlideshow = ({ images, title, className }: Props) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();
    const [zoom, setZoom] = useState<{ display: string; backgroundPosition: string; position: { top: string; left: string } }>({
        display: 'none',
        backgroundPosition: 'center',
        position: { top: '0', left: '0' },
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.currentTarget;
        const { left, top, width, height } = target.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        // Calcular la posición del fondo para el efecto de zoom
        const backgroundPositionX = ((x / width) * 100).toFixed(2);
        const backgroundPositionY = ((y / height) * 100).toFixed(2);

        setZoom({
            display: 'block',
            backgroundPosition: `${backgroundPositionX}% ${backgroundPositionY}%`,
            position: {
                top: `${y}px`,
                left: `${x}px`,
            },
        });
    };

    const handleMouseLeave = () => {
        setZoom({
            display: 'none',
            backgroundPosition: 'center',
            position: { top: '0', left: '0' },
        });
    };

    return (
        <div className={`slideshow-container ${className}`}>
            {/* Primer Swiper */}
            <div className="swiper-container zoom-container">
                <Swiper
                    spaceBetween={10}
                    navigation={false}
                    thumbs={{
                        swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
                    }}
                    modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                    className="h-full w-full rounded-brAll"
                >
                    {images.map(image => {
                        const imageUrl = image.startsWith('http') || image.startsWith('/') ? image : `/products/${image}`;
                        return (
                            <SwiperSlide key={imageUrl}>
                                <div
                                    className="zoom-image-container"
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                    style={{ position: 'relative', width: '100%', height: '100%' }}
                                >
                                    <Image
                                        width={1080}
                                        height={1080}
                                        src={imageUrl}
                                        alt={title}
                                        objectFit="contain"
                                        className="object-fill bg-colorSecondary border-colorPrimary text-colorPrimary rounded-brAll shadow-custom-2 border-customBW"
                                    />
                                    <div
                                        className="zoom-result"
                                        style={{
                                            display: zoom.display,
                                            backgroundImage: `url(${imageUrl})`,
                                            backgroundPosition: zoom.backgroundPosition,
                                            top: zoom.position.top,
                                            left: zoom.position.left,
                                        }}
                                    />
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>

            {/* Segundo Swiper */}
            <div className="swiper-thumbnail rounded-brAll ">
                
                <Swiper
                    onSwiper={setThumbsSwiper}
                    direction="vertical"
                    spaceBetween={10}
                    slidesPerView={Math.min(images.length, 3)}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper h-full rounded-brAll "
                >
                    {images.map(image => (
                        <SwiperSlide key={image}>
                            <ProductImage
                                width={300}
                                height={300}
                                src={image}
                                alt={title}
                                className="object-fill bg-colorSecondary border-colorPrimary text-colorPrimary rounded-brAll shadow-custom-2 border-customBW"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};
