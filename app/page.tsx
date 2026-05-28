import type { Metadata } from "next"
import { fetchQuery } from "convex/nextjs"
import { api } from "@/convex/_generated/api"
import BelightPage from "@/components/belight-page"
import siteMetadata from "@/app/metadata.json"

const BASE_URL = "https://macaly-yoynr8mzgtw8xuliw7ld87lf.macaly.app"

export async function generateMetadata(): Promise<Metadata> {
  const dbMeta = await fetchQuery(api.seoMeta.getByPath, { path: "/" }).catch(() => null)
  const fallback = siteMetadata["/"]
  const title = dbMeta?.title ?? fallback.title
  const description = dbMeta?.description ?? fallback.description
  const ogImage = dbMeta?.ogImage ?? fallback.openGraph.images

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    openGraph: {
      title,
      description,
      type: "website",
      locale: "cs_CZ",
      siteName: "BE-LIGHT",
      images: ogImage ? [{ url: ogImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
    alternates: {
      canonical: BASE_URL,
    },
  }
}

export default function Home() {
  return <BelightPage />
}
