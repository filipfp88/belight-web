"use client"

import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useState, useEffect } from "react"

const inputCls = "w-full bg-[#0a0a0a] border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C9A84C]/50"
const textareaCls = inputCls + " resize-none"
const labelCls = "block text-xs text-white/50 mb-1"
const sectionHeadingCls = "text-base font-medium text-white mb-4 pt-2"
const dividerCls = "border-t border-white/8 my-6"

type LandingKey = "obyvak" | "firmy" | "verejna" | "kuchyne" | "schodiste" | "loznice" | "koupelna"

const PAGES: { key: LandingKey; label: string; path: string }[] = [
  { key: "obyvak", label: "Obývací pokoj", path: "/led-osvetleni-obyvaciho-pokoje/" },
  { key: "kuchyne", label: "Kuchyně", path: "/led-osvetleni-kuchyne/" },
  { key: "schodiste", label: "Schodiště", path: "/led-osvetleni-schodiste/" },
  { key: "loznice", label: "Ložnice", path: "/led-osvetleni-loznice/" },
  { key: "koupelna", label: "Koupelna", path: "/led-osvetleni-koupelny/" },
  { key: "firmy", label: "Firmy", path: "/realizace-led-osvetleni-pro-firmy/" },
  { key: "verejna", label: "Veřejná správa", path: "/projekty-na-miru-pro-statni-a-verejnou-spravu/" },
]

const DEFAULTS: Record<LandingKey, Record<string, string>> = {
  obyvak: {
    h1: "LED osvětlení obývacího pokoje",
    subtitle: "K televizi, ke čtení nebo jen tak k odpočinku. Naše LED světla do obýváku vytvoří přesně tu atmosféru, kterou chcete.",
    perex: "Dobře osvětlený obývací pokoj není jen o viditelnosti – je to o náladě, komfortu a výrazu vašeho domova. LED osvětlení od BE-LIGHT promění váš obývák v prostor, který si každý zapamatuje.",
    p1: "Vždyť v obýváku trávíte většinu ze svého pobytu doma. Tak si to tam udělejte hezké. Můžete využít sádrokartonové podhledy pro nepřímé LED osvětlení pomocí barevných RGBW pásků. Pomocí dálkového ovladače nebo mobilního telefonu pak ovládáte vše z pohodlí vašeho křesla.",
    p2: "LED světla do obýváku vám navíc ušetří až 80 % elektřiny v porovnání s klasickými žárovkami. A jejich životnost je až 20× delší – počáteční investice se vrátí velmi rychle.",
    p3: "Pěkné svítidlo nebo promyšlená světelná scéna plní funkci dekorace, kterou vám může kdekdo závidět. Ať jde o jemné ambient osvětlení pro film, nebo jasné světlo ke čtení – vše nastavíte jedním dotykem.",
    benefits: "Úspora energie – až 80 % méně elektřiny oproti klasickým žárovkám\nDlouhá životnost – až 20× delší než tradiční osvětlení\nNepřímé osvětlení pomocí sádrokartonových podhledů\nBarevné RGBW pásky – ovládání přes mobil nebo dálkový ovladač\nIntimní i dynamické nasvícení interiéru\nNízké provozní náklady a minimální údržba",
    cta: "Navrhněme osvětlení vašeho obýváku",
  },
  kuchyne: {
    h1: "LED osvětlení kuchyně",
    subtitle: "Podsvícení linky, nepřímé osvětlení i stmívatelné scény. Správné světlo v kuchyni promění každé vaření v požitek.",
    perex: "Kuchyně je srdce domácnosti – místo, kde se pracuje, setkává i relaxuje. LED osvětlení od BE-LIGHT přizpůsobíme každému koutu vaší kuchyně tak, abyste měli vždy dostatek světla tam, kde ho skutečně potřebujete.",
    p1: "Nejžádanější aplikací je podsvícení kuchyňské linky pomocí hliníkových profilů KLUŚ s LED pásky. Světlo dopadá přesně na pracovní desku, ne mimo ni – přitom vytváří elegantní efekt, který celou kuchyni pozvedne.",
    p2: "Moderní CCT pásky umožňují plynulou změnu teploty světla – od teplé 2700K pro romantickou večeři až po chladnou 6000K pro precizní vaření. Vše ovládáte jedním dotykem přes mobil nebo nástěnný panel.",
    p3: "LED osvětlení kuchyně vám ušetří až 80 % elektřiny oproti klasickým zářivkám a spotřebičům. Životnost přes 50 000 hodin znamená, že na výměnu žárovek v kuchyni zapomenete na mnoho let.",
    benefits: "Podsvícení kuchyňské linky – hliníkové profily KLUŚ\nCCT pásky – plynulá změna teploty světla\nNepřímé osvětlení v SDK stropech a nikách\nOverhead osvětlení ostrůvku a jídelního stolu\nÚspora až 80 % oproti klasickému osvětlení\nOvládání přes mobil nebo nástěnný panel\nDlouhá životnost – 50 000+ hodin bez výměny\nProfesionální instalace s komplexním servisem",
    cta: "Navrhněme osvětlení vaší kuchyně",
  },
  schodiste: {
    h1: "LED osvětlení schodiště",
    subtitle: "Podsvícení každého schodu nebo elegantní boční profily. LED osvětlení schodiště od BE-LIGHT spojuje bezpečnost s efektem.",
    perex: "Schodiště je první věc, která upoutá pohled při vstupu do domu. Správně navržené LED osvětlení z něj udělá architektonický prvek, který hosté nebudou moci přehlédnout – a zároveň zajistí bezpečný pohyb v každou denní i noční hodinu.",
    p1: "Nejoblíbenější řešení pro schodiště jsou hliníkové profily KLUŚ zabudované do nosů schodů. LED pásky uvnitř profilu osvětlují každý schod zdola, čímž vzniká dramatický světelný efekt a zároveň se výrazně zvyšuje bezpečnost.",
    p2: "Pro menší instalace nebo renovace doporučujeme boční nástěnné profily s čidlem pohybu. Světlo se rozsvítí automaticky při přiblížení a po chvilce samo zhasne. Ideální pro chodby a schodiště, kde nechcete instalovat velkou elektroinstalaci.",
    p3: "LED osvětlení schodiště lze realizovat i pro exteriér – venkovní schody k domu, schody na terase nebo k bazénu. Používáme profily s krytím IP67, které odolají dešti, mrazu i UV záření po celé roky.",
    benefits: "Profily KLUŚ zabudované do nosů schodů\nBoční nástěnné profily s čidlem pohybu\nSamozhášecí systém – úspora energie\nExteriérové provedení IP67 – schody k domu nebo bazénu\nBarevné RGB varianty pro dramatický efekt\nBezpečný pohyb ve tmě bez nutnosti hledat vypínač\nÚspora oproti klasickému osvětlení až 80 %\nKomplexní návrh a realizace na klíč",
    cta: "Navrhněme osvětlení vašeho schodiště",
  },
  loznice: {
    h1: "LED osvětlení ložnice",
    subtitle: "Teplé amber světlo pro hluboký spánek, jemné ambient nasvícení pro romantiku. LED osvětlení ložnice od BE-LIGHT nastaví tu správnou náladu.",
    perex: "V ložnici záleží na každém fotonu. Správná teplota světla před spaním podporuje produkci melatoninu a zlepšuje kvalitu spánku. BE-LIGHT navrhuje osvětlení ložnic s ohledem na biologické potřeby člověka i vizuální krásu prostoru.",
    p1: "Pro ložnici doporučujeme teplé bílé LED pásky (2700K nebo AMBER) bez modré složky světla. Modrá složka potlačuje melatonin a narušuje spánek. Naše AMBER pásky tento problém eliminují a zároveň vytváří nádhernou zlatou atmosféru.",
    p2: "Oblíbenou aplikací je nepřímé osvětlení za čelem postele nebo v SDK podhledy. Jemné nasvícení stěny za postelí funguje jako dekorace, čteníhodné světlo i noční orientační světlo zároveň. Vše stmívatelné jedním tlačítkem.",
    p3: "Doplňkem jsou LED pásky pod postelí nebo pod nočními stolky s čidlem pohybu – rozsvítí se při nočním vstávání a zhasnou automaticky po návratu do postele. Žádné mačkání vypínačů ve tmě.",
    benefits: "AMBER LED pásky bez modré složky – zdravý spánek\nNepřímé osvětlení za čelem postele\nLED pásky pod postelí s čidlem pohybu\nSDK podhledy s ambient osvětlením\nStmívání a světelné scény přes mobil\nRGBW varianty pro barevnou atmosféru\nTeplá bílá 2700K pro příjemné relaxační světlo\nKomplexní návrh a instalace na klíč",
    cta: "Navrhněme osvětlení vaší ložnice",
  },
  koupelna: {
    h1: "LED osvětlení koupelny",
    subtitle: "Osvětlení zrcadla, podsvícení vany nebo walk-in sprchy. Koupelna jako soukromé wellness – to umí LED osvětlení od BE-LIGHT.",
    perex: "Koupelna je místem, kde den začíná i končí. Správné osvětlení vám pomůže ráno nastartovat a večer se uklidnit. BE-LIGHT navrhuje LED osvětlení koupelen s důrazem na voděodolnost, bezpečnost a estetiku.",
    p1: "Klíčový prvek každé koupelny je osvětlení zrcadla pomocí hliníkových profilů KLUŚ GIZA. Rovnoměrné denní světlo (4000–5000K) eliminuje stíny na obličeji, takže líčení, holení nebo péče o pleť jsou konečně příjemné.",
    p2: "Do vlhkých zón koupelny (sprcha, vana, okraj bazénu) používáme výhradně LED pásky s krytím IP67, které jsou certifikované pro použití ve vlhkém prostředí. Podsvícení vany nebo sprchy vytváří nádherný spa efekt.",
    p3: "Kompletní LED osvětlení koupelny může zahrnovat i stmívatelné scény: jasné ranní světlo pro přípravu na den, teplé ambientní osvětlení pro večerní relaxaci ve vaně. Přepínání scén přes dotykový panel nebo mobilní aplikaci.",
    benefits: "Profily KLUŚ GIZA kolem zrcadla – rovnoměrné světlo bez stínů\nIP67 LED pásky pro sprchu, vanu a vlhké zóny\nPodsvícení vany – spa efekt v domácí koupelně\nStmívatelné světelné scény – ráno vs. večer\nSDK podhledy s nepřímým osvětlením\nOvládání přes dotykový panel nebo mobil\nCCT pásky – volba teploty světla dle nálady\nBezpečná instalace splňující normy pro vlhké prostory",
    cta: "Navrhněme osvětlení vaší koupelny",
  },
  firmy: {
    h1: "Realizace LED osvětlení pro firmy",
    subtitle: "Kanceláře, hotely, restaurace, průmyslové haly. Komplexní LED osvětlení pro komerční prostory – od návrhu po instalaci.",
    perex: "Správné osvětlení v pracovním prostředí zvyšuje produktivitu, snižuje únavu a výrazně šetří provozní náklady. BE-LIGHT navrhuje a realizuje LED osvětlení pro firmy po celé ČR a SR.",
    p1: "Pracujeme s kancelářemi, výrobními podniky, logistickými centry, hotely i restauracemi. Každý prostor má jiné nároky – jiný výkon, barevnou teplotu, způsob ovládání. Proto ke každému projektu přistupujeme individuálně.",
    p2: "Naše LED řešení pro firmy splňují normy ČSN EN 12464 pro osvětlení pracovišť. Postaráme se o světelný výpočet, návrh rozmístění svítidel i kompletní instalaci. Součástí je také záruka a pozáruční servis.",
    p3: "Přechod na LED osvětlení se firmám typicky vrátí do 2–3 let. Poté čistá úspora. Pomůžeme vám i s dotačními programy na ekologické osvětlení.",
    benefits: "Kanceláře a administrativní prostory\nVýrobní haly a sklady\nHotely, penziony a ubytovací zařízení\nRestaurace, kavárny a obchodní prostory\nVenkovní osvětlení areálů a parkovišť\nPrůmyslové osvětlení a logistická centra\nMedical a zdravotnická zařízení\nŠkoly a vzdělávací instituce",
    cta: "Připravíme nabídku pro vaši firmu",
  },
  verejna: {
    h1: "LED osvětlení pro veřejnou správu",
    subtitle: "Obecní osvětlení, rekonstrukce veřejného prostoru, nasvícení památek. Spolehlivá řešení pro municipalities a státní instituce.",
    perex: "Veřejné osvětlení je investice na desítky let. BE-LIGHT dodává energeticky úsporná LED řešení, která snižují náklady obcí a měst a přitom zvyšují bezpečnost a estetiku veřejného prostoru.",
    p1: "Spolupracujeme s obcemi, městy, správami krajů i státními institucemi. Navrhujeme světelné plány pro ulice, náměstí, parky a veřejné budovy. Zajišťujeme veškerou dokumentaci potřebnou k dotačním žádostem.",
    p2: "Naše LED svítidla pro veřejné osvětlení mají životnost přes 50 000 hodin a nevyžadují prakticky žádnou údržbu. To výrazně snižuje provozní náklady a zátěž pro technické pracovníky obcí.",
    p3: "Vedle přímého osvětlení se specializujeme i na architektonické nasvícení – fontány, historické budovy, pomníky a veřejná umělecká díla. Světlo jako součást identity místa.",
    benefits: "Veřejné osvětlení ulic a náměstí\nParkové a rekreační osvětlení\nArchitektonické nasvícení historických budov\nOsvětlení chodníků a přechodů pro chodce\nÚspora energie a provozních nákladů\nSplnění moderních energetických standardů\nPomoc s dotačními žádostmi\nDlouhá životnost a minimální údržba",
    cta: "Konzultace pro veřejný sektor",
  },
}

export default function LandingPagesTab() {
  const settingsList = useQuery(api.settings.list)
  const setBulk = useMutation(api.settings.setBulk)

  const [activePage, setActivePage] = useState<LandingKey>("obyvak")
  const [forms, setForms] = useState<Record<LandingKey, Record<string, string>>>(() => {
    const result = {} as Record<LandingKey, Record<string, string>>
    for (const key of Object.keys(DEFAULTS) as LandingKey[]) {
      result[key] = { ...DEFAULTS[key] }
    }
    return result
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!settingsList) return
    const map: Record<string, string> = {}
    for (const s of settingsList) map[s.key] = s.value

    const updated = {} as Record<LandingKey, Record<string, string>>
    for (const key of Object.keys(DEFAULTS) as LandingKey[]) {
      const d = DEFAULTS[key]
      updated[key] = {
        h1: map[`lp_${key}_h1`] ?? d.h1,
        subtitle: map[`lp_${key}_subtitle`] ?? d.subtitle,
        perex: map[`lp_${key}_perex`] ?? d.perex,
        p1: map[`lp_${key}_p1`] ?? d.p1,
        p2: map[`lp_${key}_p2`] ?? d.p2,
        p3: map[`lp_${key}_p3`] ?? d.p3,
        benefits: map[`lp_${key}_benefits`] ?? d.benefits,
        cta: map[`lp_${key}_cta`] ?? d.cta,
      }
    }
    setForms(updated)
  }, [settingsList])

  function setField(field: string, value: string) {
    setForms((prev) => ({
      ...prev,
      [activePage]: { ...prev[activePage], [field]: value },
    }))
    setSaved(false)
  }

  async function handleSave() {
    setSaving(true)
    try {
      const f = forms[activePage]
      const prefix = `lp_${activePage}_`
      await setBulk({
        settings: [
          { key: prefix + "h1", value: f.h1 },
          { key: prefix + "subtitle", value: f.subtitle },
          { key: prefix + "perex", value: f.perex },
          { key: prefix + "p1", value: f.p1 },
          { key: prefix + "p2", value: f.p2 },
          { key: prefix + "p3", value: f.p3 },
          { key: prefix + "benefits", value: f.benefits },
          { key: prefix + "cta", value: f.cta },
        ],
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } finally {
      setSaving(false)
    }
  }

  const f = forms[activePage]
  const activeMeta = PAGES.find((p) => p.key === activePage)!

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-white mb-1">SEO Landing Pages</h2>
        <p className="text-sm text-white/40">
          Stránky pro zachování SEO ze starého webu belightled.cz. Obsah se promítne na příslušnou URL.
        </p>
      </div>

      {/* Page selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {PAGES.map((p) => (
          <button
            key={p.key}
            onClick={() => setActivePage(p.key)}
            className={`px-3 py-2 rounded text-xs text-left transition-all border ${
              activePage === p.key
                ? "border-[#C9A84C]/50 bg-[#C9A84C]/10 text-[#C9A84C]"
                : "border-white/10 text-white/50 hover:border-white/20 hover:text-white/70"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* URL badge */}
      <div className="flex items-center gap-2 bg-white/3 rounded px-3 py-2">
        <span className="text-white/30 text-xs">URL:</span>
        <code className="text-[#C9A84C] text-xs">{activeMeta.path}</code>
      </div>

      {/* Form */}
      <div className="space-y-5">
        <div>
          <p className={sectionHeadingCls}>Nadpisy</p>
          <div className="space-y-4">
            <div>
              <label className={labelCls}>H1 – Hlavní nadpis stránky</label>
              <input
                className={inputCls}
                value={f.h1}
                onChange={(e) => setField("h1", e.target.value)}
                placeholder="Např. LED osvětlení kuchyně"
              />
            </div>
            <div>
              <label className={labelCls}>Podtitul (pod nadpisem v hero sekci)</label>
              <textarea
                className={textareaCls}
                rows={2}
                value={f.subtitle}
                onChange={(e) => setField("subtitle", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={dividerCls} />

        <div>
          <p className={sectionHeadingCls}>Obsah stránky</p>
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Perex (zvýrazněný úvod v italics)</label>
              <textarea
                className={textareaCls}
                rows={3}
                value={f.perex}
                onChange={(e) => setField("perex", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>Odstavec 1</label>
              <textarea
                className={textareaCls}
                rows={3}
                value={f.p1}
                onChange={(e) => setField("p1", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>Odstavec 2</label>
              <textarea
                className={textareaCls}
                rows={3}
                value={f.p2}
                onChange={(e) => setField("p2", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>Odstavec 3</label>
              <textarea
                className={textareaCls}
                rows={3}
                value={f.p3}
                onChange={(e) => setField("p3", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={dividerCls} />

        <div>
          <p className={sectionHeadingCls}>Výhody (seznam)</p>
          <div>
            <label className={labelCls}>Každá výhoda na novém řádku</label>
            <textarea
              className={textareaCls}
              rows={8}
              value={f.benefits}
              onChange={(e) => setField("benefits", e.target.value)}
            />
          </div>
        </div>

        <div className={dividerCls} />

        <div>
          <p className={sectionHeadingCls}>CTA – výzva k akci</p>
          <div>
            <label className={labelCls}>Text nad tlačítkem "Nezávazná poptávka"</label>
            <input
              className={inputCls}
              value={f.cta}
              onChange={(e) => setField("cta", e.target.value)}
              placeholder="Např. Navrhněme osvětlení vaší kuchyně"
            />
          </div>
        </div>
      </div>

      {/* Save button */}
      <div className="flex items-center gap-4 pt-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 rounded text-sm font-medium transition-all disabled:opacity-50"
          style={{
            background: saving ? "rgba(201,168,76,0.4)" : "hsl(38 91% 55%)",
            color: "#080c12",
          }}
        >
          {saving ? "Ukládám…" : "Uložit stránku"}
        </button>
        {saved && (
          <span className="text-sm text-green-400">✓ Uloženo</span>
        )}
      </div>
    </div>
  )
}
