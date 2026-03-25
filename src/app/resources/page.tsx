import ResourcesClient from './ResourcesClient'
import { prisma } from '@/lib/prisma'

import { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://msmevault.in'

export const metadata: Metadata = {
  title: 'MSME Resources: 60+ Guides, Tutorials & Expert Articles',
  description: 'Access 30+ comprehensive guides and 30+ expert articles on MSME loans, government schemes, Udyam registration, GST compliance, and business growth strategies.',
  keywords: [
    'MSME resources',
    'business guides India',
    'MSME tutorials',
    'small business articles',
    'MSME compliance guides',
    'business growth resources',
    'entrepreneur resources India',
  ],
  alternates: {
    canonical: '/resources',
  },
  openGraph: {
    title: 'MSME Resources | 60+ Guides & Expert Articles | MSMEVault',
    description: 'Free guides, tutorials & articles on MSME loans, schemes, registration & compliance.',
    url: `${siteUrl}/resources`,
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MSME Resources & Guides',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MSME Resources | Guides & Articles',
    description: 'Free guides & articles on MSME loans, schemes & compliance.',
    images: ['/og-image.png'],
  },
}

export const dynamic = 'force-dynamic'

export default async function ResourcesPage() {
  // Fetch all published guides and blogs
  const [guides, blogs] = await Promise.all([
    prisma.guide.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        category: true,
        publishedAt: true,
        viewCount: true,
      },
    }),
    prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        category: true,
        tags: true,
        authorName: true,
        publishedAt: true,
        viewCount: true,
      },
    }),
  ])

  return <ResourcesClient guides={guides} blogs={blogs} />
}
