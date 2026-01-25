//
// lib/services/telegram.js
import { generateFormMessage } from '../messages'

export async function sendTelegramMessage(formData) {
	const { name, phone, email, message, formId, timestamp, serviceType } =
		formData
	const botToken = process.env.TELEGRAM_BOT_TOKEN
	const chatId = process.env.TELEGRAM_CHAT_ID

	if (!botToken || !chatId) {
		throw new Error(
			'Конфигурация Telegram не настроена (BOT_TOKEN или CHAT_ID)',
		)
	}

	// Собираем все данные для сообщения
	const telegramFormData = {
		name,
		phone,
		email,
		message,
		formId,
		timestamp,
		serviceType, // Добавляем тип услуги
	}

	const url = `https://api.telegram.org/bot${botToken}/sendMessage`

	const response = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			chat_id: chatId,
			text: generateFormMessage(telegramFormData),
			parse_mode: 'Markdown',
		}),
	})

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}))
		throw new Error(
			`Telegram: ${response.status} - ${
				errorData.description || 'Неизвестная ошибка'
			}`,
		)
	}

	return await response.json()
}
