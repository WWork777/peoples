// 'use client'

// import { useEffect, useState } from 'react'
// import Slider from 'react-slick'
// import 'slick-carousel/slick/slick-theme.css'
// import 'slick-carousel/slick/slick.css'
// import './reviews.scss'
// import ReviewSummary from './ReviewSummary'

// const ReviewsCarousel = () => {
// 	const [reviews, setReviews] = useState([])
// 	const [filteredReviews, setFilteredReviews] = useState([])
// 	const [activeFilter, setActiveFilter] = useState('2Gis')

// 	// Загрузка JSON-данных
// 	useEffect(() => {
// 		fetch('/reviews.json')
// 			.then(response => response.json())
// 			.then(data => {
// 				setReviews(data)
// 				setFilteredReviews(data.filter(review => review.platform === '2Gis'))
// 			})
// 			.catch(error => console.error('Ошибка загрузки JSON:', error))
// 	}, [])

// 	const settings = {
// 		autoplay: true,
// 		dots: false,
// 		arrows: false,
// 		infinite: true,
// 		speed: 500,
// 		slidesToShow: 3,
// 		slidesToScroll: 1,
// 		centerMode: false,
// 		initialSlide: 0,
// 		centerPadding: '60px',
// 		lazyLoad: 'progressive', // Ленивая загрузка слайдов
// 		responsive: [
// 			{
// 				breakpoint: 1024,
// 				settings: {
// 					slidesToShow: 2,
// 					slidesToScroll: 1,
// 					centerPadding: '40px',
// 					initialSlide: 0,
// 				},
// 			},
// 			{
// 				breakpoint: 768,
// 				settings: {
// 					dots: false,
// 					slidesToShow: 1,
// 					slidesToScroll: 1,
// 					centerPadding: '20px',
// 					initialSlide: 0,
// 				},
// 			},
// 		],
// 	}

// 	// Функция фильтрации
// 	const handleFilter = platform => {
// 		setActiveFilter(platform)
// 		if (platform === 'all') {
// 			setFilteredReviews(reviews)
// 		} else {
// 			setFilteredReviews(reviews.filter(review => review.platform === platform))
// 		}
// 	}

// 	// Отображение иконки платформы
// 	const getPlatformIcon = platform => {
// 		if (platform === 'Яндекс') {
// 			return (
// 				<img
// 					src='/icons/yandex-color-icon.svg'
// 					alt='Яндекс'
// 					style={{ width: '50px', height: '50px' }}
// 				/>
// 			)
// 		} else if (platform === '2Gis') {
// 			return (
// 				<img
// 					src='/icons/double-gis-color-icon.svg'
// 					alt='2GIS'
// 					style={{ width: '50px', height: '50px' }}
// 				/>
// 			)
// 		} else if (platform === 'Авито') {
// 			return (
// 				<img
// 					src='/icons/avito.ru.svg'
// 					alt='2GIS'
// 					style={{ width: '50px', height: '50px', borderRadius: '50%' }}
// 				/>
// 			)
// 		}

// 		return null
// 	}

// 	const TruncatedText = ({ text, maxLength }) => {
// 		const [isExpanded, setIsExpanded] = useState(false)
// 		const handleToggle = () => setIsExpanded(!isExpanded)

// 		if (text.length <= maxLength) {
// 			return <p>{text}</p>
// 		}

// 		return (
// 			<p>
// 				{isExpanded ? text : `${text.slice(0, maxLength)}...`}
// 				<button
// 					className='btn btn-link'
// 					onClick={handleToggle}
// 					style={{
// 						textDecoration: 'none',
// 						fontSize: '14px',
// 						paddingBlock: '0',
// 					}}
// 				>
// 					{isExpanded ? 'свернуть' : 'читать полностью'}
// 				</button>
// 			</p>
// 		)
// 	}

// 	return (
// 		<div className='reviews-carousel' id='reviews'>
// 			<ReviewSummary />
// 			<div className='header-section flex justify-between items-center '>
// 				<div className='container filter-buttons flex items-center'>
// 					{/* Кнопка для Авито */}
// 					<button
// 						className={`btn btn-sm me-2 ${
// 							activeFilter === 'Авито' ? 'btn-primary' : 'btn-outline-primary'
// 						}`}
// 						onClick={() => handleFilter('Авито')}
// 					>
// 						Авито: 5.0
// 					</button>

// 					{/* Кнопка для 2GIS */}
// 					<button
// 						className={`btn btn-sm me-2 ${
// 							activeFilter === '2Gis' ? 'btn-primary' : 'btn-outline-primary'
// 						}`}
// 						onClick={() => handleFilter('2Gis')}
// 					>
// 						2GIS: 5.0
// 					</button>

// 					{/* Кнопка для Яндекса */}
// 					<button
// 						className={`btn btn-sm ${
// 							activeFilter === 'Яндекс' ? 'btn-primary' : 'btn-outline-primary'
// 						}`}
// 						onClick={() => handleFilter('Яндекс')}
// 					>
// 						Яндекс: 5.0
// 					</button>
// 				</div>
// 			</div>

// 			<Slider {...settings}>
// 				{filteredReviews.length > 0 ? (
// 					filteredReviews.map((review, index) => (
// 						<div key={index}>
// 							<div className='review-card'>
// 								<div className='review-header flex items-center mb-2'>
// 									{getPlatformIcon(review.platform)}
// 									<div className='ms-2'>
// 										<h5 className='mb-0'>{review.user}</h5>
// 										<small>
// 											{review.date} на {review.platform}
// 										</small>
// 									</div>
// 								</div>
// 								<div className='rating text-warning'>
// 									{'★'.repeat(review.rating)}
// 								</div>
// 								<TruncatedText text={review.review} maxLength={100} />
// 							</div>
// 						</div>
// 					))
// 				) : (
// 					<div>Загрузка отзывов...</div>
// 				)}
// 			</Slider>
// 		</div>
// 	)
// }

// export default ReviewsCarousel

'use client'

import { useEffect, useRef, useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import './reviews.scss'
import ReviewSummary from './ReviewSummary'

const ReviewsCarousel = () => {
	const [reviews, setReviews] = useState([])
	const [filteredReviews, setFilteredReviews] = useState([])
	const [activeFilter, setActiveFilter] = useState('2Gis')
	const swiperRef = useRef(null)

	// 1. ЗАГРУЗКА ДАННЫХ
	useEffect(() => {
		fetch('/reviews.json')
			.then(response => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`)
				}
				return response.json()
			})
			.then(data => {
				setReviews(data)
				const defaultFiltered = data.filter(
					review => review.platform === '2Gis',
				)
				setFilteredReviews(defaultFiltered)
			})
			.catch(error => {
				console.error('Ошибка загрузки JSON:', error)
			})
	}, [])

	// 2. ФУНКЦИЯ ФИЛЬТРАЦИИ
	const handleFilter = platform => {
		setActiveFilter(platform)
		const newFilteredReviews =
			platform === 'all'
				? reviews
				: reviews.filter(review => review.platform === platform)
		setFilteredReviews(newFilteredReviews)
	}

	// 3. КОМПОНЕНТ ДЛЯ ОБРЕЗКИ ТЕКСТА
	const TruncatedText = ({ text, maxLength }) => {
		const [isExpanded, setIsExpanded] = useState(false)
		const handleToggle = () => setIsExpanded(!isExpanded)

		if (text.length <= maxLength) {
			return <p>{text}</p>
		}

		return (
			<p>
				{isExpanded ? text : `${text.slice(0, maxLength)}...`}
				<button
					className='btn btn-link p-0 ms-1'
					onClick={handleToggle}
					style={{
						textDecoration: 'none',
						fontSize: '14px',
						paddingBlock: '0',
					}}
				>
					{isExpanded ? 'свернуть' : 'читать полностью'}
				</button>
			</p>
		)
	}

	// 4. ИКОНКИ ПЛАТФОРМ
	const getPlatformIcon = platform => {
		const icons = {
			Яндекс: '/icons/yandex-color-icon.svg',
			'2Gis': '/icons/double-gis-color-icon.svg',
			Авито: '/icons/avito.ru.svg',
		}

		if (!icons[platform]) return null

		return (
			<img
				src={icons[platform]}
				alt={platform}
				style={{
					width: '50px',
					height: '50px',
					borderRadius: platform === 'Авито' ? '50%' : '0',
				}}
			/>
		)
	}

	// НАСТРОЙКИ SWIPER
	const swiperSettings = {
		modules: [Autoplay, Navigation],
		spaceBetween: 20,
		speed: 500,
		// autoplay: {
		// 	delay: 4000,
		// 	disableOnInteraction: false,
		// },
		navigation: false,
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 10,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			1024: {
				slidesPerView: 3,
				spaceBetween: 30,
			},
		},
	}

	// 5. РЕНДЕРИНГ
	return (
		<div className='reviews-carousel' id='reviews'>
			{/* Компонент с общей статистикой */}
			<ReviewSummary />

			{/* Панель фильтров */}
			<div className='header-section flex justify-between items-center mb-6'>
				<div className='container filter-buttons flex items-center'>
					<button
						className={`btn btn-sm me-2 ${
							activeFilter === 'Авито' ? 'btn-primary' : 'btn-outline-primary'
						}`}
						onClick={() => handleFilter('Авито')}
					>
						Авито: 5.0
					</button>

					<button
						className={`btn btn-sm me-2 ${
							activeFilter === '2Gis' ? 'btn-primary' : 'btn-outline-primary'
						}`}
						onClick={() => handleFilter('2Gis')}
					>
						2GIS: 5.0
					</button>

					<button
						className={`btn btn-sm ${
							activeFilter === 'Яндекс' ? 'btn-primary' : 'btn-outline-primary'
						}`}
						onClick={() => handleFilter('Яндекс')}
					>
						Яндекс: 5.0
					</button>
				</div>
			</div>

			{/* СЛАЙДЕР SWIPER */}
			{filteredReviews.length > 0 ? (
				<div className='relative'>
					<Swiper
						ref={swiperRef}
						{...swiperSettings}
						className='reviews-swiper'
						onSwiper={swiper => {
							swiperRef.current = swiper
						}}
					>
						{filteredReviews.map((review, index) => (
							<SwiperSlide key={`${review.platform}-${index}`}>
								<div className='review-card p-4 h-full bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
									<div className='review-header flex items-center mb-3'>
										{getPlatformIcon(review.platform)}
										<div className='ms-3'>
											<h5 className='mb-1 fw-bold text-lg'>{review.user}</h5>
											<small>
												{review.date} на {review.platform.toUpperCase()}
											</small>
										</div>
									</div>

									<div className='rating text-warning mb-3 fs-5'>
										{'★'.repeat(review.rating)}
										{'☆'.repeat(5 - review.rating)}
									</div>

									<TruncatedText text={review.review} maxLength={100} />
								</div>
							</SwiperSlide>
						))}
					</Swiper>

					{/* Кастомные кнопки навигации */}
					{/* <div className='swiper-navigation-custom flex justify-end gap-2 mt-4'>
						<button
							className='w-[43px] h-[43px] rounded-full bg-(--accent-color) cursor-pointer flex justify-center items-center hover:scale-110 transition-transform duration-300'
							onClick={() => swiperRef.current?.slidePrev()}
						>
							<svg width='20' height='20' viewBox='0 0 24 24' fill='white'>
								<path d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z' />
							</svg>
						</button>
						<button
							className='w-[43px] h-[43px] rounded-full bg-(--accent-color) cursor-pointer flex justify-center items-center hover:scale-110 transition-transform duration-300'
							onClick={() => swiperRef.current?.slideNext()}
						>
							<svg width='20' height='20' viewBox='0 0 24 24' fill='white'>
								<path d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z' />
							</svg>
						</button>
					</div> */}
				</div>
			) : (
				<div className='text-center py-10'>
					<p className='text-gray-500'>Нет отзывов для выбранной платформы</p>
				</div>
			)}
		</div>
	)
}

export default ReviewsCarousel
