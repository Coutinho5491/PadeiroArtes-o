import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  align = "left",
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal as="header" className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="display mt-4 text-[clamp(2.4rem,5.5vw,4.5rem)] text-crust-deep">
        {title}
      </h2>
      {intro && <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted [text-wrap:pretty]">{intro}</p>}
    </Reveal>
  );
}
