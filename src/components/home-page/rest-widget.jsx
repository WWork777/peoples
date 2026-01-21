"use client";

import { useEffect } from "react";

export default function RestWidget() {
  useEffect(() => {
    const SCRIPT_ID = "kontur-hotel-widget";
    const FLAG_INIT = "__KONTUR_WIDGET_INIT__";
    const FLAG_ADDED = "__KONTUR_WIDGET_ADDED__";

    const initAndAdd = () => {
      if (!window.HotelWidget) return;

      if (!window[FLAG_INIT]) {
        window.HotelWidget.init({
          hotelId: "ВАШ_HOTEL_ID_С_РАБОЧЕГО_САЙТА",
          version: "2",
          baseUrl: "https://bookonline24.ru",
          hooks: {
            onError: (e) => console.error("Kontur widget onError:", e),
            onInit: () => console.log("Kontur widget onInit"),
          },
        });
        window[FLAG_INIT] = true;
      }

      if (!window[FLAG_ADDED]) {
        window.HotelWidget.add({
          type: "bookingForm",
          inline: true,
          appearance: { container: "hotel-widget-container" },
        });
        window[FLAG_ADDED] = true;
      }
    };

    const existing = document.getElementById(SCRIPT_ID);
    if (existing) {
      if (window.HotelWidget) initAndAdd();
      else existing.addEventListener("load", initAndAdd, { once: true });
      return;
    }

    const s = document.createElement("script");
    s.id = SCRIPT_ID;
    s.src = "https://bookonline24.ru/widget.js";
    s.async = true;
    s.onload = initAndAdd;
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
