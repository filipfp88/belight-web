import Link from "next/link";
import { sanitizeHtml } from "@/lib/sanitize";

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

const WHY_US = [
  { icon: "◈", label: "Preciznost" },
  { icon: "◇", label: "Kvalitní materiály" },
  { icon: "◉", label: "Zkušenosti od roku 2010" },
  { icon: "◎", label: "Profesionální tým" },
  { icon: "◐", label: "Rychlost realizace" },
  { icon: "◑", label: "Moderní technologie" },
];

export type CategoryLandingPageProps = {
  h1: string;
  subtitle: string;
  perex: string;
  paragraphs: string[];
  benefits: string[];
  heroImage: string;
  heroImageAlt: string;
  ctaText?: string;
};

export default function CategoryLandingPage({
  h1,
  subtitle,
  perex,
  paragraphs,
  benefits,
  heroImage,
  heroImageAlt,
  ctaText = "Mám zájem o spolupráci",
}: CategoryLandingPageProps) {
  return (
    <div
      style={{ background: "#080c12", color: "#ebebeb", minHeight: "100vh" }}
      className="font-[DM_Sans,sans-serif]"
    >
      {/* NAV */}
      <nav
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16"
        role="navigation"
        aria-label="Hlavní navigace"
        // Inline style fallback for glassmorphism
      >
        <div style={{ backdropFilter: "blur(20px)", background: "rgba(8,12,18,0.85)", position: "absolute", inset: 0, zIndex: -1 }} />
        <Link href="/" aria-label="BE-LIGHT – zpět na hlavní stránku">
          {LOGO_SVG}
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/#realizace"
            style={{ color: "rgba(235,235,235,0.55)", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase" }}
            className="hover:text-white transition-colors hidden sm:block"
          >
            Realizace
          </Link>
          <Link
            href="/#kontakt"
            style={{
              color: "#080c12",
              background: "hsl(38 91% 55%)",
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "0.45rem 1.1rem",
              borderRadius: "2px",
              fontWeight: 400,
            }}
            className="hover:brightness-110 transition-all"
          >
            Kontakt
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section
        className="relative flex flex-col justify-end"
        style={{ height: "min(70vh, 560px)", marginTop: "4rem" }}
        aria-labelledby="page-heading"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
          }}
          role="img"
          aria-label={heroImageAlt}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, #080c12 0%, rgba(8,12,18,0.7) 40%, rgba(8,12,18,0.3) 100%)",
          }}
        />
        {/* Gold accent line top */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, hsl(38 91% 55% / 0.4), transparent)" }}
        />

        <div className="relative px-6 md:px-16 pb-14 max-w-4xl">
          <p
            style={{
              color: "hsl(38 91% 55%)",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
            }}
          >
            BE-LIGHT · LED osvětlení na míru
          </p>
          <h1
            id="page-heading"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              lineHeight: 1.1,
              letterSpacing: "0.02em",
              color: "#ebebeb",
              marginBottom: "1rem",
            }}
          >
            {h1}
          </h1>
          <p
            style={{
              color: "rgba(235,235,235,0.6)",
              fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
              lineHeight: 1.7,
              maxWidth: "560px",
              fontWeight: 300,
            }}
          >
            {subtitle}
          </p>
        </div>
      </section>

      {/* PEREX + CONTENT */}
      <section className="px-6 md:px-16 py-16 max-w-4xl mx-auto">
        <p
          style={{
            fontFamily: "var(--font-display, 'Jost', sans-serif)",
            fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)",
            lineHeight: 1.75,
            color: "rgba(235,235,235,0.85)",
            fontWeight: 400,
            borderLeft: "2px solid hsl(38 91% 55% / 0.5)",
            paddingLeft: "1.5rem",
            marginBottom: "2.5rem",
          }}
        >
          {perex}
        </p>
        <div className="space-y-5">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              style={{
                color: "rgba(235,235,235,0.65)",
                lineHeight: 1.85,
                fontSize: "0.95rem",
                fontWeight: 300,
              }}
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(p) }}
            />
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section
        className="px-6 md:px-16 py-14"
        style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        aria-label="Výhody LED osvětlení"
      >
        <div className="max-w-4xl mx-auto">
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              color: "#ebebeb",
              marginBottom: "2rem",
              letterSpacing: "0.03em",
            }}
          >
            Proč LED osvětlení?
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {benefits.map((b, i) => (
              <li
                key={i}
                className="flex items-start gap-3"
                style={{ color: "rgba(235,235,235,0.7)", fontSize: "0.92rem", lineHeight: 1.6 }}
              >
                <span style={{ color: "hsl(38 91% 55%)", marginTop: "0.1rem", flexShrink: 0 }}>—</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHY US */}
      <section className="px-6 md:px-16 py-16 max-w-4xl mx-auto" aria-label="Proč řešit projekt s námi">
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(1.4rem, 3vw, 2rem)",
            color: "#ebebeb",
            marginBottom: "2.5rem",
            letterSpacing: "0.03em",
          }}
        >
          Proč řešit projekt s námi
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {WHY_US.map((item) => (
            <div key={item.label} className="flex flex-col gap-2">
              <span style={{ color: "hsl(38 91% 55%)", fontSize: "1.2rem" }} aria-hidden="true">
                {item.icon}
              </span>
              <span style={{ color: "rgba(235,235,235,0.75)", fontSize: "0.88rem", letterSpacing: "0.04em" }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="px-6 md:px-16 py-20 text-center"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.04), transparent)" }}
        aria-label="Kontaktujte nás"
      >
        <p
          style={{
            fontFamily: "var(--font-display, 'Jost', sans-serif)",
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            fontWeight: 400,
            color: "#ebebeb",
            marginBottom: "0.5rem",
          }}
        >
          {ctaText}
        </p>
        <p style={{ color: "rgba(235,235,235,0.45)", fontSize: "0.9rem", marginBottom: "2.5rem" }}>
          Ozveme se nejpozději do 48 hodin
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/#kontakt"
            style={{
              background: "hsl(38 91% 55%)",
              color: "#080c12",
              padding: "0.85rem 2.5rem",
              fontSize: "0.8rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 500,
              borderRadius: "2px",
              display: "inline-block",
            }}
            className="hover:brightness-110 transition-all"
          >
            Nezávazná poptávka
          </Link>
          <a
            href="tel:+420792319348"
            style={{
              color: "rgba(235,235,235,0.6)",
              fontSize: "0.9rem",
              letterSpacing: "0.04em",
            }}
            className="hover:text-white transition-colors"
          >
            +420 792 319 348
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "2rem 1.5rem" }}
        className="text-center"
      >
        <Link href="/" style={{ color: "rgba(235,235,235,0.3)", fontSize: "0.78rem", letterSpacing: "0.1em" }} className="hover:text-white/60 transition-colors">
          ← Zpět na BE-LIGHT
        </Link>
        <p style={{ color: "rgba(235,235,235,0.2)", fontSize: "0.72rem", marginTop: "0.75rem" }}>
          © {new Date().getFullYear()} BE-LIGHT s.r.o. · LED osvětlení na míru
        </p>
      </footer>
    </div>
  );
}
