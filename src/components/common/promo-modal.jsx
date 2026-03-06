// 'use client'

// import { useEffect, useState } from 'react'

// export default function PromoModal() {
// 	const [isOpen, setIsOpen] = useState(false)
// 	const [formData, setFormData] = useState({
// 		name: '',
// 		phone: '',
// 	})

// 	// Управление скроллом body
// 	useEffect(() => {
// 		if (isOpen) {
// 			// Сохраняем текущую позицию скролла
// 			const scrollY = window.scrollY

// 			// Блокируем скролл
// 			document.body.style.position = 'fixed'
// 			document.body.style.top = `-${scrollY}px`
// 			document.body.style.width = '100%'
// 			document.body.style.overflowY = 'scroll' // Сохраняем ширину скролла
// 		} else {
// 			// Восстанавливаем скролл
// 			const scrollY = document.body.style.top
// 			document.body.style.position = ''
// 			document.body.style.top = ''
// 			document.body.style.width = ''
// 			document.body.style.overflowY = ''

// 			// Возвращаем позицию скролла
// 			if (scrollY) {
// 				window.scrollTo(0, parseInt(scrollY || '0') * -1)
// 			}
// 		}

// 		// Очистка при размонтировании
// 		return () => {
// 			document.body.style.position = ''
// 			document.body.style.top = ''
// 			document.body.style.width = ''
// 			document.body.style.overflowY = ''
// 		}
// 	}, [isOpen])

// 	useEffect(() => {
// 		const timer = setTimeout(() => {
// 			setIsOpen(true)
// 		}, 500)

// 		return () => clearTimeout(timer)
// 	}, [])

// 	const handlePhoneChange = e => {
// 		let value = e.target.value.replace(/\D/g, '') // Удаляем все нецифровые символы

// 		// Применяем маску +7(777)-777-7777
// 		if (value.length > 0) {
// 			if (value.length <= 1) {
// 				value = `+7(${value}`
// 			} else if (value.length <= 4) {
// 				value = `+7(${value.slice(1, 4)}`
// 			} else if (value.length <= 7) {
// 				value = `+7(${value.slice(1, 4)})-${value.slice(4, 7)}`
// 			} else {
// 				value = `+7(${value.slice(1, 4)})-${value.slice(4, 7)}-${value.slice(7, 11)}`
// 			}
// 		}

// 		setFormData(prev => ({
// 			...prev,
// 			phone: value,
// 		}))
// 	}

// 	const handleChange = e => {
// 		const { name, value } = e.target
// 		if (name === 'phone') {
// 			handlePhoneChange(e)
// 		} else {
// 			setFormData(prev => ({
// 				...prev,
// 				[name]: value,
// 			}))
// 		}
// 	}

// 	const handleSubmit = e => {
// 		e.preventDefault()
// 		console.log('Form Data:', formData)
// 		alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.')
// 		handleClose()
// 	}

// 	const handleClose = () => {
// 		setIsOpen(false)
// 	}

// 	// Обработчик нажатия Escape
// 	useEffect(() => {
// 		const handleEscape = e => {
// 			if (e.key === 'Escape' && isOpen) {
// 				handleClose()
// 			}
// 		}

// 		window.addEventListener('keydown', handleEscape)
// 		return () => window.removeEventListener('keydown', handleEscape)
// 	}, [isOpen])

// 	if (!isOpen) return null

// 	return (
// 		<div className='fixed inset-0 z-50 flex items-center justify-center'>
// 			<div
// 				className='absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ease-in-out'
// 				onClick={handleClose}
// 			/>

// 			<div className='relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 transform transition-all duration-300 ease-in-out scale-100 opacity-100'>
// 				<div className='p-6'>
// 					<h2 className='text-2xl font-bold text-center text-red-500 mb-2'>
// 						В период с 9 по 13 марта
// 					</h2>

// 					{/* Анимированная надпись Скидка 15% */}
// 					<div className='flex justify-center mb-6'>
// 						<div className='relative'>
// 							{/* Основная надпись с анимацией */}
// 							<p className='text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-500 animate-bounce animate-pulse'>
// 								<span className='inline-block animate-wiggle'>С</span>
// 								<span className='inline-block animate-wiggle animation-delay-100'>
// 									к
// 								</span>
// 								<span className='inline-block animate-wiggle animation-delay-150'>
// 									и
// 								</span>
// 								<span className='inline-block animate-wiggle animation-delay-200'>
// 									д
// 								</span>
// 								<span className='inline-block animate-wiggle animation-delay-250'>
// 									к
// 								</span>
// 								<span className='inline-block animate-wiggle animation-delay-300'>
// 									а
// 								</span>
// 								<span className='inline-block mx-2'></span>
// 								<span className='inline-block animate-wiggle animation-delay-350'>
// 									1
// 								</span>
// 								<span className='inline-block animate-wiggle animation-delay-400'>
// 									5
// 								</span>
// 								<span className='inline-block animate-wiggle animation-delay-450'>
// 									%
// 								</span>
// 								<span className='inline-block animate-wiggle animation-delay-500'>
// 									!
// 								</span>
// 							</p>

// 							{/* Дополнительная пульсирующая тень */}
// 							<div className='absolute inset-0 blur-xl bg-green-400/30 animate-pulse rounded-full -z-10'></div>
// 						</div>
// 					</div>

// 					{/* Альтернативный вариант с эмодзи и звездочками */}
// 					<div className='flex justify-center items-center gap-2 mb-4'>
// 						<span className='text-2xl animate-spin-slow'>✨</span>
// 						<span className='text-2xl animate-bounce'>🎉</span>
// 						<span className='text-2xl animate-spin-slow'>✨</span>
// 					</div>

// 					<form onSubmit={handleSubmit} className='space-y-4'>
// 						<div>
// 							<label
// 								htmlFor='name'
// 								className='block text-sm font-medium text-gray-700 mb-1'
// 							>
// 								Ваше имя
// 							</label>
// 							<input
// 								type='text'
// 								id='name'
// 								name='name'
// 								value={formData.name}
// 								onChange={handleChange}
// 								required
// 								className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-(--accent-color) focus:border-transparent transition duration-200 text-black outline-none'
// 								placeholder='Иван Иванов'
// 							/>
// 						</div>

// 						<div>
// 							<label
// 								htmlFor='phone'
// 								className='block text-sm font-medium text-gray-700 mb-1'
// 							>
// 								Номер телефона
// 							</label>
// 							<input
// 								type='tel'
// 								id='phone'
// 								name='phone'
// 								value={formData.phone}
// 								onChange={handleChange}
// 								required
// 								maxLength='18'
// 								className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-(--accent-color) focus:border-transparent transition duration-200 text-black outline-none'
// 								placeholder='+7(777)-777-7777'
// 							/>
// 						</div>

// 						<button
// 							type='submit'
// 							className='w-full bg-(--accent-color) hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition duration-200 transform hover:scale-105 hover:rotate-1'
// 						>
// 							Забронировать
// 						</button>
// 					</form>

// 					<button
// 						onClick={handleClose}
// 						className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition duration-200 hover:rotate-90 transform'
// 						aria-label='Закрыть'
// 					>
// 						<svg
// 							className='w-6 h-6'
// 							fill='none'
// 							stroke='currentColor'
// 							viewBox='0 0 24 24'
// 						>
// 							<path
// 								strokeLinecap='round'
// 								strokeLinejoin='round'
// 								strokeWidth={2}
// 								d='M6 18L18 6M6 6l12 12'
// 							/>
// 						</svg>
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }
'use client'

import { useEffect, useState } from 'react'

export default function PromoModal() {
	const [isOpen, setIsOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
	})

	// Управление скроллом body
	useEffect(() => {
		if (isOpen) {
			// Сохраняем текущую позицию скролла
			const scrollY = window.scrollY

			// Блокируем скролл
			document.body.style.position = 'fixed'
			document.body.style.top = `-${scrollY}px`
			document.body.style.width = '100%'
			document.body.style.overflowY = 'scroll' // Сохраняем ширину скролла
		} else {
			// Восстанавливаем скролл
			const scrollY = document.body.style.top
			document.body.style.position = ''
			document.body.style.top = ''
			document.body.style.width = ''
			document.body.style.overflowY = ''

			// Возвращаем позицию скролла
			if (scrollY) {
				window.scrollTo(0, parseInt(scrollY || '0') * -1)
			}
		}

		// Очистка при размонтировании
		return () => {
			document.body.style.position = ''
			document.body.style.top = ''
			document.body.style.width = ''
			document.body.style.overflowY = ''
		}
	}, [isOpen])

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsOpen(true)
		}, 500)

		return () => clearTimeout(timer)
	}, [])

	const handlePhoneChange = e => {
		let value = e.target.value.replace(/\D/g, '') // Удаляем все нецифровые символы

		// Применяем маску +7(777)-777-7777
		if (value.length > 0) {
			if (value.length <= 1) {
				value = `+7(`
			} else if (value.length <= 4) {
				value = `+7(${value.slice(1, 4)}`
			} else if (value.length <= 7) {
				value = `+7(${value.slice(1, 4)})-${value.slice(4, 7)}`
			} else {
				value = `+7(${value.slice(1, 4)})-${value.slice(4, 7)}-${value.slice(7, 11)}`
			}
		}

		setFormData(prev => ({
			...prev,
			phone: value,
		}))
	}

	const handleChange = e => {
		const { name, value } = e.target
		if (name === 'phone') {
			handlePhoneChange(e)
		} else {
			setFormData(prev => ({
				...prev,
				[name]: value,
			}))
		}
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setIsLoading(true)

		try {
			const response = await fetch('/api/submit-promo', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: formData.name,
					phone: formData.phone,
				}),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || 'Ошибка при отправке')
			}

			// Успешная отправка
			console.log('✅ Заявка отправлена:', data)

			// Показываем красивое уведомление об успехе
			alert('✅ Спасибо за заявку! Мы свяжемся с вами в ближайшее время.')

			// Очищаем форму
			setFormData({
				name: '',
				phone: '',
			})

			// Закрываем модальное окно
			handleClose()
		} catch (error) {
			console.error('❌ Ошибка:', error)

			// Показываем сообщение об ошибке
			alert(
				error.message ||
					'❌ Произошла ошибка при отправке. Пожалуйста, попробуйте позже.',
			)
		} finally {
			setIsLoading(false)
		}
	}

	const handleClose = () => {
		setIsOpen(false)
	}

	// Обработчик нажатия Escape
	useEffect(() => {
		const handleEscape = e => {
			if (e.key === 'Escape' && isOpen) {
				handleClose()
			}
		}

		window.addEventListener('keydown', handleEscape)
		return () => window.removeEventListener('keydown', handleEscape)
	}, [isOpen])

	if (!isOpen) return null

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center'>
			<div
				className='absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ease-in-out'
				onClick={handleClose}
			/>

			<div className='relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 transform transition-all duration-300 ease-in-out scale-100 opacity-100'>
				<div className='p-6'>
					<h2 className='text-base xs:text-2xl font-bold text-center text-red-500 mb-2'>
						В период с 9 по 13 марта
					</h2>

					{/* Анимированная надпись Скидка 15% */}
					<div className='flex justify-center mb-6'>
						<div className='relative'>
							{/* Основная надпись с анимацией */}
							<p className='text-3xl xs:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-500 animate-bounce animate-pulse'>
								<span className='inline-block animate-wiggle'>С</span>
								<span className='inline-block animate-wiggle animation-delay-100'>
									к
								</span>
								<span className='inline-block animate-wiggle animation-delay-150'>
									и
								</span>
								<span className='inline-block animate-wiggle animation-delay-200'>
									д
								</span>
								<span className='inline-block animate-wiggle animation-delay-250'>
									к
								</span>
								<span className='inline-block animate-wiggle animation-delay-300'>
									а
								</span>
								<span className='inline-block mx-2'></span>
								<span className='inline-block animate-wiggle animation-delay-350'>
									1
								</span>
								<span className='inline-block animate-wiggle animation-delay-400'>
									5
								</span>
								<span className='inline-block animate-wiggle animation-delay-450'>
									%
								</span>
								<span className='inline-block animate-wiggle animation-delay-500'>
									!
								</span>
							</p>

							{/* Дополнительная пульсирующая тень */}
							<div className='absolute inset-0 blur-xl bg-green-400/30 animate-pulse rounded-full -z-10'></div>
						</div>
					</div>

					{/* Альтернативный вариант с эмодзи и звездочками */}
					{/* <div className='flex justify-center items-center gap-2 mb-4'>
						<span className='text-2xl animate-spin-slow'>✨</span>
						<span className='text-2xl animate-bounce'>🎉</span>
						<span className='text-2xl animate-spin-slow'>✨</span>
					</div> */}

					<form onSubmit={handleSubmit} className='space-y-4'>
						<div>
							<label
								htmlFor='name'
								className='block text-sm font-medium text-gray-700 mb-1'
							>
								Ваше имя
							</label>
							<input
								type='text'
								id='name'
								name='name'
								value={formData.name}
								onChange={handleChange}
								required
								disabled={isLoading}
								className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-(--accent-color) focus:border-transparent transition duration-200 text-black outline-none disabled:bg-gray-100 disabled:cursor-not-allowed'
								placeholder='Иван Иванов'
							/>
						</div>

						<div>
							<label
								htmlFor='phone'
								className='block text-sm font-medium text-gray-700 mb-1'
							>
								Номер телефона
							</label>
							<input
								type='tel'
								id='phone'
								name='phone'
								value={formData.phone}
								onChange={handleChange}
								required
								maxLength='18'
								disabled={isLoading}
								className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-(--accent-color) focus:border-transparent transition duration-200 text-black outline-none disabled:bg-gray-100 disabled:cursor-not-allowed'
								placeholder='+7(777)-777-7777'
							/>
						</div>

						<button
							type='submit'
							disabled={isLoading}
							className={`w-full bg-(--accent-color) hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition-all duration-200 transform hover:scale-105 hover:rotate-1 ${
								isLoading
									? 'opacity-50 cursor-not-allowed hover:scale-100 hover:rotate-0'
									: ''
							}`}
						>
							{isLoading ? (
								<div className='flex items-center justify-center gap-2'>
									<svg
										className='animate-spin h-5 w-5 text-white'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
									>
										<circle
											className='opacity-25'
											cx='12'
											cy='12'
											r='10'
											stroke='currentColor'
											strokeWidth='4'
										></circle>
										<path
											className='opacity-75'
											fill='currentColor'
											d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
										></path>
									</svg>
									<span>Отправка...</span>
								</div>
							) : (
								'Забронировать'
							)}
						</button>
					</form>

					<button
						onClick={handleClose}
						disabled={isLoading}
						className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition duration-200 hover:rotate-90 transform disabled:opacity-50 disabled:cursor-not-allowed'
						aria-label='Закрыть'
					>
						<svg
							className='w-6 h-6'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	)
}
