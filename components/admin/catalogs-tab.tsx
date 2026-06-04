"use client"

import { useQuery, useMutation, useConvex } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useState, useRef } from "react"

type Catalog = {
  _id: Id<"catalogs">
  title: string
  subtitle?: string
  description?: string
  pdfUrl: string
  coverUrl: string
  year?: string
  language?: string
  category?: string
  sortOrder: number
  published: boolean
}

type FormState = {
  title: string
  subtitle: string
  description: string
  pdfUrl: string
  coverUrl: string
  year: string
  language: string
  category: string
  sortOrder: string
  published: boolean
}

const defaultForm: FormState = {
  title: "",
  subtitle: "",
  description: "",
  pdfUrl: "",
  coverUrl: "",
  year: new Date().getFullYear().toString(),
  language: "CS",
  category: "",
  sortOrder: "0",
  published: true,
}

const inputCls = "w-full bg-[#0a0a0a] border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C9A84C]/50"
const labelCls = "block text-xs text-white/50 mb-1"

function UploadButton({
  accept,
  label,
  uploading,
  onFile,
}: {
  accept: string
  label: string
  uploading: boolean
  onFile: (file: File) => void
}) {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <>
      <input
        ref={ref}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onFile(file)
          e.target.value = ""
        }}
      />
      <button
        type="button"
        onClick={() => ref.current?.click()}
        disabled={uploading}
        className="px-3 py-1.5 text-xs bg-white/10 text-white/70 hover:bg-white/20 rounded transition-colors disabled:opacity-50 whitespace-nowrap"
      >
        {uploading ? "Nahrávám..." : label}
      </button>
    </>
  )
}

export default function CatalogsTab() {
  const catalogs = useQuery(api.catalogs.list)
  const seedCatalogs = useMutation(api.catalogs.seed)
  const createCatalog = useMutation(api.catalogs.create)
  const updateCatalog = useMutation(api.catalogs.update)
  const removeCatalog = useMutation(api.catalogs.remove)
  const generateUploadUrl = useMutation(api.files.generateUploadUrl)
  const convex = useConvex()

  const [editing, setEditing] = useState<Catalog | null>(null)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState<FormState>(defaultForm)
  const [saving, setSaving] = useState(false)
  const [seeding, setSeeding] = useState(false)
  const [uploading, setUploading] = useState<"pdf" | "cover" | null>(null)

  const uploadFile = async (file: File, field: "pdfUrl" | "coverUrl") => {
    const key = field === "pdfUrl" ? "pdf" : "cover"
    setUploading(key)
    try {
      const uploadUrl = await generateUploadUrl()
      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      })
      if (!res.ok) throw new Error("Upload selhal")
      const { storageId } = await res.json()
      const url = await convex.query(api.files.getUrl, { storageId })
      if (url) setForm((f) => ({ ...f, [field]: url }))
    } catch {
      alert("Nahrávání se nezdařilo, zkuste to znovu.")
    } finally {
      setUploading(null)
    }
  }

  const openCreate = () => {
    setForm({ ...defaultForm, sortOrder: String((catalogs?.length ?? 0)) })
    setEditing(null)
    setCreating(true)
  }

  const openEdit = (c: Catalog) => {
    setForm({
      title: c.title,
      subtitle: c.subtitle ?? "",
      description: c.description ?? "",
      pdfUrl: c.pdfUrl,
      coverUrl: c.coverUrl,
      year: c.year ?? "",
      language: c.language ?? "",
      category: c.category ?? "",
      sortOrder: String(c.sortOrder),
      published: c.published,
    })
    setEditing(c)
    setCreating(false)
  }

  const closeForm = () => {
    setEditing(null)
    setCreating(false)
  }

  const handleSave = async () => {
    if (!form.title.trim() || !form.pdfUrl.trim() || !form.coverUrl.trim()) {
      alert("Název, PDF a obálka jsou povinné.")
      return
    }
    setSaving(true)
    try {
      const payload = {
        title: form.title.trim(),
        subtitle: form.subtitle.trim() || undefined,
        description: form.description.trim() || undefined,
        pdfUrl: form.pdfUrl.trim(),
        coverUrl: form.coverUrl.trim(),
        year: form.year.trim() || undefined,
        language: form.language.trim() || undefined,
        category: form.category.trim() || undefined,
        sortOrder: parseInt(form.sortOrder) || 0,
        published: form.published,
      }
      if (editing) {
        await updateCatalog({ id: editing._id, ...payload })
      } else {
        await createCatalog(payload)
      }
      closeForm()
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (c: Catalog) => {
    if (!confirm(`Smazat katalog „${c.title}"?`)) return
    await removeCatalog({ id: c._id })
    if (editing?._id === c._id) closeForm()
  }

  const handleSeed = async () => {
    setSeeding(true)
    try { await seedCatalogs() } finally { setSeeding(false) }
  }

  const showForm = creating || editing !== null

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-medium text-white">Katalogy</h2>
          <p className="text-sm text-white/40 mt-1">Správa PDF katalogů ke stažení</p>
        </div>
        <div className="flex gap-3">
          {catalogs?.length === 0 && (
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
            + Přidat katalog
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* List */}
        <div className="space-y-3">
          {!catalogs && <p className="text-white/40 text-sm">Načítám...</p>}
          {catalogs?.length === 0 && (
            <p className="text-white/40 text-sm">Žádné katalogy. Klikněte na „Načíst výchozí data" nebo přidejte nový.</p>
          )}
          {catalogs?.map((c) => (
            <div
              key={c._id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                editing?._id === c._id
                  ? "border-[#C9A84C]/60 bg-[#C9A84C]/5"
                  : "border-white/10 hover:border-white/25 bg-white/2"
              }`}
              onClick={() => openEdit(c)}
            >
              <div className="flex items-start gap-3">
                {c.coverUrl && (
                  <img
                    src={c.coverUrl}
                    alt={c.title}
                    className="w-12 h-16 object-cover object-top rounded flex-shrink-0 border border-white/10"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-white truncate">{c.title}</span>
                    {!c.published && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-white/10 text-white/40 rounded">skryto</span>
                    )}
                  </div>
                  {c.subtitle && <p className="text-xs text-white/40 truncate">{c.subtitle}</p>}
                  <div className="flex gap-2 mt-1">
                    {c.year && <span className="text-[10px] text-white/30">{c.year}</span>}
                    {c.language && <span className="text-[10px] text-white/30">{c.language}</span>}
                    {c.category && <span className="text-[10px] text-[#C9A84C]/60">{c.category}</span>}
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(c) }}
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
              {creating ? "Nový katalog" : `Upravit: ${editing?.title}`}
            </h3>

            <div>
              <label className={labelCls}>Název *</label>
              <input className={inputCls} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="KLUŚ Aplikace 2026" />
            </div>

            <div>
              <label className={labelCls}>Podtitulek</label>
              <input className={inputCls} value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} placeholder="Folder Zastosowania" />
            </div>

            <div>
              <label className={labelCls}>Popis</label>
              <textarea className={inputCls + " resize-none"} rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Krátký popis obsahu katalogu..." />
            </div>

            <div>
              <label className={labelCls}>PDF soubor *</label>
              <div className="flex gap-2 items-center">
                <input className={inputCls} value={form.pdfUrl} onChange={(e) => setForm({ ...form, pdfUrl: e.target.value })} placeholder="URL nebo nahrajte soubor →" />
                <UploadButton
                  accept=".pdf,application/pdf"
                  label="Nahrát PDF"
                  uploading={uploading === "pdf"}
                  onFile={(f) => uploadFile(f, "pdfUrl")}
                />
              </div>
              {form.pdfUrl && (
                <a href={form.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[#C9A84C]/70 hover:text-[#C9A84C] mt-1 inline-block truncate max-w-full">
                  ↗ Otevřít PDF
                </a>
              )}
            </div>

            <div>
              <label className={labelCls}>Obálka (náhledový obrázek) *</label>
              <div className="flex gap-2 items-center">
                <input className={inputCls} value={form.coverUrl} onChange={(e) => setForm({ ...form, coverUrl: e.target.value })} placeholder="URL nebo nahrajte obrázek →" />
                <UploadButton
                  accept="image/*"
                  label="Nahrát obálku"
                  uploading={uploading === "cover"}
                  onFile={(f) => uploadFile(f, "coverUrl")}
                />
              </div>
              {form.coverUrl && (
                <img src={form.coverUrl} alt="náhled" className="mt-2 h-20 object-cover rounded border border-white/10" />
              )}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelCls}>Rok</label>
                <input className={inputCls} value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} placeholder="2026" />
              </div>
              <div>
                <label className={labelCls}>Jazyk</label>
                <input className={inputCls} value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })} placeholder="CS / EN" />
              </div>
              <div>
                <label className={labelCls}>Pořadí</label>
                <input className={inputCls} type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} />
              </div>
            </div>

            <div>
              <label className={labelCls}>Kategorie</label>
              <input className={inputCls} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Aplikace, Produktový katalog..." />
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
                disabled={saving || uploading !== null}
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
