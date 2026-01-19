import TransferPage from '@/components/services-page/transfer-page'

export default async function ServicePage({ params }) {
	const { slug } = await params
	const toSelectService = () => {
		const services = {
			transfer: <TransferPage />,
		}

		return services[slug] || 'Такой услуги не найдено'
	}
	return <>{toSelectService()}</>
}
