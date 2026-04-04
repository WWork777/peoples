'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import ServiceSlider from '../sliders/service-page-slider'
export default function InstructorPage() {
	const swiperRef = useRef(null)

	const images = [
		'/images/gallery/galery17.webp',
		'/images/gallery/galery19.webp',
		'/images/gallery/galery21.webp',
	]

	useEffect(() => {
		// Небольшая задержка, чтобы переопределить скролл браузера
		const timer = setTimeout(() => {
			window.scrollTo({
				top: 0,
				behavior: 'instant', // или 'smooth' для плавности
			})
		}, 10)

		return () => clearTimeout(timer)
	}, [])

	return (
		<>
			<div className='bg-background mt-10 px-3.75'>
				<div className='container max-w-7xl mx-auto'>
					<div className='flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch pt-10 pb-10'>
						{/* LEFT: big card */}
						<div className='w-full lg:flex-1 bg-white rounded-[32px] p-7 sm:p-10'>
							<h2 className='text-[22px] sm:text-[26px] font-semibold text-black mb-7'>
								ГРУППОВЫЕ ЗАНЯТИЯ
							</h2>

							<div className='space-y-6 text-[16px] sm:text-[17px] leading-7 text-black/80'>
								<p>
									Мало кто, оказавшись в окружении первозданной природы, сможет удержаться от того, чтобы не заглянуть внутрь себя и не обрести гармонию. Тишина зимней тайги и чистая энергия гор — идеальные декорации для глубокой практики и восстановления сил.
								</p>

								<p>
									Если вы ищете единомышленников и хотите погрузиться в атмосферу осознанности, приглашаем вас присоединиться к нашим групповым программам. Ретриты, випассаны и занятия йогой на территории комплекса проводят мастера, тонко чувствующие пространство и человеческую природу.
								</p>

								<p>
									Коллективная практика поможет вам глубже проработать свои запросы, обменяться энергией с группой и найти внутреннюю опору. Эти занятия дадут вам ценные инструменты для самопознания, наполнят спокойствием и заставят по-новому взглянуть на отдых в Шерегеше, вот увидите!
								</p>
							</div>
						</div>

						{/* RIGHT: small card + button */}
						<div className='w-full lg:w-[360px] flex flex-col gap-4'>
							<div className='bg-white rounded-[32px] p-7 sm:p-9 min-h-[160px] flex items-start'>
								<p className='text-[16px] sm:text-[17px] leading-7 text-black/80'>
									Для подбора
									<br />
									инструктора обратитесь
									<br />к Администратору
								</p>
							</div>

							<Link
								className='bg-[#0E4B3B] hover:bg-[#0C4032] transition-colors text-white font-semibold rounded-full py-4 w-full text-center'
								href='/booking'
							>
								ЗАКАЗАТЬ
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className='w-full mb-16 bg-white sm:p-20 pb-10 pt-10 px-3.75'>
				<div className='container max-w-7xl mx-auto'>
					<ServiceSlider swiperRef={swiperRef} images={images} />
				</div>
			</div>
		</>
	)
}
