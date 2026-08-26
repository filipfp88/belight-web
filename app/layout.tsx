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
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
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

        {/* CookieYes banner */}
        <Script
          id="cookieyes"
          src="https://cdn-cookieyes.com/client_data/980726724dadd60e048913ef0aba1a67/script.js"
          strategy="afterInteractive"
        />

        {/* GA4 – načte se jen po přijetí analytics cookies */}
        <Script id="ga4-consent-loader" strategy="afterInteractive">
          {`
            var GA_ID = '${GA_ID}';
            var ga4Loaded = false;

            function loadGA4() {
              if (ga4Loaded) return;
              ga4Loaded = true;
              var s = document.createElement('script');
              s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
              s.async = true;
              document.head.appendChild(s);
              s.onload = function() {
                window.dataLayer = window.dataLayer || [];
                window.gtag = function(){ dataLayer.push(arguments); };
                gtag('js', new Date());
                gtag('config', GA_ID);
              };
            }

            function hasAnalyticsConsent() {
              var m = document.cookie.match(/cookieyes-consent=([^;]+)/);
              if (!m) return false;
              try {
                var val = decodeURIComponent(m[1]);
                return val.includes('analytics:yes') || val.includes('performance:yes');
              } catch(e) { return false; }
            }

            // Zkontroluj uložený souhlas při načtení
            if (hasAnalyticsConsent()) loadGA4();

            // Reaguj na změnu souhlasu
            document.addEventListener('cookieyes-consent-update', function() {
              if (hasAnalyticsConsent()) loadGA4();
            });
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
