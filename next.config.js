/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/', destination: 'https://www.belight.cz/', permanent: true },
      { source: '/led-osvetleni-kuchyne/', destination: '/', permanent: true },
      { source: '/kdo-jsme/', destination: 'https://www.belight.cz/', permanent: true },
      { source: '/led-osvetleni-hotelu-a-restauraci/', destination: '/', permanent: true },
      { source: '/led-osvetleni-arealu-a-sportovist/', destination: '/', permanent: true },
      { source: '/showroom-a-prodejna/', destination: 'https://www.belight.cz/', permanent: true },
      { source: '/led-osvetleni-obyvaciho-pokoje/', destination: '/', permanent: true },
      { source: '/produkty/', destination: 'https://www.belight.cz/', permanent: true },
      { source: '/realizace-led-osvetleni-na-miru-do-domacnosti/', destination: 'https://www.belight.cz/', permanent: true },
      { source: '/led-osvetleni-haly/', destination: '/', permanent: true },
      { source: '/velkoobchod/', destination: 'https://www.belight.cz/', permanent: true },
      { source: '/led-osvetleni-schodiste/', destination: '/', permanent: true },
      { source: '/reference/', destination: 'https://www.belight.cz/', permanent: true },
      { source: '/kontakty/', destination: 'https://www.belight.cz/', permanent: true },
      { source: '/projekty-na-miru-pro-statni-a-verejnou-spravu/', destination: 'https://www.belight.cz/', permanent: true },
      { source: '/realizace-led-osvetleni-pro-firmy/', destination: 'https://www.belight.cz/', permanent: true },
      { source: '/navrh-a-montaz-led-osvetleni-na-miru-verejnost/', destination: 'https://www.belight.cz/', permanent: true },
      { source: '/poulicni-led-osvetleni/', destination: '/', permanent: true },
      { source: '/led-osvetleni-schodiste-0/', destination: '/', permanent: true },
      { source: '/led-osvetleni-chodby-0/', destination: '/', permanent: true },
      { source: '/led-osvetleni-dilny-a-garaze/', destination: '/', permanent: true },
      { source: '/navrh-a-montaz-led-osvetleni-na-miru-firmy/', destination: 'https://www.belight.cz/', permanent: true },
      { source: '/led-osvetleni-pracovny-0/', destination: '/', permanent: true },
      { source: '/led-osvetleni-kancelare/', destination: '/', permanent: true },
      { source: '/led-osvetleni-budovy/', destination: '/', permanent: true },
      { source: '/led-osvetleni-skladu/', destination: '/', permanent: true },
      { source: '/led-osvetleni-prodejny/', destination: '/', permanent: true },
      { source: '/omega-brno/', destination: 'https://www.belight.cz/realizace/omega-brno', permanent: true },
      { source: '/anybody-hotel-brno/', destination: 'https://www.belight.cz/realizace/anybody-hotel-brno', permanent: true },
      { source: '/rd-slapanice-u-brna/', destination: 'https://www.belight.cz/realizace/rd-slapanice', permanent: true },
      { source: '/byt-boskovice/', destination: '/', permanent: true },
      { source: '/rd-velke-pavlovice/', destination: '/', permanent: true },
      { source: '/expozice-centrum-kastanova-brno/', destination: '/', permanent: true },
      { source: '/restaurace-akat-brno/', destination: 'https://www.belight.cz/realizace/restaurace-akat-brno', permanent: true },
      { source: '/byt-brno-centrum/', destination: '/', permanent: true },
      { source: '/tawan-brno/', destination: '/', permanent: true },
      { source: '/osvetleni-pergoly-okres-vyskov/', destination: '/', permanent: true },
      { source: '/slast-bar/', destination: 'https://www.belight.cz/realizace/slast-bar', permanent: true },
      { source: '/barbershop-profil-ostrava/', destination: 'https://www.belight.cz/realizace/barbershop-profil-ostrava', permanent: true },
      { source: '/klenotnictvi-bisaku-bratislava/', destination: 'https://www.belight.cz/realizace/bisaku-bratislava', permanent: true },
      { source: '/pivnice-sborovna-brno/', destination: 'https://www.belight.cz/realizace/pivnice-sborovna-brno', permanent: true },
      { source: '/barcelo-hotel/', destination: 'https://www.belight.cz/realizace/barcelo-hotel', permanent: true },
      { source: '/barber-striharna-brno/', destination: 'https://www.belight.cz/realizace/barber-striharna-brno', permanent: true },
      { source: '/charakter-praha/', destination: 'https://www.belight.cz/realizace/charakter-praha', permanent: true },
      { source: '/restaurace-jakoby-jakubske-namesti-brno/', destination: 'https://www.belight.cz/realizace/restaurace-jakoby-brno', permanent: true },
      { source: '/gesipa-brno/', destination: 'https://www.belight.cz/realizace/gesipa-brno', permanent: true },
      { source: '/kocour-pub-brno/', destination: '/', permanent: true },
      { source: '/navrh-a-montaz-led-osvetleni-na-miru-domacnost/', destination: 'https://www.belight.cz/', permanent: true },
    ]
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
    browserDebugInfoInTerminal: true,
  },
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: { unoptimized: true },
  devIndicators: false,
  allowedDevOrigins: [
    "*.macaly.dev",
    "*.macaly.app",
    "*.macaly-app.com",
    "*.macaly-user-data.dev",
  ],
  turbopack: {
    rules: {
      "*.{jsx,tsx}": {
        condition: {
          all: [{ not: "foreign" }, "development"],
        },
        loaders: [
          {
            loader: "macaly-tagger",
            options: {
              disableSourceMaps: true,
              ignorePackages: [
                // Skip components imported from these packages (requires macaly-tagger v1.2.0+)
                "@react-three/fiber",
                "@react-three/drei",
              ],
            },
          },
        ],
        as: "*",
      },
    },
  },
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.module.rules.unshift({
        test: /\.(jsx|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "macaly-tagger",
            options: {
              ignorePackages: [
                // Skip components imported from these packages (requires macaly-tagger v1.2.0+)
                "@react-three/fiber",
                "@react-three/drei",
              ],
            },
          },
        ],
        enforce: "pre",
      });
    }

    return config;
  },
};

module.exports = nextConfig;
