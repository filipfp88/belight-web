"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
type ProjectData = {
  slug: string;
  title: string;
  category: string;
  description?: string;
  images: string[];
};

export default function ProjectDetailContent({ project }: { project: ProjectData }) {
  console.log("[ProjectDetail] rendering:", project.slug, "images:", project.images.length);

  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);

  const prev = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i - 1 + project.images.length) % project.images.length));
  }, [project.images.length]);

  const next = useCallback(() => {
    setLightbox((i) => (i === null ? null : (i + 1) % project.images.length));
  }, [project.images.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightbox, prev, next]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#ebebeb]">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 h-20 border-b border-white/5 bg-[#0a0a0a]/90 backdrop-blur-md">
        <Link href="/" className="flex flex-col items-start group">
          <div className="flex items-end gap-2">
            <span className="font-display text-[1.85rem] tracking-[0.06em] font-normal text-white leading-none">BE</span>
            <svg width="36" height="25" viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <line x1="16" y1="2" x2="16" y2="9" stroke="hsl(38,91%,55%)" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="8"  y1="4"  x2="13" y2="11" stroke="hsl(38,91%,55%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
              <line x1="24" y1="4"  x2="19" y2="11" stroke="hsl(38,91%,55%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
              <line x1="2"  y1="16" x2="9"  y2="16" stroke="hsl(38,91%,55%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.85"/>
              <line x1="23" y1="16" x2="30" y2="16" stroke="hsl(38,91%,55%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.85"/>
              <circle cx="16" cy="16" r="4.5" stroke="hsl(38,91%,55%)" strokeWidth="1.2" fill="none"/>
              <circle cx="16" cy="16" r="2" fill="hsl(38,91%,55%)" opacity="0.6"/>
            </svg>
            <span className="font-display text-[1.85rem] tracking-[0.06em] font-normal text-white leading-none">LIGHT</span>
          </div>
          <span className="text-[11.5px] tracking-[0.32em] text-[#666] uppercase font-sans hidden sm:block mt-1 self-center">
            Lighting Solutions
          </span>
        </Link>

        <Link
          href="/#realizace"
          className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[#8b96a4] hover:text-[#C9A84C] transition-colors font-sans"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Všechny realizace
        </Link>
      </nav>

      {/* Page header */}
      <div className="pt-36 pb-12 px-6 lg:px-16 max-w-7xl mx-auto">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A84C] mb-5 font-sans">
          {project.category}
        </p>
        <h1 className="font-display text-5xl lg:text-7xl xl:text-8xl font-normal tracking-[0.04em] text-white leading-[0.95]">
          {project.title}
        </h1>
      </div>

      {/* Main content: description + gallery */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 pb-28 lg:grid lg:grid-cols-12 lg:gap-16">

        {/* Left: description + CTA (sticky on desktop) */}
        <div className="lg:col-span-4 mb-12 lg:mb-0">
          <div className="lg:sticky lg:top-28">
            {project.description && (
              <div className="space-y-4 mb-10">
                {project.description.split("\n\n").map((para, i) => (
                  <p key={i} className="text-[17px] text-[#9aa4ae] font-sans font-normal leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            )}

            <div className="pt-8 border-t border-white/8">
              <p className="text-[14px] text-[#6b7280] font-sans font-normal mb-5">
                Máte zájem o podobnou realizaci?
              </p>
              <a
                href={`mailto:info@belight.cz?subject=${encodeURIComponent(`Poptávka – ${project.title}`)}&body=${encodeURIComponent(`Dobrý den,\n\nmám zájem o podobnou realizaci jako "${project.title}".\n\nJméno:\nTelefon:\nZpráva:\n`)}`}
                className="inline-flex items-center gap-3 text-[11px] tracking-[0.25em] uppercase border border-[#C9A84C]/50 px-7 py-4 text-[#C9A84C] hover:border-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all duration-300 font-sans"
              >
                Nezávazná poptávka
              </a>
            </div>
          </div>
        </div>

        {/* Right: photo grid */}
        <div className="lg:col-span-8">
          {project.images.length > 0 && (
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {project.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => openLightbox(i)}
                  className="relative overflow-hidden aspect-[3/4] bg-white/5 group cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50"
                  aria-label={`Zobrazit foto ${i + 1} v plné velikosti`}
                >
                  <img
                    src={img}
                    alt={`${project.title} – foto ${i + 1}`}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                  />
                  {/* Hover overlay with zoom icon */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 rounded-full p-3">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors p-2 z-10"
            aria-label="Zavřít"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.3em] text-white/40 font-sans uppercase z-10">
            {lightbox + 1} / {project.images.length}
          </div>

          {/* Prev button */}
          {project.images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-3 z-10"
              aria-label="Předchozí foto"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          )}

          {/* Image */}
          <div
            className="max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={project.images[lightbox]}
              alt={`${project.title} – foto ${lightbox + 1}`}
              className="max-w-full max-h-[90vh] object-contain select-none"
              draggable={false}
            />
          </div>

          {/* Next button */}
          {project.images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-3 z-10"
              aria-label="Další foto"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          )}
        </div>
      )}
    </main>
  );
}
