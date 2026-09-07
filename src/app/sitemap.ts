import { MetadataRoute } from 'next'
import { VERIFIED_SCHEMES } from '@/data/verified-schemes'
import { VERIFIED_GUIDES } from '@/data/verified-guides'
import { BLOG_POSTS } from '@/data/verified-blog'

const CITIES = [
  'mumbai', 'delhi', 'bangalore', 'pune', 'ahmedabad',
  'chennai', 'hyderabad', 'jaipur', 'kolkata', 'surat'
]

// Stable fallback date for pages without their own revision date. Bump when the
// static content set changes — do NOT use `new Date()`, which makes every URL
// look modified on every crawl and trains Google to ignore <lastmod>.
const CONTENT_REVISION = '2026-09-08'

function toIso(value: string, fallback = CONTENT_REVISION): string {
  const d = new Date(value)
  return isNaN(d.getTime()) ? new Date(fallback).toISOString() : d.toISOString()
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://msmevault.in'
  const revisionIso = new Date(CONTENT_REVISION).toISOString()

  // 1. Static Core Pages
  const staticPages = [
    '',
    '/schemes',
    '/loans',
    '/guides',
    '/blog',
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
    lastModified: revisionIso,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : route === '/schemes' || route === '/loans' || route.startsWith('/tools') ? 0.9 : 0.6,
  }))

  // 2. Verified Schemes
  const schemePages = VERIFIED_SCHEMES.map((scheme) => ({
    url: `${siteUrl}/schemes/${scheme.slug}`,
    lastModified: toIso((scheme as { lastVerified?: string }).lastVerified ?? CONTENT_REVISION),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // 3. Pillar Policy Guides
  const guidePages = VERIFIED_GUIDES.map((guide) => ({
    url: `${siteUrl}/guides/${guide.slug}`,
    lastModified: toIso((guide as { lastVerified?: string }).lastVerified ?? CONTENT_REVISION),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  // 4. Blog posts
  const blogPages = BLOG_POSTS.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: toIso(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  // 5. City Consultant Directories (Beta)
  const cityPages = CITIES.map((city) => ({
    url: `${siteUrl}/consultants/${city}`,
    lastModified: revisionIso,
    changeFrequency: 'monthly' as const,
    priority: 0.4,
  }))

  return [...staticPages, ...schemePages, ...guidePages, ...blogPages, ...cityPages]
}
