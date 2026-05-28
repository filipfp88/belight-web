import { NextRequest, NextResponse } from "next/server"

interface RedirectEntry {
  from: string
  to: string
  statusCode: number
}

// In-memory cache with TTL (shared across edge invocations per instance)
let cache: RedirectEntry[] | null = null
let cacheExpiry = 0
const CACHE_TTL_MS = 60_000

// E-shop URL prefixes from belightled.cz → redirect to ledshopik.cz
const ESHOP_PREFIXES = [
  "/profil-",
  "/difuzory",
  "/zaslepky-",
  "/led-pasky-",
  "/soubory-ke-stazeni",
  "/videa",
  "/system-",
  "/svitidlovy-system-",
  "/magneticka-listova-",
  "/prisazena-a-zavesena-",
  "/vestavna-lista-",
  "/vestavna-svitidla-",
  "/svitidla-pro-",
  "/listove-svitidlo-",
  "/listova-led-",
  "/lista-",
  "/prislusenstvi-pro-",
  "/napajeci-",
  "/zavesna-",
  "/hotove-",
  "/spojovaci-",
  "/smart-svitidla",
  "/chytra-venkovni",
  "/led-reflektory",
  "/zahradni-led-",
  "/bazenova-led-",
  "/smart-led-",
  "/led-zarovka-",
  "/ovladace-",
  "/stmivace-",
  "/led-panely",
  "/prisazena-svitidla-",
  "/prumyslova-",
  "/prachotesna-",
  "/ufo-high-bay",
  "/led-svitidla-a-lustry",
  "/svitidla-na-dc",
  "/hlinikove-profily",
  "/led-profily-",
  "/fasadni-profil",
  "/profil-do-",
  "/profil-na-sklo",
  "/produkty",
  "/dalkove-ovladace",
]

const LEDSHOPIK_URL = "https://www.ledshopik.cz/"

async function getRedirects(): Promise<RedirectEntry[]> {
  const now = Date.now()
  if (cache && now < cacheExpiry) return cache

  const siteUrl = process.env.NEXT_PUBLIC_CONVEX_SITE_URL
  if (!siteUrl) return []

  try {
    const res = await fetch(`${siteUrl}/redirects`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return cache ?? []
    const data = await res.json()
    cache = data as RedirectEntry[]
    cacheExpiry = now + CACHE_TTL_MS
    return cache
  } catch {
    console.log("[middleware] Failed to fetch redirects, using cache or empty")
    return cache ?? []
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip internal Next.js paths
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  // Check e-shop URL patterns → redirect to ledshopik.cz
  const isEshop = ESHOP_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  if (isEshop) {
    console.log(`[middleware] E-shop redirect: ${pathname} → ${LEDSHOPIK_URL}`)
    return NextResponse.redirect(LEDSHOPIK_URL, { status: 301 })
  }

  // Check database redirects
  const redirects = await getRedirects()
  const match = redirects.find((r) => r.from === pathname)

  if (match) {
    console.log(`[middleware] Redirect: ${match.from} → ${match.to} (${match.statusCode})`)
    // Support external (absolute) URLs and paths with hash fragments
    if (match.to.startsWith("http://") || match.to.startsWith("https://")) {
      return NextResponse.redirect(match.to, { status: match.statusCode })
    }
    if (match.to.includes("#")) {
      // Build full URL with hash so the browser navigates to the anchor
      const fullUrl = new URL(match.to, request.url)
      return NextResponse.redirect(fullUrl.toString(), { status: match.statusCode })
    }
    const url = request.nextUrl.clone()
    url.pathname = match.to
    return NextResponse.redirect(url, { status: match.statusCode })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
}
