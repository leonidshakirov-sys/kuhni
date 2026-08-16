import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { UtmTracker } from "@/components/UtmTracker";
import { YandexMetrika } from "@/components/YandexMetrika";
import { JsonLd } from "@/components/JsonLd";
import { ClientErrorBoundary } from "@/components/ClientErrorBoundary";
import { siteConfig } from "@/config/site";
import { organizationJsonLd } from "@/lib/seo";
import "./globals.css";

const manrope = localFont({
  src: "../fonts/Manrope-Variable.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});

const cormorant = localFont({
  src: "../fonts/CormorantGaramond-Variable.woff2",
  variable: "--font-cormorant",
  weight: "300 700",
  display: "swap",
});

export const viewport = {
  themeColor: "#F6F3EE",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.fullName,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${manrope.variable} ${cormorant.variable} font-sans antialiased`}>
        <YandexMetrika />
        <JsonLd data={organizationJsonLd()} />
        <ClientErrorBoundary>
          <UtmTracker />
        </ClientErrorBoundary>
        <ClientErrorBoundary>
          <Header />
        </ClientErrorBoundary>
        <main className="pb-24 md:pb-0">{children}</main>
        <Footer />
        <ClientErrorBoundary>
          <MobileActionBar />
        </ClientErrorBoundary>
      </body>
    </html>
  );
}
