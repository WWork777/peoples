import './reviewSummary.scss' // Подключаем стили

const getPlatformIcon = platform => {
	switch (platform) {
		case 'Яндекс Карты':
			return (
				<img
					src='/icons/yandex-color-icon.svg'
					alt='Яндекс'
					className='platform-icon'
				/>
			)
		case '2ГИС':
			return (
				<img
					src='/icons/double-gis-color-icon.svg'
					alt='2ГИС'
					className='platform-icon'
				/>
			)
		case 'Авито':
			return (
				<img src='/icons/avito.ru.svg' alt='Авито' className='platform-icon' />
			)
		default:
			return null
	}
}

const ReviewSummary = ({
	title,
	platform,
	rating,
	reviews,
	scores,
	primaryAction,
	secondaryAction,
	link,
}) => {
	return (
		<div className=' mb-4'>
			<div className='review-summary card p-4 bg-background  '>
				<div className='card-body'>
					<h5 className='card-title'>{title}</h5>
					<div className='card-subtitle text-muted mb-3 flex items-center'>
						{getPlatformIcon(platform)}
						<span className='ms-2'>{platform}</span>
					</div>

					<div className='rating-summary flex items-center'>
						<span className='rating-value '>{rating}</span>
						<div>
							<div className='stars'>
								{'★'
									.repeat(Math.round(rating))
									.split('')
									.map((star, index) => (
										<span key={index} className='text-warning'>
											{star}
										</span>
									))}
							</div>
							<p className='reviews-count  mb-3'>
								<span className=''>{reviews} отзывов</span> • {scores} оценок
							</p>
						</div>
					</div>

					<div className='buttons flex gap-2'>
						<a
							href={link}
							target='_blank'
							rel='noopener noreferrer'
							className='text-(--accent-color) font-medium cursor-pointer'
						>
							{secondaryAction}
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

const ReviewsRow = () => {
	const reviewsData = [
		{
			title: 'Люди в уюте',
			platform: 'Авито',
			rating: 5.0,
			reviews: 1,
			scores: 1,
			secondaryAction: 'Оставить отзыв',
			link: 'https://www.avito.ru/brands/i332109824/all/doma_dachi_kottedzhi?src=search_seller_info&iid=4605978509&item_type=str_trx&sellerId=860fc367c85345dbbf834bcecbda937c', // Ссылка для Авито, заменить на актуальную
		},
		{
			title: 'Люди в уюте',
			platform: '2ГИС',
			rating: 5.0,
			reviews: 66,
			scores: 66,
			secondaryAction: 'Оставить отзыв',
			link: 'https://2gis.ru/sheregesh/firm/70000001094596851?m=87.98269%2C52.951922%2F16&utm_source=widget_firm',
		},
		{
			title: 'Люди в уюте',
			platform: 'Яндекс Карты',
			rating: 5.0,
			reviews: 48,
			scores: 48,
			secondaryAction: 'Оставить отзыв',
			link: 'https://yandex.ru/maps/org/lyudi_v_uyute/26931269781/?ll=87.982706%2C52.951912&z=17.05',
		},
	]

	return (
		<div className='grid gap-2 md:grid-cols-3 lg:gap-5 items-center'>
			{reviewsData.map((data, index) => (
				<ReviewSummary className={'w-full'} key={index} {...data} />
			))}
		</div>
	)
}

export default ReviewsRow
