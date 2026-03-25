import { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://msmevault.in'

export const metadata: Metadata = {
  title: '150+ Government Schemes for MSME & Small Business in India 2024',
  description:
    'Browse all government schemes, loans & subsidies for MSMEs in India. Filter by state, sector, loan amount. Mudra Loan, CGTMSE, Stand Up India, PM SVANidhi & more.',
  keywords: [
    'government schemes for MSME',
    'MSME loan schemes India',
    'small business subsidies',
    'Mudra loan scheme',
    'CGTMSE scheme',
    'Stand Up India scheme',
    'PM SVANidhi',
    'state MSME schemes',
    'central government schemes',
    'business funding India',
  ],
  alternates: {
    canonical: '/schemes',
  },
  openGraph: {
    title: '150+ Government Schemes for MSME in India | MSMEVault',
    description:
      'Complete directory of government schemes, loans & subsidies for small businesses. Filter by state, sector, amount.',
    url: `${siteUrl}/schemes`,
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Government Schemes for MSME in India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '150+ Government Schemes for MSME in India',
    description: 'Complete directory of MSME schemes, loans & subsidies.',
    images: ['/og-image.png'],
  },
}

export default function SchemesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
