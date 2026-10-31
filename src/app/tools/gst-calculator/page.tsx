import { Metadata } from 'next'
import GSTCalculatorClient from './GSTCalculatorClient'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://msmevault.in'

export const metadata: Metadata = {
  title: 'Online GST Calculator (2026) | Add or Remove GST, CGST, SGST & IGST',
  description:
    'Free online GST calculator for Indian businesses, freelancers, and accountants. Calculate CGST, SGST, and IGST for 5%, 12%, 18%, and 28% slabs. Supports reverse tax removal from gross amounts.',
  keywords: [
    'GST calculator',
    'online GST calculator India',
    'reverse GST calculator',
    'calculate GST 18 percent',
    'remove GST from total amount',
    'CGST SGST calculator',
    'IGST calculator online',
    'GST tax calculator 2026',
  ],
  alternates: {
    canonical: '/tools/gst-calculator',
  },
  openGraph: {
    title: 'Online GST Calculator (2026) | MSMEVault',
    description:
      'Instant GST calculation with automatic CGST, SGST, and IGST breakdowns. Add or remove tax with accurate 5%, 12%, 18%, and 28% slabs.',
    url: `${siteUrl}/tools/gst-calculator`,
    type: 'website',
  },
}

export default function GSTCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'MSMEVault Online GST Calculator',
    url: `${siteUrl}/tools/gst-calculator`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    description:
      'Free online GST calculator to calculate CGST, SGST, and IGST breakdowns for Indian businesses and freelancers.',
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the formula to calculate GST?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To add GST: GST Amount = (Net Price × GST Rate) ÷ 100. Total Amount = Net Price + GST Amount.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you remove GST from a total invoice amount?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To remove GST (reverse calculation): Net Base Price = Total Invoice Amount ÷ (1 + GST Rate ÷ 100). The GST portion is Total Invoice Amount minus the Net Base Price.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between CGST, SGST, and IGST?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For intra-state sales (within the same state), GST is split equally into CGST (Central GST) and SGST (State GST). For inter-state sales (across different states), the full tax is collected as IGST (Integrated GST).',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <GSTCalculatorClient />
    </>
  )
}
