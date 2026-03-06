// import { NextResponse } from 'next/server'

// export async function POST(request) {
// 	try {
// 		const body = await request.json()

// 		// Валидация обязательных полей
// 		if (!body.name || !body.phone) {
// 			return NextResponse.json(
// 				{ error: 'Заполните все обязательные поля' },
// 				{ status: 400 },
// 			)
// 		}

// 		// Валидация имени (минимум 2 символа)
// 		if (body.name.trim().length < 2) {
// 			return NextResponse.json(
// 				{ error: 'Имя должно содержать минимум 2 символа' },
// 				{ status: 400 },
// 			)
// 		}

// 		// Валидация телефона (проверяем, что есть хотя бы 10 цифр)
// 		const phoneDigits = body.phone.replace(/\D/g, '')
// 		if (phoneDigits.length < 10) {
// 			return NextResponse.json(
// 				{ error: 'Введите корректный номер телефона' },
// 				{ status: 400 },
// 			)
// 		}

// 		// Форматирование телефона в единый формат
// 		const formattedPhone = body.phone.replace(/[^0-9+]/g, '')

// 		console.log('📝 Получена промо-заявка:', {
// 			name: body.name,
// 			phone: formattedPhone,
// 			timestamp: new Date().toLocaleString('ru-RU'),
// 			userAgent: request.headers.get('user-agent'),
// 			ip: request.headers.get('x-forwarded-for') || 'unknown',
// 		})

// 		// Отправка в Telegram
// 		const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
// 		const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

// 		if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
// 			// Создание сообщения для промо-заявки
// 			const message = `

// 🎉 <b>НОВАЯ ЗАЯВКА НА СКИДКУ 15%</b>

// 👤 <b>Имя:</b> ${body.name}
// 📞 <b>Телефон:</b> <code>${formattedPhone}</code>
// 📅 <b>Дата:</b> ${new Date().toLocaleDateString('ru-RU')}
// ⏰ <b>Время:</b> ${new Date().toLocaleTimeString('ru-RU')}

// 🏷 <b>Акция:</b> Скидка 15% (9-13 марта)
// `

// 			try {
// 				const telegramResponse = await fetch(
// 					`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
// 					{
// 						method: 'POST',
// 						headers: { 'Content-Type': 'application/json' },
// 						body: JSON.stringify({
// 							chat_id: TELEGRAM_CHAT_ID,
// 							text: message,
// 							parse_mode: 'HTML',
// 							disable_web_page_preview: true,
// 						}),
// 					},
// 				)

// 				if (!telegramResponse.ok) {
// 					const telegramError = await telegramResponse.text()
// 					console.error('Ошибка отправки в Telegram:', telegramError)

// 					// Пробуем отправить без HTML форматирования
// 					const plainMessage = message.replace(/<[^>]*>/g, '')
// 					await fetch(
// 						`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
// 						{
// 							method: 'POST',
// 							headers: { 'Content-Type': 'application/json' },
// 							body: JSON.stringify({
// 								chat_id: TELEGRAM_CHAT_ID,
// 								text: plainMessage,
// 								disable_web_page_preview: true,
// 							}),
// 						},
// 					)
// 				} else {
// 					console.log('✅ Заявка успешно отправлена в Telegram')
// 				}
// 			} catch (telegramError) {
// 				console.error('Ошибка при отправке в Telegram:', telegramError)
// 				// Продолжаем выполнение, даже если Telegram не отправился
// 			}
// 		} else {
// 			console.warn(
// 				'⚠️ Telegram бот не настроен. Проверьте переменные окружения TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID',
// 			)
// 		}

// 		// Сохранение в localStorage или базу данных (опционально)
// 		// Здесь можно добавить сохранение в базу данных
// 		/*
// 		try {
// 			// Пример сохранения в MongoDB
// 			await db.collection('promo_leads').insertOne({
// 				name: body.name,
// 				phone: formattedPhone,
// 				promoCode: 'MARCH15',
// 				createdAt: new Date(),
// 				ip: request.headers.get('x-forwarded-for'),
// 				userAgent: request.headers.get('user-agent'),
// 			})
// 		} catch (dbError) {
// 			console.error('Ошибка сохранения в БД:', dbError)
// 		}
// 		*/

// 		// Генерация уникального ID заявки
// 		const leadId =
// 			Date.now().toString(36) + Math.random().toString(36).substr(2, 5)

// 		return NextResponse.json(
// 			{
// 				success: true,
// 				message:
// 					'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.',
// 				leadId: leadId,
// 				timestamp: new Date().toISOString(),
// 			},
// 			{ status: 200 },
// 		)
// 	} catch (error) {
// 		console.error('❌ Ошибка обработки промо-заявки:', error)

// 		return NextResponse.json(
// 			{
// 				success: false,
// 				error: 'Внутренняя ошибка сервера',
// 				message:
// 					'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.',
// 				details:
// 					process.env.NODE_ENV === 'development' ? error.message : undefined,
// 			},
// 			{ status: 500 },
// 		)
// 	}
// }

// // GET метод для проверки работоспособности API
// export async function GET() {
// 	return NextResponse.json(
// 		{
// 			success: true,
// 			status: 'active',
// 			service: 'Промо-заявки на скидку 15%',
// 			message: 'API для сбора заявок работает',
// 			endpoints: {
// 				post: '/api/submit-promo - отправка заявки (name, phone)',
// 			},
// 			promoPeriod: '9-13 марта 2024',
// 			timestamp: new Date().toISOString(),
// 		},
// 		{ status: 200 },
// 	)
// }
// app/api/submit-promo/route.js
import { NextResponse } from 'next/server'

export async function POST(request) {
	try {
		const body = await request.json()

		// Валидация обязательных полей
		if (!body.name || !body.phone) {
			return NextResponse.json(
				{ error: 'Заполните все обязательные поля' },
				{ status: 400 },
			)
		}

		// Валидация имени (минимум 2 символа)
		if (body.name.trim().length < 2) {
			return NextResponse.json(
				{ error: 'Имя должно содержать минимум 2 символа' },
				{ status: 400 },
			)
		}

		// Валидация телефона (проверяем, что есть хотя бы 10 цифр)
		const phoneDigits = body.phone.replace(/\D/g, '')
		if (phoneDigits.length < 10) {
			return NextResponse.json(
				{ error: 'Введите корректный номер телефона' },
				{ status: 400 },
			)
		}

		// Форматирование телефона в единый формат
		const formattedPhone = body.phone.replace(/[^0-9+]/g, '')

		console.log('📝 Получена промо-заявка:', {
			name: body.name,
			phone: formattedPhone,
			timestamp: new Date().toLocaleString('ru-RU'),
		})

		// Отправка в Telegram
		const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
		const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

		if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
			// Создание сообщения для промо-заявки с кликабельным телефоном
			const message = `
🎉 НОВАЯ ЗАЯВКА НА СКИДКУ 15%

👤 Имя: ${body.name}
📞 Телефон: ${formattedPhone}

🏷 Акция: Скидка 15% (9-13 марта)
`

			try {
				await fetch(
					`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							chat_id: TELEGRAM_CHAT_ID,
							text: message,
						}),
					},
				)
			} catch (telegramError) {
				console.error('Ошибка при отправке в Telegram:', telegramError)
			}
		}

		// Генерация уникального ID заявки
		const leadId =
			Date.now().toString(36) + Math.random().toString(36).substr(2, 5)

		return NextResponse.json(
			{
				success: true,
				message: 'Заявка успешно отправлена!',
				leadId: leadId,
			},
			{ status: 200 },
		)
	} catch (error) {
		console.error('❌ Ошибка обработки промо-заявки:', error)

		return NextResponse.json(
			{
				success: false,
				error: 'Внутренняя ошибка сервера',
			},
			{ status: 500 },
		)
	}
}

// GET метод для проверки работоспособности API
export async function GET() {
	return NextResponse.json(
		{
			success: true,
			status: 'active',
		},
		{ status: 200 },
	)
}
