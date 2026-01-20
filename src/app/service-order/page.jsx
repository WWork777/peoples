'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

function formatRuPhone(raw) {
	// Возвращаем: { formatted: "+7 (999) 999-99-99", digits: "7XXXXXXXXXX" }
	let d = (raw || '').replace(/\D/g, '')

	// Нормализация: 8XXXXXXXXXX -> 7XXXXXXXXXX, 9XXXXXXXXX -> 7 9XXXXXXXXX
	if (d.startsWith('8')) d = '7' + d.slice(1)
	if (d.startsWith('9')) d = '7' + d

	// Всегда начинаем с 7
	if (!d.startsWith('7')) d = '7' + d.replace(/^7+/, '')
	d = d.slice(0, 11)

	const a = d.slice(1, 4) // 3
	const b = d.slice(4, 7) // 3
	const c = d.slice(7, 9) // 2
	const e = d.slice(9, 11) // 2

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
		return emailOk && form.name.trim().length >= 2 && phoneOk
	}, [emailOk, phoneOk, form.name])

	const submit = e => {
		e.preventDefault()
		if (!canSubmit) {
			setTouched({ email: true, name: true, phone: true })
			return
		}

		// TODO: отправка на API
		console.log('submit:', {
			email: form.email.trim(),
			name: form.name.trim(),
			phone: form.phoneDigits, // 7XXXXXXXXXX
			comment: form.comment.trim(),
		})

		// очистка (по желанию)
		// setForm({ email:"", name:"", phone:"+7 ", phoneDigits:"7", comment:"" });
	}

	return (
		<>
			<div className='min-h-[calc(100vh-80px)] bg-white mt-10'>
				<div className='container max-w-5xl mx-auto px-3.75'>
					<form
						onSubmit={submit}
						className='max-w-[760px] mx-auto py-16 sm:py-20'
					>
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
							/>
						</div>

						{/* Комментарии */}
						<div className='mb-10'>
							<label className={labelBase}>Комментарии</label>
							<textarea
								value={form.comment}
								onChange={e =>
									setForm(p => ({ ...p, comment: e.target.value }))
								}
								placeholder=''
								rows={4}
								className={
									'w-full rounded-[28px] border border-black/25 bg-white px-6 py-4 ' +
									'text-black outline-none transition resize-none ' +
									'focus:border-black/45 focus:ring-2 focus:ring-black/5'
								}
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
								].join(' ')}
							>
								Отправить
							</button>
						</div>

						{/* Подпись */}
						<p className='text-center text-black/60 text-[14px] mt-8 italic'>
							Отправляя данную форму вы соглашаетесь с{' '}
							<Link
								href='/privacy'
								className='text-red-400 hover:text-red-500 transition-colors'
							>
								политикой конфиденциальности
							</Link>
						</p>
					</form>
				</div>
			</div>
		</>
	)
}
