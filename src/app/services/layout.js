import Header from '@/components/common/header'
import Contacts from '@/components/home-page/contacts'
import Reviews from '@/components/home-page/reviews/reviews'
import ServicesForm from '@/components/services-page/services-form'

export default function ServicesLayout({ children }) {
	return (
		<div className='max-w-480 mx-auto bg-(--accent-color)'>
			<Header />
			{children}
			<ServicesForm />
			<Reviews />
			<Contacts />
		</div>
	)
}
