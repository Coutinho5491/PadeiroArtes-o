"use client";

import Image from "next/image";
import { animate, useInView, useReducedMotion } from "motion/react";
import { ArrowUpRight, Newspaper } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import chef from "@/assets/photos/chef-fernando.jpg";
import processo from "@/assets/photos/processo-alecrim.jpg";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { business, links } from "@/data/site";

/** Países citados pelo chef em publicação do Instagram (12/10/2026). */
const countries = ["França", "Alemanha", "Bélgica", "Itália", "Argentina", "Uruguai", "Japão"];

/** Fundamentos citados nas descrições do próprio cardápio. */
const craft = [
  { title: "Levain", text: "Fermento natural nos pães de fermentação longa, como o Pão 100% Fermentação natural." },
  { title: "Farinhas italianas", text: "Incluindo farinha orgânica e a macinata a pietra, moída em pedra, no pão integral." },
  { title: "Manteiga francesa", text: "Base do croissant, do pastel de nata e da massa folhada da casa." },
  { title: "Receitas autorais", text: `Do pão caseiro de família às receitas do chef ${business.chef.name}.` },
];

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, { duration: 1.4, ease: "easeOut", onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return <span ref={ref}>{value}</span>;
}

export function Historia() {
  return (
    <section id="historia" aria-labelledby="historia-title" className="grain scroll-mt-16 bg-cream py-24 lg:py-36">
      <div className="container-page grid gap-16 lg:grid-cols-12 lg:gap-10">
        {/* Fotos */}
        <div className="relative lg:col-span-5">
          <Reveal className="relative mx-auto max-w-[26rem] lg:sticky lg:top-28">
            <figure>
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-3xl bg-oat shadow-2xl shadow-crust/15">
                <Image
                  src={chef}
                  alt={`Chef ${business.chef.name} sorrindo enquanto segura uma fatia grande de pão com miolo alveolado`}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 416px, 90vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 text-sm text-muted">
                Chef {business.chef.name} —{" "}
                <a href={business.chef.instagram} target="_blank" rel="noopener noreferrer" className="font-semibold text-crust underline-offset-4 hover:underline">
                  @cheffernandodeoliveira<span className="sr-only"> (abre em nova aba)</span>
                </a>
              </figcaption>
            </figure>
            <figure className="absolute -right-2 top-1/3 w-32 overflow-hidden rounded-2xl border-[6px] border-cream shadow-xl shadow-crust/20 sm:-right-12 sm:w-40">
              <Image src={processo} alt="Mãos modelando a massa do pão com alecrim e queijo" placeholder="blur" sizes="160px" className="h-auto w-full" />
            </figure>
          </Reveal>
        </div>

        {/* Texto */}
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="eyebrow">A experiência do Padeiro Artesão</p>
            <h2 id="historia-title" className="display mt-5 text-[clamp(2.6rem,5.4vw,4.8rem)] text-crust-deep">
              “O pão me levou <em className="text-olive-deep">pelo mundo</em>.”
            </h2>
            <p className="mt-4 text-sm font-semibold text-crust">Chef {business.chef.name}, no Instagram da casa</p>
          </Reveal>

          <Reveal className="mt-10 space-y-5 text-lg leading-relaxed text-muted [text-wrap:pretty]">
            <p>
              Em cada viagem, o chef trouxe aprendizados, sabores e histórias que hoje fazem parte do trabalho do O Padeiro
              Artesão — uma padaria artesanal especializada em pães de fermentação natural e confeitaria europeia, em Nova
              Vinhedo.
            </p>
            <p>
              Por aqui, o pão também vira arte: a casa já recebeu uma exposição de esculturas de pães do chef, numa tarde de
              música ao vivo e café especial.
            </p>
          </Reveal>

          {/* Rota */}
          <Reveal className="mt-12 rounded-3xl border border-oat bg-flour/70 p-7">
            <div className="flex items-baseline gap-4">
              <p className="display text-6xl text-olive-deep">
                <Counter to={countries.length} />
              </p>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-crust">países na bagagem do chef</p>
            </div>
            <ol className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-crust-deep" aria-label="Países visitados">
              {countries.map((c, i) => (
                <li key={c} className="flex items-center gap-3">
                  <span className="font-display text-xl">{c}</span>
                  {i < countries.length - 1 && <span aria-hidden className="size-1.5 rounded-full bg-golden" />}
                </li>
              ))}
            </ol>
          </Reveal>

          {/* Fundamentos */}
          <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-oat bg-oat sm:grid-cols-2">
            {craft.map((c) => (
              <RevealItem key={c.title} className="bg-cream p-6">
                <p className="font-display text-2xl text-crust-deep">{c.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* Imprensa */}
          <Reveal className="mt-12 flex flex-col gap-5 rounded-3xl bg-crust-deep p-7 text-flour sm:flex-row sm:items-center">
            <span className="grid size-14 shrink-0 place-items-center rounded-full bg-flour/10">
              <Newspaper className="size-6 text-golden" aria-hidden />
            </span>
            <div className="flex-1">
              <p className="font-display text-2xl">Na VEJA Gastronomia</p>
              <p className="mt-1 text-sm leading-relaxed text-flour/75">
                O trabalho da casa aparece em matéria sobre a panificação brasileira indo além do trigo, com ingredientes
                nacionais (setembro de 2026).
              </p>
            </div>
            <a
              href="https://www.instagram.com/opadeiroartesao/reel/Ddd2oa_h_1N/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-golden hover:text-flour"
            >
              Ver publicação <ArrowUpRight className="size-4" aria-hidden />
              <span className="sr-only"> (Instagram, abre em nova aba)</span>
            </a>
          </Reveal>

          <p className="mt-8 text-sm text-muted">
            Acompanhe a agenda de eventos em{" "}
            <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="font-semibold text-crust underline underline-offset-4">
              {links.instagramHandle}<span className="sr-only"> (abre em nova aba)</span>
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
