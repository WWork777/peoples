"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdditionalServices() {
  const router = useRouter();
  const addServ = [
    {
      id: 1,
      title: "ТРАНСФЕР",
      img: "/images/additional/1.png",
      src1: "/services/transfer",
      src2: "/#widget",
      description:
        "Поможем купить авиабилеты, организовать трансфер и встречу в аэропорту.",
    },
    {
      id: 2,
      title: "ИНСТРУКТОР",
      img: "/images/additional/2.png",
      src1: "/services/instructor",
      src2: "/#widget",
      description:
        "Профессиональные инструктора помогут освоить новые навыки и техники.",
    },
    {
      id: 3,
      title: "ПРОЖИВАНИЕ\nС ЖИВОТНЫМИ",
      img: "/images/additional/3.png",
      src1: "/services/pet",
      src2: "/#widget",
      description:
        "Уютное проживание вместе с вашими питомцами, без лишних забот.",
    },
    {
      id: 4,
      title: "КОФЕЙНЯ",
      img: "/images/additional/4.png",
      src1: "/services/coffee",
      src2: "/#widget",
      description: "Свежий кофе, десерты и приятная атмосфера для отдыха.",
    },
    {
      id: 5,
      title: "ПРОКАТ",
      img: "/images/additional/5.png",
      src1: "/services/rental",
      src2: "/#widget",
      description: "Прокат оборудования и снаряжения для комфортного отдыха.",
    },
    {
      id: 6,
      title: "ПРОЖИВАНИЕ\nС ДЕТЬМИ",
      img: "/images/additional/6.png",
      src1: "/services/children",
      src2: "/#widget",
      description:
        "Удобные условия для отдыха с детьми и развлечения для всей семьи.",
    },
    {
      id: 7,
      title: "УБОРКА",
      img: "/images/additional/7.png",
      src1: "/services/cleaning",
      src2: "/#widget",
      description:
        "Профессиональная уборка номеров и территории для вашего комфорта.",
    },
    {
      id: 8,
      title: "ДОСТАВКА ЕДЫ",
      img: "/images/additional/8.png",
      src1: "/services/delivery",
      src2: "/#widget",
      description:
        "Быстрая доставка еды прямо к вашему номеру или месту отдыха.",
    },
  ];

  const handleCardClick = (href) => {
    router.push(href);
  };

  return (
    <section id="additional" className="additional-services">
      <div className="container max-w-360 mx-auto px-3.75">
        <h2 className="text-(--accent-color) text-[25px] sm:text-[32px] font-bold text-center">
          ДОПОЛНИТЕЛЬНЫЕ УСЛУГИ
        </h2>
        <h3 className="text-(--accent-color) font-medium text-center">
          ЧТОБЫ ОТДЫХ БЫЛ ЕЩЕ ПРИЯТНЕЕ
        </h3>
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 py-10">
          {addServ.map((item, i) => (
            <div
              key={i}
              className="group text-white rounded-3xl flex flex-col 
							shadow-lg transition-all duration-300 hover:scale-[1.02] 
							hover:shadow-2xl hover:border hover:border-(--accent-color)/20 
							cursor-pointer relative min-h-105 overflow-hidden"
              onClick={() => handleCardClick(item.src1)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleCardClick(item.src1);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Перейти к услуге: ${item.title}`}
            >
              {/* Фоновое изображение */}
              <div className="absolute inset-0">
                <img
                  className="w-full h-full object-cover rounded-3xl group-hover:scale-105 transition-transform duration-300"
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                />
              </div>

              {/* Затемнение и контент */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-black/10 rounded-3xl flex flex-col justify-between p-5 z-10">
                {/* Кнопка "Выбрать дату" */}
                <div className="flex justify-end">
                  <Link
                    href={item.src2}
                    onClick={(e) => e.stopPropagation()}
                    className="z-20 relative"
                  >
                    <button
                      className="bg-white text-(--accent-color) px-8 py-2 font-bold rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Выбрать дату
                    </button>
                  </Link>
                </div>

                {/* Контент карточки */}
                <div>
                  <h4
                    style={{ whiteSpace: "pre-line" }}
                    className="text-[23px] leading-7 font-bold pb-2"
                  >
                    {item.title}
                  </h4>
                  <p className="text-white/90 text-sm mb-3">
                    {item.description}
                  </p>
                  <button
                    className="bg-(--accent-color) text-white px-8 py-2 font-bold rounded-2xl cursor-pointer hover:bg-(--accent-color)/90 transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(item.src1);
                    }}
                  >
                    Подробнее
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
