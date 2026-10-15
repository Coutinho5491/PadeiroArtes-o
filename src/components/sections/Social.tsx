import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import chef from "@/assets/photos/chef-fernando.jpg";
import cinnamon from "@/assets/photos/cinnamon-roll.jpg";
import croissantChocolate from "@/assets/photos/croissant-chocolate.jpg";
import ovoCrispy from "@/assets/photos/ovo-crispy.jpg";
import processo from "@/assets/photos/processo-alecrim.jpg";
import entremet from "@/assets/photos/entremet-citron.jpg";
import { CtaLink } from "@/components/ui/CtaLink";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { links } from "@/data/site";

// Imagens do acervo da marca (não é um feed ao vivo do Instagram).
const tiles = [
  { src: processo, alt: "Mãos modelando pão com alecrim e queijo" },
  { src: entremet, alt: "Entremet citron" },
  { src: cinnamon, alt: "Cinnamon roll" },
  { src: chef, alt: "Chef Fernando de Oliveira com uma fatia de pão" },
  { src: ovoCrispy, alt: "Ovo crispy com pães do dia" },
  { src: croissantChocolate, alt: "Croissant recheado com creme de chocolate" },
];

export function Social() {
  return (
    <section id="instagram" aria-labelledby="instagram-title" className="overflow-hidden bg-flour py-24 lg:py-32">
      <div className="container-page flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="eyebrow flex items-center gap-2">
            <InstagramIcon className="size-4" aria-hidden /> No Instagram
          </p>
          <h2 id="instagram-title" className="display mt-4 text-[clamp(2.4rem,6.5vw,5.6rem)] text-crust-deep">
            {links.instagramHandle}
          </h2>
          <p className="mt-4 max-w-md text-muted">
            Fornadas do dia, novidades do cardápio, eventos e os bastidores da produção — mais de 27 mil pessoas já
            acompanham.
          </p>
        </div>
        <CtaLink href={links.instagram} size="lg" variant="secondary" icon={<ArrowUpRight className="size-4" aria-hidden />}>
          Seguir no Instagram
        </CtaLink>
      </div>

      <RevealGroup className="container-page mt-12 grid grid-cols-3 gap-2 sm:gap-4 lg:grid-cols-6" stagger={0.06}>
        {tiles.map((t, i) => (
          <RevealItem key={t.alt} className={i % 2 ? "lg:translate-y-10" : ""}>
            <a
              href={links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden rounded-xl bg-cream sm:rounded-2xl"
            >
              <Image
                src={t.src}
                alt={t.alt}
                fill
                                placeholder="blur"
                sizes="(min-width: 1024px) 20vw, 44vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 grid place-items-center bg-olive-ink/0 transition-colors duration-300 group-hover:bg-olive-ink/40">
                <InstagramIcon className="size-6 text-flour opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
              </span>
              <span className="sr-only">Ver perfil no Instagram (abre em nova aba)</span>
            </a>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
