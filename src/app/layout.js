import FloatingContactButton from "@/components/home-page/floating-contact-button";
import YandexMetrika from "@/components/YandexMetrika/YandexMEtrika";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["cyrillic"],
});

export const metadata = {
  icons: {
    icon: [
      { rel: "icon", type: "image/svg+xml", url: "/favicon/favicon.svg" },
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        url: "/favicon/favicon-96x96.png",
      },
    ],
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={`${montserrat.variable} antialiased`}>
        <div className="max-w-[2560px] mx-auto">{children}</div>
        <YandexMetrika />
        <FloatingContactButton />
      </body>
    </html>
  );
}
