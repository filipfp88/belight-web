import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import CategoryLandingPage from "@/components/category-landing-page";

export const metadata: Metadata = {
  title: "LED osvětlení obývacího pokoje | BE-LIGHT",
  description:
    "Prémiové LED osvětlení obývacího pokoje na míru. Nepřímé nasvícení, RGBW pásky, sádrokartonové podhledy. Úspora až 80 % energie. BE-LIGHT – zkušenosti od roku 2010.",
  alternates: {
    canonical: "https://macaly-yoynr8mzgtw8xuliw7ld87lf.macaly.app/led-osvetleni-obyvaciho-pokoje",
  },
  openGraph: {
    title: "LED osvětlení obývacího pokoje | BE-LIGHT",
    description:
      "Prémiové LED osvětlení obývacího pokoje na míru. Nepřímé nasvícení, RGBW pásky, sádrokartonové podhledy.",
    images: [
      {
        url: "https://images.pexels.com/photos/6444242/pexels-photo-6444242.jpeg?auto=compress&cs=tinysrgb&w=1200",
        width: 1200,
        height: 630,
        alt: "Moderní obývací pokoj s LED osvětlením BE-LIGHT",
      },
    ],
  },
};

const DEFAULTS = {
  h1: "LED osvětlení obývacího pokoje",
  subtitle: "K televizi, ke čtení nebo jen tak k odpočinku. Naše LED světla do obýváku vytvoří přesně tu atmosféru, kterou chcete.",
  perex: "Dobře osvětlený obývací pokoj není jen o viditelnosti – je to o náladě, komfortu a výrazu vašeho domova. LED osvětlení od BE-LIGHT promění váš obývák v prostor, který si každý zapamatuje.",
  p1: "Vždyť v obýváku trávíte většinu ze svého pobytu doma. Tak si to tam udělejte hezké. Můžete využít <strong style=\"color:rgba(235,235,235,0.9)\">sádrokartonové podhledy pro nepřímé LED osvětlení</strong> pomocí barevných RGBW pásků. Pomocí dálkového ovladače nebo mobilního telefonu pak ovládáte vše z pohodlí vašeho křesla.",
  p2: "LED světla do obýváku vám navíc <strong style=\"color:rgba(235,235,235,0.9)\">ušetří až 80 % elektřiny</strong> v porovnání s klasickými žárovkami. A jejich životnost je až 20× delší – počáteční investice se vrátí velmi rychle.",
  p3: "Pěkné svítidlo nebo promyšlená světelná scéna plní funkci dekorace, kterou vám může kdekdo závidět. Ať jde o jemné ambient osvětlení pro film, nebo jasné světlo ke čtení – vše nastavíte jedním dotykem.",
  benefits: "Úspora energie – až 80 % méně elektřiny oproti klasickým žárovkám\nDlouhá životnost – až 20× delší než tradiční osvětlení\nNepřímé osvětlení pomocí sádrokartonových podhledů\nBarevné RGBW pásky – ovládání přes mobil nebo dálkový ovladač\nIntimní i dynamické nasvícení interiéru\nNízké provozní náklady a minimální údržba",
  cta: "Navrhněme osvětlení vašeho obýváku",
};

export default async function LedObyvachoPokoj() {
  const settings = await fetchQuery(api.settings.list).catch(() => [] as { key: string; value: string }[]);
  const map: Record<string, string> = {};
  for (const s of settings) map[s.key] = s.value;

  const get = (key: string, fallback: string) => map[key] ?? fallback;

  const benefits = get("lp_obyvak_benefits", DEFAULTS.benefits)
    .split("\n")
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <CategoryLandingPage
      h1={get("lp_obyvak_h1", DEFAULTS.h1)}
      subtitle={get("lp_obyvak_subtitle", DEFAULTS.subtitle)}
      perex={get("lp_obyvak_perex", DEFAULTS.perex)}
      paragraphs={[
        get("lp_obyvak_p1", DEFAULTS.p1),
        get("lp_obyvak_p2", DEFAULTS.p2),
        get("lp_obyvak_p3", DEFAULTS.p3),
      ]}
      benefits={benefits}
      heroImage="https://images.pexels.com/photos/6444242/pexels-photo-6444242.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"
      heroImageAlt="Moderní obývací pokoj s prémiovým LED osvětlením BE-LIGHT"
      ctaText={get("lp_obyvak_cta", DEFAULTS.cta)}
    />
  );
}
