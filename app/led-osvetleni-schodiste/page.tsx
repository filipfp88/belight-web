import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import CategoryLandingPage from "@/components/category-landing-page";

export const metadata: Metadata = {
  title: "LED osvětlení schodiště | BE-LIGHT",
  description:
    "Prémiové LED osvětlení schodiště na míru. Podsvícení schodů, boční profily, samozhášecí systémy. Bezpečné a estetické řešení pro interiér i exteriér. BE-LIGHT – zkušenosti od roku 2010.",
  alternates: {
    canonical: "https://www.belight.cz/led-osvetleni-schodiste",
  },
  openGraph: {
    title: "LED osvětlení schodiště | BE-LIGHT",
    description:
      "Prémiové LED osvětlení schodiště na míru. Podsvícení schodů, boční profily, samozhášecí systémy.",
    images: [
      {
        url: "https://images.pexels.com/photos/13246807/pexels-photo-13246807.jpeg?auto=compress&cs=tinysrgb&w=1200",
        width: 1200,
        height: 630,
        alt: "Moderní schodiště s LED osvětlením BE-LIGHT",
      },
    ],
  },
};

const DEFAULTS = {
  h1: "LED osvětlení schodiště",
  subtitle: "Podsvícení každého schodu nebo elegantní boční profily. LED osvětlení schodiště od BE-LIGHT spojuje bezpečnost s efektem.",
  perex: "Schodiště je první věc, která upoutá pohled při vstupu do domu. Správně navržené LED osvětlení z něj udělá architektonický prvek, který hosté nebudou moci přehlédnout – a zároveň zajistí bezpečný pohyb v každou denní i noční hodinu.",
  p1: "Nejoblíbenější řešení pro schodiště jsou <strong style=\"color:rgba(235,235,235,0.9)\">hliníkové profily KLUŚ zabudované do nosů schodů</strong>. LED pásky uvnitř profilu osvětlují každý schod zdola, čímž vzniká dramatický světelný efekt a zároveň se výrazně zvyšuje bezpečnost.",
  p2: "Pro menší instalace nebo renovace doporučujeme <strong style=\"color:rgba(235,235,235,0.9)\">boční nástěnné profily s čidlem pohybu</strong>. Světlo se rozsvítí automaticky při přiblížení a po chvilce samo zhasne. Ideální pro chodby a schodiště, kde nechcete instalovat velkou elektroinstalaci.",
  p3: "LED osvětlení schodiště lze realizovat i pro exteriér – venkovní schody k domu, schody na terase nebo k bazénu. Používáme profily s krytím IP67, které odolají dešti, mrazu i UV záření po celé roky.",
  benefits: "Profily KLUŚ zabudované do nosů schodů\nBoční nástěnné profily s čidlem pohybu\nSamozhášecí systém – úspora energie\nExteriérové provedení IP67 – schody k domu nebo bazénu\nBarevné RGB varianty pro dramatický efekt\nBezpečný pohyb ve tmě bez nutnosti hledat vypínač\nÚspora oproti klasickému osvětlení až 80 %\nKomplexní návrh a realizace na klíč",
  cta: "Navrhněme osvětlení vašeho schodiště",
};

export default async function LedOsvetleniSchodiste() {
  const settings = await fetchQuery(api.settings.list).catch(() => [] as { key: string; value: string }[]);
  const map: Record<string, string> = {};
  for (const s of settings) map[s.key] = s.value;

  const get = (key: string, fallback: string) => map[key] ?? fallback;

  const benefits = get("lp_schodiste_benefits", DEFAULTS.benefits)
    .split("\n")
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <CategoryLandingPage
      h1={get("lp_schodiste_h1", DEFAULTS.h1)}
      subtitle={get("lp_schodiste_subtitle", DEFAULTS.subtitle)}
      perex={get("lp_schodiste_perex", DEFAULTS.perex)}
      paragraphs={[
        get("lp_schodiste_p1", DEFAULTS.p1),
        get("lp_schodiste_p2", DEFAULTS.p2),
        get("lp_schodiste_p3", DEFAULTS.p3),
      ]}
      benefits={benefits}
      heroImage="https://images.pexels.com/photos/13246807/pexels-photo-13246807.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"
      heroImageAlt="Moderní schodiště s LED osvětlením BE-LIGHT"
      ctaText={get("lp_schodiste_cta", DEFAULTS.cta)}
    />
  );
}
