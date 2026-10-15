"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowDown, MapPin, ShoppingBag } from "lucide-react";
import croissant from "@/assets/photos/croissant.jpg";
import pastelNata from "@/assets/photos/pastel-de-nata.jpg";
import { CtaLink } from "@/components/ui/CtaLink";
import { address, business, links } from "@/data/site";
import { MQ_MOTION, MQ_RICH, gsap, useGSAP } from "@/lib/gsap";

const lines = [
  <>Pão de verdade</>,
  <>
    leva <em className="text-olive-deep">tempo</em>.
  </>,
];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ_MOTION, () => {
        // Estados iniciais vêm do CSS (.motion-ok) para não haver "piscar" antes da hidratação.
        root.current?.classList.add("hero-ready");
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.fromTo("[data-hero-line]", { yPercent: 115 }, { yPercent: 0, duration: 1.2, stagger: 0.12 })
          .fromTo("[data-hero-fade]", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 }, "-=0.8")
          .fromTo("[data-hero-image]", { scale: 1.12 }, { scale: 1, duration: 1.8, ease: "power3.out" }, 0)
          .fromTo("[data-hero-float]", { autoAlpha: 0, y: 40, rotate: -6 }, { autoAlpha: 1, y: 0, rotate: 0, duration: 1.2 }, 0.5);
      });

      // Parallax apenas no desktop: a foto desliza dentro do arco.
      mm.add(MQ_RICH, () => {
        gsap.to("[data-hero-image]", {
          yPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero-float]", {
          y: -90,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      id="inicio"
      ref={root}
      aria-labelledby="hero-title"
      className="grain relative overflow-hidden bg-flour pb-16 pt-28 lg:min-h-[100svh] lg:pb-0 lg:pt-0"
    >
      <div className="container-page grid items-center gap-12 lg:min-h-[100svh] lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6 lg:py-32">
          <p data-hero-fade className="eyebrow flex items-center gap-3">
            <span className="h-px w-10 bg-olive" aria-hidden />
            {business.tagline} · Vinhedo/SP
          </p>

          <h1 id="hero-title" className="display mt-6 text-[clamp(3.2rem,7.2vw,6.4rem)] text-crust-deep">
            {lines.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.08em]">
                <span data-hero-line className="block">
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p data-hero-fade className="mt-7 max-w-lg text-lg leading-relaxed text-muted [text-wrap:pretty]">
            Fermentação natural, farinhas selecionadas e manteiga francesa nos folhados. Pães, croissants e
            confeitaria de inspiração europeia, com receitas do chef {business.chef.name}, em Nova Vinhedo.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div data-hero-fade>
              <CtaLink href={links.ifood} size="lg" className="w-full sm:w-auto" icon={<ShoppingBag className="size-5" aria-hidden />}>
                Fazer meu pedido
              </CtaLink>
            </div>
            <div data-hero-fade>
              <CtaLink href="#produtos" size="lg" variant="secondary" className="w-full sm:w-auto" icon={<ArrowDown className="size-4" aria-hidden />}>
                Conhecer nossos produtos
              </CtaLink>
            </div>
          </div>

          <a
            data-hero-fade
            href={links.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-crust-deep/80 transition-colors hover:text-crust-deep"
          >
            <MapPin className="size-4 text-golden" aria-hidden />
            {address.street} · {address.district}
            <span className="sr-only"> — abrir no Google Maps (nova aba)</span>
          </a>
        </div>

        <div className="relative lg:col-span-6 lg:col-start-7 lg:self-end">
          {/* Arco inspirado nas vitrines de boulangerie */}
          <figure className="relative mx-auto aspect-[4/5] w-full max-w-[34rem] overflow-hidden rounded-t-[999px] rounded-b-3xl bg-cream shadow-2xl shadow-crust/20 lg:mb-0 lg:aspect-[4/5.4] lg:max-w-none lg:rounded-b-none">
            <Image
              data-hero-image
              src={croissant}
              alt="Croissant da casa cortado ao meio, com o miolo em camadas e alvéolos de massa folhada"
              fill
              loading="eager"
              fetchPriority="high"
              quality={85}
              sizes="(min-width: 1024px) 83vw, (min-width: 640px) 57rem, 167vw"
              className="object-cover object-center will-change-transform"
              placeholder="blur"
            />
            <figcaption className="absolute bottom-5 left-5 rounded-full bg-flour/90 px-4 py-2 text-xs font-semibold text-crust-deep backdrop-blur lg:bottom-8 lg:left-8">
              Croissant · manteiga francesa
            </figcaption>
          </figure>

          <div
            data-hero-float
            className="absolute -left-4 top-6 hidden size-36 overflow-hidden rounded-full border-[6px] border-flour shadow-xl shadow-crust/25 sm:block lg:-left-16 lg:top-[22%] lg:size-44"
          >
            <Image src={pastelNata} alt="Pastel de nata caramelizado" fill sizes="176px" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
