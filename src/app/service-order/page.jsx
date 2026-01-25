'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

function formatRuPhone(raw) {
	let d = (raw || '').replace(/\D/g, '')

	if (d.startsWith('8')) d = '7' + d.slice(1)
	if (d.startsWith('9')) d = '7' + d

	if (!d.startsWith('7')) d = '7' + d.replace(/^7+/, '')
	d = d.slice(0, 11)

	const a = d.slice(1, 4)
	const b = d.slice(4, 7)
	const c = d.slice(7, 9)
	const e = d.slice(9, 11)

	let out = '+7'
	if (a) out += ` (${a}`
	if (a.length === 3) out += ')'
	if (b) out += ` ${b}`
	if (c) out += `-${c}`
	if (e) out += `-${e}`

	return { formatted: out, digits: d }
}

export default function ContactFormPage() {
	const [form, setForm] = useState({
		email: '',
		name: '',
		phone: '+7 ',
		phoneDigits: '7',
		comment: '',
	})

	const [touched, setTouched] = useState({})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitSuccess, setSubmitSuccess] = useState(false)
	const [submitError, setSubmitError] = useState('')

	const inputBase =
		'w-full rounded-full border border-black/25 bg-white px-6 h-14 ' +
		'text-black outline-none transition ' +
		'placeholder:text-black/35 ' +
		'focus:border-black/45 focus:ring-2 focus:ring-black/5'

	const labelBase = 'text-[18px] text-black/90 mb-2'

	const onPhoneChange = e => {
		const { formatted, digits } = formatRuPhone(e.target.value)
		setForm(p => ({ ...p, phone: formatted, phoneDigits: digits }))
	}

	const onPhonePaste = e => {
		const text = (e.clipboardData || window.clipboardData).getData('text')
		const { formatted, digits } = formatRuPhone(text)
		e.preventDefault()
		setForm(p => ({ ...p, phone: formatted, phoneDigits: digits }))
	}

	const emailOk = useMemo(
		() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()),
		[form.email],
	)

	const phoneOk = useMemo(
		() => form.phoneDigits.replace(/\D/g, '').length === 11,
		[form.phoneDigits],
	)

	const canSubmit = useMemo(() => {
		return emailOk && form.name.trim().length >= 2 && phoneOk && !isSubmitting
	}, [emailOk, phoneOk, form.name, isSubmitting])

	const submit = async e => {
		e.preventDefault()

		if (!canSubmit) {
			setTouched({ email: true, name: true, phone: true })
			return
		}

		setIsSubmitting(true)
		setSubmitError('')
		setSubmitSuccess(false)

		try {
			const formData = {
				name: form.name.trim(),
				phone: form.phoneDigits,
				email: form.email.trim(),
				message: form.comment.trim(),
				formId: 'contact-page-form',
				timestamp: new Date().toISOString(),
			}

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
					comment: '',
				})
				setTouched({})

				// Скрыть сообщение об успехе через 5 секунд
				setTimeout(() => setSubmitSuccess(false), 5000)
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

	return (
		<div className='min-h-[calc(100vh-80px)] bg-white mt-10'>
			<div className='container max-w-5xl mx-auto px-3.75'>
				<form
					onSubmit={submit}
					className='max-w-[760px] mx-auto py-16 sm:py-20'
				>
					{/* Сообщение об успехе */}
					{submitSuccess && (
						<div className='mb-8 p-4 bg-green-100 text-green-800 rounded-lg text-center'>
							✅ Спасибо! Ваша заявка отправлена. Мы скоро с вами свяжемся.
						</div>
					)}

					{/* Сообщение об ошибке */}
					{submitError && (
						<div className='mb-8 p-4 bg-red-100 text-red-800 rounded-lg text-center'>
							❌ {submitError}
						</div>
					)}

					{/* Email */}
					<div className='mb-10'>
						<label className={labelBase}>Email</label>
						<input
							value={form.email}
							onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
							onBlur={() => setTouched(p => ({ ...p, email: true }))}
							placeholder='Email'
							type='email'
							className={[
								inputBase,
								touched.email && !emailOk ? 'border-red-400' : '',
							].join(' ')}
							disabled={isSubmitting}
						/>
					</div>

					{/* Имя */}
					<div className='mb-10'>
						<label className={labelBase}>Имя</label>
						<input
							value={form.name}
							onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
							onBlur={() => setTouched(p => ({ ...p, name: true }))}
							placeholder='Имя'
							type='text'
							className={[
								inputBase,
								touched.name && form.name.trim().length < 2
									? 'border-red-400'
									: '',
							].join(' ')}
							disabled={isSubmitting}
						/>
					</div>

					{/* Телефон */}
					<div className='mb-10'>
						<label className={labelBase}>Телефон</label>
						<input
							value={form.phone}
							onChange={onPhoneChange}
							onPaste={onPhonePaste}
							onBlur={() => setTouched(p => ({ ...p, phone: true }))}
							placeholder='+7 (___) ___-__-__'
							type='tel'
							inputMode='tel'
							className={[
								inputBase,
								touched.phone && !phoneOk ? 'border-red-400' : '',
							].join(' ')}
							disabled={isSubmitting}
						/>
					</div>

					{/* Комментарии */}
					<div className='mb-10'>
						<label className={labelBase}>Комментарии</label>
						<textarea
							value={form.comment}
							onChange={e => setForm(p => ({ ...p, comment: e.target.value }))}
							placeholder=''
							rows={4}
							className={
								'w-full rounded-[28px] border border-black/25 bg-white px-6 py-4 ' +
								'text-black outline-none transition resize-none ' +
								'focus:border-black/45 focus:ring-2 focus:ring-black/5' +
								(isSubmitting ? ' opacity-50 cursor-not-allowed' : '')
							}
							disabled={isSubmitting}
						/>
					</div>

					{/* Кнопка */}
					<div className='flex justify-center'>
						<button
							type='submit'
							disabled={!canSubmit}
							className={[
								'h-14 px-16 rounded-full font-semibold text-white',
								'bg-[#0E4B3B] hover:bg-[#0C4032] transition-colors',
								'disabled:opacity-40 disabled:cursor-not-allowed',
								isSubmitting ? 'opacity-70 cursor-wait' : '',
							].join(' ')}
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
					</div>

					{/* Подпись */}
					<p className='text-center text-black/60 text-[14px] mt-8 italic'>
						Отправляя данную форму вы соглашаетесь с{' '}
						<Link
							href='/politika'
							className='text-red-400 hover:text-red-500 transition-colors'
						>
							политикой конфиденциальности
						</Link>
					</p>
				</form>
			</div>
		</div>
	)
}
