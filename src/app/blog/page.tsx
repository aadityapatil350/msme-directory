import Link from 'next/link'
import { Metadata } from 'next'
import { BLOG_POSTS } from '@/data/verified-blog'
import { Clock, ArrowRight } from 'lucide-react'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://msmevault.in'

export const metadata: Metadata = {
  title: 'MSMEVault Blog – Verified Guides on Indian MSME Schemes, Loans & Registration',
  description:
    'In-depth, primary-source-backed articles on Udyam registration, Mudra loans, PMEGP subsidies, CGTMSE, and MSME compliance. Every figure sourced and dated.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'MSMEVault Blog – MSME Schemes, Loans & Registration Explained',
    description: 'Verified, source-backed guides for Indian MSME owners.',
    url: `${siteUrl}/blog`,
    type: 'website',
  },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function BlogIndexPage() {
  const posts = [...BLOG_POSTS].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
  const categories = Array.from(new Set(posts.map((p) => p.category)))

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <section className="bg-white border-b border-zinc-200 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-zinc-100 border border-zinc-200/80 text-zinc-700 text-[11px] font-medium px-3 py-1 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
            <span>Verified Research &bull; Updated {new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight mb-3">
            MSMEVault Blog
          </h1>
          <p className="text-sm text-zinc-600 max-w-2xl leading-relaxed">
            Long-form, plain-language explainers on Udyam registration, Mudra loans, PMEGP subsidies, and MSME compliance — anchored to primary Government of India sources with every figure sourced and dated.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <span key={cat} className="bg-white border border-zinc-200 text-zinc-700 text-[11px] font-mono font-medium px-2.5 py-1 rounded">
              {cat}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white border border-zinc-200 hover:border-zinc-300 rounded-xl p-6 shadow-2xs hover:shadow-xs transition-all flex flex-col"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="bg-zinc-100 text-zinc-700 text-[10px] font-mono font-medium px-2 py-0.5 rounded">
                  {post.category}
                </span>
                <div className="text-[10px] text-zinc-400 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{post.readTimeMinutes} min read</span>
                </div>
              </div>

              <h2 className="font-bold text-base text-zinc-950 mb-2 leading-snug">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>

              <p className="text-xs text-zinc-500 line-clamp-3 mb-4 leading-relaxed flex-1">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-zinc-100 text-[11px]">
                <div className="text-zinc-400 font-mono">
                  {formatDate(post.publishedAt)}
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-zinc-700 hover:text-zinc-950 font-medium inline-flex items-center gap-1 group"
                >
                  <span>Read</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
