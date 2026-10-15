"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { CtaLink } from "@/components/ui/CtaLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { categories, formatPrice, priceUpdatedAt, type Product } from "@/data/products";
import { links } from "@/data/site";

const HASH_PREFIX = "#produtos-";

export function Vitrine() {
  const [active, setActive] = useState(categories[0].id);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const category = categories.find((c) => c.id === active) ?? categories[0];

  // Permite links diretos para uma aba, ex.: #produtos-confeitaria
  const syncFromHash = useCallback(() => {
    const id = window.location.hash.startsWith(HASH_PREFIX) ? window.location.hash.slice(HASH_PREFIX.length) : null;
    if (id && categories.some((c) => c.id === id)) {
      setActive(id);
      document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(syncFromHash);
    window.addEventListener("hashchange", syncFromHash);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, [syncFromHash]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = categories.length - 1;
    const next =
      e.key === "ArrowRight" ? (index === last ? 0 : index + 1)
      : e.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    setActive(categories[next].id);
    tabs.current[next]?.focus();
    tabs.current[next]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  };

  return (
    <section id="produtos" aria-labelledby="produtos-title" className="scroll-mt-16 bg-flour py-24 lg:py-36">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="produtos-title"
            eyebrow="A vitrine"
            title={
              <>
                Do forno para <em>a sua mesa</em>.
              </>
            }
            intro="Uma seleção do cardápio real da casa: pães de fermentação natural, viennoiserie, confeitaria francesa, brunch e salgados."
          />
          <CtaLink href={links.ifood} variant="secondary" icon={<ArrowUpRight className="size-4" aria-hidden />} className="self-start lg:self-auto">
            Ver cardápio completo no iFood
          </CtaLink>
        </div>

        <div
          role="tablist"
          aria-label="Categorias de produtos"
          className="snap-row -mx-5 mt-14 gap-2! border-b border-oat px-5 md:mx-0 md:px-0"
        >
          {categories.map((c, i) => {
            const selected = c.id === active;
            return (
              <button
                key={c.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`tab-${c.id}`}
                aria-selected={selected}
                aria-controls={`painel-${c.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(c.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`relative shrink-0 whitespace-nowrap px-4 pb-4 pt-2 text-sm font-semibold transition-colors ${
                  selected ? "text-crust-deep" : "text-muted hover:text-crust-deep"
                }`}
              >
                {c.label}
                {selected && (
                  <motion.span layoutId="tab-underline" className="absolute inset-x-3 -bottom-px h-[3px] rounded-full bg-olive-deep" />
                )}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={category.id}
            role="tabpanel"
            id={`painel-${category.id}`}
            aria-labelledby={`tab-${category.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="mt-10"
          >
            <p className="max-w-2xl text-muted">{category.intro}</p>

            <motion.ul
              className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-6"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
            >
              {category.featured.map((p, i) => (
                <motion.li
                  key={p.id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className={i === 0 ? "sm:col-span-2 lg:col-span-4 lg:row-span-2" : "lg:col-span-2"}
                >
                  <ProductCard product={p} big={i === 0} />
                </motion.li>
              ))}
            </motion.ul>

            {category.more.length > 0 && (
              <div className="mt-20 grid gap-10 rounded-[2rem] bg-cream p-7 md:p-12 lg:grid-cols-3">
                <div>
                  <p className="eyebrow">Também no cardápio</p>
                  <p className="display mt-3 text-3xl text-crust-deep">{category.label}</p>
                </div>
                <ul className="lg:col-span-2">
                  {category.more.map((p) => (
                    <li key={p.id} className="flex items-baseline gap-4 border-b border-oat py-4 last:border-0">
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-crust-deep">{p.name}</p>
                        <p className="mt-1 text-sm text-muted">
                          {p.description}
                          {p.serves && <span className="text-crust"> · {p.serves}</span>}
                        </p>
                      </div>
                      <span aria-hidden className="hidden flex-1 border-b border-dotted border-crust/30 sm:block" />
                      {p.price !== null && <span className="shrink-0 font-semibold tabular-nums text-crust-deep">{formatPrice(p.price)}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <p className="mt-12 text-xs leading-relaxed text-muted">
          Preços do cardápio oficial no iFood em {priceUpdatedAt}, sujeitos a alteração. Disponibilidade, taxas e prazos são
          informados pelo iFood no momento do pedido.
        </p>
      </div>
    </section>
  );
}

function ProductCard({ product, big }: { product: Product; big?: boolean }) {
  const media = (
    <div className={`relative overflow-hidden rounded-3xl bg-cream ${big ? "aspect-[4/3] lg:aspect-[5/4]" : "aspect-[4/3]"}`}>
      {product.image && (
        <Image
          src={product.image}
          alt={product.imageAlt ?? product.name}
          fill
          placeholder="blur"
          sizes={big ? "(min-width: 1024px) 56vw, 100vw" : "(min-width: 1024px) 26vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-[900ms] ease-[var(--ease-bake)] group-hover/card:scale-[1.05]"
        />
      )}
    </div>
  );

  return (
    <article className="group/card flex h-full flex-col">
      {big ? <TiltCard>{media}</TiltCard> : media}
      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <h3 className={`font-display leading-tight text-crust-deep ${big ? "text-3xl lg:text-4xl" : "text-xl"}`}>{product.name}</h3>
          {product.price !== null && (
            <p className="shrink-0 pt-1 font-semibold tabular-nums text-crust">{formatPrice(product.price)}</p>
          )}
        </div>
        <p className={`mt-2 leading-relaxed text-muted ${big ? "max-w-lg text-base" : "text-sm"}`}>{product.description}</p>
        <a
          href={links.ifood}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 self-start rounded-full text-sm font-bold text-olive-deep transition-colors hover:text-olive-ink"
        >
          <ShoppingBag className="size-4" aria-hidden />
          Pedir no iFood
          <span className="sr-only">: {product.name} (abre em nova aba)</span>
          <ArrowUpRight className="size-3.5 transition-transform group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5" aria-hidden />
        </a>
      </div>
    </article>
  );
}
