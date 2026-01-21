import ReviewsCarousel from './reviews-carousel'

export default function Reviews() {
	return (
		<section id='reviews' className='reviews bg-(--accent-color)'>
			<div className='container max-w-7xl mx-auto px-3.75 pb-10'>
				<div className='py-10 '>
					<h2 className='text-white text-[25px] sm:text-[32px] font-bold text-center uppercase pb-5'>
						Самый высокий рейтинг
					</h2>
					<h3 className='text-white font-medium text-center uppercase'>
						Отличная репутация на всех площадках Яндекс, Avito, 2GIS
					</h3>
				</div>
				<div>
					<ReviewsCarousel />
				</div>
			</div>
		</section>
	)
}
