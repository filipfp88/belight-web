import { internalMutation, action } from "./_generated/server"
import { v } from "convex/values"
import { getAuthUserId } from "@convex-dev/auth/server"
import { internal } from "./_generated/api"

// All content redirects from belightled.cz → belight.cz
const CONTENT_REDIRECTS: { from: string; to: string; note: string }[] = [
  // General pages
  { from: "/kdo-jsme/", to: "/#o-nas", note: "Kdo jsme → O nás" },
  { from: "/kontakty/", to: "/#kontakt", note: "Kontakty → Kontakt" },
  { from: "/showroom-a-prodejna/", to: "/#kontakt", note: "Showroom → Kontakt" },
  { from: "/kontaktni-formular-odeslan/", to: "/", note: "Formulář odeslán → Home" },
  { from: "/chyba-odeslani-formulare/", to: "/", note: "Chyba formuláře → Home" },
  { from: "/zpracovani-osobnich-udaju/", to: "/", note: "GDPR → Home" },

  // Reference pages → /#realizace
  { from: "/reference/", to: "/#realizace", note: "Reference → Realizace" },
  { from: "/barbershop-profil-ostrava/", to: "/#realizace", note: "Barbershop Ostrava → Realizace" },
  { from: "/barcelo-hotel/", to: "/#realizace", note: "Barcelo Hotel → Realizace" },
  { from: "/gesipa-brno/", to: "/#realizace", note: "Gesipa Brno → Realizace" },
  { from: "/anybody-hotel-brno/", to: "/#realizace", note: "Anybody Hotel → Realizace" },
  { from: "/byt-boskovice/", to: "/#realizace", note: "Byt Boskovice → Realizace" },
  { from: "/slast-bar/", to: "/#realizace", note: "Slast Bar → Realizace" },
  { from: "/rd-slapanice-u-brna/", to: "/#realizace", note: "RD Slapanice → Realizace" },
  { from: "/charakter-praha/", to: "/#realizace", note: "Charakter Praha → Realizace" },
  { from: "/omega-brno/", to: "/#realizace", note: "Omega Brno → Realizace" },
  { from: "/barber-striharna-brno/", to: "/#realizace", note: "Barber Střihárna → Realizace" },
  { from: "/byt-brno-centrum/", to: "/#realizace", note: "Byt Brno centrum → Realizace" },
  { from: "/klenotnictvi-bisaku-bratislava/", to: "/#realizace", note: "Klenotnictví Bisaku → Realizace" },
  { from: "/osvetleni-pergoly-okres-vyskov/", to: "/#realizace", note: "Pergola Vyškov → Realizace" },
  { from: "/restaurace-akat-brno/", to: "/#realizace", note: "Restaurace Akat → Realizace" },
  { from: "/restaurace-jakoby-jakubske-namesti-brno/", to: "/#realizace", note: "Restaurace Jakoby → Realizace" },
  { from: "/restaurace-tusto-znojmo/", to: "/#realizace", note: "Restaurace Tusto → Realizace" },
  { from: "/tawan-brno/", to: "/#realizace", note: "Tawan Brno → Realizace" },
  { from: "/rd-velke-pavlovice/", to: "/#realizace", note: "RD Velké Pavlovice → Realizace" },
  { from: "/expozice-centrum-kastanova-brno/", to: "/#realizace", note: "Centrum Kaštanová → Realizace" },
  { from: "/kocour-pub-brno/", to: "/#realizace", note: "Kocour Pub → Realizace" },
  { from: "/pivnice-sborovna-brno/", to: "/#realizace", note: "Pivnice Sborovna → Realizace" },

  // Domácnost landing pages
  { from: "/realizace-led-osvetleni-na-miru-do-domacnosti/", to: "/#realizace", note: "Realizace domácnost → Realizace" },
  { from: "/navrh-a-montaz-led-osvetleni-na-miru-domacnost/", to: "/led-osvetleni-obyvaciho-pokoje/", note: "Návrh domácnost → Obývák" },
  { from: "/led-osvetleni-chodby/", to: "/#realizace", note: "Chodba → Realizace" },
  { from: "/led-osvetleni-chodby-0/", to: "/#realizace", note: "Chodba-0 → Realizace" },
  { from: "/led-osvetleni-pracovny/", to: "/#realizace", note: "Pracovna → Realizace" },
  { from: "/led-osvetleni-zahrady/", to: "/#kontakt", note: "Zahrada → Kontakt" },
  { from: "/led-osvetleni-bazenu/", to: "/#kontakt", note: "Bazén → Kontakt" },
  { from: "/led-osvetleni-akvarii/", to: "/#kontakt", note: "Akvárium → Kontakt" },
  { from: "/atypicke-projekty/", to: "/#realizace", note: "Atypické projekty → Realizace" },

  // Firemní landing pages
  { from: "/led-osvetleni-hotelu-a-restauraci/", to: "/realizace-led-osvetleni-pro-firmy/", note: "Hotel/restaurace → Firmy" },
  { from: "/led-osvetleni-budovy/", to: "/realizace-led-osvetleni-pro-firmy/", note: "Budova → Firmy" },
  { from: "/led-osvetleni-kancelare/", to: "/realizace-led-osvetleni-pro-firmy/", note: "Kancelář → Firmy" },
  { from: "/led-osvetleni-arealu-a-sportovist/", to: "/realizace-led-osvetleni-pro-firmy/", note: "Areál/sportoviště → Firmy" },
  { from: "/led-osvetleni-dilny-a-garaze/", to: "/realizace-led-osvetleni-pro-firmy/", note: "Dílna/garáž → Firmy" },
  { from: "/led-osvetleni-haly/", to: "/realizace-led-osvetleni-pro-firmy/", note: "Hala → Firmy" },
  { from: "/led-osvetleni-prodejny/", to: "/realizace-led-osvetleni-pro-firmy/", note: "Prodejna → Firmy" },
  { from: "/led-osvetleni-skladu/", to: "/realizace-led-osvetleni-pro-firmy/", note: "Sklad → Firmy" },
  { from: "/led-osvetleni-pracovny-0/", to: "/realizace-led-osvetleni-pro-firmy/", note: "Pracovna-0 → Firmy" },
  { from: "/navrh-a-montaz-led-osvetleni-na-miru-firmy/", to: "/realizace-led-osvetleni-pro-firmy/", note: "Návrh firmy → Firmy" },

  // Veřejná správa
  { from: "/poulicni-led-osvetleni/", to: "/projekty-na-miru-pro-statni-a-verejnou-spravu/", note: "Pouliční → Veřejná správa" },
  { from: "/navrh-a-montaz-led-osvetleni-na-miru-verejnost/", to: "/projekty-na-miru-pro-statni-a-verejnou-spravu/", note: "Návrh veřejnost → Veřejná správa" },

  // Zakázková výroba
  { from: "/zakazkova-vyroba-led-osvetleni-a-led-pasku/", to: "/#kontakt", note: "Zakázková výroba → Kontakt" },

  // O nás subsections
  { from: "/preciznost/", to: "/#o-nas", note: "Preciznost → O nás" },
  { from: "/kvalitni-materialy/", to: "/#o-nas", note: "Materiály → O nás" },
  { from: "/zkusenosti-od-roku-2010/", to: "/#o-nas", note: "Zkušenosti → O nás" },
  { from: "/profesionalni-tym/", to: "/#o-nas", note: "Tým → O nás" },
  { from: "/rychlost-realizace/", to: "/#o-nas", note: "Rychlost → O nás" },
  { from: "/moderni-technologie/", to: "/#o-nas", note: "Technologie → O nás" },
]

export const seedRedirects = internalMutation({
  args: {},
  returns: v.number(),
  handler: async (ctx) => {
    // Get existing 'from' paths to avoid duplicates
    const existing = await ctx.db.query("redirects").collect()
    const existingFroms = new Set(existing.map((r) => r.from))

    let count = 0
    for (const r of CONTENT_REDIRECTS) {
      if (!existingFroms.has(r.from)) {
        await ctx.db.insert("redirects", {
          from: r.from,
          to: r.to,
          statusCode: 301,
          active: true,
          note: r.note,
        })
        count++
      }
    }
    console.log(`[seeder] Inserted ${count} new redirects (${existing.length} already existed)`)
    return count
  },
})

export const runSeedRedirects = action({
  args: {},
  returns: v.number(),
  handler: async (ctx): Promise<number> => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error("Neautorizován")
    const count: number = await ctx.runMutation(internal.seeders.seedRedirects, {})
    return count
  },
})
