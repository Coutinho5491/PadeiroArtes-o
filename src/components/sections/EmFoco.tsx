"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import entremet from "@/assets/photos/entremet-citron.jpg";
import macaronLimao from "@/assets/photos/macaron-limao.jpg";
import { CtaLink } from "@/components/ui/CtaLink";
import { categories, formatPrice } from "@/data/products";
import { links } from "@/data/site";
import { MQ_RICH, gsap, useGSAP } from "@/lib/gsap";

const product = categories.find((c) => c.id === "confeitaria")!.featured.find((p) => p.id === "entremet-citron")!;

export function EmFoco() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ_RICH, () => {
        const st = { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true };
        gsap.fromTo("[data-f-photo]", { scale: 1.15 }, { scale: 1, ease: "none", scrollTrigger: st });
        gsap.fromTo("[data-f-back]", { yPercent: 12 }, { yPercent: -12, ease: "none", scrollTrigger: st });
        gsap.fromTo("[data-f-float]", { y: 120 }, { y: -80, ease: "none", scrollTrigger: st });
        gsap.fromTo("[data-f-word]", { xPercent: 8 }, { xPercent: -14, ease: "none", scrollTrigger: st });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="foco-title" className="relative overflow-hidden bg-flour py-24 lg:py-40">
      {/* Palavra de fundo em camada — decorativa */}
      <p
        data-f-word
        aria-hidden
        className="display pointer-events-none absolute -bottom-[0.18em] left-0 whitespace-nowrap text-[22vw] italic leading-none text-cream"
      >
        Pâtisserie
      </p>

      <div className="container-page relative grid items-center gap-14 lg:grid-cols-12">
        <div className="relative lg:col-span-7">
          <div data-f-back aria-hidden className="absolute -inset-x-4 -bottom-8 top-16 rounded-[2.5rem] bg-olive/25 lg:-left-10 lg:right-16" />
          <div className="relative aspect-[1300/1191] overflow-hidden rounded-[2rem] shadow-2xl shadow-crust/20">
            <Image
              data-f-photo
              src={entremet}
              alt={product.imageAlt!}
              fill
              quality={85}
              placeholder="blur"
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover will-change-transform"
            />
          </div>
          <div
            data-f-float
            className="absolute -bottom-10 right-4 hidden w-44 overflow-hidden rounded-2xl border-[6px] border-flour shadow-xl shadow-crust/25 sm:block lg:-right-10 lg:w-56"
          >
            <Image src={macaronLimao} alt="Macarons de limão siciliano" placeholder="blur" sizes="224px" className="h-auto w-full" />
            <p className="bg-flour px-3 pb-1 pt-2 text-xs font-semibold text-crust-deep">Macarons de Limão Siciliano</p>
          </div>
        </div>

        <div className="lg:col-span-5 lg:pl-6">
          <p className="eyebrow">Produto em foco · Confeitaria</p>
          <h2 id="foco-title" className="display mt-5 text-[clamp(2.8rem,5.4vw,5rem)] text-crust-deep">
            Parece um limão. <em className="text-olive-deep">É um entremet.</em>
          </h2>
          <p className="mt-7 text-lg leading-relaxed text-muted">
            O <strong className="font-semibold text-crust-deep">{product.name}</strong> leva mousse de limão e cremoso de
            limão siciliano com manjericão. Leve, cítrico — e daqueles doces que a gente fotografa antes da primeira colherada.
          </p>
          {product.price !== null && (
            <p className="mt-8 flex items-baseline gap-3">
              <span className="display text-4xl text-crust-deep">{formatPrice(product.price)}</span>
              <span className="text-sm text-muted">no iFood</span>
            </p>
          )}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CtaLink href={links.ifood} size="lg" icon={<ShoppingBag className="size-5" aria-hidden />}>
              Pedir o Entremet citron
            </CtaLink>
            <CtaLink href="#produtos-confeitaria" size="lg" variant="secondary" icon={<ArrowRight className="size-4" aria-hidden />}>
              Ver a confeitaria
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
