import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { fetchQuery } from "convex/nextjs"
import { api } from "@/convex/_generated/api"
import ProjectDetailContent from "@/components/project-detail-content"
import siteMetadata from "@/app/metadata.json"

const BASE_URL = "https://macaly-yoynr8mzgtw8xuliw7ld87lf.macaly.app"

export const dynamicParams = true

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await fetchQuery(api.projects.getBySlug, { slug }).catch(() => null)
  if (!project) return {}

  const path = `/realizace/${slug}`
  const dbMeta = await fetchQuery(api.seoMeta.getByPath, { path }).catch(() => null)

  const jsonMeta = siteMetadata[path as keyof typeof siteMetadata] as
    | { title: string; description: string; openGraph: { images: string } }
    | undefined

  const title =
    dbMeta?.title ??
    jsonMeta?.title ??
    `${project.title} – LED realizace | BE-LIGHT`
  const description =
    dbMeta?.description ??
    jsonMeta?.description ??
    project.description ??
    `Realizace LED osvětlení – ${project.title}. Profesionální návrh a instalace osvětlení na míru od BE-LIGHT.`
  const ogImage =
    dbMeta?.ogImage ??
    jsonMeta?.openGraph?.images ??
    project.images[0] ??
    undefined

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    openGraph: {
      title,
      description,
      type: "article",
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
      canonical: `${BASE_URL}/realizace/${slug}`,
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await fetchQuery(api.projects.getBySlug, { slug }).catch(() => null)
  if (!project) notFound()

  return <ProjectDetailContent project={project} />
}
