import TransferPage from "@/components/services-page/transfer-page";
import InstructorPage from "@/components/services-page/instructor-page";
import PetPage from "@/components/services-page/pet-page";
import CoffeePage from "@/components/services-page/coffee-page";
import RentalPage from "@/components/services-page/rental-page";
import ChildrenPage from "@/components/services-page/children-page";
import CleaningPage from "@/components/services-page/cleaning-page";
import DeliveryPage from "@/components/services-page/delivery-page";
// app/services/[slug]/page.tsx
import { Metadata } from "next";
import { servicesMetadata } from "./meta-data";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const meta = servicesMetadata[slug] || {
    title: "Дополнительные услуги",
    description:
      'Дополнительные услуги в гостевом комплексе "Люди в уюте" в Шерегеше',
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
          url: `/services/${slug}-og.jpg`, // Рекомендую создать OG-изображения для каждой услуги
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
    alternates: {
      canonical: `https://людивуюте.рф/services/${slug}`,
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const toSelectService = () => {
    const services = {
      transfer: <TransferPage />,
      instructor: <InstructorPage />,
      pet: <PetPage />,
      coffee: <CoffeePage />,
      rental: <RentalPage />,
      children: <ChildrenPage />,
      cleaning: <CleaningPage />,
      delivery: <DeliveryPage />,
    };

    return services[slug] || "Такой услуги не найдено";
  };
  return <>{toSelectService()}</>;
}
