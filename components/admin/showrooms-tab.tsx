"use client"

import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useState } from "react"

type Showroom = {
  _id: Id<"showrooms">
  city: string
  label?: string
  address: string
  zip?: string
  hours: string[]
  phone?: string
  email?: string
  mapsUrl?: string
  img?: string
  sortOrder: number
  published: boolean
}

type FormState = {
  city: string
  label: string
  address: string
  zip: string
  hours: string
  phone: string
  email: string
  mapsUrl: string
  img: string
  sortOrder: string
  published: boolean
}

const defaultForm: FormState = {
  city: "",
  label: "Prodejna, showroom",
  address: "",
  zip: "",
  hours: "Po–Pá: 8:00–16:00\nSo–Ne: Zavřeno",
  phone: "",
  email: "",
  mapsUrl: "",
  img: "",
  sortOrder: "0",
  published: true,
}

const inputCls = "w-full bg-[#0a0a0a] border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C9A84C]/50"
const labelCls = "block text-xs text-white/50 mb-1"

export default function ShowroomsTab() {
  const showrooms = useQuery(api.showrooms.list)
  const seedShowrooms = useMutation(api.showrooms.seed)
  const createShowroom = useMutation(api.showrooms.create)
  const updateShowroom = useMutation(api.showrooms.update)
  const removeShowroom = useMutation(api.showrooms.remove)

  const [editing, setEditing] = useState<Showroom | null>(null)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState<FormState>(defaultForm)
  const [saving, setSaving] = useState(false)
  const [seeding, setSeeding] = useState(false)

  const openCreate = () => {
    setForm({ ...defaultForm, sortOrder: String(showrooms?.length ?? 0) })
    setEditing(null)
    setCreating(true)
  }

  const openEdit = (s: Showroom) => {
    setForm({
      city: s.city,
      label: s.label ?? "",
      address: s.address,
      zip: s.zip ?? "",
      hours: s.hours.join("\n"),
      phone: s.phone ?? "",
      email: s.email ?? "",
      mapsUrl: s.mapsUrl ?? "",
      img: s.img ?? "",
      sortOrder: String(s.sortOrder),
      published: s.published,
    })
    setEditing(s)
    setCreating(false)
  }

  const closeForm = () => {
    setEditing(null)
    setCreating(false)
  }

  const handleSave = async () => {
    if (!form.city.trim() || !form.address.trim()) {
      alert("Město a adresa jsou povinné.")
      return
    }
    setSaving(true)
    try {
      const hoursArr = form.hours
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
      const payload = {
        city: form.city.trim(),
        label: form.label.trim() || undefined,
        address: form.address.trim(),
        zip: form.zip.trim() || undefined,
        hours: hoursArr,
        phone: form.phone.trim() || undefined,
        email: form.email.trim() || undefined,
        mapsUrl: form.mapsUrl.trim() || undefined,
        img: form.img.trim() || undefined,
        sortOrder: parseInt(form.sortOrder) || 0,
        published: form.published,
      }
      if (editing) {
        await updateShowroom({ id: editing._id, ...payload })
      } else {
        await createShowroom(payload)
      }
      closeForm()
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (s: Showroom) => {
    if (!confirm(`Smazat showroom „${s.city}"?`)) return
    await removeShowroom({ id: s._id })
    if (editing?._id === s._id) closeForm()
  }

  const handleSeed = async () => {
    setSeeding(true)
    try {
      await seedShowrooms()
    } finally {
      setSeeding(false)
    }
  }

  const showForm = creating || editing !== null

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-medium text-white">Showroomy</h2>
          <p className="text-sm text-white/40 mt-1">Správa kontaktních karet showroomů a prodejních míst</p>
        </div>
        <div className="flex gap-3">
          {showrooms?.length === 0 && (
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="px-4 py-2 text-sm border border-white/20 text-white/60 hover:text-white hover:border-white/40 rounded transition-all disabled:opacity-50"
            >
              {seeding ? "Načítám..." : "Načíst výchozí data"}
            </button>
          )}
          <button
            onClick={openCreate}
            className="px-4 py-2 text-sm bg-[#C9A84C] text-[#0a0a0a] rounded hover:bg-[#d4b568] transition-colors font-medium"
          >
            + Přidat showroom
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* List */}
        <div className="space-y-3">
          {!showrooms && <p className="text-white/40 text-sm">Načítám...</p>}
          {showrooms?.length === 0 && (
            <p className="text-white/40 text-sm">Žádné showroomy. Klikněte na „Načíst výchozí data" nebo přidejte nový.</p>
          )}
          {showrooms?.map((s) => (
            <div
              key={s._id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                editing?._id === s._id
                  ? "border-[#C9A84C]/60 bg-[#C9A84C]/5"
                  : "border-white/10 hover:border-white/25 bg-white/2"
              }`}
              onClick={() => openEdit(s)}
            >
              <div className="flex items-start gap-3">
                {s.img && (
                  <img src={s.img} alt={s.city} className="w-14 h-10 object-cover rounded border border-white/10 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium text-white">{s.city}</span>
                    {s.label && <span className="text-[10px] text-white/30">{s.label}</span>}
                    {!s.published && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-white/10 text-white/40 rounded">skryto</span>
                    )}
                  </div>
                  <p className="text-xs text-white/40 truncate">{s.address}</p>
                  {s.phone && <p className="text-xs text-white/30">{s.phone}</p>}
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(s) }}
                  className="text-white/20 hover:text-red-400 transition-colors text-lg leading-none flex-shrink-0"
                  title="Smazat"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        {showForm && (
          <div className="border border-white/10 rounded-lg p-6 bg-white/2 space-y-4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-sm font-medium text-white mb-2">
              {creating ? "Nový showroom" : `Upravit: ${editing?.city}`}
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Město *</label>
                <input className={inputCls} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Brno" />
              </div>
              <div>
                <label className={labelCls}>Popis místa</label>
                <input className={inputCls} value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="Prodejna, showroom" />
              </div>
            </div>

            <div>
              <label className={labelCls}>Adresa *</label>
              <input className={inputCls} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Bohunická 50 – Areál SKANSKA" />
            </div>

            <div>
              <label className={labelCls}>PSČ a město</label>
              <input className={inputCls} value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} placeholder="619 00 Brno" />
            </div>

            <div>
              <label className={labelCls}>Otevírací hodiny <span className="text-white/25">(každá řádka = jeden řádek)</span></label>
              <textarea
                className={inputCls + " resize-none"}
                rows={4}
                value={form.hours}
                onChange={(e) => setForm({ ...form, hours: e.target.value })}
                placeholder={"Po–Čt: 8:00–16:00\nPá: 8:00–15:00\nSo–Ne: Zavřeno"}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Telefon</label>
                <input className={inputCls} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+420 792 319 348" />
              </div>
              <div>
                <label className={labelCls}>E-mail</label>
                <input className={inputCls} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="info@belight.cz" />
              </div>
            </div>

            <div>
              <label className={labelCls}>Odkaz Google Maps</label>
              <input className={inputCls} value={form.mapsUrl} onChange={(e) => setForm({ ...form, mapsUrl: e.target.value })} placeholder="https://maps.google.com/..." />
            </div>

            <div>
              <label className={labelCls}>Foto showroomu (URL z Macaly Assets)</label>
              <input className={inputCls} value={form.img} onChange={(e) => setForm({ ...form, img: e.target.value })} placeholder="https://assets.macaly-user-data.dev/..." />
              {form.img && (
                <img src={form.img} alt="náhled" className="mt-2 h-20 w-full object-cover rounded border border-white/10" />
              )}
            </div>

            <div>
              <label className={labelCls}>Pořadí</label>
              <input className={inputCls} type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setForm({ ...form, published: !form.published })}
                className={`w-10 h-5 rounded-full transition-colors relative ${form.published ? "bg-[#C9A84C]" : "bg-white/15"}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${form.published ? "left-5" : "left-0.5"}`} />
              </button>
              <span className="text-sm text-white/60">{form.published ? "Zveřejněno" : "Skryto"}</span>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 py-2 bg-[#C9A84C] text-[#0a0a0a] text-sm font-medium rounded hover:bg-[#d4b568] transition-colors disabled:opacity-50"
              >
                {saving ? "Ukládám..." : "Uložit"}
              </button>
              <button
                onClick={closeForm}
                className="px-4 py-2 border border-white/10 text-white/60 text-sm rounded hover:border-white/30 transition-colors"
              >
                Zrušit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
