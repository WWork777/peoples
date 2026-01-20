import ReviewsCarousel from './reviews-carousel'

export default function Reviews() {
	return (
		<section id='reviews' className='reviews bg-(--accent-color)'>
			<div className='container max-w-7xl mx-auto px-3.75 pb-10'>
				<div className='py-10 '>
					<h2 className='text-white text-[25px] sm:text-[32px] font-bold text-left'>
						ОТЗЫВЫ НАШИХ УЮТНЫХ ГОСТЕЙ
					</h2>
				</div>
				<div>
					<ReviewsCarousel />
				</div>
			</div>
		</section>
	)
}
