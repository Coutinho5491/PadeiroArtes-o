"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";
import baguete from "@/assets/photos/baguete.jpg";
import cinnamon from "@/assets/photos/cinnamon-roll.jpg";
import ovoCrispy from "@/assets/photos/ovo-crispy.jpg";
import paoBatata from "@/assets/photos/pao-batata-frango.jpg";
import { MQ_MOTION, MQ_RICH, gsap, useGSAP } from "@/lib/gsap";

type Frame = { image: StaticImageData; alt: string; kicker: string; title: string; text: string; product: string };

// Textos sensoriais baseados apenas no que as fotos mostram e nas descrições do cardápio.
const frames: Frame[] = [
  {
    image: baguete,
    alt: "Baguete com a casca dourada e pestanas abertas ao lado de uma metade com miolo alveolado",
    kicker: "Casca",
    title: "Fina, dourada, e estala no primeiro corte.",
    text: "Fermentação longa e farinha francesa: a baguete chega à mesa com miolo aberto e macio, pronta para manteiga, azeite ou geleia.",
    product: "Baguete Francesa",
  },
  {
    image: cinnamon,
    alt: "Cinnamon roll em espiral, polvilhado com açúcar de confeiteiro e açúcar perolado",
    kicker: "Espiral",
    title: "Camadas de massa enroladas em canela.",
    text: "Feito com a mesma massa do croissant, leve, e finalizado com açúcar de confeiteiro e açúcar perolado.",
    product: "Cinnamon Roll",
  },
  {
    image: ovoCrispy,
    alt: "Tigela com ovos cremosos, bacon crocante, tomates confit e fatias de pão de fermentação natural",
    kicker: "Manhã",
    title: "Ovos cremosos, pão do dia, tomate confit.",
    text: "O Ovo crispy reúne bacon crocante e uma seleção dos pães artesanais do dia — o café da manhã que pede calma.",
    product: "Ovo crispy",
  },
  {
    image: paoBatata,
    alt: "Pão de batata aberto, recheado com frango e requeijão",
    kicker: "Recheio",
    title: "Macio por dentro, generoso no recheio.",
    text: "Feito com muita batata na massa, recheado com frango e requeijão.",
    product: "Pão de batata com frango e requeijão!",
  },
];

export function Sensorial() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: seção fixada; fotos e textos se alternam conforme o scroll.
      mm.add(MQ_RICH, () => {
        const images = gsap.utils.toArray<HTMLElement>("[data-s-image]");
        const texts = gsap.utils.toArray<HTMLElement>("[data-s-text]");
        const dots = gsap.utils.toArray<HTMLElement>("[data-s-dot]");
        gsap.set(images.slice(1), { autoAlpha: 0 });
        gsap.set(texts.slice(1), { autoAlpha: 0, y: 40 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: "[data-s-stage]",
            start: "top top",
            end: () => `+=${window.innerHeight * (frames.length - 0.5)}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
          },
        });

        images.forEach((img, i) => {
          tl.fromTo(img.querySelector("img"), { scale: 1.18 }, { scale: 1, duration: 1, ease: "none" }, i);
          if (i === 0) return;
          tl.to(images[i - 1], { autoAlpha: 0, duration: 0.35 }, i - 0.2)
            .to(img, { autoAlpha: 1, duration: 0.35 }, i - 0.2)
            .to(texts[i - 1], { autoAlpha: 0, y: -40, duration: 0.3 }, i - 0.25)
            .to(texts[i], { autoAlpha: 1, y: 0, duration: 0.3 }, i - 0.05)
            .to(dots[i], { scaleX: 1, duration: 0.3 }, i - 0.2);
        });
      });

      // Celular/tablet: zoom controlado em cada foto enquanto atravessa a tela.
      mm.add(`${MQ_MOTION} and (max-width: 1023px)`, () => {
        gsap.utils.toArray<HTMLElement>("[data-s-mobile] img").forEach((img) => {
          gsap.fromTo(
            img,
            { scale: 1.15 },
            { scale: 1, ease: "none", scrollTrigger: { trigger: img, start: "top bottom", end: "bottom 40%", scrub: true } },
          );
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="sensorial-title" className="grain bg-cream">
      <h2 id="sensorial-title" className="sr-only">
        Detalhes dos nossos pães e doces
      </h2>

      {/* Desktop: texto à esquerda, foto emoldurada à direita */}
      <div data-s-stage className="relative hidden h-[100svh] lg:block">
        <div className="container-page grid h-full grid-cols-12 items-center gap-10">
          <div className="relative col-span-5 h-[24rem]">
            {frames.map((f) => (
              <div key={f.product} data-s-text className="absolute inset-0">
                <p className="eyebrow">{f.kicker}</p>
                <p className="display mt-5 text-[clamp(2.8rem,4.4vw,4.4rem)] text-crust-deep">{f.title}</p>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{f.text}</p>
                <p className="mt-6 text-sm font-semibold text-crust">Na foto: {f.product}</p>
              </div>
            ))}
            <div className="absolute -bottom-16 left-0 flex gap-2" aria-hidden>
              {frames.map((f, i) => (
                <span key={f.product} className="h-[3px] w-12 overflow-hidden rounded-full bg-crust/15">
                  <span data-s-dot className={`block h-full origin-left bg-golden ${i === 0 ? "" : "scale-x-0"}`} />
                </span>
              ))}
            </div>
          </div>

          <div className="relative col-span-7 h-[78svh] overflow-hidden rounded-[2rem] bg-oat shadow-2xl shadow-crust/15">
            {frames.map((f) => (
              <div key={f.product} data-s-image className="absolute inset-0">
                <Image
                  src={f.image}
                  alt={f.alt}
                  fill
                  sizes="(min-width: 1344px) 990px, 73vw"
                  quality={85}
                  placeholder="blur"
                  className="object-cover will-change-transform"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Celular e tablet */}
      <div data-s-mobile className="container-page flex flex-col gap-16 py-20 lg:hidden">
        {frames.map((f) => (
          <figure key={f.product}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[4/3]">
              <Image src={f.image} alt={f.alt} fill sizes="(min-width: 640px) 90vw, 167vw" placeholder="blur" className="object-cover" />
            </div>
            <figcaption className="mt-6">
              <p className="eyebrow">{f.kicker}</p>
              <p className="display mt-3 text-4xl text-crust-deep">{f.title}</p>
              <p className="mt-4 leading-relaxed text-muted">{f.text}</p>
              <p className="mt-3 text-sm font-semibold text-crust">Na foto: {f.product}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
