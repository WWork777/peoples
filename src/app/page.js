import AdditionalServices from "@/components/home-page/additional-services";
import Atmosphere from "@/components/home-page/atmosphere";
import Contacts from "@/components/home-page/contacts";
import Dobro from "@/components/home-page/dobro";
import Gallery from "@/components/home-page/gallery";
import Hero from "@/components/home-page/hero";
import Promotion from "@/components/home-page/promotion";
import RestWidget from "@/components/home-page/rest-widget";
import Reviews from "@/components/home-page/reviews/reviews";
import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

export const metadata = {
  title:
    "Проживание в Шерегеше у подъемников — с баней и трансфером | Люди в уюте",
  description:
    "Комфортный отдых в Шерегеше для семьи и компаний. Номера у склонов, русская баня, зона BBQ, трансфер. Идеальная база для горнолыжного сезона и летнего туризма в Горной Шории. Забронируйте онлайн.",
  keywords:
    "Шерегеш, гостевой комплекс, проживание у подъемников, аренда в Шерегеше, баня в Шерегеше, отдых в Горной Шории, горнолыжный курорт, летний отдых, размещение, номера, бронирование",

  openGraph: {
    title:
      "Проживание в Шерегеше у подъемников — с баней и трансфером | Люди в уюте",
    description:
      "Уютные номера у склонов, русская баня, BBQ зона. Идеальная база для отдыха зимой и летом. Забронируйте размещение онлайн.",
    type: "website",
    locale: "ru_RU",
    siteName: "Люди в уюте",
    images: [
      {
        url: "/gallery/1.webp", // Замените на путь к вашему OG изображению
        width: 1200,
        height: 630,
        alt: "Гостевой комплекс в Шерегеше",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Гостевой комплекс в Шерегеше | У подъемников",
    description:
      "Комфортное размещение у склонов Шерегеша с баней и зоной отдыха. Бронируйте онлайн.",
    images: ["/gallery/1.webp"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://людивуюте.рф", // Замените на ваш URL
  },
};

export default function Home() {
  return (
    <>
      <JsonLd />
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
  );
}
