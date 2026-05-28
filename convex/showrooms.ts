import { query, mutation } from "./_generated/server"
import { v } from "convex/values"
import { getAuthUserId } from "@convex-dev/auth/server"

const showroomFields = {
  _id: v.id("showrooms"),
  _creationTime: v.number(),
  city: v.string(),
  label: v.optional(v.string()),
  address: v.string(),
  zip: v.optional(v.string()),
  hours: v.array(v.string()),
  phone: v.optional(v.string()),
  email: v.optional(v.string()),
  mapsUrl: v.optional(v.string()),
  img: v.optional(v.string()),
  sortOrder: v.number(),
  published: v.boolean(),
}

export const list = query({
  args: {},
  returns: v.array(v.object(showroomFields)),
  handler: async (ctx) => {
    return await ctx.db.query("showrooms").withIndex("by_sort").order("asc").collect()
  },
})

export const listPublished = query({
  args: {},
  returns: v.array(v.object(showroomFields)),
  handler: async (ctx) => {
    const all = await ctx.db.query("showrooms").withIndex("by_sort").order("asc").collect()
    return all.filter((s) => s.published)
  },
})

export const create = mutation({
  args: {
    city: v.string(),
    label: v.optional(v.string()),
    address: v.string(),
    zip: v.optional(v.string()),
    hours: v.array(v.string()),
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
    mapsUrl: v.optional(v.string()),
    img: v.optional(v.string()),
    sortOrder: v.number(),
    published: v.boolean(),
  },
  returns: v.id("showrooms"),
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error("Neautorizován")
    return await ctx.db.insert("showrooms", args)
  },
})

export const update = mutation({
  args: {
    id: v.id("showrooms"),
    city: v.string(),
    label: v.optional(v.string()),
    address: v.string(),
    zip: v.optional(v.string()),
    hours: v.array(v.string()),
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
    mapsUrl: v.optional(v.string()),
    img: v.optional(v.string()),
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
  args: { id: v.id("showrooms") },
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
    const existing = await ctx.db.query("showrooms").collect()
    if (existing.length > 0) return null

    await ctx.db.insert("showrooms", {
      city: "Brno",
      label: "Prodejna, showroom",
      address: "Bohunická 50 – Areál SKANSKA",
      zip: "619 00 Brno",
      hours: ["Po–Čt: 8:00–16:00", "Pá: 8:00–15:00", "So–Ne: Zavřeno"],
      phone: "+420 792 319 348",
      email: "info@belight.cz",
      mapsUrl: "https://maps.google.com/?q=Bohunická+50,+619+00+Brno",
      img: "https://assets.macaly-user-data.dev/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/Jv4Xz6-BoYPce8fbbiT7s/generated-mLlicydF.jpeg",
      sortOrder: 0,
      published: true,
    })

    await ctx.db.insert("showrooms", {
      city: "Ostrava",
      label: "Světelné studio",
      address: "28. října 212/227",
      zip: "709 00 Ostrava",
      hours: ["Po–Čt: 8:00–14:00", "Pá: 8:00–12:00", "So–Ne: Zavřeno"],
      phone: "+420 776 068 330",
      email: "filip.balinek@belight.cz",
      mapsUrl: "https://maps.google.com/?q=28.+října+212%2F227,+709+00+Ostrava",
      img: "https://assets.macaly-user-data.dev/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/AhhlNImGSt_JFoepPvO_u/generated-AsjtS-Yi.jpeg",
      sortOrder: 1,
      published: true,
    })

    return null
  },
})
