import { SITE_URL, address, business, contact, hours, links } from "@/data/site";

/**
 * Dados estruturados (schema.org/Bakery) usando apenas informações confirmadas.
 * Horários e telefone entram automaticamente quando o status em src/data/site.ts
 * mudar para "confirmed". Não há avaliações nem preços no schema.
 */
export function JsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "@id": `${SITE_URL}/#bakery`,
    name: business.name,
    description: business.about,
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/opengraph-image.jpg`,
    logo: `${SITE_URL}/icon.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: address.geo.latitude,
      longitude: address.geo.longitude,
    },
    hasMap: links.googleMaps,
    hasMenu: links.ifood,
    servesCuisine: ["Panificação artesanal", "Confeitaria francesa", "Café da manhã", "Brunch"],
    sameAs: [links.instagram],
  };

  if (contact.status === "confirmed" && contact.phone) data.telephone = contact.phone;

  if (hours.status === "confirmed") {
    data.openingHoursSpecification = hours.week
      .filter((d) => d.opens && d.closes)
      .map((d) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${d.schemaDay}`,
        opens: d.opens,
        closes: d.closes,
      }));
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
