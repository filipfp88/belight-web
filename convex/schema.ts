import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"
import { authTables } from "@convex-dev/auth/server"

export default defineSchema({
  ...authTables,

  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    role: v.optional(v.string()),
  }).index("email", ["email"]),

  projects: defineTable({
    slug: v.string(),
    title: v.string(),
    category: v.string(),
    description: v.optional(v.string()),
    images: v.array(v.string()),
    sortOrder: v.number(),
    published: v.boolean(),
    legacyId: v.optional(v.number()),
    legacyUrl: v.optional(v.string()),
  })
    .index("by_slug", ["slug"])
    .index("by_sort", ["sortOrder"]),

  seoMeta: defineTable({
    path: v.string(),
    title: v.string(),
    description: v.string(),
    ogImage: v.optional(v.string()),
  }).index("by_path", ["path"]),

  redirects: defineTable({
    from: v.string(),
    to: v.string(),
    statusCode: v.number(),
    active: v.boolean(),
    note: v.optional(v.string()),
  }).index("by_from", ["from"]),

  siteSettings: defineTable({
    key: v.string(),
    value: v.string(),
  }).index("by_key", ["key"]),

  catalogs: defineTable({
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
  }).index("by_sort", ["sortOrder"]),

  sliderPairs: defineTable({
    title: v.string(),
    beforeSrc: v.string(),
    afterSrc: v.string(),
    beforeAlt: v.optional(v.string()),
    afterAlt: v.optional(v.string()),
    beforeLabel: v.optional(v.string()),
    afterLabel: v.optional(v.string()),
    sortOrder: v.number(),
    published: v.boolean(),
  }).index("by_sort", ["sortOrder"]),

  adminWhitelist: defineTable({
    email: v.string(),
    note: v.optional(v.string()),
  }).index("by_email", ["email"]),

  showrooms: defineTable({
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
  }).index("by_sort", ["sortOrder"]),

  contactRequests: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    city: v.optional(v.string()),
    message: v.optional(v.string()),
    source: v.string(),
    attachmentUrl: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_created", ["createdAt"]),
})
