"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import brioche from "@/assets/photos/brioche-chapa-ovo.jpg";
import madeleine from "@/assets/photos/madeleine.jpg";
import pastelNata from "@/assets/photos/pastel-de-nata.jpg";
import cupcakes from "@/assets/photos/evento-cupcakes.jpg";
import multigraos from "@/assets/photos/pao-multigraos.jpg";
import { links } from "@/data/site";
import { MQ_RICH, gsap, useGSAP } from "@/lib/gsap";

type Moment = {
  id: string;
  kicker: string;
  title: string;
  text: string;
  image?: StaticImageData;
  imageAlt?: string;
  caption?: string;
  cta: { label: string; href: string };
};

// Ocasiões confirmadas pela bio do Instagram e publicações de out/2026.
const moments: Moment[] = [
  {
    id: "cafe-da-manha",
    kicker: "Café da manhã",
    title: "Começar o dia sem pressa.",
    text: "Brioche na chapa com ovo, ovos cremosos com pães do dia, croissant e café.",
    image: brioche,
    imageAlt: "Brioche dourado na chapa com ovo frito",
    caption: "Brioche na chapa com ovo",
    cta: { label: "Ver brunch & sanduíches", href: "#produtos-brunch" },
  },
  {
    id: "brunch",
    kicker: "Brunch para compartilhar",
    title: "Petit Déjeuner e Brunch Famille.",
    text: "Os brunches da casa: o Petit Déjeuner, para duas pessoas, reúne croissant, brioche francês, ovos cremosos, madeleines, macarons, frutas e castanhas. O Brunch Famille serve três.",
    image: madeleine,
    imageAlt: "Madeleines douradas",
    caption: "Madeleines — parte do Petit Déjeuner",
    cta: { label: "Como chegar", href: links.directions },
  },
  {
    id: "pausa",
    kicker: "Pausa para o café",
    title: "Um doce no meio da tarde.",
    text: "Pastel de nata, cinnamon roll, macarons e eclairs para acompanhar o café.",
    image: pastelNata,
    imageAlt: "Pastéis de nata caramelizados",
    caption: "Pastel de Nata",
    cta: { label: "Ver viennoiserie", href: "#produtos-viennoiserie" },
  },
  {
    id: "familia",
    kicker: "Em família",
    title: "Encontros que viram lembrança.",
    text: "A casa promove datas especiais — como a oficina de cupcakes para crianças no Dia das Crianças e tardes com música ao vivo.",
    image: cupcakes,
    imageAlt: "Cupcakes em suportes dourados e sacos de confeitar com coberturas coloridas, preparados para a oficina infantil",
    caption: "Oficina de cupcakes · outubro de 2026",
    cta: { label: "Agenda no Instagram", href: links.instagram },
  },
  {
    id: "almoco",
    kicker: "Almoço",
    title: "Massa Show: monte o seu prato.",
    text: "Novidade de outubro: escolha a massa artesanal (espaguete, talharim ou nhoque), o molho e os ingredientes.",
    cta: { label: "Ver no Instagram", href: "https://www.instagram.com/opadeiroartesao/p/DePgRTTvzgc/" },
  },
  {
    id: "para-levar",
    kicker: "Para levar para casa",
    title: "O pão da semana.",
    text: "Pães de fermentação natural, pão de forma, torradas e croutons — na loja ou pelo iFood.",
    image: multigraos,
    imageAlt: "Pão multigrãos de fermentação natural",
    caption: "Pão Multigrãos",
    cta: { label: "Pedir no iFood", href: links.ifood },
  },
];

export function Momentos() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ_RICH, () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth + 80;
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      id="momentos"
      ref={root}
      aria-labelledby="momentos-title"
      className="scroll-mt-16 overflow-hidden bg-olive-ink py-24 text-flour lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:pb-6 lg:pt-24"
    >
      <div className="container-page flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow text-olive!">Café da manhã e momentos especiais</p>
          <h2 id="momentos-title" className="display mt-4 text-[clamp(2.4rem,4.4vw,4rem)]">
            Cada hora do dia tem <em className="text-golden">o seu pão</em>.
          </h2>
        </div>
        <p className="hidden text-sm text-flour/60 lg:block">Role para ver os momentos →</p>
      </div>

      <ul
        ref={track}
        className="snap-row mt-12 px-5 md:px-10 lg:mt-10 lg:overflow-visible! lg:pl-[max(2.5rem,calc((100vw-84rem)/2+2.5rem))] lg:will-change-transform"
        aria-label="Momentos"
      >
        {moments.map((m) => (
          <li key={m.id} className="w-[82vw] max-w-[26rem] shrink-0 sm:w-[60vw] lg:w-[30rem]">
            <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-flour text-crust-deep">
              {m.image ? (
                <figure className="relative aspect-[4/3] overflow-hidden lg:aspect-[16/10]">
                  <Image src={m.image} alt={m.imageAlt ?? ""} fill placeholder="blur" sizes="(min-width: 1024px) 480px, 82vw" className="object-cover" />
                  {m.caption && (
                    <figcaption className="absolute bottom-3 left-3 rounded-full bg-flour/90 px-3 py-1 text-[11px] font-semibold text-crust-deep backdrop-blur">
                      {m.caption}
                    </figcaption>
                  )}
                </figure>
              ) : (
                <div aria-hidden className="grain relative grid aspect-[4/3] place-items-center bg-golden/20 lg:aspect-[16/10]">
                  <p className="display px-8 text-center text-5xl italic text-crust">Massa<br />Show</p>
                </div>
              )}
              <div className="flex flex-1 flex-col p-7">
                <p className="eyebrow">{m.kicker}</p>
                <h3 className="mt-3 font-display text-2xl leading-tight lg:text-3xl">{m.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{m.text}</p>
                <a
                  href={m.cta.href}
                  {...(m.cta.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-bold text-olive-deep hover:text-olive-ink"
                >
                  {m.cta.label}
                  <ArrowUpRight className="size-4" aria-hidden />
                  {m.cta.href.startsWith("http") && <span className="sr-only"> (abre em nova aba)</span>}
                </a>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
