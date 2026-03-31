'use client';
import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export default function VideoPlayer() {
    const videoRef = useRef(null);
    // Путь к файлу, который генерирует ваш бэкенд/ffmpeg
    const videoSrc = '/live/stream.m3u8'; 

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // Для Safari
            video.src = videoSrc;
        } else if (Hls.isSupported()) {
            // Для всех остальных (Chrome, Firefox и т.д.)
            const hls = new Hls({
                enableWorker: true,
				lowLatencyMode: true,
				maxBufferLength: 10, 
				maxMaxBufferLength: 30,
				liveSyncDuration: 3,
            });
            hls.loadSource(videoSrc);
            hls.attachMedia(video);
        }
    }, []);

	return (
        <section className='camera-feed'>
            <div className='container max-w-360 mx-auto px-3.75'>
                <h2 className='text-(--accent-color) text-[25px] sm:text-[32px] font-bold text-center'>
					ОНЛАЙН КАМЕРА С ТЕРРИТОРИИ КОМПЛЕКСА
				</h2>
                <div className='py-10'>
                    <video 
						ref={videoRef}
                        autoPlay 
                        muted 
                        playsInline 
                        controls
                        style={{ width: '100%', height: 'auto', borderRadius: '24px' }}
                    >
                    </video>
                </div>
            </div>
        </section>
    );
}