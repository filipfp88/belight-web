import { query, mutation } from "./_generated/server"
import { v } from "convex/values"
import { getAuthUserId } from "@convex-dev/auth/server"

const projectFields = {
  _id: v.id("projects"),
  _creationTime: v.number(),
  slug: v.string(),
  title: v.string(),
  category: v.string(),
  description: v.optional(v.string()),
  images: v.array(v.string()),
  sortOrder: v.number(),
  published: v.boolean(),
  legacyId: v.optional(v.number()),
  legacyUrl: v.optional(v.string()),
}

export const list = query({
  args: {},
  returns: v.array(v.object(projectFields)),
  handler: async (ctx) => {
    return await ctx.db.query("projects").withIndex("by_sort").order("asc").collect()
  },
})

export const listPublished = query({
  args: {},
  returns: v.array(v.object(projectFields)),
  handler: async (ctx) => {
    const all = await ctx.db.query("projects").withIndex("by_sort").order("asc").collect()
    return all.filter((p) => p.published)
  },
})

export const getBySlug = query({
  args: { slug: v.string() },
  returns: v.union(v.object(projectFields), v.null()),
  handler: async (ctx, args) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique()
  },
})

export const create = mutation({
  args: {
    slug: v.string(),
    title: v.string(),
    category: v.string(),
    description: v.optional(v.string()),
    images: v.array(v.string()),
    sortOrder: v.number(),
    published: v.boolean(),
    legacyId: v.optional(v.number()),
    legacyUrl: v.optional(v.string()),
  },
  returns: v.id("projects"),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error("Neautorizován")
    return await ctx.db.insert("projects", args)
  },
})

export const update = mutation({
  args: {
    id: v.id("projects"),
    slug: v.optional(v.string()),
    title: v.optional(v.string()),
    category: v.optional(v.string()),
    description: v.optional(v.string()),
    images: v.optional(v.array(v.string())),
    sortOrder: v.optional(v.number()),
    published: v.optional(v.boolean()),
    legacyUrl: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error("Neautorizován")
    const { id, ...updates } = args
    await ctx.db.patch(id, updates)
    return null
  },
})

export const remove = mutation({
  args: { id: v.id("projects") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error("Neautorizován")
    await ctx.db.delete(args.id)
    return null
  },
})

export const reorder = mutation({
  args: {
    id: v.id("projects"),
    sortOrder: v.number(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error("Neautorizován")
    await ctx.db.patch(args.id, { sortOrder: args.sortOrder })
    return null
  },
})
