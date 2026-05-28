import { query, mutation } from "./_generated/server"
import { v } from "convex/values"
import { getAuthUserId } from "@convex-dev/auth/server"

const catalogFields = {
  _id: v.id("catalogs"),
  _creationTime: v.number(),
  title: v.string(),
  subtitle: v.optional(v.string()),
  description: v.optional(v.string()),
  pdfUrl: v.string(),
  coverUrl: v.string(),
  year: v.optional(v.string()),
  language: v.optional(v.string()),
  category: v.optional(v.string()),
  sortOrder: v.number(),
  published: v.boolean(),
}

export const list = query({
  args: {},
  returns: v.array(v.object(catalogFields)),
  handler: async (ctx) => {
    return await ctx.db.query("catalogs").withIndex("by_sort").order("asc").collect()
  },
})

export const listPublished = query({
  args: {},
  returns: v.array(v.object(catalogFields)),
  handler: async (ctx) => {
    const all = await ctx.db.query("catalogs").withIndex("by_sort").order("asc").collect()
    return all.filter((c) => c.published)
  },
})

export const create = mutation({
  args: {
    title: v.string(),
    subtitle: v.optional(v.string()),
    description: v.optional(v.string()),
    pdfUrl: v.string(),
    coverUrl: v.string(),
    year: v.optional(v.string()),
    language: v.optional(v.string()),
    category: v.optional(v.string()),
    sortOrder: v.number(),
    published: v.boolean(),
  },
  returns: v.id("catalogs"),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error("Neautorizován")
    return await ctx.db.insert("catalogs", args)
  },
})

export const update = mutation({
  args: {
    id: v.id("catalogs"),
    title: v.string(),
    subtitle: v.optional(v.string()),
    description: v.optional(v.string()),
    pdfUrl: v.string(),
    coverUrl: v.string(),
    year: v.optional(v.string()),
    language: v.optional(v.string()),
    category: v.optional(v.string()),
    sortOrder: v.number(),
    published: v.boolean(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error("Neautorizován")
    const { id, ...fields } = args
    await ctx.db.patch(id, fields)
    return null
  },
})

export const remove = mutation({
  args: { id: v.id("catalogs") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error("Neautorizován")
    await ctx.db.delete(args.id)
    return null
  },
})

export const seed = mutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    const existing = await ctx.db.query("catalogs").collect()
    if (existing.length > 0) return null

    await ctx.db.insert("catalogs", {
      title: "KLUŚ Aplikace 2026",
      subtitle: "Folder Zastosowania",
      description:
        "Kompletní přehled aplikací a použití LED lišt KLUŚ design — komerční, rezidenční i průmyslové osvětlení. Technické parametry, profily a montážní instrukce.",
      pdfUrl:
        "https://assets.macaly-user-data.dev/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/gCnfvPN2XUIktDCC2GLlO.pdf",
      coverUrl: "/images/katalogy/klus-2026-cover.jpg",
      year: "2026",
      language: "PL / EN",
      category: "Aplikace",
      sortOrder: 0,
      published: true,
    })

    await ctx.db.insert("catalogs", {
      title: "Creative Cables",
      subtitle: "Produktový katalog",
      description:
        "Katalog designových kabelů, objímek, závěsných svítidel a doplňků Creative Cables — pro ty, kdo chtějí osvětlení i jako dekorativní prvek interiéru.",
      pdfUrl:
        "https://assets.macaly-user-data.dev/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/SVL5A46VtSiXqNoY-ivmc.pdf",
      coverUrl: "/images/katalogy/creative-cables-cover.jpg",
      year: "2026",
      language: "EN",
      category: "Designové kabely",
      sortOrder: 1,
      published: true,
    })

    return null
  },
})
