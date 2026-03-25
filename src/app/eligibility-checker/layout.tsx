import { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://msmevault.in'

export const metadata: Metadata = {
  title: 'MSME Eligibility Checker - Find Schemes You Qualify For',
  description: 'Check your eligibility for 150+ government schemes in 2 minutes. Free eligibility assessment for Mudra loans, CGTMSE, Stand Up India, and state MSME schemes.',
  keywords: [
    'MSME eligibility checker',
    'government scheme eligibility',
    'Mudra loan eligibility',
    'CGTMSE eligibility check',
    'MSME scheme finder',
    'business loan eligibility',
    'small business scheme eligibility',
  ],
  alternates: {
    canonical: '/eligibility-checker',
  },
  openGraph: {
    title: 'MSME Eligibility Checker | Find Schemes You Qualify For',
    description: 'Free eligibility check for 150+ MSME schemes. Get personalized results in 2 minutes.',
    url: `${siteUrl}/eligibility-checker`,
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MSME Eligibility Checker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MSME Eligibility Checker',
    description: 'Check eligibility for 150+ government schemes in 2 minutes.',
    images: ['/og-image.png'],
  },
}

export default function EligibilityCheckerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
