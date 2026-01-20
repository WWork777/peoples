"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ServiceSlider({
  images = [],
  swiperRef: externalSwiperRef,
  showArrows = true,
  className = "",
  heightClassName = "h-[340px] sm:h-[420px] md:h-[500px]",

  // ✅ новые пропсы
  slidesPerView = 1.2,
  spaceBetween = 24,
  breakpoints,
}) {
  const innerRef = useRef(null);
  const swiperRef = externalSwiperRef ?? innerRef;

  const safeImages = useMemo(
    () => (Array.isArray(images) ? images.filter(Boolean) : []),
    [images],
  );

  const [dims, setDims] = useState({});

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const entries = await Promise.all(
        safeImages.map(
          (src) =>
            new Promise((resolve) => {
              const img = new Image();
              img.onload = () =>
                resolve([src, { w: img.naturalWidth, h: img.naturalHeight }]);
              img.onerror = () => resolve([src, null]);
              img.src = src;
            }),
        ),
      );

      if (cancelled) return;

      const next = {};
      for (const [src, wh] of entries) if (wh) next[src] = wh;
      setDims(next);
    };

    if (safeImages.length) load();
    return () => {
      cancelled = true;
    };
  }, [safeImages]);

  if (!safeImages.length) return null;

  const prev = () => swiperRef?.current?.swiper?.slidePrev();
  const next = () => swiperRef?.current?.swiper?.slideNext();

  const isPortrait = (src) => {
    const d = dims[src];
    if (!d) return false;
    return d.w / d.h < 0.9;
  };

  const defaultBreakpoints = {
    0: { slidesPerView: 1, spaceBetween: 14 },
    480: { slidesPerView: 1, spaceBetween: 16 },
    768: { slidesPerView, spaceBetween: Math.max(18, spaceBetween - 2) },
    1280: { slidesPerView: Math.max(slidesPerView, 1.25), spaceBetween },
  };

  return (
    <div className={`relative ${className}`}>
      {/* Десктоп: стрелки сверху справа */}
      {showArrows && (
        <div className="hidden sm:flex items-center gap-2 justify-end pb-4 sm:pb-6">
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-[#0E4B3B] text-white flex items-center justify-center hover:bg-[#0B4B3B] transition"
            onClick={prev}
            aria-label="prev"
          >
            <GoChevronLeft size={22} />
          </button>
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-[#0E4B3B] text-white flex items-center justify-center hover:bg-[#0B4B3B] transition"
            onClick={next}
            aria-label="next"
          >
            <GoChevronRight size={22} />
          </button>
        </div>
      )}

      <div className="relative">
        <Swiper
          ref={swiperRef}
          speed={900}
          grabCursor
          centeredSlides={false}
          loop={safeImages.length > 1}
          slidesPerView={slidesPerView}
          spaceBetween={spaceBetween}
          className="overflow-visible"
          breakpoints={breakpoints ?? defaultBreakpoints}
        >
          {safeImages.map((src, index) => {
            const portrait = isPortrait(src);

            return (
              <SwiperSlide key={`${src}-${index}`} className="!h-auto">
                <div
                  className={[
                    "relative w-full overflow-hidden rounded-3xl shadow-sm hover:shadow-md transition-shadow",
                    heightClassName,
                    "bg-black/5",
                  ].join(" ")}
                >
                  {portrait && (
                    <img
                      src={src}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-70"
                    />
                  )}

                  <div className="relative z-[1] w-full h-full flex items-center justify-center">
                    <img
                      src={src}
                      alt="img"
                      loading="lazy"
                      className={[
                        "w-full h-full",
                        portrait ? "object-contain p-4 sm:p-6" : "object-cover",
                      ].join(" ")}
                    />
                  </div>

                  {portrait && <div className="absolute inset-0 bg-black/10" />}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Мобилка: стрелки поверх */}
        {showArrows && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="prev"
              className="sm:hidden absolute left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-[#0E4B3B] text-white flex items-center justify-center hover:opacity-90 transition"
            >
              <GoChevronLeft size={22} />
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="next"
              className="sm:hidden absolute right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-[#0E4B3B] text-white flex items-center justify-center hover:opacity-90 transition"
            >
              <GoChevronRight size={22} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
