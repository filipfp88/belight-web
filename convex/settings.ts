import { query, mutation } from "./_generated/server"
import { v } from "convex/values"
import { getAuthUserId } from "@convex-dev/auth/server"

export const list = query({
  args: {},
  returns: v.array(v.object({
    _id: v.id("siteSettings"),
    _creationTime: v.number(),
    key: v.string(),
    value: v.string(),
  })),
  handler: async (ctx) => {
    return await ctx.db.query("siteSettings").collect()
  },
})

export const get = query({
  args: { key: v.string() },
  returns: v.union(v.string(), v.null()),
  handler: async (ctx, args) => {
    const doc = await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .unique()
    return doc?.value ?? null
  },
})

export const set = mutation({
  args: {
    key: v.string(),
    value: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error("Neautorizován")

    const existing = await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .unique()

    if (existing) {
      await ctx.db.patch(existing._id, { value: args.value })
    } else {
      await ctx.db.insert("siteSettings", { key: args.key, value: args.value })
    }
    return null
  },
})


export const setBulk = mutation({
  args: {
    settings: v.array(v.object({ key: v.string(), value: v.string() })),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error("Neautorizován")

    for (const { key, value } of args.settings) {
      const existing = await ctx.db
        .query("siteSettings")
        .withIndex("by_key", (q) => q.eq("key", key))
        .unique()
      if (existing) {
        await ctx.db.patch(existing._id, { value })
      } else {
        await ctx.db.insert("siteSettings", { key, value })
      }
    }
    return null
  },
})
