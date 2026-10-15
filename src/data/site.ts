/**
 * Arquivo central de informações comerciais do O Padeiro Artesão.
 *
 * Tudo o que aparece no site (links, endereço, horários, contatos) sai daqui.
 * Campos marcados como `pending` NÃO são exibidos como confirmados: o site
 * mostra um aviso e direciona para a fonte oficial até que a loja valide.
 *
 * Pesquisa realizada em 14/10/2026 — fontes: iFood (página da loja),
 * Instagram @opadeiroartesao e Google Maps. Ver PENDENCIAS.md.
 */

export type Status = "confirmed" | "pending";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

export const business = {
  name: "O Padeiro Artesão",
  tagline: "Boulangerie & Pâtisserie",
  city: "Vinhedo",
  state: "SP",
  /** Texto da página "Sobre" do iFood, escrito pela própria loja. */
  about:
    "Padaria artesanal especializada em pães de fermentação natural e confeitaria europeia. Produção com fermentação natural, farinha orgânica e integrais, ingredientes selecionados e receitas do chef Fernando de Oliveira.",
  chef: {
    name: "Fernando de Oliveira",
    instagram: "https://www.instagram.com/cheffernandodeoliveira/",
  },
  /** Exibe uma linha discreta no rodapé indicando que é uma proposta. */
  proposalMode: true,
  copyrightYear: 2026,
} as const;

export const links = {
  ifood:
    "https://www.ifood.com.br/delivery/vinhedo-sp/o-padeiro-artesao-nova-vinhedo/1e659d4a-55d5-490f-8937-ddee3093a516",
  instagram: "https://www.instagram.com/opadeiroartesao/",
  instagramHandle: "@opadeiroartesao",
  /** Ficha do estabelecimento no Google Maps. */
  googleMaps:
    "https://www.google.com/maps/search/?api=1&query=O+Padeiro+Artes%C3%A3o%2C+Av.+Benedito+Storani%2C+999%2C+Vinhedo+-+SP",
  /** Rota até a loja (abre o app de mapas no celular). */
  directions:
    "https://www.google.com/maps/dir/?api=1&destination=O+Padeiro+Artes%C3%A3o%2C+Av.+Benedito+Storani%2C+999%2C+Nova+Vinhedo%2C+Vinhedo+-+SP",
  /** Mapa incorporado — não requer chave de API. */
  mapEmbed:
    "https://www.google.com/maps?q=O+Padeiro+Artes%C3%A3o,+Av.+Benedito+Storani,+999,+Vinhedo+-+SP&z=16&output=embed",
} as const;

export const address = {
  street: "Avenida Benedito Storani, 999",
  district: "Nova Vinhedo",
  city: "Vinhedo",
  state: "SP",
  postalCode: "13284-002",
  country: "BR",
  /** Confirmado por iFood, Google Maps e publicações do Instagram. */
  status: "confirmed" as Status,
  /** Coordenadas da ficha do Google Maps. */
  geo: { latitude: -23.0287274, longitude: -46.9841075 },
  full: "Avenida Benedito Storani, 999 — Nova Vinhedo, Vinhedo/SP — CEP 13284-002",
} as const;

export type DayHours = { day: string; schemaDay: string; opens?: string; closes?: string };

/**
 * Horários: as fontes divergem (Google Maps, Restaurant Guru e uma publicação
 * do Instagram com "08h às 17h"). Mantido como `pending` até validação.
 * Depois de confirmar com a loja, ajuste `week` e troque `status` para "confirmed".
 */
export const hours: { status: Status; week: DayHours[]; note: string } = {
  status: "pending",
  note: "Estamos confirmando os horários atuais com a loja. Consulte o horário do dia no Google Maps antes de sair de casa.",
  // Referência do Google Maps em 14/10/2026 (NÃO exibida enquanto pendente).
  week: [
    { day: "Segunda", schemaDay: "Monday" },
    { day: "Terça", schemaDay: "Tuesday", opens: "07:30", closes: "19:00" },
    { day: "Quarta", schemaDay: "Wednesday", opens: "07:30", closes: "19:00" },
    { day: "Quinta", schemaDay: "Thursday", opens: "07:30", closes: "19:00" },
    { day: "Sexta", schemaDay: "Friday", opens: "07:30", closes: "19:00" },
    { day: "Sábado", schemaDay: "Saturday", opens: "08:00", closes: "17:00" },
    { day: "Domingo", schemaDay: "Sunday", opens: "08:00", closes: "13:00" },
  ],
};

/**
 * Contatos: três telefones diferentes aparecem em fontes públicas
 * ((19) 99263-0242 no Google Maps; (19) 99142-7359 e (19) 3826-3506 em diretórios).
 * Nenhum foi confirmado como WhatsApp oficial — por isso não há botão de WhatsApp.
 * Após a confirmação, preencha os campos abaixo e o botão aparece automaticamente.
 */
export const contact: {
  status: Status;
  phone: string | null;
  whatsapp: string | null; // somente dígitos, ex.: "5519999999999"
  whatsappUses: string[];
} = {
  status: "pending",
  phone: null,
  whatsapp: null,
  whatsappUses: ["Dúvidas", "Encomendas"],
};

export const nav = [
  { href: "#produtos", label: "Produtos" },
  { href: "#historia", label: "História" },
  { href: "#momentos", label: "Momentos" },
  { href: "#galeria", label: "Galeria" },
  { href: "#visite", label: "Visite" },
] as const;

export const whatsappHref = (message = "Olá! Vim pelo site do O Padeiro Artesão.") =>
  contact.status === "confirmed" && contact.whatsapp
    ? `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`
    : null;
