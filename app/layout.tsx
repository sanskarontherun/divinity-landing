import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import Grain from "@/components/Grain";
import AmbientEmberField from "@/components/AmbientEmberField";
import ChapterNav from "@/components/ChapterNav";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const siteUrl = "https://divinity-landing.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Divinity — Given voice from above",
  description:
    "Divinity reads your documents aloud in a voice worth listening to — a quiet sanctuary for the things you never had time to finish.",
  applicationName: "Divinity",
  keywords: [
    "PDF to speech",
    "text to speech reader",
    "AI voice reader",
    "read aloud app",
    "Divinity",
  ],
  authors: [{ name: "Sanskar Singh" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Divinity — Given voice from above",
    description:
      "Divinity reads your documents aloud in a voice worth listening to — a quiet sanctuary for the things you never had time to finish.",
    url: siteUrl,
    siteName: "Divinity",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Divinity — Given voice from above",
    description:
      "Divinity reads your documents aloud in a voice worth listening to.",
  },
};

export const viewport: Viewport = {
  themeColor: "#1c1611",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
      <body>
        <AmbientEmberField />
        <ChapterNav />
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
        <Grain />
      </body>
    </html>
  );
}
