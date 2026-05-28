"use client"

import { useQuery, useMutation, useAction } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useState } from "react"

type Redirect = {
  _id: Id<"redirects">
  from: string
  to: string
  statusCode: number
  active: boolean
  note?: string
}

type FormState = {
  from: string
  to: string
  statusCode: string
  active: boolean
  note: string
}

const defaultForm: FormState = {
  from: "",
  to: "",
  statusCode: "301",
  active: true,
  note: "",
}

// Suggested old URLs from klusdesign.eu style URLs to migrate
const SUGGESTED_REDIRECTS = [
  { from: "/realizace.html", to: "/#realizace", note: "Stará HTML verze" },
  { from: "/reference.html", to: "/#realizace", note: "Stará reference → realizace" },
  { from: "/kontakt.html", to: "/#kontakt", note: "Stará kontaktní stránka" },
  { from: "/o-nas.html", to: "/#o-nas", note: "Stará stránka o nás" },
]

export default function RedirectsTab() {
  const redirects = useQuery(api.redirects.list)
  const createRedirect = useMutation(api.redirects.create)
  const updateRedirect = useMutation(api.redirects.update)
  const removeRedirect = useMutation(api.redirects.remove)

  const seedRedirects = useAction(api.seeders.runSeedRedirects)

  const [editing, setEditing] = useState<Redirect | null>(null)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState<FormState>(defaultForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [seeding, setSeeding] = useState(false)
  const [seedResult, setSeedResult] = useState<string | null>(null)

  async function handleSeedRedirects() {
    if (!confirm("Importovat přesměrování z belightled.cz? Duplicity budou přeskočeny.")) return
    setSeeding(true)
    setSeedResult(null)
    try {
      const count = await seedRedirects({})
      setSeedResult(count > 0 ? `✓ Importováno ${count} přesměrování` : "✓ Vše již bylo importováno")
      setTimeout(() => setSeedResult(null), 5000)
    } catch (err) {
      console.log("[redirects-tab] seed error:", err)
      setSeedResult("✗ Chyba při importu")
    } finally {
      setSeeding(false)
    }
  }

  function openCreate(prefill?: Partial<FormState>) {
    setForm({ ...defaultForm, ...prefill })
    setCreating(true)
    setEditing(null)
    setError("")
  }

  function openEdit(r: Redirect) {
    setForm({
      from: r.from,
      to: r.to,
      statusCode: String(r.statusCode),
      active: r.active,
      note: r.note ?? "",
    })
    setEditing(r)
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
      const statusCode = parseInt(form.statusCode) || 301
      if (creating) {
        await createRedirect({
          from: form.from.trim(),
          to: form.to.trim(),
          statusCode,
          active: form.active,
          note: form.note.trim() || undefined,
        })
      } else if (editing) {
        await updateRedirect({
          id: editing._id,
          from: form.from.trim(),
          to: form.to.trim(),
          statusCode,
          active: form.active,
          note: form.note.trim() || undefined,
        })
      }
      cancel()
    } catch (err: unknown) {
      console.log("[redirects-tab] save error:", err)
      setError(err instanceof Error ? err.message : "Chyba při ukládání")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: Id<"redirects">, from: string) {
    if (!confirm(`Smazat přesměrování "${from}"?`)) return
    try {
      await removeRedirect({ id })
    } catch (err) {
      console.log("[redirects-tab] delete error:", err)
    }
  }

  async function handleToggle(r: Redirect) {
    try {
      await updateRedirect({ id: r._id, active: !r.active })
    } catch (err) {
      console.log("[redirects-tab] toggle error:", err)
    }
  }

  const showForm = creating || !!editing
  const existingFroms = new Set(redirects?.map((r) => r.from) ?? [])
  const missingSuggested = SUGGESTED_REDIRECTS.filter((s) => !existingFroms.has(s.from))

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light text-white">Přesměrování</h1>
          <p className="text-white/40 text-sm mt-1">Zachování starých URL po migraci webu (301/302)</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSeedRedirects}
            disabled={seeding}
            className="px-4 py-2 border border-amber-500/30 text-amber-400/80 text-sm font-medium rounded-lg hover:bg-amber-900/20 transition-all disabled:opacity-50"
          >
            {seeding ? "Importuji…" : "↙ Import z belightled.cz"}
          </button>
          {seedResult && <span className="text-sm text-white/50">{seedResult}</span>}
          <button
            onClick={() => openCreate()}
            className="px-4 py-2 bg-[#C9A84C] text-[#0a0a0a] text-sm font-medium rounded-lg hover:brightness-110 transition-all"
          >
            + Přidat přesměrování
          </button>
        </div>
      </div>

      {/* Info box */}
      <div className="mb-6 p-4 bg-blue-900/20 border border-blue-500/20 rounded-xl text-sm text-blue-300/70">
        <strong className="text-blue-300">Jak to funguje:</strong> Přesměrování jsou načítána middlewarem a aplikována automaticky.
        Jsou cachována 60 sekund. Aktivní přesměrování přesměrují návštěvníky z URL <em>odkud</em> na URL <em>kam</em>.
      </div>

      {/* Suggested redirects */}
      {missingSuggested.length > 0 && !showForm && (
        <div className="mb-8 p-4 bg-amber-900/20 border border-amber-500/20 rounded-xl">
          <p className="text-amber-400/80 text-sm mb-3">Doporučená přesměrování (z původního webu):</p>
          <div className="space-y-2">
            {missingSuggested.map((s) => (
              <div key={s.from} className="flex items-center justify-between">
                <div className="text-white/50 text-xs font-mono">
                  <span className="text-red-400/70">{s.from}</span>
                  <span className="text-white/30 mx-2">→</span>
                  <span className="text-green-400/70">{s.to}</span>
                  <span className="text-white/30 ml-2">({s.note})</span>
                </div>
                <button
                  onClick={() => openCreate({ from: s.from, to: s.to, note: s.note })}
                  className="px-3 py-1 bg-amber-900/30 text-amber-400/80 text-xs rounded-lg hover:bg-amber-900/50 transition-all"
                >
                  + Přidat
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-white font-light text-lg mb-4">
            {creating ? "Nové přesměrování" : `Editace: ${editing?.from}`}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Odkud (původní URL)">
              <input
                value={form.from}
                onChange={(e) => setForm((f) => ({ ...f, from: e.target.value }))}
                className={inputClass + " font-mono"}
                placeholder="/stara-url.html"
                disabled={!!editing}
              />
            </Field>
            <Field label="Kam (nová URL)">
              <input
                value={form.to}
                onChange={(e) => setForm((f) => ({ ...f, to: e.target.value }))}
                className={inputClass + " font-mono"}
                placeholder="/realizace"
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="HTTP kód">
              <select
                value={form.statusCode}
                onChange={(e) => setForm((f) => ({ ...f, statusCode: e.target.value }))}
                className={inputClass}
              >
                <option value="301">301 – Trvalé přesměrování (doporučeno)</option>
                <option value="302">302 – Dočasné přesměrování</option>
              </select>
            </Field>
            <Field label="Poznámka (volitelné)">
              <input
                value={form.note}
                onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                className={inputClass}
                placeholder="Z původního webu klusdesign.eu"
              />
            </Field>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
              className="w-4 h-4 accent-[#C9A84C]"
            />
            <span className="text-white/60 text-sm">Aktivní</span>
          </label>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving || !form.from || !form.to}
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
      {redirects === undefined ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : redirects.length === 0 ? (
        <div className="text-center py-20 text-white/30">
          <p className="text-4xl mb-4">↪</p>
          <p>Žádná přesměrování. Přidejte první.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {redirects.map((r) => (
            <div
              key={r._id}
              className={`flex items-center gap-4 p-4 border rounded-xl transition-all ${
                r.active ? "bg-white/3 border-white/8 hover:border-white/15" : "bg-white/1 border-white/5 opacity-50"
              }`}
            >
              <div className="flex-1 min-w-0 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-red-400/70">{r.from}</span>
                  <span className="text-white/30">→</span>
                  <span className="text-green-400/70">{r.to}</span>
                </div>
                {r.note && <div className="text-white/30 mt-0.5">{r.note}</div>}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs bg-white/8 text-white/40 px-2 py-1 rounded-lg">{r.statusCode}</span>
                <button
                  onClick={() => handleToggle(r)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                    r.active
                      ? "bg-green-900/20 text-green-400/70 border-green-500/20 hover:bg-green-900/30"
                      : "bg-white/5 text-white/30 border-white/10 hover:bg-white/10"
                  }`}
                >
                  {r.active ? "Aktivní" : "Neaktivní"}
                </button>
                <button
                  onClick={() => openEdit(r)}
                  className="px-3 py-1.5 text-xs text-white/50 border border-white/10 rounded-lg hover:text-white hover:border-white/30 transition-all"
                >
                  Editovat
                </button>
                <button
                  onClick={() => handleDelete(r._id, r.from)}
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

const inputClass =
  "w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#C9A84C]/60 transition-colors"
