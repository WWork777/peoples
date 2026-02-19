// components/home-page/rest-widget.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export default function RestWidget() {
  const [isLoaded, setIsLoaded] = useState(false);
  const widgetInitialized = useRef(false);
  const pathname = usePathname();
  const containerRef = useRef(null);

  useEffect(() => {
    // Функция очистки виджета
    const cleanupWidget = () => {
      if (window.HotelWidget) {
        try {
          // Пытаемся найти и удалить контейнер виджета
          const container = document.getElementById("WidgetHorizontalBlockId");
          if (container) {
            container.innerHTML = ""; // Очищаем содержимое
          }

          // Если есть метод destroy, вызываем его
          if (window.HotelWidget.destroy) {
            window.HotelWidget.destroy();
          }

          console.log("Widget cleaned up");
        } catch (e) {
          console.error("Error cleaning up widget:", e);
        }
      }
      widgetInitialized.current = false;
      setIsLoaded(false);
    };

    // Функция инициализации виджета
    const initWidget = () => {
      // Проверяем, что контейнер существует
      const container = document.getElementById("WidgetHorizontalBlockId");
      if (!container) {
        console.log("Container not found, retrying...");
        setTimeout(initWidget, 100); // Пробуем снова через 100ms
        return;
      }

      // Очищаем контейнер перед инициализацией
      container.innerHTML = "";

      if (window.HotelWidget) {
        try {
          // Сначала пробуем уничтожить предыдущий инстанс если есть
          if (window.HotelWidget.destroy) {
            window.HotelWidget.destroy();
          }

          // Инициализируем заново
          window.HotelWidget.init({
            hotelId: "a032e796-375f-4350-b834-759226169822",
            theme: {
              common: {
                buttons: {
                  primary: {
                    bg: "#114734",
                    borderColor: "#114734",
                    border: "#114734",
                    textColor: "#fff",
                  },
                  secondary: {
                    bg: "#f5f9ba",
                  },
                },
              },
            },
            version: "2",
            hooks: {
              onError: function (e) {
                console.error("onError", e);
              },
              onInit: function () {
                console.log("onInit");
                setIsLoaded(true);
                widgetInitialized.current = true;
              },
              onBooking: function (v) {
                console.log("onBooking", v);
              },
            },
          });

          // Добавляем горизонтальную форму
          window.HotelWidget.add({
            type: "bookingForm",
            inline: true,
            appearance: {
              container: "WidgetHorizontalBlockId",
            },
          });

          console.log("Widget initialization started");
        } catch (e) {
          console.error("Error initializing widget:", e);
        }
      }
    };

    // Загружаем скрипт если еще не загружен
    const loadScript = () => {
      return new Promise((resolve, reject) => {
        if (
          !document.querySelector('script[src*="bookonline24.ru/widget.js"]')
        ) {
          const script = document.createElement("script");
          script.src = "https://bookonline24.ru/widget.js";
          script.async = true;
          script.onload = () => {
            console.log("Widget script loaded");
            resolve();
          };
          script.onerror = (error) => {
            console.error("Error loading widget script:", error);
            reject(error);
          };
          document.body.appendChild(script);
        } else {
          // Скрипт уже загружен
          resolve();
        }
      });
    };

    // Основная функция инициализации
    const initialize = async () => {
      try {
        // Очищаем предыдущее состояние
        cleanupWidget();

        // Загружаем скрипт
        await loadScript();

        // Даем время скрипту полностью загрузиться
        setTimeout(() => {
          initWidget();
        }, 100);
      } catch (error) {
        console.error("Failed to initialize widget:", error);
      }
    };

    // Запускаем инициализацию
    initialize();

    // Очистка при размонтировании
    return () => {
      cleanupWidget();
    };
  }, [pathname]); // Перезапускаем при изменении пути

  return (
    <section id="widget" className="cozy-rest px-3.75 bg-white">
      <div className="container max-w-7xl mx-auto pt-10 pb-6">
        <h2 className="text-[#114734] text-[25px] sm:text-[32px] font-bold text-center leading-8">
          У НАС УЖЕ ВСЕ ГОТОВО ДЛЯ <br />
          ОТЛИЧНОГО УЮТНОГО <br />
          ОТДЫХА
        </h2>
        <h3 className="text-[#114734] font-medium text-center pt-6 text-lg">
          Не хватает только вас!
        </h3>
      </div>

      {/* ГОРИЗОНТАЛЬНЫЙ виджет бронирования */}
      <div className="container max-w-6xl mx-auto px-4 pb-8">
        <div
          ref={containerRef}
          id="WidgetHorizontalBlockId"
          key={pathname} // Принудительно пересоздаем при смене пути
          className={`transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        >
          {/* Плейсхолдер загрузки */}
          {!isLoaded && (
            <div className="bg-gray-100 rounded-lg p-8 animate-pulse">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 h-12 bg-gray-200 rounded"></div>
                <div className="flex-1 h-12 bg-gray-200 rounded"></div>
                <div className="flex-1 h-12 bg-gray-200 rounded"></div>
                <div className="w-full md:w-32 h-12 bg-[#114734]/20 rounded"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
