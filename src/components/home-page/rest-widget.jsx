// components/home-page/rest-widget.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export default function RestWidget() {
  const [isLoaded, setIsLoaded] = useState(false);
  const widgetInitialized = useRef(false);
  const pathname = usePathname();
  const containerRef = useRef(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    let mounted = true;
    let initTimeout = null;

    // Функция очистки виджета (безопасная)
    const cleanupWidget = () => {
      if (window.HotelWidget) {
        try {
          // Просто удаляем содержимое контейнера, не трогаем destroy
          const container = document.getElementById("WidgetHorizontalBlockId");
          if (container) {
            container.innerHTML = "";
          }
          console.log("Widget container cleaned");
        } catch (e) {
          console.error("Error cleaning widget:", e);
        }
      }
      widgetInitialized.current = false;
      if (mounted) {
        setIsLoaded(false);
      }
    };

    // Функция инициализации виджета
    const initWidget = () => {
      if (!mounted) return;

      const container = document.getElementById("WidgetHorizontalBlockId");
      if (!container) {
        // Пробуем еще раз через небольшую задержку
        initTimeout = setTimeout(initWidget, 50);
        return;
      }

      // Очищаем контейнер
      container.innerHTML = "";

      if (window.HotelWidget && !widgetInitialized.current) {
        try {
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
                if (mounted) {
                  setIsLoaded(true);
                  widgetInitialized.current = true;
                }
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
      if (scriptLoaded.current) {
        initWidget();
        return;
      }

      if (!document.querySelector('script[src*="bookonline24.ru/widget.js"]')) {
        const script = document.createElement("script");
        script.src = "https://bookonline24.ru/widget.js";
        script.async = true;
        script.onload = () => {
          console.log("Widget script loaded");
          scriptLoaded.current = true;
          initWidget();
        };
        script.onerror = (error) => {
          console.error("Error loading widget script:", error);
        };
        document.body.appendChild(script);
      } else {
        scriptLoaded.current = true;
        initWidget();
      }
    };

    // Запускаем инициализацию
    cleanupWidget(); // Очищаем перед новой инициализацией
    loadScript();

    // Очистка при размонтировании
    return () => {
      mounted = false;
      if (initTimeout) {
        clearTimeout(initTimeout);
      }
      // Не вызываем cleanupWidget здесь, чтобы избежать ошибок
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
          className="min-h-[100px] transition-opacity duration-500"
          style={{ opacity: isLoaded ? 1 : 0 }}
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
