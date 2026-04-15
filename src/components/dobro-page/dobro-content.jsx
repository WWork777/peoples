'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import ServiceSlider from '../sliders/service-page-slider'
export default function DobroContent() {
	const swiperRef1 = useRef(null)
	const swiperRef2 = useRef(null)
	const swiperRef3 = useRef(null)

	const images = [
		'/images/dobro/block1/1.webp',
		'/images/dobro/block1/2.webp',
		'/images/dobro/block1/5.jpg',
		'/images/dobro/block1/3.jpg',
		'/images/dobro/block1/4.jpg',
	]
	const images2 = [
		'/images/dobro/block2/img1.jpg',
		'/images/dobro/block2/img2.jpg',
		'/images/dobro/block2/img3.jpg',
		'/images/dobro/block2/img4.jpg',
		'/images/dobro/block2/img5.jpg',
		'/images/dobro/block2/img6.jpg',
		'/images/dobro/block2/img7.jpg',
	]
	const images3 = [
		'/images/dobro/block3/6.jpg',
		'/images/dobro/block3/1.jpg',
		'/images/dobro/block3/2.jpg',
		'/images/dobro/block3/3.jpg',
		'/images/dobro/block3/4.jpg',
		'/images/dobro/block3/5.jpg',
		'/images/dobro/block3/7.jpg',
	]
	useEffect(() => {
		// Небольшая задержка, чтобы переопределить скролл браузера
		const timer = setTimeout(() => {
			window.scrollTo({
				top: 0,
				behavior: 'instant', // или 'smooth' для плавности
			})
		}, 10)

		return () => clearTimeout(timer)
	}, [])
	return (
		<>
		<div className='bg-background mt-10 px-3.75'>
				<div className='container max-w-7xl mx-auto'>
					<div className='flex  gap-6 lg:gap-8 items-stretch pt-10 pb-10'>
						{/* LEFT: big card */}
						<div className='w-full lg:flex-1 bg-white rounded-[32px] p-7 sm:p-10'>
							<h2 className='text-[22px] sm:text-[28px] font-semibold text-(--accent-color) '>
								У нас новый гость! Сахаров Марк со своей семьей.
							</h2>
						</div>
					</div>
					<div className='flex  gap-6 lg:gap-8 items-stretch  pb-10'>
						{/* LEFT: big card */}
						<div className='w-full lg:flex-1 bg-white rounded-[32px] p-7 sm:p-10'>
							<p className='text-[16px] sm:text-[18px] font-base text-black '>
								✨ Марк — юноша с огромным творческим даром и светлой душой. В свои 18 лет он уже успел покорить не одну сцену: читает стихи, 
								дарит зрителям свой вокал, представляет творчество на губернаторских приёмах и становится лауреатом 
								всероссийских конкурсов. А ещё он ведёт личный блог, рисует, снимает видео и с лёгкостью вдохновляет всех вокруг 🎤🎨
							</p>
							<br />
							<p className='text-[16px] sm:text-[18px] font-base text-black pb-1'>
								Команда гостевого комплекса «Люди в уюте» с радостью приняла Марка и его семью в Шерегеше. 
								Эта поездка стала для них временем перезагрузки, тихой радости и новых впечатлений 🏔️ За несколько дней Марк успел познакомиться с милыми альпаками на ферме 🦙, 
								получил заряд нежности от пушистых кроликов 🐇 и просто наслаждался прогулками под ласковым весенним солнцем.
							</p>
							<br />
							<p className='text-[16px] sm:text-[18px] font-base text-black pb-1'>
								☀️ Несмотря на оживлённость курортного посёлка, здесь удивительно спокойно и по-домашнему тепло. Марк и его близкие гуляли по сектору Е, 
								дышали морозным горным воздухом и ловили моменты тишины — той самой, которой так не хватает в ритме мегаполиса.
							</p>
							<br />
							<p className='text-[16px] sm:text-[18px] font-base text-black pb-1'>
								🥰 Отдельное сердце согрели душевные посиделки с Гульнарой и Елизаветой: ароматный чай, 
								румяные блинчики и разговоры по душам. Именно такие простые, но такие искренние мгновения остаются в памяти надолго.
							</p>
							<br />

							<p className='text-[16px] sm:text-[18px] font-base text-black pb-1'>
								Мы благодарим Марка и его замечательную семью за доверие, за открытость и за то вдохновение, которым они поделились с нами. 
								Такие встречи напоминают: сила — не в громких словах, а в умении видеть красоту, ценить близость и идти вперёд с улыбкой 💗
							</p>
							<br />
							<p className='text-[16px] sm:text-[18px] font-base text-black pb-1 '>
								Для нас особенно важно создавать пространство, где каждая семья чувствует себя принятой, защищённой и свободной. 
								Где можно выдохнуть, просто быть собой и наслаждаться моментом — в кругу близких, среди гор, в атмосфере настоящего уюта.
							</p>
							<br />
							<p className='text-[16px] sm:text-[18px] font-base text-black pb-1'>
								Спасибо, что были с нами, дорогие гости! 🤍
								Ждём вас снова — за новыми впечатлениями, тёплыми встречами и тем самым чувством дома, которое остаётся в сердце ❤️
							</p>
							<br />
							<p className='text-[16px] sm:text-[18px] font-base text-black '>
								#ЛюдиВУюте #Шерегеш #ОтдыхСДушой #СемейныеЦенности #ТворчествоИТепло
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className='w-full mb-16 bg-white sm:p-20 pb-10 pt-10 px-3.75'>
				<div className='container max-w-7xl mx-auto'>
					<ServiceSlider swiperRef={swiperRef3} images={images3} />
				</div>
			</div>
			<div className='bg-background mt-10 px-3.75'>
				<div className='container max-w-7xl mx-auto'>
					<div className='flex  gap-6 lg:gap-8 items-stretch pt-10 pb-10'>
						{/* LEFT: big card */}
						<div className='w-full lg:flex-1 bg-white rounded-[32px] p-7 sm:p-10'>
							<h2 className='text-[22px] sm:text-[28px] font-semibold text-(--accent-color) '>
								Мы открываем рубрику «Твори Добро Сегодня» 💫
							</h2>
						</div>
					</div>
					<div className='flex  gap-6 lg:gap-8 items-stretch  pb-10'>
						{/* LEFT: big card */}
						<div className='w-full lg:flex-1 bg-white rounded-[32px] p-7 sm:p-10'>
							<p className='text-[16px] sm:text-[18px] font-light text-black '>
								В суете повседневности мы часто не замечаем, какие удивительные
								события происходят вокруг и какие люди живут совсем рядом с
								нами. Совсем недавно у нас в гостях побывала талантливая девушка
								Алена Мельникова из Верх-Чебулы, ей 20 лет и она пишет картины
								носом 🌄
							</p>
							<p className='text-[16px] sm:text-[18px] font-light text-black '>
								Несмотря на ограниченные возможности здоровья, живопись Алёны
								всегда светла и радостна. Это яркие цветы, живые пейзажи и
								натюрморты. Невозможно поверить в то, что автор - девушка с
								тяжелой формой ДЦП. Передвигается Алёна на инвалидной коляске,
								общается только глазами и мимикой, руки и ноги её не слушаются,
								единственное, что она контролирует - голову.
							</p>
							<p className='text-[16px] sm:text-[18px] font-base text-black py-10 '>
								👩‍🎨С творчеством Мельниковой Алены можно познакомиться здесь:{' '}
								<Link
									href={'https://t.me/Alenamelnikova2004'}
									className='text-(--accent-color) font-semibold cursor-pointer'
								>
									t.me/Alenamelnikova2004
								</Link>
							</p>
							<p className='text-[16px] sm:text-[18px] font-base text-black pb-1'>
								Команда гостевого комплекса «Люди в уюте» была очарована юной
								художницей и впечатлена её талантом и жизнелюбием. Мы пригласили
								Алену провести время (безоплатно) в п. Шерегеш и запечатлеть
								зимние красоты нашего родного края.
							</p>
							<p className='text-[16px] sm:text-[18px] font-base text-black pb-1'>
								😍Конечно, это было необыкновенное время: Алена много рисовала,
								радовалась, часто улыбалась, наблюдала за тем, как быстро
								меняется небо за окном, а загадочная гора Зеленая то появлялась
								из-за облаков, то таинственно пропадала.
							</p>
							<p className='text-[16px] sm:text-[18px] font-base text-black pb-1'>
								❄️В течение трёх дней Алёна дышала морозным горным воздухом,
								побывала на секторе Е, много гуляла, а главное – провела это
								время на пленэре с учителем!
							</p>
							<p className='text-[16px] sm:text-[18px] font-base text-black pb-1'>
								Наставница Алёны - член союза художников России, ведущий
								преподаватель Кемеровского Областного художественного училища
								🎨Евгения Николаевна Юманова – замечательная, отзывчивая
								женщина. Все наши юные гости, находящиеся в это время в гостевом
								комплексе «Люди в уюте» побывали на мастер-классе от Елены
								Николаевны и написали свои первые картины маслом! 🖌
							</p>
							<p className='text-[16px] sm:text-[18px] font-base text-black py-10 '>
								Особую благодарность мы выражаем членам организации "ОПОРЫ
								России" . Гордимся, что живем среди столь замечательных людей!
								За три часа мы собрали денежные средства для оплаты стоимости
								проезда Алены на социальном такси из п. Верх-Чебула в п. Шерегеш
								в размере 24260 рублей. Вместе мы сила! 💪
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className='w-full mb-16 bg-white sm:p-20 pb-10 pt-10 px-3.75'>
				<div className='container max-w-7xl mx-auto'>
					<ServiceSlider swiperRef={swiperRef1} images={images} />
				</div>
			</div>
			<div className='bg-background mt-10 px-3.75'>
				<div className='container max-w-7xl mx-auto'>
					<div className='flex  gap-6 lg:gap-8 items-stretch pt-10 pb-10'>
						{/* LEFT: big card */}
						<div className='w-full lg:flex-1 bg-white rounded-[32px] p-7 sm:p-10'>
							<h2 className='text-[22px] sm:text-[28px] font-semibold text-(--accent-color) '>
								Недавно в гостях у нашего комплекса побывала удивительно светлая
								и вдохновляющая семья — мама Ульяна и её двое детей, Костя и
								Анечка.
							</h2>
						</div>
					</div>
					<div className='flex  gap-6 lg:gap-8 items-stretch  pb-10'>
						{/* LEFT: big card */}
						<div className='w-full lg:flex-1 bg-white rounded-[32px] p-7 sm:p-10'>
							<p className='text-[16px] sm:text-[18px] font-base text-black '>
								👩‍🦰 Ульяна — человек тонкого вкуса и большого сердца. Она
								занимается украшением гипсовых изделий, создавая из простых форм
								настоящие произведения уюта и тепла. В каждую работу она
								вкладывает заботу и любовь — и это чувствуется с первого взгляда
								🤍
							</p>
							<br />
							<p className='text-[16px] sm:text-[18px] font-base text-black pb-1'>
								Команда гостевого комплекса «Люди в уюте» пригласила семью
								Ульяны в Шерегеш. Поездка в горы 🏔 стала для семьи настоящим
								приключением и маленькой победой. За несколько дней сын Ульяны,
								Константин, с лёгкостью научился кататься на лыжах!⛷ Его
								упорство, смелость и радость от первых самостоятельных спусков
								стали для нас особенным моментом. Мы видели, как с каждым днём в
								нём росла уверенность, а вместе с ней — счастливая улыбка.
							</p>
							<br />
							<p className='text-[16px] sm:text-[18px] font-base text-black pb-1'>
								👧 Анечка провела время по-своему ярко и радостно: она с
								удовольствием каталась с нашей снежной горки, смеялась, играла и
								с интересом исследовала игрушки, которые мы подготовили в доме
								специально для маленьких гостей. 🎠✨ В её глазах светилось
								искреннее любопытство и неподдельный восторг. В её глазах
								светилось искреннее любопытство и неподдельный восторг.
							</p>
							<br />
							<p className='text-[16px] sm:text-[18px] font-base text-black pb-1'>
								❄️В течение трёх дней Алёна дышала морозным горным воздухом,
								побывала на секторе Е, много гуляла, а главное – провела это
								время на пленэре с учителем!
							</p>
							<br />

							<p className='text-[16px] sm:text-[18px] font-base text-black pb-1'>
								Ульяна пригласила всех желающих на мастер-класс по украшению
								гипсовых изделий. Мы, конечно же, не отказались! Это было
								потрясающее времяпрепровождение! ✨
							</p>
							<p className='text-[16px] sm:text-[18px] font-base text-black py-10 '>
								Мы благодарим Ульяну и её замечательных детей за доверие и за то
								тепло, которое они оставили в нашем доме. Такие встречи
								напоминают нам, что творить добро — это не про громкие слова, а
								про внимание, поддержку и искреннее участие. 💛
							</p>
							<p className='text-[16px] sm:text-[18px] font-base text-black '>
								Для нас особенно важно создавать пространство, где каждая семья
								чувствует себя спокойно, безопасно и по-настоящему принятой. Где
								дети могут радоваться простым моментам, а родители — выдохнуть и
								просто быть рядом
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className='w-full mb-16 bg-white sm:p-20 pb-10 pt-10 px-3.75'>
				<div className='container max-w-7xl mx-auto'>
					<ServiceSlider swiperRef={swiperRef2} images={images2} />
				</div>
			</div>

			
		</>
	)
}
