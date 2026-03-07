export default function LoyaltyPage() {
	return (
		<section className='loyalty bg-[url("/images/contacts/policy.png")] py-12 mt-10'>
			<div className='container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-8'>
					Программа лояльности для жителей Кузбасса
				</h1>

				<div className='prose prose-lg max-w-none text-black'>
					<div className='space-y-8'>
						{/* Основная информация */}
						<section>
							<h2 className='text-2xl font-semibold mb-4'>
								Кэшбэк 20% при посещении СТК Шерегеш
							</h2>
							<p className='mb-4'>
								Программа лояльности для жителей Кузбасса при посещении СТК
								Шерегеш позволяет получать кешбэк 20% при оплате услуг
								проживания.
							</p>
						</section>

						{/* Условия участия */}
						<section>
							<h2 className='text-2xl font-semibold mb-4'>Условия участия</h2>
							<div className='space-y-4'>
								<div className='bg-muted p-5 rounded-lg'>
									<p className='mb-3'>
										<strong>
											Принять участие в Программе лояльности может гражданин РФ:
										</strong>
									</p>
									<ul className='list-disc ml-6 space-y-2'>
										<li>достигший 18-летнего возраста;</li>
										<li>
											зарегистрированный по месту жительства на территории
											Кемеровской области-Кузбасса.
										</li>
									</ul>
								</div>
							</div>
						</section>

						{/* Как принять участие */}
						<section>
							<h2 className='text-2xl font-semibold mb-4'>
								Как принять участие
							</h2>
							<div className='space-y-4'>
								<div className='bg-muted p-5 rounded-lg'>
									<ol className='list-decimal ml-6 space-y-3'>
										<li>
											перейдите на сайт Госуслуги Кузбасса и подтвердить вашу
											прописку на территории Кузбасса.
										</li>
										<li>
											после подтверждения зарегистрируйте на сайте Госуслуги
											Кузбасса карту «Мир» в Программе лояльности для жителей
											Кузбасса при посещении СТК «Шерегеш».
										</li>
									</ol>
								</div>
							</div>
						</section>

						{/* Важные условия */}
						<section>
							<h2 className='text-2xl font-semibold mb-4'>Важные условия</h2>
							<div className='space-y-4'>
								<div className='bg-muted p-5 rounded-lg'>
									<ul className='list-disc ml-6 space-y-3'>
										<li>
											Оплачивайте услуги проживания и получайте кешбэк 20%.
										</li>
										<li>
											<strong className='text-red-600'>Внимание!</strong> Если
											вы желаете участвовать в акции, пожалуйста, обязательно
											сообщите об этом администратору по номеру телефона +7 923
											603 30 30.
										</li>
										<li>
											Кэшбэк начисляется при оплате картой «Мир». Владелец карты
											«Мир» и тот, кто оплачивает услуги и будет проживать в
											отеле, должны совпадать.
										</li>
										<li>
											Кэшбэк будет начислен на вашу карту «Мир» не ранее 3-х
											рабочих дней с момента покупки.
										</li>
									</ul>
								</div>
							</div>
						</section>

						{/* Контакты */}
						<section>
							<h2 className='text-2xl font-semibold mb-4'>
								Контакты для связи
							</h2>
							<div className='bg-muted p-5 rounded-lg'>
								<p className='mb-2'>
									<strong>Телефон:</strong> +7 923 603 30 30
								</p>
							</div>
						</section>
					</div>
				</div>
			</div>
		</section>
	)
}
