import { Metadata } from 'next'
import ConsultantsClient from './ConsultantsClient'
import { prisma } from '@/lib/prisma'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://msmevault.in'

export const metadata: Metadata = {
  title: 'Find Verified MSME Consultants & CA Firms Near You - 50+ Experts Across India',
  description:
    'Connect with 50+ verified MSME consultants and Chartered Accountant firms across 30+ cities. Expert guidance for Udyam registration, Mudra loans, GST filing, business compliance & more.',
  keywords: [
    'MSME consultants India',
    'CA firms for MSME',
    'business consultants near me',
    'Udyam registration consultant',
    'GST filing services',
    'MSME loan consultant',
    'Chartered Accountant MSME',
    'business compliance services',
    'tax consultant for small business',
  ],
  alternates: {
    canonical: '/consultants',
  },
  openGraph: {
    title: 'Find Verified MSME Consultants & CA Firms | MSMEVault',
    description:
      'Connect with 50+ verified consultants across 30+ cities for MSME registration, loans, GST & compliance.',
    url: `${siteUrl}/consultants`,
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MSME Consultants & CA Firms Directory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find Verified MSME Consultants & CA Firms',
    description: 'Connect with 50+ verified consultants across 30+ cities.',
    images: ['/og-image.png'],
  },
}

export const dynamic = 'force-dynamic'

export default async function ConsultantsPage() {
  // Fetch ALL verified consultants (no limit)
  const consultants = await prisma.consultant.findMany({
    where: { isVerified: true },
    orderBy: [
      { tier: 'desc' }, // featured/premium first
      { rating: 'desc' },
      { reviewCount: 'desc' },
    ],
  })

  // JSON-LD Schema for ItemList of consultants
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'MSME Consultants & CA Firms Directory',
    description: 'Directory of verified MSME consultants and Chartered Accountant firms across India',
    numberOfItems: consultants.length,
    itemListElement: consultants.slice(0, 20).map((consultant, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'LocalBusiness',
        name: consultant.name,
        description: consultant.bio || `${consultant.name} - MSME Consultant in ${consultant.city}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: consultant.city,
          addressRegion: consultant.state,
          addressCountry: 'IN',
        },
        ...(consultant.rating && {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: consultant.rating,
            reviewCount: consultant.reviewCount || 1,
          },
        }),
        ...(consultant.phone && { telephone: consultant.phone }),
        ...(consultant.email && { email: consultant.email }),
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ConsultantsClient consultants={consultants} />
    </>
  )
}
