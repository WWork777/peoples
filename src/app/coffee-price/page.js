'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

// Данные о напитках
const drinks = [
	{
		id: 1,
		name: 'Эспрессо',
		volume: '250 мл',
		price: 180,
		image: '/coffee-price/1.webp',
		description: 'Насыщенный и крепкий',
	},
	{
		id: 2,
		name: 'Американо',
		volume: '250 мл',
		price: 250,
		image: '/coffee-price/2.webp',
		description: 'Мягкий вкус с ароматом',
	},
	{
		id: 3,
		name: 'Капучино',
		volume: '350 мл',
		price: 300,
		image: '/coffee-price/6.webp',
		description: 'С нежной молочной пенкой',
	},
	{
		id: 4,
		name: 'Латте',
		volume: '350 мл',
		price: 300,
		image: '/coffee-price/3.webp',
		description: 'Молочный и бархатистый',
	},
	{
		id: 5,
		name: 'Флэт уайт',
		volume: '180 мл',
		price: 250,
		image: '/coffee-price/4.webp',
		description: 'Двойная порция эспрессо',
	},
	{
		id: 6,
		name: 'Какао',
		volume: '250 мл',
		price: 200,
		image: '/coffee-price/5.webp',
		description: 'Волшебный вкус какао',
	},
]

export default function CoffeePrice() {
	const [selectedDrinks, setSelectedDrinks] = useState([])
	const [customerName, setCustomerName] = useState('')
	const [customerPhone, setCustomerPhone] = useState('')
	const [customerHouse, setCustomerHouse] = useState('') // Новое поле для номера дома
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitStatus, setSubmitStatus] = useState(null)

	useEffect(() => {
		// Небольшая задержка, чтобы переопределить скролл браузера
		const timer = setTimeout(() => {
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			})
		}, 10)

		return () => clearTimeout(timer)
	}, [])

	// Добавление напитка в корзину
	const addToCart = drink => {
		setSelectedDrinks(prev => {
			const existing = prev.find(item => item.id === drink.id)
			if (existing) {
				return prev.map(item =>
					item.id === drink.id
						? { ...item, quantity: item.quantity + 1 }
						: item,
				)
			}
			return [...prev, { ...drink, quantity: 1 }]
		})
	}

	// Удаление напитка из корзины
	const removeFromCart = drinkId => {
		setSelectedDrinks(prev => prev.filter(item => item.id !== drinkId))
	}

	// Изменение количества
	const updateQuantity = (drinkId, newQuantity) => {
		if (newQuantity < 1) {
			removeFromCart(drinkId)
			return
		}
		setSelectedDrinks(prev =>
			prev.map(item =>
				item.id === drinkId ? { ...item, quantity: newQuantity } : item,
			),
		)
	}

	// Подсчет итоговой суммы
	const totalPrice = selectedDrinks.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	)

	// Отправка формы
	const handleSubmit = async e => {
		e.preventDefault()

		if (selectedDrinks.length === 0) {
			alert('Добавьте хотя бы один напиток')
			return
		}

		if (!customerName || !customerPhone || !customerHouse) {
			alert('Заполните все поля')
			return
		}

		setIsSubmitting(true)
		setSubmitStatus(null)

		try {
			const response = await fetch('/api/coffee-price', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: customerName,
					phone: customerPhone,
					houseNumber: customerHouse, // Добавлено поле с номером дома
					drinks: selectedDrinks,
					totalPrice: totalPrice,
					orderDate: new Date().toISOString(),
				}),
			})

			const data = await response.json()

			if (response.ok) {
				setSubmitStatus('success')
				// Очистка формы
				setSelectedDrinks([])
				setCustomerName('')
				setCustomerPhone('')
				setCustomerHouse('') // Очистка поля номера дома
			} else {
				setSubmitStatus('error')
				console.error('Ошибка отправки:', data.error)
			}
		} catch (error) {
			setSubmitStatus('error')
			console.error('Ошибка:', error)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<section className='coffee-price bg-background mt-10 px-3.75 py-10'>
			<div className='container max-w-5xl mx-auto'>
				<h1 className='text-4xl font-bold text-center text-(--accent-color) mb-10'>
					Выберите ваш кофе
				</h1>

				{/* Сетка напитков */}
				<div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-6 mb-10'>
					{drinks.map(drink => (
						<div
							key={drink.id}
							className='bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow'
						>
							<div className='relative h-48 bg-gray-200'>
								<div className='absolute inset-0 flex items-center justify-center text-gray-500'>
									[Изображение {drink.name}]
								</div>
								<Image
									src={drink.image}
									alt={drink.name}
									fill
									className='w-full h-full object-cover'
								/>
							</div>

							<div className='p-4'>
								<div className='flex justify-between items-start mb-2'>
									<div>
										<h3 className='text-xl font-semibold text-(--accent-color)'>
											{drink.name}
										</h3>
										<p className='text-sm text-gray-600'>{drink.volume}</p>
									</div>
									<span className='text-lg font-bold text-(--accent-color)'>
										{drink.price}₽
									</span>
								</div>

								<p className='text-gray-600 text-sm mb-4'>
									{drink.description}
								</p>

								<button
									onClick={() => addToCart(drink)}
									className='w-full bg-(--accent-color) hover:bg-(--accent-color)/90 text-white py-2 px-4 rounded-lg transition-colors'
								>
									Добавить в заказ
								</button>
							</div>
						</div>
					))}
				</div>

				{/* Корзина и форма заказа */}
				{selectedDrinks.length > 0 && (
					<div className='bg-gray-50 rounded-lg p-6 mb-6'>
						<h2 className='text-2xl font-bold mb-4 text-(--accent-color)'>
							Ваш заказ
						</h2>

						<div className='space-y-3 mb-6'>
							{selectedDrinks.map(item => (
								<div
									key={item.id}
									className='flex flex-col sm:flex-row gap-5 items-center justify-between bg-white p-3 rounded-lg'
								>
									<div className='flex-1'>
										<span className='font-medium text-(--accent-color)'>
											{item.name}
										</span>
										<span className='text-sm text-gray-600 ml-2'>
											{item.volume} - {item.price}₽
										</span>
									</div>

									<div className='flex items-center gap-3'>
										<button
											onClick={() => updateQuantity(item.id, item.quantity - 1)}
											className='w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 text-(--accent-color)'
										>
											-
										</button>

										<span className='w-8 text-center font-medium text-(--accent-color)'>
											{item.quantity}
										</span>

										<button
											onClick={() => updateQuantity(item.id, item.quantity + 1)}
											className='w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 text-(--accent-color)'
										>
											+
										</button>

										<button
											onClick={() => removeFromCart(item.id)}
											className='ml-2 text-red-500 hover:text-red-700'
										>
											✕
										</button>
									</div>
								</div>
							))}
						</div>

						<div className='border-t pt-4 mb-6'>
							<div className='flex justify-between text-xl font-bold'>
								<span className='text-(--accent-color)'>Итого:</span>
								<span className='text-amber-600'>{totalPrice}₽</span>
							</div>
						</div>

						{/* Форма заявки */}
						<form onSubmit={handleSubmit} className='space-y-4'>
							<div>
								<label
									htmlFor='name'
									className='block text-sm font-medium mb-1 text-(--accent-color)'
								>
									Ваше имя *
								</label>
								<input
									type='text'
									id='name'
									value={customerName}
									onChange={e => setCustomerName(e.target.value)}
									className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-(--accent-color) outline-0 focus:border-transparent bg-white text-(--accent-color)'
									placeholder='Иван Иванов'
									required
									autoFocus
								/>
							</div>

							<div>
								<label
									htmlFor='phone'
									className='block text-sm font-medium mb-1 text-(--accent-color)'
								>
									Телефон *
								</label>
								<input
									type='tel'
									id='phone'
									value={customerPhone}
									onChange={e => setCustomerPhone(e.target.value)}
									className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-(--accent-color) focus:border-transparent outline-0 bg-white text-(--accent-color)'
									placeholder='+7 (999) 123-45-67'
									required
								/>
							</div>

							{/* Новое поле для номера дома */}
							<div>
								<label
									htmlFor='house'
									className='block text-sm font-medium mb-1 text-(--accent-color)'
								>
									Номер дома *
								</label>
								<input
									type='text'
									id='house'
									value={customerHouse}
									onChange={e => setCustomerHouse(e.target.value)}
									className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-(--accent-color) focus:border-transparent outline-0 bg-white text-(--accent-color)'
									placeholder='Например: 1, 2, 3'
									required
								/>
								<p className='text-xs text-gray-500 mt-1'>
									Укажите номер дома для доставки
								</p>
							</div>

							<button
								type='submit'
								disabled={isSubmitting}
								className='w-full bg-(--accent-color) hover:bg-(--accent-color)/90 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:bg-gray-400'
							>
								{isSubmitting ? 'Отправка...' : 'Отправить заявку'}
							</button>

							{submitStatus === 'success' && (
								<div className='p-3 bg-green-100 text-green-700 rounded-lg text-center'>
									Заявка успешно отправлена! Мы свяжемся с вами в ближайшее
									время.
								</div>
							)}

							{submitStatus === 'error' && (
								<div className='p-3 bg-red-100 text-red-700 rounded-lg text-center'>
									Ошибка при отправке. Пожалуйста, попробуйте позже.
								</div>
							)}
						</form>
					</div>
				)}
			</div>
		</section>
	)
}
