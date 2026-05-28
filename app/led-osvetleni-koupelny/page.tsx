import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import CategoryLandingPage from "@/components/category-landing-page";

export const metadata: Metadata = {
  title: "LED osvětlení koupelny | BE-LIGHT",
  description:
    "Prémiové LED osvětlení koupelny na míru. Profily kolem zrcadla, podsvícení vany, IP67 pásky. Koupelna jako wellness. BE-LIGHT – zkušenosti od roku 2010.",
  alternates: {
    canonical: "https://www.belight.cz/led-osvetleni-koupelny",
  },
  openGraph: {
    title: "LED osvětlení koupelny | BE-LIGHT",
    description:
      "Prémiové LED osvětlení koupelny na míru. Profily kolem zrcadla, podsvícení vany, IP67 pásky do vlhkého prostředí.",
    images: [
      {
        url: "https://images.pexels.com/photos/10222466/pexels-photo-10222466.jpeg?auto=compress&cs=tinysrgb&w=1200",
        width: 1200,
        height: 630,
        alt: "Moderní koupelna s LED osvětlením zrcadla BE-LIGHT",
      },
    ],
  },
};

const DEFAULTS = {
  h1: "LED osvětlení koupelny",
  subtitle: "Osvětlení zrcadla, podsvícení vany nebo walk-in sprchy. Koupelna jako soukromé wellness – to umí LED osvětlení od BE-LIGHT.",
  perex: "Koupelna je místem, kde den začíná i končí. Správné osvětlení vám pomůže ráno nastartovat a večer se uklidnit. BE-LIGHT navrhuje LED osvětlení koupelen s důrazem na voděodolnost, bezpečnost a estetiku.",
  p1: "Klíčový prvek každé koupelny je <strong style=\"color:rgba(235,235,235,0.9)\">osvětlení zrcadla pomocí hliníkových profilů KLUŚ GIZA</strong>. Rovnoměrné denní světlo (4000–5000K) eliminuje stíny na obličeji, takže líčení, holení nebo péče o pleť jsou konečně příjemné.",
  p2: "Do vlhkých zón koupelny (sprcha, vana, okraj bazénu) používáme výhradně <strong style=\"color:rgba(235,235,235,0.9)\">LED pásky s krytím IP67</strong>, které jsou certifikované pro použití ve vlhkém prostředí. Podsvícení vany nebo sprchy vytváří nádherný spa efekt.",
  p3: "Kompletní LED osvětlení koupelny může zahrnovat i stmívatelné scény: jasné ranní světlo pro přípravu na den, teplé ambientní osvětlení pro večerní relaxaci ve vaně. Přepínání scén přes dotykový panel nebo mobilní aplikaci.",
  benefits: "Profily KLUŚ GIZA kolem zrcadla – rovnoměrné světlo bez stínů\nIP67 LED pásky pro sprchu, vanu a vlhké zóny\nPodsvícení vany – spa efekt v domácí koupelně\nStmívatelné světelné scény – ráno vs. večer\nSDK podhledy s nepřímým osvětlením\nOvládání přes dotykový panel nebo mobil\nCCT pásky – volba teploty světla dle nálady\nBezpečná instalace splňující normy pro vlhké prostory",
  cta: "Navrhněme osvětlení vaší koupelny",
};

export default async function LedOsvetleniKoupelny() {
  const settings = await fetchQuery(api.settings.list).catch(() => [] as { key: string; value: string }[]);
  const map: Record<string, string> = {};
  for (const s of settings) map[s.key] = s.value;

  const get = (key: string, fallback: string) => map[key] ?? fallback;

  const benefits = get("lp_koupelna_benefits", DEFAULTS.benefits)
    .split("\n")
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <CategoryLandingPage
      h1={get("lp_koupelna_h1", DEFAULTS.h1)}
      subtitle={get("lp_koupelna_subtitle", DEFAULTS.subtitle)}
      perex={get("lp_koupelna_perex", DEFAULTS.perex)}
      paragraphs={[
        get("lp_koupelna_p1", DEFAULTS.p1),
        get("lp_koupelna_p2", DEFAULTS.p2),
        get("lp_koupelna_p3", DEFAULTS.p3),
      ]}
      benefits={benefits}
      heroImage="https://images.pexels.com/photos/10222466/pexels-photo-10222466.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"
      heroImageAlt="Moderní koupelna s LED osvětlením zrcadla BE-LIGHT"
      ctaText={get("lp_koupelna_cta", DEFAULTS.cta)}
    />
  );
}
