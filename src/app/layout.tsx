import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://msmevault.in";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f1f3d",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MSMEVault.in - Find Government Schemes & Loans for Your MSME",
    template: "%s | MSMEVault.in",
  },
  description:
    "India's #1 MSME directory. Discover 150+ government schemes, loans & subsidies for small businesses. Check eligibility in 2 minutes. Connect with verified CA firms & consultants across India.",
  keywords: [
    "MSME schemes",
    "government loans for MSME",
    "business subsidies India",
    "startup funding",
    "MSME registration",
    "Udyam registration",
    "Mudra loan",
    "CGTMSE scheme",
    "Stand Up India",
    "small business loans",
    "CA firms near me",
    "MSME consultants",
    "GST registration",
    "business compliance India",
  ],
  authors: [{ name: "MSMEVault.in", url: siteUrl }],
  creator: "MSMEVault.in",
  publisher: "MSMEVault.in",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MSMEVault.in - India's #1 MSME Schemes & Loans Directory",
    description:
      "Discover 150+ government schemes, loans & subsidies for MSMEs. Check eligibility instantly. Connect with verified consultants.",
    url: siteUrl,
    siteName: "MSMEVault.in",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MSMEVault.in - Find Government Schemes & Loans for Your MSME",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MSMEVault.in - India's #1 MSME Schemes & Loans Directory",
    description:
      "Discover 150+ government schemes, loans & subsidies for MSMEs. Check eligibility instantly.",
    images: ["/og-image.png"],
    creator: "@msmevault",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || "",
  },
  category: "Business",
};

// Organization Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MSMEVault.in",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description:
    "India's leading platform for MSME schemes, loans, subsidies, and business consultants.",
  foundingDate: "2024",
  sameAs: [
    "https://twitter.com/msmevault",
    "https://www.linkedin.com/company/msmevault",
    "https://www.facebook.com/msmevault",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi"],
  },
};

// WebSite Schema with SearchAction
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "MSMEVault.in",
  url: siteUrl,
  description: "India's #1 MSME directory for government schemes, loans & business consultants",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/schemes?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {/* Google Analytics */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
