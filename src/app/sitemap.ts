import { MetadataRoute } from 'next'
import { VERIFIED_SCHEMES } from '@/data/verified-schemes'
import { VERIFIED_GUIDES } from '@/data/verified-guides'

const CITIES = [
  'mumbai', 'delhi', 'bangalore', 'pune', 'ahmedabad',
  'chennai', 'hyderabad', 'jaipur', 'kolkata', 'surat'
]

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://msmevault.in'
  const currentDate = new Date().toISOString()

  // 1. Static Core Pages
  const staticPages = [
    '',
    '/schemes',
    '/loans',
    '/guides',
    '/tools/emi-calculator',
    '/tools/subsidy-calculator',
    '/eligibility-checker',
    '/consultants',
    '/list-your-firm',
    '/about',
    '/editorial-policy',
    '/disclaimer',
    '/privacy',
    '/terms',
    '/contact',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : route.startsWith('/tools') || route === '/schemes' || route === '/loans' ? 0.9 : 0.7,
  }))

  // 2. Verified Schemes
  const schemePages = VERIFIED_SCHEMES.map((scheme) => ({
    url: `${siteUrl}/schemes/${scheme.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // 3. Pillar Policy Guides
  const guidePages = VERIFIED_GUIDES.map((guide) => ({
    url: `${siteUrl}/guides/${guide.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // 4. City Consultant Directories (Beta)
  const cityPages = CITIES.map((city) => ({
    url: `${siteUrl}/consultants/${city}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...schemePages, ...guidePages, ...cityPages]
}
