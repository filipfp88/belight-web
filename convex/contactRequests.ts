import { v } from "convex/values"
import { mutation, action, query } from "./_generated/server"
import { api } from "./_generated/api"
import { getAuthUserId } from "@convex-dev/auth/server"

export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    city: v.optional(v.string()),
    message: v.optional(v.string()),
    source: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("contactRequests", {
      ...args,
      createdAt: Date.now(),
    })
    console.log("[ContactRequest] Saved:", id, args.email, args.source)
    return id
  },
})

export const submitAndNotify = action({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    city: v.optional(v.string()),
    message: v.optional(v.string()),
    source: v.string(),
    recaptchaToken: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<string> => {
    // 1. Ověření reCAPTCHA tokenu
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY
    if (recaptchaSecret && args.recaptchaToken) {
      const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${recaptchaSecret}&response=${args.recaptchaToken}`,
      })
      const verifyData = await verifyRes.json()
      if (!verifyData.success || verifyData.score < 0.5) {
        throw new Error("reCAPTCHA ověření selhalo")
      }
    }

    // 2. Save to database
    const { recaptchaToken: _, ...submitArgs } = args
    const id: string = await ctx.runMutation(api.contactRequests.submit, submitArgs) as string

    // 2. Send email notification
    const endpoint = process.env.EMAIL_NOTIFICATION_ENDPOINT
    const recipientEmail = process.env.RECIPIENT_EMAIL
    const chatId = process.env.CHAT_ID
    const appName = process.env.APP_NAME
    const secretKey = process.env.SECRET_KEY

    if (!endpoint || !recipientEmail || !chatId || !appName || !secretKey) {
      console.log("[ContactRequest] Email env vars missing, skipping notification")
      return id
    }

    const sourceLabel = args.source === "velkoobchod" ? "Velkoobchod (B2B)" : args.source
    const messageBody = [
      `Nová poptávka z webu BE-LIGHT`,
      ``,
      `Zdroj: ${sourceLabel}`,
      `Jméno: ${args.name}`,
      `Email: ${args.email}`,
      args.phone ? `Telefon: ${args.phone}` : null,
      args.city ? `Město: ${args.city}` : null,
      args.message ? `\nZpráva:\n${args.message}` : null,
    ]
      .filter(Boolean)
      .join("\n")

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toEmail: recipientEmail,
          subject: `[BE-LIGHT] Nová poptávka – ${sourceLabel} – ${args.name}`,
          message: messageBody,
          chatId,
          appName,
          secretKey,
        }),
      })
      if (!res.ok) {
        console.log("[ContactRequest] Email failed:", res.status, await res.text())
      } else {
        console.log("[ContactRequest] Email sent to", recipientEmail)
      }
    } catch (err) {
      console.log("[ContactRequest] Email error:", err)
    }

    return id
  },
})

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error("Neautorizován")
    return await ctx.db
      .query("contactRequests")
      .withIndex("by_created")
      .order("desc")
      .take(100)
  },
})
