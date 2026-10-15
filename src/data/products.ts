/**
 * Catálogo — nomes, descrições e preços extraídos do cardápio oficial no iFood
 * em 14/10/2026. As descrições foram encurtadas, sem acrescentar ingredientes.
 * Preços podem mudar: atualize `priceUpdatedAt` sempre que revisar.
 *
 * Fotos: imagens publicadas pela própria loja no iFood. Para trocar uma foto,
 * substitua o arquivo em src/assets/photos mantendo o mesmo nome.
 */
import type { StaticImageData } from "next/image";

import baguete from "@/assets/photos/baguete.jpg";
import paoFermentacao from "@/assets/photos/pao-fermentacao-natural.jpg";
import paoIntegral from "@/assets/photos/pao-integral.jpg";
import paoSarraceno from "@/assets/photos/pao-sarraceno.jpg";
import paoItaliano from "@/assets/photos/pao-italiano.jpg";
import paoMultigraos from "@/assets/photos/pao-multigraos.jpg";
import paoAlecrim from "@/assets/photos/pao-alecrim-parmesao.jpg";
import paoCalabresa from "@/assets/photos/pao-calabresa.jpg";
import croissant from "@/assets/photos/croissant.jpg";
import cinnamonRoll from "@/assets/photos/cinnamon-roll.jpg";
import croissantDoceLeite from "@/assets/photos/croissant-doce-de-leite.jpg";
import croissantChocolate from "@/assets/photos/croissant-chocolate.jpg";
import croissantBaunilha from "@/assets/photos/croissant-baunilha.jpg";
import pastelNata from "@/assets/photos/pastel-de-nata.jpg";
import entremet from "@/assets/photos/entremet-citron.jpg";
import macaronChocolate from "@/assets/photos/macaron-chocolate.jpg";
import macaronLimao from "@/assets/photos/macaron-limao.jpg";
import macaronMirtilo from "@/assets/photos/macaron-mirtilo.jpg";
import macaronMorango from "@/assets/photos/macaron-morango.jpg";
import cookieBaunilha from "@/assets/photos/cookie-baunilha.jpg";
import boloFuba from "@/assets/photos/bolo-fuba.jpg";
import cakeLaranja from "@/assets/photos/cake-laranja.jpg";
import madeleine from "@/assets/photos/madeleine.jpg";
import muffin from "@/assets/photos/muffin-chocolate.jpg";
import brioche from "@/assets/photos/brioche-chapa-ovo.jpg";
import ovoCrispy from "@/assets/photos/ovo-crispy.jpg";
import qbo from "@/assets/photos/qbo.jpg";
import mistoCroissant from "@/assets/photos/misto-croissant.jpg";
import empada from "@/assets/photos/empada-palmito.jpg";
import paoBatata from "@/assets/photos/pao-batata-frango.jpg";
import paoPizza from "@/assets/photos/pao-pizza.jpg";
import croutons from "@/assets/photos/croutons.jpg";
import torradas from "@/assets/photos/torradas.jpg";

export const priceUpdatedAt = "14/10/2026";

export type Product = {
  id: string;
  name: string; // nome exato do cardápio
  description: string;
  price: number | null; // em reais; null = não exibir
  image?: StaticImageData;
  imageAlt?: string;
  serves?: string;
};

export type Category = {
  id: string;
  label: string;
  /** Categorias do iFood que compõem esta aba. */
  sourceCategories: string[];
  intro: string;
  featured: Product[]; // com foto
  more: Product[]; // itens sem foto no iFood — exibidos em lista
};

export const categories: Category[] = [
  {
    id: "paes",
    label: "Pães de fermentação natural",
    sourceCategories: ["Pães Fermentação Natural", "Pães recheados de fermentação natural.", "Pães Macios"],
    intro: "Levain, farinhas italianas e fermentação longa. Pães de casca grossa e miolo macio, para a mesa de todos os dias.",
    featured: [
      {
        id: "baguete-francesa",
        name: "Baguete Francesa",
        description: "Fermentação longa e farinha francesa. Casquinha fina e crocante, miolo macio.",
        price: 15,
        image: baguete,
        imageAlt: "Baguete francesa inteira ao lado de uma metade aberta mostrando o miolo alveolado",
      },
      {
        id: "pao-100-fermentacao-natural",
        name: "Pão 100% Fermentação natural",
        description: "Farinha orgânica italiana e levain. Casca grossa, miolo macio. Não contém lactose.",
        price: 28,
        image: paoFermentacao,
        imageAlt: "Pão de fermentação natural de casca dourada sobre tábua de madeira",
      },
      {
        id: "pao-100-integral",
        name: "Pão 100% integral",
        description: "Farinha italiana moída em pedra, com aveia na crosta.",
        price: 29.5,
        image: paoIntegral,
        imageAlt: "Pão integral de fermentação natural com aveia na crosta",
      },
      {
        id: "pao-multigraos",
        name: "Pão Multigrãos",
        description: "Mix de farinhas italianas com grãos no miolo e na crosta.",
        price: 29.5,
        image: paoMultigraos,
        imageAlt: "Pão multigrãos com sementes na crosta",
      },
      {
        id: "pao-de-sarraceno",
        name: "Pão de Sarraceno",
        description: "Trigo sarraceno, cereal tradicional nos pães rústicos do interior da França.",
        price: 32,
        image: paoSarraceno,
        imageAlt: "Pão rústico de trigo sarraceno",
      },
      {
        id: "pao-italiano",
        name: "Pão Italiano",
        description: "Massa densa e casca mais firme — ideal para sopas e fondue.",
        price: 26.5,
        image: paoItaliano,
        imageAlt: "Pão italiano de casca dourada com corte longitudinal",
      },
      {
        id: "pao-alecrim-parmesao",
        name: "Pão de Alecrim com Parmesão",
        description: "Fermentação natural e farinha italiana, com alecrim e parmesão.",
        price: 39.5,
        image: paoAlecrim,
        imageAlt: "Pão de fermentação natural com alecrim e parmesão",
      },
      {
        id: "pao-rustico-calabresa",
        name: "Pão rústico recheado com calabresa",
        description: "Fermentação natural, recheado com calabresa, azeitonas pretas e mussarela.",
        price: 39.5,
        image: paoCalabresa,
        imageAlt: "Pão rústico recheado com calabresa",
      },
    ],
    more: [
      { id: "pao-forma", name: "Pão de Forma macio", description: "100% farinha integral, mel, azeite e fermentação natural.", price: 30, serves: "Serve 2 pessoas" },
      { id: "pao-forma-graos", name: "Pão de forma macio com grãos", description: "A mesma receita, com grãos por cima.", price: 32, serves: "Serve 2 pessoas" },
      { id: "pao-caseiro", name: "Pão caseiro", description: "Receita de família, com fermento de litro.", price: 25, serves: "Serve 3 pessoas" },
    ],
  },
  {
    id: "viennoiserie",
    label: "Viennoiserie",
    sourceCategories: ["Viennoiserie"],
    intro: "Massa folhada com manteiga francesa: camadas que estalam por fora e se abrem por dentro.",
    featured: [
      {
        id: "croissant",
        name: "Croissant",
        description: "Preparado com manteiga francesa. Casquinha crocante, miolo macio.",
        price: 14,
        image: croissant,
        imageAlt: "Croissant cortado ao meio revelando o miolo em favo de mel",
      },
      {
        id: "pastel-de-nata",
        name: "Pastel de Nata",
        description: "Massa folhada com manteiga francesa e creme de leite, canela e limão.",
        price: 9.95,
        image: pastelNata,
        imageAlt: "Pastéis de nata com o topo caramelizado",
      },
      {
        id: "cinnamon-roll",
        name: "Cinnamon Roll",
        description: "Feito com a massa do croissant, canela, açúcar de confeiteiro e açúcar perolado.",
        price: 18.6,
        image: cinnamonRoll,
        imageAlt: "Cinnamon roll polvilhado com açúcar de confeiteiro e açúcar perolado",
      },
      {
        id: "croissant-doce-de-leite",
        name: "Croissant com doce de leite",
        description: "Recheado com creme de doce de leite e cobertura de chocolate crocante.",
        price: 25,
        image: croissantDoceLeite,
        imageAlt: "Croissant recheado com doce de leite e cobertura de chocolate",
      },
      {
        id: "croissant-chocolate",
        name: "Croissant recheado com creme de chocolate",
        description: "Creme patissier, chocolate meio amargo e Nutella.",
        price: 25,
        image: croissantChocolate,
        imageAlt: "Croissant recheado com creme de chocolate",
      },
      {
        id: "croissant-baunilha",
        name: "Croissant recheado com creme de baunilha",
        description: "O croissant da casa, recheado com creme de baunilha.",
        price: 25,
        image: croissantBaunilha,
        imageAlt: "Croissant recheado com creme de baunilha",
      },
    ],
    more: [],
  },
  {
    id: "confeitaria",
    label: "Confeitaria",
    sourceCategories: ["Doces", "Bolos", "Fatias de Bolo"],
    intro: "Pâtisserie francesa e bolos de receita artesanal — do macaron ao bolo de fubá.",
    featured: [
      {
        id: "entremet-citron",
        name: "Entremet citron",
        description: "Mousse de limão e cremoso de limão siciliano com manjericão.",
        price: 31,
        image: entremet,
        imageAlt: "Entremet citron em formato de limão sobre prato de cerâmica",
      },
      {
        id: "macarons-morango",
        name: "Macarons de morango",
        description: "À base de amêndoas, sem glúten, recheado com creme de morango.",
        price: 9.5,
        image: macaronMorango,
        imageAlt: "Macarons de morango",
      },
      {
        id: "macarons-chocolate",
        name: "Macarons de chocolate",
        description: "À base de amêndoas, sem glúten, recheado com creme de chocolate.",
        price: 9.5,
        image: macaronChocolate,
        imageAlt: "Macarons de chocolate",
      },
      {
        id: "macarons-limao",
        name: "Macarons de Limão Siciliano",
        description: "Tradicional doce francês à base de amêndoas.",
        price: 9.5,
        image: macaronLimao,
        imageAlt: "Macarons de limão siciliano",
      },
      {
        id: "macarons-mirtilo",
        name: "Macarons de Mirtilo",
        description: "Tradicional doce francês à base de amêndoas.",
        price: 9.5,
        image: macaronMirtilo,
        imageAlt: "Macarons de mirtilo",
      },
      {
        id: "madeleine",
        name: "Madeleine",
        description: "Bolinho francês à base de manteiga. Pacote com 4 unidades.",
        price: 12.5,
        image: madeleine,
        imageAlt: "Madeleines douradas",
      },
      {
        id: "bolo-fuba",
        name: "Bolo de Fubá",
        description: "Bolo tradicional de fubá com erva-doce.",
        price: 22.5,
        image: boloFuba,
        imageAlt: "Bolo de fubá com erva-doce",
      },
      {
        id: "cake-laranja",
        name: "Cake de laranja",
        description: "Receita artesanal: massa leve, fofinha e aromática.",
        price: 25,
        image: cakeLaranja,
        imageAlt: "Cake de laranja fatiado",
      },
      {
        id: "muffin-chocolate",
        name: "Muffin de Chocolate",
        description: "Com gotas de chocolate belga meio amargo.",
        price: 15,
        image: muffin,
        imageAlt: "Muffin de chocolate com gotas de chocolate",
      },
      {
        id: "cookie-baunilha",
        name: "Cookie de Baunilha",
        description: "Cookie de baunilha da casa.",
        price: 11,
        image: cookieBaunilha,
        imageAlt: "Cookies de baunilha",
      },
    ],
    more: [
      { id: "eclair-chocolate", name: "Eclair de Chocolate", description: "Pâte à choux, creme e cobertura de chocolate meio amargo.", price: 19 },
      { id: "eclair-baunilha", name: "Eclair de baunilha", description: "Pâte à choux, creme de baunilha e chocolate branco belga.", price: 19 },
      { id: "fatia-red-velvet", name: "Fatia bolo Red Velvet", description: "Creme de cream cheese, baunilha e raspas de limão siciliano.", price: 25 },
      { id: "fatia-trufado", name: "Fatia de bolo trufado", description: "Massa de chocolate belga e recheio trufado com cream cheese.", price: 22.5 },
      { id: "cookies-chocolate", name: "Cookies de Chocolate", description: "Cookie de chocolate da casa.", price: 12 },
    ],
  },
  {
    id: "brunch",
    label: "Brunch & sanduíches",
    sourceCategories: ["Brunch", "Sanduiches"],
    intro: "Pães da casa na chapa, ovos cremosos e sanduíches montados em baguete, brioche e croissant.",
    featured: [
      {
        id: "ovo-crispy",
        name: "Ovo crispy",
        description: "Ovo cremoso com bacon crocante, seleção de pães artesanais do dia e tomates confit.",
        price: 49.9,
        image: ovoCrispy,
        imageAlt: "Ovos cremosos com bacon crocante, fatias de pão de fermentação natural e tomates confit",
      },
      {
        id: "brioche-chapa-ovo",
        name: "Brioche na chapa com ovo",
        description: "Brioche francês dourado na chapa, com ovo frito de gema mole.",
        price: 22.9,
        image: brioche,
        imageAlt: "Brioche dourado na chapa servido com ovo frito",
      },
      {
        id: "qbo",
        name: "Qbo",
        description: "Queijo, bacon e ovo no brioche de hambúrguer.",
        price: 34.9,
        image: qbo,
        imageAlt: "Sanduíche de queijo, bacon e ovo no brioche",
      },
      {
        id: "misto-croissant",
        name: "Misto quente no croissant",
        description: "Misto quente preparado com o croissant francês da casa.",
        price: 25,
        image: mistoCroissant,
        imageAlt: "Misto quente no croissant",
      },
    ],
    more: [
      { id: "croissant-ovo-bacon", name: "Croissant com ovo cremoso e bacon", description: "Recheado com ovo cremoso e bacon crocante.", price: 43.9, serves: "Serve 1 pessoa" },
      { id: "sanduiche-caprese", name: "Sanduiche caprese", description: "No croissant, com tomatinho confit, mussarela de búfala e manjericão.", price: 25 },
      { id: "misto-baguete", name: "Misto Quente na baguete", description: "Na baguete francesa, com presunto e queijo.", price: 25 },
      { id: "sanduiche-salame", name: "Sanduiche no croissant de Salame", description: "Croissant recheado com queijo e salame.", price: 25 },
      { id: "queijo-quente-baguete", name: "Queijo quente na baguete", description: "Cream cheese e queijo prato derretido na baguete.", price: 25 },
    ],
  },
  {
    id: "salgados",
    label: "Salgados",
    sourceCategories: ["Salgados"],
    intro: "Para o lanche da tarde ou para levar: massas da casa com recheios generosos.",
    featured: [
      {
        id: "empada-palmito",
        name: "Empada de palmito",
        description: "Massa crocante com recheio de palmito.",
        price: 18,
        image: empada,
        imageAlt: "Empada de palmito com massa dourada",
      },
      {
        id: "pao-batata-frango",
        name: "Pão de batata com frango e requeijão!",
        description: "Feito com muita batata na massa — por isso tão macio.",
        price: 12.5,
        image: paoBatata,
        imageAlt: "Pão de batata recheado com frango e requeijão",
      },
      {
        id: "pao-pizza",
        name: "Pão pizza!",
        description: "Massa de croissant com queijo, presunto, requeijão, Catupiry e orégano.",
        price: 24,
        image: paoPizza,
        imageAlt: "Pão pizza feito com massa de croissant",
      },
    ],
    more: [
      { id: "pao-batata-requeijao", name: "Pão de batata recheado com requeijão", description: "Batata na massa, recheio de requeijão.", price: 12.5 },
    ],
  },
  {
    id: "emporio",
    label: "Empório",
    sourceCategories: ["Empório"],
    intro: "Os pães de fermentação natural também viram torradas e croutons para a despensa.",
    featured: [
      {
        id: "torradas",
        name: "Torradas artesanais",
        description: "Feitas com os pães de fermentação natural da casa, sem conservantes.",
        price: 12,
        image: torradas,
        imageAlt: "Torradas artesanais de pão de fermentação natural",
      },
      {
        id: "croutons",
        name: "Croutons",
        description: "Feitos com pães de fermentação natural — para acompanhar saladas.",
        price: 15,
        image: croutons,
        imageAlt: "Croutons dourados",
      },
    ],
    more: [],
  },
];

export const allProducts = categories.flatMap((c) => [...c.featured, ...c.more]);

export const formatPrice = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
