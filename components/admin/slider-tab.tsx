"use client"

import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useState } from "react"

type SliderPair = {
  _id: Id<"sliderPairs">
  title: string
  beforeSrc: string
  afterSrc: string
  beforeAlt?: string
  afterAlt?: string
  beforeLabel?: string
  afterLabel?: string
  sortOrder: number
  published: boolean
}

type FormState = {
  title: string
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  afterAlt: string
  beforeLabel: string
  afterLabel: string
  sortOrder: string
  published: boolean
}

const defaultForm: FormState = {
  title: "",
  beforeSrc: "",
  afterSrc: "",
  beforeAlt: "",
  afterAlt: "",
  beforeLabel: "Před",
  afterLabel: "Po",
  sortOrder: "0",
  published: true,
}

const inputCls = "w-full bg-[#0a0a0a] border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C9A84C]/50"
const labelCls = "block text-xs text-white/50 mb-1"

export default function SliderTab() {
  const pairs = useQuery(api.sliderPairs.list)
  const seedPairs = useMutation(api.sliderPairs.seed)
  const createPair = useMutation(api.sliderPairs.create)
  const updatePair = useMutation(api.sliderPairs.update)
  const removePair = useMutation(api.sliderPairs.remove)

  const [editing, setEditing] = useState<SliderPair | null>(null)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState<FormState>(defaultForm)
  const [saving, setSaving] = useState(false)
  const [seeding, setSeeding] = useState(false)

  const openCreate = () => {
    setForm({ ...defaultForm, sortOrder: String(pairs?.length ?? 0) })
    setEditing(null)
    setCreating(true)
  }

  const openEdit = (p: SliderPair) => {
    setForm({
      title: p.title,
      beforeSrc: p.beforeSrc,
      afterSrc: p.afterSrc,
      beforeAlt: p.beforeAlt ?? "",
      afterAlt: p.afterAlt ?? "",
      beforeLabel: p.beforeLabel ?? "Před",
      afterLabel: p.afterLabel ?? "Po",
      sortOrder: String(p.sortOrder),
      published: p.published,
    })
    setEditing(p)
    setCreating(false)
  }

  const closeForm = () => {
    setEditing(null)
    setCreating(false)
  }

  const handleSave = async () => {
    if (!form.title.trim() || !form.beforeSrc.trim() || !form.afterSrc.trim()) {
      alert("Název, foto Před a foto Po jsou povinné.")
      return
    }
    setSaving(true)
    try {
      const payload = {
        title: form.title.trim(),
        beforeSrc: form.beforeSrc.trim(),
        afterSrc: form.afterSrc.trim(),
        beforeAlt: form.beforeAlt.trim() || undefined,
        afterAlt: form.afterAlt.trim() || undefined,
        beforeLabel: form.beforeLabel.trim() || undefined,
        afterLabel: form.afterLabel.trim() || undefined,
        sortOrder: parseInt(form.sortOrder) || 0,
        published: form.published,
      }
      if (editing) {
        await updatePair({ id: editing._id, ...payload })
      } else {
        await createPair(payload)
      }
      closeForm()
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (p: SliderPair) => {
    if (!confirm(`Smazat pár „${p.title}"?`)) return
    await removePair({ id: p._id })
    if (editing?._id === p._id) closeForm()
  }

  const handleSeed = async () => {
    setSeeding(true)
    try {
      await seedPairs()
    } finally {
      setSeeding(false)
    }
  }

  const showForm = creating || editing !== null

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-medium text-white">Před / Po slider</h2>
          <p className="text-sm text-white/40 mt-1">Správa párů fotek pro interaktivní before/after slider na hlavní stránce</p>
        </div>
        <div className="flex gap-3">
          {pairs?.length === 0 && (
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
            + Přidat pár
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* List */}
        <div className="space-y-3">
          {!pairs && <p className="text-white/40 text-sm">Načítám...</p>}
          {pairs?.length === 0 && (
            <p className="text-white/40 text-sm">Žádné páry. Klikněte na „Načíst výchozí data" nebo přidejte nový.</p>
          )}
          {pairs?.map((p) => (
            <div
              key={p._id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                editing?._id === p._id
                  ? "border-[#C9A84C]/60 bg-[#C9A84C]/5"
                  : "border-white/10 hover:border-white/25 bg-white/2"
              }`}
              onClick={() => openEdit(p)}
            >
              <div className="flex items-start gap-3">
                <div className="flex gap-1 flex-shrink-0">
                  {p.beforeSrc && (
                    <img src={p.beforeSrc} alt="před" className="w-10 h-10 object-cover rounded border border-white/10" />
                  )}
                  {p.afterSrc && (
                    <img src={p.afterSrc} alt="po" className="w-10 h-10 object-cover rounded border border-white/10" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white truncate">{p.title}</span>
                    {!p.published && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-white/10 text-white/40 rounded">skryto</span>
                    )}
                  </div>
                  <p className="text-xs text-white/30 mt-0.5">
                    {p.beforeLabel ?? "Před"} → {p.afterLabel ?? "Po"}
                  </p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(p) }}
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
          <div className="border border-white/10 rounded-lg p-6 bg-white/2 space-y-4">
            <h3 className="text-sm font-medium text-white mb-2">
              {creating ? "Nový pár" : `Upravit: ${editing?.title}`}
            </h3>

            <div>
              <label className={labelCls}>Nadpis páru *</label>
              <input className={inputCls} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Kancelářský prostor" />
            </div>

            <div>
              <label className={labelCls}>Foto PŘED (URL) *</label>
              <input className={inputCls} value={form.beforeSrc} onChange={(e) => setForm({ ...form, beforeSrc: e.target.value })} placeholder="https://..." />
              {form.beforeSrc && (
                <img src={form.beforeSrc} alt="před" className="mt-2 h-20 w-full object-cover rounded border border-white/10" />
              )}
            </div>

            <div>
              <label className={labelCls}>Foto PO (URL) *</label>
              <input className={inputCls} value={form.afterSrc} onChange={(e) => setForm({ ...form, afterSrc: e.target.value })} placeholder="https://..." />
              {form.afterSrc && (
                <img src={form.afterSrc} alt="po" className="mt-2 h-20 w-full object-cover rounded border border-white/10" />
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Popisek PŘED</label>
                <input className={inputCls} value={form.beforeLabel} onChange={(e) => setForm({ ...form, beforeLabel: e.target.value })} placeholder="Před" />
              </div>
              <div>
                <label className={labelCls}>Popisek PO</label>
                <input className={inputCls} value={form.afterLabel} onChange={(e) => setForm({ ...form, afterLabel: e.target.value })} placeholder="BE-LIGHT LED" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Alt text PŘED</label>
                <input className={inputCls} value={form.beforeAlt} onChange={(e) => setForm({ ...form, beforeAlt: e.target.value })} placeholder="Popis pro SEO" />
              </div>
              <div>
                <label className={labelCls}>Alt text PO</label>
                <input className={inputCls} value={form.afterAlt} onChange={(e) => setForm({ ...form, afterAlt: e.target.value })} placeholder="Popis pro SEO" />
              </div>
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
