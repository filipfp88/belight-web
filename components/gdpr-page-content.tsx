"use client";

import Link from 'next/link';

export default function GdprPageContent() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ebebeb]">
      {/* Header */}
      <header className="border-b border-white/5 py-5 px-6 lg:px-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 text-[#a0aab4] hover:text-[hsl(38,91%,55%)] transition-colors text-[12px] tracking-[0.18em] uppercase font-sans"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M5 12l7-7M5 12l7 7" />
          </svg>
          Zpět na hlavní stránku
        </Link>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 lg:px-12 py-16 lg:py-24">

        {/* Title */}
        <div className="mb-12">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[hsl(38,91%,55%)] font-sans mb-4">Právní informace</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, letterSpacing: '0.04em', fontSize: 'clamp(2rem, 4vw, 2.8rem)', lineHeight: 1.1 }}>
            Zpracování osobních údajů
          </h1>
          <div className="mt-4 h-px w-16 bg-[hsl(38,91%,55%)] opacity-40" />
        </div>

        {/* Section: Souhlas */}
        <section className="mb-10">
          <p className="text-[15px] text-[#c8cfd8] leading-relaxed font-sans">
            Udělením souhlasu se zpracováním osobních údajů svolujete, aby společnost{' '}
            <strong className="text-[#ebebeb] font-medium">BE-LIGHT, s.r.o.</strong>, se sídlem Nové sady 988/2,
            IČ: 05099749, zapsaná ve veřejném rejstříku vedená krajským soudem v Brně, v oddíle C, vložce 93518
            (dále jen „Správce"), v souladu s Nařízením (EU) 2016/679 (GDPR) o ochraně osobních údajů
            zpracovávala tyto vaše osobní údaje:{' '}
            <span className="text-[#ebebeb]">jméno a příjmení, název společnosti, e-mail, telefonní číslo, adresu.</span>
          </p>
          <p className="mt-4 text-[15px] text-[#c8cfd8] leading-relaxed font-sans">
            Zmíněné osobní údaje zpracováváme za účelem{' '}
            <strong className="text-[#ebebeb] font-medium">zasílání obchodních nabídek</strong> a Správce je
            bude zpracovávat po dobu <strong className="text-[#ebebeb] font-medium">3 let</strong>.
          </p>
          <p className="mt-4 text-[15px] text-[#c8cfd8] leading-relaxed font-sans">
            S výše uvedeným zpracováním vyjmenovaných osobních údajů udělujete svůj výslovný a informovaný souhlas,
            který ale můžete vzít kdykoliv zpět. Stačí zaslat e-mail nebo dopis na adresu společnosti{' '}
            <strong className="text-[#ebebeb] font-medium">BE-LIGHT, Táborská 179, 615 00 Brno</strong>.
          </p>
        </section>

        {/* Divider */}
        <div className="h-px bg-white/5 my-10" />

        {/* Section: Zpracovatelé */}
        <section className="mb-10">
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, letterSpacing: '0.04em', fontSize: '1.25rem' }} className="text-[#ebebeb] mb-5">
            Zpracovatelé osobních údajů
          </h2>
          <p className="text-[14px] text-[#a0aab4] leading-relaxed font-sans mb-5">
            Osobní údaje, k jejichž zpracování jste udělili svůj souhlas, mohou pro Správce zpracovávat i tito zpracovatelé:
          </p>
          <ul className="space-y-4">
            <li className="pl-4 border-l border-[hsl(38,91%,55%)/30] border-opacity-30" style={{ borderLeftColor: 'hsla(38,91%,55%,0.25)' }}>
              <p className="text-[14px] text-[#c8cfd8] leading-relaxed font-sans">
                <strong className="text-[#ebebeb] font-medium">Shean s.r.o.</strong>, se sídlem Svitavská 500, 678 01 Blansko,
                IČ 26768479, zapsaná v Obchodním rejstříku vedeném Krajským soudem v Brně v oddíle C, vložce 48866,
                jako poskytovatel servisu webu.
              </p>
            </li>
            <li className="pl-4" style={{ borderLeft: '1px solid hsla(38,91%,55%,0.25)' }}>
              <p className="text-[14px] text-[#c8cfd8] leading-relaxed font-sans">
                <strong className="text-[#ebebeb] font-medium">Účetnictví Braunschläger s.r.o.</strong>, se sídlem Cornovova 1007/49,
                618 00 Brno, IČ 28354940, zapsaná v Obchodním rejstříku vedeném Krajským soudem v Brně v oddíle C, vložce 63272,
                jako poskytovatel účetních služeb.
              </p>
            </li>
            <li className="pl-4" style={{ borderLeft: '1px solid hsla(38,91%,55%,0.25)' }}>
              <p className="text-[14px] text-[#a0aab4] leading-relaxed font-sans italic">
                Případně další společnosti, jejichž služby zatím Správce nevyužívá.
              </p>
            </li>
          </ul>
        </section>

        {/* Divider */}
        <div className="h-px bg-white/5 my-10" />

        {/* Section: Vaše práva */}
        <section className="mb-10">
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, letterSpacing: '0.04em', fontSize: '1.25rem' }} className="text-[#ebebeb] mb-5">
            Vaše práva podle GDPR
          </h2>
          <p className="text-[14px] text-[#a0aab4] leading-relaxed font-sans mb-5">
            Podle Nařízení GDPR o ochraně osobních údajů máte právo:
          </p>
          <ul className="space-y-3">
            {[
              'Vzít svůj souhlas kdykoliv zpět',
              'Požadovat po nás zprávy o tom, jaké vaše osobní údaje zpracováváme',
              'Požadovat po nás vysvětlení důvodu a způsobu zpracování osobních údajů',
              'Požádat o přístup k těmto údajům, které můžete opravit nebo aktualizovat',
              'Požadovat po nás smazání svých osobních údajů',
              'Obrátit se na nás nebo na Úřad pro ochranu osobních údajů, pokud budete mít pochybnosti o dodržování povinností zpracování osobních údajů z naší strany',
            ].map((right, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-[hsl(38,91%,55%)] opacity-70 shrink-0" />
                <span className="text-[14px] text-[#c8cfd8] leading-relaxed font-sans">{right}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Divider */}
        <div className="h-px bg-white/5 my-10" />

        {/* CTA – kontakt */}
        <section>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, letterSpacing: '0.04em', fontSize: '1.25rem' }} className="text-[#ebebeb] mb-4">
            Kontaktujte nás
          </h2>
          <p className="text-[14px] text-[#a0aab4] leading-relaxed font-sans mb-6">
            Pokud chcete odvolat souhlas nebo uplatnit svá práva, napište nám:
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:info@ledshopik.cz"
              className="inline-flex items-center gap-2.5 text-[12px] tracking-[0.18em] uppercase font-sans text-[#a0aab4] hover:text-[hsl(38,91%,55%)] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              info@ledshopik.cz
            </a>
            <a
              href="/#kontakt"
              className="inline-flex items-center gap-2.5 text-[12px] tracking-[0.18em] uppercase font-sans text-[#a0aab4] hover:text-[hsl(38,91%,55%)] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.14 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.05 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16l.92.92z" />
              </svg>
              Kontaktní formulář
            </a>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-[#5a6370] font-sans">
            © {new Date().getFullYear()} BE-LIGHT s.r.o. &nbsp;·&nbsp; IČ: 05099749
          </p>
          <Link
            href="/"
            className="text-[11px] tracking-[0.2em] uppercase text-[#6b7a88] hover:text-[hsl(38,91%,55%)] transition-colors font-sans"
          >
            be-light.cz
          </Link>
        </div>
      </footer>
    </div>
  );
}
