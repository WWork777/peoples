import Header from '@/components/common/header'
import Contacts from '@/components/home-page/contacts'
export const metadata = {
	title: 'Галерея',
	description:
		'Здесь вы можете посмотреть фотографии нашего гостевого комплекса',
}

export default function GalleryLayout({ children }) {
	return (
		<div className='max-w-480 mx-auto bg-(--accent-color)'>
			<Header />
			{children}
			<Contacts />
		</div>
	)
}
