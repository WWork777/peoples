// components/home-page/rest-widget.tsx
"use client";

import { useEffect, useState } from "react";

export default function RestWidget() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Функция инициализации виджета (точная копия с действующего сайта)
    const initWidget = () => {
      if (window.HotelWidget) {
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
            },
            onBooking: function (v) {
              console.log("onBooking", v);
            },
          },
        });

        // Добавляем только ГОРИЗОНТАЛЬНУЮ форму (как на действующем сайте)
        window.HotelWidget.add({
          type: "bookingForm",
          inline: true, // ← ключевой параметр! horizontal = true
          appearance: {
            container: "WidgetHorizontalBlockId", // ← тот же ID
          },
        });

        // Можно добавить и другие виджеты если нужно
        window.HotelWidget.add({
          type: "roomsList",
          appearance: {
            container: "WidgetRoomsListId",
          },
        });
      }
    };

    // Загружаем скрипт только если еще не загружен
    if (!document.querySelector('script[src*="bookonline24.ru/widget.js"]')) {
      const script = document.createElement("script");
      script.src = "https://bookonline24.ru/widget.js";
      script.async = true;
      script.onload = initWidget;
      document.body.appendChild(script);
    } else if (window.HotelWidget) {
      // Если скрипт уже загружен, сразу инициализируем
      initWidget();
    }

    // Очистка не требуется - скрипт оставляем глобально
  }, []);

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
      <div className="container max-w-6xl mx-auto px-4">
        <div
          id="WidgetHorizontalBlockId"
          className={`transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"} mb-4`}
        >
          {/* Плейсхолдер пока грузится */}
          {/* {!isLoaded && (
            <div className="bg-gray-100 rounded-lg p-8 animate-pulse">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 h-16 bg-gray-200 rounded"></div>
                <div className="flex-1 h-16 bg-gray-200 rounded"></div>
                <div className="flex-1 h-16 bg-gray-200 rounded"></div>
                <div className="w-40 h-16 bg-gray-300 rounded"></div>
              </div>
            </div>
          )} */}
        </div>
      </div>

      {/* Можно добавить и другие контейнеры если нужно */}
      {/* <div id="WidgetRoomsListId"></div>
      <div id="WidgetVerticalBlockId"></div> */}
    </section>
  );
}
