"use client";
import ServiceSlider from "../sliders/service-page-slider";
import { useRef } from "react";
import Link from "next/link";

export default function DeliveryPage() {
  const swiperRef = useRef(null);
  const images = [
    "/delivery/para-est-romanticesk.jpg.webp",
    "/delivery/photo_2025-10-08_07-.jpg.webp",
    "/delivery/zakroite-ruki-derza-.jpg.webp",
  ];
  return (
    <>
      <div className="bg-background mt-10 px-3.75">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 items-stretch pt-10 pb-16">
            {/* LEFT: big card */}
            <div className="w-full lg:flex-1 bg-white rounded-[32px] p-7 sm:p-10">
              <h2 className="text-[18px] sm:text-[20px] font-semibold text-black mb-6 tracking-wide">
                ДОСТАВКА ЕДЫ
              </h2>

              <p className="text-[15px] sm:text-[16px] leading-7 sm:leading-8 text-black/80 break-words hyphens-auto max-w-[80ch]">
                Подарите себе больше времени на отдых, избавившись от
                необходимости готовить или искать точки питания на курорте. Мы
                сделаем всё за вас. Оставьте заявку на завтрак или ужин за сутки
                (до 12:00 предыдущего дня), и мы доставим вам свежую горячую
                пищу, приготовленную с большой любовью. Наши завтраки – это
                отельная классика, приготовленная по-домашнему: омлеты, каши,
                блинчики и другие любимые блюда. Ужины ничем не отличаются от
                ресторанных – салаты, мясные блюда, гарниры и другие блюда
                согласно меню.
              </p>
            </div>

            {/* RIGHT: small card + button */}
            <div className="w-full lg:w-[360px] flex flex-col gap-4 lg:gap-5">
              <div className="bg-white rounded-[32px] p-7 sm:p-9">
                <p className="text-[15px] sm:text-[16px] leading-7 sm:leading-8 text-black/80 break-words hyphens-auto">
                  Подробнее о вариантах питания вы всегда можете узнать у
                  администратора.
                </p>
              </div>

              <Link
                className="bg-[#0E4B3B] hover:bg-[#0C4032] transition-colors text-white font-semibold rounded-full py-4 w-full text-center"
                href="/service-order"
              >
                ЗАКАЗАТЬ
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mb-16 bg-white sm:p-20 pb-10 pt-10 px-3.75">
        <div className="container max-w-7xl mx-auto">
          <ServiceSlider
            swiperRef={swiperRef}
            images={images}
            slidesPerView={2.2}
            spaceBetween={24}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 14 },
              480: { slidesPerView: 1, spaceBetween: 16 },
              768: { slidesPerView: 1.3, spaceBetween: 22 },
              1280: { slidesPerView: 1.6, spaceBetween: 24 },
            }}
          />
        </div>
      </div>
    </>
  );
}
