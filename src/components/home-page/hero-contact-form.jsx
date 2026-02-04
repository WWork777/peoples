"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import styles from "./hero-contact-form.module.scss";

export default function HeroContactForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
    reset,
    setValue,
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
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [submitMessage, setSubmitMessage] = useState("");

  const phoneValue = watch("phone");
  const nameValue = watch("name");
  const agreementValue = watch("agreement");

  // Функция форматирования телефона
  const formatPhone = (value) => {
    if (!value) return "";
    // Удаляем все нецифровые символы
    const cleaned = value.replace(/\D/g, "");
    
    // Если начинается не с 7, добавляем 7
    let digits = cleaned;
    if (digits.length > 0 && !digits.startsWith("7")) {
      digits = "7" + digits;
    }
    
    // Ограничиваем до 11 цифр
    digits = digits.slice(0, 11);
    
    // Форматируем: +7 (XXX) XXX-XX-XX
    if (digits.length === 0) return "";
    if (digits.length <= 1) return `+${digits}`;
    if (digits.length <= 4) return `+7 (${digits.slice(1)}`;
    if (digits.length <= 7) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4)}`;
    if (digits.length <= 9) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
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
      // Форматируем телефон для отправки
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
          result.error || result.message || "Ошибка при отправке заявки"
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
    <div className={styles.formWrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h3 className={styles.formTitle}>Свяжитесь с нами</h3>
        <p className={styles.formDescription}>
          Подберём дом под ваши даты, поможем с трансфером и ответим на все вопросы
        </p>

        {/* Сообщение об успехе/ошибке */}
        {submitStatus && (
          <div
            className={`${styles.statusMessage} ${
              submitStatus === "success" ? styles.success : styles.error
            }`}
          >
            {submitMessage}
          </div>
        )}

        {/* Поле Имя */}
        <div className={styles.field}>
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
            className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
            placeholder="Ваше имя"
          />
          {errors.name && (
            <span className={styles.errorText}>{errors.name.message}</span>
          )}
        </div>

        {/* Поле Телефон */}
        <div className={styles.field}>
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
                className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
                placeholder="+7 (999) 123-45-67"
              />
            )}
          />
          {errors.phone && (
            <span className={styles.errorText}>{errors.phone.message}</span>
          )}
        </div>

        {/* Поле Сообщение (опционально) */}
        <div className={styles.field}>
          <textarea
            {...register("message", {
              maxLength: {
                value: 500,
                message: "Максимум 500 символов",
              },
            })}
            className={`${styles.input} ${styles.textarea} ${errors.message ? styles.inputError : ""}`}
            placeholder="Ваше сообщение (необязательно)"
            rows={1}
          />
          {errors.message && (
            <span className={styles.errorText}>{errors.message.message}</span>
          )}
        </div>

        {/* Чекбокс согласия */}
        <div className={styles.field}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              {...register("agreement", {
                required: "Необходимо согласие на обработку данных",
              })}
              className={styles.checkbox}
            />
            <span className={styles.checkboxText}>
              Я согласен с{" "}
              <Link href="/politika" className={styles.link}>
                политикой обработки персональных данных
              </Link>
            </span>
          </label>
          {errors.agreement && (
            <span className={styles.errorText}>
              {errors.agreement.message}
            </span>
          )}
        </div>

        {/* Кнопка отправки */}
        <button
          type="submit"
          disabled={!canSubmit}
          className={`${styles.submitButton} ${!canSubmit ? styles.disabled : ""}`}
        >
          {isSubmitting ? (
            <span className={styles.loading}>
              <span className={styles.spinner}></span>
              Отправка...
            </span>
          ) : (
            "Отправить заявку"
          )}
        </button>
      </form>
    </div>
  );
}

