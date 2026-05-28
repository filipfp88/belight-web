import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import CategoryLandingPage from "@/components/category-landing-page";

export const metadata: Metadata = {
  title: "Projekty na míru pro státní a veřejnou správu | BE-LIGHT",
  description:
    "LED osvětlení pro veřejná prostranství, obce a státní správu. Pouliční osvětlení, nasvícení památníků, světelný plán a výpočet úspor. BE-LIGHT – od roku 2010.",
  alternates: {
    canonical:
      "https://macaly-yoynr8mzgtw8xuliw7ld87lf.macaly.app/projekty-na-miru-pro-statni-a-verejnou-spravu",
  },
  openGraph: {
    title: "Projekty na míru pro státní a veřejnou správu | BE-LIGHT",
    description:
      "LED osvětlení pro obce a veřejná prostranství. Pouliční osvětlení, světelný plán, výpočet úspor.",
    images: [
      {
        url: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1200",
        width: 1200,
        height: 630,
        alt: "Veřejné osvětlení BE-LIGHT pro obce a státní správu",
      },
    ],
  },
};

const DEFAULTS = {
  h1: "Projekty na míru pro státní a veřejnou správu",
  subtitle: "Vysoce kvalitní LED osvětlení pro veřejná prostranství, obce a státní instituce. Vypracujeme světelný plán, spočítáme úspory a postaráme se o celou realizaci.",
  perex: "BE-LIGHT je správnou volbou, pokud hledáte osvětlení pro veřejná prostranství. Nabídneme vám stylová LED světla pro pouliční osvětlení nebo nasvícení soch a památníků – a vše zapadne do okolního prostředí.",
  p1: "Kromě dodávky osvětlení vám vypracujeme podrobný <strong style=\"color:rgba(235,235,235,0.9)\">světelný plán a výpočet úspor</strong> při přechodu na LED technologii. Transparentní nabídka umožňuje snadné schválení v rámci veřejných zakázek.",
  p2: "A proč LED do venkovního prostředí? Kromě <strong style=\"color:rgba(235,235,235,0.9)\">odolnosti a téměř nulové potřeby údržby</strong> je velkou výhodou LED osvětlení dlouhá životnost. Nebude problém, když světla budou svítit celou noc. V porovnání s klasickými výbojkami ušetříte energii <strong style=\"color:rgba(235,235,235,0.9)\">až 80 %</strong>.",
  p3: "Nemáte představu, jaká světla použít? Nechte to na nás. Navrhneme osvětlení, které perfektně zapadne do charakteru vaší obce nebo prostranství – od historických center po moderní sportovní areály.",
  benefits: "Pouliční LED osvětlení pro obce a města\nNasvícení soch, památníků a veřejných budov\nSvětelný plán a výpočet úspor jako podklad pro dotace\nÚspora až 80 % energie oproti klasickým výbojkám\nOdolnost a minimální potřeba údržby\nZkušenosti s veřejnými zakázkami od roku 2010",
  cta: "Připravíme světelný plán pro vaši obec",
};

export default async function StatniAVerejnaSpravaPage() {
  const settings = await fetchQuery(api.settings.list).catch(() => [] as { key: string; value: string }[]);
  const map: Record<string, string> = {};
  for (const s of settings) map[s.key] = s.value;

  const get = (key: string, fallback: string) => map[key] ?? fallback;

  const benefits = get("lp_verejna_benefits", DEFAULTS.benefits)
    .split("\n")
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <CategoryLandingPage
      h1={get("lp_verejna_h1", DEFAULTS.h1)}
      subtitle={get("lp_verejna_subtitle", DEFAULTS.subtitle)}
      perex={get("lp_verejna_perex", DEFAULTS.perex)}
      paragraphs={[
        get("lp_verejna_p1", DEFAULTS.p1),
        get("lp_verejna_p2", DEFAULTS.p2),
        get("lp_verejna_p3", DEFAULTS.p3),
      ]}
      benefits={benefits}
      heroImage="https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"
      heroImageAlt="Veřejné prostranství s LED osvětlením BE-LIGHT"
      ctaText={get("lp_verejna_cta", DEFAULTS.cta)}
    />
  );
}
