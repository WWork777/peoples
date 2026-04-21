"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import HeroContactForm from "./hero-contact-form";
import { CDN_URL } from "@/utils/constants";

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Вспомогательная функция для отправки целей в Яндекс.Метрику
  const sendYandexGoal = (goalName) => {
    if (typeof window !== "undefined" && window.ym) {
      window.ym(106106917, "reachGoal", goalName);
    }
  };

  const scrollToId = (id) => {
    closeMenu();

    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // ждём закрытие меню
  };

  const menuLinks = [
    {
      title: "ДОМА И ЦЕНЫ",
      src: "/#widget",
    },
    {
      title: "ГАЛЕРЕЯ",
      src: "/gallery",
    },
    {
      title: "УСЛУГИ",
      src: "/#additional",
    },
    {
      title: "ОТЗЫВЫ",
      src: "/#reviews",
    },
    {
      title: "КОНТАКТЫ",
      src: "/#contacts",
    },
  ];

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsClosing(false);
      }, 300);
    } else {
      setIsMenuOpen(true);
    }
  };

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
    }, 300);
  };

  // Закрытие меню при нажатии Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isMenuOpen) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  // Блокировка скролла при открытом меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Фиксированный header при скролле (если раскомментируете, пути уже на CDN) */}
      {/* <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isHeaderVisible
            ? "translate-y-0 opacity-100 bg-black/30 backdrop-blur-sm shadow-md"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="container max-w-7xl mx-auto px-3.75 py-4">
          <div className="flex justify-between items-center">
            <Link className="flex items-center gap-5" href={"/"}>
              <img src={`${CDN_URL}/images/logo/logo.webp`} alt="logotype" />
              <span>
                <img src={`${CDN_URL}/images/logo/text.webp`} alt="logo-text" />
              </span>
            </Link>
            <div className="hidden md:block">
              пгт. Шерегеш, Звездная улица, 8
            </div>
            <button
              onClick={toggleMenu}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              {isMenuOpen ? <RxCross2 size={30} /> : <RxHamburgerMenu size={30} />}
            </button>
          </div>
        </div>
      </header> */}

      <section className="hero min-h-[120vh] sm:min-h-[120vh] md:min-h-[120vh] lg:min-h-screen w-full relative overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          preload="auto"
        >
          <source
            src={`${CDN_URL}/images/main/compressed_letoMain.mp4`}
            type="video/mp4"
          />
          Ваш браузер не поддерживает видео.
        </video>
        <div className="absolute inset-0 w-full bg-black/50 z-10">
          <div className="container max-w-7xl mx-auto min-h-[120vh] sm:min-h-[120vh] md:min-h-[120vh] lg:min-h-screen px-3.75 py-5 md:py-0">
            {/* Основной header в hero секции */}
            <header className="flex justify-between items-center pt-1 sm:pt-5">
              <Link className="flex items-center gap-5" href={"/"}>
                <img src={`${CDN_URL}/images/logo/logo.webp`} alt="logotype" />
                <span>
                  <img
                    src={`${CDN_URL}/images/logo/text.webp`}
                    alt="logo-text"
                  />
                </span>
              </Link>
              <div className="address hidden md:block">
                пгт. Шерегеш, Звездная улица, 8
              </div>
              <div className="hidden md:flex items-center gap-2 xl:gap-5">
                {/* VK */}
                <a
                  className=" hover:opacity-80 transition-opacity"
                  href="https://m.vk.com/lyudivuyute"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sendYandexGoal("VK")}
                >
                  <div className="w-10 h-10 bg-[#004530] rounded-full flex items-center justify-center">
                    <img
                      src={`${CDN_URL}/images/socials/vk.webp`}
                      alt="vk"
                      className="w-[20px] h-[20px]"
                    />
                  </div>
                </a>
                {/* Telegram */}
                <a
                  className="hover:opacity-80 transition-opacity"
                  href="https://t.me/lyudi_v_uyute"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sendYandexGoal("Telegram")}
                >
                  <div className="w-10 h-10 bg-[#004530] rounded-full flex items-center justify-center">
                    <img
                      src={`${CDN_URL}/images/socials/tg.webp`}
                      alt="tg"
                      className="w-[20px] h-[20px]"
                    />
                  </div>
                </a>
                {/* MAX */}
                <a
                  className="hover:opacity-80 transition-opacity"
                  href="https://max.ru/u/f9LHodD0cOJIT46gw725ziVZ5znGZ9Jf1WYGFmKM-G5O-sOt4pBNZzkc8Zo"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sendYandexGoal("MAX")}
                >
                  <div className="w-10 h-10 bg-[#004530] rounded-full flex items-center justify-center">
                    <img
                      src={`${CDN_URL}/icons/max.svg`}
                      alt="max"
                      className="w-[20px] h-[20px]"
                    />
                  </div>
                </a>
              </div>
              <button
                onClick={toggleMenu}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
              >
                {isMenuOpen ? (
                  <RxCross2 size={30} className="text-white" />
                ) : (
                  <RxHamburgerMenu size={30} className="text-white" />
                )}
              </button>
            </header>

            {/* Контейнер для мобильной версии */}
            <div className="md:hidden">
              <div className="text-center pt-[4%] sm:pt-[12%] pb-3">
                <h1 className="text-[34px] sm:text-[48px] leading-tight mb-4">
                  Гостевой комплекс <br /> «Люди в уюте»
                </h1>
                <h2 className="text-[20px] sm:text-[24px] leading-relaxed text-white/90">
                  База для ретрита в Шерегеше <br />
                  Отдых в Шерегеше летом
                </h2>
              </div>

              <div className="px-1 pb-3" id="heroform">
                <HeroContactForm />
              </div>

              <div className="flex flex-col gap-4 px-1">
                <button
                  onClick={() => scrollToId("widget")}
                  className="bg-(--accent-color) py-3 px-8 font-medium rounded-[30px] w-full transition-all duration-300 cursor-pointer hover:scale-105 hover:-translate-y-1 hover:shadow-xl active:scale-95"
                >
                  Смотреть даты
                </button>
              </div>
            </div>

            {/* Десктопная и планшетная версия */}
            <div className="hidden md:flex flex-col lg:flex-row">
              <div className="w-full lg:w-2/3 pt-[6%] sm:pt-[8%] md:pt-[12%] lg:pt-[20%] flex flex-col justify-start gap-4 sm:gap-6 md:gap-10 lg:gap-16 pb-2 sm:pb-3 md:pb-0">
                <h1 className="text-[34px] sm:text-[48px] md:text-[64px] lg:text-[72px] leading-tight md:leading-16">
                  Гостевой комплекс <br /> «Люди в уюте»
                </h1>
                <h2 className="text-[20px] sm:text-[24px] leading-relaxed md:leading-8">
                  База для ретрита в Шерегеше <br />
                  Отдых в Шерегеше летом
                </h2>
                <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6">
                    <button
                      onClick={() => scrollToId("widget")}
                      className="bg-(--accent-color) py-3 px-8 md:px-16 font-medium rounded-[30px] w-full sm:w-[320px] transition-all duration-300 cursor-pointer hover:scale-105 hover:-translate-y-1 hover:shadow-xl active:scale-95"
                    >
                      Смотреть даты
                    </button>
                  </div>

                  {/* Иконки рейтинга под кнопкой */}
                  <div className="hidden md:flex items-end gap-8 lg:gap-10">
                    <img
                      className="w-16 sm:w-20"
                      src={`${CDN_URL}/images/rate/group_70.svg`}
                      alt="Group_70.svg"
                    />
                    <img
                      className="w-16 sm:w-20"
                      src={`${CDN_URL}/images/rate/Group_69.svg`}
                      alt="Group_69.svg"
                    />
                    <img
                      className="w-16 sm:w-20"
                      src={`${CDN_URL}/images/rate/Group_66.svg`}
                      alt="Group_66.svg"
                    />
                  </div>
                </div>
              </div>
              <div
                className="hidden lg:flex flex-1 relative flex-col items-center justify-center pt-[15%] lg:pt-[15%] px-4 xl:px-0"
                id="heroform"
              >
                <HeroContactForm />
              </div>
              <div
                className="hidden md:flex lg:hidden w-full justify-center pt-6 pb-12 px-4"
                id="heroform"
              >
                <HeroContactForm />
              </div>
            </div>
          </div>
        </div>

        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black z-20 transition-all duration-300 ${
            isMenuOpen && !isClosing
              ? "opacity-50 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={closeMenu}
        />

        {/* Меню */}
        <div
          className={`fixed z-100 top-0 right-0 bottom-0 bg-background text-(--accent-color) font-semibold text-lg flex flex-col gap-8 w-full md:w-90 p-10 transition-transform duration-300 ease-out ${
            isMenuOpen && !isClosing ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            onClick={closeMenu}
            className="absolute top-5 right-5 cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="Закрыть меню"
          >
            <RxCross2 size={30} />
          </button>

          {/* Контакты в мобильном меню */}
          <div className="md:hidden my-4">
            <div className="address text-base mb-4">
              пгт. Шерегеш, Звездная улица, 8
            </div>
            <div className="socials flex items-center gap-2">
              <a
                className=" hover:opacity-80 transition-opacity"
                href="https://m.vk.com/lyudivuyute"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sendYandexGoal("VK")}
              >
                <div className="w-10 h-10 bg-[#004530] rounded-full flex items-center justify-center">
                  <img
                    src={`${CDN_URL}/images/socials/vk.webp`}
                    alt="vk"
                    className="w-[20px] h-[20px]"
                  />
                </div>
              </a>
              <a
                className="hover:opacity-80 transition-opacity"
                href="https://t.me/lyudi_v_uyute"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sendYandexGoal("Telegram")}
              >
                <div className="w-10 h-10 bg-[#004530] rounded-full flex items-center justify-center">
                  <img
                    src={`${CDN_URL}/images/socials/tg.webp`}
                    alt="tg"
                    className="w-[20px] h-[20px]"
                  />
                </div>
              </a>
              <a
                className="hover:opacity-80 transition-opacity"
                href="https://max.ru/u/f9LHodD0cOJIT46gw725ziVZ5znGZ9Jf1WYGFmKM-G5O-sOt4pBNZzkc8Zo"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sendYandexGoal("MAX")}
              >
                <div className="w-10 h-10 bg-[#004530] rounded-full flex items-center justify-center">
                  <img
                    src={`${CDN_URL}/icons/max.svg`}
                    alt="max"
                    className="w-[20px] h-[20px]"
                  />
                </div>
              </a>
            </div>
          </div>

          {/* Пункты меню */}
          {menuLinks.map((item, i) => (
            <Link
              key={i}
              href={item.src}
              className="py-2 hover:opacity-80 transition-all duration-300 hover:pl-4 border-b border-gray-200"
              onClick={closeMenu}
              style={{
                animationDelay: `${i * 50}ms`,
                animationFillMode: "both",
                animationDuration: "300ms",
                animationName:
                  isMenuOpen && !isClosing ? "slideInRight" : "none",
              }}
            >
              {item.title}
            </Link>
          ))}
        </div>

        <style jsx>{`
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @media (min-width: 400px) and (max-width: 431px) {
            .hero {
              min-height: 100vh !important;
            }
            .hero .container {
              min-height: 100vh !important;
            }
          }
          @media (min-width: 390px) and (max-width: 400px) {
            .hero {
              min-height: 110vh !important;
            }
            .hero .container {
              min-height: 110vh !important;
            }
          }
          @media (min-width: 374px) and (max-width: 389px) {
            .hero {
              min-height: 120vh !important;
            }
            .hero .container {
              min-height: 120vh !important;
            }
          }
        `}</style>
      </section>
    </>
  );
}
