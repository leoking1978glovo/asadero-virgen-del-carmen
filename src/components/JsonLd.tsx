import { RESTAURANT } from "@/data/restaurant";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Virgen del Carmen — Pollos Asados",
    telephone: RESTAURANT.phoneIntl,
    priceRange: "€5-20",
    servesCuisine: ["Pollo asado", "Brasa", "Española"],
    address: {
      "@type": "PostalAddress",
      addressLocality: RESTAURANT.city,
      addressRegion: "Andalucía",
      addressCountry: "ES",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "11:30",
        closes: "14:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "18:30",
        closes: "21:30",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
