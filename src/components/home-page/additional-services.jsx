// 'use client'
// import Link from 'next/link'
// export default function AdditionalServices() {
// 	const addServ = [
// 		{
// 			id: 1,
// 			title: 'ТРАНСФЕР',
// 			img: '/images/additional/1.png',
// 			src1: '/services/transfer',
// 			src2: '/#widget',
// 		},
// 		{
// 			id: 2,
// 			title: 'ИНСТРУКТОР',
// 			img: '/images/additional/2.png',
// 			src1: '/services/instructor',
// 			src2: '/#widget',
// 		},
// 		{
// 			id: 3,
// 			title: 'ПРОЖИВАНИЕ\nС ЖИВОТНЫМИ',
// 			img: '/images/additional/3.png',
// 			src1: '/services/pet',
// 			src2: '/#widget',
// 		},
// 		{
// 			id: 4,
// 			title: 'КОФЕЙНЯ',
// 			img: '/images/additional/4.png',
// 			src1: '/services/coffee',
// 			src2: '/#widget',
// 		},
// 		{
// 			id: 5,
// 			title: 'ПРОКАТ',
// 			img: '/images/additional/5.png',
// 			src1: '/services/rental',
// 			src2: '/#widget',
// 		},
// 		{
// 			id: 6,
// 			title: 'ПРОЖИВАНИЕ\nС ДЕТЬМИ',
// 			img: '/images/additional/6.png',
// 			src1: '/services/children',
// 			src2: '/#widget',
// 		},
// 		{
// 			id: 7,
// 			title: 'УБОРКА',
// 			img: '/images/additional/7.png',
// 			src1: '/services/cleaning',
// 			src2: '/#widget',
// 		},
// 		{
// 			id: 8,
// 			title: 'ДОСТАВКА ЕДЫ',
// 			img: '/images/additional/8.png',
// 			src1: '/services/delivery',
// 			src2: '/#widget',
// 		},
// 	]
// 	return (
// 		<section id='additional' className='additional-services'>
// 			<div className='container max-w-360 mx-auto  px-3.75'>
// 				<h2 className='text-(--accent-color) text-[25px] sm:text-[32px] font-bold text-center'>
// 					ДОПОЛНИТЕЛЬНЫЕ УСЛУГИ
// 				</h2>
// 				<h3 className='text-(--accent-color) font-medium text-center'>
// 					ЧТОБЫ ОТДЫХ БЫЛ ЕЩЕ ПРИЯТНЕЕ
// 				</h3>
// 				<div className='grid sm:grid-cols-2 xl:grid-cols-4 gap-6 py-10'>
// 					{addServ.map((item, i) => (
// 						<div
// 							key={i}
// 							className='group text-white rounded-3xl flex flex-col
// 						shadow-lg transition-all duration-300 hover:scale-[1.02]
// 						hover:shadow-2xl hover:border hover:border-(--accent-color)/20 cursor-pointer relative min-h-105'
// 						>
// 							<div className='absolute inset-0'>
// 								<img
// 									className='w-full h-full object-cover rounded-3xl'
// 									src={item.img}
// 									alt={item.title}
// 								/>
// 							</div>
// 							<Link href={item.src1}>
// 								<div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-black/10 rounded-3xl flex flex-col justify-between p-5'>
// 									<Link href={item.src2}>
// 										<button className='bg-white text-(--accent-color) px-8 py-1  font-bold rounded-2xl cursor-pointer block ml-auto'>
// 											Выбрать дату
// 										</button>
// 									</Link>

// 									<div>
// 										<h4
// 											style={{ whiteSpace: 'pre-line' }}
// 											className='text-[23px] leading-7 font-bold pb-3'
// 										>
// 											{item.title}
// 										</h4>

// 										<button className='bg-(--accent-color) text-white px-8 py-1  font-bold rounded-2xl  cursor-pointer '>
// 											Подробнее
// 										</button>
// 									</div>
// 								</div>
// 							</Link>
// 						</div>
// 					))}
// 				</div>
// 				{/* <div className='grid sm:grid-cols-2 xl:grid-cols-4 gap-6 py-10'>
// 					{addServ.map((item, i) => (
// 						<div
// 							key={i}
// 							className='group text-white rounded-3xl flex flex-col
//         shadow-lg transition-all duration-500 hover:scale-[1.02]
//         hover:shadow-2xl hover:border hover:border-(--accent-color)/20 cursor-pointer
//         hover:z-10 relative min-h-105'
// 							style={{
// 								transform: 'rotate(0deg)',
// 								transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
// 							}}
// 							onMouseEnter={e => {
// 								// Случайный небольшой поворот от -2 до 2 градусов
// 								const randomRotate = Math.random() * 4 - 2
// 								e.currentTarget.style.transform = `scale(1.02) rotate(${randomRotate}deg)`

// 								// Случайное смещение от -5 до 5 пикселей
// 								const randomX = Math.random() * 10 - 5
// 								const randomY = Math.random() * 10 - 5
// 								e.currentTarget.style.transform += ` translate(${randomX}px, ${randomY}px)`
// 							}}
// 							onMouseLeave={e => {
// 								e.currentTarget.style.transform =
// 									'scale(1) rotate(0deg) translate(0px, 0px)'
// 							}}
// 						>
// 							<div className='absolute inset-0'>
// 								<img
// 									className='w-full h-full object-cover rounded-3xl'
// 									src={item.img}
// 									alt={item.title}
// 								/>
// 							</div>
// 							<div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-black/10 rounded-3xl flex flex-col justify-between p-5'>
// 								<Link href={item.src2}>
// 									<button className='bg-white text-(--accent-color) px-8 py-1 font-bold rounded-2xl cursor-pointer block ml-auto hover:scale-105 transition-transform duration-300'>
// 										Выбрать дату
// 									</button>
// 								</Link>
// 								<h4
// 									style={{ whiteSpace: 'pre-line' }}
// 									className='text-[23px] leading-7 font-bold text-center pt-[45%] group-hover:translate-y-[-2px] transition-transform duration-300'
// 								>
// 									{item.title}
// 								</h4>
// 								<Link href={item.src1}>
// 									<button className='bg-white text-(--accent-color) px-8 py-1 font-bold rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300'>
// 										Подробнее
// 									</button>
// 								</Link>
// 							</div>
// 						</div>
// 					))}
// 				</div> */}
// 			</div>
// 		</section>
// 	)
// }

'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdditionalServices() {
	const router = useRouter()
	const addServ = [
		{
			id: 1,
			title: 'ТРАНСФЕР',
			img: '/images/additional/1.png',
			src1: '/services/transfer',
			src2: '/#widget',
		},
		{
			id: 2,
			title: 'ИНСТРУКТОР',
			img: '/images/additional/2.png',
			src1: '/services/instructor',
			src2: '/#widget',
		},
		{
			id: 3,
			title: 'ПРОЖИВАНИЕ\nС ЖИВОТНЫМИ',
			img: '/images/additional/3.png',
			src1: '/services/pet',
			src2: '/#widget',
		},
		{
			id: 4,
			title: 'КОФЕЙНЯ',
			img: '/images/additional/4.png',
			src1: '/services/coffee',
			src2: '/#widget',
		},
		{
			id: 5,
			title: 'ПРОКАТ',
			img: '/images/additional/5.png',
			src1: '/services/rental',
			src2: '/#widget',
		},
		{
			id: 6,
			title: 'ПРОЖИВАНИЕ\nС ДЕТЬМИ',
			img: '/images/additional/6.png',
			src1: '/services/children',
			src2: '/#widget',
		},
		{
			id: 7,
			title: 'УБОРКА',
			img: '/images/additional/7.png',
			src1: '/services/cleaning',
			src2: '/#widget',
		},
		{
			id: 8,
			title: 'ДОСТАВКА ЕДЫ',
			img: '/images/additional/8.png',
			src1: '/services/delivery',
			src2: '/#widget',
		},
	]

	const handleCardClick = href => {
		router.push(href)
	}

	return (
		<section id='additional' className='additional-services'>
			<div className='container max-w-360 mx-auto  px-3.75'>
				<h2 className='text-(--accent-color) text-[25px] sm:text-[32px] font-bold text-center'>
					ДОПОЛНИТЕЛЬНЫЕ УСЛУГИ
				</h2>
				<h3 className='text-(--accent-color) font-medium text-center'>
					ЧТОБЫ ОТДЫХ БЫЛ ЕЩЕ ПРИЯТНЕЕ
				</h3>
				<div className='grid sm:grid-cols-2 xl:grid-cols-4 gap-6 py-10'>
					{addServ.map((item, i) => (
						<div
							key={i}
							className='group text-white rounded-3xl flex flex-col 
							shadow-lg transition-all duration-300 hover:scale-[1.02] 
							hover:shadow-2xl hover:border hover:border-(--accent-color)/20 
							cursor-pointer relative min-h-105 overflow-hidden'
							onClick={() => handleCardClick(item.src1)}
							onKeyDown={e => {
								if (e.key === 'Enter' || e.key === ' ') {
									handleCardClick(item.src1)
								}
							}}
							tabIndex={0}
							role='button'
							aria-label={`Перейти к услуге: ${item.title}`}
						>
							{/* Фоновое изображение */}
							<div className='absolute inset-0'>
								<img
									className='w-full h-full object-cover rounded-3xl group-hover:scale-105 transition-transform duration-300'
									src={item.img}
									alt={item.title}
									loading='lazy'
								/>
							</div>

							{/* Затемнение и контент */}
							<div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-black/10 rounded-3xl flex flex-col justify-between p-5 z-10'>
								{/* Кнопка "Выбрать дату" - отдельный Link с stopPropagation */}
								<div className='flex justify-end'>
									<Link
										href={item.src2}
										onClick={e => e.stopPropagation()}
										className='z-20 relative'
									>
										<button
											className='bg-white text-(--accent-color) px-8 py-2 font-bold rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors duration-200'
											onClick={e => e.stopPropagation()}
										>
											Выбрать дату
										</button>
									</Link>
								</div>

								{/* Контент карточки */}
								<div>
									<h4
										style={{ whiteSpace: 'pre-line' }}
										className='text-[23px] leading-7 font-bold pb-3'
									>
										{item.title}
									</h4>

									<button
										className='bg-(--accent-color) text-white px-8 py-2 font-bold rounded-2xl cursor-pointer hover:bg-(--accent-color)/90 transition-colors duration-200'
										onClick={e => {
											e.stopPropagation()
											router.push(item.src1)
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
	)
}
