import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://plaguemap2026.com"),
  title: "Plague Tracker 2026",
  description: "A clear, source-driven view of confirmed and suspected plague reports worldwide.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Plague Tracker 2026",
    description: "Confirmed and suspected plague reports—mapped clearly.",
    url: "/",
    siteName: "Plague Tracker 2026",
    type: "website",
    images: [{ url: "/og.png", width: 1734, height: 907, alt: "Plague Tracker 2026 world report map" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plague Tracker 2026",
    description: "Confirmed and suspected plague reports—mapped clearly.",
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) { return <html lang="en"><body>{children}</body></html>; }
