export type Project = {
  id: number;
  slug: string;
  title: string;
  category: string;
  description?: string;
  images: string[];
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    slug: "barcelo-hotel",
    title: "Barcelo Hotel *****",
    category: "Hospitality",
    description:
      "Spolupráce s hotelem Barcelo trvá již mnoho let. Začalo to rozsáhlou výměnou osvětlení ve vstupní hale, následně jsme se přesunuli do suterénů ke konferenčním sálům, fitness a wellness prostorům. Nyní probíhá další etapa rekonstrukce starého osvětlení na hotelových pokojích – nepřímé osvětlení a koupelnové osvětlení. Veškeré osvětlení je vyrobeno z našich kvalitních LED pásků a ALU profilů.",
    images: [
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/4TEgdfM8BbsTh0gqBlPO5.jpeg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/oXTPL8q3jJzalz4nVZJc2.jpg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/DtiWAFdk6mPnOMATrlLIE.jpg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/t1CuWA6po0XmGW_sDg-vH.jpg",
    ],
  },
  {
    id: 2,
    slug: "barbershop-profil-ostrava",
    title: "Barbershop PROFIL",
    category: "Komerční prostory",
    description:
      "V novém barbershopu PROFIL na ulici Janáčkova v Ostravě jsme řešili jediné: aby světlo nebylo jen pouhé světlo, ale aby opravdu pomáhalo. U tohoto typu provozu rozhodují milimetry – každý přechod, každá kontura, každý detail vousu musí být dokonale vidět.\n\nNavrhli jsme a dodali lineární osvětlení z hliníkového profilu JAZ s mléčným půlkulatým difuzorem, osazené CCT LED pásky s možností změny teploty chromatičnosti. Výsledkem je flexibilní pracovní světlo, které si barber jednoduše přizpůsobí podle fáze práce i denní doby.\n\nStudenější odstín podporuje maximální preciznost při detailní práci. Teplejší světlo vytváří příjemnou a uvolněnou atmosféru pro klienta. Jedním klikem lze prostor přepnout z pracovního režimu do komfortního nastavení.",
    images: [
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/qDfpEe6YWNXRk6o9ILA71.jpeg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/necVpGSA8boR_gP4fr5Ux.jpeg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/sjdCmFKd6U3sNQhEmegTt.jpeg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/wo18O0vB6Ygh-5FtOAvgy.jpeg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/MUPcNBx0DXNYPgr2zV8WD.jpeg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/HEMgqIKOhZpwcW8dsQvAx.jpeg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/paRswWY3d9tmylPgXwKAG.jpeg",
    ],
  },
  {
    id: 3,
    slug: "anybody-hotel-brno",
    title: "Anybody Hotel Brno",
    category: "Hospitality",
    description:
      "Jedinečný projekt zážitkového hotelu Anybody v Brně, kde se každý host může stát opravdu kýmkoliv. Každý pokoj je inspirován jinou filmovou předlohou a pestrost volby osvětlení zde byla klíčová.\n\nOsvětlení v každém pokoji je ovládáno pomocí tabletu komunikujícího prostřednictvím protokolu ZIGBEE. Architekt v koordinaci s námi navrhl osvětlení každého pokoje zcela unikátně – tak aby nejlépe nastínil atmosféru příslušné filmové předlohy.\n\nSpolečným jmenovatelem všech pokojů je náš nejmodernější LED pásek RGB+CCT 5v1 s příkonem 25 W/m, u kterého lze plynule měnit teplotu chromatičnosti bílého světla od teplé po studenou a navíc svítit libovolnou barvou RGB. V koupelnách jsme použili osvědčené hliníkové profily KLUŚ GIZA s hranatým difuzorem G-K, osazené výkonnými RGBW pásky (25 W/m), ovládanými RF nástěnným ovladačem Mi-Light MLB0.\n\nDíky tomu, že jsme byli u projektu od samotného začátku, jsme měli dostatek času vše perfektně připravit a zkoordinovat se všemi ostatními řemesly.",
    images: [
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/QnH2irNqHnhGu8vMQCbeG.jpg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/zhMj7FJjDC2vLU_1HmsqD.jpg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/w0qKNPJbkngH2ykQiNC2t.jpg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/PZ2D-nccKjxV7NJ3s0zqf.png",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/kvKxHuym9MMuNajmL8mG5.jpg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/HF2j1f-Rt3gkAEhTF1dMB.jpg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/4f5NjXI3aWtKIJVEZd15K.jpg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/_x41NvJiwg6V0Jplz6uYt.jpg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/c55U2FEkpm2fq3H_Aeycf.jpg",
    ],
  },
  {
    id: 4,
    slug: "charakter-praha",
    title: "Barbershop CHARAKTER Praha",
    category: "Komerční prostory",
    description:
      "Velmi náročná zakázka, kde investor požadoval jen to nejlepší a 100% spolehlivost celého osvětlovacího systému. Bez váhání jsme vytáhli to nejlepší, co nabízíme – super výkonné LED pásky s účinností 160 lm/W a speciální RGB pásky s teplotním řízením, kde je hustota diod tak vysoká, že nejsou vidět mezery mezi nimi. Výsledkem je vizuálně dokonalý, rovnoměrný světelný pás.\n\nPro realizaci jsme zvolili hliníkový profil LIPOD s RGB + CCT pásky ovládanými systémem Mi-LIGHT. Díky tomu má barbershop plnou kontrolu nad atmosférou prostoru – od chladného pracovního světla pro precizní práci až po teplé, intimní nastavení pro relaxaci klienta.",
    images: [
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/rFUAOaDdMxty-EjbdvEZn.jpg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/-VFRn-b8TuXAhxs-PopXE.jpg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/sKZHSIxQ9_KFUHgq1jFoC.jpg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/FhF5wcvzpQ1zUJpoa2a-3.jpg",
    ],
  },
  {
    id: 5,
    slug: "slast-bar",
    title: "Slast Bar",
    category: "Gastronomie & Nightlife",
    description:
      "Stylový dýmkový bar Slast, kde se potkává uvolněná atmosféra s exkluzivním koktejlem v ruce. A aby byl zážitek opravdu kompletní, musí mu odpovídat i světlo – o to jsme se postarali my.\n\nProstory baru jsou rozsáhlé a velmi členité, a od začátku bylo jasné, že bezdrátové ovládání osvětlení bude technická výzva. Nakonec padla volba na náš oblíbený systém Mi-Light s chytrými řídícími jednotkami 5v1, které si vzájemně předávají signál, takže ovládat světla spolehlivě i v takto složitém dispozičním řešení nebyl problém. Vše jsme navíc doplnili o WiFi iBox – celé osvětlení jde dnes ovládat přímo z mobilního telefonu.\n\nHlavní volba padla na speciální AMBER LED pásky, které svítí sytě oranžovou barvou a – a to je klíčové – jejich světlo neobsahuje modrou složku. Modrá složka je běžně obsažena ve všech LED zdrojích i denním světle a aktivuje mozek k činnosti. AMBER světlo to nedělá. V prostoru, kam lidé chodí relaxovat u dobré dýmky a koktejlu s přáteli, nemělo modrá světlu co dělat. Na vstupním štítu jsme pak použili RGB pásky 14,4 W/m, které baru dodávají výraznou barevnou identitu zvenčí.",
    images: [
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/NMclT0UkE5naHanebO_5g.jpg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/mU8qpUUE0lPazkTlzjk6C.jpg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/bzJkDiftlqzWGJFcWMfmU.jpg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/ghTBFky2fsAb27h8uPbt_.jpg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/L2M7OKtS3xzvIs3smbpJG.jpg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/cZQ-blvJkPSG-jdI923Fp.jpg",
    ],
  },
  {
    id: 16,
    slug: "zahradni-osvetleni-jezirkem-brno",
    title: "Zahradní osvětlení s jezírkem – Brno",
    category: "Exteriérové osvětlení",
    description:
      "Komplexní realizace zahradního RGB osvětlení pro privátní vilu v Brně. Projekt zahrnuje jezírko, hot tub, velkou dřevěnou terasu, skalní zahradnictví i soukromou saunu – a celý tento prostor jsme proměnili ve světelnou instalaci ovládanou jedním dotykem z mobilu.\n\nOkolo jezírka a hot tubu jsme instalovali zakázkové LED neony vyráběné přímo v BE-LIGHT – ve voděodolném provedení IP68, schopné svítit celou paletou RGB barev. Skalnaté partie zahrady jsou dramaticky nasvíceny bodovými spotřebiči v červené a jantarové. Terasové osvětlení pod dlažbou a podél schodiště využívá RGBW pásky v ALU profilech.\n\nPáteří systému jsou chytré jednotky Mi-Light, díky nimž může majitel celou zahradu přepínat mezi desítkami scén – od chladné modré atmosféry u jezírka v letní noci, po teplou jantarovou pro posezení na terase, nebo slavnostní červenou pro okamžiky, které si žádají efekt.\n\nVýsledkem je zahrada, která nezklamat neumí – za každého ročního období i počasí.",
    images: [
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/JHdsbig9y4ycezFQS6n77.jpeg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/28s3ZG7cjSEDnWuDSPGNV.jpeg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/g_0u_dFCnW4KvN4-Sf5IP.jpg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/_K82ohxqvULxLSH-t0QYQ.JPG",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/qkfPENUdrNBNTSj4tpF7N.JPG",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/3GyqKqWxXma-mdayXi3QS.jpeg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/QaImkQ3SH5fB3Ts4vN2bd.jpeg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/vVggcR83l8Qk1nzpiigQR.jpeg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/mGlafYDb4PwKLxhOqnWSS.jpeg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/zkehgU6vNCmxWVgSx9__M.jpeg",
    ],
  },
  {
    id: 7,
    slug: "rd-slapanice",
    title: "RD Šlapanice u Brna",
    category: "Rezidenční projekty",
    description:
      "Rodinný dům v Šlapanicích u Brna byl projekt, kde nám investor od prvního dne dal naprostou volnou ruku. Jediné omezení bylo prosté – výsledek musí být krásný.\n\nCelý dům je propojený jemnými světelnými liniemi zapuštěných profilů KLUS KOZEL v sádrokartonových stropech. Lineární profily vedou jídelnou i obývacím pokojem, přes chodby až do ložnic – vzdušný, minimalistický efekt, který prostor vizuálně zvětšuje a zároveň mu dává jasnou architektonickou logiku.\n\nV dětských pokojích jsme osadili LED panely 24 W s nepřímým RGBW osvětlením – příjemné základní světlo, které lze libovolně přebarvit a přizpůsobit náladě. Ve schodišťovém prostoru svítí 1W mini LED světla, která v noci tvoří orientační linii bez oslňování.\n\nKoupelnám dominuje profil KLUS IMET s teple bílými LED pásky 14,4 W/m – podsvícení zrcadla jako z lifestyle časopisu. Do sprchových koutů jsme použili profil KLUS PDS4 vhodný do vlhkého prostředí.\n\nVstup a garáž jsou vybaveny vlastními svítidly s PIR čidlem pohybu – světlo se automaticky přizpůsobí přítomnosti. Terasa dostala profil INTER pro venkovní provoz.\n\nCelý dům ovládá bezdrátový systém Mi-Light přes mobilní telefon. Z pohovky nebo postele lze přepínat atmosféry celého přízemí i patra – bez jediného nástěnného tlačítka.",
    images: [
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/wZ78eIsXiVVE95nnnrm7n.jpeg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/jDU9SrDzecTKtmKCvkT7h.jpeg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/B6ptkhyGX3fu2Kw6DERPb.jpeg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/kMOaVPScjP26d2X_MKAto.jpeg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/2C6LfkzEHPJfovegaZHSD.jpeg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/2SRvePxGrAt5MfQXbQ8Z6.jpeg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/oP0tX4Qp7gjAbAY9dr47x.jpeg",
    ],
  },
  {
    id: 8,
    slug: "bisaku-bratislava",
    title: "Klenotnictví BISAKU Bratislava",
    category: "Retail & Obchodní prostory",
    description:
      "Klenotnictví BISAKU v Bratislavě patří ke špičce slovenského klenotnického trhu. Každý šperk zde musí vypadat co nejlépe – a to klade na osvětlení extrémní nároky. Správné světlo v klenotnictví není luxus, je to nutnost.\n\nVitríny jsme nasvítili výkonnými 20W LED pásky s čipy EPISTAR (2200 lm/m), jejichž světlo má teplotu 4000K pro optimální vnímání barev. Index podání barev CRI90+ zaručuje, že každý kámen, každý kov vypadá přesně tak, jak má – bez falešných odlesků nebo barevného posunu. Pásky jsou instalovány do frézovaných ALU profilů KLUŚ, které zajišťují rovnoměrné osvětlení bez stínů a viditelných diod.\n\nLogo BISAKU jsme podsvítili speciálním stranově ohebným LED páskem S-TYPE (12 W/m, 1100 lm/m), který se dokáže ohýbat do stran – ideální řešení pro nerovnoměrné tvary a loga s ostrými úhly. Výsledkem je čisté, rovnoměrné záření kolem každého písmene.\n\nZbytek prodejního prostoru ovládají chytré Mi-Light panely s nastavitelnou teplotou chromatičnosti 2700K–6500K a plnou RGB barvou. Personál přizpůsobí světlo době dne, prezentaci kolekce nebo slavnostní atmosféře akce.",
    images: [
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/vImWZHtoHa4X7dPSs49eP.jpg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/ip2PKVoBzGxvPd1eGBWke.jpg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/E9IeuvPFlHjGsX5Ohkx-N.jpg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/uQ-yvwDVUd4-rtGa9PtC_.png",
    ],
  },
  {
    id: 9,
    slug: "restaurace-akat-brno",
    title: "Restaurace Akát Brno",
    category: "Gastronomie & Nightlife",
    description:
      "U této realizace to bylo od začátku jasné – majitel nám dal naprostou volnou ruku a my jsme se mohli pořádně vyřádit. Výsledkem jsou stovky metrů LED pásků, které celou restauraci Akát v Brně proměnily k nepoznání.\n\nTeplé nepřímé osvětlení z LED pásků 9,6 W/m utváří v restauraci příjemnou, pohostinnou atmosféru. Žádné tvrdé reflektory – světlo jde odrazem od stropů a stěn, obklopuje hosty přirozeně a bez oslňování.\n\nCelý osvětlovací systém je ovládán naším oblíbeným bezdrátovým systémem Mi-Light. Majitel jedním dotykem na telefonu nebo tabletu přepíná scény – ranní příprava, oběd, večerní provoz. Každá hodina dne má své světlo.",
    images: [
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/MKQ1tbfiCTHI0cFWia4TR.jpg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/fpk1RSkQSSdt3K43mxYRD.jpg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/ASmlCTNch0wTp_bovWT_G.jpg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/EhGmrwjCnSE_9fG2LXI3H.jpg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/jO-d_Utyq5I38YEN693Bn.jpg",
    ],
  },
  {
    id: 10,
    slug: "restaurace-jakoby-brno",
    title: "Restaurace JAKOBY Brno",
    category: "Gastronomie & Nightlife",
    description:
      "Restaurace JAKOBY na Jakubském náměstí v centru Brna – krásný prostor s bohatou historií a atmosférou. Jenže původní investor podcenil kvalitu prvního osvětlení a ani ne po roce bylo nutné celé nepřímé osvětlení kompletně předělat.\n\nDostali jsme zakázku na rekonstrukci a tentokrát jsme ji udělali správně. Lavice i barový pult jsou podsvíceny LED pásky o výkonu 12 W/m v teple bílé 2700 K – zlatavé, pohostinné světlo, které přesně ladí s dřevěnými interiéry a cihlovou atmosférou restaurace. Dekorační nasvětlení stěn a architektonických prvků dotváří hloubku prostoru a dává každému koutu svůj charakter.\n\nU nás žádné hlídání kvality nepotřebujete – vždy děláme věci na maximum, napoprvé.",
    images: [
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/q8w5NAVUhI6hjsnhYqJ7W.jpg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/Eka70TIEyEcOuq4-VBQ8E.jpg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/J9hFw3Re9XNxTLMC1FZeW.jpg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/pSzTFByFJcbKjFEUP7Nxb.jpg",
    ],
  },
  {
    id: 11,
    slug: "zahradni-osvetleni-biotop",
    title: "Exteriérové osvětlení zahrady s biotopem",
    category: "Exteriérové osvětlení",
    description:
      "Jedním z nejkrásnějších projektů, jaké jsme kdy realizovali, je osvětlení zahrady s přírodním koupacím biotopem. Majitel si přál, aby zahrada v noci ožila – a my jsme mu to splnili.\n\nVodní plochu biotopního jezírka jsme obklopili našimi zakázkovými LED neony, které si vyrábíme přímo v BE-LIGHT. Teplé bílé světlo (2700K) se odráží od hladiny a vytváří hypnotizující světelné linie ve vodě – efekt, který musíte vidět na vlastní oči.\n\nDřevěné terasy a schody zahradní sauny jsme podsvítili zakázkovými LED neony osazenými do hliníkových venkovních profilů. Světlo vychází jemně zpod dřevěných prken, neosvětluje rušivě – pouze lemuje tvar a navádí pohyb. Výsledkem je dramatický 3D efekt, kde terasa jakoby vznáší nad zahradou.\n\nNaše LED neony vyrábíme na míru – jsou robustnější než běžné pásky, nabízejí rovnoměrnější svit a jsou navržené přímo pro exteriérové použití. Celé osvětlení zahrady je spínáno a stmíváno bezdrátově, takže správnou atmosféru navolíte z pohodlí obývacího pokoje ještě předtím, než vyjdete ven. Teplá letní noc, výhled na osvětlené jezírko, sklenice vína v ruce – to je výsledek dobře navrženého zahradního osvětlení.",
    images: [
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/F4wT_mwmTfElXEKmBkCfz.JPG",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/hVdInJlCCCq7ZngEuvCeb.JPG",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/-ANJ-1a_3xbcTmJRqgkt_.JPG",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/kz_fRc5x8n3HwcnOCPhGR.JPG",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/sm7L5GwnsO29iWWsRf2Ga.JPG",
    ],
  },
  {
    id: 12,
    slug: "privatni-sauna",
    title: "Privátní sauna",
    category: "Wellness",
    description:
      "Privátní sauna, kde relaxace dostává úplně nový rozměr. Majitel si přál přesně to, co každá opravdová privátní sauna potřebuje: světlo, které naladí náladu a probudí smysly – nebo je naopak utiší.\n\nPro exteriérovou část sauny a zahradní okolí jsme zvolili RGB LED pásky, které proměňují večerní atmosféru zahrady. Modré zahradní osvětlení opticky prodlužuje pobyt venku a podtrhuje moderní architekturu objektu. Červené nasvětlení fasády sauny v noci vytváří dokonalé kulisy pro odpočinek po náročném dni.\n\nV interiéru sauny jsme použili speciální LED pásky s krytím IP67, vhodné do vlhkého a teplého prostředí. Červená barva světla (cca 660 nm) neruší přirozené nastavení těla na odpočinek – ideální doplněk sauny, který zesiluje relaxační efekt a navozuje správnou pohodu.\n\nCelý osvětlovací systém je ovládán bezdrátově přes mobilní telefon, takže atmosféru si navolíte ještě před příchodem do sauny. Z jednoho dotyku přejdete z chladného modrého světla zahradní terasy do teplé, uklidňující červeni uvnitř sauny.",
    images: [
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/2CVPudqn93T2bbDSEUs5k.jpeg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/-5PcJpO4Gl5J5NSmlW6zK.JPG",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/uwMFonHCsNvPLDXJWkMep.JPG",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/3e7W4GyGSEEh1SgZ-fBEJ.JPG",
    ],
  },
  {
    id: 13,
    slug: "barber-striharna-brno",
    title: "Barber Stříhárna Brno",
    category: "Kadeřnictví / Barbershop",
    description:
      "Ve stříhárně chtěli pořádně oživit prostor a přišli za námi s požadavkem na LED osvětlení na míru – dostatek světla s možností regulace a minimalistický vzhled svítidel. Pro hlavní osvětlení jsme použili bíle lakované hliníkové profily KLUŚ LIPOD se dvěma řadami LED pásků EPISTAR 2835, 14,4 W/m, 120 LED/m. Díky bohatému montážnímu příslušenství KLUŚ jsme profily zavěsili do ideální výšky. Kolem zrcadel jsme instalovali profily KLUŚ GIZA s mléčným hranatým difuzorem – světlo se rovnoměrně rozptyluje, neoslňuje a je příjemné pro oči. Denní bílá 4000K je pro osvětlení pracovního místa kadeřníka nejvhodnější volbou. Napájení zajišťují spolehlivé zdroje Meanwell ELG, stmívání systémem Mi-Light.",
    images: [
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/tUlfNyTQR7IoAnbCfZgVI.jpg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/xoUHm2GTeSyPKXNKYSrbL.jpg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/JBo4ZB7M1I-pi_pqpL3AL.jpg",
    ],
  },
  {
    id: 15,
    slug: "pivnice-sborovna-brno",
    title: "Pivnice Sborovna Brno",
    category: "Restaurace / Bar",
    description:
      "Pro majitele pivnice Sborovna jsme navrhovali kompletní osvětlení prostoru pomocí LED pásků a designových LED svítidel. Barvu světla jsme sjednotili na neutrální bílou 4000K, která těmto prostorům vdechla vzdušnost a eleganci. Díky kombinaci přímého a nepřímého osvětlení se nám podařilo docílit zajímavých světelných scén, které vytvářejí z těchto prostor velmi útulnou pivnici – místo, kde si s radostí vychutnáte skvěle vychlazené pivo.",
    images: [
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/S3a1WvxkekPyhFpRAopEh.jpg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/adl_DDnEBHry52cywfV42.jpg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/8b5rQWa3DqU4N64e7KRRx.jpg",
    ],
  },
  {
    id: 6,
    slug: "gesipa-brno",
    title: "GESIPA Brno",
    category: "Průmysl & Kanceláře",
    description:
      "Společnost Gesipa nás oslovila s požadavkem na výměnu neúsporného osvětlení ve svých kancelářích a skladech v Brně. Přestože budova byla relativně nově postavená, developer v ní použil zastaralé zářivkové trubice a ve skladech velmi neefektivní sodíkové výbojky s náběhem až desítky minut.\n\nPro investora jsme nejprve zpracovali světelný projekt v programu DIALUX a zároveň provedli detailní výpočet úspory energie. Výsledky byly přesvědčivé: návratnost investice pouhých 6,5 měsíce a roční úspora na elektřině přibližně 136 000 Kč.\n\nV kancelářích jsme zářivkové trubice nahradili profesionálními LED panely 40 W s čipy Samsung a světelnou účinností 120 lm/W. Ve skladech vystřídaly sodíkové výbojky výkonná svítidla HIGH BAY 100 W – opět se Samsung LED a drivery Meanwell s desetiletou zárukou. V souladu s normami byla část svítidel doplněna o nouzové bezpečnostní moduly pro případ výpadku elektřiny.",
    images: [
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/SBzHOBJyFCvAbvLibtm2S.jpeg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/v3_alGdCZV_W4sxXsDCPg.jpeg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/IX9UvD_zKvyvS27u_b8mP.jpeg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/uVaHJINq-P5a3o9V4bzpO.jpeg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/-efjp4Ia9dmhEIWFTs1VA.jpeg",
    ],
  },
  {
    id: 14,
    slug: "omega-brno",
    title: "Obchodní dům Omega Brno",
    category: "Exteriérové osvětlení",
    description:
      "Zadání se zdálo jednoduché – synchronizovat 37 oken budovy do RGB barev. Převést to ale do praxe žádá značnou dávku zkušeností. Každé okno je osazeno vysoce svítivým RGB páskem (5050 EPISTAR, 23W/24V), vloženým do hliníkového Micro Kluś profilu s mléčně matným difuzorem KLUŚ LIGER, který světlo rovnoměrně distribuuje a zároveň chrání pásek před prachem a poškozením. Řízení zajišťují chytré jednotky Mi-Light 5v1, které disponují automatickým přenosem signálu a synchronizací efektů mezi sebou. Výsledkem je dokonalá synchronizace všech 37 oken v celé budově – barevné přechody běží přesně a bez rozladění.",
    images: [
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/H6JFg4bD8q2ceoxYJ7BxU.jpg",
      "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=85,anim=false/kbaegiqnmw77ctj81yv44r1j/yoynr8mzgtw8xuliw7ld87lf/G45I3taEwbzclvBLxQQWt.jpg",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
