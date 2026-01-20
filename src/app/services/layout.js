import Header from '@/components/common/header'
import Contacts from '@/components/home-page/contacts'
export const metadata = {
	title: 'Дополнительные услуги',
	description: 'ЧТОБЫ ОТДЫХ БЫЛ ЕЩЕ ПРИЯТНЕЕ',
}

export default function ServicesLayout({ children }) {
	return (
		<div className='max-w-480 mx-auto bg-(--accent-color)'>
			<Header />
			{children}
			<Contacts />
		</div>
	)
}
