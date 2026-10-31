import { Metadata } from 'next'
import { BLOG_POSTS } from '@/data/verified-blog'
import BlogIndexClient from './BlogIndexClient'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://msmevault.in'

export const metadata: Metadata = {
  title: 'MSME Knowledge Hub – Business Ideas, Digital Opportunities & Schemes',
  description:
    'Practical, research-backed guides on business ideas, online opportunities, digital agencies, Udyam registration, Mudra loans, PMEGP subsidies, and MSME growth in India.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'MSME Knowledge Hub – Business Ideas, Digital Opportunities & Schemes',
    description: 'Verified, research-backed guides for Indian entrepreneurs, online businesses, and small enterprise owners.',
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
            <span>{BLOG_POSTS.length} Verified Guides &bull; Knowledge Hub &bull; Updated October 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight mb-3">
            Business Ideas, Digital Growth &amp; MSME Knowledge Hub
          </h1>
          <p className="text-sm text-zinc-600 max-w-2xl leading-relaxed">
            Practical blueprints on small business opportunities, online business models, digital service agencies, Mudra bank loans, PMEGP subsidies, and statutory compliance for Indian entrepreneurs.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <BlogIndexClient posts={posts} />
      </section>
    </div>
  )
}
