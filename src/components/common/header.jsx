"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const menuLinks = [
    {
      title: "ДОМА И ЦЕНЫ",
      src: "/#",
    },
    {
      title: "ГАЛЕРЕЯ",
      src: "/#",
    },
    {
      title: "УСЛУГИ",
      src: "/#",
    },
    {
      title: "ОТЗЫВЫ",
      src: "/#",
    },
    {
      title: "КОНТАКТЫ",
      src: "/#",
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

  // Управление фиксированным header'ом при скролле
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Показываем header при прокрутке вниз более 100px
      if (currentScrollY > 100) {
        setIsHeaderVisible(true);
      } else {
        setIsHeaderVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
      {/* Фиксированный header при скролле */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isHeaderVisible
            ? "translate-y-0 opacity-100 bg-black/30 backdrop-blur-sm shadow-md"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="container max-w-7xl mx-auto px-3.75 py-4">
          <div className="flex justify-between items-center">
            <Link className="flex items-center gap-5" href={"/"}>
              <img src="/images/logo/logo.webp" alt="logotype" />
              <span>
                <img src="/images/logo/text.webp" alt="logo-text" />
              </span>
            </Link>
            <div className="hidden md:block">
              пгт. Шерегеш, Звездная улица, 8
            </div>
            <div className="hidden md:flex items-center gap-5">
              <a className="w-8" href="#">
                <img src="/images/socials/vk.webp" alt="vk" />
              </a>
              <a className="w-8" href="#">
                <img src="/images/socials/tg.webp" alt="tg" />
              </a>
              <a className="w-8" href="#">
                <img src="/images/socials/wa.webp" alt="wa" />
              </a>
            </div>
            <button
              onClick={toggleMenu}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {isMenuOpen ? (
                <RxCross2 size={30} />
              ) : (
                <RxHamburgerMenu size={30} />
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="container max-w-7xl  mx-auto px-3.75">
        {/* Основной header в hero секции */}
        <header className=" flex justify-between items-center pt-10">
          <Link className="flex items-center gap-5" href={"/"}>
            <img src="/images/logo/logo.webp" alt="logotype" />
            <span>
              <img src="/images/logo/text.webp" alt="logo-text" />
            </span>
          </Link>
          <div className="address hidden md:block">
            пгт. Шерегеш, Звездная улица, 8
          </div>
          <div className="socials hidden md:flex items-center gap-5">
            <a className="w-8" href="#">
              <img src="/images/socials/vk.webp" alt="vk" />
            </a>
            <a className="w-8" href="#">
              <img src="/images/socials/tg.webp" alt="tg" />
            </a>
            <a className="w-8" href="#">
              <img src="/images/socials/wa.webp" alt="wa" />
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
      </div>

      {/* Overlay с анимацией - всегда в DOM для плавности */}
      <div
        className={`fixed inset-0 bg-black z-20 transition-all duration-300 ${
          isMenuOpen && !isClosing
            ? "opacity-50 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* Меню с плавным выездом */}
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
          <div className="socials flex items-center gap-5">
            <a
              className="w-8 hover:opacity-80 transition-opacity"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/socials/vk.png" alt="vk" />
            </a>
            <a
              className="w-8 hover:opacity-80 transition-opacity"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/socials/tg.png" alt="tg" />
            </a>
            <a
              className="w-8 hover:opacity-80 transition-opacity"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/socials/wa.png" alt="wa" />
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
              animationName: isMenuOpen && !isClosing ? "slideInRight" : "none",
            }}
          >
            {item.title}
          </Link>
        ))}

        {/* Кнопка бронирования в меню */}
        <button
          onClick={closeMenu}
          className="mt-8 bg-(--accent-color) text-white py-3 px-8 font-medium rounded-[30px] hover:opacity-90 transition-opacity"
        >
          Забронировать
        </button>
      </div>

      {/* CSS анимации */}
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
      `}</style>
    </>
  );
}
