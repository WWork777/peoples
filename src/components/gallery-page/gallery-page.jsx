"use client";
import { useEffect, useState } from "react";

export default function GalleryAll() {
  const slides = [
    "/images/gallery/galery1.webp",
    "/images/gallery/galery2.webp",
    "/images/gallery/galery3.webp",
    "/images/gallery/galery4.webp",
    "/images/gallery/galery5.webp",
    "/images/gallery/galery6.webp",
    "/images/gallery/galery7.webp",
    "/images/gallery/galery8.webp",
    "/images/gallery/galery9.webp",
    "/images/gallery/galery10.webp",
    "/images/gallery/galery11.webp",
    "/images/gallery/galery12.webp",
    "/images/gallery/galery13.webp",
    "/images/gallery/galery14.webp",
    "/images/gallery/galery15.webp",
    "/images/gallery/galery16.webp",
    "/images/gallery/galery17.webp",
    "/images/gallery/galery18.webp",
    "/images/gallery/galery19.webp",
    "/images/gallery/galery20.webp",
    "/images/gallery/galery21.webp",
    "/images/gallery/galery22.webp",
    "/images/gallery/galery23.webp",
    "/images/gallery/galery24.webp",
    "/images/gallery/galery25.webp",
    "/images/gallery/galery26.webp",
    "/images/gallery/galery27.webp",
    "/images/gallery/galery28.webp",
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const openModal = (index) => {
    setCurrentSlideIndex(index);
    setIsModalOpen(true);
    setIsLoading(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const nextSlide = () => {
    setIsLoading(true);
    setCurrentSlideIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setIsLoading(true);
    setCurrentSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleImageLoad = () => setIsLoading(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight" || e.key === " ") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
    document.body.style.touchAction = isModalOpen ? "none" : "auto";
  }, [isModalOpen]);

  return (
    <>
      <section className="gallery bg-background mt-10 px-3.75 py-10">
        <div className="container max-w-480 mx-auto">
          <div className="max-w-360 mx-auto">
            <h2 className="text-(--accent-color) text-[25px] sm:text-[32px] font-bold leading-10 uppercase md:pt-25 md:pb-5">
              Сделаем ваш отдых <br /> комфортным
            </h2>
            <h3 className="text-(--accent-color) text-[20px] font-medium pb-10 md:pb-25">
              Здесь вы можете посмотреть фотографии нашего <br /> гостевого
              комплекса
            </h3>
          </div>

          {/* Сетка миниатюр */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 place-items-center">
            {slides.map((slide, i) => (
              <div
                key={i}
                className="cursor-pointer hover:opacity-90 transition-opacity duration-300 hover:scale-[1.02] transform-gpu w-full"
                onClick={() => openModal(i)}
              >
                <div className="w-full h-64 lg:h-72 overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    src={slide}
                    alt={`Галерея изображение ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Закрыть */}
          <button
            className="absolute top-6 right-6 text-white text-5xl z-30 cursor-pointer hover:text-gray-300 transition-colors duration-200 bg-black/30 hover:bg-black/50 w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm"
            onClick={closeModal}
            aria-label="Закрыть"
          >
            ×
          </button>

          {/* Влево */}
          <button
            className="absolute left-6 top-1/2 transform cursor-pointer -translate-y-1/2 text-white z-30 hover:text-gray-300 transition-colors duration-200 bg-black/30 hover:bg-black/50 w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm"
            onClick={prevSlide}
            aria-label="Предыдущее изображение"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Вправо */}
          <button
            className="absolute right-6 top-1/2 cursor-pointer transform -translate-y-1/2 text-white z-30 hover:text-gray-300 transition-colors duration-200 bg-black/30 hover:bg-black/50 w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm"
            onClick={nextSlide}
            aria-label="Следующее изображение"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Изображение в модалке (contain) */}
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <div className="w-[80vw] h-[80vh] flex items-center justify-center">
              <img
                src={slides[currentSlideIndex]}
                alt={`Просмотр изображения ${currentSlideIndex + 1}`}
                className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
                  isLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={handleImageLoad}
                onError={handleImageLoad}
              />
            </div>
          </div>

          {/* Счетчик */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white bg-black/70 backdrop-blur-sm px-6 py-3 rounded-full text-lg font-medium min-w-32 text-center">
            {currentSlideIndex + 1} / {slides.length}
          </div>
        </div>
      )}
    </>
  );
}
