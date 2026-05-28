import { query, mutation } from "./_generated/server"
import { v } from "convex/values"
import { getAuthUserId } from "@convex-dev/auth/server"

const pairFields = {
  _id: v.id("sliderPairs"),
  _creationTime: v.number(),
  title: v.string(),
  beforeSrc: v.string(),
  afterSrc: v.string(),
  beforeAlt: v.optional(v.string()),
  afterAlt: v.optional(v.string()),
  beforeLabel: v.optional(v.string()),
  afterLabel: v.optional(v.string()),
  sortOrder: v.number(),
  published: v.boolean(),
}

export const list = query({
  args: {},
  returns: v.array(v.object(pairFields)),
  handler: async (ctx) => {
    return await ctx.db.query("sliderPairs").withIndex("by_sort").order("asc").collect()
  },
})

export const listPublished = query({
  args: {},
  returns: v.array(v.object(pairFields)),
  handler: async (ctx) => {
    const all = await ctx.db.query("sliderPairs").withIndex("by_sort").order("asc").collect()
    return all.filter((p) => p.published)
  },
})

export const create = mutation({
  args: {
    title: v.string(),
    beforeSrc: v.string(),
    afterSrc: v.string(),
    beforeAlt: v.optional(v.string()),
    afterAlt: v.optional(v.string()),
    beforeLabel: v.optional(v.string()),
    afterLabel: v.optional(v.string()),
    sortOrder: v.number(),
    published: v.boolean(),
  },
  returns: v.id("sliderPairs"),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error("Neautorizován")
    return await ctx.db.insert("sliderPairs", args)
  },
})

export const update = mutation({
  args: {
    id: v.id("sliderPairs"),
    title: v.string(),
    beforeSrc: v.string(),
    afterSrc: v.string(),
    beforeAlt: v.optional(v.string()),
    afterAlt: v.optional(v.string()),
    beforeLabel: v.optional(v.string()),
    afterLabel: v.optional(v.string()),
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
  args: { id: v.id("sliderPairs") },
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
    const existing = await ctx.db.query("sliderPairs").collect()
    if (existing.length > 0) return null

    await ctx.db.insert("sliderPairs", {
      title: "Kancelářský prostor",
      beforeSrc:
        "https://images.pexels.com/photos/7534172/pexels-photo-7534172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      afterSrc:
        "https://images.pexels.com/photos/6238608/pexels-photo-6238608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      beforeAlt: "Kancelář se standardním osvětlením",
      afterAlt: "Kancelář s prémiovým LED osvětlením BE-LIGHT",
      beforeLabel: "Standardní osvětlení",
      afterLabel: "BE-LIGHT LED",
      sortOrder: 0,
      published: true,
    })

    await ctx.db.insert("sliderPairs", {
      title: "Chodba a průchozí prostory",
      beforeSrc:
        "https://images.pexels.com/photos/804392/pexels-photo-804392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      afterSrc:
        "https://images.pexels.com/photos/6444242/pexels-photo-6444242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      beforeAlt: "Prázdná chodba bez prémiového osvětlení",
      afterAlt: "Moderní chodba s LED osvětlením BE-LIGHT",
      beforeLabel: "Bez úprav",
      afterLabel: "BE-LIGHT LED",
      sortOrder: 1,
      published: true,
    })

    return null
  },
})
