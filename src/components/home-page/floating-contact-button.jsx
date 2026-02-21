"use client";
import { useState, useEffect } from "react";
import { FaPhone, FaTimes } from "react-icons/fa";
import styles from "./floating-contact-button.module.scss";

export default function FloatingContactButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Показываем кнопку после загрузки страницы
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Закрытие меню при клике вне его
  useEffect(() => {
    if (isMenuOpen) {
      const handleClickOutside = (e) => {
        const floatingButton = e.target.closest(`.${styles.floatingButton}`);
        if (!floatingButton) {
          closeMenu();
        }
      };
      // Небольшая задержка, чтобы не закрывалось сразу при открытии
      const timeoutId = setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 100);
      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [isMenuOpen]);

  // Функция для отправки цели в Яндекс.Метрику при клике на телефон
  const handlePhoneClick = (e) => {
    // Отправляем цель в Яндекс.Метрику
    try {
      if (typeof window !== "undefined" && window.ym) {
        window.ym(106106917, "reachGoal", "phone_floating");
        console.log("✅ Цель phone_floating отправлена");
      }
    } catch (error) {
      console.error("Ошибка отправки цели:", error);
    }

    // Не блокируем стандартное поведение ссылки
    // Пользователь перейдет по ссылке tel:
  };

  const socialLinks = [
    {
      name: "ВКонтакте",
      icon: null,
      image: "/images/socials/vk.webp",
      href: "https://m.vk.com/lyudivuyute",
      delay: 0,
    },
    {
      name: "Telegram",
      icon: null,
      image: "/images/socials/tg.webp",
      href: "https://t.me/lyudivuyuteinfo",
      delay: 100,
    },
    {
      name: "Телефон",
      icon: FaPhone,
      href: "tel:+79236033030",
      delay: 200,
      onClick: handlePhoneClick, // Добавляем обработчик для телефона
    },
    {
      name: "Max",
      icon: null,
      image: "/icons/max.svg",
      href: "https://max.ru/u/f9LHodD0cOJIT46gw725ziVZ5znGZ9Jf1WYGFmKM-G5O-sOt4pBNZzkc8Zo",
      delay: 300,
    },
  ];

  if (!isVisible) return null;

  return (
    <div className={styles.floatingButton}>
      {/* Меню с иконками */}
      {isMenuOpen && (
        <div className={styles.menu}>
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={index}
                href={link.href}
                target={link.href.startsWith("tel:") ? undefined : "_blank"}
                rel={
                  link.href.startsWith("tel:")
                    ? undefined
                    : "noopener noreferrer"
                }
                className={styles.menuItem}
                style={{
                  animationDelay: `${link.delay}ms`,
                }}
                aria-label={link.name}
                onClick={link.onClick} // Добавляем обработчик, если он есть
              >
                {Icon ? (
                  <Icon className={styles.icon} />
                ) : (
                  <img
                    src={link.image}
                    alt={link.name}
                    className={styles.iconImage}
                  />
                )}
                <span className={styles.tooltip}>{link.name}</span>
              </a>
            );
          })}
        </div>
      )}

      {/* Основная кнопка */}
      <button
        onClick={toggleMenu}
        className={`${styles.mainButton} ${isMenuOpen ? styles.open : ""}`}
        aria-label={isMenuOpen ? "Закрыть меню" : "Свяжитесь с нами"}
      >
        {isMenuOpen ? (
          <FaTimes className={styles.closeIcon} />
        ) : (
          <span className={styles.buttonText}>Свяжитесь с нами</span>
        )}
        {/* Анимация пульсации */}
        <span className={styles.pulse}></span>
      </button>
    </div>
  );
}
