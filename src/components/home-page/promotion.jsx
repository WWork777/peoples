'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Promotion() {
	// Состояние для управления показом уведомления
	const [copied, setCopied] = useState(false)

	// Добавили поле `code` к карточкам, где есть промокод
	const promo = [
		// {
		//   title: "Праздничные выходные",
		//   desc: "В период с 9 по 13 марта Скидка 15%! \n\n Укажите промокод в виджете на сайте или назовите администратору у стойки: \n\n ХОЧУВЫХОДНЫЕ",
		//   period: "До 30 ноября 2024 года",
		//   icon: "📅",
		//   color: "bg-blue-50 border-blue-200",
		//   code: "ХОЧУВЫХОДНЫЕ",
		// },
		{
			title: 'Будний день со скидкой 🎁',
			desc: 'С воскресенья по среду — скидка 10% на проживание. \n\n Укажите промокод в виджете на сайте или назовите администратору у стойки: \n\n ХОЧУБУДНИ',
			period: 'Скидка до 30% + бонусы',
			icon: '⛰️',
			color: 'bg-orange-50 border-orange-200',
			code: 'ХОЧУБУДНИ',
		},
		{
			title: 'Ваш праздник — наш подарок!',
			desc: 'Проведите свой день рождения в кругу близких в уютном номере с видом на горы.\nА для пар, которые недавно соединили свои сердца, у нас тоже есть подарок. \n ✅ Скидка 10% на любой период проживания.\n✅ При заезде в течение 7 дней до или после даты рождения/свадьбы.\nУкажите промокод в виджете на сайте или назовите администратору у стойки: \n\n ХОЧУПРАЗДНИК',
			period: 'Программа лояльности',
			icon: '🎁',
			color: 'bg-purple-50 border-purple-200',
			code: 'ХОЧУПРАЗДНИК',
		},
		{
			title: 'Раннее бронирование',
			desc: ' 🏞 Твои идеальные каникулы: Солнце, горы и тёплый бассейн \n✔️ Прогулки по экотропам к скалам «Верблюды» и горе Зелёная \n✔️ Купание в подогреваемом бассейне \n✔️ Походы с хаски, катание на лошадях, квадроциклы, сплавы и рыбалка на горном озере \n✔️ Ретриты, девичьи посиделки, лагерь для взрослых \n✔️ Уютные вечера у костра с шашлыком и звёздным небом\n✨ Раннее бронирование на лето 2026 уже открыто! Не опоздай!',
			period: 'Круглый год',
			icon: '👨‍👩‍👧‍👦',
			color: 'bg-green-50 border-green-200',
			code: null, // У этой акции нет промокода
		},
	]

	const promoCodes = ['ХОЧУПРАЗДНИК', 'ХОЧУБУДНИ', 'ХОЧУВЫХОДНЫЕ']

	// Функция клика по карточке
	const handleCardClick = (e, code) => {
		// Если у акции нет промокода, просто позволяем ссылке работать как обычно (перейти к якорю)
		if (!code) return

		// Останавливаем стандартный резкий прыжок по ссылке
		e.preventDefault()

		// 1. Копируем текст промокода
		navigator.clipboard.writeText(code)
		setCopied(true)

		// Прячем уведомление через 2 секунды
		setTimeout(() => {
			setCopied(false)
		}, 2000)

		// 2. Плавно скроллим пользователя к виджету
		const widgetSection = document.getElementById('widget')
		if (widgetSection) {
			widgetSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}
	}

	return (
		<section className='promotion bg-background relative'>
			{/* Всплывающее уведомление (Toast) */}
			<div
				className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 z-1000 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 ${
					copied
						? 'opacity-100 translate-y-0'
						: 'opacity-0 translate-y-10 pointer-events-none'
				}`}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-5 w-5'
					viewBox='0 0 20 20'
					fill='currentColor'
				>
					<path
						fillRule='evenodd'
						d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
						clipRule='evenodd'
					/>
				</svg>
				Промокод скопирован!
			</div>

			<div className='container max-w-7xl mx-auto px-3.75'>
				<div className='py-10'>
					<div className='max-w-300 min-h-56 mx-auto rounded-3xl bg-[url("/images/promotion/promo_bg_mobile.webp")]  sm:bg-[url("/images/promotion/promo_bg.png")] bg-cover sm:bg-center bg-no-repeat relative overflow-hidden'>
						<div className='absolute inset-0 bg-black/20'></div>

						<div className='relative z-10 h-full flex flex-col p-8'>
							<div className='w-full md:w-1/2'>
								<span className='text-[22px] md:text-[32px] md:leading-10 font-bold'>
									Для тех, кто ценит заботу и выбирает лучшее
								</span>
								<div className='flex flex-wrap gap-2 md:gap-5 pt-2 md:pt-5'>
									<span className='text-[12px] border-2 py-0.5 px-2 md:px-10 rounded-xl font-semibold border-white'>
										Парковка и подъезд
									</span>
									<span className='text-[12px] border-2 py-0.5 px-2 md:px-10 rounded-xl font-semibold border-white'>
										Поддержка 24/7
									</span>
									<span className='text-[12px] border-2 py-0.5 px-2 md:px-10 rounded-xl font-semibold border-white'>
										Комфорт
									</span>
								</div>
							</div>
							<div className=' pt-10 md:pt-2 md:min-w-1/2 relative'>
								<Link href={'/gallery'}>
									<button className='bg-white text-(--accent-color) px-8 py-1 font-bold rounded-2xl cursor-pointer md:absolute md:bottom-0 md:right-0 mx-auto block'>
										Смотреть дом
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div className='py-10 max-w-300 mx-auto'>
					<h2 className='text-(--accent-color) text-[25px] sm:text-[32px] font-bold text-right'>
						НАШИ АКЦИИ
					</h2>
					<h3 className='text-(--accent-color) font-medium text-right'>
						{' '}
						ГОРЫ, СВЕЖИЙ ВОЗДУХ И КОМФОРТ
						<br />
						ВАШ ИДЕАЛЬНЫЙ ОТДЫХ СТАЛ ЕЩЁ БЛИЖЕ
					</h3>

					<div className='grid  lg:grid-cols-3 gap-6 py-10'>
						{promo.map((item, i) => (
							<Link
								key={i}
								href='#widget'
								onClick={e => handleCardClick(e, item.code)} // Добавили обработчик на саму карточку
								className='group block text-(--accent-color) bg-white py-8 px-5 rounded-3xl flex flex-col 
                        shadow-lg transition-all duration-500 hover:scale-[1.01] 
                        hover:shadow-xl hover:border hover:border-(--accent-color)/10 cursor-pointer
                        hover:z-10'
								style={{
									transform: 'rotate(0deg)',
									transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
								}}
								onMouseEnter={e => {
									const randomRotate = Math.random() * 2 - 1
									e.currentTarget.style.transform = `scale(1.01) rotate(${randomRotate}deg)`

									const randomX = Math.random() * 4 - 2
									const randomY = Math.random() * 4 - 2
									e.currentTarget.style.transform += ` translate(${randomX}px, ${randomY}px)`
								}}
								onMouseLeave={e => {
									e.currentTarget.style.transform =
										'scale(1) rotate(0deg) translate(0px, 0px)'
								}}
							>
								<h4 className='text-[20px] font-semibold mb-3 group-hover:text-(--accent-color)/80'>
									{item.title}
								</h4>
								<h5 className='text-gray-600 grow group-hover:text-gray-800'>
									{item.desc.split('\n').map((line, idx) => {
										const trimmedLine = line.trim()

										// Отрисовка промокода (убрали onClick отсюда, так как он теперь на всей карточке)
										if (promoCodes.includes(trimmedLine)) {
											return (
												<span
													key={idx}
													className='inline-flex items-center gap-2 mt-2 px-3 py-1 bg-green-100 text-green-800 font-bold rounded-lg border border-green-200 tracking-wider transition-all'
												>
													{trimmedLine}
													<svg
														xmlns='http://www.w3.org/2000/svg'
														className='h-4 w-4 opacity-60'
														fill='none'
														viewBox='0 0 24 24'
														stroke='currentColor'
														strokeWidth={2}
													>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
														/>
													</svg>
												</span>
											)
										}

										return (
											<span
												key={idx}
												className={trimmedLine ? 'block mb-2' : 'block h-2'}
											>
												{line}
											</span>
										)
									})}
								</h5>
								<img
									className='w-10 mx-auto mt-4 opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-300 group-hover:rotate-6'
									src='/images/logo/logo_green.webp'
									alt='logo'
								/>
							</Link>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
