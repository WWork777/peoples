import AdditionalServices from '@/components/home-page/additional-services'
import Atmosphere from '@/components/home-page/atmosphere'
import Contacts from '@/components/home-page/contacts'
import Dobro from '@/components/home-page/dobro'
import Gallery from '@/components/home-page/gallery'
import Hero from '@/components/home-page/hero'
import Promotion from '@/components/home-page/promotion'
import RestWidget from '@/components/home-page/rest-widget'
import Reviews from '@/components/home-page/reviews/reviews'

export default function Home() {
	return (
		<>
			<Hero />
			<Atmosphere />
			<RestWidget />
			<Promotion />
			<AdditionalServices />
			<Gallery />
			<Reviews />
			<Dobro />
			<Contacts />
		</>
	)
}
