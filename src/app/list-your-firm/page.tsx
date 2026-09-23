import { Metadata } from 'next'
import ListYourFirmClient from './ListYourFirmClient'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://msmevault.in'

export const metadata: Metadata = {
  title: 'List Your CA or MSME Advisory Practice | Founding Cohort (Free)',
  description:
    'Join MSMEVault’s verified directory of Chartered Accountants, CS professionals, and MSME consultants. Apply for the free founding cohort listing.',
  keywords: [
    'list CA firm MSME directory',
    'MSME consultant directory India',
    'Chartered Accountant listing free',
    'MSME advisor registration',
  ],
  alternates: {
    canonical: '/list-your-firm',
  },
  openGraph: {
    title: 'List Your CA or MSME Advisory Practice | MSMEVault',
    description:
      'Apply to join the free founding cohort of verified Chartered Accountants and MSME advisors.',
    url: `${siteUrl}/list-your-firm`,
    type: 'website',
  },
}

export default function ListYourFirmPage() {
  return <ListYourFirmClient />
}
