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

    return (
        <div className={`slideshow-container  ${className}`}>
            {/* Primer Swiper */}
            <div className="swiper-container">
                <Swiper
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{
                        swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
                    }}
                    modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                    className="h-full w-full "
                >
                    {images.map(image => (
                        <SwiperSlide key={image}>
                            <ProductImage
                                width={1080}
                                height={1080}
                                src={image}
                                alt={title}
                                className="rounded-lg object-fill"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Segundo Swiper */}
            <div className="swiper-thumbnail ">
                <Swiper
                    onSwiper={setThumbsSwiper}
                    direction="vertical"
                    spaceBetween={10}
                    slidesPerView={Math.min(images.length, 3)}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper h-full"
                >
                    {images.map(image => (
                        <SwiperSlide key={image}>
                            <ProductImage
                                width={300}
                                height={300}
                                src={image}
                                alt={title}
                                className="object-fill rounded-brAll shadow-customBS border-customBC border-customBW"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};
