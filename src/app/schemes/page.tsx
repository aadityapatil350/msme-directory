import { Metadata } from 'next'
import SchemesClient from './SchemesClient'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://msmevault.in'

export const metadata: Metadata = {
  title: 'Government MSME Schemes Directory (2026) | Central & State Subsidies',
  description:
    'Browse verified Indian government schemes, Mudra brackets, CGTMSE credit guarantees, and PMEGP capital subsidies. Every figure confirmed against official primary records.',
  keywords: [
    'MSME schemes directory 2026',
    'government subsidies for business',
    'Mudra loan schemes',
    'CGTMSE scheme list',
    'PMEGP subsidy schemes',
    'state MSME incentives',
    'central government business schemes',
  ],
  alternates: {
    canonical: '/schemes',
  },
  openGraph: {
    title: 'Government MSME Schemes Directory (2026) | MSMEVault',
    description:
      'Search 60+ verified central and state MSME schemes, Mudra loans, PMEGP subsidies (15%-35%), and CGTMSE credit guarantees.',
    url: `${siteUrl}/schemes`,
    type: 'website',
  },
}

export default function SchemesPage() {
  return <SchemesClient />
}
