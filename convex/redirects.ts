import { query, mutation } from "./_generated/server"
import { v } from "convex/values"
import { getAuthUserId } from "@convex-dev/auth/server"

const redirectFields = {
  _id: v.id("redirects"),
  _creationTime: v.number(),
  from: v.string(),
  to: v.string(),
  statusCode: v.number(),
  active: v.boolean(),
  note: v.optional(v.string()),
}

export const list = query({
  args: {},
  returns: v.array(v.object(redirectFields)),
  handler: async (ctx) => {
    return await ctx.db.query("redirects").collect()
  },
})

export const listActive = query({
  args: {},
  returns: v.array(v.object({
    from: v.string(),
    to: v.string(),
    statusCode: v.number(),
  })),
  handler: async (ctx) => {
    const all = await ctx.db.query("redirects").collect()
    return all
      .filter((r) => r.active)
      .map((r) => ({ from: r.from, to: r.to, statusCode: r.statusCode }))
  },
})

export const create = mutation({
  args: {
    from: v.string(),
    to: v.string(),
    statusCode: v.number(),
    active: v.boolean(),
    note: v.optional(v.string()),
  },
  returns: v.id("redirects"),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error("Neautorizován")
    return await ctx.db.insert("redirects", args)
  },
})

export const update = mutation({
  args: {
    id: v.id("redirects"),
    from: v.optional(v.string()),
    to: v.optional(v.string()),
    statusCode: v.optional(v.number()),
    active: v.optional(v.boolean()),
    note: v.optional(v.string()),
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
  args: { id: v.id("redirects") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error("Neautorizován")
    await ctx.db.delete(args.id)
    return null
  },
})
