"use client"

import { useQuery, useMutation, useAction } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { PROJECTS } from "@/lib/projects"
import { useState, useRef, useEffect } from "react"

type Project = {
  _id: Id<"projects">
  slug: string
  title: string
  category: string
  description?: string
  images: string[]
  sortOrder: number
  published: boolean
  legacyId?: number
  legacyUrl?: string
}

type FormState = {
  slug: string
  title: string
  category: string
  description: string
  images: string[]
  published: boolean
  legacyUrl: string
}

const defaultForm: FormState = {
  slug: "",
  title: "",
  category: "",
  description: "",
  images: [],
  published: true,
  legacyUrl: "",
}

export default function ProjectsTab() {
  const projects = useQuery(api.projects.list)
  const createProject = useMutation(api.projects.create)
  const updateProject = useMutation(api.projects.update)
  const removeProject = useMutation(api.projects.remove)
  const reorderProject = useMutation(api.projects.reorder)
  const generateUploadUrl = useMutation(api.media.generateUploadUrl)
  const getImageUrl = useMutation(api.media.getImageUrl)
  const importFromUrl = useAction(api.media.importFromUrl)

  const [editing, setEditing] = useState<Project | null>(null)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState<FormState>(defaultForm)
  const [saving, setSaving] = useState(false)
  const [seeding, setSeeding] = useState(false)
  const [seedStatus, setSeedStatus] = useState("")
  const [error, setError] = useState("")
  const [newImageUrl, setNewImageUrl] = useState("")
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState("")
  const [isDragOver, setIsDragOver] = useState(false)
  const [dragImageIdx, setDragImageIdx] = useState<number | null>(null)
  const [importUrl, setImportUrl] = useState("")
  const [importing, setImporting] = useState(false)
  const [importError, setImportError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  // Scroll to form when it opens (edit or create)
  // Admin uses <main overflow-auto> as scroll container – scrollIntoView scrolls that element
  useEffect(() => {
    if (creating || editing) {
      setTimeout(() => {
        const el = formRef.current
        if (!el) return
        const mainEl = document.querySelector("main")
        if (mainEl) {
          const elRect = el.getBoundingClientRect()
          const mainRect = mainEl.getBoundingClientRect()
          mainEl.scrollTo({ top: mainEl.scrollTop + elRect.top - mainRect.top - 16, behavior: "smooth" })
        } else {
          el.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }, 80)
    }
  }, [creating, editing])

  function openCreate() {
    setForm({ ...defaultForm })
    setCreating(true)
    setEditing(null)
    setError("")
    setNewImageUrl("")
  }

  function openEdit(p: Project) {
    setForm({
      slug: p.slug,
      title: p.title,
      category: p.category,
      description: p.description ?? "",
      images: [...p.images],
      published: p.published,
      legacyUrl: p.legacyUrl ?? "",
    })
    setEditing(p)
    setCreating(false)
    setError("")
    setNewImageUrl("")
  }

  function cancelForm() {
    setEditing(null)
    setCreating(false)
    setError("")
    setNewImageUrl("")
    setImportUrl("")
    setImportError("")
  }

  function addImage() {
    const url = newImageUrl.trim()
    if (!url) return
    setForm((f) => ({ ...f, images: [...f.images, url] }))
    setNewImageUrl("")
  }

  function removeImage(idx: number) {
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx) }))
  }

  async function handleImportFromUrl() {
    const url = importUrl.trim()
    if (!url) return
    setImporting(true)
    setImportError("")
    try {
      console.log("[import-url] stahuje:", url)
      const stored = await importFromUrl({ imageUrl: url })
      if (stored) {
        setForm((f) => ({ ...f, images: [...f.images, stored] }))
        setImportUrl("")
        console.log("[import-url] uloženo jako:", stored)
      } else {
        setImportError("Nepodařilo se získat URL obrázku ze storage")
      }
    } catch (err: unknown) {
      console.error("[import-url] chyba:", err)
      setImportError(err instanceof Error ? err.message : "Chyba při stahování")
    } finally {
      setImporting(false)
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (files.length === 0) return
    await uploadFiles(files)
  }

  // Compress image using Canvas before upload (max 1920px, 85% quality)
  async function compressImage(file: File): Promise<File> {
    const MAX_PX = 1920
    const QUALITY = 0.85
    return new Promise((resolve) => {
      const img = new Image()
      const objectUrl = URL.createObjectURL(file)
      img.onload = () => {
        URL.revokeObjectURL(objectUrl)
        let { width, height } = img
        if (width <= MAX_PX && height <= MAX_PX) {
          // Already small enough, skip compression
          resolve(file)
          return
        }
        const ratio = Math.min(MAX_PX / width, MAX_PX / height)
        width = Math.round(width * ratio)
        height = Math.round(height * ratio)
        const canvas = document.createElement("canvas")
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext("2d")!
        ctx.drawImage(img, 0, 0, width, height)
        canvas.toBlob(
          (blob) => {
            if (!blob) { resolve(file); return }
            const compressed = new File([blob], file.name, { type: "image/jpeg" })
            console.log(`[compress] ${file.name}: ${(file.size / 1024).toFixed(0)}KB → ${(compressed.size / 1024).toFixed(0)}KB`)
            resolve(compressed)
          },
          "image/jpeg",
          QUALITY,
        )
      }
      img.onerror = () => { URL.revokeObjectURL(objectUrl); resolve(file) }
      img.src = objectUrl
    })
  }

  // Handle files dropped onto the drop zone
  async function handleDropZone(e: React.DragEvent) {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"))
    if (files.length === 0) return
    await uploadFiles(files)
  }

  // Core upload logic (shared by file input and drop zone)
  async function uploadFiles(files: File[]) {
    setUploading(true)
    const uploaded: string[] = []
    const errors: string[] = []
    for (let i = 0; i < files.length; i++) {
      const raw = files[i]
      setUploadProgress(`Komprimuji a nahrávám ${i + 1}/${files.length}: ${raw.name}`)
      try {
        const file = await compressImage(raw)
        // Fallback content-type in case browser doesn't detect it
        const contentType = file.type || "image/jpeg"
        console.log(`[upload] nahrávám: ${raw.name}, typ: ${contentType}, velikost: ${(file.size / 1024).toFixed(0)}KB`)
        const uploadUrl = await generateUploadUrl()
        const res = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": contentType },
          body: file,
        })
        if (!res.ok) {
          const body = await res.text().catch(() => "")
          throw new Error(`HTTP ${res.status}: ${res.statusText}${body ? ` – ${body}` : ""}`)
        }
        const json = await res.json()
        console.log("[upload] storage response:", json)
        const { storageId } = json
        if (!storageId) throw new Error("Convex nevrátil storageId – zkuste jiný formát obrázku")
        const url = await getImageUrl({ storageId })
        console.log("[upload] getImageUrl →", url)
        if (url) {
          uploaded.push(url)
        } else {
          throw new Error("Convex storage nevrátil URL – soubor pravděpodobně nebyl uložen")
        }
      } catch (err) {
        console.error("[upload] chyba:", err)
        const msg = err instanceof Error ? err.message : String(err)
        errors.push(`${raw.name}: ${msg}`)
      }
    }
    if (uploaded.length > 0) {
      setForm((f) => ({ ...f, images: [...f.images, ...uploaded] }))
    }
    // Show result – keep error visible longer so user can read it
    if (errors.length > 0) {
      setUploadProgress(`✗ Chyba: ${errors[0]}`)
      setTimeout(() => setUploadProgress(""), 8000)
    } else {
      setUploadProgress(`✓ Nahráno ${uploaded.length} foto`)
      setTimeout(() => setUploadProgress(""), 4000)
    }
    if (fileInputRef.current) fileInputRef.current.value = ""
    setUploading(false)
  }

  // Drag-to-reorder handlers for the image list
  function handleImageDragStart(idx: number) {
    setDragImageIdx(idx)
  }
  function handleImageDragOver(e: React.DragEvent, idx: number) {
    e.preventDefault()
    if (dragImageIdx === null || dragImageIdx === idx) return
    const newImages = [...form.images]
    const [moved] = newImages.splice(dragImageIdx, 1)
    newImages.splice(idx, 0, moved)
    setForm((f) => ({ ...f, images: newImages }))
    setDragImageIdx(idx)
  }
  function handleImageDragEnd() {
    setDragImageIdx(null)
  }

  function moveImage(idx: number, dir: -1 | 1) {
    const newImages = [...form.images]
    const target = idx + dir
    if (target < 0 || target >= newImages.length) return
    ;[newImages[idx], newImages[target]] = [newImages[target], newImages[idx]]
    setForm((f) => ({ ...f, images: newImages }))
  }

  async function handleSave() {
    setSaving(true)
    setError("")
    try {
      const sortOrder = (projects?.length ?? 0) * 10
      if (creating) {
        await createProject({
          slug: form.slug.trim(),
          title: form.title.trim(),
          category: form.category.trim(),
          description: form.description.trim() || undefined,
          images: form.images,
          sortOrder,
          published: form.published,
          legacyUrl: form.legacyUrl.trim() || undefined,
        })
        setCreating(false)
      } else if (editing) {
        await updateProject({
          id: editing._id,
          slug: form.slug.trim(),
          title: form.title.trim(),
          category: form.category.trim(),
          description: form.description.trim() || undefined,
          images: form.images,
          sortOrder: editing.sortOrder,
          published: form.published,
          legacyUrl: form.legacyUrl.trim() || undefined,
        })
        setEditing(null)
      }
      setForm(defaultForm)
    } catch (err: unknown) {
      console.log("[projects-tab] save error:", err)
      setError(err instanceof Error ? err.message : "Chyba při ukládání")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: Id<"projects">, title: string) {
    if (!confirm(`Opravdu smazat projekt "${title}"?`)) return
    try {
      await removeProject({ id })
    } catch (err) {
      console.log("[projects-tab] delete error:", err)
    }
  }

  async function moveProject(p: Project, dir: -1 | 1) {
    if (!projects) return
    const sorted = [...projects].sort((a, b) => a.sortOrder - b.sortOrder)
    const idx = sorted.findIndex((x) => x._id === p._id)
    const target = idx + dir
    if (target < 0 || target >= sorted.length) return
    const other = sorted[target]
    await reorderProject({ id: p._id, sortOrder: other.sortOrder })
    await reorderProject({ id: other._id, sortOrder: p.sortOrder })
  }

  async function handleSeed() {
    if (!confirm(`Importovat ${PROJECTS.length} projektů z kódu do databáze? Duplicity budou přeskočeny.`)) return
    setSeeding(true)
    setSeedStatus("")
    let imported = 0
    let skipped = 0
    try {
      for (let i = 0; i < PROJECTS.length; i++) {
        const p = PROJECTS[i]
        const exists = projects?.find((db) => db.slug === p.slug)
        if (exists) {
          skipped++
          setSeedStatus(`Importuji… ${i + 1}/${PROJECTS.length} (přeskočeno: ${skipped})`)
          continue
        }
        await createProject({
          slug: p.slug,
          title: p.title,
          category: p.category,
          description: p.description,
          images: p.images,
          sortOrder: i * 10,
          published: true,
          legacyId: p.id,
        })
        imported++
        setSeedStatus(`Importuji… ${i + 1}/${PROJECTS.length} (nových: ${imported})`)
      }
      setSeedStatus(`✓ Hotovo – importováno: ${imported}, přeskočeno: ${skipped}`)
    } catch (err) {
      console.log("[projects-tab] seed error:", err)
      setSeedStatus("✗ Chyba při importu")
    } finally {
      setSeeding(false)
    }
  }

  const showForm = creating || !!editing
  const sorted = projects ? [...projects].sort((a, b) => a.sortOrder - b.sortOrder) : null

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light text-white">Projekty / Realizace</h1>
          <p className="text-white/40 text-sm mt-1">{projects?.length ?? 0} projektů · pořadí = zobrazení na webu</p>
        </div>
        <div className="flex items-center gap-3">
          {projects?.length === 0 && (
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="px-4 py-2 bg-white/10 text-white/70 text-sm rounded-lg hover:bg-white/15 transition-all disabled:opacity-50"
            >
              {seeding ? "Importuji…" : "⬆ Import z kódu"}
            </button>
          )}
          <button
            onClick={openCreate}
            className="px-4 py-2 bg-[#C9A84C] text-[#0a0a0a] text-sm font-medium rounded-lg hover:brightness-110 transition-all"
          >
            + Nový projekt
          </button>
        </div>
      </div>

      {seedStatus && (
        <div className={`mb-6 p-3 rounded-lg text-sm ${seedStatus.startsWith("✓") ? "bg-green-900/30 text-green-400" : seedStatus.startsWith("✗") ? "bg-red-900/30 text-red-400" : "bg-white/5 text-white/60"}`}>
          {seedStatus}
        </div>
      )}

      {/* Edit / Create Form */}
      {showForm && (
        <div ref={formRef} className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
          <h2 className="text-white font-light text-lg">
            {creating ? "Nový projekt" : `Editace: ${editing?.title}`}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Název">
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className={inputClass}
                placeholder="Barcelo Hotel *****"
              />
            </Field>
            <Field label="Slug (URL)">
              <input
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                className={inputClass}
                placeholder="barcelo-hotel"
              />
            </Field>
          </div>

          <Field label="Kategorie">
            <input
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className={inputClass}
              placeholder="Hospitality"
            />
          </Field>

          <Field label="Stará URL (SEO redirect z belightled.cz)">
            <input
              value={form.legacyUrl}
              onChange={(e) => setForm((f) => ({ ...f, legacyUrl: e.target.value }))}
              className={inputClass}
              placeholder="https://belightled.cz/realizace/barcelo-hotel"
            />
            <p className="text-white/25 text-xs mt-1">Vyplníš později – slouží pro 301 přesměrování ze starého webu</p>
          </Field>

          <Field label="Popis">
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={10}
              className={`${inputClass} resize-y`}
              placeholder="Popis projektu..."
            />
          </Field>

          {/* Images manager */}
          <Field label={`Fotografie (${form.images.length})`}>
            <div className="space-y-2">
              {/* Hidden file input – id is used by the label below for native file picker */}
              <input
                ref={fileInputRef}
                id="project-file-input"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileUpload}
              />

              {/* Drag & Drop Zone – label nativně otevře file picker při kliknutí */}
              <label
                htmlFor={uploading ? undefined : "project-file-input"}
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
                onDragEnter={(e) => { e.preventDefault(); setIsDragOver(true) }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDropZone}
                className={`relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed py-6 px-4 transition-all select-none
                  ${isDragOver
                    ? "border-[#C9A84C] bg-[#C9A84C]/10 scale-[1.01]"
                    : "border-white/15 hover:border-[#C9A84C]/40 hover:bg-white/3"
                  }
                  ${uploading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}
                `}
              >
                {uploading ? (
                  <>
                    <span className="w-6 h-6 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
                    <span className="text-[#C9A84C] text-sm">{uploadProgress || "Nahrávám…"}</span>
                  </>
                ) : isDragOver ? (
                  <>
                    <span className="text-3xl">📂</span>
                    <span className="text-[#C9A84C] text-sm font-medium">Pusťte fotky sem</span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl">📷</span>
                    <span className="text-white/60 text-sm">Klikněte nebo přetáhněte fotky sem</span>
                    <span className="text-white/30 text-xs">Automatická komprese · více fotek najednou</span>
                  </>
                )}
              </label>

              {!uploading && uploadProgress && (
                <p className={`text-xs px-2 py-1.5 rounded break-words ${uploadProgress.startsWith("✓") ? "text-green-400 bg-green-400/10" : uploadProgress.startsWith("✗") ? "text-red-400 bg-red-400/10 border border-red-400/20" : "text-[#C9A84C]"}`}>
                  {uploadProgress}
                </p>
              )}

              {/* Image list with drag-to-reorder */}
              {form.images.length > 0 && (
                <p className="text-white/25 text-xs pt-1">Přetáhněte řádky pro změnu pořadí · první fotka = titulní náhled</p>
              )}
              {form.images.map((url, idx) => (
                <div
                  key={url + idx}
                  draggable
                  onDragStart={() => handleImageDragStart(idx)}
                  onDragOver={(e) => handleImageDragOver(e, idx)}
                  onDragEnd={handleImageDragEnd}
                  className={`flex items-center gap-2 border rounded-lg p-2 cursor-grab active:cursor-grabbing transition-all
                    ${dragImageIdx === idx
                      ? "bg-[#C9A84C]/10 border-[#C9A84C]/40 opacity-70"
                      : "bg-white/3 border-white/8 hover:border-white/20"
                    }
                  `}
                >
                  {/* Drag handle */}
                  <span className="text-white/20 text-sm flex-shrink-0 select-none px-0.5" title="Přetáhnout">⠿</span>

                  {/* Thumbnail with cover badge */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={url}
                      alt={`foto ${idx + 1}`}
                      className="w-14 h-10 object-cover rounded bg-white/5"
                      onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0.2" }}
                    />
                    {idx === 0 && (
                      <span className="absolute -top-1.5 -left-1.5 bg-[#C9A84C] text-[#0a0a0a] text-[9px] font-bold px-1 py-0.5 rounded leading-none">
                        TITULNÍ
                      </span>
                    )}
                  </div>

                  <span className="flex-1 text-white/50 text-xs font-mono truncate min-w-0">{url}</span>
                  <button
                    onClick={() => removeImage(idx)}
                    className="w-6 h-6 flex items-center justify-center text-red-400/50 hover:text-red-400 transition-colors flex-shrink-0"
                    title="Odebrat"
                  >×</button>
                </div>
              ))}

              {/* Import from old website URL – downloads & stores image */}
              <div className="pt-2 space-y-1.5">
                <p className="text-white/30 text-xs uppercase tracking-wider">Stáhnout fotku z URL (klusdesign.eu apod.)</p>
                <div className="flex gap-2">
                  <input
                    value={importUrl}
                    onChange={(e) => { setImportUrl(e.target.value); setImportError("") }}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleImportFromUrl() } }}
                    className={`${inputClass} flex-1 text-xs font-mono`}
                    placeholder="https://klusdesign.eu/...jpg"
                    disabled={importing}
                  />
                  <button
                    onClick={handleImportFromUrl}
                    disabled={!importUrl.trim() || importing}
                    className="px-3 py-2 bg-[#C9A84C]/20 text-[#C9A84C] text-xs border border-[#C9A84C]/30 rounded-lg hover:bg-[#C9A84C]/30 transition-all disabled:opacity-40 flex-shrink-0 whitespace-nowrap"
                  >
                    {importing ? (
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 border border-[#C9A84C] border-t-transparent rounded-full animate-spin inline-block" />
                        Stahuje…
                      </span>
                    ) : "⬇ Stáhnout & uložit"}
                  </button>
                </div>
                {importError && <p className="text-red-400 text-xs">{importError}</p>}
                <p className="text-white/20 text-xs">Fotka se stáhne a uloží na naše servery – nebude závislá na původním webu</p>
              </div>

              {/* Add image by direct URL (keep as-is on external server) */}
              <div className="flex gap-2 pt-1">
                <input
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addImage() } }}
                  className={`${inputClass} flex-1 text-xs font-mono`}
                  placeholder="https://... vložit URL přímo (bez stažení)"
                />
                <button
                  onClick={addImage}
                  disabled={!newImageUrl.trim()}
                  className="px-3 py-2 bg-white/10 text-white/70 text-sm rounded-lg hover:bg-white/15 transition-all disabled:opacity-40 flex-shrink-0"
                >
                  + Přidat
                </button>
              </div>
            </div>
          </Field>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
              className="w-4 h-4 accent-[#C9A84C]"
            />
            <span className="text-white/60 text-sm">Publikovaný (viditelný na webu)</span>
          </label>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2 bg-[#C9A84C] text-[#0a0a0a] text-sm font-medium rounded-lg hover:brightness-110 transition-all disabled:opacity-50"
            >
              {saving ? "Ukládám…" : "Uložit"}
            </button>
            <button
              onClick={cancelForm}
              className="px-5 py-2 text-white/50 text-sm rounded-lg hover:text-white/70 transition-colors"
            >
              Zrušit
            </button>
          </div>
        </div>
      )}

      {/* Projects list */}
      {sorted === null ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : sorted.length === 0 ? (
        <div className="text-center py-20 text-white/30">
          <p className="text-4xl mb-4">◈</p>
          <p>Žádné projekty. Přidejte první nebo importujte z kódu.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {sorted.map((p, idx) => (
            <div
              key={p._id}
              className={`flex items-center gap-3 p-3 bg-white/3 border rounded-xl transition-all ${editing?._id === p._id ? "border-[#C9A84C]/40 bg-[#C9A84C]/5" : "border-white/8 hover:border-white/15"}`}
            >
              {/* Order controls */}
              <div className="flex flex-col gap-0.5 flex-shrink-0">
                <button
                  onClick={() => moveProject(p, -1)}
                  disabled={idx === 0}
                  className="w-6 h-5 flex items-center justify-center text-white/25 hover:text-white/70 disabled:opacity-10 transition-colors text-xs"
                  title="Posunout výše"
                >▲</button>
                <button
                  onClick={() => moveProject(p, 1)}
                  disabled={idx === sorted.length - 1}
                  className="w-6 h-5 flex items-center justify-center text-white/25 hover:text-white/70 disabled:opacity-10 transition-colors text-xs"
                  title="Posunout níže"
                >▼</button>
              </div>

              {/* Position number */}
              <span className="text-white/20 text-xs w-5 text-center flex-shrink-0 font-mono">{idx + 1}</span>

              {/* Thumbnail */}
              {p.images[0] && (
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="w-14 h-10 object-cover rounded-lg flex-shrink-0"
                />
              )}

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-white font-light truncate">{p.title}</span>
                  {!p.published && (
                    <span className="text-xs bg-white/10 text-white/40 px-2 py-0.5 rounded-full flex-shrink-0">skrytý</span>
                  )}
                </div>
                <div className="text-white/35 text-xs mt-0.5 flex items-center gap-2 flex-wrap">
                  <span>{p.category}</span>
                  <span>·</span>
                  <span className="font-mono">/realizace/{p.slug}</span>
                  <span>·</span>
                  <span>{p.images.length} {p.images.length === 1 ? "foto" : "fotek"}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => editing?._id === p._id ? cancelForm() : openEdit(p)}
                  className={`px-3 py-1.5 text-xs border rounded-lg transition-all ${editing?._id === p._id ? "text-[#C9A84C] border-[#C9A84C]/40 hover:border-[#C9A84C]/60" : "text-white/50 border-white/10 hover:text-white hover:border-white/30"}`}
                >
                  {editing?._id === p._id ? "Zavřít" : "Editovat"}
                </button>
                <button
                  onClick={() => handleDelete(p._id, p.title)}
                  className="px-3 py-1.5 text-xs text-red-400/60 border border-red-400/20 rounded-lg hover:text-red-400 hover:border-red-400/40 transition-all"
                >
                  Smazat
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-white/20 text-xs mt-6">
        ▲▼ = pořadí na webu · projekt č. 1 se zobrazí první v sekci Realizace
      </p>
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
