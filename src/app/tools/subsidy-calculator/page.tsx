import { Metadata } from 'next'
import SubsidyCalculatorClient from './SubsidyCalculatorClient'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://msmevault.in'

export const metadata: Metadata = {
  title: 'PMEGP Subsidy Calculator (2026) | Margin Money Grant (15% to 35%)',
  description:
    'Free online PMEGP margin money subsidy calculator. Check eligibility percentage (15% to 35%), own contribution, and net bank loan across rural and urban project setups.',
  keywords: [
    'PMEGP subsidy calculator 2026',
    'margin money subsidy calculator',
    'PMEGP loan calculation',
    'government subsidy for new business',
    'KVIC subsidy calculator',
    'PMEGP project cost calculation',
  ],
  alternates: {
    canonical: '/tools/subsidy-calculator',
  },
  openGraph: {
    title: 'PMEGP Subsidy Calculator (2026) | MSMEVault',
    description:
      'Calculate government margin money subsidy (15% to 35%) under PMEGP for manufacturing and service enterprises.',
    url: `${siteUrl}/tools/subsidy-calculator`,
    type: 'website',
  },
}

export default function SubsidyCalculatorPage() {
  return <SubsidyCalculatorClient />
}
