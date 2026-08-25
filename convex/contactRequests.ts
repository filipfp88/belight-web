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
    attachmentUrl: v.optional(v.string()),
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
    attachmentUrl: v.optional(v.string()),
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

    // 3. Send email notification via Resend
    const resendApiKey = process.env.RESEND_API_KEY
    const recipientEmail = process.env.RECIPIENT_EMAIL ?? "ondrej.benada@ledshopik.cz"

    if (!resendApiKey) {
      console.log("[ContactRequest] RESEND_API_KEY missing, skipping notification")
      return id
    }

    const sourceLabel = args.source === "velkoobchod" ? "Velkoobchod (B2B)" : args.source
    const rows = [
      ["Zdroj", sourceLabel],
      ["Jméno", args.name],
      ["Email", args.email],
      args.phone ? ["Telefon", args.phone] : null,
      args.city ? ["Město", args.city] : null,
    ].filter(Boolean) as [string, string][]

    const tableRows = rows.map(([label, value]) =>
      `<tr><td style="padding:6px 12px;color:#666;width:100px;">${label}</td><td style="padding:6px 12px;font-weight:500;">${value}</td></tr>`
    ).join("")

    const messageHtml = args.message
      ? `<p style="margin-top:16px;padding:12px;background:#f9f9f9;border-radius:6px;white-space:pre-wrap;">${args.message}</p>`
      : ""

    const attachmentHtml = args.attachmentUrl
      ? `<p style="margin-top:16px;"><a href="${args.attachmentUrl}" style="color:#C9A84C;font-weight:500;">📎 Zobrazit přílohu</a></p>`
      : ""

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "BE-LIGHT Web <noreply@belight.cz>",
          to: recipientEmail,
          subject: `[BE-LIGHT] Nová poptávka — ${sourceLabel} — ${args.name}`,
          html: `
            <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;">
              <h2 style="color:#1a1a1a;margin-bottom:4px;">Nová poptávka z webu</h2>
              <p style="color:#999;margin-bottom:24px;font-size:13px;">BE-LIGHT — belight.cz</p>
              <table style="width:100%;border-collapse:collapse;">${tableRows}</table>
              ${messageHtml}
              ${attachmentHtml}
            </div>
          `,
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
