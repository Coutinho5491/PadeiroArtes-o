"use client";

import { motion } from "motion/react";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "light" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-olive-deep text-flour shadow-lg shadow-olive-deep/20 hover:bg-olive-ink",
  secondary:
    "border border-crust-deep/25 text-crust-deep hover:border-crust-deep hover:bg-crust-deep hover:text-flour",
  light: "bg-flour text-olive-ink hover:bg-cream",
  ghost: "text-crust-deep underline decoration-golden/60 decoration-2 underline-offset-[6px] hover:decoration-crust-deep px-0!",
};

type Props = Omit<ComponentProps<typeof motion.a>, "children"> & {
  href: string;
  variant?: Variant;
  icon?: ReactNode;
  external?: boolean;
  children: ReactNode;
  size?: "md" | "lg";
};

/**
 * Link com aparência de botão. Links externos abrem em nova aba e anunciam isso
 * a leitores de tela.
 */
export function CtaLink({ href, variant = "primary", icon, external, children, className = "", size = "md", ...rest }: Props) {
  const isExternal = external ?? /^https?:\/\//.test(href);
  return (
    <motion.a
      href={href}
      whileTap={{ scale: 0.97 }}
      whileHover={variant === "ghost" ? undefined : { y: -2 }}
      transition={{ type: "spring", stiffness: 420, damping: 26 }}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-semibold tracking-[0.01em] transition-colors duration-300 ${
        size === "lg" ? "px-7 py-4 text-base" : "px-5 py-3 text-sm"
      } ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
      {icon && <span className="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
      {isExternal && <span className="sr-only"> (abre em nova aba)</span>}
    </motion.a>
  );
}
