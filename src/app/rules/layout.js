import Header from '@/components/common/header'
import Contacts from '@/components/home-page/contacts'
export const metadata = {
	title: 'Правила проживания',
	description: 'Правила проживания',
}

export default function RulesLayout({ children }) {
	return (
		<div className='max-w-480 mx-auto bg-(--accent-color)'>
			<Header />
			{children}
			<Contacts />
		</div>
	)
}
