"use client"

import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useState, useEffect } from "react"

const inputCls = "w-full bg-[#0a0a0a] border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C9A84C]/50"
const textareaCls = inputCls + " resize-none"
const labelCls = "block text-xs text-white/50 mb-1"
const sectionHeadingCls = "text-base font-medium text-white mb-4 pt-2"
const dividerCls = "border-t border-white/8 my-6"

const DEFAULT_CONTENT: Record<string, string> = {
  hero_eyebrow: "LED Lighting Solutions",
  hero_headline_1: "Světlo, které",
  hero_headline_2: "mění prostor.",
  hero_subtext: "Prémiové LED osvětlení – od prodeje a návrhu až po kompletní realizaci. Komerční i rezidenční projekty po celé ČR a SR.",
  about_eyebrow: "O společnosti",
  about_headline_1: "Jsme experti",
  about_headline_2: "na světlo.",
  about_p1: "BE-LIGHT je česká firma s více než 10 lety zkušeností v oblasti LED osvětlení. Specializujeme se na komplexní osvětlení na míru a spolupracujeme s architekty, designéry i stavebními firmami v ČR i na Slovensku.",
  about_p2: "Od prvního návrhu až po finální instalaci — jsme s vámi na každém kroku. Jsme officiálním distributorem značky KLUŚ pro Českou republiku — předního evropského výrobce prémiových LED lišt a designového osvětlení.",
  about_p3: "Produkty si můžete prohlédnout osobně v našich showroomech v Brně a Ostravě.",
  value_01_title: "Návrh na míru",
  value_01_desc: "Každý projekt začíná konzultací a přesným porozuměním vašim potřebám. Navrhujeme osvětlení přesně pro váš prostor.",
  value_02_title: "Zakázková výroba",
  value_02_desc: "Vlastní výroba LED osvětlení na míru — od nestandardních délek a tvarů po speciální barevné teploty a výkony. Tam, kde hotové řešení nestačí.",
  value_03_title: "Komplexní realizace",
  value_03_desc: "Zajišťujeme vše od dodávky až po odbornou instalaci v ČR i SR. Servis a podpora i po dokončení projektu.",
  value_04_title: "Světlo, které si zkusíte",
  value_04_desc: "Brno i Ostrava — dvě světelná studia, kde osvětlení přestane být abstrakcí. Porovnejte barevné teploty, vyzkoušejte profily, poraďte se s expertem.",
  value_05_title: "Distributor KLUŚ",
  value_05_desc: "Jsme oficiálním distributorem značky KLUŚ pro ČR — předního evropského výrobce prémiových LED lišt, profilů a designových svítidel.",
  social_facebook: "https://www.facebook.com/share/1Ef4U8TMHd/?mibextid=wwXIfr",
  social_instagram: "https://www.instagram.com/be_light_cz?igsh=cnAzM25oODc3dWhl",
  social_youtube: "https://www.youtube.com/@ledshopik_CZ",
  social_linkedin: "https://www.linkedin.com/company/be-light-led/",
  banner_title: "Navštivte náš e-shop",
  banner_description: "Tisíce produktů prémiového LED osvětlení skladem. Lišty, profily, svítidla a příslušenství KLUŚ design.",
  banner_link_text: "Přejít na ledshopik.cz",
  banner_link_url: "https://ledshopik.cz",
}

type Section = "hero" | "about" | "values" | "social" | "banner"

export default function ContentTab() {
  const settingsList = useQuery(api.settings.list)
  const setBulk = useMutation(api.settings.setBulk)

  const [activeSection, setActiveSection] = useState<Section>("hero")
  const [form, setForm] = useState<Record<string, string>>(DEFAULT_CONTENT)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  // Merge DB values into form when loaded
  useEffect(() => {
    if (!settingsList) return
    const merged: Record<string, string> = { ...DEFAULT_CONTENT }
    for (const { key, value } of settingsList) {
      if (key in DEFAULT_CONTENT) {
        merged[key] = value
      }
    }
    setForm(merged)
  }, [settingsList])

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }))

  const handleSave = async () => {
    setSaving(true)
    try {
      const settings = Object.entries(form)
        .filter(([key]) => key in DEFAULT_CONTENT)
        .map(([key, value]) => ({ key, value }))
      await setBulk({ settings })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } finally {
      setSaving(false)
    }
  }

  const sections: { id: Section; label: string }[] = [
    { id: "hero", label: "Hero sekce" },
    { id: "about", label: "O nás" },
    { id: "values", label: "Hodnoty (01–05)" },
    { id: "social", label: "Sociální sítě" },
    { id: "banner", label: "Banner e-shop" },
  ]

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-medium text-white">Obsah webu</h2>
          <p className="text-sm text-white/40 mt-1">Editace textů hlavní stránky – hero, o nás, hodnoty, sociální sítě, banner</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2 text-sm bg-[#C9A84C] text-[#0a0a0a] rounded hover:bg-[#d4b568] transition-colors font-medium disabled:opacity-50"
        >
          {saved ? "✓ Uloženo" : saving ? "Ukládám..." : "Uložit změny"}
        </button>
      </div>

      <div className="flex gap-6">
        {/* Section nav */}
        <nav className="flex-shrink-0 w-40 space-y-1">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-all ${
                activeSection === s.id
                  ? "bg-[#C9A84C]/15 text-[#C9A84C]"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>

        {/* Form area */}
        <div className="flex-1 border border-white/10 rounded-lg p-6 bg-white/2 space-y-4">

          {activeSection === "hero" && (
            <>
              <p className={sectionHeadingCls}>Hero sekce</p>
              <div>
                <label className={labelCls}>Horní popisek (nad nadpisem)</label>
                <input className={inputCls} value={form.hero_eyebrow} onChange={(e) => set("hero_eyebrow", e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Nadpis – řádek 1</label>
                  <input className={inputCls} value={form.hero_headline_1} onChange={(e) => set("hero_headline_1", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Nadpis – řádek 2 (zlatý)</label>
                  <input className={inputCls} value={form.hero_headline_2} onChange={(e) => set("hero_headline_2", e.target.value)} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Podnadpis (popisek pod nadpisem)</label>
                <textarea className={textareaCls} rows={3} value={form.hero_subtext} onChange={(e) => set("hero_subtext", e.target.value)} />
              </div>
            </>
          )}

          {activeSection === "about" && (
            <>
              <p className={sectionHeadingCls}>O nás</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Horní popisek</label>
                  <input className={inputCls} value={form.about_eyebrow} onChange={(e) => set("about_eyebrow", e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Nadpis – řádek 1</label>
                  <input className={inputCls} value={form.about_headline_1} onChange={(e) => set("about_headline_1", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Nadpis – řádek 2 (kurzíva)</label>
                  <input className={inputCls} value={form.about_headline_2} onChange={(e) => set("about_headline_2", e.target.value)} />
                </div>
              </div>
              <div className={dividerCls} />
              <div>
                <label className={labelCls}>Odstavec 1</label>
                <textarea className={textareaCls} rows={3} value={form.about_p1} onChange={(e) => set("about_p1", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Odstavec 2</label>
                <textarea className={textareaCls} rows={3} value={form.about_p2} onChange={(e) => set("about_p2", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Odstavec 3</label>
                <textarea className={textareaCls} rows={2} value={form.about_p3} onChange={(e) => set("about_p3", e.target.value)} />
              </div>
            </>
          )}

          {activeSection === "values" && (
            <>
              <p className={sectionHeadingCls}>Hodnoty a klíčové body (01–05)</p>
              {(["01", "02", "03", "04", "05"] as const).map((num) => (
                <div key={num} className="space-y-2 pb-4 border-b border-white/8 last:border-0">
                  <p className="text-xs text-[#C9A84C]/70 font-mono">{num}</p>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-1">
                      <label className={labelCls}>Nadpis</label>
                      <input className={inputCls} value={form[`value_${num}_title`]} onChange={(e) => set(`value_${num}_title`, e.target.value)} />
                    </div>
                    <div className="col-span-2">
                      <label className={labelCls}>Popis</label>
                      <textarea className={textareaCls} rows={2} value={form[`value_${num}_desc`]} onChange={(e) => set(`value_${num}_desc`, e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {activeSection === "social" && (
            <>
              <p className={sectionHeadingCls}>Sociální sítě</p>
              {[
                { key: "social_facebook", label: "Facebook URL" },
                { key: "social_instagram", label: "Instagram URL" },
                { key: "social_youtube", label: "YouTube URL" },
                { key: "social_linkedin", label: "LinkedIn URL" },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className={labelCls}>{label}</label>
                  <input className={inputCls} value={form[key]} onChange={(e) => set(key, e.target.value)} placeholder="https://..." />
                </div>
              ))}
            </>
          )}

          {activeSection === "banner" && (
            <>
              <p className={sectionHeadingCls}>Banner – odkaz na e-shop</p>
              <div>
                <label className={labelCls}>Nadpis banneru</label>
                <input className={inputCls} value={form.banner_title} onChange={(e) => set("banner_title", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Popis banneru</label>
                <textarea className={textareaCls} rows={2} value={form.banner_description} onChange={(e) => set("banner_description", e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Text tlačítka</label>
                  <input className={inputCls} value={form.banner_link_text} onChange={(e) => set("banner_link_text", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>URL odkazu</label>
                  <input className={inputCls} value={form.banner_link_url} onChange={(e) => set("banner_link_url", e.target.value)} placeholder="https://ledshopik.cz" />
                </div>
              </div>
            </>
          )}

          <div className="pt-4 border-t border-white/8">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 bg-[#C9A84C] text-[#0a0a0a] text-sm font-medium rounded hover:bg-[#d4b568] transition-colors disabled:opacity-50"
            >
              {saved ? "✓ Uloženo" : saving ? "Ukládám..." : "Uložit změny"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
