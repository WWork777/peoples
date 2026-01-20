"use client";
import ServiceSlider from "../sliders/service-page-slider";
import { useRef } from "react";
import Link from "next/link";
export default function InstructorPage() {
  const swiperRef = useRef(null);

  const images = [
    "/instructor/vid_zensiny_katausei.jpg (1).webp",
    "/instructor/vid_zensiny_katausei.jpg.webp",
    "/instructor/zensina_v_kostume_sn.jpg (1).webp",
    "/instructor/zensina-stoasaa-i-de.jpg.webp",
  ];
  return (
    <>
      <div className="bg-background mt-10 px-3.75">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch pt-10 pb-10">
            {/* LEFT: big card */}
            <div className="w-full lg:flex-1 bg-white rounded-[32px] p-7 sm:p-10">
              <h2 className="text-[22px] sm:text-[26px] font-semibold text-black mb-7">
                ИНСТРУКТОР
              </h2>

              <div className="space-y-6 text-[16px] sm:text-[17px] leading-7 text-black/80">
                <p>
                  Мало кто, находясь на горнолыжном курорте, сможет удержаться
                  от того, чтобы не попробовать себя в деле. Белоснежный пухляк
                  и завораживающие виды зимней тайги никого не оставят
                  равнодушным.
                </p>

                <p>
                  Если этот опыт будет вашим первым, очень рекомендуем
                  воспользоваться услугами наших дружественных инструкторов. Это
                  профессионалы своего дела с многолетним опытом.
                </p>

                <p>
                  Они уверенно поставят вас на горные лыжи или сноуборд, дадут
                  ценные советы и наставления, сопроводят ваши первые спуски и
                  навсегда влюбят в Шерегеш, вот увидите!
                </p>
              </div>
            </div>

            {/* RIGHT: small card + button */}
            <div className="w-full lg:w-[360px] flex flex-col gap-4">
              <div className="bg-white rounded-[32px] p-7 sm:p-9 min-h-[160px] flex items-start">
                <p className="text-[16px] sm:text-[17px] leading-7 text-black/80">
                  Для подбора
                  <br />
                  инструктора обратитесь
                  <br />к Администратору
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
