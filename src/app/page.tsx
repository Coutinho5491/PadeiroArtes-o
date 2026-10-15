import { Providers } from "@/components/Providers";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { ComoPedir } from "@/components/sections/ComoPedir";
import { EmFoco } from "@/components/sections/EmFoco";
import { Galeria } from "@/components/sections/Galeria";
import { Hero } from "@/components/sections/Hero";
import { Historia } from "@/components/sections/Historia";
import { Momentos } from "@/components/sections/Momentos";
import { Sensorial } from "@/components/sections/Sensorial";
import { Social } from "@/components/sections/Social";
import { Visite } from "@/components/sections/Visite";
import { Vitrine } from "@/components/sections/Vitrine";
import { JsonLd } from "@/components/seo/JsonLd";

export default function Home() {
  return (
    <Providers>
      <JsonLd />
      <Header />
      <main id="conteudo">
        <Hero />
        <Sensorial />
        <Vitrine />
        <EmFoco />
        <Historia />
        <Momentos />
        <Galeria />
        <ComoPedir />
        <Visite />
        <Social />
      </main>
      <Footer />
      <MobileActionBar />
    </Providers>
  );
}
