// 'use client'

// import Link from 'next/link'

// export default function AdditionalServices() {
// 	const scrollToWidget = e => {
// 		e.preventDefault()
// 		e.stopPropagation()

// 		// Проверяем, находимся ли мы на главной странице
// 		if (window.location.pathname === '/') {
// 			// Если на главной - просто скроллим к виджету
// 			const widgetElement = document.getElementById('widget')
// 			if (widgetElement) {
// 				widgetElement.scrollIntoView({ behavior: 'smooth' })
// 			}
// 		} else {
// 			// Если не на главной - переходим на главную с якорем
// 			window.location.href = '/#widget'
// 		}
// 	}

// 	return (
// 		<section id='additional' className='additional-services'>
// 			<div className='container max-w-360 mx-auto px-3.75'>
// 				<h2 className='text-(--accent-color) text-[25px] sm:text-[32px] font-bold text-center'>
// 					ДОПОЛНИТЕЛЬНЫЕ УСЛУГИ
// 				</h2>

// 				<h3 className='text-(--accent-color) font-medium text-center'>
// 					ЧТОБЫ ОТДЫХ БЫЛ ЕЩЕ ПРИЯТНЕЕ
// 				</h3>

// 				<div className='grid sm:grid-cols-2 xl:grid-cols-4 gap-6 py-10'>
// 					{/* 1 ТРАНСФЕР */}
// 					<Link href='/services/transfer' className='card'>
// 						<CardContent
// 							img='/images/additional/1.png'
// 							title='ТРАНСФЕР'
// 							description='Поможем купить авиабилеты, организовать трансфер и встречу в аэропорту.'
// 							onDateClick={scrollToWidget}
// 						/>
// 					</Link>

// 					{/* 2 ИНСТРУКТОР */}
// 					<Link href='/services/instructor' className='card'>
// 						<CardContent
// 							img='/images/additional/2.png'
// 							title='ИНСТРУКТОР'
// 							description='Профессиональные инструктора помогут освоить новые навыки и техники.'
// 							onDateClick={scrollToWidget}
// 						/>
// 					</Link>

// 					{/* 3 ПРОЖИВАНИЕ С ЖИВОТНЫМИ */}
// 					<Link href='/services/pet' className='card'>
// 						<CardContent
// 							img='/images/additional/3.png'
// 							title={'ПРОЖИВАНИЕ\nС ЖИВОТНЫМИ'}
// 							description='Уютное проживание вместе с вашими питомцами, без лишних забот.'
// 							onDateClick={scrollToWidget}
// 						/>
// 					</Link>

// 					{/* 4 КОФЕЙНЯ */}
// 					<Link href='/services/coffee' className='card'>
// 						<CardContent
// 							img='/images/additional/4.png'
// 							title='КОФЕЙНЯ'
// 							description='Свежий кофе, десерты и приятная атмосфера для отдыха.'
// 							onDateClick={scrollToWidget}
// 						/>
// 					</Link>

// 					{/* 5 ПРОКАТ */}
// 					<Link href='/services/rental' className='card'>
// 						<CardContent
// 							img='/images/additional/5.png'
// 							title='ПРОКАТ'
// 							description='Прокат оборудования и снаряжения для комфортного отдыха.'
// 							onDateClick={scrollToWidget}
// 						/>
// 					</Link>

// 					{/* 6 ПРОЖИВАНИЕ С ДЕТЬМИ */}
// 					<Link href='/services/children' className='card'>
// 						<CardContent
// 							img='/images/additional/6.png'
// 							title={'ПРОЖИВАНИЕ\nС ДЕТЬМИ'}
// 							description='Удобные условия для отдыха с детьми и развлечения для всей семьи.'
// 							onDateClick={scrollToWidget}
// 						/>
// 					</Link>

// 					{/* 7 УБОРКА */}
// 					<Link href='/services/cleaning' className='card'>
// 						<CardContent
// 							img='/images/additional/7.png'
// 							title='УБОРКА'
// 							description='Профессиональная уборка номеров и территории для вашего комфорта.'
// 							onDateClick={scrollToWidget}
// 						/>
// 					</Link>

// 					{/* 8 ДОСТАВКА ЕДЫ */}
// 					<Link href='/services/delivery' className='card'>
// 						<CardContent
// 							img='/images/additional/8.png'
// 							title='ДОСТАВКА ЕДЫ'
// 							description='Быстрая доставка еды прямо к вашему номеру или месту отдыха.'
// 							onDateClick={scrollToWidget}
// 						/>
// 					</Link>
// 				</div>
// 			</div>
// 		</section>
// 	)
// }

// /* Отдельный компонент карточки */
// function CardContent({ img, title, description, onDateClick }) {
// 	return (
// 		<div
// 			className='group relative min-h-105 rounded-3xl overflow-hidden
//       shadow-lg transition-all duration-300 hover:scale-[1.02]
//       hover:shadow-2xl hover:border hover:border-(--accent-color)/20'
// 		>
// 			<div className='absolute inset-0'>
// 				<img
// 					src={img}
// 					alt={title}
// 					className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
// 				/>
// 			</div>

// 			<div
// 				className='absolute inset-0 bg-linear-to-t
//         from-black/60 via-black/30 to-black/10
//         rounded-3xl flex flex-col justify-between p-5'
// 			>
// 				<div className='flex justify-end'>
// 					<button
// 						onClick={onDateClick}
// 						className='bg-white text-(--accent-color) px-6 py-2 font-bold
//             rounded-2xl hover:bg-gray-100 transition cursor-pointer'
// 					>
// 						Выбрать дату
// 					</button>
// 				</div>

// 				<div>
// 					<h4
// 						style={{ whiteSpace: 'pre-line' }}
// 						className='text-[23px] font-bold text-white pb-2'
// 					>
// 						{title}
// 					</h4>

// 					<p className='text-white/90 text-sm mb-3'>{description}</p>

// 					<span className='bg-(--accent-color) text-white px-6 py-2 font-bold rounded-2xl inline-block'>
// 						Подробнее →
// 					</span>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdditionalServices() {
	const router = useRouter()

	const scrollToWidget = e => {
		e.preventDefault()
		e.stopPropagation()

		// Проверяем, находимся ли мы на главной странице
		if (window.location.pathname === '/') {
			// Если на главной - просто скроллим к виджету
			const widgetElement = document.getElementById('widget')
			if (widgetElement) {
				widgetElement.scrollIntoView({ behavior: 'smooth' })
			}
		} else {
			// Если не на главной - переходим на главную с якорем
			router.push('/#widget')
		}
	}

	return (
		<section id='additional' className='additional-services'>
			<div className='container max-w-360 mx-auto px-3.75'>
				<h2 className='text-(--accent-color) text-[25px] sm:text-[32px] font-bold text-center'>
					ДОПОЛНИТЕЛЬНЫЕ УСЛУГИ
				</h2>

				<h3 className='text-(--accent-color) font-medium text-center'>
					ЧТОБЫ ОТДЫХ БЫЛ ЕЩЕ ПРИЯТНЕЕ
				</h3>

				<div className='grid sm:grid-cols-2 xl:grid-cols-4 gap-6 py-10'>
					{/* 1 ТРАНСФЕР */}
					<CardContent
						img='/images/additional/1.png'
						title='ТРАНСФЕР'
						description='Поможем купить авиабилеты, организовать трансфер и встречу в аэропорту.'
						onDateClick={scrollToWidget}
						serviceLink='/services/transfer'
					/>

					{/* 2 ИНСТРУКТОР */}
					<CardContent
						img='/images/additional/2.png'
						title='ИНСТРУКТОР'
						description='Профессиональные инструктора помогут освоить новые навыки и техники.'
						onDateClick={scrollToWidget}
						serviceLink='/services/instructor'
					/>

					{/* 3 ПРОЖИВАНИЕ С ЖИВОТНЫМИ */}
					<CardContent
						img='/images/additional/3.png'
						title={'ПРОЖИВАНИЕ\nС ЖИВОТНЫМИ'}
						description='Уютное проживание вместе с вашими питомцами, без лишних забот.'
						onDateClick={scrollToWidget}
						serviceLink='/services/pet'
					/>

					{/* 4 КОФЕЙНЯ */}
					<CardContent
						img='/images/additional/4.png'
						title='КОФЕЙНЯ'
						description='Свежий кофе, десерты и приятная атмосфера для отдыха.'
						onDateClick={scrollToWidget}
						serviceLink='/services/coffee'
					/>

					{/* 5 ПРОКАТ */}
					<CardContent
						img='/images/additional/5.png'
						title='ПРОКАТ'
						description='Прокат оборудования и снаряжения для комфортного отдыха.'
						onDateClick={scrollToWidget}
						serviceLink='/services/rental'
					/>

					{/* 6 ПРОЖИВАНИЕ С ДЕТЬМИ */}
					<CardContent
						img='/images/additional/6.png'
						title={'ПРОЖИВАНИЕ\nС ДЕТЬМИ'}
						description='Удобные условия для отдыха с детьми и развлечения для всей семьи.'
						onDateClick={scrollToWidget}
						serviceLink='/services/children'
					/>

					{/* 7 УБОРКА */}
					<CardContent
						img='/images/additional/7.png'
						title='УБОРКА'
						description='Профессиональная уборка номеров и территории для вашего комфорта.'
						onDateClick={scrollToWidget}
						serviceLink='/services/cleaning'
					/>

					{/* 8 ДОСТАВКА ЕДЫ */}
					<CardContent
						img='/images/additional/8.png'
						title='ДОСТАВКА ЕДЫ'
						description='Быстрая доставка еды прямо к вашему номеру или месту отдыха.'
						onDateClick={scrollToWidget}
						serviceLink='/services/delivery'
					/>
				</div>
			</div>
		</section>
	)
}

/* Отдельный компонент карточки */
function CardContent({ img, title, description, onDateClick, serviceLink }) {
	return (
		<div
			className='group relative min-h-105 rounded-3xl overflow-hidden
      shadow-lg transition-all duration-300 hover:scale-[1.02]
      hover:shadow-2xl hover:border hover:border-(--accent-color)/20'
		>
			<div className='absolute inset-0'>
				<img
					src={img}
					alt={title}
					className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
				/>
			</div>

			<div
				className='absolute inset-0 bg-linear-to-t
        from-black/60 via-black/30 to-black/10
        rounded-3xl flex flex-col justify-between p-5'
			>
				<div className='flex justify-end'>
					{/* <button
						onClick={onDateClick}
						className='bg-white text-(--accent-color) px-6 py-2 font-bold
            rounded-2xl hover:bg-gray-100 transition cursor-pointer'
					>
						Выбрать дату
					</button> */}
				</div>

				<div>
					<Link href={serviceLink}>
						<h4
							style={{ whiteSpace: 'pre-line' }}
							className='text-[23px] font-bold text-white pb-2 hover:text-(--accent-color) transition-colors cursor-pointer'
						>
							{title}
						</h4>
					</Link>

					<p className='text-white/90 text-sm mb-3'>{description}</p>

					<Link href={serviceLink}>
						<span className='bg-(--accent-color) text-white px-6 py-2 font-bold rounded-2xl inline-block hover:bg-[#0C4032] transition-colors cursor-pointer'>
							Подробнее →
						</span>
					</Link>
				</div>
			</div>
		</div>
	)
}
