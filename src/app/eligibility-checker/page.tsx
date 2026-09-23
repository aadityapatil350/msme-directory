import { Metadata } from 'next'
import EligibilityCheckerClient from './EligibilityCheckerClient'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://msmevault.in'

export const metadata: Metadata = {
  title: 'MSME Scheme Eligibility Matcher (2026) | Find Matching Subsidies & Loans',
  description:
    'Answer 5 brief questions about your business to get an instant matched list of Central and State MSME government schemes, Mudra loan brackets, and PMEGP subsidies.',
  keywords: [
    'MSME eligibility checker',
    'government scheme matcher',
    'Mudra loan eligibility tool',
    'PMEGP subsidy eligibility',
    'business loan scheme finder',
    'subsidy eligibility calculator',
  ],
  alternates: {
    canonical: '/eligibility-checker',
  },
  openGraph: {
    title: 'MSME Scheme Eligibility Matcher (2026) | MSMEVault',
    description:
      'Instant assessment for Indian MSME government schemes, Mudra loan limits, and capital subsidies.',
    url: `${siteUrl}/eligibility-checker`,
    type: 'website',
  },
}

export default function EligibilityCheckerPage() {
  return <EligibilityCheckerClient />
}
