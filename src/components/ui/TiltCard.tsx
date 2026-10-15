"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useState, type PointerEvent, type ReactNode } from "react";

/**
 * Inclinação 3D sutil (máx. 5°) com luz que acompanha o cursor.
 * Só reage a mouse/caneta — em telas de toque, nada acontece.
 */
export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [5, -5]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-5, 5]), { stiffness: 200, damping: 20 });
  const light = useTransform(
    [x, y] as const,
    ([lx, ly]: number[]) => `radial-gradient(circle at ${lx * 100}% ${ly * 100}%, rgb(255 248 230 / 0.28), transparent 55%)`,
  );

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch" || reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  };

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerEnter={(e) => e.pointerType !== "touch" && setHovering(true)}
      onPointerLeave={() => {
        setHovering(false);
        x.set(0.5);
        y.set(0.5);
      }}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
      className={`relative ${className}`}
    >
      {children}
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300"
          style={{ background: light, opacity: hovering ? 1 : 0 }}
        />
      )}
    </motion.div>
  );
}
