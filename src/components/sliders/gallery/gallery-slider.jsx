// 'use client'

// import 'swiper/css'
// import 'swiper/css/effect-coverflow'
// // import 'swiper/css/pagination'
// import { Autoplay, Navigation, Pagination } from 'swiper/modules'
// import { Swiper, SwiperSlide } from 'swiper/react'
// export default function GallerySlider() {
// 	const slides = [
// 		'/images/gallery/1.webp',
// 		'/images/gallery/2.webp',
// 		'/images/gallery/3.webp',
// 		'/images/gallery/4.webp',
// 		'/images/gallery/5.webp',
// 		'/images/gallery/6.webp',
// 		'/images/gallery/7.webp',
// 		'/images/gallery/8.webp',
// 		'/images/gallery/9.webp',
// 		'/images/gallery/10.webp',
// 		'/images/gallery/11.webp',
// 		'/images/gallery/12.webp',
// 		'/images/gallery/13.webp',
// 		'/images/gallery/14.webp',
// 		'/images/gallery/15.webp',
// 		'/images/gallery/16.webp',
// 		'/images/gallery/17.webp',
// 		'/images/gallery/18.webp',
// 		'/images/gallery/19.webp',
// 		'/images/gallery/20.jpg',
// 		'/images/gallery/21.jpg',
// 		'/images/gallery/22.jpg',
// 		'/images/gallery/23.jpg',
// 		'/images/gallery/24.webp',
// 	]
// 	return (
// 		<div>
// 			<Swiper
// 				// ref={swiperRef}
// 				loop={true}
// 				grabCursor={true}
// 				centeredSlides={false}
// 				// slidesPerView={3}
// 				// spaceBetween={0}
// 				pagination={false}
// 				navigation={false}
// 				// autoplay={{
// 				//   delay: 4000, // 4 секунды
// 				//   disableOnInteraction: false,
// 				//   pauseOnMouseEnter: true,
// 				//   waitForTransition: true,
// 				// }}
// 				speed={1000} // 1 секунда анимации
// 				modules={[Navigation, Pagination, Autoplay]}
// 				className='overflow-visible'
// 				breakpoints={{
// 					320: {
// 						slidesPerView: 1.3,
// 						spaceBetween: 15,
// 					},
// 					640: {
// 						slidesPerView: 1.5,
// 						spaceBetween: 20,
// 					},
// 					768: {
// 						slidesPerView: 1.5,
// 						spaceBetween: 25,
// 					},
// 					1024: {
// 						slidesPerView: 1.5, // Немного больше для выхода за границы
// 						spaceBetween: 15,
// 					},
// 					1280: {
// 						slidesPerView: 1.5, // Больше для эффекта выхода
// 						spaceBetween: 20,
// 					},
// 				}}
// 			>
// 				{slides.map(slide => (
// 					<SwiperSlide>
// 						<div className='flex items-center gap-0.5 pt-2 md:pt-1'>
// 							<img
// 								className='w-full h-full object-cover rounded-3xl'
// 								src={slide}
// 								alt='img'
// 							/>
// 						</div>
// 					</SwiperSlide>
// 				))}
// 			</Swiper>
// 		</div>
// 	)
// }
'use client'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function GallerySlider({ swiperRef }) {
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

	return (
		<div>
			<Swiper
				ref={swiperRef}
				loop={true}
				grabCursor={true}
				centeredSlides={false}
				pagination={false}
				navigation={false}
				speed={1000}
				modules={[Navigation, Pagination, Autoplay]}
				className='overflow-visible'
				breakpoints={{
					320: {
						slidesPerView: 1.3,
						spaceBetween: 15,
					},
					640: {
						slidesPerView: 1.5,
						spaceBetween: 20,
					},
					768: {
						slidesPerView: 1.5,
						spaceBetween: 25,
					},
					1024: {
						slidesPerView: 1.5,
						spaceBetween: 15,
					},
					1280: {
						slidesPerView: 1.5,
						spaceBetween: 20,
					},
				}}
			>
				{slides.map((slide, index) => (
					<SwiperSlide key={index}>
						<div className='flex items-center gap-0.5 pt-2 md:pt-1'>
							<img
								className='w-full h-full object-cover rounded-3xl'
								src={slide}
								alt='img'
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
