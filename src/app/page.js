import Contacts from '@/components/contacts'
import AdditionalServices from '@/components/home-page/additional-services'
import Gallery from '@/components/home-page/gallery'
import Hero from '@/components/home-page/hero'
import Promotion from '@/components/home-page/promotion'
import Reviews from '@/components/home-page/reviews/reviews'

export default function Home() {
	return (
		<>
			<Hero />
			<Promotion />
			<AdditionalServices />
			<Gallery />
			<Reviews />
			<Contacts />
		</>
	)
}
