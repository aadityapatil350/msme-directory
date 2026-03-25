import { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://msmevault.in'

export const metadata: Metadata = {
  title: 'List Your CA Firm / Consultancy - Get MSME Leads | MSMEVault',
  description: 'Join India\'s #1 MSME consultants directory. Get leads from 10,000+ MSME owners. Free & Featured listing options. Instant activation for paid plans.',
  keywords: [
    'list CA firm',
    'MSME consultant directory',
    'CA firm listing',
    'business consultant leads',
    'MSME leads for CA',
    'consultant directory India',
    'CA firm marketing',
  ],
  alternates: {
    canonical: '/list-your-firm',
  },
  openGraph: {
    title: 'List Your CA Firm / Consultancy | Get MSME Leads',
    description: 'Join India\'s #1 MSME consultants directory. Get leads from 10,000+ MSME owners.',
    url: `${siteUrl}/list-your-firm`,
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'List Your CA Firm on MSMEVault',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'List Your CA Firm | MSMEVault',
    description: 'Get leads from 10,000+ MSME owners. Free & Featured listings.',
    images: ['/og-image.png'],
  },
}

export default function ListYourFirmLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
