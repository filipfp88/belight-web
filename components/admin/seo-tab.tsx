"use client"

import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useState } from "react"

type SeoEntry = {
  _id: Id<"seoMeta">
  path: string
  title: string
  description: string
  ogImage?: string
}

type FormState = {
  path: string
  title: string
  description: string
  ogImage: string
}

const defaultForm: FormState = { path: "", title: "", description: "", ogImage: "" }

// Predefined paths for quick access
const QUICK_PATHS = [
  { path: "/", label: "Domovská stránka" },
  { path: "/realizace", label: "Realizace (přehled)" },
  { path: "/realizace/barcelo-hotel", label: "Barcelo Hotel" },
  { path: "/realizace/barbershop-profil-ostrava", label: "Barbershop PROFIL" },
  { path: "/realizace/anybody-hotel-brno", label: "Anybody Hotel Brno" },
  { path: "/realizace/zahradni-osvetleni-jezirkem-brno", label: "Zahradní osvětlení s jezírkem" },
]

export default function SeoTab() {
  const entries = useQuery(api.seoMeta.list)
  const upsertMeta = useMutation(api.seoMeta.upsert)
  const removeMeta = useMutation(api.seoMeta.remove)

  const [editing, setEditing] = useState<SeoEntry | null>(null)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState<FormState>(defaultForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  function openCreate(prefillPath = "") {
    setForm({ ...defaultForm, path: prefillPath })
    setCreating(true)
    setEditing(null)
    setError("")
  }

  function openEdit(e: SeoEntry) {
    setForm({
      path: e.path,
      title: e.title,
      description: e.description,
      ogImage: e.ogImage ?? "",
    })
    setEditing(e)
    setCreating(false)
    setError("")
  }

  function cancel() {
    setEditing(null)
    setCreating(false)
    setError("")
  }

  async function handleSave() {
    setSaving(true)
    setError("")
    try {
      await upsertMeta({
        path: form.path.trim(),
        title: form.title.trim(),
        description: form.description.trim(),
        ogImage: form.ogImage.trim() || undefined,
      })
      cancel()
    } catch (err: unknown) {
      console.log("[seo-tab] save error:", err)
      setError(err instanceof Error ? err.message : "Chyba při ukládání")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: Id<"seoMeta">, path: string) {
    if (!confirm(`Smazat SEO metadata pro "${path}"?`)) return
    try {
      await removeMeta({ id })
    } catch (err) {
      console.log("[seo-tab] delete error:", err)
    }
  }

  const showForm = creating || !!editing
  const existingPaths = new Set(entries?.map((e) => e.path) ?? [])
  const missingPaths = QUICK_PATHS.filter((p) => !existingPaths.has(p.path))

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light text-white">SEO metadata</h1>
          <p className="text-white/40 text-sm mt-1">Title, description a OG image pro každou stránku</p>
        </div>
        <button
          onClick={() => openCreate()}
          className="px-4 py-2 bg-[#C9A84C] text-[#0a0a0a] text-sm font-medium rounded-lg hover:brightness-110 transition-all"
        >
          + Přidat stránku
        </button>
      </div>

      {/* Quick add missing paths */}
      {missingPaths.length > 0 && !showForm && (
        <div className="mb-8 p-4 bg-amber-900/20 border border-amber-500/20 rounded-xl">
          <p className="text-amber-400/80 text-sm mb-3">Stránky bez SEO metadat:</p>
          <div className="flex flex-wrap gap-2">
            {missingPaths.map((p) => (
              <button
                key={p.path}
                onClick={() => openCreate(p.path)}
                className="px-3 py-1.5 bg-amber-900/30 text-amber-400/80 text-xs rounded-lg hover:bg-amber-900/50 transition-all font-mono"
              >
                + {p.path}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-white font-light text-lg mb-4">
            {creating ? "Nová stránka" : `Editace: ${editing?.path}`}
          </h2>

          <Field label="URL cesta (path)">
            <input
              value={form.path}
              onChange={(e) => setForm((f) => ({ ...f, path: e.target.value }))}
              className={inputClass + " font-mono"}
              placeholder="/realizace/projekt-slug"
              disabled={!!editing}
            />
          </Field>

          <Field label="SEO Title (doporučeno 50–60 znaků)">
            <input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className={inputClass}
              placeholder="Barcelo Hotel ***** – LED osvětlení | BE-LIGHT"
            />
            <CharCounter value={form.title} max={60} />
          </Field>

          <Field label="SEO Description (doporučeno 130–155 znaků)">
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={3}
              className={`${inputClass} resize-none`}
              placeholder="Popis stránky pro vyhledávače…"
            />
            <CharCounter value={form.description} max={155} />
          </Field>

          <Field label="OG Image URL (volitelné – pro sdílení na sociálních sítích)">
            <input
              value={form.ogImage}
              onChange={(e) => setForm((f) => ({ ...f, ogImage: e.target.value }))}
              className={inputClass}
              placeholder="https://..."
            />
          </Field>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving || !form.path || !form.title || !form.description}
              className="px-5 py-2 bg-[#C9A84C] text-[#0a0a0a] text-sm font-medium rounded-lg hover:brightness-110 transition-all disabled:opacity-50"
            >
              {saving ? "Ukládám…" : "Uložit"}
            </button>
            <button onClick={cancel} className="px-5 py-2 text-white/50 text-sm rounded-lg hover:text-white/70 transition-colors">
              Zrušit
            </button>
          </div>
        </div>
      )}

      {/* List */}
      {entries === undefined ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : entries.length === 0 ? (
        <div className="text-center py-20 text-white/30">
          <p className="text-4xl mb-4">◎</p>
          <p>Žádná SEO metadata. Přidejte první stránku.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {entries.map((e) => (
            <div
              key={e._id}
              className="flex items-start gap-4 p-4 bg-white/3 border border-white/8 rounded-xl hover:border-white/15 transition-all"
            >
              <div className="flex-1 min-w-0">
                <div className="font-mono text-[#C9A84C]/80 text-sm">{e.path}</div>
                <div className="text-white text-sm mt-1 truncate">{e.title}</div>
                <div className="text-white/40 text-xs mt-0.5 line-clamp-1">{e.description}</div>
                {e.ogImage && <div className="text-white/25 text-xs mt-0.5 truncate">OG: {e.ogImage}</div>}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 mt-1">
                <div className={`text-xs px-2 py-0.5 rounded-full ${e.title.length > 60 ? "bg-red-900/30 text-red-400" : "bg-green-900/20 text-green-400/70"}`}>
                  title: {e.title.length}
                </div>
                <div className={`text-xs px-2 py-0.5 rounded-full ${e.description.length > 160 ? "bg-red-900/30 text-red-400" : "bg-green-900/20 text-green-400/70"}`}>
                  desc: {e.description.length}
                </div>
                <button
                  onClick={() => openEdit(e)}
                  className="px-3 py-1.5 text-xs text-white/50 border border-white/10 rounded-lg hover:text-white hover:border-white/30 transition-all"
                >
                  Editovat
                </button>
                <button
                  onClick={() => handleDelete(e._id, e.path)}
                  className="px-3 py-1.5 text-xs text-red-400/60 border border-red-400/20 rounded-lg hover:text-red-400 hover:border-red-400/40 transition-all"
                >
                  Smazat
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-white/50 text-xs uppercase tracking-wider">{label}</label>
      {children}
    </div>
  )
}

function CharCounter({ value, max }: { value: string; max: number }) {
  const len = value.length
  const ok = len > 0 && len <= max
  const over = len > max
  return (
    <div className={`text-xs mt-1 ${over ? "text-red-400" : ok ? "text-green-400/70" : "text-white/25"}`}>
      {len} / {max} znaků
    </div>
  )
}

const inputClass =
  "w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#C9A84C]/60 transition-colors"
