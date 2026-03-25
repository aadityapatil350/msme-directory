import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://msmevault.in'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteUrl}/schemes`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/consultants`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/loans`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/eligibility-checker`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/list-your-firm`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // Dynamic pages - Schemes
  let schemePages: MetadataRoute.Sitemap = []
  try {
    const schemes = await prisma.scheme.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true },
    })
    schemePages = schemes.map((scheme) => ({
      url: `${siteUrl}/schemes/${scheme.slug}`,
      lastModified: scheme.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error('Error fetching schemes for sitemap:', error)
  }

  // Dynamic pages - Blog posts
  let blogPages: MetadataRoute.Sitemap = []
  try {
    const posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    })
    blogPages = posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
  }

  // Dynamic pages - Guides
  let guidePages: MetadataRoute.Sitemap = []
  try {
    const guides = await prisma.guide.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    })
    guidePages = guides.map((guide) => ({
      url: `${siteUrl}/guides/${guide.slug}`,
      lastModified: guide.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  } catch (error) {
    console.error('Error fetching guides for sitemap:', error)
  }

  // Dynamic pages - Consultants by city
  let cityPages: MetadataRoute.Sitemap = []
  try {
    const cities = await prisma.consultant.findMany({
      where: { isVerified: true },
      select: { city: true },
      distinct: ['city'],
    })
    cityPages = cities.map((item) => ({
      url: `${siteUrl}/consultants/${item.city.toLowerCase().replace(/\s+/g, '-')}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error('Error fetching cities for sitemap:', error)
  }

  return [
    ...staticPages,
    ...schemePages,
    ...blogPages,
    ...guidePages,
    ...cityPages,
  ]
}
