// components/home-page/rest-widget.tsx
"use client";

import { useEffect, useState, useRef } from "react";

export default function RestWidget() {
  const [isLoaded, setIsLoaded] = useState(false);
  const widgetInitialized = useRef(false);

  useEffect(() => {
    // Функция очистки виджета
    const cleanupWidget = () => {
      if (window.HotelWidget && window.HotelWidget.destroy) {
        try {
          window.HotelWidget.destroy();
          console.log("Widget destroyed");
        } catch (e) {
          console.error("Error destroying widget:", e);
        }
      }
      widgetInitialized.current = false;
      setIsLoaded(false);
    };

    // Функция инициализации виджета
    const initWidget = () => {
      // Очищаем предыдущий виджет если был
      if (widgetInitialized.current) {
        cleanupWidget();
      }

      if (window.HotelWidget) {
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

          // Добавляем список номеров
          window.HotelWidget.add({
            type: "roomsList",
            appearance: {
              container: "WidgetRoomsListId",
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
      if (!document.querySelector('script[src*="bookonline24.ru/widget.js"]')) {
        const script = document.createElement("script");
        script.src = "https://bookonline24.ru/widget.js";
        script.async = true;
        script.onload = () => {
          console.log("Widget script loaded");
          initWidget();
        };
        script.onerror = (error) => {
          console.error("Error loading widget script:", error);
        };
        document.body.appendChild(script);
      } else if (window.HotelWidget) {
        // Если скрипт уже загружен, инициализируем виджет
        initWidget();
      }
    };

    loadScript();

    // Очистка при размонтировании компонента
    return () => {
      cleanupWidget();
    };
  }, []); // Пустой массив зависимостей - эффект выполняется при монтировании/размонтировании

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
          id="WidgetHorizontalBlockId"
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

      {/* Контейнер для списка номеров (опционально) */}
      <div className="container max-w-6xl mx-auto px-4 pb-8">
        <div
          id="WidgetRoomsListId"
          className={`transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        >
          {!isLoaded && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-gray-100 rounded-xl p-4 animate-pulse"
                >
                  <div className="h-40 bg-gray-200 rounded-lg mb-3"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
