// app/services/[slug]/page.js
import ServicePageClient from "./ServicePageClient";
import { servicesMetadata } from "./meta-data";

export async function generateMetadata({ params }) {
  const { slug } = await params; // 🔹 распаковываем Promise
  const meta = servicesMetadata[slug] || {
    title: "Дополнительные услуги",
    description: 'Дополнительные услуги в гостевом комплексе "Люди в уюте"',
    keywords: "услуги, отдых, Шерегеш",
  };

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      locale: "ru_RU",
      siteName: "Люди в уюте",
      images: [
        {
          url: `/services/${slug}-og.jpg`,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [`/services/${slug}-og.jpg`],
    },
    alternates: { canonical: `https://людивуюте.рф/services/${slug}` },
  };
}

// 🔹 Серверный компонент просто рендерит клиентский
export default async function ServicePage({ params }) {
  const { slug } = await params;
  return <ServicePageClient slug={slug} />;
}
