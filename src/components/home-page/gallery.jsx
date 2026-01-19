// import { GoChevronLeft, GoChevronRight } from 'react-icons/go'
// import GallerySlider from '../sliders/gallery/gallery-slider'
// export default function Gallery() {
// 	return (
// 		<section className='gallery'>
// 			<div className='container max-w-310 mx-auto px-3.75'>
// 				<div className='py-10'>
// 					<h2 className='text-(--accent-color) text-[25px] sm:text-[32px] font-bold text-left'>
// 						ГАЛЕРЕЯ
// 					</h2>
// 					<h3 className='text-(--accent-color) font-medium text-left'>
// 						КАЖДОЕ ФОТО - <br /> КУСОЧЕК АТМОСФЕРЫ «ЛЮДИ В УЮТЕ»
// 					</h3>
// 				</div>
// 			</div>
// 			<div className='container max-w-5xl mx-auto px-3.75'>
// 				<div className='pt-10 pb-10'>
// 					<div>
// 						<div className='flex items-center gap-1 justify-end pb-2'>
// 							<div className='w-[43px] h-[43px] rounded-full bg-(--accent-color) cursor-pointer flex justify-center items-center'>
// 								<GoChevronLeft size={30} />
// 							</div>
// 							<div className='w-[43px] h-[43px] rounded-full bg-(--accent-color) cursor-pointer flex justify-center items-center'>
// 								<GoChevronRight size={30} />
// 							</div>
// 						</div>
// 					</div>
// 					<GallerySlider />
// 				</div>
// 			</div>
// 		</section>
// 	)
// }

'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { GoChevronLeft, GoChevronRight } from 'react-icons/go'
import { IoIosArrowRoundForward } from 'react-icons/io'
import GallerySlider from '../sliders/gallery/gallery-slider'

export default function Gallery() {
	const swiperRef = useRef(null)

	return (
		<section className='gallery'>
			<div className='container max-w-310 mx-auto px-3.75 flex flex-col sm:flex-row sm:justify-between sm:items-center'>
				<div className='py-10 '>
					<h2 className='text-(--accent-color) text-[25px] sm:text-[32px] font-bold text-left'>
						ГАЛЕРЕЯ
					</h2>
					<h3 className='text-(--accent-color) font-medium text-left'>
						КАЖДОЕ ФОТО - <br /> КУСОЧЕК АТМОСФЕРЫ «ЛЮДИ В УЮТЕ»
					</h3>
				</div>
				<Link
					href={'/gallery'}
					className='text-(--accent-color) text-lg font-medium cursor-pointer flex items-center hover:scale-102 transition-transform duration-300'
				>
					Смотреть еще
					<IoIosArrowRoundForward size={40} />
				</Link>
			</div>
			<div className='container max-w-5xl mx-auto px-3.75'>
				<div className=' pb-10'>
					<div>
						<div className='flex items-center gap-1 justify-end pb-2'>
							<div
								className='w-10.75 h-10.75 rounded-full bg-(--accent-color) cursor-pointer flex justify-center items-center  hover:scale-102 transition-transform duration-300'
								onClick={() => swiperRef.current?.swiper.slidePrev()}
							>
								<GoChevronLeft size={30} />
							</div>
							<div
								className='w-10.75 h-10.75 rounded-full bg-(--accent-color) cursor-pointer flex justify-center items-center  hover:scale-102 transition-transform duration-300'
								onClick={() => swiperRef.current?.swiper.slideNext()}
							>
								<GoChevronRight size={30} />
							</div>
						</div>
					</div>
					<GallerySlider swiperRef={swiperRef} />
				</div>
			</div>
		</section>
	)
}
