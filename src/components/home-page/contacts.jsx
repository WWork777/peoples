import Link from 'next/link'
import SimpleContactForm from '../forms/simple-contact-form'
import YandexRatingBadge from '../yandex-rating-badge'

export default function Contacts() {
	return (
		<section
			id='contacts'
			className='contacts bg-[url("/images/contacts/contacts_bg.png")]  '
		>
			<div className='container max-w-7xl mx-auto px-3.75 py-10 flex flex-col md:flex-row'>
				<div className=' w-full md:w-1/2'>
					<h2 className='text-white text-[25px] sm:text-[32px] font-bold text-left'>
						КОНТАКТЫ
					</h2>
					<div className='flex flex-col sm:flex-row items-start gap-5 lg:gap-10 pt-5'>
						<YandexRatingBadge />
						<img
							className='w-[63px]'
							src='/images/contacts/Group_69.svg'
							alt='badge'
						/>
						<img
							className='w-[80px]'
							src='/images/contacts/Group_66.svg'
							alt='badge'
						/>
					</div>
					<span className='leading-6 pt-5 block font-medium'>
						Нам можно написать в мессенджеры, <br /> позвонить или просто
						приехать
					</span>
					<ul className='pt-10 font-medium'>
						<li className='pb-3'>Шерегеш, ул. Звездная, 8</li>
						<li className='pb-3'>+7 (923) 603-30-30</li>
						<li>lyudi.v.uyute@yandex.ru</li>
					</ul>
					<ul className='socials flex items-center gap-4 list-none py-5'>
						<li className='inline-block'>
							<a
								className='w-8 hover:opacity-80 transition-opacity block'
								href='https://wa.me/79991234567'
								target='_blank'
								rel='noopener noreferrer'
								aria-label='Напишите нам в WhatsApp'
							>
								<img
									src='/images/contacts/wa.webp'
									alt='WhatsApp'
									loading='lazy'
									className='block w-full h-auto'
								/>
							</a>
						</li>
						<li className='inline-block'>
							<a
								className='w-8 hover:opacity-80 transition-opacity block'
								href='https://t.me/lyudivuyuteinfo'
								target='_blank'
								rel='noopener noreferrer'
								aria-label='Наш Telegram канал'
							>
								<img
									src='/images/contacts/tg.webp'
									alt='Telegram'
									loading='lazy'
									className='block w-full h-auto'
								/>
							</a>
						</li>
						<li className='inline-block'>
							<a
								className='w-19 hover:opacity-80 transition-opacity block'
								href='https://2gis.ru/sheregesh/firm/70000001094596851?m=87.98269%2C52.951922%2F16&utm_source=widget_firm'
								target='_blank'
								rel='noopener noreferrer'
								aria-label='Наш 2gis'
							>
								<img
									src='/images/contacts/2gis.webp'
									alt='2gis'
									loading='lazy'
									className=''
								/>
							</a>
						</li>
						<li className='inline-block'>
							<a
								className='w-8 hover:opacity-80 transition-opacity block'
								href='https://m.vk.com/lyudivuyute'
								target='_blank'
								rel='noopener noreferrer'
								aria-label='Наша страница ВКонтакте'
							>
								<img
									src='/images/contacts/vk.webp'
									alt='ВКонтакте'
									loading='lazy'
									className='block w-full h-auto'
								/>
							</a>
						</li>
					</ul>
					<span className='leading-6 pt-5 block font-medium'>
						Мы работаем круглосуточно без выходных!
					</span>
					<ul className='pt-5 '>
						<li className='pb-1'>ИП Мальцева Наталья Александровна</li>
						<li className='pb-1'>ИНН 420213742466</li>
						<li>Номер реестровой записи С42202501655</li>
					</ul>
					<ul className='pt-5 text-[12px]'>
						<li className='pb-1'>
							<Link href={'/privacy'}>Политика конфиденциальности</Link>
						</li>
						<li className='pb-1 text-orange-500'>
							<Link href={'/rules'}>Правила проживания</Link>
						</li>
						<li>
							<Link href={'/offer'}>Договор оферты</Link>
						</li>
					</ul>
					<Link className='flex items-center gap-5 pt-10' href={'/'}>
						<img src='/images/logo/logo.webp' alt='logotype' />
						<span>
							<img src='/images/logo/text.webp' alt='logo-text' />
						</span>
					</Link>
				</div>
				<div className='w-full md:w-1/2 flex items-center justify-center md:justify-start'>
					<div>
						<span className='text-[24px] font-medium'>
							Если остались вопросы:
						</span>
						<p className='leading-4 font-medium py-8'>
							Оставьте заявку и мы свяжемся с вами в <br /> скором времени
						</p>
						<SimpleContactForm />
					</div>
				</div>
			</div>
		</section>
	)
}
