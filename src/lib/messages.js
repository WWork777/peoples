// // // lib/messages.js
// export const generateFormMessage = formData => {
// 	const fields = formData

// 	// Функция проверки, что поле имеет значение
// 	const hasValue = value => {
// 		return (
// 			value !== null && value !== undefined && value !== '' && value !== ' '
// 		)
// 	}

// 	// Определяем тип услуги
// 	let serviceTypeText = 'Не указано'
// 	if (fields.serviceType) {
// 		switch (fields.serviceType) {
// 			case 'transfer':
// 				serviceTypeText = '🚗 Трансфер'
// 				break
// 			case 'rent':
// 				serviceTypeText = '🚙 Аренда автомобиля'
// 				break
// 			case 'transfer_and_rent':
// 				serviceTypeText = '🚗🚙 Трансфер + Аренда автомобиля'
// 				break
// 			default:
// 				serviceTypeText = fields.serviceType
// 		}
// 	}

// 	const parts = [
// 		'📨 *ЗАЯВКА С САЙТА*',
// 		'',
// 		// Информация о форме
// 		hasValue(fields.formId) ? `📋 *Форма:* ${fields.formId}` : null,

// 		// Контактные данные
// 		hasValue(fields.name) ? `👤 *Имя:* ${fields.name}` : null,
// 		hasValue(fields.phone) ? `📞 *Телефон:* ${fields.phone}` : null,
// 		hasValue(fields.email) ? `📧 *Email:* ${fields.email}` : null,

// 		// Тип услуги
// 		`🎯 *Услуга:* ${serviceTypeText}`,

// 		// Сообщение пользователя
// 		hasValue(fields.message)
// 			? `\n💬 *СООБЩЕНИЕ ПОЛЬЗОВАТЕЛЯ:*\n${fields.message}`
// 			: null,

// 		// Таймстамп
// 		hasValue(fields.timestamp)
// 			? `\n🕐 *Время отправки:* ${new Date(fields.timestamp).toLocaleString('ru-RU')}`
// 			: null,
// 	].filter(Boolean)

// 	return parts.join('\n')
// }
// lib/messages.js
// export const generateFormMessage = formData => {
// 	const fields = formData

// 	// Функция проверки, что поле имеет значение
// 	const hasValue = value => {
// 		return (
// 			value !== null && value !== undefined && value !== '' && value !== ' '
// 		)
// 	}

// 	// Карта соответствия formId -> русское название
// 	const formNames = {
// 		'footer-form': 'Контакты',
// 		'transfer-page-modal': 'Трансфер',
// 		'contact-page-form': 'Заказ',
// 	}

// 	// Карта соответствия serviceType -> русское название
// 	const serviceNames = {
// 		transfer: 'Трансфер',
// 		rent: 'Аренда автомобиля',
// 		transfer_and_rent: 'Трансфер + Аренда автомобиля',
// 	}

// 	// Получаем название формы
// 	const formName =
// 		formNames[fields.formId] || fields.formId || 'Неизвестная форма'

// 	// Получаем название услуги (если есть)
// 	let serviceText = ''
// 	if (fields.serviceType && serviceNames[fields.serviceType]) {
// 		serviceText = `🎯 *Услуга:* ${serviceNames[fields.serviceType]}`
// 	}

// 	const parts = [
// 		'📨 *НОВАЯ ЗАЯВКА*',
// 		'',
// 		// Информация о форме
// 		`📋 *Раздел:* ${formName}`,

// 		// Контактные данные
// 		hasValue(fields.name) && `👤 *Имя:* ${fields.name}`,
// 		hasValue(fields.phone) && `📞 *Телефон:* ${fields.phone}`,
// 		hasValue(fields.email) && `📧 *Email:* ${fields.email}`,

// 		// Тип услуги (если есть)
// 		serviceText,

// 		// Сообщение пользователя
// 		hasValue(fields.message) && `\n💬 *Сообщение:*\n${fields.message}`,

// 		// Таймстамп
// 		`\n🕐 *Время отправки:* ${new Date(fields.timestamp || new Date()).toLocaleString('ru-RU')}`,
// 	].filter(Boolean)

// 	return parts.join('\n')
// }

// lib/messages.js
export const generateFormMessage = formData => {
	const fields = formData

	// Функция проверки, что поле имеет значение
	const hasValue = value => {
		return (
			value !== null && value !== undefined && value !== '' && value !== ' '
		)
	}

	// Определяем тип формы (русское название)
	let formTypeText = 'Неизвестная форма'
	if (fields.formId) {
		switch (fields.formId) {
			case 'footer-form':
				formTypeText = '👣 Контакты'
				break
			case 'transfer-page-modal':
				formTypeText = '🚗 Трансфер и Аренда'
				break
			case 'contact-page-form':
				formTypeText = '📞 Заказ'
				break
			default:
				formTypeText = fields.formId
		}
	}

	// Определяем тип услуги (только для transfer-page-modal)
	let serviceTypeText = ''
	if (fields.serviceType && fields.formId === 'transfer-page-modal') {
		switch (fields.serviceType) {
			case 'transfer':
				serviceTypeText = '🚗 *Трансфер*'
				break
			case 'rent':
				serviceTypeText = '🚙 *Аренда автомобиля*'
				break
			case 'transfer_and_rent':
				serviceTypeText = '🚗🚙 *Трансфер + Аренда автомобиля*'
				break
			default:
				serviceTypeText = `🎯 *Услуга:* ${fields.serviceType}`
		}
	}

	const parts = [
		'📨 *НОВАЯ ЗАЯВКА С САЙТА*',
		'',
		// Информация о форме
		`📋 *Форма:* ${formTypeText}`,

		// Контактные данные
		hasValue(fields.name) ? `👤 *Имя:* ${fields.name}` : null,
		hasValue(fields.phone) ? `📞 *Телефон:* ${fields.phone}` : null,
		hasValue(fields.email) ? `📧 *Email:* ${fields.email}` : null,

		// Тип услуги (только для трансфера)
		serviceTypeText,

		// Сообщение пользователя
		hasValue(fields.message) ? `\n💬 *СООБЩЕНИЕ:*\n${fields.message}` : null,

		// Таймстамп
		`\n🕐 *Отправлено:* ${new Date(
			fields.timestamp || new Date(),
		).toLocaleString('ru-RU', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		})}`,
	].filter(Boolean)

	return parts.join('\n')
}
