'use client'

import ChildrenPage from '@/components/services-page/children-page'
import CleaningPage from '@/components/services-page/cleaning-page'
import CoffeePage from '@/components/services-page/coffee-page'
import DeliveryPage from '@/components/services-page/delivery-page'
import InstructorPage from '@/components/services-page/instructor-page'
import PetPage from '@/components/services-page/pet-page'
import RentalPage from '@/components/services-page/rental-page'
import TransferPage from '@/components/services-page/transfer-page'
import { useEffect } from 'react'

export default function ServicePageClient({ slug }) {
	// Скролл вверх при переходе между услугами
	useEffect(() => {
		// Отключаем восстановление скролла браузером
		if ('scrollRestoration' in history) {
			history.scrollRestoration = 'manual'
		}

		// Используем несколько requestAnimationFrame для надежности
		const raf1 = requestAnimationFrame(() => {
			window.scrollTo({ top: 0, behavior: 'instant' })

			// Второй вызов для надежности
			const raf2 = requestAnimationFrame(() => {
				window.scrollTo({ top: 0, behavior: 'instant' })
			})

			return () => cancelAnimationFrame(raf2)
		})

		return () => {
			cancelAnimationFrame(raf1)
			// Возвращаем автоматическое восстановление при размонтировании
			if ('scrollRestoration' in history) {
				history.scrollRestoration = 'auto'
			}
		}
	}, [slug])

	const services = {
		transfer: <TransferPage />,
		instructor: <InstructorPage />,
		pet: <PetPage />,
		coffee: <CoffeePage />,
		rental: <RentalPage />,
		children: <ChildrenPage />,
		cleaning: <CleaningPage />,
		delivery: <DeliveryPage />,
	}

	return (
		services[slug] || (
			<div className='text-center py-20 text-xl text-red-600'>
				Такой услуги не найдено
			</div>
		)
	)
}
