export default function TransferPage() {
	return (
		<div className='bg-background mt-10 px-3.75'>
			<div className='container max-w-7xl mx-auto'>
				<h2 className='text-(--accent-color) text-[25px] sm:text-[32px] font-bold text-center pt-10'>
					ТРАНСФЕР
				</h2>
				<h3 className='text-(--accent-color) font-medium text-center pt-10'>
					Предлагаем начать ваш отдых с комфортом!
				</h3>
			</div>
			<div className='container max-w-7xl mx-auto flex flex-col md:flex-row gap-5 py-10'>
				<div className='w-full md:w-1/2'>
					<span className='text-[26px] text-(--accent-color) font-medium leading-7 pb-[24px] block'>
						ТРАНСФЕР ИЗ АЭРОПОРТА <br /> ДО ГОСТЕВОГО <br /> КОМПЛЕКСА
					</span>
					<p className='text-[18px] text-black md:max-w-[75%] pb-[30px] font-light'>
						Наш водитель встретит вас с табличкой сразу после выхода из зоны
						прилета, позаботится и учтет ваши потребности и пожелания. <br /> Мы
						всегда на связи, чтобы, при необходимости, сопровождать вас даже
						онлайн. Задержка или отмена вашего рейса не станет проблемой, мы
						оперативно скорректируем время подачи трансфера и доставим вас к
						месту отдыха с максимальным комфортом и безопасностью
					</p>
					<button className='bg-(--accent-color) px-16 py-2 rounded-3xl cursor-pointer mx-auto block'>
						Заказать
					</button>
				</div>
				<div className='w-full md:w-1/2 '>
					<div className='h-[340px] max-w-[560px] mx-auto '>
						<img
							src='/images/additional/1.png'
							alt='transfer'
							className='w-full h-full object-cover rounded-3xl '
						/>
					</div>
				</div>
			</div>
			<div className='container max-w-7xl mx-auto flex flex-col md:flex-row gap-5 py-20'>
				<div className='w-full md:w-1/2 '>
					<div className='h-[340px] max-w-[560px] mx-auto '>
						<img
							src='/images/additional/11.png'
							alt='transfer'
							className='w-full h-full object-cover rounded-3xl '
						/>
					</div>
				</div>
				<div className='w-full md:w-1/2'>
					<span className='text-[26px] text-(--accent-color) font-medium leading-7 pb-[24px] block'>
						ПРОКАТ АВТОМОБИЛЯ
					</span>
					<p className='text-[18px] text-black md:max-w-[75%] pb-[30px] font-light'>
						Если вы предпочитаете передвигаться самостоятельно, к вашим услугам
						современные подготовленные к зимним условиям автомобили. Старт
						проката может быть как непосредственно из аэропорта, так и по месту
						требования. Опция проката авто доступна сроком от суток и только по
						Кемеровской области. Мы открыты к вашим пожеланиям и, если
						потребуется, сможем найти индивидуальные решения.
					</p>
					<button className='bg-(--accent-color) px-16 py-2 rounded-3xl cursor-pointer mx-auto block'>
						Заказать
					</button>
				</div>
			</div>
		</div>
	)
}
