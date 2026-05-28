import { v } from "convex/values"
import { mutation, query, internalQuery } from "./_generated/server"

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("adminWhitelist").order("asc").collect()
  },
})

export const isEmailAllowed = internalQuery({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    // Always allow @ledshopik.cz domain
    if (email.endsWith("@ledshopik.cz")) return true
    // Check individual whitelist
    const entry = await ctx.db
      .query("adminWhitelist")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first()
    return entry !== null
  },
})

export const add = mutation({
  args: { email: v.string(), note: v.optional(v.string()) },
  handler: async (ctx, { email, note }) => {
    const existing = await ctx.db
      .query("adminWhitelist")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first()
    if (existing) return existing._id
    return await ctx.db.insert("adminWhitelist", { email, note })
  },
})

export const remove = mutation({
  args: { id: v.id("adminWhitelist") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id)
  },
})
