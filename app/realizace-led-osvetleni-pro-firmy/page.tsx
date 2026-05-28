import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import CategoryLandingPage from "@/components/category-landing-page";

export const metadata: Metadata = {
  title: "Realizace LED osvětlení pro firmy | BE-LIGHT",
  description:
    "LED osvětlení pro kanceláře, hotely, restaurace, sklady, výrobní haly a průmyslové objekty. Návrh a montáž na míru. Úspora až 80 % energie. BE-LIGHT – od roku 2010.",
  alternates: {
    canonical: "https://macaly-yoynr8mzgtw8xuliw7ld87lf.macaly.app/realizace-led-osvetleni-pro-firmy",
  },
  openGraph: {
    title: "Realizace LED osvětlení pro firmy | BE-LIGHT",
    description:
      "LED osvětlení pro kanceláře, hotely, restaurace, sklady a výrobní haly. Návrh a montáž na míru.",
    images: [
      {
        url: "https://images.pexels.com/photos/6238608/pexels-photo-6238608.jpeg?auto=compress&cs=tinysrgb&w=1200",
        width: 1200,
        height: 630,
        alt: "Kancelářský prostor s LED osvětlením BE-LIGHT",
      },
    ],
  },
};

const COMMERCIAL_SEGMENTS = [
  "Hotely a restaurace",
  "Kanceláře a pracovny",
  "Průmyslové haly",
  "Sklady a logistická centra",
  "Prodejny a showroomy",
  "Schodiště a chodby",
  "Areály a sportoviště",
  "Dílny a garáže",
];

const DEFAULTS = {
  h1: "Realizace LED osvětlení pro firmy",
  subtitle: "Správné osvětlení ve firmě zvyšuje produktivitu zaměstnanců, snižuje únavu a zlepšuje bezpečnost práce. Poradíme vám s řešením pro jakýkoli typ provozu.",
  perex: "Od prodejny po výrobní halu – BE-LIGHT navrhne a realizuje LED osvětlení přesně podle vašich potřeb. Každý projekt řešíme individuálně s důrazem na funkčnost, estetiku i úspory.",
  p1: "Při vhodně zvoleném osvětlení zaměstnanci dokáží <strong style=\"color:rgba(235,235,235,0.9)\">pracovat efektivněji, snižuje se jejich únava a naopak se zvyšuje bezpečnost práce</strong>. Nabídneme a poradíme s LED osvětlením do nejrůznějších druhů firem i průmyslových objektů.",
  p2: "Pořiďte si stylová a kvalitní LED světla do hotelu, baru, restaurace, průmyslové haly, kanceláře nebo skladu. Ke každému projektu přistupujeme individuálně a navrhneme řešení, které přesně odpovídá vašim potřebám a rozpočtu.",
  p3: `A proč LED? Díky LED technologii <strong style="color:rgba(235,235,235,0.9)">spotřebujete až o 80 % méně elektřiny</strong>. LED světla navíc dlouho vydrží, a tak se prvotní investice rychle vrátí. Šetříte peníze i životní prostředí. Realizujeme osvětlení pro: <strong style="color:rgba(235,235,235,0.75)">${COMMERCIAL_SEGMENTS.join(" · ")}</strong>`,
  benefits: "Zvýšení produktivity a snížení únavy zaměstnanců\nÚspora až 80 % elektřiny oproti starším technologiím\nIndividuální světelný návrh pro každý typ provozu\nProfesionální montáž s minimálním výpadkem provozu\nDlouhá životnost – minimální provozní náklady\nSplnění norem pro pracovní osvětlení (ČSN EN 12464)",
  cta: "Připravíme nabídku pro vaši firmu",
};

export default async function RealizaceLedProFirmy() {
  const settings = await fetchQuery(api.settings.list).catch(() => [] as { key: string; value: string }[]);
  const map: Record<string, string> = {};
  for (const s of settings) map[s.key] = s.value;

  const get = (key: string, fallback: string) => map[key] ?? fallback;

  const benefits = get("lp_firmy_benefits", DEFAULTS.benefits)
    .split("\n")
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <CategoryLandingPage
      h1={get("lp_firmy_h1", DEFAULTS.h1)}
      subtitle={get("lp_firmy_subtitle", DEFAULTS.subtitle)}
      perex={get("lp_firmy_perex", DEFAULTS.perex)}
      paragraphs={[
        get("lp_firmy_p1", DEFAULTS.p1),
        get("lp_firmy_p2", DEFAULTS.p2),
        get("lp_firmy_p3", DEFAULTS.p3),
      ]}
      benefits={benefits}
      heroImage="https://images.pexels.com/photos/6238608/pexels-photo-6238608.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"
      heroImageAlt="Moderní kancelářský prostor s LED osvětlením BE-LIGHT"
      ctaText={get("lp_firmy_cta", DEFAULTS.cta)}
    />
  );
}
