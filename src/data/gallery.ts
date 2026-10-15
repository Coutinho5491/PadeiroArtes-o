import type { StaticImageData } from "next/image";
import paoSarraceno from "@/assets/photos/pao-sarraceno.jpg";
import macaronMorango from "@/assets/photos/macaron-morango.jpg";
import croissantDoceLeite from "@/assets/photos/croissant-doce-de-leite.jpg";
import croissantBaunilha from "@/assets/photos/croissant-baunilha.jpg";
import boloFuba from "@/assets/photos/bolo-fuba.jpg";
import qbo from "@/assets/photos/qbo.jpg";
import muffin from "@/assets/photos/muffin-chocolate.jpg";
import paoIntegral from "@/assets/photos/pao-integral.jpg";
import empada from "@/assets/photos/empada-palmito.jpg";
import cookie from "@/assets/photos/cookie-baunilha.jpg";
import pizza from "@/assets/photos/pao-pizza.jpg";
import macaronMirtilo from "@/assets/photos/macaron-mirtilo.jpg";

export type GalleryImage = { src: StaticImageData; alt: string; caption: string };

/** Fotografias publicadas pela própria loja (iFood). Legenda = nome do produto no cardápio. */
export const gallery: GalleryImage[] = [
  { src: paoSarraceno, alt: "Pão de trigo sarraceno de casca rústica", caption: "Pão de Sarraceno" },
  { src: macaronMorango, alt: "Macarons de morango", caption: "Macarons de morango" },
  { src: croissantDoceLeite, alt: "Croissant com doce de leite e cobertura de chocolate", caption: "Croissant com doce de leite" },
  { src: croissantBaunilha, alt: "Croissant recheado com creme de baunilha", caption: "Croissant recheado com creme de baunilha" },
  { src: boloFuba, alt: "Bolo de fubá com erva-doce", caption: "Bolo de Fubá" },
  { src: qbo, alt: "Sanduíche de queijo, bacon e ovo no brioche", caption: "Qbo" },
  { src: paoIntegral, alt: "Pão 100% integral com aveia na crosta", caption: "Pão 100% integral" },
  { src: muffin, alt: "Muffin de chocolate com gotas de chocolate belga", caption: "Muffin de Chocolate" },
  { src: empada, alt: "Empada de palmito", caption: "Empada de palmito" },
  { src: macaronMirtilo, alt: "Macarons de mirtilo", caption: "Macarons de Mirtilo" },
  { src: cookie, alt: "Cookies de baunilha", caption: "Cookie de Baunilha" },
  { src: pizza, alt: "Pão pizza feito com massa de croissant", caption: "Pão pizza!" },
];
