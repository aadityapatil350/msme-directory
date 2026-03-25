import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'

// Enhanced SEO metadata
export const metadata: Metadata = {
  title: 'MSME Blog | Expert Business Tips, Government Schemes & Growth Strategies',
  description: 'Read expert articles on MSME loans, government schemes, business registration, GST compliance, digital marketing, and growth strategies for small businesses in India.',
  keywords: ['MSME blog', 'small business tips India', 'government schemes for MSME', 'MSME loans guide', 'business growth strategies', 'GST compliance tips', 'Udyam registration guide'],
  openGraph: {
    title: 'MSME Blog | Expert Business Tips & Growth Strategies | MSMEVault',
    description: 'Your go-to resource for MSME success. Expert articles on loans, schemes, compliance, and business growth for Indian entrepreneurs.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'MSMEVault',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MSME Blog | Expert Business Tips & Growth Strategies',
    description: 'Your go-to resource for MSME success. Expert articles on loans, schemes, compliance, and business growth.',
  },
  alternates: {
    canonical: '/blog',
  },
}

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: 'desc' },
    select: {
      id: true,
      title: true,
      excerpt: true,
      category: true,
      tags: true,
      publishedAt: true,
      slug: true,
      authorName: true,
      viewCount: true,
    },
  })

  // Get featured post (most viewed)
  const featuredPost = posts.length > 0 ? posts.reduce((prev, current) =>
    (prev.viewCount > current.viewCount) ? prev : current
  ) : null

  // Get recent posts excluding featured
  const recentPosts = posts.filter(p => p.id !== featuredPost?.id).slice(0, 6)

  // Get unique categories with counts
  const categoryCounts = posts.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Get popular posts by view count
  const popularPosts = [...posts]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 5)

  const formatDate = (date: Date | null) => {
    if (!date) return ''
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const getReadingTime = (excerpt: string) => {
    const wordsPerMinute = 200
    const words = excerpt.split(' ').length * 15 // Estimate full content
    return Math.max(3, Math.ceil(words / wordsPerMinute))
  }

  // JSON-LD Schema for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'MSMEVault Blog',
    description: 'Expert articles on MSME loans, government schemes, business registration, and growth strategies for Indian entrepreneurs.',
    url: 'https://msmevault.com/blog',
    publisher: {
      '@type': 'Organization',
      name: 'MSMEVault',
      logo: {
        '@type': 'ImageObject',
        url: 'https://msmevault.com/logo.png',
      },
    },
    blogPost: posts.slice(0, 10).map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      url: `https://msmevault.com/blog/${post.slug}`,
      datePublished: post.publishedAt?.toISOString(),
      author: {
        '@type': 'Person',
        name: post.authorName,
      },
    })),
  }

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#f0f4ff]">
        {/* Hero Header */}
        <div className="bg-gradient-to-br from-[#0f1f3d] via-[#1a3a6e] to-[#0f1f3d] px-4 md:px-6 py-16 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-20 w-60 h-60 bg-blue-400 rounded-full blur-3xl" />
          </div>

          <div className="max-w-[1400px] mx-auto relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-blue-500/20 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full">
                {posts.length}+ Articles
              </span>
              <span className="bg-green-500/20 text-green-300 text-xs font-semibold px-3 py-1 rounded-full">
                Updated Weekly
              </span>
            </div>

            <h1 className="font-['Syne'] text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              MSME Knowledge Hub
            </h1>
            <p className="text-blue-100 text-lg md:text-xl max-w-2xl mb-8">
              Expert insights on government schemes, business loans, compliance, and growth strategies to help your MSME thrive.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-xl">📚</span>
                </div>
                <div>
                  <p className="text-white font-bold">{posts.length}</p>
                  <p className="text-blue-200 text-xs">Articles</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-xl">📂</span>
                </div>
                <div>
                  <p className="text-white font-bold">{Object.keys(categoryCounts).length}</p>
                  <p className="text-blue-200 text-xs">Categories</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-xl">👁️</span>
                </div>
                <div>
                  <p className="text-white font-bold">{posts.reduce((sum, p) => sum + p.viewCount, 0).toLocaleString()}</p>
                  <p className="text-blue-200 text-xs">Total Reads</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
          <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-4">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
              <Link href="/blog">
                <span className="bg-[var(--navy)] text-white text-sm font-semibold px-4 py-2 rounded-full whitespace-nowrap cursor-pointer">
                  All Posts ({posts.length})
                </span>
              </Link>
              {Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]).map(([category, count]) => (
                <Link key={category} href={`/blog?category=${encodeURIComponent(category)}`}>
                  <span className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-full whitespace-nowrap cursor-pointer transition-colors">
                    {category} ({count})
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-10">
          {posts.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📝</span>
              </div>
              <h2 className="text-2xl font-bold text-[var(--navy)] mb-2">Coming Soon!</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We're preparing expert content on MSME loans, government schemes, and business growth strategies.
              </p>
              <Link href="/resources">
                <button className="bg-[var(--blue)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1e40af] transition-colors">
                  Browse Guides Instead
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-[1fr_340px] gap-8">
              {/* Main Column */}
              <div className="space-y-10">
                {/* Featured Post */}
                {featuredPost && (
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-yellow-500 text-lg">★</span>
                      <h2 className="font-['Syne'] text-lg font-bold text-[var(--navy)]">Featured Article</h2>
                    </div>
                    <Link href={`/blog/${featuredPost.slug}`}>
                      <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all group">
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                          <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                              <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                                {featuredPost.category}
                              </span>
                              <span className="text-blue-200 text-xs">
                                {getReadingTime(featuredPost.excerpt)} min read
                              </span>
                            </div>
                            <h3 className="font-['Syne'] text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-blue-100 transition-colors leading-tight">
                              {featuredPost.title}
                            </h3>
                            <p className="text-blue-100 text-base line-clamp-2 mb-4">
                              {featuredPost.excerpt}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm text-blue-200">
                                <span>By {featuredPost.authorName}</span>
                                <span>•</span>
                                <span>{formatDate(featuredPost.publishedAt)}</span>
                              </div>
                              <span className="flex items-center gap-1 text-white/80 text-sm">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                </svg>
                                {featuredPost.viewCount.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </section>
                )}

                {/* Latest Articles */}
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-['Syne'] text-xl font-bold text-[var(--navy)]">
                      Latest Articles
                    </h2>
                    <Link href="/resources">
                      <span className="text-[var(--blue)] text-sm font-semibold hover:underline cursor-pointer">
                        View All Resources →
                      </span>
                    </Link>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {recentPosts.map((post) => (
                      <Link key={post.id} href={`/blog/${post.slug}`}>
                        <article className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 transition-all h-full group">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-md">
                              {post.category}
                            </span>
                            <span className="text-gray-400 text-xs">
                              {getReadingTime(post.excerpt)} min
                            </span>
                          </div>

                          <h3 className="font-['Syne'] text-lg font-bold text-[var(--navy)] mb-2 group-hover:text-[var(--blue)] transition-colors line-clamp-2 leading-snug">
                            {post.title}
                          </h3>

                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>

                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                {post.authorName.charAt(0)}
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-700">{post.authorName}</p>
                                <p className="text-xs text-gray-400">{formatDate(post.publishedAt)}</p>
                              </div>
                            </div>
                            <span className="flex items-center gap-1 text-gray-400 text-xs">
                              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                              </svg>
                              {post.viewCount}
                            </span>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </section>

                {/* All Posts (if more than featured + recent) */}
                {posts.length > 7 && (
                  <section>
                    <h2 className="font-['Syne'] text-xl font-bold text-[var(--navy)] mb-6">
                      More Articles
                    </h2>
                    <div className="space-y-4">
                      {posts.slice(7).map((post) => (
                        <Link key={post.id} href={`/blog/${post.slug}`}>
                          <article className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-blue-200 transition-all flex gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded">
                                  {post.category}
                                </span>
                                <span className="text-gray-400 text-xs">{formatDate(post.publishedAt)}</span>
                              </div>
                              <h3 className="font-semibold text-[var(--navy)] hover:text-[var(--blue)] transition-colors line-clamp-1">
                                {post.title}
                              </h3>
                              <p className="text-gray-500 text-sm line-clamp-1 mt-1">{post.excerpt}</p>
                            </div>
                            <div className="flex items-center text-gray-400 text-sm">
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                              </svg>
                              {post.viewCount}
                            </div>
                          </article>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* Sidebar */}
              <aside className="space-y-6">
                {/* Search */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                  <h3 className="font-['Syne'] font-bold text-[var(--navy)] mb-3">Search Articles</h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full px-4 py-2.5 pr-10 border border-gray-200 rounded-lg text-sm outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-blue-50"
                    />
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* Popular Posts */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                  <h3 className="font-['Syne'] font-bold text-[var(--navy)] mb-4 flex items-center gap-2">
                    <span className="text-orange-500">🔥</span> Popular Articles
                  </h3>
                  <div className="space-y-4">
                    {popularPosts.map((post, index) => (
                      <Link key={post.id} href={`/blog/${post.slug}`}>
                        <div className="flex gap-3 group cursor-pointer">
                          <span className="flex-shrink-0 w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-500">
                            {index + 1}
                          </span>
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 group-hover:text-[var(--blue)] transition-colors line-clamp-2 leading-snug">
                              {post.title}
                            </h4>
                            <p className="text-xs text-gray-400 mt-1">{post.viewCount.toLocaleString()} views</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                  <h3 className="font-['Syne'] font-bold text-[var(--navy)] mb-4">Categories</h3>
                  <div className="space-y-2">
                    {Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]).map(([category, count]) => (
                      <Link key={category} href={`/blog?category=${encodeURIComponent(category)}`}>
                        <div className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                          <span className="text-sm text-gray-700">{category}</span>
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{count}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* CTA - Guides */}
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">📖</span>
                  </div>
                  <h3 className="font-['Syne'] font-bold text-lg mb-2">Step-by-Step Guides</h3>
                  <p className="text-green-100 text-sm mb-4">
                    Detailed guides on Udyam registration, Mudra loans, GST, and more.
                  </p>
                  <Link href="/resources">
                    <button className="w-full bg-white text-green-600 text-sm font-bold px-4 py-2.5 rounded-lg hover:bg-green-50 transition-colors">
                      Browse 30+ Guides →
                    </button>
                  </Link>
                </div>

                {/* CTA - Consultants */}
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
              </aside>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3a6e] px-4 md:px-6 py-16">
          <div className="max-w-[1000px] mx-auto text-center">
            <h2 className="font-['Syne'] text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Grow Your MSME?
            </h2>
            <p className="text-blue-200 mb-8 max-w-lg mx-auto">
              Explore government schemes, compare loans, and connect with expert consultants to take your business to the next level.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/schemes">
                <button className="bg-white text-[var(--navy)] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                  Browse Schemes
                </button>
              </Link>
              <Link href="/loans">
                <button className="bg-[var(--money)] text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors">
                  Compare Loans
                </button>
              </Link>
              <Link href="/consultants">
                <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors">
                  Find Consultants
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
