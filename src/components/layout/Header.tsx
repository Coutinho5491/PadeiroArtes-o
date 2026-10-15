"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/brand/logo.png";
import { CtaLink } from "@/components/ui/CtaLink";
import { links, nav } from "@/data/site";
import { setScrollLocked } from "@/lib/scroll-lock";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Menu móvel: trava o scroll, foca o primeiro link e fecha com Esc.
  useEffect(() => {
    if (!open) return;
    const button = menuButton.current;
    setScrollLocked(true);
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      setScrollLocked(false);
      window.removeEventListener("keydown", onKey);
      button?.focus();
    };
  }, [open]);

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-flour"
      >
        Pular para o conteúdo
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          scrolled || open ? "bg-flour/90 shadow-[0_1px_0_var(--color-oat)] backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <motion.div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[3px] origin-left bg-golden"
          style={{ scaleX: progress }}
        />
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
          <a href="#inicio" className="flex shrink-0 items-center gap-3" aria-label="O Padeiro Artesão — início">
            <Image src={logo} alt="" width={56} height={56} className="size-12 lg:size-14" preload />
            <span className="hidden font-display text-lg leading-none text-olive-ink sm:block xl:hidden">O Padeiro Artesão</span>
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="relative rounded-full px-4 py-2 text-sm font-semibold text-crust-deep/80 transition-colors hover:text-crust-deep after:absolute after:inset-x-4 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-golden after:transition-transform after:duration-300 hover:after:scale-x-100"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <CtaLink href={links.ifood} icon={<ShoppingBag className="size-4" aria-hidden />} className="hidden sm:inline-flex">
              Fazer pedido
            </CtaLink>
            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-movel"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="grid size-11 place-items-center rounded-full border border-crust-deep/15 text-crust-deep transition-colors hover:bg-cream lg:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "x" : "m"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              id="menu-movel"
              aria-label="Menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "calc(100dvh - 4.5rem)" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden bg-flour lg:hidden"
            >
              <motion.ul
                className="container-page flex flex-col gap-1 pt-8"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
              >
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                    className="border-b border-oat"
                  >
                    <a
                      ref={i === 0 ? firstLink : undefined}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="display block py-4 text-4xl text-crust-deep"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
                <motion.li variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} className="pt-8">
                  <CtaLink href={links.ifood} size="lg" className="w-full" icon={<ShoppingBag className="size-5" aria-hidden />}>
                    Fazer meu pedido no iFood
                  </CtaLink>
                </motion.li>
              </motion.ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
