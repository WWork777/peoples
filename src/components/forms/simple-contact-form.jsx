'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const SimpleContactForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm()

	const [isSuccess, setIsSuccess] = useState(false)

	const onSubmit = async data => {
		console.log('Данные формы:', data)

		// Эмуляция отправки
		await new Promise(resolve => setTimeout(resolve, 1000))

		// Показываем успешное сообщение
		setIsSuccess(true)

		// Сбрасываем форму
		reset()

		// Скрываем сообщение через 3 секунды
		setTimeout(() => setIsSuccess(false), 3000)
	}

	return (
		<div className='max-w-md  pl-0 p-6 rounded-xl '>
			{isSuccess && (
				<div className='mb-4 p-3 bg-green-100 text-green-700 rounded-lg'>
					Спасибо! Мы скоро с вами свяжемся.
				</div>
			)}

			<form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
				{/* Поле Имя */}
				<div>
					<label className='block text-white mb-2 font-medium'>
						Имя
						<span className='text-red-500 ml-1'>*</span>
					</label>
					<input
						type='text'
						{...register('name', {
							required: 'Введите ваше имя',
							minLength: {
								value: 2,
								message: 'Минимум 2 символа',
							},
							maxLength: {
								value: 50,
								message: 'Максимум 50 символов',
							},
						})}
						className={`w-full px-4 py-3 border rounded-3xl focus:outline-none focus:ring-2 focus:white ${
							errors.name ? 'border-red-500' : 'border-gray-300'
						}`}
						placeholder='Иван Иванов'
					/>
					{errors.name && (
						<p className='mt-1 text-sm text-red-600'>{errors.name.message}</p>
					)}
				</div>

				{/* Поле Телефон */}
				<div>
					<label className='block text-white mb-2 font-medium'>
						Телефон
						<span className='text-red-500 ml-1'>*</span>
					</label>
					<input
						type='tel'
						{...register('phone', {
							required: 'Введите номер телефона',
							pattern: {
								value: /^[\d\s\-\+\(\)]+$/,
								message: 'Введите корректный номер телефона',
							},
							minLength: {
								value: 10,
								message: 'Минимум 10 цифр',
							},
						})}
						className={`w-full px-4 py-3 border rounded-3xl focus:outline-none focus:ring-2 focus:white ${
							errors.phone ? 'border-red-500' : 'border-gray-300'
						}`}
						placeholder='+7 (999) 123-45-67'
					/>
					{errors.phone && (
						<p className='mt-1 text-sm text-red-600'>{errors.phone.message}</p>
					)}
				</div>

				{/* Кнопка отправки */}
				<button
					type='submit'
					disabled={isSubmitting}
					className={`w-full py-3 px-4 rounded-3xl font-medium transition-colors ${
						isSubmitting
							? 'bg-gray-400 cursor-not-allowed'
							: 'bg-white hover:bg-white text-(--accent-color)'
					}`}
				>
					{isSubmitting ? (
						<span className='flex items-center justify-center'>
							<svg
								className='animate-spin h-5 w-5 mr-2 text-white'
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
								/>
								<path
									className='opacity-75'
									fill='currentColor'
									d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
								/>
							</svg>
							Отправка...
						</span>
					) : (
						'Отправить заявку'
					)}
				</button>

				{/* Подпись под формой */}
				<p className='text-sm text-white text-center'>
					Нажимая кнопку, вы соглашаетесь с{' '}
					<Link href={'/privacy'} className='text-orange-500'>
						политикой конфиденциальности
					</Link>
				</p>
			</form>
		</div>
	)
}

export default SimpleContactForm
