import { Metadata } from 'next'
import EMICalculatorClient from './EMICalculatorClient'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://msmevault.in'

export const metadata: Metadata = {
  title: 'Mudra Loan & MSME EMI Calculator (2026) | Shishu, Kishor, Tarun & CGTMSE',
  description:
    'Free online Mudra and MSME business loan EMI calculator. Calculate monthly EMIs, total interest, and amortization for Mudra Shishu (₹50k), Kishor (₹5L), Tarun (₹10L), Tarun Plus (₹20L), and CGTMSE loans.',
  keywords: [
    'Mudra loan EMI calculator',
    'MSME loan EMI calculator',
    'Mudra loan calculator 2026',
    'Tarun plus EMI calculate',
    'business loan calculator India',
    'CGTMSE loan calculation',
    'small business loan amortization schedule',
    'commercial loan EMI calculate',
  ],
  alternates: {
    canonical: '/tools/emi-calculator',
  },
  openGraph: {
    title: 'MSME Business Loan EMI Calculator (2026) | MSMEVault',
    description:
      'Free online MSME loan EMI calculator. Calculate monthly EMIs, interest payable, and repayment schedules for Mudra, CGTMSE, and bank loans.',
    url: `${siteUrl}/tools/emi-calculator`,
    type: 'website',
  },
}

export default function EMICalculatorPage() {
  return <EMICalculatorClient />
}
