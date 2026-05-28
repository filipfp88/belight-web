import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import CategoryLandingPage from "@/components/category-landing-page";

export const metadata: Metadata = {
  title: "LED osvětlení kuchyně | BE-LIGHT",
  description:
    "Prémiové LED osvětlení kuchyně na míru. Podsvícení kuchyňské linky, nepřímé osvětlení, CCT pásky. Profesionální realizace po celé ČR a SR. BE-LIGHT – zkušenosti od roku 2010.",
  alternates: {
    canonical: "https://www.belight.cz/led-osvetleni-kuchyne",
  },
  openGraph: {
    title: "LED osvětlení kuchyně | BE-LIGHT",
    description:
      "Prémiové LED osvětlení kuchyně na míru. Podsvícení kuchyňské linky, nepřímé osvětlení, CCT pásky.",
    images: [
      {
        url: "https://images.pexels.com/photos/7214442/pexels-photo-7214442.jpeg?auto=compress&cs=tinysrgb&w=1200",
        width: 1200,
        height: 630,
        alt: "Moderní kuchyně s prémiovým LED osvětlením BE-LIGHT",
      },
    ],
  },
};

const DEFAULTS = {
  h1: "LED osvětlení kuchyně",
  subtitle: "Podsvícení linky, nepřímé osvětlení i stmívatelné scény. Správné světlo v kuchyni promění každé vaření v požitek.",
  perex: "Kuchyně je srdce domácnosti – místo, kde se pracuje, setkává i relaxuje. LED osvětlení od BE-LIGHT přizpůsobíme každému koutu vaší kuchyně tak, abyste měli vždy dostatek světla tam, kde ho skutečně potřebujete.",
  p1: "Nejžádanější aplikací je <strong style=\"color:rgba(235,235,235,0.9)\">podsvícení kuchyňské linky</strong> pomocí hliníkových profilů KLUŚ s LED pásky. Světlo dopadá přesně na pracovní desku, ne mimo ni – přitom vytváří elegantní efekt, který celou kuchyni pozvedne.",
  p2: "Moderní <strong style=\"color:rgba(235,235,235,0.9)\">CCT pásky umožňují plynulou změnu teploty světla</strong> – od teplé 2700K pro romantickou večeři až po chladnou 6000K pro precizní vaření. Vše ovládáte jedním dotykem přes mobil nebo nástěnný panel.",
  p3: "LED osvětlení kuchyně vám ušetří až 80 % elektřiny oproti klasickým zářivkám a spotřebičům. Životnost přes 50 000 hodin znamená, že na výměnu žárovek v kuchyni zapomenete na mnoho let.",
  benefits: "Podsvícení kuchyňské linky – hliníkové profily KLUŚ\nCCT pásky – plynulá změna teploty světla\nNepřímé osvětlení v SDK stropech a niках\nOverhead osvětlení ostrůvku a jídelního stolu\nÚspora až 80 % oproti klasickému osvětlení\nOvládání přes mobil nebo nástěnný panel\nDlouhá životnost – 50 000+ hodin bez výměny\nProfesionální instalace s komplexním servisem",
  cta: "Navrhněme osvětlení vaší kuchyně",
};

export default async function LedOsvetleniKuchyne() {
  const settings = await fetchQuery(api.settings.list).catch(() => [] as { key: string; value: string }[]);
  const map: Record<string, string> = {};
  for (const s of settings) map[s.key] = s.value;

  const get = (key: string, fallback: string) => map[key] ?? fallback;

  const benefits = get("lp_kuchyne_benefits", DEFAULTS.benefits)
    .split("\n")
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <CategoryLandingPage
      h1={get("lp_kuchyne_h1", DEFAULTS.h1)}
      subtitle={get("lp_kuchyne_subtitle", DEFAULTS.subtitle)}
      perex={get("lp_kuchyne_perex", DEFAULTS.perex)}
      paragraphs={[
        get("lp_kuchyne_p1", DEFAULTS.p1),
        get("lp_kuchyne_p2", DEFAULTS.p2),
        get("lp_kuchyne_p3", DEFAULTS.p3),
      ]}
      benefits={benefits}
      heroImage="https://images.pexels.com/photos/7214442/pexels-photo-7214442.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"
      heroImageAlt="Moderní kuchyně s prémiovým LED osvětlením BE-LIGHT"
      ctaText={get("lp_kuchyne_cta", DEFAULTS.cta)}
    />
  );
}
