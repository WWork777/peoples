'use client'
import Link from 'next/link'
export default function Promotion() {
	const promo = [
		{
			title: 'Праздничные выходные',
			desc: 'В период с 9 по 13 марта Скидка 15%! \n\n Применяется при прямом бронировании по телефону: \n\n +79236033030 \n\n Скажите «Хочу праздничные выходные»✨',
			period: 'До 30 ноября 2024 года',
			icon: '📅',
			color: 'bg-blue-50 border-blue-200',
		},

		{
			title: 'Будний день со скидкой 🎁',
			desc: 'С воскресенья по среду — скидка 10% на проживание. \n\n Прямое бронирование по телефону: \n\n +79236033030 \n\n Скажите: «Хочу будни со скидкой»',
			period: 'Скидка до 30% + бонусы',
			icon: '⛰️',
			color: 'bg-orange-50 border-orange-200',
		},
		{
			title: 'Ваш праздник — наш подарок!',
			desc: 'Проведите свой день рождения в кругу близких в уютном номере с видом на горы.\nА для пар, которые недавно соединили свои сердца, у нас тоже есть подарок. \n ✅ Скидка 10%  на любой период проживания.\n✅ При заезде в течение 7 дней до или после даты рождения/свадьбы.\nПри бронировании скажите «Хочу подарок»',

			period: 'Программа лояльности',
			icon: '🎁',
			color: 'bg-purple-50 border-purple-200',
		},
		{
			title: 'Раннее бронирование',
			desc: ' 🏞 Твои идеальные каникулы: Солнце, горы и тёплый бассейн \n✔️ Прогулки по экотропам к скалам «Верблюды» и горе Зелёная \n✔️ Купание в  подогреваемом бассейне \n✔️ Походы с хаски, катание на лошадях, квадроциклы, сплавы и рыбалка на горном озере \n✔️ Ретриты, девичьи посиделки, лагерь для взрослых \n✔️ Уютные вечера у костра с шашлыком и звёздным небом\n✨ Раннее бронирование на лето 2026 уже открыто! Не опоздай!',

			period: 'Круглый год',
			icon: '👨‍👩‍👧‍👦',
			color: 'bg-green-50 border-green-200',
		},
	]
	return (
		<section className='promotion bg-background'>
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
									<button className='bg-white text-(--accent-color) px-8 py-1  font-bold rounded-2xl  cursor-pointer md:absolute md:bottom-0 md:right-0 mx-auto block'>
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

					{/* <div className='grid sm:grid-cols-2 md:grid-cols-4 gap-6 py-10'>
						{promo.map((item, i) => (
							<div
								key={i}
								className='group text-(--accent-color) bg-white py-8 px-5 rounded-3xl flex flex-col 
						shadow-lg transition-all duration-300 hover:scale-[1.02] 
						hover:shadow-2xl hover:border hover:border-(--accent-color)/20 cursor-pointer'
							>
								<h4 className='text-[20px] font-semibold mb-3 group-hover:text-(--accent-color)/80'>
									{item.title}
								</h4>
								<h5 className='text-gray-600 flex-grow group-hover:text-gray-800'>
									{item.desc}
								</h5>
								<img
									className='w-10 mx-auto mt-4 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-transform'
									src='/images/logo/logo_green.webp'
									alt='logo'
								/>
							</div>
						))}
					</div> */}
					<div className='grid sm:grid-cols-2 xl:grid-cols-2 gap-6 py-10'>
						{promo.map((item, i) => (
							<div
								key={i}
								className='group text-(--accent-color) bg-white py-8 px-5 rounded-3xl flex flex-col 
						shadow-lg transition-all duration-500 hover:scale-[1.02] 
						hover:shadow-2xl hover:border hover:border-(--accent-color)/20 cursor-pointer
						hover:z-10'
								style={{
									transform: 'rotate(0deg)',
									transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
								}}
								onMouseEnter={e => {
									// Случайный небольшой поворот от -2 до 2 градусов
									const randomRotate = Math.random() * 4 - 2
									e.currentTarget.style.transform = `scale(1.02) rotate(${randomRotate}deg)`

									// Случайное смещение от -5 до 5 пикселей
									const randomX = Math.random() * 10 - 5
									const randomY = Math.random() * 10 - 5
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
										// Разбиваем строку на части: телефон и остальной текст
										const parts = line.split('+79236033030')
										return (
											<p key={idx} className='mb-2'>
												{parts[0]}
												{parts[1] !== undefined && (
													<a
														href='tel:+79236033030'
														className='text-gray-600 underline'
													>
														+7 923 603-30-30
													</a>
												)}
												{parts[1] || ''}
											</p>
										)
									})}
								</h5>
								<img
									className='w-10 mx-auto mt-4 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12'
									src='/images/logo/logo_green.webp'
									alt='logo'
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
