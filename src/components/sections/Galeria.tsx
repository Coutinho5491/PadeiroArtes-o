"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gallery } from "@/data/gallery";
import { setScrollLocked } from "@/lib/scroll-lock";

export function Galeria() {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const [index, setIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);

  const open = (i: number, button: HTMLButtonElement) => {
    opener.current = button;
    setDirection(1);
    setIndex(i);
    setScrollLocked(true);
    dialog.current?.showModal();
  };

  const close = useCallback(() => dialog.current?.close(), []);

  const go = useCallback((step: number) => {
    setDirection(step);
    setIndex((i) => (i === null ? i : (i + step + gallery.length) % gallery.length));
  }, []);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onClose = () => {
      setScrollLocked(false);
      setIndex(null);
      opener.current?.focus();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    d.addEventListener("close", onClose);
    d.addEventListener("keydown", onKey);
    return () => {
      d.removeEventListener("close", onClose);
      d.removeEventListener("keydown", onKey);
    };
  }, [go]);

  const current = index === null ? null : gallery[index];

  return (
    <section id="galeria" aria-labelledby="galeria-title" className="scroll-mt-16 bg-flour py-24 lg:py-36">
      <div className="container-page">
        <SectionHeading
          id="galeria-title"
          eyebrow="Galeria"
          title={
            <>
              Feito à mão, <em>fotografado de perto</em>.
            </>
          }
          intro="Fotos dos produtos publicadas pela própria casa. Toque em uma imagem para ampliar."
        />

        <ul className="mt-14 columns-2 gap-3 sm:gap-5 lg:columns-4">
          {gallery.map((g, i) => (
            <motion.li
              key={g.caption}
              className="mb-3 break-inside-avoid sm:mb-5"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: (i % 4) * 0.06 }}
            >
              <button
                type="button"
                onClick={(e) => open(i, e.currentTarget)}
                className="group relative block w-full overflow-hidden rounded-2xl bg-cream text-left sm:rounded-3xl"
                aria-label={`Ampliar foto: ${g.caption}`}
              >
                <Image
                  src={g.src}
                  alt={g.alt}
                  placeholder="blur"
                  sizes="(min-width: 1024px) 22vw, 50vw"
                  className="h-auto w-full transition-transform duration-[900ms] ease-[var(--ease-bake)] group-hover:scale-[1.06]"
                />
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-ink/70 to-transparent p-3 pt-10 text-xs font-semibold text-flour opacity-100 transition-opacity duration-300 sm:p-4 sm:text-sm lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100">
                  {g.caption}
                  <Expand className="size-4 shrink-0" aria-hidden />
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialog}
        aria-label={current ? `Foto ampliada: ${current.caption}` : "Foto ampliada"}
        className="m-auto h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-flour"
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        {current && index !== null && (
          <div className="flex h-full flex-col items-center justify-center gap-4 p-4 sm:p-10" onClick={(e) => e.target === e.currentTarget && close()}>
            <div className="relative flex w-full max-w-5xl flex-1 items-center justify-center overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                <motion.div
                  key={index}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -60 }}
                  transition={{ type: "spring", stiffness: 260, damping: 30 }}
                  className="relative h-full max-h-[78dvh] w-full"
                >
                  <Image
                    src={current.src}
                    alt={current.alt}
                    fill
                    loading="eager"
                    placeholder="blur"
                    sizes="(min-width: 1024px) 64rem, 100vw"
                    quality={85}
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <div aria-hidden className="hidden">
              {[1, -1].map((step) => {
                const n = gallery[(index + step + gallery.length) % gallery.length];
                return <Image key={step} src={n.src} alt="" loading="eager" sizes="(min-width: 1024px) 64rem, 100vw" quality={85} />;
              })}
            </div>
            <div className="flex w-full max-w-5xl items-center justify-between gap-4">
              <p className="font-display text-xl">
                {current.caption}
                <span className="ml-3 font-sans text-sm text-flour/60">
                  {index + 1} / {gallery.length}
                </span>
              </p>
              <div className="flex gap-2">
                <button type="button" onClick={() => go(-1)} aria-label="Foto anterior" className="grid size-12 place-items-center rounded-full bg-flour/10 hover:bg-flour/20">
                  <ChevronLeft className="size-5" aria-hidden />
                </button>
                <button type="button" onClick={() => go(1)} aria-label="Próxima foto" className="grid size-12 place-items-center rounded-full bg-flour/10 hover:bg-flour/20">
                  <ChevronRight className="size-5" aria-hidden />
                </button>
                <button type="button" onClick={close} aria-label="Fechar" className="grid size-12 place-items-center rounded-full bg-flour text-ink hover:bg-cream" autoFocus>
                  <X className="size-5" aria-hidden />
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
