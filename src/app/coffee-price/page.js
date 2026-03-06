'use client'
import { useEffect, useState } from 'react'

// Функция для форматирования телефона с маской
const formatPhoneNumber = value => {
	// Удаляем все нецифровые символы
	const numbers = value.replace(/\D/g, '')

	// Если номер начинается с 7 или 8, обрабатываем соответственно
	let formattedNumbers = numbers
	if (numbers.startsWith('8')) {
		formattedNumbers = '7' + numbers.slice(1)
	}

	// Ограничиваем длину до 11 цифр (включая 7)
	const limitedNumbers = formattedNumbers.slice(0, 11)

	// Применяем маску +7 (999) 999-99-99
	if (limitedNumbers.length <= 1) {
		return '+7'
	} else if (limitedNumbers.length <= 4) {
		return `+7 (${limitedNumbers.slice(1)}`
	} else if (limitedNumbers.length <= 7) {
		return `+7 (${limitedNumbers.slice(1, 4)}) ${limitedNumbers.slice(4)}`
	} else if (limitedNumbers.length <= 9) {
		return `+7 (${limitedNumbers.slice(1, 4)}) ${limitedNumbers.slice(4, 7)}-${limitedNumbers.slice(7)}`
	} else {
		return `+7 (${limitedNumbers.slice(1, 4)}) ${limitedNumbers.slice(4, 7)}-${limitedNumbers.slice(7, 9)}-${limitedNumbers.slice(9, 11)}`
	}
}

// Функция для очистки телефона от маски (для отправки на сервер)
const cleanPhoneNumber = formattedPhone => {
	return formattedPhone.replace(/\D/g, '')
}

export default function PromoModal() {
	const [isOpen, setIsOpen] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		phone: '+7',
	})

	useEffect(() => {
		// Плавное появление модального окна через 1 секунду после загрузки
		const timer = setTimeout(() => {
			setIsOpen(true)
		}, 1000)

		return () => clearTimeout(timer)
	}, [])

	// Обработчик изменения телефона с маской
	const handlePhoneChange = e => {
		const formatted = formatPhoneNumber(e.target.value)
		setFormData(prev => ({ ...prev, phone: formatted }))
	}

	const handleInputChange = e => {
		const { name, value } = e.target

		if (name === 'phone') {
			handlePhoneChange(e)
		} else {
			setFormData(prev => ({ ...prev, [name]: value }))
		}
	}

	const handleSubmit = e => {
		e.preventDefault()

		// Проверка, что телефон введен полностью (не только +7)
		if (formData.phone.replace(/\D/g, '').length < 11) {
			alert('Введите полный номер телефона')
			return
		}

		console.log('Form submitted:', formData)
		// Здесь можно добавить отправку данных на сервер
		setIsOpen(false)
	}

	const closeModal = () => {
		setIsOpen(false)
	}

	if (!isOpen) return null

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center'>
			{/* Затемненный фон с анимацией появления */}
			<div
				className='absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out'
				onClick={closeModal}
			/>

			{/* Модальное окно с анимацией появления */}
			<div className='relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all duration-300 ease-in-out scale-100 opacity-100'>
				<div className='p-6'>
					{/* Заголовок с акцией */}
					<h2 className='text-2xl font-bold text-center mb-4 text-red-600'>
						В период с 9 по 13 марта
					</h2>
					<p className='text-3xl font-extrabold text-center mb-6 text-green-600'>
						Скидка 15%!
					</p>

					{/* Форма с полями */}
					<form onSubmit={handleSubmit} className='space-y-4'>
						<div>
							<label
								htmlFor='name'
								className='block text-sm font-medium text-gray-700 mb-1'
							>
								Имя
							</label>
							<input
								type='text'
								id='name'
								name='name'
								value={formData.name}
								onChange={handleInputChange}
								required
								className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition'
								placeholder='Введите ваше имя'
							/>
						</div>

						<div>
							<label
								htmlFor='phone'
								className='block text-sm font-medium text-gray-700 mb-1'
							>
								Телефон
							</label>
							<input
								type='tel'
								id='phone'
								name='phone'
								value={formData.phone}
								onChange={handleInputChange}
								required
								className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition'
								placeholder='+7 (999) 999-99-99'
							/>
						</div>

						<button
							type='submit'
							className='w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium text-lg'
						>
							Получить скидку
						</button>
					</form>

					{/* Кнопка закрытия */}
					<button
						onClick={closeModal}
						className='absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition'
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
								strokeWidth='2'
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	)
}
