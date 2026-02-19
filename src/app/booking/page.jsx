// app/widget/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Booking() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Функция инициализации виджета
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

        // Добавляем горизонтальную форму бронирования
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
      }
    };

    // Загружаем скрипт если еще не загружен
    if (!document.querySelector('script[src*="bookonline24.ru/widget.js"]')) {
      const script = document.createElement("script");
      script.src = "https://bookonline24.ru/widget.js";
      script.async = true;
      script.onload = initWidget;
      document.body.appendChild(script);
    } else if (window.HotelWidget) {
      initWidget();
    }

    // Очистка при размонтировании
    return () => {
      // Можно добавить очистку если нужно
    };
  }, []);

  return (
    <section className="gallery bg-background mt-10 px-3.75 py-10">
      {/* Хедер страницы */}
      {/* <header className="border-b border-gray-100">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-[#114734] font-bold text-xl">
              Люди в уюте
            </Link>
            <nav className="flex gap-6">
              <Link
                href="/"
                className="text-gray-600 hover:text-[#114734] transition-colors"
              >
                Главная
              </Link>
              <Link href="/widget" className="text-[#114734] font-medium">
                Бронирование
              </Link>
            </nav>
          </div>
        </div>
      </header> */}

      {/* Основной контент */}
      <main>
        {/* Заголовок секции */}
        <section className="py-12 from-gray-50 to-white">
          <div className="container max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Гостевой комплекс{" "}
              <span className="text-[#114734]">Люди в уюте</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Забронируйте дом с видом на горы, собственной баней и всем
              необходимым для идеального отдыха
            </p>
          </div>
        </section>

        {/* Виджет бронирования */}
        <section className="py-8 px-4">
          <div className="container max-w-6xl mx-auto">
            {/* Горизонтальная форма бронирования */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-12">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Проверить наличие и забронировать
              </h2>
              <div
                id="WidgetHorizontalBlockId"
                className={`transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
              >
                {/* Плейсхолдер загрузки */}
                {!isLoaded && (
                  <div className="bg-gray-50 rounded-xl p-6 animate-pulse">
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="h-12 bg-gray-200 rounded-lg"></div>
                      <div className="h-12 bg-gray-200 rounded-lg"></div>
                      <div className="h-12 bg-gray-200 rounded-lg"></div>
                      <div className="h-12 bg-gray-300 rounded-lg"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Список номеров/домов */}
            {/* <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Наши дома
              </h2>
              <div
                id="WidgetRoomsListId"
                className={`transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
              >
                {!isLoaded && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="bg-gray-50 rounded-xl p-4 animate-pulse"
                      >
                        <div className="h-40 bg-gray-200 rounded-lg mb-3"></div>
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                )}
              </div> */}
            {/* </div> */}

            {/* Информация о загрузке */}
            {!isLoaded && (
              <div className="text-center mt-8 text-gray-500">
                Загружаем систему бронирования...
              </div>
            )}
          </div>
        </section>

        {/* Дополнительная информация */}
        {/* <section className="py-12 bg-gray-50 mt-12">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#114734]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🏔️</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Вид на горы
                </h3>
                <p className="text-gray-600 text-sm">
                  Из каждого дома открывается панорамный вид на Шерегеш
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#114734]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🔥</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Собственная баня
                </h3>
                <p className="text-gray-600 text-sm">
                  В каждом доме есть баня для настоящего отдыха
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#114734]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🅿️</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Бесплатная парковка
                </h3>
                <p className="text-gray-600 text-sm">
                  Просторная охраняемая парковка на территории
                </p>
              </div>
            </div>
          </div>
        </section> */}
      </main>

      {/* Футер */}
      {/* <footer className="border-t border-gray-100 py-8">
        <div className="container max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2026 Гостевой комплекс «Люди в уюте». Все права защищены.</p>
          <p className="mt-2">
            <Link href="/politika" className="text-[#114734] hover:underline">
              Политика обработки персональных данных
            </Link>
          </p>
        </div>
      </footer> */}
    </section>
  );
}
