import Image from "next/image";
import { MessageCircle, ShoppingBag } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import logoCream from "@/assets/brand/logo-cream.png";
import { address, business, hours, links, nav, whatsappHref } from "@/data/site";

export function Footer() {
  const whatsapp = whatsappHref();

  return (
    <footer className="bg-ink pb-28 pt-20 text-flour/80 lg:pb-12">
      <div className="container-page grid gap-12 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Image src={logoCream} alt="O Padeiro Artesão — Boulangerie & Pâtisserie" width={112} height={112} className="size-28" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed">
            Padaria artesanal de fermentação natural e confeitaria europeia em Vinhedo/SP.
          </p>
        </div>

        <div className="lg:col-span-3">
          <p className="eyebrow text-olive!">Endereço</p>
          <address className="mt-4 text-sm not-italic leading-relaxed">
            {address.street}
            <br />
            {address.district} — {address.city}/{address.state}
            <br />
            CEP {address.postalCode}
          </address>
          <a href={links.directions} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-golden hover:text-flour">
            Como chegar →<span className="sr-only"> (abre em nova aba)</span>
          </a>
        </div>

        <div className="lg:col-span-2">
          <p className="eyebrow text-olive!">Horários</p>
          {hours.status === "confirmed" ? (
            <ul className="mt-4 space-y-1 text-sm">
              {hours.week.map((d) => (
                <li key={d.day}>
                  {d.day}: {d.opens && d.closes ? `${d.opens}–${d.closes}` : "fechado"}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm leading-relaxed">
              Em confirmação.{" "}
              <a href={links.googleMaps} target="_blank" rel="noopener noreferrer" className="font-semibold text-golden hover:text-flour">
                Ver no Google Maps<span className="sr-only"> (abre em nova aba)</span>
              </a>
            </p>
          )}
        </div>

        <nav aria-label="Rodapé" className="lg:col-span-3">
          <p className="eyebrow text-olive!">Navegue</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-flour">
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#pedir" className="hover:text-flour">
                Como pedir
              </a>
            </li>
          </ul>
          <ul className="mt-6 flex flex-wrap gap-2">
            <li>
              <a href={links.ifood} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-flour/10 px-4 py-2 text-sm font-semibold text-flour hover:bg-flour/20">
                <ShoppingBag className="size-4" aria-hidden /> iFood<span className="sr-only"> (abre em nova aba)</span>
              </a>
            </li>
            <li>
              <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-flour/10 px-4 py-2 text-sm font-semibold text-flour hover:bg-flour/20">
                <InstagramIcon className="size-4" aria-hidden /> Instagram<span className="sr-only"> (abre em nova aba)</span>
              </a>
            </li>
            {whatsapp && (
              <li>
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-flour/10 px-4 py-2 text-sm font-semibold text-flour hover:bg-flour/20">
                  <MessageCircle className="size-4" aria-hidden /> WhatsApp<span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>

      <div className="container-page mt-16 flex flex-col gap-3 border-t border-flour/10 pt-8 text-xs text-flour/55 md:flex-row md:justify-between">
        <p>
          © {business.copyrightYear} {business.name}. Pedidos e pagamentos são processados pela plataforma iFood.
        </p>
        <p>
          Fotografias: acervo publicado pela marca.
          {business.proposalMode && " · Proposta de site — informações sujeitas à validação da loja."}
        </p>
      </div>
    </footer>
  );
}
