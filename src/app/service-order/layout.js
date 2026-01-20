import Header from '@/components/common/header'
import Contacts from '@/components/home-page/contacts'
export const metadata = {
	title: 'Отправить заказ',
	description: 'ЧТОБЫ ОТДЫХ БЫЛ ЕЩЕ ПРИЯТНЕЕ',
}

export default function ServiceOrderLayout({ children }) {
	return (
		<div className='max-w-480 mx-auto bg-(--accent-color)'>
			<Header />
			{children}
			<Contacts />
		</div>
	)
}
