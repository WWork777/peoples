'use client'

import { useEffect, useMemo, useState } from 'react'

function formatRuPhone(digits) {
	const d = digits.replace(/\D/g, '').slice(0, 11)
	let n = d
	if (n.startsWith('8')) n = '7' + n.slice(1)
	if (n.startsWith('9')) n = '7' + n

	const a = n.slice(1, 4)
	const b = n.slice(4, 7)
	const c = n.slice(7, 9)
	const e = n.slice(9, 11)

	let out = '+7'
	if (a) out += ` (${a}`
	if (a.length === 3) out += ')'
	if (b) out += ` ${b}`
	if (c) out += `-${c}`
	if (e) out += `-${e}`

	return { formatted: out, digits: n }
}

function OrderServiceModal({ isOpen, onClose, defaultService = 'transfer' }) {
	const [form, setForm] = useState({
		email: '',
		name: '',
		phone: '+7 ',
		phoneDigits: '7',
		transfer: false,
		rent: false,
	})

	const [touched, setTouched] = useState({})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitSuccess, setSubmitSuccess] = useState(false)
	const [submitError, setSubmitError] = useState('')

	// ✅ для анимации: держим компонент смонтированным при закрытии
	const [mounted, setMounted] = useState(false)
	const [visible, setVisible] = useState(false)

	// Валидация
	const emailOk = useMemo(
		() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()),
		[form.email],
	)

	const phoneOk = useMemo(
		() => form.phoneDigits.replace(/\D/g, '').length === 11,
		[form.phoneDigits],
	)

	const nameOk = useMemo(() => form.name.trim().length >= 2, [form.name])

	const canSubmit = useMemo(() => {
		const hasService = form.transfer || form.rent
		return emailOk && nameOk && phoneOk && hasService && !isSubmitting
	}, [emailOk, nameOk, phoneOk, form.transfer, form.rent, isSubmitting])

	// открытие/закрытие с задержкой размонтирования
	useEffect(() => {
		if (isOpen) {
			setMounted(true)
			setVisible(false)
			// Сброс состояний при открытии
			setSubmitSuccess(false)
			setSubmitError('')

			// ✅ двойной rAF гарантирует отдельный paint
			requestAnimationFrame(() => {
				requestAnimationFrame(() => setVisible(true))
			})

			return
		}

		setVisible(false)
		const t = setTimeout(() => setMounted(false), 240)
		return () => clearTimeout(t)
	}, [isOpen])

	useEffect(() => {
		if (!isOpen) return
		setForm(prev => ({
			...prev,
			transfer: defaultService === 'transfer',
			rent: defaultService === 'rent',
		}))
	}, [isOpen, defaultService])

	useEffect(() => {
		if (!isOpen) return

		const onKeyDown = e => {
			if (e.key === 'Escape') onClose()
		}

		document.addEventListener('keydown', onKeyDown)
		const prevOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'

		return () => {
			document.removeEventListener('keydown', onKeyDown)
			document.body.style.overflow = prevOverflow
		}
	}, [isOpen, onClose])

	const update = key => e => {
		const value =
			e?.target?.type === 'checkbox' ? e.target.checked : e.target.value
		setForm(p => ({ ...p, [key]: value }))
		// Сбрасываем ошибки при изменении
		if (submitError) setSubmitError('')
	}

	const onPhoneChange = e => {
		const digitsOnly = e.target.value.replace(/\D/g, '')
		const { formatted, digits } = formatRuPhone(digitsOnly)
		setForm(p => ({ ...p, phone: formatted, phoneDigits: digits }))
		if (submitError) setSubmitError('')
	}

	const onPhonePaste = e => {
		const text = (e.clipboardData || window.clipboardData).getData('text')
		const { formatted, digits } = formatRuPhone(text)
		e.preventDefault()
		setForm(p => ({ ...p, phone: formatted, phoneDigits: digits }))
		if (submitError) setSubmitError('')
	}

	const handleBlur = field => () => {
		setTouched(p => ({ ...p, [field]: true }))
	}

	const submit = async e => {
		e.preventDefault()

		// Устанавливаем все поля как touched для показа ошибок
		setTouched({ email: true, name: true, phone: true, services: true })

		if (!canSubmit) {
			// Показываем пользователю, что нужно исправить
			if (!emailOk) setSubmitError('Пожалуйста, введите корректный email')
			else if (!nameOk) setSubmitError('Имя должно содержать минимум 2 символа')
			else if (!phoneOk)
				setSubmitError('Номер телефона должен содержать 11 цифр')
			else if (!form.transfer && !form.rent)
				setSubmitError('Выберите хотя бы одну услугу')
			return
		}

		setIsSubmitting(true)
		setSubmitError('')

		try {
			const formData = {
				name: form.name.trim(),
				phone: form.phoneDigits,
				email: form.email.trim(),
				serviceType: form.transfer
					? form.rent
						? 'transfer_and_rent'
						: 'transfer'
					: 'rent',
				formId: 'transfer-page-modal',
				timestamp: new Date().toISOString(),
			}

			console.log('Отправка заявки:', formData)

			const response = await fetch('/api/submit-form', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})

			const result = await response.json()

			if (response.ok && result.success) {
				console.log('✅ Заявка успешно отправлена:', result)
				setSubmitSuccess(true)

				// Сброс формы
				setForm({
					email: '',
					name: '',
					phone: '+7 ',
					phoneDigits: '7',
					transfer: false,
					rent: false,
				})
				setTouched({})

				// Автоматическое закрытие через 2 секунды
				setTimeout(() => {
					setSubmitSuccess(false)
					onClose()
				}, 2000)
			} else {
				const errorMessage =
					result.error || result.message || 'Ошибка при отправке заявки'
				setSubmitError(errorMessage)
				console.error('❌ Ошибка отправки:', errorMessage)
			}
		} catch (error) {
			setSubmitError('Ошибка соединения с сервером. Попробуйте еще раз.')
			console.error('❌ Сетевая ошибка:', error)
		} finally {
			setIsSubmitting(false)
		}
	}

	const inputBase = `
    w-full h-12 border rounded-full px-6 outline-none 
    text-black bg-white placeholder:text-black/40 
    focus:border-black/40 focus:ring-2 focus:ring-black/5 transition
    ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
  `

	// ✅ если уже закрыто и анимация завершена — не рендерим
	if (!mounted) return null

	return (
		<div
			className={[
				'fixed inset-0 z-[9999] flex items-center justify-center px-3.75',
				'transition-opacity duration-200',
				visible ? 'opacity-100' : 'opacity-0',
			].join(' ')}
			role='dialog'
			aria-modal='true'
			aria-labelledby='modal-title'
			onMouseDown={e => {
				if (e.target === e.currentTarget) onClose()
			}}
		>
			{/* overlay */}
			<div
				className={[
					'absolute inset-0 bg-black/50',
					'transition-opacity duration-200',
					visible ? 'opacity-100' : 'opacity-0',
				].join(' ')}
			/>

			{/* content */}
			<div
				className={[
					'relative w-full max-w-[560px] bg-white shadow-2xl rounded-2xl',
					'transition-all duration-200 ease-out',
					visible
						? 'opacity-100 translate-y-0 scale-100'
						: 'opacity-0 translate-y-2 scale-[0.98]',
				].join(' ')}
			>
				<button
					type='button'
					onClick={onClose}
					aria-label='Закрыть'
					className='absolute right-4 cursor-pointer top-4 h-10 w-10 rounded-full flex items-center justify-center hover:bg-black/5 transition z-10'
					disabled={isSubmitting}
				>
					<span className='text-[22px] leading-none text-black'>×</span>
				</button>

				<div className='px-6 sm:px-10 pt-10 pb-8'>
					<h3
						id='modal-title'
						className='text-[28px] sm:text-[34px] font-bold text-center text-black'
					>
						Заказать услугу
					</h3>
					<p className='text-center text-black/60 mt-2'>
						Заполните форму и мы с вами свяжемся
					</p>

					{/* Сообщение об успехе */}
					{submitSuccess && (
						<div className='mt-6 p-4 bg-green-100 text-green-800 rounded-lg text-center'>
							✅ Спасибо! Ваша заявка отправлена. Мы скоро с вами свяжемся.
						</div>
					)}

					{/* Сообщение об ошибке */}
					{submitError && (
						<div className='mt-6 p-4 bg-red-100 text-red-800 rounded-lg text-center'>
							❌ {submitError}
						</div>
					)}

					<form className='mt-6 space-y-4' onSubmit={submit}>
						{/* Email */}
						<div>
							<input
								value={form.email}
								onChange={update('email')}
								onBlur={handleBlur('email')}
								placeholder='Email'
								type='email'
								className={[
									inputBase,
									touched.email && !emailOk
										? 'border-red-400 focus:border-red-400'
										: 'border-black/20',
								].join(' ')}
								disabled={isSubmitting}
							/>
							{touched.email && !emailOk && (
								<p className='text-red-500 text-sm mt-1 ml-2'>
									Введите корректный email
								</p>
							)}
						</div>

						{/* Имя */}
						<div>
							<input
								value={form.name}
								onChange={update('name')}
								onBlur={handleBlur('name')}
								placeholder='Имя'
								type='text'
								className={[
									inputBase,
									touched.name && !nameOk
										? 'border-red-400 focus:border-red-400'
										: 'border-black/20',
								].join(' ')}
								disabled={isSubmitting}
							/>
							{touched.name && !nameOk && (
								<p className='text-red-500 text-sm mt-1 ml-2'>
									Имя должно содержать минимум 2 символа
								</p>
							)}
						</div>

						{/* Телефон */}
						<div>
							<input
								value={form.phone}
								onChange={onPhoneChange}
								onPaste={onPhonePaste}
								onBlur={handleBlur('phone')}
								placeholder='+7 (___) ___-__-__'
								type='tel'
								inputMode='tel'
								className={[
									inputBase,
									touched.phone && !phoneOk
										? 'border-red-400 focus:border-red-400'
										: 'border-black/20',
								].join(' ')}
								disabled={isSubmitting}
							/>
							{touched.phone && !phoneOk && (
								<p className='text-red-500 text-sm mt-1 ml-2'>
									Номер телефона должен содержать 11 цифр
								</p>
							)}
						</div>

						{/* Услуги */}
						<div className='pt-2'>
							<p className='text-black text-[16px] mb-2'>Вид услуги</p>

							{touched.services && !form.transfer && !form.rent && (
								<p className='text-red-500 text-sm mb-2 ml-2'>
									Выберите хотя бы одну услугу
								</p>
							)}

							<label className='flex items-center gap-2 text-black/80 mb-2'>
								<input
									type='checkbox'
									checked={form.transfer}
									onChange={update('transfer')}
									className='h-5 w-5 accent-[#0E4B3B]'
									disabled={isSubmitting}
								/>
								<span className={isSubmitting ? 'opacity-50' : ''}>
									Трансфер
								</span>
							</label>

							<label className='flex items-center gap-2 text-black/80'>
								<input
									type='checkbox'
									checked={form.rent}
									onChange={update('rent')}
									className='h-5 w-5 accent-[#0E4B3B]'
									disabled={isSubmitting}
								/>
								<span className={isSubmitting ? 'opacity-50' : ''}>
									Аренда автомобиля
								</span>
							</label>
						</div>

						<button
							type='submit'
							disabled={!canSubmit}
							className={`
                w-full h-12 cursor-pointer 
                bg-[#0E4B3B] hover:bg-[#0C4032] 
                text-white font-semibold rounded-full
                transition-colors mt-4
                disabled:opacity-40 disabled:cursor-not-allowed
                ${isSubmitting ? 'opacity-70 cursor-wait' : ''}
              `}
						>
							{isSubmitting ? (
								<div className='flex items-center justify-center'>
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
								</div>
							) : (
								'Отправить'
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default function TransferPage() {
	const [isOpen, setIsOpen] = useState(false)
	const [defaultService, setDefaultService] = useState('transfer')

	const openModal = service => {
		setDefaultService(service)
		setIsOpen(true)
	}

	return (
		<>
			<div className='bg-white mt-10 px-3.75'>
				<div className='container max-w-7xl mx-auto'>
					<h2 className='text-[#0E4B3B] text-[25px] sm:text-[32px] font-bold text-center pt-10'>
						ТРАНСФЕР
					</h2>
					<h3 className='text-[#0E4B3B] font-medium text-center pt-10'>
						Предлагаем начать ваш отдых с комфортом!
					</h3>
				</div>

				<div className='container max-w-7xl mx-auto flex flex-col md:flex-row gap-5 py-10'>
					<div className='w-full md:w-1/2'>
						<span className='text-[26px] text-[#0E4B3B] font-medium leading-7 pb-[24px] block'>
							ТРАНСФЕР ИЗ АЭРОПОРТА <br /> ДО ГОСТЕВОГО <br /> КОМПЛЕКСА
						</span>
						<p className='text-[18px] text-black md:max-w-[75%] pb-[30px] font-light'>
							Наш водитель встретит вас с табличкой сразу после выхода из зоны
							прилета, позаботится и учтет ваши потребности и пожелания. <br />{' '}
							Мы всегда на связи, чтобы, при необходимости, сопровождать вас
							даже онлайн. Задержка или отмена вашего рейса не станет проблемой,
							мы оперативно скорректируем время подачи трансфера и доставим вас
							к месту отдыха с максимальным комфортом и безопасностью
						</p>

						<button
							type='button'
							onClick={() => openModal('transfer')}
							className='bg-[#0E4B3B] hover:bg-[#0C4032] text-white px-16 py-3 rounded-full cursor-pointer mx-auto block transition-colors'
						>
							Заказать
						</button>
					</div>

					<div className='w-full md:w-1/2'>
						<div className='h-[340px] max-w-[560px] mx-auto'>
							<img
								src='/images/additional/1.png'
								alt='Трансфер из аэропорта до гостевого комплекса'
								className='w-full h-full object-cover rounded-3xl'
							/>
						</div>
					</div>
				</div>

				<div className='container max-w-7xl mx-auto flex flex-col md:flex-row gap-5 py-20'>
					<div className='w-full md:w-1/2 order-2 md:order-1'>
						<div className='h-[340px] max-w-[560px] mx-auto'>
							<img
								src='/images/additional/11.png'
								alt='Прокат автомобиля'
								className='w-full h-full object-cover rounded-3xl'
							/>
						</div>
					</div>

					<div className='w-full md:w-1/2 order-1 md:order-2'>
						<span className='text-[26px] text-[#0E4B3B] font-medium leading-7 pb-[24px] block'>
							ПРОКАТ АВТОМОБИЛЯ
						</span>
						<p className='text-[18px] text-black md:max-w-[75%] pb-[30px] font-light'>
							Если вы предпочитаете передвигаться самостоятельно, к вашим
							услугам современные подготовленные к зимним условиям автомобили.
							Старт проката может быть как непосредственно из аэропорта, так и
							по месту требования. Опция проката авто доступна сроком от суток и
							только по Кемеровской области. Мы открыты к вашим пожеланиям и,
							если потребуется, сможем найти индивидуальные решения.
						</p>

						<button
							type='button'
							onClick={() => openModal('rent')}
							className='bg-[#0E4B3B] hover:bg-[#0C4032] text-white px-16 py-3 rounded-full cursor-pointer mx-auto block transition-colors'
						>
							Заказать
						</button>
					</div>
				</div>
			</div>

			<OrderServiceModal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				defaultService={defaultService}
			/>
		</>
	)
}
