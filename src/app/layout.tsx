import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import Analytics from "@/components/Analytics";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://msmevault.in";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#09090B",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MSMEVault.in – Verified Indian Government Schemes & MSME Loans (2026)",
    template: "%s | MSMEVault.in",
  },
  description:
    "Free, plain-language reference to Udyam registration, Mudra (Tarun Plus ₹20L), PMEGP subsidies (15%-35%), CGTMSE (₹10 Cr cover), and 60+ central and state schemes. Every figure sourced and dated.",
  keywords: [
    "MSME schemes India 2026",
    "government loans for small business",
    "Udyam registration free",
    "Mudra loan apply online",
    "CGTMSE scheme eligibility",
    "PMEGP margin money subsidy",
    "PM Vishwakarma yojana",
    "MSME classification thresholds 2026",
  ],
  authors: [{ name: "MSMEVault Editorial Research Desk", url: `${siteUrl}/about` }],
  creator: "MSMEVault.in",
  publisher: "MSMEVault.in",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MSMEVault.in – Verified Indian Government Schemes & MSME Loans",
    description:
      "Free, plain-language reference to Udyam registration, Mudra, PMEGP, CGTMSE and 60+ central and state schemes. Every figure sourced and dated.",
    url: siteUrl,
    siteName: "MSMEVault.in",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MSMEVault.in",
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    description:
      "Independent private portal for Indian MSME government scheme guidance, loan comparisons, and subsidy calculations.",
    sameAs: [],
  };

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MSMEVault.in",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/schemes?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FAFAFA] text-zinc-950 antialiased selection:bg-zinc-900 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
