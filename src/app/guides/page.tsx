import Link from 'next/link'
import { prisma } from '@/lib/prisma'

import { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://msmevault.in'

export const metadata: Metadata = {
  title: 'MSME Guides - Step-by-Step Application Tutorials & Document Checklists',
  description: 'Comprehensive step-by-step guides for MSME scheme applications, Udyam registration, Mudra loans, GST filing, and business compliance. Free document checklists included.',
  keywords: [
    'MSME application guide',
    'Udyam registration steps',
    'Mudra loan application process',
    'GST registration guide',
    'MSME document checklist',
    'scheme application tutorial',
    'business registration guide India',
  ],
  alternates: {
    canonical: '/guides',
  },
  openGraph: {
    title: 'MSME Guides & Tutorials | Step-by-Step Application Help',
    description: 'Free step-by-step guides for MSME schemes, loans & registrations. Document checklists included.',
    url: `${siteUrl}/guides`,
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MSME Guides & Tutorials',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MSME Guides & Tutorials | MSMEVault',
    description: 'Step-by-step guides for MSME schemes, loans & registrations.',
    images: ['/og-image.png'],
  },
}

export const dynamic = 'force-dynamic'

export default async function GuidesPage() {
  // Fetch published guides from database
  const guides = await prisma.guide.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: 'desc' },
    select: {
      id: true,
      title: true,
      excerpt: true,
      category: true,
      slug: true,
      viewCount: true,
      publishedAt: true,
    },
  })

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3a6e] px-4 md:px-6 py-8">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">
            📚 MSME Guides & Tutorials
          </h1>
          <p className="text-gray-300 text-sm">
            Step-by-step guides to help you navigate government schemes and loans
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-6 py-6 bg-[#f0f4ff]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {guides.map((guide) => (
              <Link key={guide.id} href={`/guides/${guide.slug}`}>
                <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded mb-3">
                    {guide.category}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-[var(--navy)]">{guide.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{guide.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{guide.viewCount} views</span>
                    <span className="bg-custom-blue text-white text-xs font-semibold px-4 py-2 rounded-md hover:bg-[#1e40af] transition-colors">
                      Read Guide →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Coming Soon */}
          <div className="mt-8 bg-white border border-gray-200 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold mb-2">More Guides Coming Soon</h3>
            <p className="text-gray-600 mb-4">
              We're creating comprehensive guides for every scheme and loan type
            </p>
            <Link href="/eligibility-checker">
              <button className="bg-custom-orange text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-[#ea580c] transition-colors">
                Check Your Eligibility Instead →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
