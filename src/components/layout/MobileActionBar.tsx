"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { MapPin, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { links } from "@/data/site";

/**
 * Barra fixa no celular com as duas ações principais. Aparece depois da
 * primeira dobra para não competir com os botões do hero.
 */
export function MobileActionBar() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > window.innerHeight * 0.85));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "120%" }}
          animate={{ y: 0 }}
          exit={{ y: "120%" }}
          transition={{ type: "spring", stiffness: 300, damping: 32 }}
          className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-2 gap-1.5 whitespace-nowrap rounded-full bg-ink/95 p-1.5 shadow-2xl shadow-ink/30 backdrop-blur pb-[calc(0.375rem+env(safe-area-inset-bottom)/2)] lg:hidden"
        >
          <a
            href={links.ifood}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-olive px-3 py-3 text-sm font-bold text-ink active:scale-[0.97] transition-transform"
          >
            <ShoppingBag className="size-4" aria-hidden />
            Pedir no iFood<span className="sr-only"> (abre em nova aba)</span>
          </a>
          <a
            href={links.directions}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full px-3 py-3 text-sm font-bold text-flour active:scale-[0.97] transition-transform"
          >
            <MapPin className="size-4" aria-hidden />
            Como chegar<span className="sr-only"> (abre em nova aba)</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
