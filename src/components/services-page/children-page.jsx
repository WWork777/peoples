"use client";
import ServiceSlider from "../sliders/service-page-slider";
import { useRef } from "react";
import Link from "next/link";

export default function ChildrenPage() {
  const swiperRef = useRef(null);

  const images = [
    "/children/DSC_0055_2.jpg.webp",
    "/children/DSC_0086.jpg.webp",
    "/children/DSC_0147_2.jpg",
    "/children/DSC_0180_2.jpg",
    "/children/DSC_0396.jpg",
    "/children/DSC_0416_2.jpg",
    "/children/DSC_0417.jpg.webp",
    "/children/DSC_0430.jpg",
  ];

  return (
    <>
      <div className="bg-background mt-10 px-3.75">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 items-stretch pt-10 pb-16">
            {/* LEFT: big card */}
            <div className="w-full lg:flex-1 bg-white rounded-[32px] p-7 sm:p-10">
              <h2 className="text-[18px] sm:text-[20px] font-semibold text-black mb-6 tracking-wide">
                ПРОЖИВАНИЕ С ДЕТЬМИ
              </h2>

              <p className="text-[15px] sm:text-[16px] leading-7 sm:leading-8 text-black/80 break-words hyphens-auto max-w-[80ch]">
                Особенно трогательные моменты жизни всегда связаны с семьёй. Мы
                хотим, чтобы ваш семейный отдых был максимально комфортным и
                постарались обеспечить наших маленьких гостей и их родителей
                всем необходимым. По вашему запросу предоставим коляску,
                кроватку или манеж, стульчик для кормления, детские стол и стул.
                Не постесняйтесь обсудить с оператором бронирования
                дополнительные нужды или особые пожелания, ведь ваш спокойный,
                уютный и безопасный отдых – наш главный приоритет.
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
          <ServiceSlider swiperRef={swiperRef} images={images} />
        </div>
      </div>
    </>
  );
}
