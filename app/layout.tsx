import "./globals.css";

import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Script from "next/script";
import { Providers } from "./providers";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-VGYLMDYVME";
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "6LfXdQAtAAAAAHYKMXrOXwzCY0FjOfWb77ULBlnn";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});



export const metadata: Metadata = {
  title: "BE-LIGHT | Prémiové LED osvětlení na míru",
  description: "BE-LIGHT – prémiové LED osvětlení na míru pro komerční i rezidenční projekty.",
  openGraph: {
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body
        className={`${cormorant.variable} ${dmSans.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <Providers>{children}</Providers>

        {/* CookieYes – musí být před GA4 */}
        <Script
          id="cookieyes"
          src="https://cdn-cookieyes.com/client_data/980726724dadd60e048913ef0aba1a67/script.js"
          strategy="beforeInteractive"
        />

        {/* Google Consent Mode v2 – výchozí stav: vše zamítnuto */}
        <Script id="consent-defaults" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied',
              'wait_for_update': 500
            });
          `}
        </Script>

        {/* GA4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>

        {/* reCAPTCHA */}
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
