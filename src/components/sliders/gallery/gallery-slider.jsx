"use client";

import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function GallerySlider({ swiperRef }) {
  const slides = [
    // "/images/gallery/galery1.webp",
    // "/images/gallery/galery2.webp",
    "/images/gallery/galery3.webp",
    "/images/gallery/galery4.webp",
    "/images/gallery/galery5.webp",
    // "/images/gallery/galery6.webp",
    "/images/gallery/galery7.webp",
    // "/images/gallery/galery8.webp",
    "/images/gallery/galery9.webp",
    "/images/gallery/galery10.webp",
    "/images/gallery/galery11.webp",
    // "/images/gallery/galery12.webp",
    "/images/gallery/galery13.webp",
    "/images/gallery/galery14.webp",
    // "/images/gallery/galery15.webp",
    // "/images/gallery/galery16.webp",
    // "/images/gallery/galery17.webp",
    "/images/gallery/galery18.webp",
    "/images/gallery/galery19.webp",
    "/images/gallery/galery20.webp",
    "/images/gallery/galery21.webp",
    // "/images/gallery/galery22.webp",
    // "/images/gallery/galery23.webp",
    // "/images/gallery/galery24.webp",
    // "/images/gallery/galery25.webp",
    // "/images/gallery/galery26.webp",
    "/images/gallery/galery27.webp",
    // "/images/gallery/galery28.webp",
    "/images/gallery/4.webp",
    "/images/gallery/5.webp",
    "/images/gallery/6.webp",
    "/images/gallery/7.webp",
    "/images/gallery/8.webp",
    "/images/gallery/9.webp",
    "/images/gallery/10.webp",
    "/images/gallery/11.webp",
    "/images/gallery/12.webp",
    "/images/gallery/13.webp",
  ];

  return (
    <div className="relative w-full">
      <Swiper
        ref={swiperRef}
        loop={true}
        grabCursor={true}
        centeredSlides={false}
        pagination={false}
        navigation={false}
        speed={1000}
        modules={[Navigation, Pagination, Autoplay]}
        className="overflow-visible"
        breakpoints={{
          320: { slidesPerView: 1.3, spaceBetween: 15 },
          640: { slidesPerView: 1.5, spaceBetween: 20 },
          768: { slidesPerView: 1.5, spaceBetween: 25 },
          1024: { slidesPerView: 1.5, spaceBetween: 15 },
          1280: { slidesPerView: 1.5, spaceBetween: 20 },
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex items-center justify-center pt-2 md:pt-1">
              <div className="w-full h-[250px] md:h-[300px] lg:h-[600px] relative overflow-hidden rounded-3xl">
                <img
                  src={slide}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
