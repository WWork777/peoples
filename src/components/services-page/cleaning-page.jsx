"use client";
import ServiceSlider from "../sliders/service-page-slider";
import { useRef } from "react";
import Link from "next/link";

export default function CleaningPage() {
  const swiperRef = useRef(null);

  const images = [
    "/cleaning/0E6A3051.jpg.webp",
    "/cleaning/0E6A3072.jpg",
    "/cleaning/0E6A3080.jpg.webp",
    "/cleaning/0E6A3101.jpg.webp",
  ];
  return (
    <>
      <div className="bg-background mt-10 px-3.75">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 items-stretch pt-10 pb-16">
            {/* LEFT: big card */}
            <div className="w-full lg:flex-1 bg-white rounded-[32px] p-7 sm:p-10">
              <h2 className="text-[18px] sm:text-[20px] font-semibold text-black mb-6 tracking-wide">
                УБОРКА ДОМА
              </h2>

              <p className="text-[15px] sm:text-[16px] leading-7 sm:leading-8 text-black/80 break-words hyphens-auto max-w-[80ch]">
                Меньше всего на отдыхе хочется тратить время и силы на уборку.
                Поэтому мы позаботились и об этом тоже. Каждые 4ые сутки наши
                горничные без дополнительной оплаты осуществят влажную уборку
                номера и санузла, заменят полотенца и вернут помещению
                первозданную чистоту. Постельное бельё безоплатно меняется раз в
                7 дней. Если что-то пошло не так, и возникла необходимость
                навести порядок в номере срочно, это тоже возможно в
                соответствии с прайсом.
              </p>
            </div>

            {/* RIGHT: small card + button */}
            <div className="w-full lg:w-[360px] flex flex-col gap-4 lg:gap-5">
              <div className="bg-white rounded-[32px] p-7 sm:p-9">
                <p className="text-[15px] sm:text-[16px] leading-7 sm:leading-8 text-black/80 break-words hyphens-auto">
                  Полная уборка дома – 3000 р.
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
