import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionProvider } from "@/components/motion-provider";
import { SiteHeader } from "@/components/site-header";
import { imageAssets } from "@/content/site";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fahrschule-korba.example"),
  title: {
    default: "Fahrschule Korba | Fahrausbildung in Krefeld",
    template: "%s | Fahrschule Korba",
  },
  description:
    "Klasse B, B197, Automatik und Auffrischungsstunden mit klarer Planung in Krefeld.",
  icons: {
    icon: imageAssets.logoMark,
    apple: imageAssets.logoMark,
  },
  openGraph: {
    title: "Fahrschule Korba",
    description: "Führerschein so leicht wie noch nie.",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Zum Inhalt springen</a>
        <SiteHeader />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
