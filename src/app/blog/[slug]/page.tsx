import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import CopyLinkButton from '@/components/CopyLinkButton'
import ViewTracker from '@/components/ViewTracker'
import { parseMarkdown, getReadingTime } from '@/lib/markdown'
import '../../content-styles.css'

export const dynamic = 'force-dynamic'

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  })

  if (!post) {
    return {
      title: 'Blog Post Not Found | MSMEVault',
    }
  }

  const title = post.metaTitle || `${post.title} | MSMEVault Blog`
  const description = post.metaDescription || post.excerpt

  return {
    title,
    description,
    keywords: post.tags,
    authors: [{ name: post.authorName }],
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      authors: [post.authorName],
      tags: post.tags,
      locale: 'en_IN',
      siteName: 'MSMEVault',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  })

  if (!post || !post.isPublished) {
    notFound()
  }

  // Get related posts
  const relatedPosts = await prisma.blogPost.findMany({
    where: {
      isPublished: true,
      category: post.category,
      id: { not: post.id },
    },
    take: 3,
    orderBy: { viewCount: 'desc' },
  })

  // Get more posts from different categories
  const morePosts = await prisma.blogPost.findMany({
    where: {
      isPublished: true,
      id: { not: post.id },
      category: { not: post.category },
    },
    take: 4,
    orderBy: { publishedAt: 'desc' },
  })

  const formatDate = (date: Date | null) => {
    if (!date) return ''
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const readingTime = getReadingTime(post.content)

  // JSON-LD Schema for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage || 'https://msmevault.com/og-image.png',
    author: {
      '@type': 'Person',
      name: post.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'MSMEVault',
      logo: {
        '@type': 'ImageObject',
        url: 'https://msmevault.com/logo.png',
      },
    },
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt?.toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://msmevault.com/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
    wordCount: post.content.split(/\s+/).length,
  }

  // FAQ Schema if content has Q&A pattern
  const faqPattern = post.content.match(/\*\*Q[:.]/g)
  const hasFAQ = faqPattern && faqPattern.length > 0

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#f0f4ff]">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-3">
          <div className="max-w-[1400px] mx-auto">
            <nav className="flex items-center gap-2 text-sm text-gray-600" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[var(--blue)] transition-colors">Home</Link>
              <span className="text-gray-400">→</span>
              <Link href="/blog" className="hover:text-[var(--blue)] transition-colors">Blog</Link>
              <span className="text-gray-400">→</span>
              <Link href={`/blog?category=${encodeURIComponent(post.category)}`} className="hover:text-[var(--blue)] transition-colors">
                {post.category}
              </Link>
              <span className="text-gray-400">→</span>
              <span className="text-[var(--navy)] font-medium truncate max-w-[200px]">{post.title}</span>
            </nav>
          </div>
        </div>

        {/* Article Header */}
        <header className="bg-gradient-to-br from-[#0f1f3d] via-[#1a3a6e] to-[#0f1f3d] px-4 md:px-6 py-10 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-20 w-60 h-60 bg-blue-400 rounded-full blur-3xl" />
          </div>

          <div className="max-w-[1400px] mx-auto relative z-10">
            {/* Meta Pills */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1.5 rounded-full">
                {post.category}
              </span>
              <span className="bg-white/10 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {readingTime} min read
              </span>
              <span className="bg-white/10 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                <ViewTracker type="blog" id={post.id} initialCount={post.viewCount} /> views
              </span>
            </div>

            {/* Title */}
            <h1 className="font-['Syne'] text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-blue-100 text-lg md:text-xl leading-relaxed mb-8 max-w-3xl">
              {post.excerpt}
            </p>

            {/* Author & Date */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg">
                  {post.authorName.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold">{post.authorName}</p>
                  <p className="text-blue-200 text-sm">MSME Expert</p>
                </div>
              </div>
              <div className="h-8 w-px bg-white/20 hidden sm:block" />
              <div className="flex items-center gap-2 text-blue-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <time dateTime={post.publishedAt?.toISOString()}>
                  {formatDate(post.publishedAt)}
                </time>
              </div>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {post.tags.map(tag => (
                  <span key={tag} className="bg-white/10 text-white/90 text-xs px-3 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Article Content */}
        <div className="px-4 md:px-6 py-8">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid lg:grid-cols-[1fr_300px] gap-6">
              {/* Main Content */}
              <main>
                <article className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 shadow-sm">
                  <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{
                      __html: parseMarkdown(post.content)
                    }}
                  />
                </article>

                {/* Share & Actions */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 mt-6 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">Share this article</p>
                      <div className="flex gap-3">
                        <a
                          href={`https://twitter.com/intent/tweet?url=https://msmevault.com/blog/${post.slug}&text=${encodeURIComponent(post.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-[#1DA1F2] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                        </a>
                        <a
                          href={`https://www.linkedin.com/shareArticle?mini=true&url=https://msmevault.com/blog/${post.slug}&title=${encodeURIComponent(post.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-[#0077B5] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </a>
                        <a
                          href={`https://wa.me/?text=${encodeURIComponent(post.title + ' - https://msmevault.com/blog/' + post.slug)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                        </a>
                        <CopyLinkButton url={`https://msmevault.com/blog/${post.slug}`} />
                      </div>
                    </div>
                    <Link href="/blog">
                      <button className="bg-[var(--navy)] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#1a3a6e] transition-colors">
                        ← Back to Blog
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <section className="mt-12">
                    <h2 className="font-['Syne'] text-2xl font-bold text-[var(--navy)] mb-6">
                      Related Articles in {post.category}
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                      {relatedPosts.map(related => (
                        <Link
                          key={related.id}
                          href={`/blog/${related.slug}`}
                          className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-blue-200 transition-all group"
                        >
                          <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded">
                            {related.category}
                          </span>
                          <h3 className="font-semibold text-[var(--navy)] mt-3 mb-2 line-clamp-2 group-hover:text-[var(--blue)] transition-colors">
                            {related.title}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {related.excerpt}
                          </p>
                          <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                            <span>By {related.authorName}</span>
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                              </svg>
                              {related.viewCount}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                {/* More Posts */}
                {morePosts.length > 0 && (
                  <section className="mt-12">
                    <h2 className="font-['Syne'] text-2xl font-bold text-[var(--navy)] mb-6">
                      More Articles You Might Like
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {morePosts.map(more => (
                        <Link
                          key={more.id}
                          href={`/blog/${more.slug}`}
                          className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-blue-200 transition-all flex gap-4"
                        >
                          <div className="flex-1">
                            <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded">
                              {more.category}
                            </span>
                            <h3 className="font-semibold text-[var(--navy)] mt-2 line-clamp-2 hover:text-[var(--blue)] transition-colors">
                              {more.title}
                            </h3>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
              </main>

              {/* Sidebar - Sticky */}
              <aside className="hidden lg:block">
                <div className="sticky top-24 space-y-6">
                  {/* Quick Links */}
                  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <h3 className="font-['Syne'] font-bold text-[var(--navy)] mb-4">Quick Links</h3>
                    <div className="space-y-3">
                      <Link href="/resources" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[var(--blue)] transition-colors">
                        <span>📖</span> Browse Guides
                      </Link>
                      <Link href="/schemes" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[var(--blue)] transition-colors">
                        <span>🏛️</span> Government Schemes
                      </Link>
                      <Link href="/loans" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[var(--blue)] transition-colors">
                        <span>💰</span> Compare Loans
                      </Link>
                      <Link href="/consultants" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[var(--blue)] transition-colors">
                        <span>👨‍💼</span> Find Consultants
                      </Link>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-6 text-white shadow-lg">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-2xl">💼</span>
                    </div>
                    <h3 className="font-['Syne'] font-bold text-lg mb-2">Need Expert Help?</h3>
                    <p className="text-orange-100 text-sm mb-4">
                      Connect with verified MSME consultants for personalized guidance.
                    </p>
                    <Link href="/consultants">
                      <button className="w-full bg-white text-orange-600 text-sm font-bold px-4 py-2.5 rounded-lg hover:bg-orange-50 transition-colors">
                        Find Consultants →
                      </button>
                    </Link>
                  </div>

                  {/* Newsletter */}
                  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <h3 className="font-['Syne'] font-bold text-[var(--navy)] mb-2">Stay Updated</h3>
                    <p className="text-gray-500 text-sm mb-4">Get the latest MSME insights in your inbox.</p>
                    <div className="space-y-3">
                      <input
                        type="email"
                        placeholder="Your email"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--blue)]"
                      />
                      <button className="w-full bg-[var(--navy)] text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-[#1a3a6e] transition-colors">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 px-6 py-16">
          <div className="max-w-[800px] mx-auto text-center">
            <h2 className="font-['Syne'] text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Grow Your MSME?
            </h2>
            <p className="text-green-100 mb-8 max-w-lg mx-auto">
              Explore government schemes, compare loans, and connect with expert consultants to take your business to the next level.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/schemes">
                <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-bold hover:bg-green-50 transition-colors">
                  Browse Schemes
                </button>
              </Link>
              <Link href="/loans">
                <button className="bg-green-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-800 transition-colors">
                  Compare Loans
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
