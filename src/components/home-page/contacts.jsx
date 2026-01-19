export default function Contacts() {
	return (
		<section className='contacts bg-(--accent-color) relative'>
			<img
				src='/images/contacts/logo.webp'
				alt='logo-bg'
				className=' w-[45%] h-[45%] mx-auto opacity-5'
			/>
			<div className='absolute inset-0'>
				<div className='container max-w-7xl mx-auto px-3.75 py-10 flex  '>
					<div className='w-1/2'>
						<h2 className='text-white text-[25px] sm:text-[32px] font-bold text-left'>
							КОНТАКТЫ
						</h2>
					</div>
					<div className='w-1/2'>FORM!!!</div>
				</div>
			</div>
		</section>
	)
}
