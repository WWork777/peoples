'use client'
import { useEffect, useState } from 'react'

export default function GalleryAll() {
	const slides = [
		'/images/gallery/1.webp',
		'/images/gallery/2.webp',
		'/images/gallery/3.webp',
		'/images/gallery/4.webp',
		'/images/gallery/5.webp',
		'/images/gallery/6.webp',
		'/images/gallery/7.webp',
		'/images/gallery/8.webp',
		'/images/gallery/9.webp',
		'/images/gallery/10.webp',
		'/images/gallery/11.webp',
		'/images/gallery/12.webp',
		'/images/gallery/13.webp',
		'/images/gallery/14.webp',
		'/images/gallery/15.webp',
		'/images/gallery/16.webp',
		'/images/gallery/17.webp',
		'/images/gallery/18.webp',
		'/images/gallery/19.webp',
		'/images/gallery/20.webp',
		'/images/gallery/21.webp',
		'/images/gallery/22.webp',
		'/images/gallery/23.webp',
		'/images/gallery/24.webp',
		'/images/gallery/25.webp',
		'/images/gallery/26.webp',
		'/images/gallery/27.webp',
	]

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
	const [isLoading, setIsLoading] = useState(true)

	// Открытие модального окна с выбранным слайдом
	const openModal = index => {
		setCurrentSlideIndex(index)
		setIsModalOpen(true)
		setIsLoading(true)
	}

	// Закрытие модального окна
	const closeModal = () => {
		setIsModalOpen(false)
	}

	// Переход к следующему слайду
	const nextSlide = () => {
		setIsLoading(true)
		setCurrentSlideIndex(prevIndex =>
			prevIndex === slides.length - 1 ? 0 : prevIndex + 1,
		)
	}

	// Переход к предыдущему слайду
	const prevSlide = () => {
		setIsLoading(true)
		setCurrentSlideIndex(prevIndex =>
			prevIndex === 0 ? slides.length - 1 : prevIndex - 1,
		)
	}

	// Загрузка изображения
	const handleImageLoad = () => {
		setIsLoading(false)
	}

	// Обработка нажатия клавиш для навигации
	useEffect(() => {
		const handleKeyDown = e => {
			if (!isModalOpen) return

			if (e.key === 'Escape') {
				closeModal()
			} else if (e.key === 'ArrowRight') {
				nextSlide()
			} else if (e.key === 'ArrowLeft') {
				prevSlide()
			} else if (e.key === ' ') {
				e.preventDefault()
				nextSlide()
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [isModalOpen])

	// Блокировка скролла при открытом модальном окне
	useEffect(() => {
		if (isModalOpen) {
			document.body.style.overflow = 'hidden'
			document.body.style.touchAction = 'none'
		} else {
			document.body.style.overflow = 'auto'
			document.body.style.touchAction = 'auto'
		}
	}, [isModalOpen])

	return (
		<>
			<section className='gallery bg-background mt-10 px-3.75 py-10'>
				<div className='container max-w-480 mx-auto'>
					<div className='max-w-360 mx-auto'>
						<h2 className='text-(--accent-color) text-[25px] sm:text-[32px] font-bold leading-10 uppercase md:pt-25 md:pb-5'>
							Сделаем ваш отдых <br /> комфортным
						</h2>
						<h3 className='text-(--accent-color) text-[20px] font-medium pb-10 md:pb-25'>
							Здесь вы можете посмотреть фотографии нашего <br /> гостевого
							комплекса
						</h3>
					</div>
					<div className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 place-items-center'>
						{slides.map((slide, i) => (
							<div
								key={i}
								className='cursor-pointer hover:opacity-90 transition-opacity duration-300 hover:scale-[1.02] transform-gpu'
								onClick={() => openModal(i)}
							>
								<img
									src={slide}
									alt={`Галерея изображение ${i + 1}`}
									className='w-full h-auto object-cover max-h-64 lg:max-h-80'
									loading='lazy'
								/>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Модальное окно для просмотра слайдов - увеличенная версия */}
			{isModalOpen && (
				<div className='fixed inset-0 z-[100] flex items-center justify-center bg-background'>
					{/* Индикатор загрузки */}
					{isLoading && (
						<div className='absolute inset-0 flex items-center justify-center z-20'>
							<div className='w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin'></div>
						</div>
					)}

					{/* Кнопка закрытия */}
					<button
						className='absolute top-6 right-6 text-white text-5xl z-30 hover:text-gray-300 transition-colors duration-200 bg-black/30 hover:bg-black/50 w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm'
						onClick={closeModal}
						aria-label='Закрыть'
					>
						×
					</button>

					{/* Кнопка предыдущего слайда */}

					<button
						className='absolute left-6 top-1/2 transform -translate-y-1/2 text-white z-30 hover:text-gray-300 transition-colors duration-200 bg-black/30 hover:bg-black/50 w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm'
						onClick={prevSlide}
						aria-label='Предыдущее изображение'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='w-8 h-8'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M15 19l-7-7 7-7'
							/>
						</svg>
					</button>

					{/* Кнопка следующего слайда */}
					<button
						className='absolute right-6 top-1/2 transform -translate-y-1/2 text-white z-30 hover:text-gray-300 transition-colors duration-200 bg-black/30 hover:bg-black/50 w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm'
						onClick={nextSlide}
						aria-label='Следующее изображение'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='w-8 h-8'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
							strokeWidth={2}
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M9 5l7 7-7 7'
							/>
						</svg>
					</button>

					{/* Контейнер для изображения - теперь занимает почти весь экран */}
					<div className='relative w-full h-full flex items-center justify-center p-4'>
						<div className='relative w-full h-full max-w-[95vw] max-h-[95vh] flex items-center justify-center'>
							<img
								src={slides[currentSlideIndex]}
								alt={`Просмотр изображения ${currentSlideIndex + 1}`}
								className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
									isLoading ? 'opacity-0' : 'opacity-100'
								}`}
								onLoad={handleImageLoad}
								onError={handleImageLoad}
							/>
						</div>

						{/* Счетчик слайдов */}
						<div className='absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white bg-black/70 backdrop-blur-sm px-6 py-3 rounded-full text-lg font-medium min-w-32 text-center'>
							{currentSlideIndex + 1} / {slides.length}
						</div>
					</div>

					{/* Информация о навигации */}
					<div className='absolute bottom-6 right-6 text-white/70 text-sm bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg hidden lg:block'>
						Используйте ← → или пробел для навигации
					</div>
				</div>
			)}

			<style jsx>{`
				@media (max-width: 768px) {
					button {
						width: 3rem;
						height: 3rem;
						font-size: 2rem;
					}
				}

				/* Улучшаем качество отображения изображений */
				img {
					image-rendering: -webkit-optimize-contrast;
					image-rendering: crisp-edges;
				}
			`}</style>
		</>
	)
}
