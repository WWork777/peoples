"use client";

import { useEffect, useRef } from "react";

export default function RestWidget() {
  const containerRef = useRef(null);

  useEffect(() => {
    function initWidget() {
      if (!window.HotelWidget || !containerRef.current) return;

      // очищаем контейнер при повторной загрузке
      containerRef.current.innerHTML = "";

      window.HotelWidget.init({
        hotelId: "a032e796-375f-4350-b834-759226169822",
        version: "2",
      });

      window.HotelWidget.add({
        type: "bookingForm",
        inline: true,
        appearance: {
          container: "WidgetHorizontalBlockId",
        },
      });
    }

    const existingScript = document.querySelector(
      'script[src*="bookonline24.ru/widget.js"]',
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://bookonline24.ru/widget.js";
      script.async = true;
      script.onload = initWidget;
      document.body.appendChild(script);
    } else {
      initWidget();
    }
  }, []);

  return (
    <section className="bg-white py-10">
      <div className="container max-w-7xl mx-auto px-4">
        <div
          ref={containerRef}
          id="WidgetHorizontalBlockId"
          className="min-h-[100px]"
        />
      </div>
    </section>
  );
}
