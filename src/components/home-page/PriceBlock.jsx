"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function PriceBlock() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    contactMethod: "call", // по умолчанию "позвонить"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");

  const sendYandexGoal = () => {
    if (typeof window === "undefined") return;

    // Функция для отправки цели
    const sendGoal = () => {
      try {
        if (window.ym) {
          window.ym(106106917, "reachGoal", "price_form");
          return true;
        }
        return false;
      } catch (error) {
        console.error("Ошибка при отправке цели:", error);
        return false;
      }
    };

    // Пробуем отправить сразу
    if (sendGoal()) return;

    // Если не получилось, пробуем еще несколько раз с интервалом
    let attempts = 0;
    const maxAttempts = 5;
    const interval = setInterval(() => {
      attempts++;
      if (sendGoal() || attempts >= maxAttempts) {
        clearInterval(interval);
        if (attempts >= maxAttempts) {
          console.warn(
            "Не удалось отправить цель в Яндекс.Метрику после",
            maxAttempts,
            "попыток",
          );
        }
      }
    }, 500); // Проверяем каждые 500мс
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage("");

    try {
      const cleanedPhone = form.phone.replace(/\D/g, "");
      const formattedPhone = `+${cleanedPhone}`;

      const contactMethodText =
        form.contactMethod === "call" ? "Позвонить" : "Написать в мессенджер";

      const formData = {
        name: form.name.trim(),
        phone: formattedPhone,
        email: "",
        message: `
📋 ЗАЯВКА ИЗ БЛОКА ЦЕН

👤 Имя: ${form.name.trim()}
📞 Телефон: ${formattedPhone}
📱 Способ связи: ${contactMethodText}
        `.trim(),
        call: form.contactMethod === "call",
        write: form.contactMethod === "write",
        formId: "price-block",
        timestamp: new Date().toISOString(),
      };

      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Отправляем цель в Яндекс.Метрику
        sendYandexGoal();

        setSubmitStatus("success");
        setSubmitMessage("Спасибо! Мы свяжемся с вами в ближайшее время");
        setForm({ name: "", phone: "", contactMethod: "call" });
      } else {
        setSubmitStatus("error");
        setSubmitMessage(
          result.error || result.message || "Ошибка при отправке заявки",
        );
      }
    } catch (error) {
      console.error("Ошибка отправки формы:", error);
      setSubmitStatus("error");
      setSubmitMessage("Ошибка соединения с сервером. Попробуйте еще раз.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitStatus(null);
        setSubmitMessage("");
      }, 5000);
    }
  };

  const formatPhone = (value) => {
    if (!value) return "";
    const cleaned = value.replace(/\D/g, "");
    let digits = cleaned;
    if (digits.length > 0 && !digits.startsWith("7")) {
      digits = "7" + digits;
    }
    digits = digits.slice(0, 11);

    if (digits.length === 0) return "";
    if (digits.length <= 1) return `+${digits}`;
    if (digits.length <= 4) return `+7 (${digits.slice(1)}`;
    if (digits.length <= 7)
      return `+7 (${digits.slice(1, 4)}) ${digits.slice(4)}`;
    if (digits.length <= 9)
      return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Фоновый декор */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div> */}
      {/* <div className="absolute top-0 right-0 w-1/3 h-full bg-[#004530]/5 blur-3xl rounded-full transform translate-x-1/2"></div> */}
      {/* <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-[#004530]/5 blur-3xl rounded-full"></div> */}

      <div className="container mx-auto px-3 md:px-0 relative z-10 max-w-[1200px]">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Левая колонка с текстом и формой */}
          <div className="space-y-8">
            {/* Заголовок */}
            <div className="space-y-4">
              <span className="text-[#004530] font-medium text-sm uppercase tracking-wider">
                Сезон 2026
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Гостевой комплекс <br />{" "}
                <span className="text-[#004530]">Люди в уюте</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-lg">
                Цена дома от 14 000 ₽. Оставьте заявку, чтобы мы подобрали
                удобные даты и закрепили за вами лучшую стоимость
              </p>
            </div>

            {/* Преимущества */}
            {/* <div className="grid grid-cols-2 gap-4 max-w-lg">
              {[
                { icon: "🏔️", text: "Вид на горы" },
                { icon: "🔥", text: "Собственная баня" },
                { icon: "🅿️", text: "Бесплатная парковка" },
                { icon: "🌲", text: "В лесу" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-sm text-gray-600">{item.text}</span>
                </div>
              ))}
            </div> */}

            {/* Форма */}
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
              {/* Сообщение об успехе/ошибке */}
              {submitStatus && (
                <div
                  className={`p-3 rounded-xl text-sm ${
                    submitStatus === "success"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {submitStatus === "success" ? (
                      <svg
                        className="w-4 h-4 text-emerald-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                    {submitMessage}
                  </div>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#004530] focus:ring-1 focus:ring-[#004530]/20 transition-all"
                  required
                />
                <input
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: formatPhone(e.target.value) })
                  }
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#004530] focus:ring-1 focus:ring-[#004530]/20 transition-all"
                  required
                />
              </div>

              {/* Выбор способа связи - компактная версия */}
              <div className="flex items-center justify-between gap-2 py-1">
                <span className="text-sm text-gray-600">Связаться:</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, contactMethod: "call" })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      form.contactMethod === "call"
                        ? "bg-[#004530] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    📞 Позвонить
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, contactMethod: "write" })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      form.contactMethod === "write"
                        ? "bg-[#004530] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    ✉️ Написать
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !form.name || !form.phone}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#004530] text-white font-medium rounded-xl hover:bg-[#003520] transition-all shadow-lg shadow-[#004530]/20 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Отправка...
                  </span>
                ) : (
                  "Забронировать"
                )}
              </button>

              <p className="text-xs text-gray-400">
                Нажимая кнопку, вы соглашаетесь с{" "}
                <Link
                  href="/politika"
                  className="text-[#004530] hover:underline"
                >
                  политикой обработки данных
                </Link>
              </p>
            </form>
          </div>

          {/* Правая колонка с картинкой */}
          <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/images/price.jpg"
              alt="Дома гостевого комплекса в Шерегеше"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />

            {/* Градиент для читаемости текста на картинке */}
            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div> */}

            {/* Бейдж с ценой на картинке - адаптивный размер */}
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-white/95 backdrop-blur-sm px-3 py-1.5 md:px-5 md:py-3 rounded-xl md:rounded-2xl shadow-lg">
              <span className="text-xs md:text-sm text-gray-600 block">
                Стоимость от
              </span>
              <span className="text-lg md:text-2xl font-bold text-[#004530]">
                14 000 ₽
              </span>
              <span className="text-xs md:text-sm text-gray-500">/сутки</span>
            </div>
          </div>
        </div>

        {/* Дополнительные фишки */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16">
          {[
            { number: "5", text: "домов в комплексе" },
            { number: "10 мин", text: "до подъемника" },
            { number: "24/7", text: "поддержка" },
            { number: "100%", text: "раннее бронирование" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#004530]">
                {stat.number}
              </div>
              <div className="text-sm text-gray-500">{stat.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
