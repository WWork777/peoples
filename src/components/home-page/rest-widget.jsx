"use client";

import { useEffect } from "react";

export default function RestWidget() {
  useEffect(() => {
    // Чтобы не грузить скрипт несколько раз при переходах
    const SCRIPT_ID = "bookonline24-widget-script";
    const existing = document.getElementById(SCRIPT_ID);

    const initWidget = () => {
      if (!window.HotelWidget) return;

      // Инициализация (один раз)
      window.HotelWidget.init({
        hotelId: "a032e796-375f-4350-b834-759226169822",
        version: "2",
        hooks: {
          onError: (e) => console.error("onError", e),
          onInit: () => console.log("onInit"),
          onBooking: (v) => console.log("onBooking", v),
        },
      });

      // ВСТАВКА в твой контейнер
      window.HotelWidget.add({
        type: "bookingForm",
        inline: true,
        appearance: {
          container: "hotel-widget-container",
        },
      });

      // ⚠️ Остальные блоки (roomsList / calendar / mobile button)
      // требуют ОТДЕЛЬНЫЕ container id на странице.
      // Если хочешь их тоже — добавь под них отдельные div с id и раскомментируй.
      //
      // window.HotelWidget.add({
      //   type: "roomsList",
      //   appearance: { container: "rooms-list-container" },
      // });
      //
      // window.HotelWidget.add({
      //   type: "availabilityCalendar",
      //   months: 2,
      //   appearance: { container: "availability-calendar-container" },
      // });
      //
      // window.HotelWidget.add({
      //   type: "showCheckAvailabilityButtonForMobileDevices",
      //   appearance: { container: "mobile-button-container" },
      // });
    };

    if (existing) {
      // Скрипт уже есть — просто инициализируем (если еще не успел)
      if (window.HotelWidget) initWidget();
      else existing.addEventListener("load", initWidget, { once: true });
      return;
    }

    const s = document.createElement("script");
    s.id = SCRIPT_ID;
    s.src = "https://bookonline24.ru/widget.js";
    s.async = true;
    s.onload = initWidget;

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
