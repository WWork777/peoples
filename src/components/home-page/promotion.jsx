'use client'
import Link from 'next/link'

export default function Promotion() {
	const promo = [
		{
			title: 'Раннее бронирование',
			desc: 'Забронируйте зимний сезон 2025-2026 до 30 ноября и получите скидку 25%. Лучшие номера по выгодной цене. Успейте воспользоваться - количество ограничено! Идеальная возможность сэкономить на отдыхе в Шерегеше.',
			period: 'До 30 ноября 2024 года',
			icon: '📅',
			color: 'bg-blue-50 border-blue-200',
		},
		{
			title: 'Семейный отдых',
			desc: 'При бронировании семейного номера на 7+ дней - 1 день в подарок! Дети до 12 лет бесплатно, детские кроватки и меню включены. Максимальный комфорт для всей семьи по специальной цене.',
			period: 'Круглый год',
			icon: '👨‍👩‍👧‍👦',
			color: 'bg-green-50 border-green-200',
		},
		{
			title: 'Длительное проживание',
			desc: 'От 14 дней - скидка до 30% + бонусы: бесплатный трансфер, приветственный набор, сауна 2 раза в неделю, скидка на прокат оборудования. Погрузитесь в атмосферу горного отдыха полностью.',
			period: 'Скидка до 30% + бонусы',
			icon: '⛰️',
			color: 'bg-orange-50 border-orange-200',
		},
		{
			title: 'Приведи друга',
			desc: 'Рекомендуйте нас друзьям и получайте 15-20% скидку на следующее бронирование. Чем дольше остаются ваши друзья, тем больше ваш бонус. Выгодно для всех!',
			period: 'Программа лояльности',
			icon: '🎁',
			color: 'bg-purple-50 border-purple-200',
		},
	]
	return (
		<section className='promotion bg-background'>
			<div className='container max-w-7xl mx-auto px-3.75'>
				<div className='py-10'>
					<div className='max-w-300 min-h-56 mx-auto rounded-3xl bg-[url("/images/promotion/promo_bg_mobile.webp")]  sm:bg-[url("/images/promotion/promo_bg.png")] bg-cover sm:bg-center bg-no-repeat relative overflow-hidden'>
						{/* Оверлей с полупрозрачностью */}
						<div className='absolute inset-0 bg-black/20'></div>

						{/* Контент поверх оверлея */}
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
								<Link href={'/#'}>
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
					<div className='grid sm:grid-cols-2 xl:grid-cols-4 gap-6 py-10'>
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
									{item.desc}
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
