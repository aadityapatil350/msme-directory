import ConsultantsCityClient from './ConsultantsCityClient'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

// Generate static params for all cities
export async function generateStaticParams() {
  const consultants = await prisma.consultant.findMany({
    where: { isVerified: true },
    select: { city: true },
  })

  const cities = Array.from(new Set(consultants.map(c => c.city)))

  return cities.map(city => ({
    city: city.toLowerCase().replace(/\s+/g, '-'),
  }))
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://msmevault.in'

// Generate metadata for each city
export async function generateMetadata({ params }: { params: { city: string } }) {
  const citySlug = params.city
  const cityName = citySlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  const count = await prisma.consultant.count({
    where: {
      isVerified: true,
      city: cityName,
    },
  })

  return {
    title: `${count}+ Best MSME Consultants & CA Firms in ${cityName} 2024`,
    description: `Find ${count}+ verified MSME consultants and Chartered Accountants in ${cityName}. Expert guidance for Mudra loans, GST registration, Udyam registration, ITR filing, tax planning & business compliance.`,
    keywords: [
      `MSME consultants ${cityName}`,
      `CA firms in ${cityName}`,
      `business consultants ${cityName}`,
      `GST registration ${cityName}`,
      `Udyam registration ${cityName}`,
      `tax consultant ${cityName}`,
    ],
    alternates: {
      canonical: `/consultants/${citySlug}`,
    },
    openGraph: {
      title: `${count}+ MSME Consultants & CA Firms in ${cityName} | MSMEVault`,
      description: `Find verified MSME consultants in ${cityName}. Expert guidance for loans, GST, compliance.`,
      url: `${siteUrl}/consultants/${citySlug}`,
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `MSME Consultants in ${cityName}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${count}+ MSME Consultants in ${cityName}`,
      description: `Find verified consultants & CA firms in ${cityName}.`,
      images: ['/og-image.png'],
    },
  }
}

export default async function CityConsultantsPage({ params }: { params: { city: string } }) {
  const citySlug = params.city
  // Convert URL slug to proper city name
  const cityName = citySlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  // Fetch consultants for this specific city
  const consultants = await prisma.consultant.findMany({
    where: {
      isVerified: true,
      city: cityName,
    },
    orderBy: [
      { tier: 'desc' },
      { rating: 'desc' },
      { reviewCount: 'desc' },
    ],
  })

  // If no consultants found, show 404
  if (consultants.length === 0) {
    notFound()
  }

  // Get all cities for navigation
  const allConsultants = await prisma.consultant.findMany({
    where: { isVerified: true },
    select: { city: true, state: true },
  })

  const allCities = Array.from(
    new Map(allConsultants.map(c => [c.city, c.state])).entries()
  ).map(([city, state]) => ({ city, state }))

  // JSON-LD Schema for city consultants list
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `MSME Consultants in ${cityName}`,
    description: `Directory of verified MSME consultants and CA firms in ${cityName}`,
    numberOfItems: consultants.length,
    itemListElement: consultants.map((consultant, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'LocalBusiness',
        name: consultant.name,
        description: consultant.bio || `${consultant.name} - MSME Consultant in ${cityName}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: cityName,
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

  // Breadcrumb Schema
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Consultants',
        item: `${siteUrl}/consultants`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: cityName,
        item: `${siteUrl}/consultants/${citySlug}`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ConsultantsCityClient
        consultants={consultants}
        cityName={cityName}
        allCities={allCities}
      />
    </>
  )
}
