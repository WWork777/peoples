"use client";

import { useEffect, useRef } from "react";

export default function RestWidget() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Очищаем контейнер
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
    }

    // Создаем iframe
    const iframe = document.createElement("iframe");
    iframe.id = "widgetBookingReservations";
    iframe.style.cssText =
      "border:0;outline:0;overflow:hidden!important;min-height:auto!important;width:100%;";
    iframe.src =
      "https://widgets.ays-office.ru/booking/#/%7B%22primary%22%3A%22134734%22%2C%22background%22%3A%22ffffff%22%2C%22foreground%22%3A%22ffffff%22%2C%22text%22%3A%22134734%22%2C%22widgetId%22%3A%2265558%22%7D/calendar/22/hotel/131094";
    iframe.scrolling = "no";

    // Добавляем iframe в контейнер
    containerRef.current.appendChild(iframe);

    // Функция для инициализации виджета после загрузки всех скриптов
    const initWidget = () => {
      if (window.WidgetBookingOnLoadIframe && window.SetRoistatVisitId) {
        window.WidgetBookingOnLoadIframe(iframe, false, null, null, {});
        window.SetRoistatVisitId(iframe);
      }
    };

    // Загружаем скрипты последовательно
    const script2 = document.createElement("script");
    script2.type = "text/javascript";
    script2.src =
      "https://pms.mehotel.ru/resources/js/ays-widget-booking.resizer.min.js?version=2.1";

    const script3 = document.createElement("script");
    script3.type = "text/javascript";
    script3.src =
      "https://pms.mehotel.ru/resources/js/ays-seo-helper.min.js?version=2.1";

    // Ждем загрузки всех скриптов
    let loadedCount = 0;
    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === 2) {
        // оба скрипта загружены
        initWidget();
      }
    };

    script2.onload = checkAllLoaded;
    script3.onload = checkAllLoaded;

    // Добавляем скрипты на страницу
    document.body.appendChild(script2);
    document.body.appendChild(script3);

    // Очистка при размонтировании
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
      [script2, script3].forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, []);

  return (
    <section className="bg-white py-16" id="widget">
      <div className="container max-w-7xl mx-auto px-4">
        {/* CTA текст */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Забронируйте отдых вашей мечты
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Выберите идеальный номер для вашего незабываемого отдыха. Лучшие
            цены и комфортные условия ждут вас!
          </p>
        </div>

        {/* Контейнер для виджета */}
        <div ref={containerRef} className="min-h-[200px] w-full" />
      </div>
    </section>
  );
}
