"use client";
import ServiceSlider from "../sliders/service-page-slider";
import { useRef } from "react";
import Link from "next/link";

export default function CoffeePage() {
  const swiperRef = useRef(null);

  const images = [
    "/coffee/photo_2025-10-08_07-.jpg (1).webp",
    "/coffee/photo_2025-10-08_07-.jpg (2).webp",
    "/coffee/photo_2025-10-08_07-.jpg (3).webp",
    "/coffee/photo_2025-10-08_07-.jpg.webp",
  ];

  return (
    <>
      <div className="bg-background mt-10 px-3.75">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 items-stretch pt-10 pb-16">
            {/* LEFT: big card */}
            <div className="w-full lg:flex-1 bg-white rounded-[32px] p-7 sm:p-10">
              <h2 className="text-[18px] sm:text-[20px] font-semibold text-black mb-6 tracking-wide">
                КОФЕЙНЯ
              </h2>

              <p className="text-[15px] sm:text-[16px] leading-7 sm:leading-8 text-black/80 break-words hyphens-auto max-w-[80ch]">
                Лучше гор может быть только кофе с видом на горы! <br />
                Не забудьте заглянуть в нашу уютную кофейню, где бариста будет
                рад предложить вам кофейную классику, сезонные и авторские
                напитки из актуального меню. Вдыхать бодрящий аромат кофе,
                находясь в месте силы, где время замедляется, а душа наполняется
                покоем, чувствовать единение с природой – это ли не счастье!
              </p>
            </div>

            {/* RIGHT: small card + button */}
            <div className="w-full lg:w-[360px] flex flex-col gap-4 lg:gap-5">
              <div className="bg-white rounded-[32px] p-7 sm:p-9">
                <p className="text-[15px] sm:text-[16px] leading-7 sm:leading-8 text-black/80 break-words hyphens-auto">
                  Подробнее о вариантах питания вы всегда можете узнать у
                  оператора бронирования.
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
              768: { slidesPerView: 2, spaceBetween: 22 },
              1280: { slidesPerView: 3, spaceBetween: 24 },
            }}
          />
        </div>
      </div>
    </>
  );
}
