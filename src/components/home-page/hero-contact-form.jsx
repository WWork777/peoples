"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";

export default function HeroContactForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      phone: "",
      message: "",
      agreement: false,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");

  const phoneValue = watch("phone");
  const nameValue = watch("name");
  const agreementValue = watch("agreement");

  // Функция форматирования телефона
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

  // Проверка валидности телефона
  const isPhoneValid = (phone) => {
    if (!phone) return false;
    const cleaned = phone.replace(/\D/g, "");
    return cleaned.startsWith("79") && cleaned.length === 11;
  };

  // Проверка, можно ли отправить форму
  const canSubmit =
    nameValue &&
    nameValue.trim().length >= 2 &&
    isPhoneValid(phoneValue) &&
    agreementValue &&
    !isSubmitting;

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage("");

    try {
      const cleanedPhone = data.phone.replace(/\D/g, "");
      const formattedPhone = `+${cleanedPhone}`;

      const formData = {
        name: data.name.trim(),
        phone: formattedPhone,
        email: "",
        message: data.message?.trim() || "",
        formId: "hero-form",
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
        setSubmitStatus("success");
        setSubmitMessage("Спасибо! Мы скоро с вами свяжемся.");
        reset();
        setTimeout(() => {
          setSubmitStatus(null);
          setSubmitMessage("");
        }, 5000);
      } else {
        setSubmitStatus("error");
        setSubmitMessage(
          result.error || result.message || "Ошибка при отправке заявки",
        );
        setTimeout(() => {
          setSubmitStatus(null);
          setSubmitMessage("");
        }, 5000);
      }
    } catch (error) {
      console.error("Ошибка отправки формы:", error);
      setSubmitStatus("error");
      setSubmitMessage("Ошибка соединения с сервером. Попробуйте еще раз.");
      setTimeout(() => {
        setSubmitStatus(null);
        setSubmitMessage("");
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 shadow-xl"
      >
        <h3 className="text-white text-xl sm:text-2xl font-bold mb-2 text-center">
          Свяжитесь с нами
        </h3>

        <p className="text-white/80 text-sm sm:text-base mb-4 sm:mb-6 text-center">
          Подберём дом под ваши даты, поможем с трансфером
        </p>

        {/* Сообщение об успехе/ошибке */}
        {submitStatus && (
          <div
            className={`mb-4 p-3 rounded-lg text-center ${
              submitStatus === "success"
                ? "bg-green-500/20 text-green-100 border border-green-500/30"
                : "bg-red-500/20 text-red-100 border border-red-500/30"
            }`}
          >
            {submitMessage}
          </div>
        )}

        <div className="space-y-3 sm:space-y-4">
          {/* Поле Имя */}
          <div>
            <input
              type="text"
              {...register("name", {
                required: "Имя обязательно",
                minLength: {
                  value: 2,
                  message: "Минимум 2 символа",
                },
                maxLength: {
                  value: 50,
                  message: "Максимум 50 символов",
                },
              })}
              className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                errors.name ? "border-red-500" : "border-white/20"
              } text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent text-base`}
              placeholder="Ваше имя"
            />
            {errors.name && (
              <span className="text-red-300 text-xs mt-1 block">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Поле Телефон */}
          <div>
            <Controller
              name="phone"
              control={control}
              rules={{
                required: "Телефон обязателен",
                validate: (value) => {
                  if (!value) return "Телефон обязателен";
                  const cleaned = value.replace(/\D/g, "");
                  if (!cleaned.startsWith("79")) {
                    return "Телефон должен начинаться с +7 (9";
                  }
                  if (cleaned.length !== 11) {
                    return "Введите полный номер телефона";
                  }
                  return true;
                },
              }}
              render={({ field }) => (
                <input
                  type="tel"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => {
                    const formatted = formatPhone(e.target.value);
                    field.onChange(formatted);
                  }}
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                    errors.phone ? "border-red-500" : "border-white/20"
                  } text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent text-base`}
                  placeholder="+7 (999) 123-45-67"
                />
              )}
            />
            {errors.phone && (
              <span className="text-red-300 text-xs mt-1 block">
                {errors.phone.message}
              </span>
            )}
          </div>

          {/* Поле Сообщение - скрыто на мобильных, показывается на планшетах и выше */}
          <div className="hidden sm:block">
            <textarea
              {...register("message", {
                maxLength: {
                  value: 200,
                  message: "Максимум 200 символов",
                },
              })}
              className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                errors.message ? "border-red-500" : "border-white/20"
              } text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent text-base min-h-[60px] max-h-[100px] resize-y`}
              placeholder="Ваше сообщение (необязательно)"
              rows={2}
            />
            {errors.message && (
              <span className="text-red-300 text-xs mt-1 block">
                {errors.message.message}
              </span>
            )}
          </div>

          {/* Чекбокс согласия - компактная версия */}
          <div className="pt-1">
            <label className="flex items-start space-x-2 cursor-pointer">
              <input
                type="checkbox"
                {...register("agreement", {
                  required: "Необходимо согласие на обработку данных",
                })}
                className="mt-1 h-4 w-4 rounded border-white/30 bg-white/10 text-accent focus:ring-accent focus:ring-offset-0"
              />
              <span className="text-white/70 text-xs leading-tight">
                Я согласен с{" "}
                <Link
                  href="/politika"
                  className="text-accent hover:text-accent/80 underline transition-colors"
                >
                  политикой обработки персональных данных
                </Link>
              </span>
            </label>
            {errors.agreement && (
              <span className="text-red-300 text-xs mt-1 block">
                {errors.agreement.message}
              </span>
            )}
          </div>

          {/* Кнопка отправки */}
          <button
            type="submit"
            disabled={!canSubmit}
            className={`w-full py-3 px-4 rounded-xl font-medium text-base transition-all duration-300 ${
              canSubmit
                ? "bg-accent text-white hover:bg-accent/90 hover:scale-[1.02] active:scale-95 cursor-pointer"
                : "bg-gray-400/30 text-gray-300 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                  ></path>
                </svg>
                Отправка...
              </span>
            ) : (
              "Отправить заявку"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
