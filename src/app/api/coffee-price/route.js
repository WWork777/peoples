// import { NextResponse } from 'next/server'

// export async function POST(request) {
// 	try {
// 		const body = await request.json()

// 		// Здесь можно добавить отправку email, сохранение в базу данных и т.д.
// 		console.log('Получена заявка:', body)

// 		const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
// 		const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

// 		if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
// 			const message = `
// 🆕 Заказ напитков!
// 👤 Имя: ${body.name}
// 📞 Телефон: ${body.phone}
// 💰 Сумма: ${body.totalPrice}₽

// 🍵 Заказ:
// ${body.drinks.map(d => `- ${d.name} x${d.quantity} = ${d.price * d.quantity}₽`).join('\n')}
//       `

// 			await fetch(
// 				`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
// 				{
// 					method: 'POST',
// 					headers: { 'Content-Type': 'application/json' },
// 					body: JSON.stringify({
// 						chat_id: TELEGRAM_CHAT_ID,
// 						text: message,
// 						parse_mode: 'HTML',
// 					}),
// 				},
// 			)
// 		}

// 		return NextResponse.json(
// 			{ message: 'Заявка успешно отправлена' },
// 			{ status: 200 },
// 		)
// 	} catch (error) {
// 		console.error('Ошибка обработки заявки:', error)
// 		return NextResponse.json(
// 			{ error: 'Внутренняя ошибка сервера' },
// 			{ status: 500 },
// 		)
// 	}
// }
// app/api/coffee-price/route.js
import { NextResponse } from 'next/server'

export async function POST(request) {
	try {
		const body = await request.json()

		// Валидация обязательных полей
		if (!body.name || !body.phone || !body.houseNumber) {
			return NextResponse.json(
				{ error: 'Заполните все обязательные поля' },
				{ status: 400 },
			)
		}

		if (!body.drinks || body.drinks.length === 0) {
			return NextResponse.json(
				{ error: 'Добавьте хотя бы один напиток' },
				{ status: 400 },
			)
		}

		// Форматирование телефона (если нужно)
		const formattedPhone = body.phone.replace(/[^0-9+]/g, '')

		console.log('📦 Получена заявка:', {
			...body,
			phone: formattedPhone,
			timestamp: new Date().toLocaleString('ru-RU'),
		})

		// Отправка в Telegram
		const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
		const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

		if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
			// Форматирование списка напитков
			const drinksList = body.drinks
				.map(
					d =>
						`└ ${d.name} (${d.volume}) x${d.quantity} = ${d.price * d.quantity}₽`,
				)
				.join('\n')

			// Создание сообщения
			const message = `
━━━━━━━━━━━━━━━━━━━━━━━
🆕 <b>НОВЫЙ ЗАКАЗ НАПИТКОВ</b>
━━━━━━━━━━━━━━━━━━━━━━━

👤 <b>Клиент:</b> ${body.name}
📞 <b>Телефон:</b> <code>${formattedPhone}</code>
🏠 <b>Номер дома:</b> ${body.houseNumber}
💰 <b>Сумма заказа:</b> ${body.totalPrice}₽

🍵 <b>Состав заказа:</b>
${drinksList}

━━━━━━━━━━━━━━━━━━━━━━━
`

			try {
				const telegramResponse = await fetch(
					`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							chat_id: TELEGRAM_CHAT_ID,
							text: message,
							parse_mode: 'HTML',
							disable_web_page_preview: true,
						}),
					},
				)

				if (!telegramResponse.ok) {
					const telegramError = await telegramResponse.text()
					console.error('Ошибка отправки в Telegram:', telegramError)
				}
			} catch (telegramError) {
				console.error('Ошибка при отправке в Telegram:', telegramError)
				// Продолжаем выполнение, даже если Telegram не отправился
			}
		} else {
			console.warn(
				'⚠️ Telegram бот не настроен. Проверьте переменные окружения.',
			)
		}

		// Здесь можно добавить сохранение в базу данных
		/*
		try {
			// Сохранение в MongoDB, PostgreSQL и т.д.
			await saveOrderToDatabase({
				...body,
				phone: formattedPhone,
				createdAt: new Date(),
			})
		} catch (dbError) {
			console.error('Ошибка сохранения в БД:', dbError)
		}
		*/

		return NextResponse.json(
			{
				message: 'Заявка успешно отправлена',
				orderId: Date.now().toString(36) + Math.random().toString(36).substr(2),
			},
			{ status: 200 },
		)
	} catch (error) {
		console.error('❌ Ошибка обработки заявки:', error)

		return NextResponse.json(
			{
				error: 'Внутренняя ошибка сервера',
				details:
					process.env.NODE_ENV === 'development' ? error.message : undefined,
			},
			{ status: 500 },
		)
	}
}

// Опционально: GET метод для проверки работоспособности
export async function GET() {
	return NextResponse.json(
		{
			status: 'active',
			message: 'API для заказов работает',
			timestamp: new Date().toISOString(),
		},
		{ status: 200 },
	)
}
