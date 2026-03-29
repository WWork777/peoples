import Link from 'next/link'
export default function VideoPlayer() {
    return(
        <section className='camera-feed py-10'>
			<div className='container max-w-7xl mx-auto px-3.75'>
				<h2 className='text-(--accent-color) text-[25px] sm:text-[32px] font-bold text-center leading-8 xs:leading-normal pb-5'>
					Онлайн камера с территории комплекса
				</h2>
				<div className='w-full max-w-3xl mx-auto overflow-hidden rounded-lg shadow-lg aspect-video bg-black'>
					<iframe
						src='http://localhost:1984/webrtc.html?src=camera1&media=video'
						className='w-full h-full border-0'
						allow='fullscreen'
						title='Онлайн камера с территории комплекса'
					/>
				</div>
			</div>
		</section>
    );

}