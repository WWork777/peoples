"use client";
import ServiceSlider from "../sliders/service-page-slider";
import { useRef } from "react";
import Link from "next/link";

export default function RentalPage() {
  const swiperRef = useRef(null);
  const items = [
    "Новое горнолыжное снаряжение. Качественные доски и лыжи!",
    "Экипировка. Всё сделают быстро, без пробок и очередей.",
    "Снаряжение и одежда под любой возраст!",
    "Большой выбор защиты (маски, шлемы, перчатки).",
    "Приятные и доступные цены.",
    "А так же, скидка для гостей нашего комплекса!",
  ];

  const images = [
    "/rental/IMG_2850.jpg.webp",
    "/rental/zensina_v_kostume_sn.jpg.webp",
    "/rental/photo.jpg.webp",
  ];

  return (
    <>
      <div className="bg-background mt-10 px-3.75">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 items-stretch pt-10 pb-16">
            {/* LEFT: big card */}
            <div className="w-full lg:flex-1 bg-white rounded-[32px] p-7 sm:p-10">
              <h2 className="text-[18px] sm:text-[20px] font-semibold text-black mb-6 tracking-wide">
                ПРОКАТ ОБОРУДОВАНИЯ
              </h2>

              <div className="text-[15px] sm:text-[16px] leading-7 sm:leading-8 text-black/80 break-words hyphens-auto space-y-6 max-w-[90ch]">
                <p>
                  Для вашего удобства прямо на территории комплекса расположен
                  Прокат горнолыжного инвентаря. Это особенно удобно для гостей
                  издалека, которых мы можем снабдить всем необходимым прямо на
                  месте, без необходимости везти с собой большой багаж. Приятный
                  бонус – скидка в прокате для гостей нашего комплекса!
                </p>

                <ul className="space-y-2 pt-2">
                  {items.map((t, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="text-[#5AA8FF] leading-7 select-none">
                        ❄️
                      </span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT: small card + button */}
            <div className="w-full lg:w-[360px] flex flex-col gap-4 lg:gap-5">
              <div className="bg-white rounded-[32px] p-7 sm:p-9">
                <p className="text-[15px] sm:text-[16px] leading-7 sm:leading-8 text-black/80 break-words hyphens-auto">
                  Подробнее вы всегда можете узнать у оператора бронирования.
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
