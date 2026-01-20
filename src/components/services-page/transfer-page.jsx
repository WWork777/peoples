"use client";

import { useEffect, useMemo, useState } from "react";

function formatRuPhone(digits) {
  const d = digits.replace(/\D/g, "").slice(0, 11);
  let n = d;
  if (n.startsWith("8")) n = "7" + n.slice(1);
  if (n.startsWith("9")) n = "7" + n;

  const a = n.slice(1, 4);
  const b = n.slice(4, 7);
  const c = n.slice(7, 9);
  const e = n.slice(9, 11);

  let out = "+7";
  if (a) out += ` (${a}`;
  if (a.length === 3) out += ")";
  if (b) out += ` ${b}`;
  if (c) out += `-${c}`;
  if (e) out += `-${e}`;

  return { formatted: out, digits: n };
}

function OrderServiceModal({ isOpen, onClose, defaultService = "transfer" }) {
  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
    phoneDigits: "7",
    transfer: false,
    rent: false,
  });

  // ✅ для анимации: держим компонент смонтированным при закрытии
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  // открытие/закрытие с задержкой размонтирования
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      setVisible(false);

      // ✅ двойной rAF гарантирует отдельный paint
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });

      return;
    }

    setVisible(false);
    const t = setTimeout(() => setMounted(false), 240);
    return () => clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    setForm((prev) => ({
      ...prev,
      transfer: defaultService === "transfer",
      rent: defaultService === "rent",
    }));
  }, [isOpen, defaultService]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  const canSubmit = useMemo(() => {
    const hasService = form.transfer || form.rent;
    const phoneOk = form.phoneDigits.replace(/\D/g, "").length === 11;
    return form.email.trim() && form.name.trim() && phoneOk && hasService;
  }, [form]);

  const update = (key) => (e) => {
    const value =
      e?.target?.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((p) => ({ ...p, [key]: value }));
  };

  const onPhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "");
    const { formatted, digits } = formatRuPhone(digitsOnly);
    setForm((p) => ({ ...p, phone: formatted, phoneDigits: digits }));
  };

  const onPhonePaste = (e) => {
    const text = (e.clipboardData || window.clipboardData).getData("text");
    const { formatted, digits } = formatRuPhone(text);
    e.preventDefault();
    setForm((p) => ({ ...p, phone: formatted, phoneDigits: digits }));
  };

  const submit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    console.log("submit:", {
      email: form.email,
      name: form.name,
      phone: form.phoneDigits,
      transfer: form.transfer,
      rent: form.rent,
    });

    onClose();
  };

  const inputBase =
    "w-full h-12 border border-black/20 px-4 outline-none " +
    "text-black bg-white placeholder:text-black/40 " +
    "focus:border-black/40";

  // ✅ если уже закрыто и анимация завершена — не рендерим
  if (!mounted) return null;

  return (
    <div
      className={[
        "fixed inset-0 z-[9999] flex items-center justify-center px-3.75",
        "transition-opacity duration-200",
        visible ? "opacity-100" : "opacity-0",
      ].join(" ")}
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* overlay */}
      <div
        className={[
          "absolute inset-0 bg-black/50",
          "transition-opacity duration-200",
          visible ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />

      {/* content */}
      <div
        className={[
          "relative w-full max-w-[560px] bg-white shadow-2xl",
          "transition-all duration-200 ease-out",
          visible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-2 scale-[0.98]",
        ].join(" ")}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute right-4 cursor-pointer top-4 h-10 w-10 rounded-full flex items-center justify-center hover:bg-black/5 transition"
        >
          <span className="text-[22px] leading-none text-black">×</span>
        </button>

        <div className="px-6 sm:px-10 pt-10 pb-8">
          <h3 className="text-[28px] sm:text-[34px] font-bold text-center text-black">
            Заказать услугу
          </h3>
          <p className="text-center text-black/60 mt-2">
            Заполните форму и мы с вами свяжемся
          </p>

          <form className="mt-8 space-y-4" onSubmit={submit}>
            <input
              value={form.email}
              onChange={update("email")}
              placeholder="Email"
              type="email"
              className={inputBase}
            />

            <input
              value={form.name}
              onChange={update("name")}
              placeholder="Имя"
              type="text"
              className={inputBase}
            />

            <input
              value={form.phone}
              onChange={onPhoneChange}
              onPaste={onPhonePaste}
              placeholder="+7 (___) ___-__-__"
              type="tel"
              inputMode="tel"
              className={inputBase}
            />

            <div className="pt-2">
              <p className="text-black text-[16px] mb-2">Вид услуги</p>

              <label className="flex items-center gap-2 text-black/80 mb-2">
                <input
                  type="checkbox"
                  checked={form.transfer}
                  onChange={update("transfer")}
                  className="h-4 w-4 accent-[#0E4B3B]"
                />
                Трансфер
              </label>

              <label className="flex items-center gap-2 text-black/80">
                <input
                  type="checkbox"
                  checked={form.rent}
                  onChange={update("rent")}
                  className="h-4 w-4 accent-[#0E4B3B]"
                />
                Аренда автомобиля
              </label>
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full h-12 cursor-pointer bg-(--accent-color) text-white font-semibold mt-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function TransferPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultService, setDefaultService] = useState("transfer");

  const openModal = (service) => {
    setDefaultService(service);
    setIsOpen(true);
  };

  return (
    <>
      <div className="bg-background mt-10 px-3.75">
        <div className="container max-w-7xl mx-auto">
          <h2 className="text-(--accent-color) text-[25px] sm:text-[32px] font-bold text-center pt-10">
            ТРАНСФЕР
          </h2>
          <h3 className="text-(--accent-color) font-medium text-center pt-10">
            Предлагаем начать ваш отдых с комфортом!
          </h3>
        </div>

        <div className="container max-w-7xl mx-auto flex flex-col md:flex-row gap-5 py-10">
          <div className="w-full md:w-1/2">
            <span className="text-[26px] text-(--accent-color) font-medium leading-7 pb-[24px] block">
              ТРАНСФЕР ИЗ АЭРОПОРТА <br /> ДО ГОСТЕВОГО <br /> КОМПЛЕКСА
            </span>
            <p className="text-[18px] text-black md:max-w-[75%] pb-[30px] font-light">
              Наш водитель встретит вас с табличкой сразу после выхода из зоны
              прилета, позаботится и учтет ваши потребности и пожелания. <br />{" "}
              Мы всегда на связи, чтобы, при необходимости, сопровождать вас
              даже онлайн. Задержка или отмена вашего рейса не станет проблемой,
              мы оперативно скорректируем время подачи трансфера и доставим вас
              к месту отдыха с максимальным комфортом и безопасностью
            </p>

            <button
              type="button"
              onClick={() => openModal("transfer")}
              className="bg-(--accent-color) px-16 py-2 rounded-3xl cursor-pointer mx-auto block"
            >
              Заказать
            </button>
          </div>

          <div className="w-full md:w-1/2">
            <div className="h-[340px] max-w-[560px] mx-auto">
              <img
                src="/images/additional/1.png"
                alt="transfer"
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
          </div>
        </div>

        <div className="container max-w-7xl mx-auto flex flex-col md:flex-row gap-5 py-20">
          <div className="w-full md:w-1/2">
            <div className="h-[340px] max-w-[560px] mx-auto">
              <img
                src="/images/additional/11.png"
                alt="transfer"
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <span className="text-[26px] text-(--accent-color) font-medium leading-7 pb-[24px] block">
              ПРОКАТ АВТОМОБИЛЯ
            </span>
            <p className="text-[18px] text-black md:max-w-[75%] pb-[30px] font-light">
              Если вы предпочитаете передвигаться самостоятельно, к вашим
              услугам современные подготовленные к зимним условиям автомобили.
              Старт проката может быть как непосредственно из аэропорта, так и
              по месту требования. Опция проката авто доступна сроком от суток и
              только по Кемеровской области. Мы открыты к вашим пожеланиям и,
              если потребуется, сможем найти индивидуальные решения.
            </p>

            <button
              type="button"
              onClick={() => openModal("rent")}
              className="bg-(--accent-color) px-16 py-2 rounded-3xl cursor-pointer mx-auto block"
            >
              Заказать
            </button>
          </div>
        </div>
      </div>

      <OrderServiceModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        defaultService={defaultService}
      />
    </>
  );
}
