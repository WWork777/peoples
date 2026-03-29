import Link from 'next/link'
export default function Loyalty() {
	return (
		<section className='gallery'>
			<div className='container max-w-7xl mx-auto px-3.75 flex flex-col sm:flex-row sm:justify-between sm:items-center'>
				<div className='pt-10 pb-5 '>
					<h2 className='text-(--accent-color) text-[25px] sm:text-[32px] font-bold text-left leading-8  xs:leading-normal pb-5'>
						ПРОГРАММА ЛОЯЛЬНОСТИ
					</h2>
					<h3 className='text-(--accent-color) font-medium text-left'>
						КЭШБЕК 30% НА ПРОЖИВАНИЕ <br /> В ГОСТЕВОМ КОМПЛЕКСЕ "ЛЮДИ В УЮТЕ"
					</h3>
				</div>
			</div>
			<div className='container max-w-480 mx-auto px-3.75 bg-white'>
				<div className='max-w-360 px-2.5 mx-auto py-10 flex flex-col gap-10 md:flex-row'>
					<div className='w-full md:w-1/2 flex flex-col justify-center'>
						<h4 className='text-(--accent-color) lg:text-lg 2xl:text-xl  pb-8 sm:pb-10'>
							При посещении СТК Шерегеш, для жителей Кузбасса <br /> действует
							программа лояльности: кэшбэк на проживание <br /> в гостевом
							комплексе "Люди в уюте".
						</h4>
						<Link
							type='button'
							href='/loyalty'
							className='bg-[#0E4B3B] hover:bg-[#0C4032] text-white font-bold px-8 py-2 rounded-2xl cursor-pointer  w-max block transition-colors text-center'
						>
							<span>Подробнее →</span>
						</Link>
					</div>
					<div className='rounded-3xl hidden md:block w-full md:w-1/2'>
						<img
							src='/loyalty/loyalty.jpg'
							alt='img'
							className='rounded-3xl w-full h-full object-cover'
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
