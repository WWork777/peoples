import HeroContactForm from '@/components/home-page/hero-contact-form'
export default function ServicesForm() {
	return (
		<section className='relative max-w-480 mx-auto bg-[url("/map.jpg")] bg-center bg-cover'>
			<div className='absolute inset-0 bg-black/50'></div>
			<div className='container max-w-7xl mx-auto px-3.75 py-5 md:py-20'>
				<HeroContactForm />
			</div>
		</section>
	)
}
