import { Metadata } from 'next'
import NICCodeFinderClient from './NICCodeFinderClient'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://msmevault.in'

export const metadata: Metadata = {
  title: 'Udyam NIC Code Finder (2026) | 5-Digit Search for MSME Registration',
  description:
    'Free online search tool for National Industrial Classification (NIC-2008) codes used on udyamregistration.gov.in. Find 5-digit activity codes for manufacturing, services, and trading with one-click copy.',
  keywords: [
    'NIC code finder',
    'NIC code for udyam registration',
    'Udyam NIC code search',
    'NIC code list 2026',
    'NIC code for retail shop',
    'NIC code for software company',
    'MSME NIC code 5 digit',
    'National Industrial Classification India',
  ],
  alternates: {
    canonical: '/tools/nic-code-finder',
  },
  openGraph: {
    title: 'Udyam NIC Code Finder (2026) | MSMEVault',
    description:
      'Search 5-digit NIC codes for official Udyam MSME registration. Instant search across manufacturing, service, and retail trading sectors.',
    url: `${siteUrl}/tools/nic-code-finder`,
    type: 'website',
  },
}

export default function NICCodeFinderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'MSMEVault Udyam NIC Code Finder',
    url: `${siteUrl}/tools/nic-code-finder`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    description:
      'Searchable database of National Industrial Classification (NIC-2008) codes for Udyam MSME registration in India.',
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is an NIC code in Udyam registration?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The National Industrial Classification (NIC) code is a 5-digit number that classifies your business activity (manufacturing, service, or retail/wholesale trade) during official Udyam registration on udyamregistration.gov.in.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I add multiple NIC codes to my Udyam registration?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The Udyam portal allows you to add multiple 5-digit NIC codes covering different manufacturing, service, or retail activities under a single Udyam Registration Number (URN).',
        },
      },
      {
        '@type': 'Question',
        name: 'Are retail and wholesale traders eligible for Udyam registration?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Since 2 July 2021, the Ministry of MSME has permitted Retail and Wholesale Trade (Division 45, 46, and 47) to register on Udyam, qualifying them for Priority Sector Lending (PSL) bank loans.',
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
      <NICCodeFinderClient />
    </>
  )
}
