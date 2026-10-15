"use client";

import { Clock, Copy, MapPin, Navigation, Phone } from "lucide-react";
import { useState } from "react";
import { CtaLink } from "@/components/ui/CtaLink";
import { Reveal } from "@/components/ui/Reveal";
import { useToast } from "@/components/ui/Toast";
import { address, contact, hours, links } from "@/data/site";

export function Visite() {
  const toast = useToast();
  const [mapLoaded, setMapLoaded] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address.full);
      toast("Endereço copiado");
    } catch {
      toast("Não foi possível copiar o endereço", "error");
    }
  };

  return (
    <section id="visite" aria-labelledby="visite-title" className="grain scroll-mt-16 bg-cream py-24 lg:py-36">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">Visite a loja</p>
          <h2 id="visite-title" className="display mt-4 text-[clamp(2.6rem,5.4vw,4.6rem)] text-crust-deep">
            Venha nos visitar em <em className="text-olive-deep">Nova Vinhedo</em>.
          </h2>

          <address className="mt-10 not-italic">
            <p className="flex items-start gap-3 text-lg text-crust-deep">
              <MapPin className="mt-1 size-5 shrink-0 text-golden" aria-hidden />
              <span>
                {address.street}
                <br />
                {address.district}, {address.city}/{address.state}
                <br />
                CEP {address.postalCode}
              </span>
            </p>
            {contact.status === "confirmed" && contact.phone && (
              <p className="mt-4 flex items-center gap-3 text-lg text-crust-deep">
                <Phone className="size-5 shrink-0 text-golden" aria-hidden />
                <a href={`tel:${contact.phone.replace(/\D/g, "")}`} className="hover:underline">
                  {contact.phone}
                </a>
              </p>
            )}
          </address>

          <div className="mt-8 flex flex-wrap gap-3">
            <CtaLink href={links.directions} size="lg" icon={<Navigation className="size-4" aria-hidden />}>
              Como chegar
            </CtaLink>
            <button
              type="button"
              onClick={copyAddress}
              className="inline-flex items-center gap-2 rounded-full border border-crust-deep/25 px-5 py-3 text-sm font-semibold text-crust-deep transition-colors hover:border-crust-deep active:scale-[0.97]"
            >
              <Copy className="size-4" aria-hidden />
              Copiar endereço
            </button>
          </div>

          <div className="mt-12 rounded-3xl border border-oat bg-flour p-6">
            <p className="flex items-center gap-2 font-display text-2xl text-crust-deep">
              <Clock className="size-5 text-golden" aria-hidden />
              Horário de funcionamento
            </p>
            {hours.status === "confirmed" ? (
              <dl className="mt-4 divide-y divide-oat">
                {hours.week.map((d) => (
                  <div key={d.day} className="flex justify-between py-2 text-sm">
                    <dt className="font-semibold text-crust-deep">{d.day}</dt>
                    <dd className="tabular-nums text-muted">{d.opens && d.closes ? `${d.opens} – ${d.closes}` : "Fechado"}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <>
                <p className="mt-3 text-sm leading-relaxed text-muted">{hours.note}</p>
                <a
                  href={links.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-olive-deep hover:text-olive-ink"
                >
                  Ver horário de hoje no Google Maps<span className="sr-only"> (abre em nova aba)</span> →
                </a>
              </>
            )}
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.1}>
          <div className="relative h-[24rem] overflow-hidden rounded-[2rem] bg-oat shadow-xl shadow-crust/10 sm:h-[32rem] lg:h-full lg:min-h-[36rem]">
            {!mapLoaded && (
              <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-oat to-cream" aria-hidden>
                <MapPin className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 text-crust/30" />
              </div>
            )}
            <iframe
              src={links.mapEmbed}
              title="Mapa: localização do O Padeiro Artesão na Avenida Benedito Storani, 999, Vinhedo"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setMapLoaded(true)}
              className={`absolute inset-0 size-full border-0 transition-opacity duration-700 [filter:sepia(0.18)_saturate(0.9)] ${mapLoaded ? "opacity-100" : "opacity-0"}`}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
