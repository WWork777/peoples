"use client";

import { useState, useRef, useEffect } from "react";

export default function Quiz() {
  const [step, setStep] = useState(0); // 0 - приветственный экран
  const [direction, setDirection] = useState("next");
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);

  // Состояния для отправки формы
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");

  const [form, setForm] = useState({
    dates: "",
    guests: 1,
    kids: null,
    animals: null,
    transfer: false,
    instructor: false,
    equipment: false,
    excursions: false,
    name: "",
    phone: "",
    contactMethod: "",
  });

  const [errors, setErrors] = useState({
    dates: "",
  });

  // Функция для обновления высоты контента
  const updateContentHeight = () => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.offsetHeight);
    }
  };

  // Обновляем высоту при изменении шага или данных формы
  useEffect(() => {
    updateContentHeight();

    // Добавляем небольшой таймаут для корректного измерения после рендера
    const timer = setTimeout(updateContentHeight, 50);
    return () => clearTimeout(timer);
  }, [
    step,
    form.guests,
    form.dates,
    form.kids,
    form.animals,
    form.transfer,
    form.instructor,
    form.equipment,
    form.excursions,
    form.name,
    form.phone,
    form.contactMethod,
  ]);

  const startQuiz = () => {
    setStep(1);
  };

  const next = () => {
    // Валидация перед переходом
    if (step === 1) {
      if (!validateDates()) {
        return;
      }
    }
    setDirection("next");
    setStep(step + 1);
  };

  const back = () => {
    setDirection("prev");
    setStep(step - 1);
  };

  const basePrice = 5000;
  const pricePerDay = 14000; // Средняя стоимость за день

  // Функция для валидации дат
  const validateDates = () => {
    if (!form.dates || form.dates.trim() === "") {
      setErrors({ ...errors, dates: "Укажите желаемые даты" });
      return false;
    }

    // Очищаем от лишних пробелов в начале и конце
    const trimmedDates = form.dates.trim();

    // Более гибкое регулярное выражение - допускает пробелы вокруг тире и в конце
    const datePattern = /^\s*(\d{1,2})\s*[-–—]\s*(\d{1,2})\s+([а-яА-Я]+)\s*$/;
    const match = trimmedDates.match(datePattern);

    if (!match) {
      setErrors({
        ...errors,
        dates: "Введите даты в формате: 10–15 января",
      });
      return false;
    }

    const start = parseInt(match[1]);
    const end = parseInt(match[2]);
    const month = match[3];

    // Проверка на валидность месяца
    const validMonths = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];

    if (!validMonths.includes(month.toLowerCase())) {
      setErrors({
        ...errors,
        dates: "Введите корректное название месяца",
      });
      return false;
    }

    if (end <= start) {
      setErrors({
        ...errors,
        dates: "Дата выезда должна быть позже даты заезда",
      });
      return false;
    }

    if (start < 1 || start > 31 || end < 1 || end > 31) {
      setErrors({
        ...errors,
        dates: "Введите корректные числа месяца (1-31)",
      });
      return false;
    }

    // Сохраняем очищенную версию в form
    if (trimmedDates !== form.dates) {
      setForm({ ...form, dates: trimmedDates });
    }

    // Очищаем ошибку если все хорошо
    setErrors({ ...errors, dates: "" });
    return true;
  };

  // Валидация при изменении поля дат
  const handleDateChange = (value) => {
    setForm({ ...form, dates: value });

    // Очищаем ошибку при вводе
    if (errors.dates) {
      setErrors({ ...errors, dates: "" });
    }
  };

  // Функция для расчета количества дней из строки с датами
  const calculateNights = (dateString) => {
    if (!dateString) return 0;

    // Очищаем от пробелов
    const trimmed = dateString.trim();

    // Пытаемся извлечь числа из строки типа "10–15 января"
    const numbers = trimmed.match(/\d+/g);
    if (numbers && numbers.length >= 2) {
      const start = parseInt(numbers[0]);
      const end = parseInt(numbers[1]);
      if (end > start) {
        return end - start;
      }
    }
    return 0;
  };

  const nights = calculateNights(form.dates);
  const totalByDays = nights * pricePerDay;

  const total =
    basePrice * form.guests +
    (form.transfer ? 3000 : 0) +
    (form.instructor ? 4000 : 0) +
    (form.equipment ? 2000 * form.guests : 0) +
    (form.excursions ? 2500 * form.guests : 0) +
    totalByDays;

  // Функция для форматирования номера телефона
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

  // Функция отправки формы
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage("");

    try {
      const cleanedPhone = form.phone.replace(/\D/g, "");
      const formattedPhone = `+${cleanedPhone}`;

      // Формируем сообщение с деталями квиза
      const kidsText =
        form.kids === true ? "Да" : form.kids === false ? "Нет" : "Не указано";
      const animalsText =
        form.animals === true
          ? "Да"
          : form.animals === false
            ? "Нет"
            : "Не указано";
      const transferText = form.transfer ? "Да" : "Нет";
      const instructorText = form.instructor ? "Да" : "Нет";
      const equipmentText = form.equipment ? "Да" : "Нет";
      const excursionsText = form.excursions ? "Да" : "Нет";

      const formData = {
        name: form.name.trim(),
        phone: formattedPhone,
        email: "",
        message: `
📋 РЕЗУЛЬТАТЫ КВИЗА:

📅 Даты: ${form.dates || "Не указаны"} (${nights} ${nights === 1 ? "ночь" : nights < 5 ? "ночи" : "ночей"})
👥 Гостей: ${form.guests}
👶 С детьми: ${kidsText}
🐕 С животными: ${animalsText}
🚐 Трансфер: ${transferText}
🏂 Инструктор: ${instructorText}
⛷️ Экипировка: ${equipmentText}
🏔️ Экскурсии: ${excursionsText}

💰 Итоговая стоимость: ${total.toLocaleString()} ₽
        `.trim(),
        call: form.contactMethod === "call",
        write: form.contactMethod === "write",
        formId: "quiz-form",
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

        // Сбрасываем форму
        setForm({
          dates: "",
          guests: 1,
          kids: null,
          animals: null,
          transfer: false,
          instructor: false,
          equipment: false,
          excursions: false,
          name: "",
          phone: "",
          contactMethod: "",
        });

        // Возвращаемся на приветственный экран
        setTimeout(() => {
          setStep(0);
          setSubmitStatus(null);
          setSubmitMessage("");
        }, 3000);
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
    <div className="max-w-3xl mx-auto relative py-10 px-2 sm:px-6 lg:px-8">
      <div className="relative bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
        {/* Акцентная полоса сверху */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#004530] via-[#004530]/60 to-transparent"></div>

        {/* Хедер с прогрессом (показываем только если не на приветственном экране) */}
        {step > 0 && (
          <div className="px-6 pt-6 pb-2 border-b border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Квиз • подбор тура
              </span>
              <span className="text-xs font-medium text-[#004530] bg-[#004530]/5 px-3 py-1 rounded-full">
                Шаг {step} из 6
              </span>
            </div>

            {/* Прогресс-бар */}
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#004530] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(step / 6) * 100}%` }}
              ></div>
            </div>

            {/* Заголовок */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-4 mb-1">
              {step === 1 && "Планируете поездку?"}
              {step === 2 && "Путешествуете с детьми?"}
              {step === 3 && "Берёте питомцев?"}
              {step === 4 && "Нужен трансфер?"}
              {step === 5 && "Дополнительные услуги"}
              {step === 6 && "Почти готово!"}
            </h2>
            <p className="text-sm text-gray-500">
              {step === 1 && "Расскажите о базовых планах"}
              {step === 2 && "Подберём комфортное жильё"}
              {step === 3 && "Учтём особенности размещения"}
              {step === 4 && "Организуем комфортный переезд"}
              {step === 5 && "Сделаем отдых насыщеннее"}
              {step === 6 && "Осталось только оставить контакты"}
            </p>
          </div>
        )}

        {/* Сообщение об успехе/ошибке */}
        {submitStatus && (
          <div className="px-6 pt-4">
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
          </div>
        )}

        {/* Контент с фиксированной высотой */}
        <div
          className="p-6 transition-all duration-300 ease-in-out"
          style={{ minHeight: contentHeight ? `${contentHeight}px` : "auto" }}
        >
          {/* Обертка для измерения высоты */}
          <div ref={contentRef}>
            {/* ПРИВЕТСТВЕННЫЙ ЭКРАН */}
            {step === 0 && (
              <div className="text-center space-y-6 py-8 animate-fadeIn">
                {/* Иконка/лого */}
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-[#004530]/10 rounded-3xl flex items-center justify-center">
                    <span className="text-4xl">🏔️</span>
                  </div>
                </div>

                {/* Заголовок */}
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Гостевой комплекс
                  </h2>
                  <p className="text-[#004530] font-medium text-lg">
                    Люди в уюте
                  </p>
                </div>

                {/* Описание */}
                <p className="text-gray-600 max-w-md mx-auto">
                  Ответьте на 6 вопросов и получите примерную стоимость вашего
                  отдыха в Шерегеше
                </p>

                {/* Преимущества
                <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                  {[
                    "🏔️ Вид на горы",
                    "🔥 Своя баня",
                    "🅿️ Парковка",
                    "🌲 В лесу",
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 rounded-xl p-2 text-sm text-gray-600"
                    >
                      {item}
                    </div>
                  ))}
                </div> */}

                {/* Кнопка старта */}
                <button
                  onClick={startQuiz}
                  className="px-8 py-4 bg-[#004530] text-white font-medium rounded-xl hover:bg-[#003520] transition-all shadow-lg shadow-[#004530]/20 inline-flex items-center gap-2 cursor-pointer"
                >
                  Начать подбор
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>

                {/* Доверие */}
                <p className="text-xs text-gray-400">
                  Это займет меньше 2 минут
                </p>
              </div>
            )}

            {/* STEP 1 - С ВАЛИДАЦИЕЙ */}
            {step === 1 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    📅 Желаемые даты
                  </label>
                  <input
                    type="text"
                    placeholder="Например: 10–15 января"
                    className={`w-full border p-3.5 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 transition-all cursor-pointer ${
                      errors.dates
                        ? "border-red-300 bg-red-50/50 focus:border-red-400 focus:ring-red-400/20"
                        : form.dates && !errors.dates
                          ? "border-[#004530] bg-[#004530]/5"
                          : "border-gray-200 bg-gray-50/50 focus:border-[#004530] focus:ring-[#004530]/20"
                    }`}
                    value={form.dates}
                    onChange={(e) => handleDateChange(e.target.value)}
                    onBlur={validateDates}
                  />

                  {/* Подсказка по формату */}
                  {!form.dates && (
                    <p className="text-xs text-gray-400 mt-1">
                      Формат: день–день месяц (например: 10–15 января)
                    </p>
                  )}

                  {/* Ошибка валидации */}
                  {errors.dates && (
                    <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {errors.dates}
                    </p>
                  )}

                  {/* Информация о выбранных датах (только если нет ошибки) */}
                  {form.dates && !errors.dates && (
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-gray-500 flex items-center gap-1">
                        <svg
                          className="w-4 h-4 text-[#004530]"
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
                        {nights > 0
                          ? `${nights} ${nights === 1 ? "ночь" : nights < 5 ? "ночи" : "ночей"}`
                          : "Укажите корректные даты"}
                      </span>
                      <span className="text-[#004530] font-medium">
                        ≈ {pricePerDay.toLocaleString()} ₽/день
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    👥 Количество гостей
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        setForm({
                          ...form,
                          guests: Math.max(1, form.guests - 1),
                        })
                      }
                      className="w-10 h-10 rounded-xl border border-gray-200 text-gray-600 hover:border-[#004530] hover:text-[#004530] hover:bg-[#004530]/5 transition-all cursor-pointer"
                    >
                      −
                    </button>
                    <span className="flex-1 text-center font-medium text-gray-900">
                      {form.guests}
                    </span>
                    <button
                      onClick={() =>
                        setForm({ ...form, guests: form.guests + 1 })
                      }
                      className="w-10 h-10 rounded-xl border border-gray-200 text-gray-600 hover:border-[#004530] hover:text-[#004530] hover:bg-[#004530]/5 transition-all cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: true, label: "Да", emoji: "👶" },
                    { value: false, label: "Нет", emoji: "👤" },
                  ].map((option) => (
                    <button
                      key={option.label}
                      onClick={() => setForm({ ...form, kids: option.value })}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        form.kids === option.value
                          ? "border-[#004530] bg-[#004530]/5 text-[#004530]"
                          : "border-gray-100 bg-gray-50/50 text-gray-700 hover:border-gray-200 hover:bg-gray-100/50"
                      }`}
                    >
                      <span className="block text-2xl mb-1">
                        {option.emoji}
                      </span>
                      <span className="font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: true, label: "Да", emoji: "🐕" },
                    { value: false, label: "Нет", emoji: "🚫" },
                  ].map((option) => (
                    <button
                      key={option.label}
                      onClick={() =>
                        setForm({ ...form, animals: option.value })
                      }
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        form.animals === option.value
                          ? "border-[#004530] bg-[#004530]/5 text-[#004530]"
                          : "border-gray-100 bg-gray-50/50 text-gray-700 hover:border-gray-200 hover:bg-gray-100/50"
                      }`}
                    >
                      <span className="block text-2xl mb-1">
                        {option.emoji}
                      </span>
                      <span className="font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div className="space-y-4 animate-fadeIn">
                <button
                  onClick={() => setForm({ ...form, transfer: !form.transfer })}
                  className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                    form.transfer
                      ? "border-[#004530] bg-[#004530]/5"
                      : "border-gray-100 bg-gray-50/50 hover:border-gray-200 hover:bg-gray-100/50"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">🚐</span>
                    <span className="font-medium text-gray-900">
                      Заказать трансфер
                    </span>
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      form.transfer
                        ? "border-[#004530] bg-[#004530]"
                        : "border-gray-300"
                    }`}
                  >
                    {form.transfer && (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </button>
                <p className="text-sm text-gray-500 ml-2">
                  +3 000 ₽ к стоимости
                </p>
              </div>
            )}

            {/* STEP 5 */}
            {step === 5 && (
              <div className="space-y-4 animate-fadeIn">
                {[
                  {
                    key: "instructor",
                    label: "Инструктор",
                    emoji: "🏂",
                    price: "+4 000 ₽",
                  },
                  {
                    key: "equipment",
                    label: "Аренда экипировки",
                    emoji: "⛷️",
                    price: `+2 000 ₽ × ${form.guests} чел`,
                  },
                  {
                    key: "excursions",
                    label: "Экскурсии",
                    emoji: "🏔️",
                    price: `+2 500 ₽ × ${form.guests} чел`,
                  },
                ].map((service) => (
                  <button
                    key={service.key}
                    onClick={() =>
                      setForm({ ...form, [service.key]: !form[service.key] })
                    }
                    className={`w-full p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      form[service.key]
                        ? "border-[#004530] bg-[#004530]/5"
                        : "border-gray-100 bg-gray-50/50 hover:border-gray-200 hover:bg-gray-100/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{service.emoji}</span>
                        <span className="font-medium text-gray-900">
                          {service.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">
                          {service.price}
                        </span>
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            form[service.key]
                              ? "border-[#004530] bg-[#004530]"
                              : "border-gray-300"
                          }`}
                        >
                          {form[service.key] && (
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* STEP 6 */}
            {step === 6 && (
              <div className="space-y-5 animate-fadeIn">
                {/* Итоговая стоимость с детализацией */}
                <div className="bg-gradient-to-br from-[#004530]/5 to-transparent p-5 rounded-xl border border-[#004530]/10">
                  <p className="text-sm text-gray-600 mb-1">
                    Примерная стоимость
                  </p>
                  <p className="text-3xl font-bold text-[#004530]">
                    {total.toLocaleString()} ₽
                  </p>

                  {/* Детализация */}
                  <div className="mt-3 space-y-1 text-xs text-gray-500">
                    {nights > 0 && (
                      <div className="flex justify-between">
                        <span>
                          Проживание ({nights}{" "}
                          {nights === 1
                            ? "ночь"
                            : nights < 5
                              ? "ночи"
                              : "ночей"}{" "}
                          × {pricePerDay.toLocaleString()} ₽)
                        </span>
                        <span>{totalByDays.toLocaleString()} ₽</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>
                        Базовый тариф ({form.guests}{" "}
                        {form.guests === 1
                          ? "гость"
                          : form.guests < 5
                            ? "гостя"
                            : "гостей"}
                        )
                      </span>
                      <span>
                        {(basePrice * form.guests).toLocaleString()} ₽
                      </span>
                    </div>
                    {form.transfer && (
                      <div className="flex justify-between">
                        <span>Трансфер</span>
                        <span>3 000 ₽</span>
                      </div>
                    )}
                    {form.instructor && (
                      <div className="flex justify-between">
                        <span>Инструктор</span>
                        <span>4 000 ₽</span>
                      </div>
                    )}
                    {form.equipment && (
                      <div className="flex justify-between">
                        <span>Экипировка</span>
                        <span>{(2000 * form.guests).toLocaleString()} ₽</span>
                      </div>
                    )}
                    {form.excursions && (
                      <div className="flex justify-between">
                        <span>Экскурсии</span>
                        <span>{(2500 * form.guests).toLocaleString()} ₽</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    *окончательная цена зависит от сезона и наличия
                  </p>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    className="w-full border border-gray-200 bg-gray-50/50 p-3.5 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#004530] focus:ring-1 focus:ring-[#004530]/20 transition-all cursor-pointer"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />

                  <input
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    className="w-full border border-gray-200 bg-gray-50/50 p-3.5 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#004530] focus:ring-1 focus:ring-[#004530]/20 transition-all cursor-pointer"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: formatPhone(e.target.value) })
                    }
                  />

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-3">
                      Как с вами связаться?
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: "call", label: "📞 Позвонить" },
                        { value: "write", label: "✉️ Написать" },
                      ].map((method) => (
                        <button
                          key={method.value}
                          onClick={() =>
                            setForm({ ...form, contactMethod: method.value })
                          }
                          className={`p-3 rounded-xl border-2 transition-all cursor-pointer ${
                            form.contactMethod === method.value
                              ? "border-[#004530] bg-[#004530]/5 text-[#004530]"
                              : "border-gray-100 bg-gray-50/50 text-gray-700 hover:border-gray-200 hover:bg-gray-100/50"
                          }`}
                        >
                          {method.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="mt-1 w-4 h-4 rounded border-gray-300 text-[#004530] focus:ring-[#004530]/20 cursor-pointer"
                    />
                    <span className="text-xs text-gray-600">
                      Я согласен с{" "}
                      <a
                        href="/politika"
                        className="text-[#004530] font-medium hover:underline cursor-pointer"
                      >
                        политикой обработки данных
                      </a>
                    </span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Навигация (показываем только если не на приветственном экране) */}
        {step > 0 && (
          <div className="px-6 pb-6 pt-2 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <button
                onClick={back}
                disabled={step === 1 || isSubmitting}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 cursor-pointer ${
                  step === 1 || isSubmitting
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-600 hover:text-[#004530] hover:bg-[#004530]/5"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Назад
              </button>

              {step < 6 ? (
                <button
                  onClick={next}
                  disabled={
                    (step === 1 && (!form.dates || errors.dates)) ||
                    (step === 2 && form.kids === null) ||
                    (step === 3 && form.animals === null) ||
                    isSubmitting
                  }
                  className={`px-6 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 cursor-pointer ${
                    (step === 1 && (!form.dates || errors.dates)) ||
                    (step === 2 && form.kids === null) ||
                    (step === 3 && form.animals === null) ||
                    isSubmitting
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-[#004530] text-white hover:bg-[#003520] shadow-lg shadow-[#004530]/20"
                  }`}
                >
                  Далее
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={
                    !form.name ||
                    !form.phone ||
                    !form.contactMethod ||
                    isSubmitting
                  }
                  className={`px-6 py-2.5 rounded-xl font-medium transition-all cursor-pointer ${
                    !form.name ||
                    !form.phone ||
                    !form.contactMethod ||
                    isSubmitting
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-[#004530] text-white hover:bg-[#003520] shadow-lg shadow-[#004530]/20"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
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
                    "Отправить заявку"
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
