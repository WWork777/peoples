//
// lib/services/telegram.js
import { generateFormMessage } from '../messages'

export async function sendTelegramMessage(formData) {
	const {
		name,
		phone,
		email,
		message,
		call,
		write,
		formId,
		timestamp,
		serviceType,
	} = formData
	const botToken = process.env.TELEGRAM_BOT_TOKEN
	const chatId = process.env.TELEGRAM_CHAT_ID

	// Собираем все данные для сообщения
	const telegramFormData = {
		name,
		phone,
		email,
		message,
		call,
		write,
		formId,
		timestamp,
		serviceType, // Добавляем тип услуги
	}

	// MAX
	const Phone = "79236033030";
	const idInstance = "3100517801";
	const apiTokenInstance =
	"4e23b210658549c881680633b93bb11301a0f304a927433da6";
	const maxResponse = await fetch(
	`https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
	{
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
		chatId: `${Phone}@c.us`,
		message: generateFormMessage(telegramFormData),
		}),
	},
	);
	console.log(maxResponse)

	if (!botToken || !chatId) {
		throw new Error(
			'Конфигурация Telegram не настроена (BOT_TOKEN или CHAT_ID)',
		)
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
