"use client";

import { useEffect, useState } from "react";

export default function PetPage() {
  const [isRulesOpen, setIsRulesOpen] = useState(false);

  useEffect(() => {
    if (!isRulesOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsRulesOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isRulesOpen]);

  return (
    <div className="bg-background mt-10 px-3.75">
      <div className="container max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 items-stretch pt-10 pb-16 lg:min-h-[560px]">
          {/* LEFT */}
          <div className="w-full lg:w-1/2 bg-white rounded-[32px] p-7 sm:p-10 h-full lg:min-h-[560px]">
            <h2 className="text-[18px] sm:text-[20px] font-semibold text-black mb-5 tracking-wide">
              ПРОЖИВАНИЕ С ПИТОМЦЕМ
            </h2>

            <div className="text-[15px] sm:text-[16px] leading-7 sm:leading-8 text-black/80 space-y-5 break-words hyphens-auto">
              <p className="max-w-[62ch]">
                Предлагаем начать ваш отдых с комфортом!
                <br />
                Мы разделяем вашу любовь к животным поэтому предлагаем
                комфортный отдых с питомцем в нашем гостевом комплексе «Люди в
                уюте».
              </p>

              <ul className="list-disc pl-6 space-y-2 max-w-[70ch]">
                <li>
                  <span className="font-semibold text-black">
                    Дополнительная плата
                  </span>{" "}
                  за размещение в доме питомца составляет 2000 рублей в сутки.
                </li>
                <li>
                  <span className="font-semibold text-black">Залог</span> 5000
                  рублей.
                </li>
                <li>
                  <span className="font-semibold text-black">
                    Разрешённый вес
                  </span>{" "}
                  до 5 кг.
                </li>
                <li>
                  Возможно проживание с питомцем более 5 кг по согласованию с
                  руководством комплекса.
                </li>
              </ul>

              <div className="pt-1">
                <p className="text-black font-medium mb-2">
                  Что взять с собой:
                </p>
                <ul className="list-disc pl-6 space-y-2 max-w-[70ch]">
                  <li>
                    справку от ветеринарного врача с отметкой о прививках или
                    вет.паспорт;
                  </li>
                  <li>ошейник, поводок, переноску.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4 lg:gap-5 h-full lg:min-h-[560px]">
            <div className="bg-white rounded-[32px] p-7 sm:p-9 flex-1">
              <p className="text-[15px] sm:text-[16px] leading-7 sm:leading-8 text-black/80 break-words hyphens-auto">
                Перед бронированием дома обязательно оповестите сотрудника
                отдела бронирования о породе своего питомца, его возрасте и
                размере. Уточните, не существует ли на данный момент каких-либо
                особых условий по его размещению (условия могут меняться в
                зависимости от распоряжения Администрации комплекса,
                действующего на момент бронирования). Увы, размещение с котами и
                кошками запрещено, хотя их мы тоже любим. Проживание возможно
                только с собаками.
              </p>
            </div>

            {/* OPEN MODAL */}
            <button
              type="button"
              onClick={() => setIsRulesOpen(true)}
              className="bg-white rounded-[32px] px-10 sm:px-12 py-10 text-center hover:shadow-md transition-shadow h-[140px]"
            >
              <span className="text-(--accent-color) font-extrabold tracking-wide leading-none  text-[22px] sm:text-[26px] md:text-[30px] lg:text-[28px] xl:text-[32px] cursor-pointer">
                ПОЛНЫЙ СПИСОК ПРАВИЛ
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {isRulesOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-3.75"
          role="dialog"
          aria-modal="true"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setIsRulesOpen(false);
          }}
        >
          {/* overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* content */}
          <div className="relative w-full max-w-3xl bg-white rounded-[32px] shadow-xl">
            <div className="flex items-start justify-between gap-4 p-6 sm:p-8 border-b border-black/10">
              <h3 className="text-[18px] sm:text-[20px] font-semibold text-black">
                Правила проживания с питомцами
              </h3>

              <button
                type="button"
                onClick={() => setIsRulesOpen(false)}
                aria-label="Закрыть"
                className="
    h-10 w-10
    rounded-full
    bg-black text-white
    hover:bg-black/70
    transition
    grid place-items-center
    leading-none
    shrink-0
    cursor-pointer
  "
              >
                <span className="text-[18px] leading-none">✕</span>
              </button>
            </div>

            <div className="p-6 sm:p-8 max-h-[70vh] overflow-auto">
              <div className="text-[15px] sm:text-[16px] leading-7 sm:leading-8 text-black/80 space-y-5 break-words hyphens-auto">
                <p className="font-medium text-black">
                  При проживании на территории комплекса с домашними животными
                  запрещается:
                </p>

                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    вычесывать и мыть домашних животных в душевых кабинах,
                    использовать полотенца, простыни и другие постельные
                    принадлежности, принадлежащие гостевому комплексу;
                  </li>
                  <li>
                    выгуливать домашних животных на территории, не
                    предназначенной для выгула;
                  </li>
                  <li>
                    оставлять продукты жизнедеятельности питомца неубранными
                    после выгула;
                  </li>
                  <li>
                    кормить домашних животных из посуды, принадлежащей гостевому
                    комплексу;
                  </li>
                  <li>
                    оставлять домашних животных без присмотра хозяев в доме и на
                    территории комплекса;
                  </li>
                </ul>

                <div className="space-y-3">
                  <p className="font-medium text-black">
                    Гость несёт ответственность:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      за решение проблем питания, чистки, выгула животного;
                    </li>
                    <li>за порчу имущества комплекса животными;</li>
                    <li>
                      за все риски, связанные и исходящие из поведения
                      животного, а также времени и условий его нахождения в доме
                      и на территории гостевого комплекса;
                    </li>
                    <li>за уборку продуктов жизнедеятельности животного.</li>
                  </ul>
                </div>

                <p>
                  Гостевой комплекс оставляет за собой право расторгнуть
                  соглашение с Гостем, проживающим с домашними животными в
                  случае нарушения правил проживания и/или агрессивного,
                  неадекватного, шумного поведения домашнего животного.
                </p>

                <p>
                  В стоимость проживания питомца входит: клетка, лежанка и миска
                  по запросу.
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 pt-0 flex justify-end">
              <button
                type="button"
                onClick={() => setIsRulesOpen(false)}
                className="bg-(--accent-color) text-white font-semibold rounded-full px-8 py-3 hover:opacity-90 transition cursor-pointer"
              >
                Понятно
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
