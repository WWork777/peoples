import Link from 'next/link'
export default function Dobro() {
	return (
		<section className='dobro px-3.75 py-10'>
			<div className='relative container max-w-7xl mx-auto min-h-55.75 rounded-3xl bg-[url("/images/dobro/dobro_bg.png")] w-full h-full bg-center bg-cover '>
				<div className='absolute inset-0 bg-black/50 rounded-3xl'></div>
				<div className='relative z-1 p-6 flex flex-col md:flex-row gap-8 md:gap-0'>
					<div className='w-full md:w-1/2'>
						<span className='text-[27px] font-medium'>Твори Добро Сегодня</span>
						<p className='text-[18px]'>
							Маленькие поступки - большое значение <br /> Поддерживаем людей и
							проекты, которым важно <br /> внимание сегодня
						</p>
						<div className='flex flex-wrap gap-2 md:gap-5 pt-2 md:pt-5'>
							<span className='text-[12px] border-2 py-0.5 px-2 md:px-10 rounded-xl font-semibold border-white'>
								Истории людей
							</span>
							<span className='text-[12px] border-2 py-0.5 px-2 md:px-10 rounded-xl font-semibold border-white'>
								Поддержка
							</span>
						</div>
					</div>
					<div className='w-full md:w-1/2 flex items-end justify-center md:justify-end '>
						<Link href={'/#'}>
							<button className='bg-white text-(--accent-color) px-16 py-2  font-bold rounded-3xl  cursor-pointer'>
								Открыть
							</button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}
