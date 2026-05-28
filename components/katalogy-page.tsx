"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const LOGO_SVG = (
  <div className="flex items-end gap-1">
    <span
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "0.9rem",
        fontWeight: 400,
        letterSpacing: "0.06em",
        color: "#6b7280",
        lineHeight: 1,
      }}
    >
      BE
    </span>
    <svg
      width="16"
      height="11"
      viewBox="0 0 32 22"
      fill="none"
      aria-hidden="true"
    >
      <line x1="16" y1="2" x2="16" y2="9" stroke="hsl(38,91%,55%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="8" y1="4" x2="13" y2="11" stroke="hsl(38,91%,55%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
      <line x1="24" y1="4" x2="19" y2="11" stroke="hsl(38,91%,55%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
      <line x1="2" y1="16" x2="9" y2="16" stroke="hsl(38,91%,55%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="23" y1="16" x2="30" y2="16" stroke="hsl(38,91%,55%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <circle cx="16" cy="16" r="4.5" stroke="hsl(38,91%,55%)" strokeWidth="1.2" fill="none" opacity="0.5" />
      <circle cx="16" cy="16" r="2" fill="hsl(38,91%,55%)" opacity="0.3" />
    </svg>
    <span
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "0.9rem",
        fontWeight: 400,
        letterSpacing: "0.06em",
        color: "#6b7280",
        lineHeight: 1,
      }}
    >
      LIGHT
    </span>
  </div>
);

type Catalog = {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  pdfUrl: string;
  coverUrl: string;
  year?: string;
  language?: string;
  category?: string;
  sortOrder: number;
  published: boolean;
};

function CatalogCard({ catalog }: { catalog: Catalog }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative flex flex-col border border-white/8 overflow-hidden transition-all duration-500 hover:border-[hsl(38,91%,55%)/40] hover:shadow-[0_0_40px_rgba(201,168,76,0.08)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Cover preview */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#111]">
        <img
          src={catalog.coverUrl}
          alt={`Náhled katalogu ${catalog.title}`}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        {catalog.category && (
          <span className="absolute bottom-4 left-4 text-[9px] tracking-[0.35em] uppercase font-sans px-3 py-1.5 bg-black/60 backdrop-blur-sm border border-[hsl(38,91%,55%)/40] text-[hsl(38,91%,55%)]">
            {catalog.category}
          </span>
        )}
        <div
          className="absolute inset-0 bg-[hsl(38,91%,55%)/8] transition-opacity duration-500"
          style={{ opacity: hovered ? 1 : 0 }}
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-4 p-6 bg-[#0f1623] flex-1">
        <div>
          <div className="flex items-center gap-3 mb-2">
            {catalog.year && (
              <span className="text-[9px] tracking-[0.3em] uppercase font-sans text-[#6b7280]">
                {catalog.year}
              </span>
            )}
            {catalog.year && catalog.language && <span className="w-px h-3 bg-white/10" />}
            {catalog.language && (
              <span className="text-[9px] tracking-[0.3em] uppercase font-sans text-[#6b7280]">
                {catalog.language}
              </span>
            )}
          </div>
          <h3 className="font-display text-xl font-normal text-white mb-1">
            {catalog.title}
          </h3>
          {catalog.subtitle && (
            <p className="text-[13px] text-[#7b8794] font-sans font-normal">
              {catalog.subtitle}
            </p>
          )}
        </div>

        {catalog.description && (
          <p className="text-[14px] text-[#8b96a4] font-sans font-normal leading-relaxed flex-1">
            {catalog.description}
          </p>
        )}

        {/* Download button */}
        <a
          href={catalog.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="inline-flex items-center justify-center gap-3 w-full py-3.5 border border-[hsl(38,91%,55%)/50] text-[hsl(38,91%,55%)] text-[11px] tracking-[0.25em] uppercase font-sans hover:bg-[hsl(38,91%,55%)] hover:text-[#0a0a0a] hover:border-[hsl(38,91%,55%)] transition-all duration-300 group/btn mt-auto"
        >
          <svg
            className="w-3.5 h-3.5 group-hover/btn:translate-y-0.5 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
          Stáhnout PDF
        </a>
      </div>
    </div>
  );
}

export default function KatalogyPage() {
  console.log("[BE-LIGHT] KatalogyPage rendered");

  const catalogs = useQuery(api.catalogs.listPublished);
  const seedCatalogs = useMutation(api.catalogs.seed);

  // Auto-seed if empty on first load
  useEffect(() => {
    if (catalogs !== undefined && catalogs.length === 0) {
      console.log("[BE-LIGHT] KatalogyPage: no catalogs, seeding…");
      seedCatalogs().catch(console.error);
    }
  }, [catalogs]);

  return (
    <div className="min-h-screen bg-[#0f1623] text-[#ebebeb]">
      {/* ── HEADER ── */}
      <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <Link href="/" className="flex flex-col items-start">
            <div className="flex items-end gap-2">
              <span className="font-display text-[1.6rem] tracking-[0.06em] font-normal text-white leading-none">
                BE
              </span>
              <svg width="28" height="20" viewBox="0 0 32 22" fill="none" aria-hidden="true">
                <line x1="16" y1="2" x2="16" y2="9" stroke="hsl(38,91%,55%)" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="8" y1="4" x2="13" y2="11" stroke="hsl(38,91%,55%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                <line x1="24" y1="4" x2="19" y2="11" stroke="hsl(38,91%,55%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                <line x1="2" y1="16" x2="9" y2="16" stroke="hsl(38,91%,55%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
                <line x1="23" y1="16" x2="30" y2="16" stroke="hsl(38,91%,55%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
                <circle cx="16" cy="16" r="4.5" stroke="hsl(38,91%,55%)" strokeWidth="1.2" fill="none" />
                <circle cx="16" cy="16" r="2" fill="hsl(38,91%,55%)" opacity="0.6" />
              </svg>
              <span className="font-display text-[1.6rem] tracking-[0.06em] font-normal text-white leading-none">
                LIGHT
              </span>
            </div>
            <span className="text-[10px] tracking-[0.32em] text-[#555] uppercase font-sans hidden sm:block mt-1 self-center">
              Lighting Solutions
            </span>
          </Link>

          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="hidden sm:flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-white/50 hover:text-white/80 transition-colors duration-300 font-sans"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Zpět na web
            </Link>
            <Link
              href="https://ledshopik.cz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] tracking-[0.25em] uppercase px-5 py-2 border border-[hsl(38,91%,55%)] text-[hsl(38,91%,55%)] hover:bg-[hsl(38,91%,55%)] hover:text-[#0a0a0a] transition-all duration-300 font-sans"
            >
              E-shop
            </Link>
          </div>
        </nav>
      </header>

      {/* ── HERO ── */}
      <section className="pt-20 pb-12 lg:pt-28 lg:pb-16 max-w-7xl mx-auto px-6 lg:px-12">
        <p className="text-[11px] tracking-[0.4em] uppercase text-[hsl(38,91%,55%)] mb-6">
          <span className="inline-block w-8 h-px bg-[hsl(38,91%,55%)] align-middle mr-3" />
          Dokumentace
        </p>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-normal tracking-[0.04em] leading-[0.95]">
            Katalogy
            <br />
            <span className="text-[hsl(38,91%,55%)]">ke stažení.</span>
          </h1>
          <p className="text-[16px] text-[#8b96a4] max-w-sm font-sans font-normal leading-relaxed lg:text-right pb-2">
            Stáhněte si produktové katalogy a technickou dokumentaci prémiového
            LED osvětlení KLUŚ design.
          </p>
        </div>
        <div className="mt-10 w-full h-px bg-gradient-to-r from-[hsl(38,91%,55%)/30] via-white/5 to-transparent" />
      </section>

      {/* ── GRID ── */}
      <section className="pb-24 lg:pb-36 max-w-7xl mx-auto px-6 lg:px-12">
        {catalogs === undefined && (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-[hsl(38,91%,55%)] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {catalogs !== undefined && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {catalogs.map((catalog) => (
              <CatalogCard key={catalog._id} catalog={catalog} />
            ))}

            {/* Placeholder card */}
            <div className="border border-dashed border-white/10 aspect-auto flex flex-col items-center justify-center gap-4 p-10 text-center min-h-[400px] hover:border-white/20 transition-colors duration-300">
              <div className="w-12 h-12 border border-white/10 flex items-center justify-center text-white/20">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
              <p className="text-[13px] text-[#555] font-sans font-normal leading-relaxed">
                Další katalogy
                <br />
                budou přidány
              </p>
            </div>
          </div>
        )}
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          {LOGO_SVG}
          <p className="text-[11px] text-[#444] font-sans">
            © {new Date().getFullYear()} BE-LIGHT s.r.o. Všechna práva vyhrazena.
          </p>
          <Link
            href="/"
            className="text-[11px] tracking-[0.2em] uppercase text-[#555] hover:text-[hsl(38,91%,55%)] transition-colors font-sans"
          >
            be-light.cz
          </Link>
        </div>
      </footer>
    </div>
  );
}
