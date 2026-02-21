"use client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

const SimpleContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Функция для отправки цели в Яндекс.Метрику
  const sendYandexGoal = () => {
    if (typeof window === "undefined") return;

    // Функция для отправки цели
    const sendGoal = () => {
      try {
        if (window.ym) {
          window.ym(106106917, "reachGoal", "footer_form");
          console.log("✅ Цель footer_form отправлена в Яндекс.Метрику");
          return true;
        }
        return false;
      } catch (error) {
        console.error("❌ Ошибка при отправке цели:", error);
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
            "⚠️ Не удалось отправить цель в Яндекс.Метрику после",
            maxAttempts,
            "попыток",
          );
        }
      }
    }, 500); // Проверяем каждые 500мс
  };

  const onSubmit = async (data) => {
    // Очищаем предыдущие ошибки
    setSubmitError("");

    try {
      // Подготовка данных для отправки
      const formData = {
        name: data.name,
        phone: data.phone,
        call: data.call,
        write: data.write,
        email: "", // Пустое значение, как в оригинале
        message: "", // Пустое значение, как в оригинале
        formId: "footer-form", // Идентификатор этой формы
        timestamp: new Date().toISOString(),
      };

      // Отправка данных на API роут
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Успешная отправка
        console.log("✅ Заявка отправлена:", result);

        // Отправляем цель в Яндекс.Метрику
        sendYandexGoal();

        // Показываем успешное сообщение
        setIsSuccess(true);

        // Сбрасываем форму
        reset();

        // Скрываем сообщение через 3 секунды
        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        // Обработка ошибки от сервера
        const errorMessage =
          result.error || result.message || "Ошибка при отправке заявки";
        console.error("❌ Ошибка отправки:", errorMessage);
        setSubmitError(errorMessage);
        setTimeout(() => setSubmitError(""), 3000);
      }
      // Убрал лишний reset() и setTimeout отсюда
    } catch (error) {
      // Обработка сетевых ошибок
      console.error("❌ Ошибка сети:", error);
      setSubmitError("Ошибка соединения с сервером. Попробуйте еще раз.");
      setTimeout(() => setSubmitError(""), 3000);
    }
  };

  return (
    <div className="max-w-md pl-0 p-6 rounded-xl">
      {/* Сообщение об успехе */}
      {isSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
          Спасибо! Мы скоро с вами свяжемся.
        </div>
      )}

      {/* Сообщение об ошибке */}
      {submitError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Поле Имя */}
        <div>
          <label className="block text-white mb-2 font-medium">
            Имя
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            {...register("name", {
              required: "Введите ваше имя",
              minLength: {
                value: 2,
                message: "Минимум 2 символа",
              },
              maxLength: {
                value: 50,
                message: "Максимум 50 символов",
              },
            })}
            className={`w-full px-4 py-3 border rounded-3xl focus:outline-none focus:ring-2 focus:white ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Иван Иванов"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Поле Телефон */}
        <div>
          <label className="block text-white mb-2 font-medium">
            Телефон
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="tel"
            {...register("phone", {
              required: "Введите номер телефона",
              pattern: {
                value: /^[\d\s\-\+\(\)]+$/,
                message: "Введите корректный номер телефона",
              },
              minLength: {
                value: 10,
                message: "Минимум 10 цифр",
              },
            })}
            className={`w-full px-4 py-3 border rounded-3xl focus:outline-none focus:ring-2 focus:white ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="+7 (999) 123-45-67"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>
        <div className="pt-1">
          <label className=" pb-2 flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              {...register("call", {})}
              className=" h-4 w-4 rounded border-white/30 bg-white/10 text-accent focus:ring-accent focus:ring-offset-0"
            />
            <span className="text-white/70 text-xs leading-tight">
              Позвоните мне
            </span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              {...register("write", {})}
              className=" h-4 w-4 rounded border-white/30 bg-white/10 text-accent focus:ring-accent focus:ring-offset-0"
            />
            <span className="text-white/70 text-xs leading-tight">
              Напишите мне
            </span>
          </label>
        </div>

        {/* Кнопка отправки */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-3xl font-medium transition-colors ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-white hover:bg-white text-(--accent-color)"
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
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
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Отправка...
            </span>
          ) : (
            "Отправить заявку"
          )}
        </button>

        {/* Подпись под формой */}
        <p className="text-sm text-white text-center">
          Нажимая кнопку, вы соглашаетесь с{" "}
          <Link href={"/politika"} className="text-orange-500">
            политикой конфиденциальности
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SimpleContactForm;
