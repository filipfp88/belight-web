"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

/* ─── Logo (reused from category landing pages) ─── */
const LOGO_SVG = (
  <div className="flex items-end gap-1">
    <span
      style={{
        fontFamily: "var(--font-display, 'Jost', sans-serif)",
        fontSize: "1rem",
        fontWeight: 400,
        letterSpacing: "0.06em",
        color: "hsl(38 91% 55%)",
        lineHeight: 1,
      }}
    >
      BE
    </span>
    <svg width="18" height="12" viewBox="0 0 32 22" fill="none" aria-hidden="true">
      <line x1="16" y1="2" x2="16" y2="9" stroke="hsl(38,91%,55%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="8" y1="4" x2="13" y2="11" stroke="hsl(38,91%,55%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="24" y1="4" x2="19" y2="11" stroke="hsl(38,91%,55%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="2" y1="16" x2="9" y2="16" stroke="hsl(38,91%,55%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="23" y1="16" x2="30" y2="16" stroke="hsl(38,91%,55%)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <circle cx="16" cy="16" r="4.5" stroke="hsl(38,91%,55%)" strokeWidth="1.2" fill="none" opacity="0.7" />
      <circle cx="16" cy="16" r="2" fill="hsl(38,91%,55%)" opacity="0.4" />
    </svg>
    <span
      style={{
        fontFamily: "var(--font-display, 'Jost', sans-serif)",
        fontSize: "1rem",
        fontWeight: 400,
        letterSpacing: "0.06em",
        color: "hsl(0 0% 80%)",
        lineHeight: 1,
      }}
    >
      LIGHT
    </span>
  </div>
);

/* ─── Data ─── */
const BENEFITS = [
  {
    title: "Individuální velkoobchodní ceny",
    text: "Nastavujeme B2B cenové podmínky individuálně podle typu spolupráce a očekávaného obratu.",
    icon: "01",
  },
  {
    title: "Stabilní sklad a rychlé dodání",
    text: "LED pásky, hliníkové profily, napájecí zdroje, ovladače, LED panely i SMART osvětlení – klíčové produkty držíme skladem.",
    icon: "02",
  },
  {
    title: "Technická podpora a konzultace",
    text: "Pomůžeme s návrhem správného řešení – výkon, napětí, chlazení, CRI, životnost i kompatibilita.",
    icon: "03",
  },
  {
    title: "Zakázková výroba a úpravy",
    text: "LED pásky na míru, konkrétní délky, napájení, kabeláž nebo předpřipravené sestavy přesně podle projektu.",
    icon: "04",
  },
  {
    title: "Přehledný B2B účet",
    text: "Přístup k velkoobchodním cenám a historii objednávek online. Žádné složité procesy.",
    icon: "05",
  },
];

const TARGET_GROUPS = [
  "Elektroinstalační firmy",
  "Montážníci LED osvětlení",
  "Architekti a interiérová studia",
  "Výrobci nábytku",
  "Developeři a stavební firmy",
  "Projekční kanceláře",
];

const WHY_US = [
  "Technická znalost produktů",
  "Kvalita komponentů",
  "Rychlá a přímá komunikace",
  "Schopnost reagovat rychle",
  "Řešení problémů, když nastanou",
  "Zkušenosti od roku 2010",
];

const STEPS = [
  {
    step: "01",
    title: "Registrace na e-shopu",
    text: "Zaregistrujte se na ledshopik.cz",
  },
  {
    step: "02",
    title: "Kontaktujte nás",
    text: "Napište nám s žádostí o aktivaci B2B režimu",
  },
  {
    step: "03",
    title: "Nastavení podmínek",
    text: "Po ověření vám nastavíme velkoobchodní ceny a podmínky",
  },
];

export default function VelkoobchodPageContent() {
  const submitContact = useMutation(api.contactRequests.submit);
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    message: "",
    consent: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.consent) return;

    setFormState("sending");
    try {
      await submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        city: formData.city || undefined,
        message: formData.message || undefined,
        source: "velkoobchod",
      });

      // Fire-and-forget email notification via action
      fetch("/api/contact-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          city: formData.city || undefined,
          message: formData.message || undefined,
          source: "velkoobchod",
        }),
      }).catch(() => {});

      setFormState("sent");
      console.log("[Velkoobchod] Form submitted successfully");
    } catch (err) {
      console.log("[Velkoobchod] Form error:", err);
      setFormState("error");
    }
  };

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const goldHsl = "hsl(38 91% 55%)";

  return (
    <div style={{ background: "#080c12", color: "#ebebeb", minHeight: "100vh" }} className="font-sans">
      {/* ── NAV ── */}
      <nav
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16"
        role="navigation"
        aria-label="Hlavní navigace"
      >
        <div
          style={{
            backdropFilter: "blur(20px)",
            background: "rgba(8,12,18,0.85)",
            position: "absolute",
            inset: 0,
            zIndex: -1,
          }}
        />
        <Link href="/" aria-label="BE-LIGHT – zpět na hlavní stránku">
          {LOGO_SVG}
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/#realizace"
            className="hover:text-white transition-colors hidden sm:block"
            style={{
              color: "rgba(235,235,235,0.55)",
              fontSize: "0.78rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Realizace
          </Link>
          <Link
            href="https://ledshopik.cz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors hidden sm:block"
            style={{
              color: "rgba(235,235,235,0.55)",
              fontSize: "0.78rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            E-shop
          </Link>
          <a
            href="#kontaktni-formular"
            style={{
              color: "#080c12",
              background: goldHsl,
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "0.45rem 1.1rem",
              borderRadius: "2px",
              fontWeight: 500,
            }}
            className="hover:brightness-110 transition-all"
          >
            Mám zájem
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        className="relative flex flex-col justify-end"
        style={{ height: "min(70vh, 560px)", marginTop: "4rem" }}
        aria-labelledby="page-heading"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/1253128/pexels-photo-1253128.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1)",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
          }}
          role="img"
          aria-label="Komerční LED osvětlení – velkoobchod BE-LIGHT"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, #080c12 0%, rgba(8,12,18,0.75) 40%, rgba(8,12,18,0.35) 100%)",
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(to right, transparent, hsl(38 91% 55% / 0.4), transparent)",
          }}
        />

        <div className="relative px-6 md:px-16 pb-14 max-w-4xl">
          <p
            style={{
              color: goldHsl,
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
              fontWeight: 400,
            }}
          >
            BE-LIGHT · B2B spolupráce
          </p>
          <h1
            id="page-heading"
            className="font-serif"
            style={{
              fontWeight: 300,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              lineHeight: 1.1,
              letterSpacing: "0.02em",
              color: "#ebebeb",
              marginBottom: "1rem",
            }}
          >
            Velkoobchod LED osvětlení
          </h1>
          <p
            style={{
              color: "rgba(235,235,235,0.6)",
              fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
              lineHeight: 1.7,
              maxWidth: "560px",
              fontWeight: 400,
            }}
          >
            Hledáte stabilního dodavatele LED osvětlení pro své projekty? Nejsme jen e-shop.
            Jsme partner pro projekty.
          </p>
        </div>
      </section>

      {/* ── PEREX ── */}
      <section className="px-6 md:px-16 py-16 max-w-4xl mx-auto">
        <p
          style={{
            fontFamily: "var(--font-display, 'Jost', sans-serif)",
            fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)",
            lineHeight: 1.75,
            color: "rgba(235,235,235,0.85)",
            fontWeight: 400,
            borderLeft: `2px solid hsl(38 91% 55% / 0.5)`,
            paddingLeft: "1.5rem",
            marginBottom: "1rem",
          }}
        >
          V rámci velkoobchodní spolupráce dodáváme LED osvětlení firmám, montážníkům, architektům,
          výrobcům nábytku i elektroinstalačním společnostem po celé ČR.
        </p>
        <p style={{ color: "rgba(235,235,235,0.55)", lineHeight: 1.85, fontSize: "0.95rem" }}>
          Potřebujete jistotu dostupnosti, férové obchodní podmínky a technickou podporu, která
          opravdu funguje? Dlouhodobá spolupráce funguje jen tam, kde obě strany vydělávají a
          zároveň si šetří čas.
        </p>
      </section>

      {/* ── BENEFITS ── */}
      <section
        className="px-6 md:px-16 py-16"
        style={{
          background: "rgba(255,255,255,0.02)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
        aria-label="Výhody velkoobchodní spolupráce"
      >
        <div className="max-w-5xl mx-auto">
          <p
            style={{
              color: goldHsl,
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "1.5rem",
                height: "1px",
                background: goldHsl,
                verticalAlign: "middle",
                marginRight: "0.75rem",
              }}
            />
            Co vám přinese spolupráce
          </p>
          <h2
            className="font-serif"
            style={{
              fontWeight: 300,
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              color: "#ebebeb",
              marginBottom: "2.5rem",
              letterSpacing: "0.03em",
            }}
          >
            Velkoobchodní podmínky na míru
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {BENEFITS.map((b) => (
              <div key={b.icon} className="flex flex-col gap-3">
                <span
                  style={{
                    color: goldHsl,
                    fontSize: "0.7rem",
                    letterSpacing: "0.15em",
                    fontFamily: "'Jost', sans-serif",
                  }}
                >
                  {b.icon}
                </span>
                <h3
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "1.05rem",
                    fontWeight: 500,
                    color: "#ebebeb",
                    letterSpacing: "0.04em",
                  }}
                >
                  {b.title}
                </h3>
                <p style={{ color: "rgba(235,235,235,0.55)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                  {b.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRO KOHO + PROČ MY ── */}
      <section className="px-6 md:px-16 py-16 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Pro koho */}
          <div>
            <p
              style={{
                color: goldHsl,
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              Pro koho
            </p>
            <h2
              className="font-serif"
              style={{
                fontWeight: 300,
                fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                color: "#ebebeb",
                marginBottom: "1.5rem",
                letterSpacing: "0.03em",
              }}
            >
              Komu je velkoobchod určen
            </h2>
            <ul className="space-y-2.5">
              {TARGET_GROUPS.map((g) => (
                <li
                  key={g}
                  className="flex items-start gap-3"
                  style={{ color: "rgba(235,235,235,0.7)", fontSize: "0.93rem", lineHeight: 1.6 }}
                >
                  <span style={{ color: goldHsl, flexShrink: 0 }}>—</span>
                  {g}
                </li>
              ))}
            </ul>
            <p
              style={{
                color: "rgba(235,235,235,0.45)",
                fontSize: "0.85rem",
                marginTop: "1.25rem",
                lineHeight: 1.7,
              }}
            >
              Pokud pracujete s LED osvětlením pravidelně, dává B2B režim smysl.
            </p>
          </div>

          {/* Proč my */}
          <div>
            <p
              style={{
                color: goldHsl,
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              Proč právě my
            </p>
            <h2
              className="font-serif"
              style={{
                fontWeight: 300,
                fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                color: "#ebebeb",
                marginBottom: "1.5rem",
                letterSpacing: "0.03em",
              }}
            >
              Co nás odlišuje
            </h2>
            <ul className="space-y-2.5">
              {WHY_US.map((w) => (
                <li
                  key={w}
                  className="flex items-start gap-3"
                  style={{ color: "rgba(235,235,235,0.7)", fontSize: "0.93rem", lineHeight: 1.6 }}
                >
                  <span style={{ color: goldHsl, flexShrink: 0 }}>—</span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── JAK ZAČÍT ── */}
      <section
        className="px-6 md:px-16 py-16"
        style={{
          background: "rgba(255,255,255,0.02)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <p
            style={{
              color: goldHsl,
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            3 jednoduché kroky
          </p>
          <h2
            className="font-serif"
            style={{
              fontWeight: 300,
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              color: "#ebebeb",
              marginBottom: "2.5rem",
              letterSpacing: "0.03em",
            }}
          >
            Jak zahájit spolupráci
          </h2>

          <div className="grid sm:grid-cols-3 gap-8">
            {STEPS.map((s) => (
              <div key={s.step} className="flex flex-col gap-3">
                <span
                  style={{
                    color: goldHsl,
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "2rem",
                    fontWeight: 300,
                    lineHeight: 1,
                    letterSpacing: "0.05em",
                  }}
                >
                  {s.step}
                </span>
                <h3
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "1.05rem",
                    fontWeight: 500,
                    color: "#ebebeb",
                    letterSpacing: "0.04em",
                  }}
                >
                  {s.title}
                </h3>
                <p style={{ color: "rgba(235,235,235,0.55)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                  {s.text}
                </p>
              </div>
            ))}
          </div>

          <p
            style={{
              color: "rgba(235,235,235,0.4)",
              fontSize: "0.85rem",
              marginTop: "2rem",
              lineHeight: 1.7,
            }}
          >
            Jednoduché. Bez zbytečných formulářů a administrativy.
          </p>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section
        id="kontaktni-formular"
        className="px-6 md:px-16 py-20 scroll-mt-20"
        aria-label="Kontaktní formulář"
      >
        <div className="max-w-2xl mx-auto">
          <p
            style={{
              color: goldHsl,
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "1.5rem",
                height: "1px",
                background: goldHsl,
                verticalAlign: "middle",
                marginRight: "0.75rem",
              }}
            />
            Kontakt
          </p>
          <h2
            className="font-serif"
            style={{
              fontWeight: 300,
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              color: "#ebebeb",
              marginBottom: "0.75rem",
              letterSpacing: "0.03em",
            }}
          >
            Mám zájem o spolupráci
          </h2>
          <p
            style={{
              color: "rgba(235,235,235,0.45)",
              fontSize: "0.88rem",
              marginBottom: "2.5rem",
              lineHeight: 1.7,
            }}
          >
            Vyplňte formulář a ozveme se nejpozději do 48 hodin.
          </p>

          {formState === "sent" ? (
            <div
              style={{
                background: "rgba(201,168,76,0.08)",
                border: "1px solid rgba(201,168,76,0.2)",
                borderRadius: "4px",
                padding: "2rem",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  color: goldHsl,
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "1.2rem",
                  fontWeight: 500,
                  marginBottom: "0.5rem",
                }}
              >
                Děkujeme za váš zájem!
              </p>
              <p style={{ color: "rgba(235,235,235,0.6)", fontSize: "0.9rem" }}>
                Vaše poptávka byla odeslána. Ozveme se vám co nejdříve.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="vo-name"
                    style={{
                      color: "rgba(235,235,235,0.6)",
                      fontSize: "0.75rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Jméno a příjmení <span style={{ color: goldHsl }}>*</span>
                  </label>
                  <input
                    id="vo-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "2px",
                      padding: "0.7rem 1rem",
                      color: "#ebebeb",
                      fontSize: "0.9rem",
                      outline: "none",
                    }}
                    className="focus:border-[hsl(38,91%,55%)] transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="vo-email"
                    style={{
                      color: "rgba(235,235,235,0.6)",
                      fontSize: "0.75rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Email <span style={{ color: goldHsl }}>*</span>
                  </label>
                  <input
                    id="vo-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "2px",
                      padding: "0.7rem 1rem",
                      color: "#ebebeb",
                      fontSize: "0.9rem",
                      outline: "none",
                    }}
                    className="focus:border-[hsl(38,91%,55%)] transition-colors"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="vo-phone"
                    style={{
                      color: "rgba(235,235,235,0.6)",
                      fontSize: "0.75rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Telefon
                  </label>
                  <input
                    id="vo-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "2px",
                      padding: "0.7rem 1rem",
                      color: "#ebebeb",
                      fontSize: "0.9rem",
                      outline: "none",
                    }}
                    className="focus:border-[hsl(38,91%,55%)] transition-colors"
                  />
                </div>

                {/* City */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="vo-city"
                    style={{
                      color: "rgba(235,235,235,0.6)",
                      fontSize: "0.75rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Město
                  </label>
                  <input
                    id="vo-city"
                    type="text"
                    value={formData.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "2px",
                      padding: "0.7rem 1rem",
                      color: "#ebebeb",
                      fontSize: "0.9rem",
                      outline: "none",
                    }}
                    className="focus:border-[hsl(38,91%,55%)] transition-colors"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="vo-message"
                  style={{
                    color: "rgba(235,235,235,0.6)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Stručný popis požadavku
                </label>
                <textarea
                  id="vo-message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "2px",
                    padding: "0.7rem 1rem",
                    color: "#ebebeb",
                    fontSize: "0.9rem",
                    outline: "none",
                    resize: "vertical",
                  }}
                  className="focus:border-[hsl(38,91%,55%)] transition-colors"
                />
              </div>

              {/* Consent */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.consent}
                  onChange={(e) => updateField("consent", e.target.checked)}
                  className="mt-1 accent-[hsl(38,91%,55%)]"
                  style={{ width: "16px", height: "16px", flexShrink: 0 }}
                />
                <span style={{ color: "rgba(235,235,235,0.55)", fontSize: "0.8rem", lineHeight: 1.6 }}>
                  Souhlasím se{' '}
                  <Link href="/gdpr" target="_blank" style={{ color: "hsl(38,91%,55%)", textDecoration: "underline", textUnderlineOffset: "2px", opacity: 0.8 }}>
                    zpracováním osobních údajů
                  </Link>{' '}
                  za účelem odpovědi na můj požadavek. Souhlas lze vzít kdykoliv zpět zasláním e-mailu na{' '}
                  <a href="mailto:info@ledshopik.cz" style={{ color: "inherit" }}>info@ledshopik.cz</a>.
                </span>
              </label>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                <button
                  type="submit"
                  disabled={formState === "sending"}
                  style={{
                    background: goldHsl,
                    color: "#080c12",
                    padding: "0.85rem 2.5rem",
                    fontSize: "0.8rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    borderRadius: "2px",
                    border: "none",
                    cursor: formState === "sending" ? "wait" : "pointer",
                    opacity: formState === "sending" ? 0.7 : 1,
                    transition: "all 0.3s",
                  }}
                  className="hover:brightness-110"
                >
                  {formState === "sending" ? "Odesílám…" : "Odeslat nezávazný požadavek"}
                </button>

                {formState === "error" && (
                  <p style={{ color: "#ef4444", fontSize: "0.85rem" }}>
                    Něco se pokazilo. Zkuste to znovu nebo nám zavolejte.
                  </p>
                )}
              </div>

              <p style={{ color: "rgba(235,235,235,0.3)", fontSize: "0.78rem", marginTop: "0.5rem" }}>
                Položky označené * musí být vyplněny.
              </p>
            </form>
          )}

          {/* Phone fallback */}
          <div
            style={{
              marginTop: "2.5rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p style={{ color: "rgba(235,235,235,0.4)", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
              Nebo nám zavolejte
            </p>
            <a
              href="tel:+420792319348"
              style={{
                color: "#ebebeb",
                fontSize: "1.3rem",
                fontFamily: "'Jost', sans-serif",
                fontWeight: 400,
                letterSpacing: "0.04em",
              }}
              className="hover:text-[hsl(38,91%,55%)] transition-colors"
            >
              +420 792 319 348
            </a>
            <p style={{ color: "rgba(235,235,235,0.3)", fontSize: "0.78rem", marginTop: "0.25rem" }}>
              Po–Pá · 8–16 hod
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "2rem 1.5rem" }}
        className="text-center"
      >
        <Link
          href="/"
          style={{ color: "rgba(235,235,235,0.3)", fontSize: "0.78rem", letterSpacing: "0.1em" }}
          className="hover:text-white/60 transition-colors"
        >
          ← Zpět na BE-LIGHT
        </Link>
        <p style={{ color: "rgba(235,235,235,0.2)", fontSize: "0.72rem", marginTop: "0.75rem" }}>
          © {new Date().getFullYear()} BE-LIGHT s.r.o. · LED osvětlení na míru
        </p>
      </footer>
    </div>
  );
}
