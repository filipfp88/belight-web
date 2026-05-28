import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import CategoryLandingPage from "@/components/category-landing-page";

export const metadata: Metadata = {
  title: "LED osvětlení ložnice | BE-LIGHT",
  description:
    "Prémiové LED osvětlení ložnice na míru. Ambient osvětlení, čidla pohybu, RGBW pásky pro ideální atmosféru. Kvalitní spánek díky správnému světlu. BE-LIGHT – zkušenosti od roku 2010.",
  alternates: {
    canonical: "https://www.belight.cz/led-osvetleni-loznice",
  },
  openGraph: {
    title: "LED osvětlení ložnice | BE-LIGHT",
    description:
      "Prémiové LED osvětlení ložnice na míru. Ambient osvětlení, RGBW pásky, čidla pohybu pro ideální atmosféru.",
    images: [
      {
        url: "https://images.pexels.com/photos/6782578/pexels-photo-6782578.jpeg?auto=compress&cs=tinysrgb&w=1200",
        width: 1200,
        height: 630,
        alt: "Moderní ložnice s ambientním LED osvětlením BE-LIGHT",
      },
    ],
  },
};

const DEFAULTS = {
  h1: "LED osvětlení ložnice",
  subtitle: "Teplé amber světlo pro hluboký spánek, jemné ambient nasvícení pro romantiku. LED osvětlení ložnice od BE-LIGHT nastaví tu správnou náladu.",
  perex: "V ložnici záleží na každém fotonu. Správná teplota světla před spaním podporuje produkci melatoninu a zlepšuje kvalitu spánku. BE-LIGHT navrhuje osvětlení ložnic s ohledem na biologické potřeby člověka i vizuální krásu prostoru.",
  p1: "Pro ložnici doporučujeme <strong style=\"color:rgba(235,235,235,0.9)\">teplé bílé LED pásky (2700K nebo AMBER)</strong> bez modré složky světla. Modrá složka potlačuje melatonin a narušuje spánek. Naše AMBER pásky tento problém eliminují a zároveň vytváří nádhernou zlatou atmosféru.",
  p2: "Oblíbenou aplikací je <strong style=\"color:rgba(235,235,235,0.9)\">nepřímé osvětlení za čelem postele nebo v SDK podhledy</strong>. Jemné nasvícení stěny za postelí funguje jako dekorace, čteníhodné světlo i noční orientační světlo zároveň. Vše stmívatelné jedním tlačítkem.",
  p3: "Doplňkem jsou LED pásky pod postelí nebo pod nočními stolky s čidlem pohybu – rozsvítí se při nočním vstávání a zhasnou automaticky po návratu do postele. Žádné mačkání vypínačů ve tmě.",
  benefits: "AMBER LED pásky bez modré složky – zdravý spánek\nNepřímé osvětlení za čelem postele\nLED pásky pod postelí s čidlem pohybu\nSDK podhledy s ambient osvětlením\nStmívání a světelné scény přes mobil\nRGBW varianty pro barevnou atmosféru\nTeplá bílá 2700K pro příjemné relaxační světlo\nKomplexní návrh a instalace na klíč",
  cta: "Navrhněme osvětlení vaší ložnice",
};

export default async function LedOsvetleniLoznice() {
  const settings = await fetchQuery(api.settings.list).catch(() => [] as { key: string; value: string }[]);
  const map: Record<string, string> = {};
  for (const s of settings) map[s.key] = s.value;

  const get = (key: string, fallback: string) => map[key] ?? fallback;

  const benefits = get("lp_loznice_benefits", DEFAULTS.benefits)
    .split("\n")
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <CategoryLandingPage
      h1={get("lp_loznice_h1", DEFAULTS.h1)}
      subtitle={get("lp_loznice_subtitle", DEFAULTS.subtitle)}
      perex={get("lp_loznice_perex", DEFAULTS.perex)}
      paragraphs={[
        get("lp_loznice_p1", DEFAULTS.p1),
        get("lp_loznice_p2", DEFAULTS.p2),
        get("lp_loznice_p3", DEFAULTS.p3),
      ]}
      benefits={benefits}
      heroImage="https://images.pexels.com/photos/6782578/pexels-photo-6782578.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"
      heroImageAlt="Moderní ložnice s ambientním LED osvětlením BE-LIGHT"
      ctaText={get("lp_loznice_cta", DEFAULTS.cta)}
    />
  );
}
