import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { CtaLink } from "@/components/ui/CtaLink";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { links } from "@/data/site";

const steps = [
  { n: "01", title: "Explore os produtos", text: "Veja pães, viennoiserie, confeitaria e brunch aqui no site." },
  { n: "02", title: "Abra o cardápio", text: "O botão leva direto à página oficial do O Padeiro Artesão no iFood." },
  { n: "03", title: "Finalize no iFood", text: "Escolha os itens e conclua o pedido e o pagamento na plataforma." },
];

export function ComoPedir() {
  return (
    <section id="pedir" aria-labelledby="pedir-title" className="scroll-mt-16 bg-flour pb-24 lg:pb-36">
      <div className="container-page">
        <div className="grain overflow-hidden rounded-[2.5rem] bg-olive-deep px-6 py-16 text-flour sm:px-12 lg:px-20 lg:py-24">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <p className="eyebrow text-olive!">Como pedir</p>
              <h2 id="pedir-title" className="display mt-4 text-[clamp(2.6rem,5.6vw,4.8rem)]">
                Da vitrine para casa <em className="text-golden">em três passos</em>.
              </h2>
            </div>
            <div className="flex flex-col gap-4 lg:col-span-5 lg:col-start-8">
              <CtaLink href={links.ifood} variant="light" size="lg" icon={<ShoppingBag className="size-5" aria-hidden />}>
                Abrir o cardápio no iFood
              </CtaLink>
              <p className="text-sm leading-relaxed text-flour/70">
                Pedido mínimo, taxa de entrega, prazo, área atendida e formas de pagamento são informados pelo iFood no
                momento do pedido.
              </p>
            </div>
          </div>

          <RevealGroup className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-flour/15 md:grid-cols-3">
            {steps.map((s) => (
              <RevealItem key={s.n} className="bg-olive-deep p-7 lg:p-9">
                <p className="font-display text-5xl text-golden">{s.n}</p>
                <p className="mt-6 font-display text-2xl">{s.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-flour/75">{s.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <a
            href="#visite"
            className="mt-10 inline-flex items-center gap-1.5 text-sm font-bold text-flour/85 underline-offset-4 hover:text-flour hover:underline"
          >
            Prefere escolher pessoalmente? Visite a loja <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
