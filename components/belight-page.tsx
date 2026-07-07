"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import BeforeAfterSlider from "@/components/before-after-slider";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const BEFORE_AFTER_PAIRS = [
  {
    id: "office",
    title: "Kancelářský prostor",
    beforeSrc: "https://images.pexels.com/photos/7534172/pexels-photo-7534172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    afterSrc: "https://images.pexels.com/photos/6238608/pexels-photo-6238608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    beforeAlt: "Kancelář se standardním osvětlením",
    afterAlt: "Kancelář s prémiovým LED osvětlením BE-LIGHT",
    beforeLabel: "Standardní osvětlení",
    afterLabel: "BE-LIGHT LED",
  },
  {
    id: "corridor",
    title: "Chodba a průchozí prostory",
    beforeSrc: "https://images.pexels.com/photos/804392/pexels-photo-804392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    afterSrc: "https://images.pexels.com/photos/6444242/pexels-photo-6444242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    beforeAlt: "Prázdná chodba bez prémiového osvětlení",
    afterAlt: "Moderní chodba s LED osvětlením BE-LIGHT",
    beforeLabel: "Bez úprav",
    afterLabel: "BE-LIGHT LED",
  },
];

const NAV_LINKS = [
  { label: "O nás", href: "#o-nas" },
  { label: "Realizace", href: "#realizace" },
  { label: "Showroomy", href: "#showroomy" },
  { label: "Katalogy", href: "/katalogy" },
  { label: "Velkoobchod", href: "/velkoobchod" },
  { label: "Kontakt", href: "#kontakt" },
];

const SHOWROOMS = [
  {
    id: "brno",
    city: "Brno",
    label: "Prodejna, showroom",
    address: "Bohunická 50 – Areál SKANSKA",
    zip: "619 00 Brno",
    hours: ["Po–Čt: 8:00–16:00", "Pá: 8:00–15:00", "So–Ne: Zavřeno"],
    phone: "+420 792 319 348",
    email: "info@belight.cz",
    mapsUrl: "https://maps.google.com/?q=Bohunická+50,+619+00+Brno",
    img: "https://assets.macaly-user-data.dev/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/Jv4Xz6-BoYPce8fbbiT7s/generated-mLlicydF.jpeg",
  },
  {
    id: "ostrava",
    city: "Ostrava",
    label: "Světelné studio",
    address: "28. října 212/227",
    zip: "709 00 Ostrava",
    hours: ["Po–Čt: 8:00–14:00", "Pá: 8:00–12:00", "So–Ne: Zavřeno"],
    phone: "+420 776 068 330",
    email: "filip.balinek@belight.cz",
    mapsUrl: "https://maps.google.com/?q=28.+října+212%2F227,+709+00+Ostrava",
    img: "https://assets.macaly-user-data.dev/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/AhhlNImGSt_JFoepPvO_u/generated-AsjtS-Yi.jpeg",
  },
];


function useScrollAnimation(deps: unknown[] = []) {
  useEffect(() => {
    const revealAll = () => {
      document.querySelectorAll(".scroll-reveal:not(.revealed)").forEach((el) => {
        el.classList.add("revealed");
      });
    };

    const els = document.querySelectorAll(".scroll-reveal:not(.revealed)");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px 100px 0px" }
    );
    els.forEach((el) => observer.observe(el));

    // Fallback: reveal everything after 400ms in case observer doesn't fire
    const fallback = setTimeout(revealAll, 400);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

const HERO_SLIDES = [
  {
    img: "/images/hero-stalalight.jpg",
    alt: "KLUŚ Stalalight – hra světla a stínu",
  },
  {
    img: "/images/hero-retail-rings.jpg",
    alt: "Prémiové LED osvětlení obchodního centra – kruhové svítidlo",
  },
  {
    img: "/images/hero-corridor-linear.jpg",
    alt: "Prémiová chodba s lineárními LED závěsnými svítidly a zelenou stěnou",
  },
  {
    img: "/images/hero-serpent-plus.jpg",
    alt: "KLUŚ Serpent-Plus – konfigurovatelný světelný systém",
  },
  {
    img: "/images/hero-chic-chic.jpg",
    alt: "Chic-Chic Promenada – prémiové LED osvětlení",
  },
];

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1Ef4U8TMHd/?mibextid=wwXIfr",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/be_light_cz?igsh=cnAzM25oODc3dWhl",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@ledshopik_CZ",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/be-light-led/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const SCHEMA_ORG = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "BE-LIGHT",
  "description": "BE-LIGHT – prémiové LED osvětlení na míru pro komerční i rezidenční projekty v ČR a SR. Oficiální distributor KLUŚ design.",
  "url": "https://macaly-yoynr8mzgtw8xuliw7ld87lf.macaly.app",
  "telephone": "+420792319348",
  "email": "info@belight.cz",
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "Bohunická 50 – Areál SKANSKA",
      "addressLocality": "Brno",
      "postalCode": "619 00",
      "addressCountry": "CZ",
    },
    {
      "@type": "PostalAddress",
      "streetAddress": "28. října 212/227",
      "addressLocality": "Ostrava",
      "postalCode": "709 00",
      "addressCountry": "CZ",
    },
  ],
  "areaServed": ["CZ", "SK"],
  "sameAs": [
    "https://www.facebook.com/share/1Ef4U8TMHd/?mibextid=wwXIfr",
    "https://www.instagram.com/be_light_cz?igsh=cnAzM25oODc3dWhl",
    "https://www.youtube.com/@ledshopik_CZ",
    "https://www.linkedin.com/company/be-light-led/",
  ],
};

export default function BelightPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const prevSlideRef = useRef<number | null>(null);
  const [lightbox, setLightbox] = useState<{ projectIdx: number; photoIdx: number } | null>(null);

  const openLightbox = (projectIdx: number) => {
    setLightbox({ projectIdx, photoIdx: 0 });
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    setLightbox(null);
    document.body.style.overflow = "";
  };
  const lightboxNext = () => {
    if (!lightbox) return;
    const photos = (dbProjects ?? [])[lightbox.projectIdx]?.images ?? [];
    setLightbox({ ...lightbox, photoIdx: (lightbox.photoIdx + 1) % photos.length });
  };
  const lightboxPrev = () => {
    if (!lightbox) return;
    const photos = (dbProjects ?? [])[lightbox.projectIdx]?.images ?? [];
    setLightbox({ ...lightbox, photoIdx: (lightbox.photoIdx - 1 + photos.length) % photos.length });
  };

  useScrollAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroSlide((s) => {
        prevSlideRef.current = s;
        return (s + 1) % HERO_SLIDES.length;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lightbox – klávesnice
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") lightboxNext();
      if (e.key === "ArrowLeft") lightboxPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  // Lightbox – swipe na mobilu
  useEffect(() => {
    if (!lightbox) return;
    let startX = 0;
    const onTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const onTouchEnd = (e: TouchEvent) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) diff > 0 ? lightboxNext() : lightboxPrev();
    };
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [lightbox]);

  // ── Convex data ──────────────────────────────────────────────────────────
  const dbProjects = useQuery(api.projects.listPublished);
  const dbShowrooms = useQuery(api.showrooms.listPublished);
  const dbSliderPairs = useQuery(api.sliderPairs.listPublished);
  const settingsList = useQuery(api.settings.list);

  const seedShowrooms = useMutation(api.showrooms.seed);
  const seedSliderPairs = useMutation(api.sliderPairs.seed);

  // ── Contact form ──
  const submitContact = useMutation(api.contactRequests.submit);
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "", consent: false });
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const updateContact = (field: string, value: string | boolean) => setContactForm((p) => ({ ...p, [field]: value }));
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.consent) return;
    setContactStatus("sending");
    try {
      const recaptchaToken = await new Promise<string>((resolve) => {
        const gr = (window as any).grecaptcha;
        gr.ready(async () => resolve(await gr.execute("6LfXdQAtAAAAAHYKMXrOXwzCY0FjOfWb77ULBlnn", { action: "contact" })));
      }).catch(() => "");
      await submitContact({ name: contactForm.name, email: contactForm.email, phone: contactForm.phone || undefined, message: contactForm.message || undefined, source: "homepage" });
      fetch("/api/contact-notify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: contactForm.name, email: contactForm.email, phone: contactForm.phone || undefined, message: contactForm.message || undefined, source: "homepage", recaptchaToken }) }).catch(() => {});
      setContactStatus("sent");
    } catch (err) {
      console.log("[BE-LIGHT] Contact form error:", err);
      setContactStatus("error");
    }
  };

  // Auto-seed on first load if tables are empty
  useEffect(() => {
    if (dbShowrooms !== undefined && dbShowrooms.length === 0) {
      console.log("[BE-LIGHT] Seeding showrooms...");
      seedShowrooms().catch(console.error);
    }
  }, [dbShowrooms]);

  useEffect(() => {
    if (dbSliderPairs !== undefined && dbSliderPairs.length === 0) {
      console.log("[BE-LIGHT] Seeding sliderPairs...");
      seedSliderPairs().catch(console.error);
    }
  }, [dbSliderPairs]);

  // Build settings map for easy lookup
  const settingsMap = (settingsList ?? []).reduce<Record<string, string>>((acc, s) => {
    acc[s.key] = s.value;
    return acc;
  }, {});
  const getSetting = (key: string, fallback: string) => settingsMap[key] ?? fallback;

  // Use DB data when ready, fall back to hardcoded
  const showrooms = (dbShowrooms && dbShowrooms.length > 0) ? dbShowrooms : SHOWROOMS;
  const sliderPairs = (dbSliderPairs && dbSliderPairs.length > 0) ? dbSliderPairs : BEFORE_AFTER_PAIRS;

  // Re-run scroll observer after Convex data loads (new DOM nodes from .map() won't be
  // observed by the initial effect because they didn't exist at mount time)
  useEffect(() => {
    const els = document.querySelectorAll(".scroll-reveal:not(.revealed)");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [showrooms.length, sliderPairs.length, (dbProjects ?? []).length]);

  // Dynamic social links (icons stay, hrefs come from settings if saved)
  const socialLinks = SOCIAL_LINKS.map((s) => ({
    ...s,
    href: getSetting(`social_${s.label.toLowerCase()}`, s.href),
  }));

  console.log("[BE-LIGHT] Page rendered, scrolled:", scrolled, "showrooms:", showrooms.length, "sliderPairs:", sliderPairs.length, "projects:", (dbProjects ?? []).length);

  return (
    <div className="min-h-screen bg-[#0f1623] text-[#ebebeb]">

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ORG) }}
      />

      {/* ── NAVIGATION ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[#0a0a0a]/60 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* Logo – ikona mezi BE a LIGHT, horizontální paprsky z kroužku */}
          <a href="#" className="flex flex-col items-start group">
            <div className="flex items-end gap-2">
              <span className="font-display text-[1.85rem] tracking-[0.06em] font-normal text-white leading-none">BE</span>
              {/* Ikonka: kroužek + paprsky vč. horizontálních vlevo/vpravo */}
              <svg width="36" height="25" viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                {/* Horní paprsek */}
                <line x1="16" y1="2" x2="16" y2="9" stroke="hsl(38,91%,55%)" strokeWidth="1.5" strokeLinecap="round"/>
                {/* Horní šikmé paprsky */}
                <line x1="8"  y1="4"  x2="13" y2="11" stroke="hsl(38,91%,55%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
                <line x1="24" y1="4"  x2="19" y2="11" stroke="hsl(38,91%,55%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
                {/* Levý horizontální paprsek – k textu BE */}
                <line x1="2"  y1="16" x2="9"  y2="16" stroke="hsl(38,91%,55%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.85"/>
                {/* Pravý horizontální paprsek – k textu LIGHT */}
                <line x1="23" y1="16" x2="30" y2="16" stroke="hsl(38,91%,55%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.85"/>
                {/* Kroužek */}
                <circle cx="16" cy="16" r="4.5" stroke="hsl(38,91%,55%)" strokeWidth="1.2" fill="none"/>
                <circle cx="16" cy="16" r="2"   fill="hsl(38,91%,55%)" opacity="0.6"/>
              </svg>
              <span className="font-display text-[1.85rem] tracking-[0.06em] font-normal text-white leading-none">LIGHT</span>
            </div>
            <span className="text-[12px] tracking-[0.3em] text-[#999] uppercase font-sans font-normal hidden sm:block mt-1 self-center">
              Lighting Solutions
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative text-[11.5px] xl:text-[12px] font-medium tracking-[0.18em] uppercase text-[#f0f0f0] hover:text-[hsl(38,91%,55%)] transition-colors duration-300 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[hsl(38,91%,55%)] after:transition-all after:duration-300 hover:after:w-full whitespace-nowrap"
                >
                  {l.label}
                </a>
              </li>
            ))}
            {/* Social icons – subtle, between nav and e-shop */}
            <li className="flex items-center gap-2.5 pl-2 border-l border-white/10">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-white/65 hover:text-[hsl(38,91%,55%)] transition-colors duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </li>
            <li>
              <Link
                href="https://ledshopik.cz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] tracking-[0.25em] uppercase px-5 py-2 border border-[hsl(38,91%,55%)] text-[hsl(38,91%,55%)] hover:bg-[hsl(38,91%,55%)] hover:text-[#0a0a0a] transition-all duration-300"
              >
                E-shop
              </Link>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`} />
            <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
          </button>
        </nav>

        {/* Mobile menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-400 ${menuOpen ? "max-h-96 border-b border-white/5" : "max-h-0"}`}>
          <div className="bg-[#0f1e35] px-6 py-6 flex flex-col gap-5">
            {NAV_LINKS.map((l) =>
              l.href.startsWith("/") ? (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[13.5px] font-medium tracking-[0.25em] uppercase text-[#f0f0f0] hover:text-[hsl(38,91%,55%)] transition-colors"
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[13.5px] font-medium tracking-[0.25em] uppercase text-[#f0f0f0] hover:text-[hsl(38,91%,55%)] transition-colors"
                >
                  {l.label}
                </a>
              )
            )}
            <Link
              href="https://ledshopik.cz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] tracking-[0.25em] uppercase px-5 py-3 border border-[hsl(38,91%,55%)] text-[hsl(38,91%,55%)] text-center"
            >
              E-shop →
            </Link>
            {/* Social icons in mobile menu */}
            <div className="flex items-center gap-5 pt-2 border-t border-white/5">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-[#9ba3af] hover:text-[hsl(38,91%,55%)] transition-colors duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
        {/* Slideshow background */}
        <div className="absolute inset-0">
          {/* Slides with crossfade + Ken Burns */}
          {HERO_SLIDES.map((slide, i) => (
            <div
              key={slide.img}
              className="absolute inset-0"
              style={{
                opacity: i === heroSlide ? 1 : 0,
                transition: "opacity 1s ease-in-out",
              }}
            >
              <img
                src={slide.img}
                alt={slide.alt}
                className="w-full h-full object-cover object-center"
                style={
                  i === heroSlide
                    ? { animation: "kenburns 6s ease-out forwards", willChange: "transform" }
                    : i === prevSlideRef.current
                    ? { animation: "none", transform: "scale(1.08) translateX(-1.5%) translateY(-1%)", willChange: "transform" }
                    : { animation: "none" }
                }
              />
            </div>
          ))}
          {/* Slide dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => { prevSlideRef.current = heroSlide; setHeroSlide(i); }}
                className={`transition-all duration-300 rounded-full ${i === heroSlide ? "w-6 h-1.5 bg-[hsl(38,91%,55%)]" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"}`}
                aria-label={`Snímek ${i + 1}`}
              />
            ))}
          </div>
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1623] via-[#0f1623]/55 to-[#0f1623]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f1623]/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-24 w-full">
          <p className="text-[11px] tracking-[0.4em] uppercase text-[hsl(38,91%,55%)] mb-6 animate-fade-up opacity-0-init">
            <span className="inline-block w-8 h-px bg-[hsl(38,91%,55%)] align-middle mr-3" />
            {getSetting("hero_eyebrow", "LED Lighting Solutions")}
          </p>
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-light leading-[0.9] mb-8 animate-fade-up delay-200 opacity-0-init">
            {getSetting("hero_headline_1", "Světlo, které")}
            <br />
            <span className="italic text-[hsl(38,91%,55%)]">{getSetting("hero_headline_2", "mění prostor.")}</span>
          </h1>
          <p className="text-[18px] text-[#d4dce6] max-w-md leading-relaxed font-sans font-normal animate-fade-up delay-400 opacity-0-init">
            {getSetting("hero_subtext", "Prémiové LED osvětlení – od prodeje a návrhu až po kompletní realizaci. Komerční i rezidenční projekty po celé ČR a SR.")}
          </p>
          <div className="flex gap-4 mt-10 animate-fade-up delay-600 opacity-0-init">
            <a
              href="#realizace"
              className="px-8 py-3.5 bg-[hsl(38,91%,55%)] text-[#0a0a0a] text-[12px] tracking-[0.25em] uppercase font-sans font-medium hover:bg-[hsl(43,75%,65%)] transition-colors duration-300"
            >
              Naše realizace
            </a>
            <a
              href="#kontakt"
              className="px-8 py-3.5 border border-white/20 text-[12px] tracking-[0.25em] uppercase font-sans font-normal hover:border-white/50 transition-colors duration-300"
            >
              Kontaktovat
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 right-12 hidden lg:flex flex-col items-center gap-2 animate-fade-in delay-800 opacity-0-init">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#777] rotate-90 origin-center mb-4">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-[hsl(38,91%,55%)]" />
        </div>
      </section>

      {/* ── O NÁS ── */}
      <section id="o-nas" className="py-20 lg:py-40 max-w-7xl mx-auto px-6 lg:px-12 bg-[#0f1623]">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left */}
          <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700">
            <p className="text-[11px] tracking-[0.4em] uppercase text-[hsl(38,91%,55%)] mb-5">
              <span className="inline-block w-6 h-px bg-[hsl(38,91%,55%)] align-middle mr-3" />
              {getSetting("about_eyebrow", "O společnosti")}
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight mb-8">
              {getSetting("about_headline_1", "Jsme experti")}
              <br />
              {getSetting("about_headline_2", "na světlo.")}
            </h2>
            <p className="text-[18px] text-[#c4ced8] leading-[1.9] font-sans font-normal mb-6">
              {getSetting("about_p1", "BE-LIGHT je česká firma s více než 10 lety zkušeností v oblasti LED osvětlení. Specializujeme se na komplexní osvětlení na míru a spolupracujeme s architekty, designéry i stavebními firmami v ČR i na Slovensku.")}
            </p>
            <p className="text-[18px] text-[#c4ced8] leading-[1.9] font-sans font-normal mb-6">
              {getSetting("about_p2", "Od prvního návrhu až po finální instalaci — jsme s vámi na každém kroku. Jsme officiálním distributorem značky KLUŚ pro Českou republiku — předního evropského výrobce prémiových LED lišt a designového osvětlení.")}
            </p>
            <p className="text-[18px] text-[#c4ced8] leading-[1.9] font-sans font-normal">
              {getSetting("about_p3", "Produkty si můžete prohlédnout osobně v našich showroomech v Brně a Ostravě.")}
            </p>
          </div>

          {/* Right — values */}
          <div className="space-y-10">
            {[
              {
                num: "01",
                title: getSetting("value_01_title", "Návrh na míru"),
                desc: getSetting("value_01_desc", "Každý projekt začíná konzultací a přesným porozuměním vašim potřebám. Navrhujeme osvětlení přesně pro váš prostor."),
              },
              {
                num: "02",
                title: getSetting("value_02_title", "Zakázková výroba"),
                desc: getSetting("value_02_desc", "Vlastní výroba LED osvětlení na míru — od nestandardních délek a tvarů po speciální barevné teploty a výkony. Tam, kde hotové řešení nestačí."),
              },
              {
                num: "03",
                title: getSetting("value_03_title", "Komplexní realizace"),
                desc: getSetting("value_03_desc", "Zajišťujeme vše od dodávky až po odbornou instalaci v ČR i SR. Servis a podpora i po dokončení projektu."),
              },
              {
                num: "04",
                title: getSetting("value_04_title", "Světlo, které si zkusíte"),
                desc: getSetting("value_04_desc", "Brno i Ostrava — dvě světelná studia, kde osvětlení přestane být abstrakcí. Porovnejte barevné teploty, vyzkoušejte profily, poraďte se s expertem."),
              },
              {
                num: "05",
                title: getSetting("value_05_title", "Distributor KLUŚ"),
                desc: getSetting("value_05_desc", "Jsme oficiálním distributorem značky KLUŚ pro ČR — předního evropského výrobce prémiových LED lišt, profilů a designových svítidel."),
              },
            ].map((v, i) => (
              <div
                key={v.num}
                className={`scroll-reveal opacity-0 translate-y-8 transition-all duration-700 delay-[${i * 150}ms] flex gap-6 pb-10 border-b border-white/5 last:border-0`}
              >
                <span className="font-display text-4xl text-[hsl(38,91%,55%)/30] font-normal shrink-0 leading-none">
                  {v.num}
                </span>
                <div>
                  <h3 className="font-display text-xl font-normal mb-2 text-white">
                    {v.title}
                  </h3>
                  <p className="text-[17px] text-[#b8c4d0] leading-relaxed font-sans font-normal">
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REALIZACE ── */}
      <section id="realizace" className="py-16 lg:py-36 bg-[#111c2d]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700 mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <p className="text-[11px] tracking-[0.4em] uppercase text-[hsl(38,91%,55%)] mb-5">
                <span className="inline-block w-6 h-px bg-[hsl(38,91%,55%)] align-middle mr-3" />
                Portfolio
              </p>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight">
                Naše realizace
              </h2>
            </div>
            <p className="text-[16px] text-[#a8b4c0] max-w-xs font-sans font-normal leading-relaxed sm:text-right">
              Ukázka vybraných projektů, na kterých jsme pracovali.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(dbProjects ?? []).map((project, i) => (
              <Link
                key={project._id}
                href={`/realizace/${project.slug}`}
                className={`project-card scroll-reveal opacity-0 translate-y-8 transition-all duration-700 group relative overflow-hidden block ${
                  i === 0 ? "sm:col-span-2 lg:col-span-1" : ""
                } ${i === 3 ? "lg:col-span-2" : ""}`}
              >
                <div className={`relative overflow-hidden ${i === 3 ? "aspect-[21/9]" : "aspect-[4/3]"}`}>
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-[1.15]"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1623]/90 via-transparent to-transparent" />
                  {/* Info always visible */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-[11px] tracking-[0.25em] uppercase text-[hsl(38,91%,55%)] mb-1">
                      {project.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-xl font-normal text-white">
                        {project.title}
                      </h3>
                      {project.images.length > 1 && (
                        <span className="text-[11px] tracking-[0.15em] text-white/70 font-sans">
                          {project.images.length} foto
                        </span>
                      )}
                    </div>
                  </div>
                </div>

              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PŘED / PO SLIDER ── */}
      <section className="py-16 lg:py-36 bg-[#0a0e17]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700 mb-16">
            <p className="text-[11px] tracking-[0.4em] uppercase text-[hsl(38,91%,55%)] mb-5">
              <span className="inline-block w-6 h-px bg-[hsl(38,91%,55%)] align-middle mr-3" />
              Transformace světlem
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight">
                Jak světlo mění prostor.
              </h2>
              <p className="text-[16px] text-[#a8b4c0] max-w-xs font-sans font-normal leading-relaxed sm:text-right">
                Táhněte posuvník a porovnejte rozdíl před a po instalaci prémiového LED osvětlení.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {sliderPairs.map((pair, i) => (
              <div
                key={"_id" in pair ? pair._id : pair.id}
                className={`db-card ${i > 0 ? `db-card-${i}` : ""}`}
              >
                <div className="overflow-hidden border border-white/5">
                  <BeforeAfterSlider
                    beforeSrc={pair.beforeSrc}
                    afterSrc={pair.afterSrc}
                    beforeAlt={pair.beforeAlt}
                    afterAlt={pair.afterAlt}
                    beforeLabel={pair.beforeLabel}
                    afterLabel={pair.afterLabel}
                    initialPosition={42}
                  />
                </div>
                <p className="mt-4 text-[12px] tracking-[0.2em] uppercase text-[#9ba3af] font-sans">
                  {pair.title}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-[15px] text-[#8b96a4] font-sans font-normal text-center">
            * Ilustrativní fotografie. Výsledky realizací BE-LIGHT v galerii výše.
          </p>
        </div>
      </section>

      {/* ── ESHOP BANNER ── */}
      <section className="py-24 lg:py-32 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700 relative overflow-hidden border border-white/8 p-10 lg:p-16">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[hsl(38,91%,55%)/5] rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-lg">
              <p className="text-[11px] tracking-[0.4em] uppercase text-[hsl(38,91%,55%)] mb-4">
                <span className="inline-block w-6 h-px bg-[hsl(38,91%,55%)] align-middle mr-3" />
                E-shop
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight mb-4">
                {getSetting("banner_title", "Hledáte konkrétní LED produkt?")}
              </h2>
              <p className="text-[17px] text-[#b8c4d0] leading-relaxed font-sans font-normal">
                {getSetting("banner_description", "V našem e-shopu LedShopik najdete stovky prémiových LED svítidel, lišt a příslušenství s dopravou po celé ČR i SR.")}
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href={getSetting("banner_link_url", "https://ledshopik.cz")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-4 bg-[hsl(38,91%,55%)] text-[#0a0a0a] text-[12px] tracking-[0.25em] uppercase font-sans font-medium hover:bg-[hsl(43,75%,65%)] transition-colors duration-300 group"
              >
                {getSetting("banner_link_text", "Navštívit e-shop")}
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <p className="text-[12px] text-[#a0aab4] mt-3 text-center font-sans">
                ledshopik.cz
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SHOWROOMY ── */}
      <section id="showroomy" className="py-16 lg:py-36 bg-[#0f1623]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Heading */}
          <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700 mb-16">
            <p className="text-[11px] tracking-[0.4em] uppercase text-[hsl(38,91%,55%)] mb-5">
              <span className="inline-block w-6 h-px bg-[hsl(38,91%,55%)] align-middle mr-3" />
              Showroomy
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight">
                Přijďte se
                <br />
                podívat naživo.
              </h2>
              <p className="text-[16px] text-[#a8b4c0] max-w-xs font-sans font-normal leading-relaxed sm:text-right">
                Produkty, materiály a vzorové instalace si můžete prohlédnout osobně v našich showroomech.
              </p>
            </div>
          </div>

          {/* Showroom cards */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {showrooms.map((showroom, i) => (
              <div
                key={"_id" in showroom ? showroom._id : showroom.id}
                className={`db-card ${i > 0 ? `db-card-${i}` : ""} group relative overflow-hidden`}
              >
                {/* Photo */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={showroom.img}
                    alt={`BE-LIGHT showroom ${showroom.city}`}
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-[1.4]"
                    loading="lazy"
                  />
                  {/* Dark overlay always visible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e18]/90 via-[#0a0e18]/40 to-transparent" />
                  {/* City name on photo */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                    <p className="text-[11px] tracking-[0.35em] uppercase text-[hsl(38,91%,55%)] mb-2 font-sans">
                      {showroom.label}
                    </p>
                    <h3 className="font-display text-4xl lg:text-5xl font-normal text-white">
                      {showroom.city}
                    </h3>
                  </div>
                </div>

                {/* Info panel below photo */}
                <div className="bg-[#111c2d] border border-white/5 p-6 lg:p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                    {/* Address */}
                    <div>
                      <p className="text-[12px] tracking-[0.25em] uppercase text-[#9ba3af] mb-1.5 font-sans">
                        Adresa
                      </p>
                      <p className="text-[16px] text-[#d0d8e2] font-sans font-normal leading-relaxed">
                        {showroom.address}
                        <br />
                        {showroom.zip}
                      </p>
                      <div className="mt-3 space-y-0.5">
                        <a
                          href={`tel:${showroom.phone.replace(/\s/g, "")}`}
                          className="text-[15px] text-[hsl(38,91%,55%)] font-sans font-normal hover:text-[hsl(43,75%,65%)] transition-colors block"
                        >
                          {showroom.phone}
                        </a>
                        <a
                          href={`mailto:${showroom.email}`}
                          className="text-[15px] text-[#a8b4c0] font-sans font-normal hover:text-[hsl(38,91%,55%)] transition-colors block"
                        >
                          {showroom.email}
                        </a>
                      </div>
                    </div>
                    {/* Hours */}
                    <div>
                      <p className="text-[12px] tracking-[0.25em] uppercase text-[#9ba3af] mb-1.5 font-sans">
                        Otevírací doba
                      </p>
                      <div className="space-y-0.5">
                        {showroom.hours.map((line) => (
                          <p key={line} className="text-[15px] text-[#d0d8e2] font-sans font-normal">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href={showroom.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-[11px] tracking-[0.25em] uppercase border border-white/15 px-6 py-3 text-[#c8d0da] hover:border-[hsl(38,91%,55%)] hover:text-[hsl(38,91%,55%)] transition-all duration-300 font-sans group/btn"
                  >
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    Naplánovat trasu
                    <svg className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KONTAKT ── */}
      <section id="kontakt" className="py-16 lg:py-36 bg-[#111c2d]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="lg:grid lg:grid-cols-12 lg:gap-20 items-start">

            {/* Left: sticky heading + description + social */}
            <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700 lg:col-span-5 mb-14 lg:mb-0 lg:sticky lg:top-32">
              <p className="text-[11px] tracking-[0.4em] uppercase text-[hsl(38,91%,55%)] mb-5">
                <span className="inline-block w-6 h-px bg-[hsl(38,91%,55%)] align-middle mr-3" />
                Kontakt
              </p>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight mb-8">
                Pojďme společně
                <br />
                rozsvítit váš projekt.
              </h2>
              <p className="text-[17px] text-[#a8b4c0] font-sans font-normal leading-relaxed mb-10 max-w-sm">
                Máte projekt nebo otázku? Rádi vám pomůžeme navrhnout osvětlení přesně na míru – od konzultace po instalaci.
              </p>

              {/* Social links */}
              <div className="flex items-center gap-5">
                <p className="text-[12px] tracking-[0.25em] uppercase text-[#a0aab4] font-sans">Sledujte nás</p>
                <div className="w-6 h-px bg-white/10" />
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="text-[#9ba3af] hover:text-[hsl(38,91%,55%)] transition-colors duration-300"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Right: contact rows */}
            <div className="lg:col-span-7">

              {/* Telefon */}
              <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700 py-8 border-t border-white/8 flex items-start justify-between gap-6 group">
                <div className="flex-1">
                  <p className="text-[12px] tracking-[0.25em] uppercase text-[#a0aab4] mb-3 font-sans">Telefon</p>
                  <a
                    href={`tel:${getSetting("contact_phone", "+420 792 319 348").replace(/\s/g, "")}`}
                    className="font-display text-2xl sm:text-3xl font-normal text-white hover:text-[hsl(38,91%,55%)] transition-colors duration-300 block mb-1.5"
                  >
                    {getSetting("contact_phone", "+420 792 319 348")}
                  </a>
                  <p className="text-[14px] text-[#a0aab4] font-sans font-normal">{getSetting("contact_hours", "Po–Pá 8–16 hod")}</p>
                </div>
                <div className="w-10 h-10 border border-white/8 group-hover:border-[hsl(38,91%,55%)/40] flex items-center justify-center text-[#8b95a0] group-hover:text-[hsl(38,91%,55%)] transition-all duration-300 shrink-0 mt-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
              </div>

              {/* E-mail */}
              <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700 py-8 border-t border-white/8 flex items-start justify-between gap-6 group">
                <div className="flex-1">
                  <p className="text-[12px] tracking-[0.25em] uppercase text-[#a0aab4] mb-3 font-sans">E-mail</p>
                  <a
                    href={`mailto:${getSetting("contact_email", "info@belight.cz")}`}
                    className="font-display text-2xl sm:text-3xl font-normal text-white hover:text-[hsl(38,91%,55%)] transition-colors duration-300 block mb-1.5"
                  >
                    {getSetting("contact_email", "info@belight.cz")}
                  </a>
                  <p className="text-[14px] text-[#a0aab4] font-sans font-normal">Odpovíme do 24 hodin</p>
                </div>
                <div className="w-10 h-10 border border-white/8 group-hover:border-[hsl(38,91%,55%)/40] flex items-center justify-center text-[#8b95a0] group-hover:text-[hsl(38,91%,55%)] transition-all duration-300 shrink-0 mt-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
              </div>

              {/* Showroomy */}
              <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700 py-8 border-t border-white/8 flex items-start justify-between gap-6 group">
                <div className="flex-1">
                  <p className="text-[12px] tracking-[0.25em] uppercase text-[#a0aab4] mb-3 font-sans">Showroomy</p>
                  <a
                    href="#showroomy"
                    className="font-display text-2xl sm:text-3xl font-normal text-white hover:text-[hsl(38,91%,55%)] transition-colors duration-300 block mb-1.5"
                  >
                    Brno &amp; Ostrava
                  </a>
                  <p className="text-[14px] text-[#a0aab4] font-sans font-normal">Vzorky, profily a katalogy k vidění</p>
                </div>
                <div className="w-10 h-10 border border-white/8 group-hover:border-[hsl(38,91%,55%)/40] flex items-center justify-center text-[#8b95a0] group-hover:text-[hsl(38,91%,55%)] transition-all duration-300 shrink-0 mt-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 2.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                  </svg>
                </div>
              </div>

              {/* Contact form */}
              <div className="scroll-reveal opacity-0 translate-y-8 transition-all duration-700 pt-8 border-t border-white/8">
                <p className="text-[12px] tracking-[0.25em] uppercase text-[#a0aab4] mb-5 font-sans">Napište nám</p>
                {contactStatus === "sent" ? (
                  <div className="py-8 text-center" style={{ background: "rgba(201,168,76,0.06)", borderRadius: "4px" }}>
                    <p className="font-display text-xl font-normal text-gold mb-2">Děkujeme!</p>
                    <p className="text-[14px] text-[#a8b4c0] font-sans font-normal">Vaše zpráva byla odeslána. Ozveme se co nejdříve.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="ct-name" className="text-[12px] tracking-[0.15em] uppercase text-[#a0aab4] font-sans">
                          Jméno <span className="text-gold">*</span>
                        </label>
                        <input id="ct-name" type="text" required value={contactForm.name} onChange={(e) => updateContact("name", e.target.value)}
                          className="bg-white/[0.04] border border-white/10 px-3.5 py-2.5 text-[14px] text-white outline-none focus:border-[hsl(38,91%,55%)] transition-colors font-sans" style={{ borderRadius: "2px" }} />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="ct-email" className="text-[12px] tracking-[0.15em] uppercase text-[#a0aab4] font-sans">
                          E-mail <span className="text-gold">*</span>
                        </label>
                        <input id="ct-email" type="email" required value={contactForm.email} onChange={(e) => updateContact("email", e.target.value)}
                          className="bg-white/[0.04] border border-white/10 px-3.5 py-2.5 text-[14px] text-white outline-none focus:border-[hsl(38,91%,55%)] transition-colors font-sans" style={{ borderRadius: "2px" }} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="ct-phone" className="text-[12px] tracking-[0.15em] uppercase text-[#a0aab4] font-sans">Telefon</label>
                      <input id="ct-phone" type="tel" value={contactForm.phone} onChange={(e) => updateContact("phone", e.target.value)}
                        className="bg-white/[0.04] border border-white/10 px-3.5 py-2.5 text-[14px] text-white outline-none focus:border-[hsl(38,91%,55%)] transition-colors font-sans" style={{ borderRadius: "2px" }} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="ct-msg" className="text-[12px] tracking-[0.15em] uppercase text-[#a0aab4] font-sans">Zpráva</label>
                      <textarea id="ct-msg" rows={3} value={contactForm.message} onChange={(e) => updateContact("message", e.target.value)}
                        className="bg-white/[0.04] border border-white/10 px-3.5 py-2.5 text-[14px] text-white outline-none focus:border-[hsl(38,91%,55%)] transition-colors font-sans resize-y" style={{ borderRadius: "2px" }} />
                    </div>
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input type="checkbox" required checked={contactForm.consent} onChange={(e) => updateContact("consent", e.target.checked)}
                        className="mt-0.5 accent-[hsl(38,91%,55%)]" style={{ width: "15px", height: "15px", flexShrink: 0 }} />
                      <span className="text-[13px] text-[#a0aab4] leading-relaxed font-sans">
                        Souhlasím se{' '}
                        <Link href="/gdpr" className="underline underline-offset-2 decoration-[hsl(38,91%,55%)/50] hover:text-[hsl(38,91%,55%)] transition-colors" target="_blank">
                          zpracováním osobních údajů
                        </Link>.
                      </span>
                    </label>
                    <div className="flex items-center gap-4 pt-1">
                      <button type="submit" disabled={contactStatus === "sending"}
                        className="inline-flex items-center gap-3 text-[12px] tracking-[0.2em] uppercase px-7 py-3 bg-[hsl(38,91%,55%)] text-[#0a0a0a] font-sans font-medium hover:brightness-110 transition-all disabled:opacity-60"
                        style={{ borderRadius: "2px", border: "none", cursor: contactStatus === "sending" ? "wait" : "pointer" }}>
                        {contactStatus === "sending" ? "Odesílám…" : "Odeslat zprávu"}
                        {contactStatus !== "sending" && (
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        )}
                      </button>
                      {contactStatus === "error" && (
                        <p className="text-red-400 text-[13px] font-sans">Něco se pokazilo. Zkuste to znovu.</p>
                      )}
                    </div>
                  </form>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Main row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-5">
            <div className="flex flex-col items-start">
              <div className="flex items-end gap-1.5">
                <span style={{fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 400, letterSpacing: "0.06em", color: "#9ba3af", lineHeight: 1}}>BE</span>
                <svg width="18" height="13" viewBox="0 0 32 22" fill="none" aria-hidden="true">
                  <line x1="16" y1="2" x2="16" y2="9" stroke="hsl(38,91%,55%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
                  <line x1="8"  y1="4" x2="13" y2="11" stroke="hsl(38,91%,55%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.35"/>
                  <line x1="24" y1="4" x2="19" y2="11" stroke="hsl(38,91%,55%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.35"/>
                  <line x1="2"  y1="16" x2="9"  y2="16" stroke="hsl(38,91%,55%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
                  <line x1="23" y1="16" x2="30" y2="16" stroke="hsl(38,91%,55%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
                  <circle cx="16" cy="16" r="4.5" stroke="hsl(38,91%,55%)" strokeWidth="1.2" fill="none" opacity="0.5"/>
                  <circle cx="16" cy="16" r="2"   fill="hsl(38,91%,55%)" opacity="0.3"/>
                </svg>
                <span style={{fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 400, letterSpacing: "0.06em", color: "#9ba3af", lineHeight: 1}}>LIGHT</span>
              </div>
            </div>

            {/* Social icons – centered */}
            <div className="flex items-center gap-5">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-white/65 hover:text-[hsl(38,91%,55%)] transition-colors duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <Link
              href="https://ledshopik.cz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] tracking-[0.2em] uppercase text-[#9ba3af] hover:text-[hsl(38,91%,55%)] transition-colors font-sans"
            >
              ledshopik.cz →
            </Link>
          </div>

          {/* Brand Manual Download */}
          <div className="border-t border-white/5 pt-6 pb-2 flex justify-center">
            <a
              href="/belight_logo_spec.pdf"
              download
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase font-sans text-[#9ba3af] hover:text-[hsl(38,91%,55%)] transition-colors group"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 group-hover:opacity-100 transition-opacity">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Stáhnout logo specifikaci (PDF)
            </a>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/5 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-[12px] text-[#6b7a88] font-sans font-normal">
              © {new Date().getFullYear()} BE-LIGHT s.r.o. Všechna práva vyhrazena.
            </p>
            <p className="text-[12px] text-[#5a6370] font-sans font-normal text-center">
              BE-LIGHT, s.r.o. &nbsp;·&nbsp; Nové sady 988/2, 602 00 Brno &nbsp;·&nbsp; IČ: 05099749 &nbsp;·&nbsp; DIČ: CZ05099749
            </p>
            <Link
              href="/gdpr"
              className="text-[11px] tracking-[0.15em] uppercase text-[#5a6370] hover:text-[hsl(38,91%,55%)] transition-colors font-sans"
            >
              Zpracování osobních údajů
            </Link>
          </div>
        </div>
      </footer>

      {/* Global CSS */}
      <style>{`
        .scroll-reveal.revealed {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(1.5rem); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .db-card { animation: fadeInUp 0.7s cubic-bezier(0.2, 0, 0.1, 1) both; }
        .db-card-1 { animation-delay: 0.15s; }
        .db-card-2 { animation-delay: 0.30s; }
        .db-card-3 { animation-delay: 0.45s; }
        @keyframes kenburns {
          0%   { transform: scale(1)    translateX(0)      translateY(0); }
          100% { transform: scale(1.08) translateX(-1.5%)  translateY(-1%); }
        }
        @keyframes lbFadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* ── LIGHTBOX ── */}
      {lightbox && (() => {
        const project = (dbProjects ?? [])[lightbox.projectIdx];
        const photos = project?.images ?? [];
        const current = lightbox.photoIdx;
        const hasMultiple = photos.length > 1;
        return (
          <div
            className="fixed inset-0 z-[999] flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" />

            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              aria-label="Zavřít"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {/* Foto */}
            <div
              className="relative z-10 w-full h-full flex items-center justify-center p-10 lg:p-16"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                key={current}
                src={photos[current]}
                alt={`${project.title} – foto ${current + 1}`}
                className="max-w-full max-h-full object-contain"
                style={{ animation: "lbFadeIn 0.25s ease" }}
              />
            </div>

            {/* Šipky – jen pokud je více fotek */}
            {hasMultiple && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center border border-white/15 text-white/60 hover:text-white hover:border-white/40 transition-all"
                  aria-label="Předchozí foto"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center border border-white/15 text-white/60 hover:text-white hover:border-white/40 transition-all"
                  aria-label="Další foto"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              </>
            )}

            {/* Info + počítadlo */}
            <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-6 pt-12 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
              <div className="max-w-7xl mx-auto flex items-end justify-between">
                <div>
                  <p className="text-[11px] tracking-[0.25em] uppercase text-[hsl(38,91%,55%)] mb-1">
                    {project.category}
                  </p>
                  <h3 className="font-display text-2xl font-normal text-white">
                    {project.title}
                  </h3>
                </div>
                {hasMultiple && (
                  <div className="flex items-center gap-2">
                    {photos.map((_, idx) => (
                      <span
                        key={idx}
                        className={`block w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          idx === current
                            ? "bg-[hsl(38,91%,55%)] w-4"
                            : "bg-white/30"
                        }`}
                      />
                    ))}
                    <span className="text-[11px] text-white/60 font-sans ml-2">
                      {current + 1} / {photos.length}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
}
