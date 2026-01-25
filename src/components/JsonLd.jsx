export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: "Люди в уюте",
    description: "Гостевой комплекс в Шерегеше у подъемников",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Шерегеш",
      addressRegion: "Кемеровская область",
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "52.9202",
      longitude: "87.9869",
    },
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Баня",
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Трансфер",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
