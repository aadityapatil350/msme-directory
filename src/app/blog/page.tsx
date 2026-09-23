import { Metadata } from 'next'
import { BLOG_POSTS } from '@/data/verified-blog'
import BlogIndexClient from './BlogIndexClient'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://msmevault.in'

export const metadata: Metadata = {
  title: 'MSMEVault Blog – 30 Verified Guides on MSME Schemes, Loans & Manufacturing',
  description:
    'In-depth, primary-source-backed articles on manufacturing business ideas, Udyam registration, Mudra loans, PMEGP subsidies, CGTMSE, and MSME compliance.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'MSMEVault Blog – 30 MSME Schemes, Loans & Manufacturing Guides',
    description: '30 verified, source-backed guides for Indian small business owners and manufacturers.',
    url: `${siteUrl}/blog`,
    type: 'website',
  },
}

export default function BlogIndexPage() {
  const posts = [...BLOG_POSTS].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <section className="bg-white border-b border-zinc-200 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[11px] font-medium px-3 py-1 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
            <span>30 Verified Articles &bull; Knowledge Hub &bull; Updated September 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight mb-3">
            MSME Knowledge Hub &amp; Guides
          </h1>
          <p className="text-sm text-zinc-600 max-w-2xl leading-relaxed">
            30 comprehensive, plain-language guides on micro-manufacturing business ideas by capex budget, Mudra bank loans, PMEGP subsidies, CGTMSE credit cover, and statutory tax compliance — anchored to primary Government of India circulars.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <BlogIndexClient posts={posts} />
      </section>
    </div>
  )
}
