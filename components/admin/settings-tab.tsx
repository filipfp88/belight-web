"use client"

import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useState, useEffect } from "react"

// Known settings keys with labels and descriptions
const KNOWN_SETTINGS = [
  {
    section: "Kontaktní informace",
    description: "Zobrazuje se v sekci Kontakt na webu – telefon, email a pracovní doba.",
    keys: [
      { key: "contact_phone", label: "Telefon", placeholder: "+420 792 319 348", description: "Telefonní číslo včetně předvolby. Příklad: +420 792 319 348" },
      { key: "contact_email", label: "Email", placeholder: "info@belight.cz", description: "Email zobrazený na webu – zákazníci na něj mohou psát." },
      { key: "contact_hours", label: "Pracovní hodiny", placeholder: "Po–Pá 8–16 hod", description: "Kdy jste dostupní na telefonu. Zobrazí se pod telefonním číslem." },
    ],
  },
  {
    section: "Sociální sítě",
    description: "Odkazy na vaše profily zobrazené v patičce a kontaktní sekci. Pokud některý nemáte, nechejte prázdné.",
    keys: [
      { key: "social_instagram", label: "Instagram", placeholder: "https://instagram.com/be_light_cz", description: "Celá URL adresa vašeho Instagram profilu. Příklad: https://instagram.com/be_light_cz" },
      { key: "social_facebook", label: "Facebook", placeholder: "https://facebook.com/belightcz", description: "Celá URL adresa vaší Facebook stránky. Příklad: https://facebook.com/belightcz" },
      { key: "social_youtube", label: "YouTube", placeholder: "https://youtube.com/@belightcz", description: "Celá URL adresa vašeho YouTube kanálu. Příklad: https://youtube.com/@belightcz" },
    ],
  },
  {
    section: "Texty na webu",
    description: "Hlavní texty zobrazené na úvodní stránce.",
    keys: [
      { key: "hero_headline_1", label: "Hlavní nadpis – 1. část", placeholder: "Světlo, které", description: "První část velkého nadpisu na úvodní stránce. Příklad: Světlo, které" },
      { key: "hero_headline_2", label: "Hlavní nadpis – 2. část (zlatá kurzíva)", placeholder: "mění prostor.", description: "Druhá část nadpisu – zobrazí se zlatě a kurzívou. Příklad: mění prostor." },
      { key: "hero_subtext", label: "Podnadpis", placeholder: "Prémiové LED osvětlení – od prodeje a návrhu až po kompletní realizaci.", description: "Menší text pod hlavním nadpisem." },
      { key: "banner_title", label: "Nadpis banneru (e-shop)", placeholder: "Hledáte konkrétní LED produkt?", description: "Nadpis zlatého banneru odkazujícího na e-shop." },
      { key: "banner_description", label: "Text banneru (e-shop)", placeholder: "V našem e-shopu LedShopik najdete stovky prémiových LED svítidel...", description: "Popis v zlatém banneru pod nadpisem." },
      { key: "banner_link_url", label: "URL e-shopu", placeholder: "https://ledshopik.cz", description: "Adresa e-shopu, na kterou banner odkazuje. Příklad: https://ledshopik.cz" },
    ],
  },
]

export default function SettingsTab() {
  const settings = useQuery(api.settings.list)
  const setSetting = useMutation(api.settings.set)
  const setBulk = useMutation(api.settings.setBulk)

  // Whitelist
  const whitelist = useQuery(api.adminWhitelist.list)
  const addToWhitelist = useMutation(api.adminWhitelist.add)
  const removeFromWhitelist = useMutation(api.adminWhitelist.remove)
  const [newEmail, setNewEmail] = useState("")
  const [newNote, setNewNote] = useState("")
  const [addingEmail, setAddingEmail] = useState(false)

  const [values, setValues] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState<Record<string, boolean>>({})
  const [saved, setSaved] = useState<Record<string, boolean>>({})
  const [customKey, setCustomKey] = useState("")
  const [customValue, setCustomValue] = useState("")
  const [customSaving, setCustomSaving] = useState(false)
  const [seeding, setSeeding] = useState(false)

  const DEFAULT_VALUES: Record<string, string> = {
    contact_phone: "+420 792 319 348",
    contact_email: "info@belight.cz",
    contact_hours: "Po–Pá 8–16 hod",
    social_instagram: "https://www.instagram.com/be_light_cz",
    social_facebook: "https://www.facebook.com/share/1Ef4U8TMHd/",
    social_youtube: "https://www.youtube.com/@ledshopik_CZ",
    hero_headline_1: "Světlo, které",
    hero_headline_2: "mění prostor.",
    hero_subtext: "Prémiové LED osvětlení – od prodeje a návrhu až po kompletní realizaci. Komerční i rezidenční projekty po celé ČR a SR.",
    banner_title: "Hledáte konkrétní LED produkt?",
    banner_description: "V našem e-shopu LedShopik najdete stovky prémiových LED svítidel, lišt a příslušenství s dopravou po celé ČR i SR.",
    banner_link_url: "https://ledshopik.cz",
  }

  async function handleSeedDefaults() {
    setSeeding(true)
    try {
      const toSeed = Object.entries(DEFAULT_VALUES)
        .filter(([key]) => !values[key])
        .map(([key, value]) => ({ key, value }))
      if (toSeed.length > 0) {
        await setBulk({ settings: toSeed })
      }
    } catch (err) {
      console.log("[settings-tab] seed error:", err)
    } finally {
      setSeeding(false)
    }
  }

  // Initialize form values from DB
  useEffect(() => {
    if (!settings) return
    const map: Record<string, string> = {}
    settings.forEach((s) => { map[s.key] = s.value })
    setValues(map)
  }, [settings])

  async function handleSave(key: string) {
    setSaving((s) => ({ ...s, [key]: true }))
    try {
      await setSetting({ key, value: values[key] ?? "" })
      setSaved((s) => ({ ...s, [key]: true }))
      setTimeout(() => setSaved((s) => ({ ...s, [key]: false })), 2000)
    } catch (err) {
      console.log("[settings-tab] save error:", err)
    } finally {
      setSaving((s) => ({ ...s, [key]: false }))
    }
  }

  async function handleAddEmail() {
    if (!newEmail.trim()) return
    setAddingEmail(true)
    try {
      await addToWhitelist({ email: newEmail.trim().toLowerCase(), note: newNote.trim() || undefined })
      setNewEmail("")
      setNewNote("")
    } catch (err) {
      console.log("[settings-tab] whitelist add error:", err)
    } finally {
      setAddingEmail(false)
    }
  }

  async function handleSaveCustom() {
    if (!customKey.trim() || !customValue.trim()) return
    setCustomSaving(true)
    try {
      await setSetting({ key: customKey.trim(), value: customValue.trim() })
      setCustomKey("")
      setCustomValue("")
    } catch (err) {
      console.log("[settings-tab] custom save error:", err)
    } finally {
      setCustomSaving(false)
    }
  }

  const unknownSettings = settings?.filter(
    (s) => !KNOWN_SETTINGS.flatMap((g) => g.keys).some((k) => k.key === s.key)
  ) ?? []

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-light text-white">Nastavení webu</h1>
        <p className="text-white/40 text-sm mt-1">Kontakty, texty a konfigurace webu</p>
        {settings !== undefined && (
          <div className="mt-4 p-4 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-lg flex items-start gap-3">
            <span className="text-[#C9A84C] text-lg mt-0.5">💡</span>
            <div className="flex-1">
              <p className="text-white/70 text-sm">Předvyplnit pole aktuálními hodnotami z webu</p>
              <p className="text-white/40 text-xs mt-0.5">Prázdná pole se doplní výchozími hodnotami. Již vyplněná pole zůstanou beze změny.</p>
            </div>
            <button
              onClick={handleSeedDefaults}
              disabled={seeding}
              className="px-4 py-2 bg-[#C9A84C] text-[#0a0a0a] text-sm font-medium rounded-lg hover:brightness-110 transition-all disabled:opacity-50 flex-shrink-0"
            >
              {seeding ? "Načítám…" : "Předvyplnit"}
            </button>
          </div>
        )}
      </div>

      {settings === undefined ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-10">
          {KNOWN_SETTINGS.map((group) => (
            <div key={group.section}>
              <div className="mb-4">
                <h2 className="text-white/50 text-xs uppercase tracking-widest">{group.section}</h2>
                {group.description && (
                  <p className="text-white/30 text-xs mt-1">{group.description}</p>
                )}
              </div>
              <div className="space-y-5">
                {group.keys.map(({ key, label, placeholder, description }) => (
                  <div key={key}>
                    <label className="text-white/70 text-sm font-medium mb-1 block">{label}</label>
                    {description && (
                      <p className="text-white/30 text-xs mb-1.5">{description}</p>
                    )}
                    <div className="flex items-center gap-3">
                      <input
                        value={values[key] ?? ""}
                        onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
                        onKeyDown={(e) => { if (e.key === "Enter") handleSave(key) }}
                        className={`${inputClass} flex-1`}
                        placeholder={placeholder}
                      />
                      <button
                        onClick={() => handleSave(key)}
                        disabled={saving[key]}
                        className={`px-4 py-2.5 text-xs rounded-lg transition-all flex-shrink-0 ${
                          saved[key]
                            ? "bg-green-900/30 text-green-400"
                            : "bg-white/8 text-white/50 hover:bg-white/12 hover:text-white"
                        } disabled:opacity-50`}
                      >
                        {saved[key] ? "✓ Uloženo" : saving[key] ? "…" : "Uložit"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Unknown/custom settings */}
          {unknownSettings.length > 0 && (
            <div>
              <h2 className="text-white/50 text-xs uppercase tracking-widest mb-4">Vlastní nastavení</h2>
              <div className="space-y-2">
                {unknownSettings.map((s) => (
                  <div key={s._id} className="flex items-center gap-3 p-3 bg-white/3 border border-white/8 rounded-lg">
                    <span className="text-white/50 text-xs font-mono flex-shrink-0">{s.key}</span>
                    <span className="text-white/70 text-sm flex-1 truncate">{s.value}</span>
                    <button
                      onClick={() => {
                        setCustomKey(s.key)
                        setCustomValue(s.value)
                      }}
                      className="text-xs text-white/30 hover:text-white/60 transition-colors"
                    >
                      Editovat
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Admin access whitelist */}
          <div>
            <div className="mb-4">
              <h2 className="text-white/50 text-xs uppercase tracking-widest">Přístup do adminu</h2>
              <p className="text-white/30 text-xs mt-1">
                Všechny emaily s doménou <span className="text-white/60 font-mono">@ledshopik.cz</span> mají přístup automaticky.
                Pokud chcete dát přístup někomu s jiným emailem (např. <span className="text-white/60 font-mono">jmeno@gmail.com</span>), přidejte ho zde.
              </p>
            </div>

            <div className="space-y-2 mb-4">
              {whitelist === undefined && (
                <div className="flex items-center gap-2 py-4">
                  <div className="w-4 h-4 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              {whitelist?.length === 0 && (
                <p className="text-white/20 text-sm py-2 italic">Zatím žádné externí emaily</p>
              )}
              {whitelist?.map((entry) => (
                <div key={entry._id} className="flex items-center gap-3 p-3 bg-white/3 border border-white/8 rounded-lg">
                  <span className="text-white/80 text-sm flex-1">{entry.email}</span>
                  {entry.note && <span className="text-white/30 text-xs">{entry.note}</span>}
                  <button
                    onClick={() => removeFromWhitelist({ id: entry._id as Id<"adminWhitelist"> })}
                    className="text-xs text-red-400/50 hover:text-red-400 transition-colors"
                  >
                    Odebrat
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-3 p-4 bg-white/3 border border-white/8 rounded-lg">
              <p className="text-white/40 text-xs font-medium uppercase tracking-wider">Přidat nový email</p>
              <div>
                <label className="text-white/50 text-xs mb-1 block">Email adresa</label>
                <input
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleAddEmail() }}
                  className={inputClass}
                  placeholder="jmeno@gmail.com"
                  type="email"
                />
              </div>
              <div>
                <label className="text-white/50 text-xs mb-1 block">Poznámka <span className="text-white/25">(nepovinné – pro vaši orientaci, např. „Jan Novák – grafik")</span></label>
                <input
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className={inputClass}
                  placeholder="Jan Novák – grafik"
                />
              </div>
              <button
                onClick={handleAddEmail}
                disabled={addingEmail || !newEmail.trim()}
                className="w-full px-4 py-2.5 bg-[#C9A84C] text-[#0a0a0a] text-sm font-medium rounded-lg hover:brightness-110 transition-all disabled:opacity-50"
              >
                {addingEmail ? "Přidávám…" : "Přidat email"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const inputClass =
  "w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#C9A84C]/60 transition-colors"
