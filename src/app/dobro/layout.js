import Header from '@/components/common/header'
import Contacts from '@/components/home-page/contacts'
export const metadata = {
	title: 'Твори Добро Сегодня',
	description: 'Мы открываем рубрику «Твори Добро Сегодня»',
}

export default function DobroLayout({ children }) {
	return (
		<div className='max-w-480 mx-auto bg-(--accent-color)'>
			<Header />
			{children}
			<Contacts />
		</div>
	)
}
