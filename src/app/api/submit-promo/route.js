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
