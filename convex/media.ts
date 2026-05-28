import { mutation, action } from "./_generated/server"
import { v } from "convex/values"
import { getAuthUserId } from "@convex-dev/auth/server"
import { api } from "./_generated/api"

// Generates a secure one-time upload URL – requires auth
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error("Neautorizován")
    console.log("[media] generateUploadUrl for user:", userId)
    return await ctx.storage.generateUploadUrl()
  },
})

// Returns the public URL for a given storage ID – requires auth
export const getImageUrl = mutation({
  args: { storageId: v.id("_storage") },
  returns: v.union(v.string(), v.null()),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error("Neautorizován")
    const url = await ctx.storage.getUrl(args.storageId)
    console.log("[media] getImageUrl for storageId:", args.storageId, "→", url)
    return url
  },
})

const ALLOWED_IMAGE_HOSTS = [
  "assets.macaly-user-data.dev",
  "images.pexels.com",
  "images.unsplash.com",
  "cdn.pixabay.com",
  "belight.cz",
  "www.belight.cz",
  "ledshopik.cz",
  "www.ledshopik.cz",
]
const MAX_IMAGE_BYTES = 15 * 1024 * 1024 // 15 MB

// Stáhne obrázek z externí URL a uloží ho do Convex storage – requires auth
export const importFromUrl = action({
  args: { imageUrl: v.string() },
  returns: v.union(v.string(), v.null()),
  handler: async (ctx, args): Promise<string | null> => {
    // Auth check
    const userId = await ctx.runMutation(api.media.checkAuth, {})
    if (!userId) throw new Error("Neautorizován")

    // URL validace — povolené domény
    let parsed: URL
    try {
      parsed = new URL(args.imageUrl)
    } catch {
      throw new Error("Neplatná URL")
    }
    if (parsed.protocol !== "https:") throw new Error("Povoleny jsou pouze HTTPS URL")
    if (!ALLOWED_IMAGE_HOSTS.includes(parsed.hostname)) {
      throw new Error(`Doména není povolena: ${parsed.hostname}`)
    }

    // Fetch s timeoutem
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15_000)
    let response: Response
    try {
      response = await fetch(args.imageUrl, { signal: controller.signal })
    } finally {
      clearTimeout(timeout)
    }

    if (!response.ok) {
      throw new Error(`Stažení selhalo: ${response.status} ${response.statusText}`)
    }

    const contentType = response.headers.get("content-type") ?? "image/jpeg"
    if (!contentType.startsWith("image/")) {
      throw new Error(`URL neodkazuje na obrázek (typ: ${contentType})`)
    }

    // Kontrola velikosti přes Content-Length header (pokud dostupný)
    const contentLength = Number(response.headers.get("content-length") ?? 0)
    if (contentLength > MAX_IMAGE_BYTES) {
      throw new Error(`Obrázek je příliš velký (max 15 MB)`)
    }

    const blob = await response.blob()
    if (blob.size > MAX_IMAGE_BYTES) {
      throw new Error(`Obrázek je příliš velký (max 15 MB)`)
    }
    console.log("[media] importFromUrl: staženo", blob.size, "B, typ:", contentType)

    // Upload to Convex storage
    const uploadUrl: string = await ctx.runMutation(api.media.generateUploadUrl, {})
    const uploadRes = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": contentType },
      body: blob,
    })
    if (!uploadRes.ok) throw new Error(`Upload do storage selhal: ${uploadRes.statusText}`)

    const { storageId } = await uploadRes.json()
    const publicUrl: string | null = await ctx.runMutation(api.media.getImageUrl, { storageId })
    console.log("[media] importFromUrl: uloženo jako", publicUrl)
    return publicUrl
  },
})

// Helper mutation – vrátí userId (pro auth check v action)
export const checkAuth = mutation({
  args: {},
  returns: v.union(v.string(), v.null()),
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx)
    return userId ?? null
  },
})
