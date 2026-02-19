import Header from "@/components/common/header";
import Contacts from "@/components/home-page/contacts";
import Reviews from "@/components/home-page/reviews/reviews";

export const metadata = {
  title: "Бронирование домов в Шерегеше | Гостевой комплекс Люди в уюте",
  description:
    "Забронируйте дом с видом на горы в Шерегеше. Собственная баня, парковка, уютные номера. Лучшие цены, быстрая бронь, официальное размещение.",
  keywords:
    "бронирование домов Шерегеш, снять дом в Шерегеше, гостевой комплекс Шерегеш, Люди в уюте бронирование, домики в Шерегеше",
  openGraph: {
    title: "Бронирование домов в Шерегеше | Гостевой комплекс Люди в уюте",
    description:
      "Забронируйте дом с видом на горы в Шерегеше. Собственная баня, парковка, уютные номера.",
    type: "website",
    locale: "ru_RU",
    url: "https://людивуюте.рф/booking",
    siteName: "Гостевой комплекс Люди в уюте",
    images: [
      {
        url: "/images/og-booking.jpg",
        width: 1200,
        height: 630,
        alt: "Гостевой комплекс Люди в уюте",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Бронирование домов в Шерегеше | Люди в уюте",
    description:
      "Забронируйте дом с видом на горы в Шерегеше. Собственная баня, парковка, уютные номера.",
    images: ["/images/og-booking.jpg"],
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
    canonical: "https://людивуюте.рф/booking",
  },
};

export default function BookingLayout({ children }) {
  return (
    <div className="max-w-480 mx-auto bg-(--accent-color)">
      <Header />
      {children}
      <Reviews />
      <Contacts />
    </div>
  );
}
