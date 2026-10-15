import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { SITE_URL, business } from "@/data/site";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const title = "O Padeiro Artesão | Padaria artesanal de fermentação natural em Vinhedo/SP";
const description =
  "Boulangerie & pâtisserie em Nova Vinhedo: pães de fermentação natural, croissants com manteiga francesa, macarons, brunch e café da manhã. Peça pelo iFood ou visite a loja na Av. Benedito Storani, 999.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  applicationName: business.name,
  keywords: [
    "padaria artesanal Vinhedo",
    "fermentação natural Vinhedo",
    "croissant Vinhedo",
    "café da manhã Vinhedo",
    "brunch Vinhedo",
    "confeitaria francesa Vinhedo",
    "O Padeiro Artesão",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: business.name,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fbf8f1",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${manrope.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script
          // Marca o documento quando há JS e o usuário não pediu movimento reduzido.
          dangerouslySetInnerHTML={{
            __html:
              "if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion-ok')",
          }}
        />
      </head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
