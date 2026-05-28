import { httpRouter } from "convex/server"
import { httpAction } from "./_generated/server"
import { auth } from "./auth"

const http = httpRouter()

auth.addHttpRoutes(http)

// Public endpoint for redirect middleware to fetch active redirects
http.route({
  path: "/redirects",
  method: "GET",
  handler: httpAction(async (ctx) => {
    const redirects = await ctx.runQuery(
      (await import("./_generated/api")).api.redirects.listActive,
      {}
    )
    return new Response(JSON.stringify(redirects), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60",
        "Access-Control-Allow-Origin": "*",
      },
    })
  }),
})

// Internal endpoint to check admin email access
http.route({
  path: "/check-admin-access",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const { email } = await request.json()
    if (!email || typeof email !== "string") {
      return new Response(JSON.stringify({ allowed: false }), { status: 400, headers: { "Content-Type": "application/json" } })
    }
    const allowed = await ctx.runQuery(
      (await import("./_generated/api")).internal.adminWhitelist.isEmailAllowed,
      { email }
    )
    return new Response(JSON.stringify({ allowed }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  }),
})

export default http
