import LoansClient from './LoansClient'
import { prisma } from '@/lib/prisma'

import { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://msmevault.in'

export const metadata: Metadata = {
  title: 'Compare 22+ Business Loans for MSMEs - Best Rates & Offers 2025',
  description: 'Compare 22+ verified business loans from top banks, NBFCs and fintechs. Interest rates 8.4%-35%, loan amounts ₹50K-₹5Cr. Updated March 2025.',
  keywords: [
    'MSME business loans',
    'small business loans India',
    'compare business loans',
    'MSME loan interest rates',
    'collateral free loans MSME',
    'bank loans for small business',
    'NBFC business loans',
    'startup business loans',
  ],
  alternates: {
    canonical: '/loans',
  },
  openGraph: {
    title: 'Compare 22+ Business Loans for MSMEs | Best Rates 2025',
    description: 'Compare verified business loans from banks & NBFCs. Interest rates 8.4%-35%, amounts ₹50K-₹5Cr.',
    url: `${siteUrl}/loans`,
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Compare Business Loans for MSMEs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compare 22+ Business Loans for MSMEs',
    description: 'Compare verified business loans. Interest rates 8.4%-35%.',
    images: ['/og-image.png'],
  },
}

export const dynamic = 'force-dynamic'

export default async function LoansPage() {
  const loans = await prisma.loan.findMany({
    orderBy: [
      { isSponsored: 'desc' },
      { interestRateMin: 'asc' },
    ],
  })

  return <LoansClient loans={loans} />
}
