import { NextResponse } from 'next/server'

export async function POST(request) {
	try {
		const body = await request.json()

		// Здесь можно добавить отправку email, сохранение в базу данных и т.д.
		console.log('Получена заявка:', body)

		const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
		const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

		if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
			const message = `
🆕 Заказ напитков!
👤 Имя: ${body.name}
📞 Телефон: ${body.phone}
💰 Сумма: ${body.totalPrice}₽

🍵 Заказ:
${body.drinks.map(d => `- ${d.name} x${d.quantity} = ${d.price * d.quantity}₽`).join('\n')}
      `

			await fetch(
				`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						chat_id: TELEGRAM_CHAT_ID,
						text: message,
						parse_mode: 'HTML',
					}),
				},
			)
		}

		return NextResponse.json(
			{ message: 'Заявка успешно отправлена' },
			{ status: 200 },
		)
	} catch (error) {
		console.error('Ошибка обработки заявки:', error)
		return NextResponse.json(
			{ error: 'Внутренняя ошибка сервера' },
			{ status: 500 },
		)
	}
}
