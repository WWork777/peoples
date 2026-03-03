// app/robots.ts

export default function robots() {
	const baseUrl = 'https://людивуюте.рф'
	const cyrillicUrl = 'https://xn--80adjdqbdeg6a3a.xn--p1ai' // IDN в Punycode

	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/admin/', '/api/', '/private/', '/coffee-price/'],
		},
		sitemap: [`${baseUrl}/sitemap.xml`, `${cyrillicUrl}/sitemap.xml`],
		host: baseUrl, // Для Яндекса
	}
}
