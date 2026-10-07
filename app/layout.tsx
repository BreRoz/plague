import type { Metadata } from "next";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-NPVV24G1MF";

export const metadata: Metadata = {
  metadataBase: new URL("https://plaguemap2026.com"),
  title: "Pneumonic Plague",
  description: "A clear, source-driven view of confirmed and suspected plague reports worldwide.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Pneumonic Plague",
    description: "Confirmed and suspected plague reports—mapped clearly.",
    url: "/",
    siteName: "Plague Map 2026",
    type: "website",
    images: [{ url: "/og.png", width: 1734, height: 907, alt: "Plague Map 2026 world report map" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pneumonic Plague",
    description: "Confirmed and suspected plague reports—mapped clearly.",
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.svg" },
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
      </head>
      <body>{children}</body>
    </html>
  );
}
