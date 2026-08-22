import { Metadata } from 'next'
import { VERIFIED_LOANS } from '@/data/verified-loans'
import LoansClient from './LoansClient'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://msmevault.in'

export const metadata: Metadata = {
  title: 'Compare MSME & Business Loan Rates (2026) | Bank, NBFC & Mudra Comparison',
  description:
    'Compare indicative interest rates, borrowing limits, tenure, and collateral requirements across SBI, HDFC, ICICI, Tata Capital, Lendingkart, and Mudra loans. Verified August 2026.',
  keywords: [
    'MSME loan interest rates 2026',
    'business loan comparison India',
    'Mudra loan interest rate',
    'collateral free business loan',
    'SBI SME loan rates',
    'HDFC business loan interest',
    'working capital loan comparison',
  ],
  alternates: {
    canonical: '/loans',
  },
  openGraph: {
    title: 'Compare MSME & Business Loan Rates (2026) | MSMEVault',
    description:
      'Compare indicative interest rates, borrowing limits, tenure, and collateral requirements across PSU banks, private banks, NBFCs, and fintechs.',
    url: `${siteUrl}/loans`,
    type: 'website',
  },
}

export default function LoansPage() {
  return <LoansClient loans={VERIFIED_LOANS} />
}
