'use client';

import { useState } from 'react';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

// Отдельные элементы: каждая фотография и текст — свои сущности для удобного управления
const ACTION_IMAGES = [
  {
    src: '/images/actions/maslenitsa-1.jpg',
    alt: 'Масленица в Люди в уюте — фото 1',
  },
  {
    src: '/images/actions/maslenitsa-2.jpg',
    alt: 'Масленица в Люди в уюте — фото 2',
  },
];

const ACTION_TEXT = {
  title: 'Масленица в «Люди в уюте»',
  date: '22 февраля в 17:00',
  paragraphs: [
    '🥨 Гостевой комплекс «Люди в уюте» приглашает вас на яркий и душевный праздник Масленицы, который состоится 22 февраля в 17:00!',
    'Вас ждёт по-настоящему тёплый вечер с ароматными блинами, весёлыми играми, народными традициями и атмосферой настоящего русского гуляния. Мы будем провожать зиму, зазывать весну, смеяться, петь и создавать уютные воспоминания вместе.',
    'Это отличный повод провести время с семьёй и друзьями, зарядиться хорошим настроением и почувствовать радость живого общения.',
    '✨🥞🤌🏼 Приходите за теплом, вкусом и праздником — будем рады каждому!',
    'До встречи 22 февраля в 17:00. «Люди в уюте»!',
  ],
};

export default function ActionsBlock() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const goPrev = () =>
    setActiveCardIndex((i) => (i === 0 ? ACTION_IMAGES.length - 1 : i - 1));
  const goNext = () =>
    setActiveCardIndex((i) => (i === ACTION_IMAGES.length - 1 ? 0 : i + 1));

  // Фиксированный размер карт (как игральные): ширина × высота
  const CARD_WIDTH = 300;
  const CARD_HEIGHT = 400;

  return (
    <section className='actions-block bg-background pt-20 pb-8 px-3.75 text-(--accent-color)'>
      <div className='container max-w-300 mx-auto flex flex-col md:flex-row md:items-start md:justify-center gap-6 md:gap-50'>
        {/* Слева: колода на фоне сайта — карты фиксированного размера, крупнее */}
        <div className='flex flex-col items-center shrink-0'>
          <div
            className='relative overflow-visible'
            style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
          >
            {ACTION_IMAGES.map((item, i) => {
              const isActive = activeCardIndex === i;
              return (
                <button
                  key={i}
                  type='button'
                  onClick={() => !isActive && setActiveCardIndex(i)}
                  className={`block rounded-2xl overflow-hidden border-2 border-(--foreground) shadow-lg focus:outline-none focus:ring-2 focus:ring-(--accent-color)/50 cursor-pointer select-none ${
                    isActive
                      ? 'relative z-10 ring-2 ring-(--accent-color)/20 cursor-default'
                      : 'absolute inset-0 z-0 hover:z-[5]'
                  }`}
                  style={{
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT,
                    transition:
                      'transform 0.45s cubic-bezier(0.34, 1.2, 0.64, 1)',
                    transform: isActive
                      ? 'translateX(0) rotate(0deg) scale(1.12)'
                      : 'translateX(38%) rotate(45deg) scale(0.88)',
                  }}
                  aria-label={isActive ? undefined : `Показать фото ${i + 1}`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className='block w-full h-full object-cover bg-gray-100'
                  />
                </button>
              );
            })}
          </div>
          {/* Пагинация стрелками в стиле сайта */}
          <div className='flex items-center justify-center gap-3 mt-10'>
            <button
              type='button'
              onClick={goPrev}
              aria-label='Предыдущее фото'
              className='w-10 h-10 rounded-2xl bg-(--accent-color) text-white flex items-center justify-center shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-(--accent-color)/50 transition-opacity'
            >
              <GoChevronLeft className='w-6 h-6' />
            </button>
            <span className='text-(--accent-color) font-semibold text-sm min-w-[3rem] text-center'>
              {activeCardIndex + 1} / {ACTION_IMAGES.length}
            </span>
            <button
              type='button'
              onClick={goNext}
              aria-label='Следующее фото'
              className='w-10 h-10 rounded-2xl bg-(--accent-color) text-white flex items-center justify-center shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-(--accent-color)/50 transition-opacity'
            >
              <GoChevronRight className='w-6 h-6' />
            </button>
          </div>
        </div>

        {/* Текст в белом блоке, поближе к картам */}
        <div className='md:min-w-0 flex justify-center'>
          <div className='bg-(--foreground) rounded-3xl shadow-lg p-5 sm:p-6 w-full max-w-md md:max-w-xl md:min-w-[320px]'>
            <h3 className='text-lg sm:text-xl font-bold text-(--accent-color) mb-3'>
              {ACTION_TEXT.title}
            </h3>
            <p className='text-(--accent-color) font-semibold text-sm mb-2'>
              {ACTION_TEXT.date}
            </p>
            <div className='space-y-2 text-gray-700 text-sm sm:text-base leading-snug'>
              {ACTION_TEXT.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
