"use client";

import { useEffect } from "react";

export default function RestWidget() {
  useEffect(() => {
    const SCRIPT_ID = "bookonline24-widget-script";

    const run = () => {
      if (!window.HotelWidget) return;

      // чтобы не инициализировать повторно
      if (!window.__konturWidgetInited) {
        window.HotelWidget.init({
          hotelId: "a032e796-375f-4350-b834-759226169822",
          version: "2",
          baseUrl: "https://bookonline24.ru",
          theme: {
            common: {
              buttons: {
                primary: {
                  bg: "#114734",
                  borderColor: "#114734",
                  border: "#114734",
                  textColor: "#fff",
                },
                secondary: { bg: "#f5f9ba" },
              },
            },
          },
          hooks: {
            onError: (e) => console.error("onError", e),
            onInit: () => console.log("onInit"),
            onBooking: (v) => console.log("onBooking", v),
          },
        });
        window.__konturWidgetInited = true;
      }

      // добавляем один раз
      if (!window.__konturWidgetAdded) {
        window.HotelWidget.add({
          type: "bookingForm",
          inline: false, // как у тебя "вертикальный блок"
          appearance: { container: "hotel-widget-container" },
        });
        window.__konturWidgetAdded = true;
      }
    };

    const existing = document.getElementById(SCRIPT_ID);
    if (existing) {
      if (window.HotelWidget) run();
      else existing.addEventListener("load", run, { once: true });
      return;
    }

    const s = document.createElement("script");
    s.id = SCRIPT_ID;
    s.src = "https://bookonline24.ru/widget.js";
    s.async = true;
    s.onload = run;
    document.body.appendChild(s);
  }, []);

  return (
    <section id="widget" className="cozy-rest px-3.75 bg-white">
      <div className="container max-w-7xl mx-auto pt-10 pb-6">
        <h2 className="text-(--accent-color) text-[25px] sm:text-[32px] font-bold text-center leading-8">
          У НАС УЖЕ ВСЕ ГОТОВО ДЛЯ <br /> ОТЛИЧНОГО УЮТНОГО <br /> ОТДЫХА
        </h2>
        <h3 className="text-(--accent-color) font-medium text-center pt-6">
          Не хватает только вас!
        </h3>
      </div>

      <div
        id="hotel-widget-container"
        className="container max-w-7xl mx-auto"
      />
    </section>
  );
}
