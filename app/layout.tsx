import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL } from "./tracker-data";

const GA_MEASUREMENT_ID = "G-NPVV24G1MF";

const SITE_TITLE = "Plague Map 2026 — Russia Plague Investigation Tracker";
const SITE_DESCRIPTION = "Independent tracker of the suspected plague investigation in Irkutsk, Russia. Separates confirmed cases from unverified reports, citing public sources.";
const SOCIAL_DESCRIPTION = "Confirmed vs. unverified plague reports from the Irkutsk, Russia, investigation, mapped with public sources.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: "%s | Plague Map 2026" },
  description: SITE_DESCRIPTION,
  applicationName: "Plague Map 2026",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  openGraph: {
    title: SITE_TITLE,
    description: SOCIAL_DESCRIPTION,
    url: "/",
    siteName: "Plague Map 2026",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og.png", width: 1734, height: 907, alt: "Plague Map 2026 world report map" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SOCIAL_DESCRIPTION,
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.svg" },
};

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://hoursand.co/#organization",
      name: "Hours & Co.",
      url: "https://hoursand.co/",
      email: "hoursandco.studio@gmail.com",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Plague Map 2026",
      url: `${SITE_URL}/`,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": "https://hoursand.co/#organization" },
    },
  ],
};

export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7740708597836782"
          crossOrigin="anonymous"
        />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
